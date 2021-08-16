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

    <template v-if="$attrs['is-group']">
      <el-option-group
        v-for="(option, i) in ($attrs.options || [])"
        :key="i"
        :label="get(option, labelKey)"
      >
        <elem-option
          :options="get(option, childrenKey)"
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
import get from 'lodash/get';
import SelectSlot from './select-slot';
import ElemOption from './elem-option';
import proxyMixin from '../mixins/proxy';

export default {
  inheritAttrs: false,

  components: {
    SelectSlot,
    ElemOption,
  },

  inject: [
    'childrenKey',
    'labelKey',
  ],

  mixins: [proxyMixin],

  props: {
    slotRenders: {
      type: Object,
      default() { return {}; },
    },
  },

  methods: {
    get,
  },

  mounted() {
    console.warn(this.$attrs.options, this.childrenKey, this.$props, this.$attrs);
  },
};
</script>
