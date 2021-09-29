<template>
  <div class="ot-table-page--elem">
    <elem-form
      ref="form"
      v-bind="formAttrs"
      v-on="formListeners"
    />

    <slot />

    <elem-extend-table
      v-if="!customRender"
      ref="table"
      v-bind="tableAttrs"
      v-on="tableListeners"
    />

    <custom-render
      v-if="typeof customRender === 'function'"
      :render="customRender"
      :attrs="tableAttrs"
      :listeners="tableListeners"
    />
  </div>
</template>

<script>
import axios from 'axios';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import {
  EL_FORM_EVENTS,
  ELEM_TABLE_METHODS,
  ELEM_FORM_ATTRS,
  OPTIONS_COMPONENTS,
  CustomRender,
  ELEM_RANGE_TYPES,
} from '@onemin-table/shared';

// 解析后端数据的键, key to parse data from backend.
const DATA_KEYS = [
  'totalKey',
  'dataKey',
  'pageKey',
  'pageSizeKey',
  'url',
];

const { toString } = Object.prototype;
const isObject = (val) => toString.call(val) === '[object Object]';

function onCallback(cb, opts) {
  // config/error/response
  return (data) => {
    const {
      rejected,
    } = opts || {};

    try {
      if (typeof cb === 'function') {
        cb(rejected ? data : null, rejected ? null : data);
      }
    } catch (err) {
      // log execption in onRequest/onResponse
      console.error(err);
    }
    return rejected ? Promise.reject(data) : data;
  };
}

