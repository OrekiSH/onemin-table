<template>
  <el-autocomplete
    ref="input"
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

    <template
      v-if="$attrs.optionSlotRender"
      slot-scope="{ item }"
    >
      <option-slot
        :render="$attrs.optionSlotRender"
        :item="item"
      />
    </template>
  </el-autocomplete>
</template>

<script>
import { InputSlot } from '@onemin-table/shared';
import OptionSlot from './option-slot';
import proxyMixin from '../mixins/proxy';

export default {
  inheritAttrs: false,

  mixins: [proxyMixin],

  components: {
    InputSlot,
    OptionSlot,
  },

  props: {
    slotRenders: {
      type: Object,
      default() { return {}; },
    },
  },
};
</script>
