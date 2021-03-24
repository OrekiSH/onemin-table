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
        :value="inputVal"
        v-bind="attrs"
        v-on="listeners"
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
import camelCase from 'lodash/camelCase';
import {
  inputMixin, CustomRender, TreeHelper,
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
     * 级联选择器选项列表
     */
    options: {
      type: Array,
      default() { return []; },
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

    /**
     * @language=zh
     * 同一层级选中合并, 仅在multiple: true + emitPath: true + checkStrictly: false时有效
     */
    sameLevelMerge: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    CustomRender,
    CascaderSlot,
  },

  data() {
    return {
      treeHelper: null,
      inputVal: null,
    };
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
        options: this.options,
        clearable: def('clearable'),
        filterable: def('filterable'),
        'collapse-tags': def('collapseTags'),
        'popper-append-to-body': def('popperAppendToBody'),

        // props
        props: {
          value: this.valueKey,
          label: this.labelKey,
          children: this.childrenKey,
          disabled: this.disabledKey,
          // default value, 默认值
          checkStrictly: false,
          emitPath: true,
          multiple: false,
          expandTrigger: 'click',

          ...temp, // top level proxy attrs, 顶层代理属性
          ...this.$attrs?.props,
        },

        // filter proxy attrs, 去除代理属性
        ...omit(this.$attrs, [
          ...PROP_ATTRS,
          ...PROP_KEY_ATTRS,
        ]),
      };

      return result;
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-cascader__popover--elem');
    },

    listeners() {
      return {
        ...this.$listeners,
        input: (val) => {
          this.$emit('input', this.genOuterVal(val));
        },
        change: (val) => {
          this.$emit('change', this.genOuterVal(val));
        },
      };
    },

    /**
     * if can merge
     * 是否可以合并
     */
    canMerge() {
      const { multiple, emitPath, checkStrictly } = this.attrs?.props || {};
      return this.sameLevelMerge && !!multiple && !!emitPath && !checkStrictly;
    },

    /**
     * 叶子节点的路径值映射
     * leaf node's path value map
     */
    leafPathMap() {
      if (Array.isArray(this.options)) {
        let result = {};
        this.options.forEach((root) => {
          const temp = this.treeHelper.genLeafPathMap(root);
          result = {
            ...result,
            ...temp,
          };
        });

        return result;
      }

      return {};
    },
  },

  watch: {
    options: {
      handler() {
        this.inputVal = this.genInnerVal();
      },
      deep: true,
    },
  },

  created() {
    // tree utils class, 多叉树工具类
    this.treeHelper = new TreeHelper({
      labelKey: this.labelKey,
      valueKey: this.valueKey,
      childrenKey: this.childrenKey,
    });
    this.inputVal = this.genInnerVal();
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

  methods: {
    /**
     * 同一层级的合并分散到各个层级
     * 例如[[1], [10, 12]]拆分为[[1, 10], [1, 12]]
     */
    genInnerVal() {
      return (this.canMerge && Array.isArray(this.value))
        ? (this.value[this.value.length - 1] || []).map((val) => this.leafPathMap[val])
        : this.value;
    },

    /**
     * 分散在各个层级的数组合并到同一层级
     * 例如[[1, 10], [1, 12]]合并为[[1], [10, 12]]
     */
    genOuterVal(val) {
      if (this.canMerge && Array.isArray(val)) {
        // longest path, 最长路径
        const levelCount = Math.max(...val.map((e) => e.length));
        const result = [];
        for (let i = 0; i < levelCount; i += 1) {
          const temp = val.map((e) => e[i]).filter(Boolean);
          result.push([...new Set(temp)]);
        }

        return result;
      }

      return val;
    },
  },
};
</script>
