<template>
  <div class="ot-table-page--elem">
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
import { ELEM_TABLE_METHODS } from '@onemin-table/shared';

// 解析后端数据的键, key to parse data from backend.
const DATA_KEYS = [
  'totalKey',
  'dataKey',
  'pageKey',
  'pageSizeKey',
  'url',
];

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
     * axios拦截器设置
     */
    interceptors: {
      type: Object,
      default: null,
    },

    /**
     * @language=zh
     * axios4xx/5xx响应时的回调函数
     */
    onResponseError: {
      type: Function,
      default: null,
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

    // register interceptors, 注册拦截器
    const { request, response } = this.interceptors || {};
    if (request && response) {
      axios.interceptors = interceptors;
    }

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
        ...omit(this.$attrs, []),
      };

      return result;
    },

    // table listeners, 表格事件监听
    tableListeners() {
      const listeners = this.$listeners || {};
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

    // query params, 请求参数
    params() {
      const result = {};
      set(result, this.pageKey, this.page);
      set(result, this.pageSizeKey, this.size);

      return result;
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
        const opts = {
          url: this.url,
        };

        // with body or not, 数据携带于body/url
        const method = (config?.method || '').toLowerCase();
        if (['post', 'put', 'patch'].indexOf(method) !== -1) {
          opts.data = params;
        } else {
          opts.params = params;
        }

        const { data } = await axios({
          ...opts,
          ...config,
        });

        // data list, 列表数据
        const d = get(data, this.dataKey);
        this.data = Array.isArray(d) ? d : [];
        // total count, 数据总量
        const t = get(data, this.totalKey);
        this.total = +t || 0;
      } catch (err) {
        if (typeof this.onResponseError === 'function') this.onResponseError(err);
      }
      this.loading = false;
    },
  },
};
</script>
