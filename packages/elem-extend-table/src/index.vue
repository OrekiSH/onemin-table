<template>
  <div>
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
import ElemPagination from './components/elem-pagination.vue';

const PAGINATION_ATTRS = [
  'small',
  'background',
  'total',
  'pageCount',
  'pagerCount',
  'currentPage',
  'layout',
  'pageSizes',
  'popperClass',
  'prevText',
  'nextText',
  'disabled',
  'hideOnSinglePage',
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
    };
  },

  computed: {
    // 分页器属性
    defaultPaginationAttrs() {
      return {
        'hide-on-single-page': true,
        'pager-count': 5,
        'page-size': this.pageSize,
        layout: 'sizes, total, prev, pager, next',
        ...pick(this.$attrs, PAGINATION_ATTRS),
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
      return {
        'default-sort': this.defaultSort,
        ...omit(this.$attrs, PAGINATION_ATTRS),
      };
    },

    tableAttrs() {
      const attrs = this.defaultTableAttrs;
      // 前端分页, use frontend pagination
      if (this.offline) {
        attrs.data = this.pageData;
      }
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
    this.genInnerData();
    this.genPageData();

    const ref = this.$refs.table;
    // Proxy <elem-table> methods, 代理<elem-table>的方法
    if (ref) {
      [
        'toggleRowExpansion', 'setCurrentRow',
        'clearSort', 'clearFilter', 'doLayout', 'sort',
        'clearSelection', 'toggleAllSelection', 'toggleRowSelection',
        'setCellAttrs',
      ].forEach((key) => {
        this[key] = ref[key];
      });
    }

    if (this.offline) {
      // 监听data变化, watch data change
      this.$watch('$attrs.data', {
        handler(val, oldVal) {
          this.genInnerData();
          this.genPageData(oldVal.length !== val.length ? { page: 1 } : {});
        },
        deep: true,
      });

      // 默认排序
      const prop = this.defaultSort?.prop;
      if (prop) {
        const curr = (this.$attrs.columns || []).find((e) => e.prop === prop);
        // 不可编辑可排序, if not editable can be sorted
        if (curr && [undefined, 'text'].includes(curr.type)) {
          this.handleSortChange(this.defaultSort);
        }
      }
    }

    // 分页器事件
    this.genPaginationListeners();
    // 表格事件
    this.genTableListeners();
  },

  methods: {
    genInnerData() {
      this.innerData = (this.$attrs.data || []).concat();
    },

    // 表格事件
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

    // 分页器事件
    genPaginationListeners() {
      const listeners = pick(this.$listeners, PAGINATION_LISTENERS);
      // 前端分页, use frontend pagination
      if (this.offline) {
        const pageChange = listeners['current-change'];
        const sizeChange = listeners['size-change'];

        // 当前页变化, current page change
        listeners['current-change'] = (page) => {
          if (typeof pageChange === 'function') {
            pageChange(page);
          }
          this.genPageData({ page });
        };

        // 每页条数变化, page size change
        listeners['size-change'] = (size) => {
          if (typeof sizeChange === 'function') {
            sizeChange(size);
          }
          this.genPageData({ page: 1, size });
        };
      }

      this.paginationListeners = listeners;
    },

    // 表格当前页数据, table current page data
    genPageData({ page, size } = {}) {
      const d = this.innerData;
      if (page !== undefined) this.page = page;
      if (size !== undefined) this.size = size;

      this.total = d.length;
      this.pageData = d.slice((this.page - 1) * this.size, this.page * this.size);
    },

    // 表格排序, sort table
    handleSortChange({ prop, order }) {
      console.warn(prop, order);
      if (order) {
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
      } else {
        this.genInnerData();
      }

      this.genPageData({ page: 1 });
    },

    // 表格筛选, filter table
    handleFilterChange(filterMap) {
      const hasVal = Object.values(filterMap).some((e) => e.length);
      if (hasVal) {
        const keys = Object.keys(filterMap);
        this.innerData = (this.$attrs.data || []).filter((row) => {
          // 在选中列表中, in selected
          return keys.every((key) => get(filterMap, key).indexOf(get(row, key)) > -1);
        });
      } else {
        this.genInnerData();
      }

      this.genPageData({ page: 1 });
    },
  },
};
</script>

<style>

</style>