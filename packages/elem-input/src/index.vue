<template>
  <el-popover
    :value="popoverVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <el-input
      slot="reference"
      ref="input"
      :value="inputVal"
      v-bind="attrs"
      v-on="listeners"
    >
      <input-slot
        :prefix-slot-render="prefixSlotRender"
        :suffix-slot-render="suffixSlotRender"
        :prepend-slot-render="innerPrependSlotRender"
        :append-slot-render="innerAppendSlotRender"
      />
    </el-input>
  </el-popover>
</template>

<script>
import { inputMixin, CustomRender } from '@onemin-table/shared';
import InputSlot from './components/input-slot';

export default {
  name: 'ElemInput',

  mixins: [inputMixin],

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
     * 头部内容渲染函数
     */
    prefixSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 尾部内容渲染函数
     */
    suffixSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 前置内容渲染函数
     */
    prependSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 后置内容渲染函数
     */
    appendSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 前置内容字符串
     */
    prepend: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 后置内容字符串
     */
    append: {
      type: String,
      default: '',
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

    /**
     * @language=zh
     * type="number"时输入字符串是否转换为number类型
     */
    convertNumber: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    CustomRender,
    InputSlot,
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

  mounted() {
    const ref = this.$refs.input;
    // Proxy <el-input> methods, 代理<el-input>的方法
    if (ref) {
      ['focus', 'blur', 'select'].forEach((key) => {
        this[key] = ref[key];
      });
    }
  },

  methods: {
    /**
     * 数组合并为字符串
     * array join into string
     */
    genInnerVal() {
      return (this.split && Array.isArray(this.value))
        ? this.value.join(this.splitChar)
        : this.value;
    },

    /**
     * 字符串分隔为数组
     * string split into array
     */
    genOuterVal(val) {
      return this.split
        ? val.split(this.splitChar)
        : ((this.$attrs.type === 'number' && this.convertNumber) ? +val : val);
    },

    innerAppendSlotRender(h) {
      if (!this.append && !this.appendSlotRender) return null;
      return this.appendSlotRender || h('div', null, this.append);
    },

    innerPrependSlotRender(h) {
      if (!this.prepend && !this.prependSlotRender) return null;
      return this.prependSlotRender || h('div', null, this.prepend);
    },
  },
};
</script>
