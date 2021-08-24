<template>
  <el-table-column
    v-bind="genColumnAttrs(col)"
  >
    <template
      v-if="col.headerSlotRender"
      slot="header"
    >
      <custom-render :render="col.headerSlotRender" />
    </template>

    <template slot-scope="scope">
      <!-- Custom render component, includes expand type -->
      <!-- 用户自定义渲染组件, 包含expand类型 -->
      <custom-cell-render
        v-if="typeof col.render === 'function'
          || (col.customIndex === scope.$index && typeof col.customIndexRender === 'function')"
        :index="scope.$index"
        :column="col"
        :row="scope.row"
        :render="col.render || col.customIndexRender"
      />

      <!-- System component, 系统定义组件 -->
      <component
        v-else-if="COMPONENT_MAP[col.type] && !lite && col.customIndex !== scope.$index"
        :is="COMPONENT_MAP[col.type]"
        v-bind="genColumnItemAttrs(col, scope)"
        v-on="genColumnItemListeners(col, scope)"
        @keypress.native="genColumnEnterChangeLine(col, scope, $event)"
      />

      <column-image
        v-else-if="col.type === 'image' && col.customIndex !== scope.$index"
        v-bind="genColumnItemAttrs(col, scope)"
        v-on="genColumnItemListeners(col, scope)"
      />

      <!-- Default, 默认 -->
      <template v-else>{{ genTextColumn(col, scope) }}</template>
    </template>
  </el-table-column>
</template>

<script>
import get from 'lodash/get';
import { CustomRender, COMPONENT_MAP } from '@onemin-table/shared';
import CustomCellRender from './custom-cell-render';
import ColumnImage from './column-image.vue';

const ElemSelect = () => import('@onemin-table/elem-select');
const ElemInput = () => import('@onemin-table/elem-input');
const ElemInputNumber = () => import('@onemin-table/elem-input-number');
const ElemDatePicker = () => import('@onemin-table/elem-date-picker');
const ElemCascader = () => import('@onemin-table/elem-cascader');
const ElemAutocomplete = () => import('@onemin-table/elem-autocomplete');
const ElemListGroup = () => import('@onemin-table/elem-list-group');
const ElemInputRange = () => import('@onemin-table/elem-input-range');

export default {
  name: 'ElemTableColumn',

  inheritAttrs: false,

  props: {
    col: {
      type: Object,
      default() { return {}; },
    },
  },

  inject: [
    'genColumnAttrs',
    'genColumnItemAttrs',
    'genColumnItemListeners',
    'lite',
    'genColumnEnterChangeLine',
    'placeholder',
  ],

  components: {
    ElemSelect,
    ElemInput,
    ElemInputNumber,
    ElemDatePicker,
    ElemCascader,
    ElemAutocomplete,
    ElemListGroup,
    ElemInputRange,

    CustomCellRender,
    CustomRender,
    ColumnImage,
  },

  data() {
    return {
      COMPONENT_MAP,
    };
  },

  methods: {
    genTextColumn(col, scope) {
      const placeholder = (col.placeholder || this.placeholder);
      const text = get(scope.row, col.prop);

      return (text == null || text === '') && typeof placeholder === 'string'
        ? placeholder
        : text;
    },
  },
};
</script>
