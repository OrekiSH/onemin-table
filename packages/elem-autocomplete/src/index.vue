<template>
  <el-popover
    ref="popover"
    :value="innerVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <el-autocomplete
      slot="reference"
      ref="autocomplete"
      :value="innerVal"
      v-bind="attrs"
      v-on="$listeners"
    >
      <input-slot
        :prefix-slot-render="innerPrefixSlotRender"
        :suffix-slot-render="innerSuffixSlotRender"
        :prepend-slot-render="innerPrependSlotRender"
        :append-slot-render="innerAppendSlotRender"
      />

      <template
        v-if="optionSlotRender"
        slot-scope="{ item }"
      >
        <option-slot
          :render="optionSlotRender"
          :item="item"
        />
      </template>
    </el-autocomplete>
  </el-popover>
</template>

<script>
import {
  inputMixin, CustomRender, InputSlot, inputProps,
  inputSlotMixin,
} from '@onemin-table/shared';
import OptionSlot from './components/option-slot';

export default {
  name: 'ElemAutocomplete',

  mixins: [inputMixin, inputSlotMixin],

  inheritAttrs: false,

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

    ...inputProps,
  },

  components: {
    CustomRender,
    InputSlot,
    OptionSlot,
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

  mounted() {
    const ref = this.$refs.autocomplete;
    // Proxy <el-autocomplete> methods, 代理<el-autocomplete>的方法
    if (ref) {
      ['focus'].forEach((key) => {
        this[key] = ref[key];
      });
    }
  },
};
</script>
