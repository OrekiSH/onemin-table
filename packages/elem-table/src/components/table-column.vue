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
        v-if="COMPONENT_MAP[col.type]"
        :is="COMPONENT_MAP[col.type]"
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
import ElemSelect from '@onemin-table/elem-select';
import ElemInput from '@onemin-table/elem-input';
import ElemDatePicker from '@onemin-table/elem-date-picker';
import { CustomRender, ELEM_DATE_TYPES } from '@onemin-table/shared';
import CustomCellRender from './custom-cell-render';
import ColumnImage from './column-image.vue';

export default {
  name: 'ElemTableColumn',

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
  ],

  components: {
    ElemSelect,
    ElemInput,
    ElemDatePicker,

    CustomCellRender,
    CustomRender,
    ColumnImage,
  },

  data() {
    return {
      COMPONENT_MAP: Object.freeze({
        // input, 输入框
        input: 'elem-input',

        // select, 选择器
        select: 'elem-select',
        'single-select': 'elem-select',

        // date-picker, 日期选择器
        ...Object.fromEntries(ELEM_DATE_TYPES.map((e) => [e, 'elem-date-picker'])),

        // iamge, 图片
        image: 'column-image',
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
