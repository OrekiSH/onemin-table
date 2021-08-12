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

    <input-fragment
      slot="reference"
      ref="input"
      :value="inputVal"
      :attrs="attrs"
      :listeners="listeners"
    />
  </el-popover>

  <input-fragment
    v-else
    ref="input"
    :value="inputVal"
    :attrs="attrs"
    :listeners="listeners"
  />
</template>

<script>
import {
  inputMixin, CustomRender,
} from '@onemin-table/shared';
import InputFragment from './components/input-fragment.vue';
import proxyMixin from './mixins/proxy';

export default {
  name: 'ElemInput',

  mixins: [
    inputMixin, // mounted, innerVisible, popoverListeners, popoverSlotRender, lite
    proxyMixin,
  ],

  inheritAttrs: false,

  props: {
    /**
     * @language=zh
     * 输入框绑定值
     */
    value: {
      type: [String, Number, Array],
      default: null,
    },

    /**
     * @language=zh
     * 分隔模式，双向绑定值为根据splitChar分隔的数组
     */
    split: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 分隔字符串
     */
    splitChar: {
      type: String,
      default: ' ',
    },
  },

  components: {
    CustomRender,
    InputFragment,
  },

  computed: {
    /**
     * input default attributes
     * 输入框默认属性
     */
    attrs() {
      const def = this.genDefaultAttrs;
      return {
        clearable: def('clearable'),
        filterable: def('filterable'),
        placeholder: def('placeholder', '请输入'),
        style: `width: ${this.elWidth || '100%'}`,
        ...this.$attrs,
      };
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-input__popover--elem');
    },

    listeners() {
      return {
        ...this.$listeners,
        input: (val) => {
          const input = this.$listeners?.input;
          if (typeof input === 'function') input(this.genOuterVal(val));
        },
        change: (val) => {
          const change = this.$listeners?.change;
          if (typeof change === 'function') change(this.genOuterVal(val));
        },
        blur: (...args) => {
          const blur = this.$listeners?.blur;
          if (typeof blur === 'function') blur(...args);

          if (this.split) {
            const tokens = this.genOuterVal(this.inputVal);
            if (Array.isArray(tokens)) {
              const val = tokens.filter(Boolean);
              this.$emit('input', val);
              this.$emit('change', val);
            }
          }
        },
      };
    },
  },

  data() {
    return {
      // 数组合并为字符串, array join into string
      inputVal: this.genInnerVal(),
    };
  },

  watch: {
    value: {
      handler() {
        this.inputVal = this.genInnerVal();
      },
      deep: true,
    },
  },

  methods: {
    /**
     * 数组合并为字符串
     * array join into string
     */
    genInnerVal() {
      // eslint-disable-next-line no-nested-ternary
      return (this.split && Array.isArray(this.value))
        ? this.value.join(this.splitChar)
        : (this.$attrs.type === 'number' && this.value === 0) ? '' : this.value;
    },

    /**
     * 字符串分隔为数组
     * string split into array
     */
    genOuterVal(val) {
      // eslint-disable-next-line no-nested-ternary
      return this.split
        ? val.split(this.splitChar)
        : (this.$attrs.type === 'number' ? +val : val);
    },
  },
};
</script>
