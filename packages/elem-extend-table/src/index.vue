<template>
  <div class="ot-extend-table--elem">
    <elem-pagination
      v-if="paginationPosition === 'top'"
      v-bind="paginationAttrProps"
    />

    <elem-table
      ref="table"
      v-bind="tableAttrs"
      v-on="tableListeners"
    />

    <elem-pagination
      v-if="paginationPosition === 'bottom'"
      v-bind="paginationAttrProps"
    />
  </div>
</template>

<script>
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import { ELEM_TABLE_METHODS } from '@onemin-table/shared';
import ElemPagination from './components/elem-pagination.vue';

const PAGINATION_ATTRS = [
  'small',
  'background',
  'total',
  'page-count',
  'pager-count',
  'current-page',
  'layout',
  'page-sizes',
  'popper-class',
  'prev-text',
  'next-text',
  'disabled',
  'hide-on-single-page',
];

const PAGINATION_LISTENERS = [
  'size-change',
  'current-change',
  'prev-click',
  'next-click',
];

export default {
  name: 'ElemExtendTable',

  components: {
    ElemPagination,
  },

  inheritAttrs: false,

  props: {
    /**
     * @language=zh
     * 分页位于表格上方或下方
     */
    paginationPosition: {
      type: String,
      default: 'bottom',
    },

    /**
     * @language=zh
     * 分页左侧内容渲染函数
     */
    paginationLeftSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 分页右侧内容渲染函数
     */
    paginationRightSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 分页上方内容渲染函数
     */
    paginationTopSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 分页下方内容渲染函数
     */
    paginationBottomSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 每页默认条数
     */
    pageSize: {
      type: Number,
      default: 10,
    },

    /**
     * @language=zh
     * 默认的排序列的 prop 和顺序
     */
    defaultSort: {
      type: Object,
      default() { return {}; },
    },

    /**
     * @language=zh
     * 默认的排序列的 prop 和顺序
     */
    summaryMethod: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 翻页不从服务端获取数据
     */
    offline: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 过滤列表数据的参数，仅在offline模式下有效
     */
    query: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      // for offline mode, 前端分页状态
      total: 0,
      page: 1,
      size: this.pageSize,
      // data show in current page, 当前页数据
      pageData: [],
      // shallow clone table data for sort and filter, 为排序/筛选浅拷贝表格数据
      innerData: [],

      paginationListeners: null,
      tableListeners: null,

      order: null,
      prop: null,
    };
  },

  computed: {
    // 分页器属性
    defaultPaginationAttrs() {
      const attrs = this.$attrs || {};
      Object.keys(attrs).forEach((key) => {
        attrs[kebabCase(key)] = attrs[key];
      });

      return {
        'pager-count': 5,
        'page-size': this.pageSize,
        layout: 'sizes, total, prev, pager, next',
        ...pick(attrs, PAGINATION_ATTRS),
      };
    },

    paginationAttrs() {
      const attrs = this.defaultPaginationAttrs;
      // 前端分页, use frontend pagination
      if (this.offline) {
        attrs.total = this.total;
        attrs['current-page'] = this.page;
        attrs['page-size'] = this.size;
      }

      return attrs;
    },

    // 表格属性
    defaultTableAttrs() {
      const attrs = this.$attrs || {};
      Object.keys(attrs).forEach((key) => {
        attrs[kebabCase(key)] = attrs[key];
      });

      return {
        'default-sort': this.defaultSort,
        ...omit(attrs, PAGINATION_ATTRS),
      };
    },

    tableAttrs() {
      const attrs = this.defaultTableAttrs;
      // 前端分页, use frontend pagination
      if (this.offline) {
        attrs.data = this.pageData;

        attrs['transform-column-listener-params'] = (argCount, rowIndex, ...args) => {
          if (argCount < 3) return [rowIndex, ...args];
          return [rowIndex, ...args, attrs.data[rowIndex]];
        };
      }
      // 总计, summary
      if (typeof this.summaryMethod === 'function') {
        attrs['summary-method'] = this.offline
          ? ({ columns }) => this.summaryMethod({ columns, data: this.innerData })
          : this.summaryMethod;
        attrs['show-summary'] = true;
      }

      return attrs;
    },

    // <elem-pagination /> props
    paginationAttrProps() {
      return {
        attrs: this.paginationAttrs,
        listeners: this.paginationListeners,
        left: this.paginationLeftSlotRender,
        right: this.paginationRightSlotRender,
        top: this.paginationTopSlotRender,
        bottom: this.paginationBottomSlotRender,
      };
    },
  },

  mounted() {
    const ref = this.$refs.table;
    // Proxy <elem-table> methods, 代理<elem-table>的方法
    if (ref) {
      ELEM_TABLE_METHODS.forEach((key) => {
        this[key] = ref[key];
      });
    }

    // offline模式下可用/可见的函数
    if (this.offline) {
      this.initOfflineMethods();

      // init data, 初始化数据
      this.genInnerData();

      // default query, 默认过滤参数
      const values = Object.values(this.query || {}).filter(Boolean);
      if (values.length) {
        this.filterInnerData();
      }

      // generate current page data, 生成当前页数据
      this.genPageData();

      // watch origin data change, 监听源数据变化
      this.$watch('$attrs.data', {
        handler(val, oldVal) {
          this.genInnerData();
          this.genPageData(oldVal.length !== val.length ? { page: 1 } : {});
        },
        deep: true,
      });

      // watch query change, 监听过滤参数变化
      this.$watch('query', {
        handler() {
          this.genInnerData();
          this.filterInnerData();
          this.genPageData({ page: 1 });
        },
        deep: true,
      });

      // default sort, 默认排序
      const { prop } = this.defaultSort || {};
      if (prop) {
        const curr = (this.$attrs.columns || []).find((e) => e.prop === prop);
        // if not editable can be sorted, 不可编辑可排序
        if (curr && [undefined, 'text'].includes(curr.type)) {
          this.handleSortChange(this.defaultSort);
        }
      }

      // modify row index, 修改行索引
      this.setCellAttrs = (colProp, rowIndex, attrs) => {
        ref.setCellAttrs(colProp, rowIndex % this.size, attrs);
      };
    }

    // add setCurrentPage(available when offline is true), 添加page手动修改(offline模式下可用)
    this.setCurrentPage = (page) => {
      if (!this.offline) return;
      this.page = page;
      this.$emit('update:currentPage', page);
      this.genPageData({ page });
    };

    // add setPageSize(available when offline is true), 添加pageSize手动修改(offline模式下可用)
    this.setPageSize = (size) => {
      if (!this.offline) return;
      this.size = size;
      this.$emit('update:pageSize', size);
      this.genPageData({ size });
    };

    // 分页器事件
    this.genPaginationListeners();
    // 表格事件
    this.genTableListeners();
  },

  methods: {
    initOfflineMethods() {
      // shallow clone origin data, 浅拷贝列表数据
      this.genInnerData = () => {
        this.innerData = (this.$attrs.data || []).concat();
        if (this.order) {
          this.sortInnerData(this.order, this.prop);
        }
      };

      // table current page data, 表格当前页数据
      this.genPageData = ({ page, size } = {}) => {
        const d = this.innerData;
        if (typeof page !== 'undefined') this.page = page;
        if (typeof size !== 'undefined') this.size = size;

        this.total = d.length;
        this.pageData = d.slice((this.page - 1) * this.size, this.page * this.size);
      };

      // sort inner data, 列表数据排序
      this.sortInnerData = (order, prop) => {
        this.innerData.sort((a, b) => {
          const av = get(a, prop);
          const bv = get(b, prop);

          // eslint-disable-next-line
          if (!isNaN(av) && !isNaN(bv)) {
            return order === 'ascending' ? av - bv : bv - av;
          }

          if (av > bv) return order === 'ascending' ? 1 : -1;
          if (bv > av) return order === 'ascending' ? -1 : 1;

          return 0;
        });
      };

      // filter inner data, 列表数据过滤
      this.filterInnerData = () => {
        const keys = Object.keys(this.query || {});

        this.innerData = this.innerData.filter((row) => {
          for (let i = 0; i < keys.length; i += 1) {
            const k = keys[i];
            let rowVal = get(row, k);
            if (typeof rowVal === 'number') rowVal = `${rowVal}`;

            let val = this.query[k];
            if (typeof val === 'string') val = val.trim();
            if (Array.isArray(val) && val.filter(Boolean).some((e) => rowVal.indexOf(`${e}`) > -1)) {
              return true;
            }
            if (rowVal?.indexOf?.(val) > -1) return true;
          }

          return false;
        });
      };

      // sort table, 表格排序
      this.handleSortChange = ({ prop, order }) => {
        this.order = order;
        this.prop = prop;

        if (order) {
          this.sortInnerData(order, prop);
        } else {
          this.genInnerData();
        }

        this.genPageData({ page: 1 });
      };

      // filter table, 表格筛选
      this.handleFilterChange = (filterMap) => {
        const hasVal = Object.values(filterMap).some((e) => e.length);
        if (hasVal) {
          const keys = Object.keys(filterMap);
          this.innerData = (this.$attrs.data || []).filter((row) => (
            // in selected, 在选中列表中
            keys.every((key) => get(filterMap, key).indexOf(get(row, key)) > -1)),
          );
        } else {
          this.genInnerData();
        }

        this.genPageData({ page: 1 });
      };
    },

    genTableListeners() {
      const listeners = omit(this.$listeners, PAGINATION_LISTENERS);
      // 前端分页, use frontend pagination
      if (this.offline) {
        const sortChange = listeners['sort-change'];
        const filterChange = listeners['filter-change'];

        // 排序变化, sort change
        listeners['sort-change'] = ({ column, prop, order }) => {
          if (typeof sortChange === 'function') {
            sortChange({ column, prop, order });
          }
          this.handleSortChange({ prop, order });
        };

        // 筛选变化, filter change
        listeners['filter-change'] = (filterMap) => {
          if (typeof filterChange === 'function') {
            filterChange(filterMap);
          }

          this.handleFilterChange(filterMap);
        };
      }

      this.tableListeners = listeners;
    },

    genPaginationListeners() {
      const listeners = pick(this.$listeners, PAGINATION_LISTENERS);
      // 前端分页, use frontend pagination
      const pageChange = listeners['current-change'];
      const sizeChange = listeners['size-change'];

      // 当前页变化, current page change
      listeners['current-change'] = (page) => {
        if (typeof pageChange === 'function') {
          pageChange(page);
        }
        this.$emit('update:currentPage', page);

        if (this.offline) {
          this.genPageData({ page });
        }
      };

      // 每页条数变化, page size change
      listeners['size-change'] = (size) => {
        if (typeof sizeChange === 'function') {
          sizeChange(size);
        }
        this.$emit('update:pageSize', size);

        if (this.offline) {
          this.genPageData({ page: 1, size });
        }
      };

      this.paginationListeners = listeners;
    },
  },
};
</script>
