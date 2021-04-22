<template>
  <div class="elem-pagination-wrapper">
    <template v-if="$attrs.top">
      <custom-render :render="$attrs.top" />
    </template>

    <div class="elem-pagination">
      <template v-if="$attrs.left">
        <custom-render :render="$attrs.left" />
      </template>

      <el-pagination
        v-bind="$attrs.attrs"
        v-on="$attrs.listeners"
      />

      <template v-if="$attrs.right">
        <custom-render :render="$attrs.right" />
      </template>
    </div>

    <template v-if="$attrs.bottom">
      <custom-render :render="$attrs.bottom" />
    </template>
  </div>
</template>

<script>
import { CustomRender } from '@onemin-table/shared';

export default {
  components: {
    CustomRender,
  },

  inheritAttrs: false,
};
</script>

<style>

</style>
