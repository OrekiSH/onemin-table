<template>
  <el-select
    ref="select"
    :value="$attrs.value"
    v-bind="$attrs.attrs"
    v-on="$attrs.listeners"
    style="width: 100%;"
  >
    <select-slot
      :prefix-slot-render="slotRenders.prefix"
      :empty-slot-render="slotRenders.empty"
    />

    <template v-if="$attrs.isGroup">
      <el-option-group
        v-for="(option, i) in ($attrs.options || [])"
        :key="i"
        :label="option.label"
      >
        <elem-option
          :options="option.children"
          :option-slot-render="slotRenders.option"
        />
      </el-option-group>
    </template>

    <template v-else>
      <elem-option
        :options="$attrs.options"
        :option-slot-render="slotRenders.option"
      />
    </template>
  </el-select>
</template>

<script>
import SelectSlot from './select-slot';
import ElemOption from './elem-option';
import proxyMixin from '../mixins/proxy';

export default {
  inheritAttrs: false,

  components: {
    SelectSlot,
    ElemOption,
  },

  mixins: [proxyMixin],

  props: {
    slotRenders: {
      type: Object,
      default() { return {}; },
    },
  },
};
</script>
