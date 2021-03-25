<template>
  <el-table
    v-loading="loading"
    ref="table"
    :data="data"
    v-bind="$attrs"
    v-on="listeners"
    class="ot-table--elem"
    @select="handleSelectEvent"
    @select-all="handleSelectAllEvent"
    @cell-click="cellClick"
    @cell-dblclick="cellDblclick"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
  >
    <template
      v-for="(col, index) in columns"
    >
      <!-- Builtin types, 内置类型 -->
      <el-table-column
        v-if="['selection', 'index'].includes(col.type)"
        :key="`${col.prop}_${index}`"
        v-bind="genColumnAttrs(col)"
      />

      <!-- Other types with children, 其他类型带多级表头 -->
      <elem-table-column-group
        v-else-if="Array.isArray(col.children)"
        :key="`${col.prop}_${index}`"
        :col="col"
      />

      <!-- Other types, 其他类型 -->
      <elem-table-column
        v-else
        :key="`${col.prop}_${index}`"
        :col="col"
      />
    </template>
  </el-table>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import set from 'lodash/set';
import kebabCase from 'lodash/kebabCase';
import { ELEM_DATE_TYPES } from '@onemin-table/shared';
import ElemTableColumnGroup from './components/table-column-group.vue';
import ElemTableColumn from './components/table-column.vue';

const SELECTION_LISTENERS = ['select', 'select-all', 'selection-change'];
const CELL_LISTENERS = [
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
];

const SKIP_LISTENERS = [
  ...SELECTION_LISTENERS,
  ...CELL_LISTENERS,
];

// 不绑定到<el-table-column>的列属性
const SKIP_COLUMN_ATTRS = [
  'children',
  'attrs',
  'listeners',
  'headerSlotRender',
  'errorSlotRender',
  'placeholderSlotRender',
];

