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

    <div
      :style="`width: ${elWidth || '100%'}`"
      class="el-select"
      slot="reference"
    >
      <select-fragment
        ref="select"
        :value="innerVal"
        :attrs="attrs"
        :listeners="$listeners"
        :is-group="isGroup"
        :options="options"
        :slot-renders="slotRenders"
      />
    </div>
  </el-popover>

  <select-fragment
    v-else
    ref="select"
    :value="innerVal"
    :attrs="attrs"
    :listeners="$listeners"
    :is-group="isGroup"
    :options="options"
    :slot-renders="slotRenders"
  />
</template>

<script>
import { inputMixin, CustomRender, loadingProps } from '@onemin-table/shared';
import SelectFragment from './components/select-fragment.vue';
import proxyMixin from './mixins/proxy';

export default {
  name: 'ElemSelect',

  mixins: [
    // mounted, innerVisible, popoverListeners, popoverSlotRender, lite, elWidth
    inputMixin,
    proxyMixin,
  ],

  inheritAttrs: false,

  components: {
    CustomRender,
    SelectFragment,
  },

  props: {
    /**
     * @language=zh
     * 选择器绑定值
     */
    value: {
      type: [Array, String, Number],
      default: null,
    },

    /**
     * @language=zh
     * 选择数据列表
     * Array<{ label: string, value: any, disabled: boolean, children?: Array }>
     */
    options: {
      type: Array,
      default() { return []; },
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
     * 无选项时列表渲染函数
     */
    emptySlotRender: {
      type: Function,
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

    ...loadingProps,
  },

  computed: {
    /**
     * select default attributes
     * 选择器默认属性
     */
    attrs() {
      const def = this.genDefaultAttrs;
      return {
        clearable: def('clearable'),
        filterable: def('filterable'),
        placeholder: def('placeholder', '请选择'),
        'collapse-tags': def('collapseTags'),
        'popper-append-to-body': def('popperAppendToBody'),
        ...this.$attrs,
      };
    },

    isGroup() {
      return this.options.every((option) => Array.isArray(option.children));
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-select__popover--elem');
    },

    /**
     * 加载中、无内容时列表项内容渲染函数
     * loading/empty options render function
     */
    innerEmptySlotRender() {
      if (this.loading) {
        if (this.emptySlotRender === 'function') return this.emptySlotRender;

        return (h) => h('div', { class: 'el-select-dropdown__empty el-select-dropdown__loading' }, this.loadingText);
      }
      return this.emptySlotRender;
    },

    slotRenders() {
      return {
        prefix: this.prefixSlotRender,
        empty: this.emptySlotRender,
        option: this.optionSlotRender,
      };
    },
  },

  mounted() {
    // set element-ui lost blur event, 补充element-ui丢失的blur事件
    if (typeof this.$listeners.blur === 'function') {
      this.inputEl?.addEventListener('blur', this.$listeners.blur);
    }
  },

  beforeDestroy() {
    // set element-ui lost blur event
    if (typeof this.$listeners.blur === 'function') {
      this.inputEl?.removeEventListener('blur', this.$listeners.blur);
    }
  },
};
</script>
