<template>
  <div class="ot-table-page--elem">
    <elem-form
      ref="form"
      v-bind="formAttrs"
      v-on="formListeners"
    />

    <elem-extend-table
      ref="table"
      v-bind="tableAttrs"
      v-on="tableListeners"
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
import {
  EL_FORM_EVENTS,
  ELEM_TABLE_METHODS,
  ELEM_FORM_ATTRS,
  OPTIONS_COMPONENTS,
} from '@onemin-table/shared';

// 解析后端数据的键, key to parse data from backend.
const DATA_KEYS = [
  'totalKey',
  'dataKey',
  'pageKey',
  'pageSizeKey',
  'url',
];

function onCallback(cb, rejected) {
  // config/error/response
  return (data) => {
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
      type: Boolean,
      default: 300,
    },
  },

  data() {
    const at = this.$attrs || {};

    return {
      page: at?.['current-page'] || 1,
      size: at?.['page-size'] || 10,

      data: [],
      total: at?.total || 0,
      loading: false,

      axios: null,

      query: null,
    };
  },

  created() {
    this.checkKeys();
  },

  mounted() {
    const { table } = this.$refs;
    if (table) {
      // proxy <elem-extend-table> methods, 代理<elem-extend-table>的方法
      ELEM_TABLE_METHODS.forEach((key) => {
        this[key] = table[key];
      });
    }

    this.query = this.defaultQuery;

    this.axios = axios.create({});

    // register interceptors, 注册拦截器
    if (typeof this.onRequest === 'function') {
      this.axios.interceptors.request.use(
        onCallback(this.onRequest, false), // resolve
        onCallback(this.onRequest, true), // reject
      );
    }
    if (typeof this.onResponse === 'function') {
      this.axios.interceptors.response.use(
        onCallback(this.onResponse, false),
        onCallback(this.onResponse, true),
      );
    }

    this.debounceFetchTableData = debounce(this.fetchTableData, this.inputDebounce);
    this.fetchTableData();
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
        ...pick(this.$attrs || {}, ELEM_FORM_ATTRS),
        query: this.query,
        filters: this.FILTERS,
        'auto-layout': true,
        'label-position': 'left',
        'label-width': '80px',
        'show-button-group': this.showButtonGroup,
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
          this.setCurrentPage(1);
        },
        'on-reset': () => {
          this.query = this.defaultQuery;
          console.warn(this.query);
          if (typeof onReset === 'function') onReset(this.query);
          this.setCurrentPage(1);
        },
      };
    },

    // form attributes, 表单监听
    defaultQuery() {
      return this.filters.reduce((a, c) => {
        if (typeof c.defaultValue !== 'undefined') {
          set(a, c.prop, c.defaultValue);
        } else if (c.type === 'select') {
          set(a, c.prop, []);
        } else {
          set(a, c.prop, '');
        }
        return a;
      }, {});
    },

    // query params, 请求参数
    params() {
      const result = {};
      set(result, this.pageKey, this.page);
      set(result, this.pageSizeKey, this.size);
      Object.keys(this.query).forEach((k) => {
        set(result, k, this.query[k]);
      });

      return result;
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
                if (OPTIONS_COMPONENTS.indexOf(e.type) > -1) this.fetchTableData();
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
    // check parse data keys, 检查解析数据的键值
    checkKeys() {
      DATA_KEYS.forEach((k) => {
        if (!this[k]) throw new Error(`[ElemTablePage]: prop ${k} is required!`);
      });
    },

    // change current page, 修改当前页
    setCurrentPage(page) {
      this.page = page;
      this.fetchTableData();
    },

    // change page size, 修改分页大小
    setPageSize(size) {
      this.size = size;
      this.page = 1;
      this.fetchTableData();
    },

    // fetch table data, 获取表格数据
    async fetchTableData() {
      this.loading = true;

      try {
        // axios request config passed by user, 用户传入的axios请求配置
        const config = this.requestConfig;

        const { params } = this;
        // request config generated, 生成的axios请求配置
        if (!config.url) {
          config.url = this.url;
        }

        // with body or not, 数据携带于body/url
        const method = (config?.method || '').toLowerCase();
        if (['post', 'put', 'patch'].indexOf(method) !== -1) {
          config.data = {
            ...config.data,
            ...params,
          };
        } else {
          config.params = {
            ...config.params,
            ...params,
          };
        }

        const { data } = await this.axios(config);

        // data list, 列表数据
        let d = get(data, this.dataKey);
        d = Array.isArray(d) ? d : [];
        if (typeof this.transformer === 'function') d = this.transformer(d);
        this.data = d;

        // total count, 数据总量
        const t = get(data, this.totalKey);
        this.total = +t || 0;
      } catch (err) {
        if (typeof this.onError === 'function') this.onError(err);
      }
      this.loading = false;
    },
  },
};
</script>
