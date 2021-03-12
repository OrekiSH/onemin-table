<template>
  <el-popover
    :value="popoverVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <el-select
      slot="reference"
      ref="select"
      v-model="inputVal"
      v-bind="attrs"
      v-on="$listeners"
    >
      <select-slot
        :prefix-slot-render="prefixSlotRender"
        :empty-slot-render="emptySlotRender"
      />

      <template v-if="isGroup">
        <el-option-group
          v-for="(option, i) in (options || [])"
          :key="i"
          :label="option.label"
        >
          <el-option
            v-for="(item, index) in option.children"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-option-group>
      </template>

      <template v-else>
        <el-option
          v-for="(item, i) in (options || [])"
          :key="i"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </template>
    </el-select>
  </el-popover>
</template>

<script>
import { inputMixin, CustomRender } from '@onemin-table/shared';
import SelectSlot from './components/select-slot';

export default {
  name: 'ElemSelect',

  mixins: [inputMixin],

  components: {
    SelectSlot,
    CustomRender,
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
        style: `width: ${this.elWidth || '100%'}`,
        'collapse-tags': def('collapseTags'),
        'popper-append-to-body': def('popperAppendToBody'),
        'data-prop': def('prop', ''),
        ...this.$attrs,
      };
    },

    isGroup() {
      return this.options.every((option) => Array.isArray(option.children));
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-select__popover--elem');
    },
  },

  mounted() {
    const ref = this.$refs.select;
    // Proxy <el-select> methods, 代理<el-select>的方法
    if (ref) {
      ['focus', 'blur'].forEach((key) => {
        this[key] = ref[key];
      });
    }

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

<style>
</style>