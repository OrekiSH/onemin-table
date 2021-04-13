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
      <!-- System component, 系统定义组件 -->
      <component
        v-if="COMPONENT_MAP[col.type] && !lite"
        :is="COMPONENT_MAP[col.type]"
        v-bind="genColumnItemAttrs(col, scope)"
        v-on="genColumnItemListeners(col, scope)"
      />

      <column-image
        v-else-if="col.type === 'image'"
        v-bind="genColumnItemAttrs(col, scope)"
        v-on="genColumnItemListeners(col, scope)"
      />

      <!-- Custom render component, includes expand type -->
      <!-- 用户自定义渲染组件, 包含expand类型 -->
      <custom-cell-render
        v-else-if="typeof col.render === 'function'"
        :index="scope.$index"
        :column="col"
        :row="scope.row"
        :render="col.render"
      />

      <!-- Default, 默认 -->
      <template v-else>{{ get(scope.row, col.prop) }}</template>
    </template>
  </el-table-column>
</template>

<script>
import get from 'lodash/get';
import { CustomRender, ELEM_DATE_TYPES } from '@onemin-table/shared';
import CustomCellRender from './custom-cell-render';
import ColumnImage from './column-image.vue';

const ElemSelect = () => import('@onemin-table/elem-select');
const ElemInput = () => import('@onemin-table/elem-input');
const ElemInputNumber = () => import('@onemin-table/elem-input-number');
const ElemDatePicker = () => import('@onemin-table/elem-date-picker');
const ElemCascader = () => import('@onemin-table/elem-cascader');
const ElemAutocomplete = () => import('@onemin-table/elem-autocomplete');

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
  ],

  components: {
    ElemSelect,
    ElemInput,
    ElemInputNumber,
    ElemDatePicker,
    ElemCascader,
    ElemAutocomplete,

    CustomCellRender,
    CustomRender,
    ColumnImage,
  },

  data() {
    return {
      COMPONENT_MAP: Object.freeze({
        // input, 输入框
        input: 'elem-input',

        // input-number, 计数器
        'input-number': 'elem-input-number',

        // select, 选择器
        select: 'elem-select',
        'single-select': 'elem-select',

        // cascader, 级联选择器
        cascader: 'elem-cascader',

        // autocomplete, 输入匹配框
        autocomplete: 'elem-autocomplete',

        // date-picker, 日期选择器
        ...Object.fromEntries(ELEM_DATE_TYPES.map((e) => [e, 'elem-date-picker'])),
      }),
    };
  },

  methods: {
    get,
  },
};
</script>

<style>

</style>
