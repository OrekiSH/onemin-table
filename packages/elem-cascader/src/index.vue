<template>
  <el-popover
    :value="popoverVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <div
      :style="`width: ${elWidth || '100%'}`"
      class="el-cascader"
      slot="reference"
    >
      <el-cascader
        ref="cascader"
        v-model="inputVal"
        v-bind="attrs"
        v-on="$listeners"
        style="width: 100%"
      >
        <cascader-slot
          :empty-slot-render="emptySlotRender"
        />
      </el-cascader>
    </div>
  </el-popover>
</template>

<script>
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import camelCase from 'camelcase';
import {
  inputMixin, CustomRender,
} from '@onemin-table/shared';
import CascaderSlot from './components/cascader-slot';

// 被代理到顶层属性的props属性, attrs proxy to top level.
const PROP_ATTRS = [
  'expandTrigger',
  'expand-trigger',
  'multiple',
  'checkStrictly',
  'check-strictly',
  'emitPath',
  'emit-path',
  'lazy',
  'lazyLoad',
  'lazy-load',
  'leaf',
];

// 布尔类型值支持传空字符串, boolean type support empty string.
const BOOL_ATTRS = [
  'checkStrictly',
  'check-strictly',
  'emitPath',
  'emit-path',
  'lazy',
  'multiple',
];

// 属性别名, alias attrs
const PROP_KEY_ATTRS = [
  'valueKey',
  'labelKey',
  'childrenKey',
  'disabledKey',
];

export default {
  name: 'ElemCascader',

  mixins: [inputMixin],

  inheritAttrs: false,

  props: {
    /**
     * @language=zh
     * 级联选择器绑定值
     */
    value: {
      type: [Array, String, Number],
      default: null,
    },

    /**
     * @language=zh
     * 搜索无匹配项时列表渲染函数
     */
    emptySlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * options中标签值的key
     */
    labelKey: {
      type: String,
      default: 'label',
    },

    /**
     * @language=zh
     * options中value值的key
     */
    valueKey: {
      type: String,
      default: 'value',
    },

    /**
     * @language=zh
     * options中子节点的key
     */
    childrenKey: {
      type: String,
      default: 'children',
    },

    /**
     * @language=zh
     * options中禁用状态的key
     */
    disabledKey: {
      type: String,
      default: 'disabled',
    },
  },

  components: {
    CustomRender,
    CascaderSlot,
  },

  computed: {
    /**
     * select default attributes
     * 选择器默认属性
     */
    attrs() {
      const def = this.genDefaultAttrs;

      // filter undefined value, 过滤空值
      const temp = {};
      const attrs = pick(this.$attrs, PROP_ATTRS);
      Object.keys(attrs).forEach((k) => {
        if (attrs[k] !== undefined) {
          temp[camelCase(k)] = BOOL_ATTRS.includes(k)
            ? (attrs[k] === '' ? true : attrs[k])
            : attrs[k];
        }
      });

      const result = {
        clearable: def('clearable'),
        filterable: def('filterable'),
        'collapse-tags': def('collapseTags'),
        'popper-append-to-body': def('popperAppendToBody'),
        'data-prop': def('prop', ''),

        // props
        props: {
          value: this.valueKey,
          label: this.labelKey,
          children: this.childrenKey,
          disabled: this.disabledKey,

          ...temp, // top level proxy attrs, 顶层代理属性
          ...this.$attrs?.props,
        },

        // filter proxy attrs, 去除代理属性
        ...omit(this.$attrs, [
          ...PROP_ATTRS,
          ...PROP_KEY_ATTRS,
        ]),
      };

      console.warn(result);

      return result;
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-cascader__popover--elem');
    },
  },

  mounted() {
    const ref = this.$refs.cascader;
    // Proxy <el-cascader> methods, 代理<el-cascader>的方法
    if (ref) {
      ['getCheckedNodes'].forEach((key) => {
        this[key] = ref[key];
      });
    }
  },
};
</script>

<style>

</style>