export default {
  inheritAttrs: false,

  components: {
    CustomRender,
  },

  props: {
    /**
     * @language=zh
     * 解析后端返回列表数据的总数, 支持使用"."或者"[0]"解析嵌套值
     */
    totalKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 解析后端返回列表数据, 支持使用"."或者"[0]"解析嵌套值
     */
    dataKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 解析后端返回的汇总数据, 支持使用"."或者"[0]"解析嵌套值
     */
    summaryKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 提交给后端的当前页值, 支持使用"."或者"[0]"设置嵌套值
     */
    pageKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 提交给后端的当前分页大小值, 支持使用"."或者"[0]"设置嵌套值
     */
    pageSizeKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 提交给后端的请求地址
     */
    url: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * axios请求配置
     */
    requestConfig: {
      type: Object, // AxiosRequestConfig
      default() { return {}; },
    },

    /**
     * @language=zh
     * axios请求拦截器
     */
    onRequest: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * axios响应拦截器
     */
    onResponse: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 请求过程中出现错误时的回调函数
     */
    onError: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 响应列表数据处理函数
     */
    transformer: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 请求参数处理函数
     */
    paramTransformer: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 表单元素schema
     */
    filters: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 是否展示搜索&重置按钮组
     */
    showButtonGroup: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 输入值改变后触发请求的间隔(ms)
     */
    inputDebounce: {
      type: Number,
      default: 300,
    },

    /**
     * @language=zh
     * 组件挂载后是否向服务端发送请求
     */
    immediate: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 是否对发送的参数开启路径解析
     */
    parseRequestPath: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 自定义列表渲染函数
     */
    customRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 筛选内容同步至url
     */
    syncUrl: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const at = this.$attrs || {};
    const { page, size } = this.genDefaultPageInfo();

    return {
      page: at?.['current-page'] || page,
      size: at?.['page-size'] || size,

      data: [],
      total: at?.total || 0,
      loading: false,

      axios: null,
      cancelFunc: null,

      query: null,
    };
  },

  watch: {
    filters: {
      handler(val, oldVal) {
        if (val?.length !== oldVal.length) {
          this.mergeSearchQuery();
        }
      },
      deep: true,
    },

    url(val, oldVal) {
      if (val !== oldVal) {
        this.cancelFetchTableData();
        this.fetchTableData();
      }
    },
  },

  created() {
    this.checkKeys();
  },

  async mounted() {
    const { table } = this.$refs;
    if (table) {
      // proxy <elem-extend-table> methods, 代理<elem-extend-table>的方法
      ELEM_TABLE_METHODS.forEach((key) => {
        this[key] = table[key];
      });
    }

    // load from location.search, 从location.search中加载筛选条件
    this.mergeSearchQuery();

    this.axios = axios.create({});

    // register interceptors, 注册拦截器
    if (typeof this.onRequest === 'function') {
      this.axios.interceptors.request.use(
        onCallback(this.onRequest), // resolve
        onCallback(this.onRequest, { rejected: true }), // reject
      );
    }
    if (typeof this.onResponse === 'function') {
      this.axios.interceptors.response.use(
        onCallback(this.onResponse),
        onCallback(this.onResponse, { rejected: true }),
      );
    }

    this.debounceFetchTableData = debounce(() => {
      this.cancelFetchTableData();
      this.fetchTableData();
    }, this.inputDebounce);

    if (this.immediate) this.fetchTableData();
  },

  beforeDestroy() {
    this.cancelFetchTableData();
  },

  computed: {
    // table attributes, 表格属性
    tableAttrs() {
      const result = {
        offline: false,
        loading: this.loading,
        total: this.total,
        data: this.data,
        currentPage: this.page,
        pageSize: this.size,
        lite: true,
        ...omit(this.$attrs, ELEM_FORM_ATTRS),
      };

      return result;
    },

    // table listeners, 表格事件监听
    tableListeners() {
      const listeners = omit(this.$listeners || {}, EL_FORM_EVENTS);
      const sizeChange = listeners['size-change'];
      const currentChange = listeners['current-change'];

      return {
        ...listeners,
        'size-change': (size) => {
          if (typeof sizeChange === 'function') sizeChange(size);
          this.setPageSize(size);
        },
        'current-change': (page) => {
          if (typeof currentChange === 'function') currentChange(page);
          this.setCurrentPage(page);
        },
      };
    },

    // form attributes, 表单属性
    formAttrs() {
      return {
        query: this.query,
        lite: true,
        filters: this.FILTERS,
        'auto-layout': true,
        'label-position': 'right',
        'label-width': '80px',
        'show-button-group': this.showButtonGroup,
        ...pick(this.$attrs || {}, ELEM_FORM_ATTRS),
      };
    },

    // form attributes, 表单监听
    formListeners() {
      const listeners = pick(this.$listeners || {}, EL_FORM_EVENTS);
      const onSearch = listeners['on-search'];
      const onReset = listeners['on-reset'];

      return {
        ...listeners,
        'on-search': () => {
          if (typeof onSearch === 'function') onSearch(this.query);
          this.handleSyncUrl();
          this.setCurrentPage(1);
        },
        'on-reset': () => {
          if (typeof onReset === 'function') onReset(this.query);
          this.handleSyncUrl();
          this.reset();
        },
      };
    },

    // default query, 表单默认值
    defaultQuery() {
      return this.filters.reduce((a, c) => {
        if (typeof c.defaultValue !== 'undefined') {
          this.set(a, c.prop, c.defaultValue);
        } else if (ELEM_RANGE_TYPES.indexOf(c.type) > -1) {
          this.set(a, c.prop, []);
        } else {
          const isNumber = c?.attrs?.type === 'number' || c.type === 'input-number';
          this.set(a, c.prop, isNumber ? 0 : '');
        }

        return a;
      }, {});
    },

    FILTERS() {
      // reactive filters, 数据变化自动请求
      if (!this.showButtonGroup) {
        return this.filters.map((e) => {
          const change = e?.listeners?.change;
          const input = e?.listeners?.change;

          return {
            ...e,
            listeners: {
              ...e.listeners,
              change: (val) => {
                if (typeof change === 'function') change(val);
                if (OPTIONS_COMPONENTS.indexOf(e.type) > -1) {
                  this.cancelFetchTableData();
                  this.fetchTableData();
                }
              },
              input: (val) => {
                if (typeof input === 'function') input(val);
                if (OPTIONS_COMPONENTS.indexOf(e.type) === -1) {
                  this.$nextTick(() => {
                    this.debounceFetchTableData();
                  });
                }
              },
            },
          };
        });
      }

      return this.filters;
    },
  },

  methods: {
    // reset query and page, 重置查询条件和当前页数
    reset() {
      this.query = cloneDeep(this.defaultQuery);
      this.page = 1;
    },

    set(obj, path, value) {
      if (this.parseRequestPath) {
        return set(obj, path, value);
      }

      // eslint-disable-next-line
      obj[path] = value;
      return obj;
    },

    // check parse data keys, 检查解析数据的键值
    checkKeys() {
      DATA_KEYS.forEach((k) => {
        if (!this[k]) throw new Error(`[ElemTablePage]: prop ${k} is required!`);
      });
    },

    // change current page, 修改当前页
    setCurrentPage(page) {
      this.page = page;
      this.cancelFetchTableData();
      this.fetchTableData();
    },

    // change page size, 修改分页大小
    setPageSize(size) {
      this.size = size;
      this.page = 1;
      this.cancelFetchTableData();
      this.fetchTableData();
    },

    // fetch table data, 获取表格数据
    fetchTableData() {
      // wait for request-config change
      this.$nextTick(async () => {
        this.loading = true;
        this.data = [];

        try {
          // axios request config passed by user, 用户传入的axios请求配置
          const config = {
            ...this.requestConfig,
            cancelToken: new axios.CancelToken((func) => {
              this.cancelFunc = func;
            }),
          };

          // request config generated, 生成的axios请求配置
          if (!config.url) {
            config.url = this.url;
          }

          // with body or not, 数据携带于body/url
          const method = (config?.method || '').toLowerCase();

          const key = ['post', 'put', 'patch'].indexOf(method) !== -1 ? 'data' : 'params';
          config[key] = await this.mergeConfigData(config, key);

          const { data } = await this.axios(config);

          // data list, 列表数据
          let d = get(data, this.dataKey);
          d = Array.isArray(d) ? d : [];

          // summary data, 汇总数据
          let summary = null;
          if (this.summaryKey && d.length) {
            summary = get(data, this.summaryKey);
            if (isObject(summary)) d = [summary, ...d];
          }

          // transformer, 转换函数
          try {
            if (typeof this.transformer === 'function') {
              d = await this.transformer(d);
            }
          } catch (err) {
            console.error(err);
          }
          this.data = d;

          // total count, 数据总量
          const t = get(data, this.totalKey);
          this.total = +t || 0;

          this.loading = false;
          this.cancelFunc = null;
        } catch (err) {
          if (!(err instanceof axios.Cancel)) {
            this.loading = false;
            this.cancelFunc = null;
          }
          if (typeof this.onError === 'function') this.onError(err);
        }
      });
    },

    // cancel fetch table data, 取消获取表格数据
    cancelFetchTableData() {
      if (typeof this.cancelFunc === 'function') {
        this.cancelFunc();
        this.cancelFunc = null;
      }
    },

    // generate query params, 生成请求参数
    genParams() {
      const result = {};
      this.set(result, this.pageKey, this.page);
      this.set(result, this.pageSizeKey, this.size);
      Object.keys(this.query).forEach((k) => {
        this.set(result, k, this.query[k]);
      });

      return result;
    },

    // merge config data, 合并请求数据
    async mergeConfigData(config, key) {
      let result = cloneDeep({
        ...this.genParams(),
        ...config[key],
      });

      try {
        if (typeof this.paramTransformer === 'function') {
          result = await this.paramTransformer(result);
        }
      } catch (err) {
        console.error(err);
      }

      return result;
    },

    // check URLSearchParams, 检测URLSearchParams
    checkURLSearchParams() {
      return typeof window !== 'undefined' && typeof URLSearchParams !== 'undefined';
    },

    // generate default page and pageSize, page与pageSize的默认值
    genDefaultPageInfo() {
      let page = 1;
      let size = 10;

      if (this.syncUrl && this.checkURLSearchParams()) {
        const search = new URLSearchParams(window.location.search);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of search) {
          if (key === this.pageKey) page = +val;
          else if (key === this.pageSizeKey) size = +val;
        }
      }

      return { page, size };
    },

    // generate query value from location.search, 从location.search生成筛选条件值
    genSearchQuery() {
      const searchQuery = {};
      if (this.syncUrl && this.checkURLSearchParams()) {
        const search = new URLSearchParams(window.location.search);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of search) {
          try {
            set(searchQuery, key, JSON.parse(val));
          } catch (err) {
            console.error(err);
          }
        }
      }

      const result = {};
      // in filters and visible is truly, 存在于filters中且visible为真值
      this.filters.forEach((e) => {
        if (typeof e.visible === 'undefined' || e.visible) {
          const val = get(searchQuery, e.prop);

          if (Array.isArray(val) && val.length) {
            set(result, e.prop, val);
          } else if (val != null && val !== 0 && val !== '') {
            set(result, e.prop, val);
          }
        }
      });

      return result;
    },

    // sync parameters to url, 同步筛选条件到url
    handleSyncUrl() {
      if (this.syncUrl && this.checkURLSearchParams()) {
        const search = new URLSearchParams(window.location.search);
        const searchParams = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of search) searchParams[key] = val;
        let params = this.genParams();
        params = Object.keys(params).reduce((a, c) => ({
          ...a,
          [c]: JSON.stringify(params[c]),
        }), {});

        const url = `?${new URLSearchParams({ ...searchParams, ...params })}`;
        window.history.replaceState(null, null, url);
      }
    },

    // merge search query with default query, 合并url中筛选条件和默认值
    mergeSearchQuery() {
      this.query = cloneDeep({
        ...this.defaultQuery,
        ...this.genSearchQuery(),
      });
    },
  },
};
</script>
