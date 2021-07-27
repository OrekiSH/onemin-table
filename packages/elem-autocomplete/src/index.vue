<template>
  <el-popover
    v-if="!lite"
    ref="popover"
    :value="innerVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <autocomplete-fragment
      slot="reference"
      ref="input"
      :value="innerVal"
      :attrs="attrs"
      :listeners="$listeners"
      :option-slot-render="optionSlotRender"
    />
  </el-popover>

  <autocomplete-fragment
    v-else
    ref="input"
    :value="innerVal"
    :attrs="attrs"
    :listeners="$listeners"
    :option-slot-render="optionSlotRender"
  />
</template>

<script>
import {
  inputMixin, CustomRender,
} from '@onemin-table/shared';
import AutocompleteFragment from './components/autocomplete-fragment.vue';
import proxyMixin from './mixins/proxy';

export default {
  name: 'ElemAutocomplete',

  mixins: [
    inputMixin, // mounted, innerVisible, popoverListeners, popoverSlotRender, lite, innerVal
    proxyMixin,
  ],

  inheritAttrs: false,

  components: {
    CustomRender,
    AutocompleteFragment,
  },

  props: {
    /**
     * @language=zh
     * 输入框绑定值
     */
    value: {
      type: [String, Number],
      default: null,
    },

    /**
     * @language=zh
     * 列表备选项渲染函数
     */
    optionSlotRender: {
      type: Function,
      default: null,
    },
  },

  computed: {
    /**
     * autocomplete default attributes
     * 输入框默认属性
     */
    attrs() {
      const def = this.genDefaultAttrs;
      return {
        clearable: def('clearable'),
        placeholder: def('placeholder', '请输入'),
        style: `width: ${this.elWidth || '100%'}`,
        ...this.$attrs,
      };
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-autocomplete__popover--elem');
    },
  },
};
</script>