export default {
  name: 'ElemTable',

  components: {
    ElemTableColumnGroup,
    ElemTableColumn,
  },

  props: {
    /**
     * @language=zh
     * 表格数据
     */
    data: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 表格列schema
     */
    columns: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 表格是否加载中
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 全局选中列表
     */
    selection: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 全局选中列表主键
     */
    selectionKey: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 为true时先选中的在全局选中列表的后面(栈)， 默认先选中的在全局选中列表的前面(队列)
     */
    stackSelection: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 图片类型的列是否显示Popover
     */
    imagePopover: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 图片类型的列是否启用预览
     */
    imagePreview: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 全局单元格对齐方式, left/center/right
     */
    align: {
      type: String,
      default: 'left',
    },

    /**
     * @language=zh
     * 全局表头对齐方式, left/center/right
     */
    headerAlign: {
      type: String,
      default: 'left',
    },

    /**
     * @language=zh
     * 当内容过长被隐藏时显示 tooltip
     */
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 全局列最小宽度
     */
    minWidth: {
      type: Number,
      default: 100,
    },

    /**
     * @language=zh
     * 固定列克隆的Popover实例是否移除
     * 关联https://github.com/ElemeFE/element/issues/10588
     */
    noDuplicatePopover: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 滚动容器选择器(window直接使用window字符串), 指定时会在滚动时更新popover的位置信息
     */
    scrollWrapper: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 滚动debounce延迟时间
     */
    scrollDebounce: {
      type: Number,
      default: 0,
    },
  },

  inheritAttrs: false,

  provide() {
    return {
      genColumnAttrs: this.genColumnAttrs,
      genColumnItemAttrs: this.genColumnItemAttrs,
      genColumnItemListeners: this.genColumnItemListeners,
    };
  },

  data() {
    return {
      cellAttrsMap: {},
      clones: [],
    };
  },

  computed: {
    listeners() {
      return Object.keys(this.$listeners).reduce((a, key) => {
        // combine selection event, rewrite cell event, 合并选择事件, 重新封装单元格事件
        if (!SKIP_LISTENERS.includes(key)) {
          // eslint-disable-next-line
          a[key] = this.$listeners[key];
        }
        return a;
      }, {});
    },

    /**
     * 存在固定列
     * some columns fixed
     */
    someFixed() {
      return (this.columns ? this.columns : []).some((e) => e.fixed);
    },
  },

  watch: {
    /**
     * selection prop change toggle selection
     * selection改变触发选中行为
     */
    selection() {
      const ref = this.$refs.table;
      if (ref) ref.clearSelection();

      this.$nextTick(() => {
        this.handleToggleSelection();
      });
    },

    /**
     * page change toggle selection
     * 翻页触发选中行为
     */
    data() {
      this.$nextTick(() => {
        this.handleToggleSelection();
      });
    },

    columns() {
      this.initCellAttrsMap();
    },
  },

  created() {
    CELL_LISTENERS.forEach((name) => {
      this[camelCase(name)] = (...args) => this.handleCellEvent(name, ...args);
    });
  },

  mounted() {
    const ref = this.$refs.table;
    // Proxy <el-table> methods, 代理<el-table>的方法
    if (ref) {
      ['toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'].forEach((key) => {
        this[key] = ref[key];
      });

      this.clearSelection = () => {
        this.$emit('selection-change', []);
      };
      this.toggleAllSelection = () => {
        this.$emit('selection-change', cloneDeep(this.data));
      };
      // toggle row selection by rowIndex, 根据行索引触发列选中
      this.toggleRowSelection = (rowIndex, selected) => {
        const row = this.data[rowIndex];

        if (selected) {
          this.handleSelect([
            ...this.selection,
            row,
          ]);
        } else {
          if (!this.checkSelectionKey()) return;
          const d = this.selection
            .filter((e) => get(e, this.selectionKey) !== get(row, this.selectionKey));
          this.$emit('selection-change', cloneDeep(d));
        }
      };
    }

    this.initCellAttrsMap();
  },

  methods: {
    get,

    /**
     * form item' data changes
     * 表单元素上绑定值改变
     */
    handleChange(val, scope, col) {
      set(scope.row, col.prop, val);

      this.$emit('on-change', {
        rowIndex: scope.$index,
        colProp: col.prop,
        value: val,
        scope,
        col,
      });
    },

    /**
     * check selectionKey prop
     * 检查selectionKey是否填写
     */
    checkSelectionKey() {
      if (this.columns.find((e) => e.type === 'selection') && !this.selectionKey) {
        const ref = this.$refs.table;
        if (ref) ref.clearSelection();
        throw new Error('[ElemTable]: prop selection-key is required!');
      }
      return !!this.selectionKey;
    },

    /**
     * in selection, not in rows: delete
     * 在全局选中列表且不在当前选中列表: 从全局选中列表删除
     *
     * in rows, not in selection: add
     * 在当前选中列表且不在全局选中列表: 添加到全局选中列表
     */
    handleSelect(rows) {
      if (!this.checkSelectionKey()) return;

      const rowKeys = rows.map((e) => get(e, this.selectionKey));
      // immutable prop, prop不可变
      const selection = cloneDeep(this.selection);
      const method = this.stackSelection ? 'unshift' : 'push';

      this.data.forEach((row) => {
        const key = get(row, this.selectionKey);
        const indexInRow = rowKeys.indexOf(key);
        const indexInSelection = selection.map((e) => get(e, this.selectionKey)).indexOf(key);

        if (indexInSelection > -1 && indexInRow === -1) {
          selection.splice(indexInSelection, 1);
        }
        if (indexInRow > -1 && indexInSelection === -1) {
          selection[method](row);
        }
      });

      this.$emit('selection-change', selection);
    },

    /**
     * user manual check Checkbox
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     */
    handleSelectEvent(rows) {
      this.$emit('select', rows);
      this.handleSelect(rows);
    },

    /**
     * user manual check select-all Checkbox
     * 当用户手动全选 Checkbox时触发的事件
     */
    handleSelectAllEvent(rows) {
      this.$emit('select-all', rows);
      this.handleSelect(rows);
    },

    /**
     * select rows in `this.selection`
     * 选中全局选中列表中的数据
     */
    handleToggleSelection() {
      if (!this.checkSelectionKey()) return;

      this.selection.forEach((row) => {
        const current = this.data
          .find((e) => get(e, this.selectionKey) === get(row, this.selectionKey));
        const ref = this.$refs.table;
        if (current && ref) ref.toggleRowSelection(current, true);
      });
    },

    /**
     * image type column <el-popover>'s attrs
     * 图片类型列<el-popover>的属性
     */
    genImagePopoverAttrs(col) {
      return {
        trigger: 'hover',
        width: '200',
        placement: 'right',
        disabled: !this.imagePopover,
        ...col.popoverAttrs,
      };
    },

    /**
     * column default attrs
     * 列默认属性
     */
    genColumnAttrs(col) {
      // 兼容中划线与小驼峰, kebab case and camel case compatible
      const temp = {};
      Object.keys(col).forEach((k) => {
        if (SKIP_COLUMN_ATTRS.includes(k)) return; // 过滤children等属性, filter children attr
        temp[k] = col[k];
        temp[kebabCase(k)] = col[k];
      });

      const result = {
        'min-width': this.minWidth,
        'show-overflow-tooltip': this.showOverflowTooltip,
        'header-align': this.headerAlign,
        align: this.align,
        ...temp,
      };

      return result;
    },

    /**
     * form element cell attrs
     * 列表单元素属性值
     */
    genColumnItemAttrs(col, scope) {
      const map = {
        image: {
          col,
          scope,
          'image-popover': this.imagePopover,
          'image-preview': this.imagePreview,
        },

        ...Object.fromEntries([
          'select',
          'single-select',
          'cascader',
        ].map((t) => [t, {
          options: col.options,
          value: get(scope.row, col.prop),
        }])),

        input: { value: get(scope.row, col.prop) },

        ...Object.fromEntries(ELEM_DATE_TYPES.map((t) => [t, { value: get(scope.row, col.prop) }])),
      };

      // default, attrs set, user set
      // 默认属性, 通过attrs设置的属性, 用户手动设置的属性
      const result = {
        scrollWrapper: this.scrollWrapper,
        scrollDebounce: this.scrollDebounce,
        ...map[col.type] || {},
        ...col.attrs,
        ...this.cellAttrsMap?.[col.prop]?.[scope.$index],
        'data-prop': `${col.prop || ''}_${scope.$index}`,
      };

      if (col.type === 'select') result.multiple = true;

      return result;
    },

    /**
     * form element cell listeners
     * 列表单元素事件监听
     */
    genColumnItemListeners(col, scope) {
      const isSystemTypes = [
        'input',
        'select',
        'single-select',
        ...ELEM_DATE_TYPES,
      ].includes(col.type);

      // system components value changed, 系统定义组件值改变事件
      const changeEvent = isSystemTypes
        ? { [col.type === 'input' ? 'input' : 'change']: (val) => this.handleChange(val, scope, col) }
        : {};

      const result = {};
      Object.keys(col?.listeners || {}).forEach((k) => {
        if (typeof col.listeners[k] === 'function') {
          result[k] = (...args) => {
            // merge system change event with user defined change event
            // 合并系统值改变事件与用户定义值改变事件
            if (typeof changeEvent[k] === 'function') changeEvent[k](...args);
            col.listeners[k](scope.$index, ...args);
          };
        }
      });

      return {
        ...changeEvent,
        ...result,
      };
    },

    /**
     * rewrite cell events, add rowIndex, colProp
     * 重新封装单元格事件, 增加行索引,列标识
     */
    handleCellEvent(name, row, col, cell, event) {
      this.$emit(name, {
        rowIndex: this.data?.indexOf(row),
        colProp: col.property,
        row,
        col,
        cell,
        event,
      });
    },

    /**
     * init cell attrs map structure
     * 初始化cellAttrsMap结构
     */
    initCellAttrsMap() {
      const map = {};
      this.columns.forEach((e) => {
        if (e.prop) map[e.prop] = [];
      });
      this.cellAttrsMap = map;
    },

    /**
     * set cell attributes
     * 设置单元格属性
     */
    setCellAttrs(colProp, rowIndex, attrs) {
      // fixed column exists, 固定列存在
      const duplicateRemove = this.someFixed
        && attrs.popoverVisible
        && this.noDuplicatePopover;

      let popoverIds = [];
      if (duplicateRemove) {
        // related to https://github.com/ElemeFE/element/issues/10588
        const nodes = this.$el?.querySelectorAll('[id^="el-popover-"]');
        popoverIds = [...nodes].map((e) => e.id);
      }

      // set attrs, 设置属性
      this.$set(this.cellAttrsMap[colProp], rowIndex, attrs);

      if (duplicateRemove && popoverIds?.length) {
        // delete cloned popover, 删除克隆的列生成的popover.
        this.$nextTick(() => {
          const nodes = this.$el?.querySelectorAll('[id^="el-popover-"]');
          const ids = [...nodes].map((e) => e.id);
          const appended = popoverIds.filter((e) => !ids.includes(e));
          appended.forEach((id) => {
            const isClone = document.body.querySelector(`.is-hidden [aria-describedby="${id}"]`);
            if (isClone && !this.clones.includes(id)) {
              this.clones.push(id);
            }
          });

          this.clones.forEach((id) => {
            document.body.removeChild(document.body.querySelector(`#${id}`));
          });
        });
      }
    },
  },
};
</script>

<style>
.ot-table--elem .ot-table__image--elem {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.ot-table--elem .el-image__placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #C0C4CC;
  vertical-align: middle;
}

.ot-table--elem .el-cascader__tags {
  flex-wrap: nowrap;
  overflow: hidden;
}

.ot-table--elem .el-select__tags {
  flex-wrap: nowrap;
  overflow: hidden;
}
</style>
