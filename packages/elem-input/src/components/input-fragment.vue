<template>
  <el-input
    :value="$attrs.value"
    v-bind="$attrs.attrs"
    v-on="$attrs.listeners"
  >
    <input-slot
      :prefix-slot-render="slotRenders.prefix"
      :suffix-slot-render="slotRenders.suffix"
      :prepend-slot-render="slotRenders.prepend"
      :append-slot-render="slotRenders.append"
    />
  </el-input>
</template>

<script>
import { InputSlot } from '@onemin-table/shared';

export default {
  inheritAttrs: false,

  components: {
    InputSlot,
  },

  props: {
    slotRenders: {
      type: Object,
      default() { return {}; },
    },
  },
};
</script>

<style>

</style>
