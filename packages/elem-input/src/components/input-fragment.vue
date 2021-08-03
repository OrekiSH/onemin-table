<template>
  <el-input
    ref="input"
    :value="$attrs.value"
    v-bind="$attrs.attrs"
    v-on="$attrs.listeners"
  >
    <input-slot
      :value="$attrs.value"
      v-bind="$attrs.attrs"
    />
  </el-input>
</template>

<script>
import { InputSlot } from '@onemin-table/shared';
import proxyMixin from '../mixins/proxy';

export default {
  inheritAttrs: false,

  mixins: [proxyMixin],

  components: {
    InputSlot,
  },
};
</script>
