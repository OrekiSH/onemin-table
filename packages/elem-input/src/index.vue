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
      v-model="inputVal"
      v-bind="attrs"
      v-on="$listeners"
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
        'data-prop': def('prop', ''),
        ...this.$attrs,
      };
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-input__popover--elem');
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