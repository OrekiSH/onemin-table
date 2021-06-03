<template>
  <el-form-item
    v-bind="itemAttrs"
  >
    <template
      v-if="filter.labelSlotRender"
      slot="label"
    >
      <custom-render :render="filter.labelSlotRender" />
    </template>

    <template>
      <!-- System component, 系统定义组件 -->
      <component
        v-if="COMPONENT_MAP[filter.type]"
        :is="COMPONENT_MAP[filter.type]"
        v-bind="attrs"
        v-on="listeners"
      />

      <!-- plain text, 纯文本 -->
      <span
        v-else-if="filter.type === 'text'"
      >{{ value }}</span>

      <!-- Custom render component, 用户自定义渲染组件 -->
      <custom-render
        v-if="typeof filter.render === 'function'"
        :render="filter.render"
      />
    </template>
  </el-form-item>
</template>

<script>
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import get from 'lodash/get';
import {
  CustomRender, COMPONENT_MAP, ELEM_COMPONENTS,
  LIST_COMPONENTS, INPUT_TYPES, EL_COL_ATTRS,
} from '@onemin-table/shared';

const ElemSelect = () => import('@onemin-table/elem-select');
const ElemInput = () => import('@onemin-table/elem-input');
const ElemInputNumber = () => import('@onemin-table/elem-input-number');
const ElemDatePicker = () => import('@onemin-table/elem-date-picker');
const ElemCascader = () => import('@onemin-table/elem-cascader');
const ElemAutocomplete = () => import('@onemin-table/elem-autocomplete');
const ElemListGroup = () => import('@onemin-table/elem-list-group');
const ElemInputRange = () => import('@onemin-table/elem-input-range');

const EL_FORM_ITEM_ATTRS = [
  'prop',
  'label',
  'label-width',
  'labelWidth',
  'required',
  'rules',
  'error',
  'show-message',
  'showMessage',
  'inline-message',
  'inlineMessage',
  'size',
];

export default {
  inheritAttrs: false,

  inject: ['trim'],

  props: {
    filter: {
      type: Object,
      default() { return {}; },
    },

    query: {
      type: Object,
      default() { return {}; },
    },
  },

  components: {
    ElemSelect,
    ElemInput,
    ElemInputNumber,
    ElemDatePicker,
    ElemCascader,
    ElemAutocomplete,
    ElemListGroup,
    ElemInputRange,

    CustomRender,
  },

  data() {
    return {
      COMPONENT_MAP,
    };
  },

  computed: {
    // components attributes, 组件属性
    attrs() {
      const { type } = this.filter;
      const omitAttrs = LIST_COMPONENTS.indexOf(type) > -1
        ? EL_COL_ATTRS
        : EL_COL_ATTRS.concat('type');

      const result = {
        ...omit(this.filter, omitAttrs.concat(EL_FORM_ITEM_ATTRS)),
        lite: true,
        ...this.filter.attrs,
        value: this.value,
      };

      // multiple attr for type select, 多选框类型默认添加multiple
      if (type === 'select' && typeof result.multiple === 'undefined') result.multiple = true;
      if (type === 'cascader' && typeof result.multiple === 'undefined') result.multiple = true;
      if (type === 'single-cascader' && typeof result.checkStrictly === 'undefined') {
        result.checkStrictly = true;
      }

      return result;
    },

    // components listeners, 组件事件
    listeners() {
      const { type, listeners, trim } = this.filter;

      const result = listeners || {};
      // system components value changed, 系统定义组件值改变事件
      if (ELEM_COMPONENTS.indexOf(type) > -1) {
        let evt = INPUT_TYPES.indexOf(type) > -1 ? 'input' : 'change';

        result[evt] = (...args) => {
          if (typeof listeners?.[evt] === 'function') {
            listeners[evt](...args);
          }
          this.handleChange(...args);
        };

        // v-model.trim
        if (this.trim || trim) {
          result.blur = (...args) => {
            if (typeof listeners?.blur === 'function') {
              listeners.blur(...args);
            }
            if (typeof this.value === 'string') {
              this.handleChange(this.value.trim());
            }
          };
        }
      }

      return result;
    },

    // <el-form-item> attributes, form-item属性
    itemAttrs() {
      return pick(this.filter, EL_FORM_ITEM_ATTRS);
    },

    // component v-model value, 组件绑定值
    value() {
      return get(this.query, this.filter.prop);
    },
  },

  methods: {
    handleChange(value) {
      this.$set(this.query, this.filter.prop, value);
    },
  },
};
</script>
