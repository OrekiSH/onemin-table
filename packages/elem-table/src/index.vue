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

      <el-table-column
        v-else-if="col.type === 'selection-item'"
        :key="`${col.prop}_${index}`"
        v-bind="genColumnAttrs(col)"
      >
        <template slot-scope="{ row }">
          <el-radio
            :value="selectionItemVal"
            :label="get(row, selectionKey)"
            @change="handleSelectionItemChange(row)"
          >{{ }}</el-radio>
        </template>
      </el-table-column>

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
import pick from 'lodash/pick';
import {
  ELEM_COMPONENTS, EL_TABLE_METHODS,
  OPTIONS_COMPONENTS, VALUE_COMPONENTS, LIST_COMPONENTS, INPUT_TYPES,
} from '@onemin-table/shared';
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
     * 全局单选选中项
     */
    selectionItem: {
      type: Object,
      default: null,
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
     * 图片类型的列数据转换函数
     */
    imageSrcTransformer: {
      type: Function,
      default: null,
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
     * 当单元格的值为空字符串/`null`/`undefined`时的后备渲染内容
     */
    placeholder: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 固定列克隆的Popover实例是否移除, 每次设置都会进行节点删除操作
     * 关联issue: https://github.com/ElemeFE/element/issues/10588
     */
    noDuplicatePopover: {
      type: Boolean,
      default: true,
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

    /**
     * @language=zh
     * 存在popover时, 禁止滚动容器x轴滚动
     */
    lockScrollX: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 存在popover时, 禁止滚动容器y轴滚动
     */
    lockScrollY: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 是否不使用内置组件，仅使用文字/自定义渲染模式(type="image"除外)
     */
    lite: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 可输入组件是否回车换行
     */
    enterChangeLine: {
      type: Boolean,
      default: false,
    },
  },

  inheritAttrs: false,

  provide() {
    return pick(this, [
      'genColumnAttrs',
      'genColumnItemAttrs',
      'genColumnItemListeners',
      'lite',
      'genColumnEnterChangeLine',
      'placeholder',
    ]);
  },

  data() {
    return {
      cellAttrsMap: {},
    };
  },

  computed: {
    selectionItemVal() {
      return get(this.selectionItem, this.selectionKey);
    },

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
      EL_TABLE_METHODS.forEach((key) => {
        this[key] = ref[key];
      });

      this.clearSelection = () => {
        this.handleSelectionChange([]);
      };
      this.toggleAllSelection = () => {
        this.handleSelectionChange(cloneDeep(this.data));
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
          this.handleSelectionChange(cloneDeep(d));
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

      this.handleSelectionChange(selection);
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
     * column default attrs
     * 列默认属性
     */
    genColumnAttrs(col) {
      // 兼容中划线与小驼峰, kebab case and camel case compatible
      const temp = {
        // 可编辑列show-overflow-tooltip默认false
        // editable columns show-overflow-tooltip default false
        'show-overflow-tooltip': typeof col.type !== 'undefined'
          || typeof col.render !== 'function',
      };
      Object.keys(col).forEach((k) => {
        if (SKIP_COLUMN_ATTRS.includes(k)) return; // 过滤children等属性, filter children attr
        temp[k] = col[k];
        temp[kebabCase(k)] = col[k];
      });

      const result = {
        'min-width': this.minWidth,
        'show-overflow-tooltip': this.showOverflowTooltip,
        'header-align': this.headerAlign,
        'column-key': (Array.isArray(col.children) && col.children.length) ? '' : col.prop,
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
          'image-src-transformer': this.imageSrcTransformer,
        },

        ...Object.fromEntries(OPTIONS_COMPONENTS.map((t) => [t, {
          options: col.options,
          value: get(scope.row, col.prop),
        }])),

        ...Object.fromEntries(VALUE_COMPONENTS.map((t) => [t, { value: get(scope.row, col.prop) }])),
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

      // multiple for <elem-select>
      if (col.type === 'select' && typeof result.multiple === 'undefined') result.multiple = true;
      if (col.type === 'cascader' && typeof result.multiple === 'undefined') result.multiple = true;
      if (col.type === 'single-cascader' && typeof result.checkStrictly === 'undefined') {
        result.checkStrictly = true;
      }

      // type for <elem-list-group>
      if (LIST_COMPONENTS.indexOf(col.type) > -1) result.type = col.type;

      if (typeof this.$attrs.duration !== 'undefined') {
        result.duration = this.$attrs.duration;
      }

      return result;
    },

    /**
     * form element cell listeners
     * 列表单元素事件监听
     */
    genColumnItemListeners(col, scope) {
      // system components value changed, 系统定义组件值改变事件
      const evt = INPUT_TYPES.indexOf(col.type) > -1 ? 'input' : 'change';
      const changeEvent = ELEM_COMPONENTS.indexOf(col.type) > -1
        ? { [evt]: (val) => this.handleChange(val, scope, col) }
        : {};

      const result = {};
      Object.keys(col?.listeners || {}).forEach((k) => {
        if (typeof col.listeners[k] === 'function') {
          result[k] = (...args) => {
            // merge system change event with user defined change event
            // 合并系统值改变事件与用户定义值改变事件
            if (typeof changeEvent[k] === 'function') changeEvent[k](...args);
            const transform = this.$attrs['transform-column-listener-params'];
            if (typeof transform === 'function') {
              col.listeners[k](...transform(col.listeners[k].length, scope.$index, ...args));
            } else {
              col.listeners[k](scope.$index, ...args);
            }
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

      // set attrs, 设置属性
      this.$set(this.cellAttrsMap[colProp], rowIndex, attrs);

      // lock scroll when popover shows, 存在popover时锁定表格滚动
      if (this.lockScrollX || this.lockScrollY) {
        // popover exists, 存在popover
        const somePopoverVisible = Object.values(this.cellAttrsMap)
          .flat().some((e) => e.popoverVisible);
        if (this.scrollEl && this.lockScrollX) {
          this.scrollEl.style.overflowX = somePopoverVisible ? 'hidden' : 'scroll';
        }
        if (this.scrollEl && this.lockScrollY) {
          this.scrollEl.style.overflowY = somePopoverVisible ? 'hidden' : 'scroll';
        }
      }

      // related to https://github.com/ElemeFE/element/issues/10588
      if (duplicateRemove) {
        // delete cloned popover, 删除克隆的列生成的popover.
        this.$nextTick(() => {
          const clonedColumns = document.body.querySelectorAll('.is-hidden [aria-describedby^="el-popover"]');
          const clones = [...clonedColumns]
            .map((e) => e?.getAttribute('aria-describedby'))
            .filter(Boolean);

          clones.forEach((id) => {
            const node = document.body.querySelector(`#${id}`);
            if (node && node.parentNode === document.body) document.body.removeChild(node);
          });
        });
      }
    },

    /**
     * enter change line handler
     * 回车换行处理函数
     */
    genColumnEnterChangeLine(col, scope, evt) {
      if (!col.enterChangeLine) return;
      const isEnter = evt.key === 'Enter' || evt.keyCode === 13;

      if (isEnter && evt.target) {
        const nextDataProp = `${col.prop}_${scope.$index + 1}`;
        const nextEl = this.$el.querySelector(`[data-prop="${nextDataProp}"] input`);
        if (nextEl?.focus) {
          nextEl.focus();
        }
      }
    },

    /**
     * selection(checkbox) handler
     * 选中列表处理函数
     */
     handleSelectionChange(e) {
      this.$emit('selection-change', e);
      this.$emit('update:selection', e);
    },

    /**
     * selection item(radio) handler
     * 单选项处理函数
     */
    handleSelectionItemChange(e) {
      this.$emit('selection-item-change', e);
      this.$emit('update:selectionItem', e);
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
