<template>
  <el-table-column
    v-bind="genColumnAttrs(col)"
  >
    <!-- header render function for parent node, 父级节点表头渲染函数 -->
    <template
      v-if="col.headerSlotRender"
      slot="header"
    >
      <custom-render :render="col.headerSlotRender" />
    </template>

    <!-- no content for parent node, 父级节点无渲染内容 -->
    <template
      v-for="(item, index) in col.children"
    >
      <!-- recursive call, 递归调用(多级表头) -->
      <elem-table-column-group
        v-if="Array.isArray(item.children)"
        :key="item.prop || index"
        :col="item"
      />

      <elem-table-column
        v-else
        :key="item.prop || index"
        :col="item"
      />
    </template>
  </el-table-column>
</template>

<script>
import { CustomRender } from '@onemin-table/shared';
import ElemTableColumn from './table-column.vue';

export default {
  name: 'ElemTableColumnGroup',

  props: {
    col: {
      type: Object,
      default() { return {}; },
    },
  },

  inject: [
    'genColumnAttrs',
  ],

  components: {
    ElemTableColumn,
    CustomRender,
  },
};
</script>

<style>

</style>
