<template>
  <div
    ref="reference"
    class="el-date-editor el-range-editor el-input__inner el-range-input ot-input-range--elem"
    :class="[
      `el-range-editor--${ size }`,
      pickerDisabled ? 'is-disabled' : '',
    ]"
    style="width: 100%;"
    @mouseenter="handleMouseEnter"
    @mouseleave="showClose = false"
  >
    <div v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <input
      autocomplete="off"
      :placeholder="startPlaceholder"
      :value="displayValue && displayValue[0]"
      :disabled="pickerDisabled"
      :type="type"
      class="el-range-input"
      @input="handleStartInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    >

    <slot name="range-separator">
      <span class="el-range-separator">{{ rangeSeparator }}</span>
    </slot>

    <input
      autocomplete="off"
      :placeholder="endPlaceholder"
      :value="displayValue && displayValue[1]"
      :disabled="pickerDisabled"
      :type="type"
      class="el-range-input"
      @input="handleEndInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    >

    <i
      :class="[(displayValue.length && showClose) ? '' + clearIcon : '']"
      class="el-input__icon el-range__close-icon"
      @click="handleClickIcon"
    />

    <div v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
import { atomicProps } from '@onemin-table/shared';

export default {
  name: 'ElInputRange',

  inheritAttrs: false,

  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },

  props: {
    /**
     * @language=zh
     * 绑定值
     */
    value: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 是否可禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * @language=zh
     * 是否显示清除按钮
     */
    clearable: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * input类型
     */
    type: {
      type: String,
      default: 'text',
    },

    /**
     * @language=zh
     * 输入框大小
     */
    size: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 选择范围时的分隔符
     */
    rangeSeparator: {
      type: String,
      default: '至',
    },

    /**
     * @language=zh
     * 范围选择时开始的占位内容
     */
    startPlaceholder: {
      type: String,
      default: '最小',
    },

    /**
     * @language=zh
     * 范围选择时结束的占位内容
     */
    endPlaceholder: {
      type: String,
      default: '最大',
    },

    /**
     * @language=zh
     * 自定义清空图标的类名
     */
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close',
    },

    ...atomicProps,
  },

  data() {
    return {
      showClose: false,
      displayValue: this.value,
    };
  },

  computed: {
    pickerDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },

    reference() {
      const { reference } = this.$refs;
      return reference.$el || reference;
    },

    refInput() {
      if (this.reference) {
        return [].slice.call(this.reference.querySelectorAll('input'));
      }
      return [];
    },
  },

  watch: {
    displayValue() {
      this.$emit('input', this.displayValue);
    },

    value() {
      this.displayValue = this.value;
    },

    borderColor() {
      this.setBorderColor();
    },

    backgroundColor() {
      this.setBackgroundColor();
    },

    color() {
      this.setFontColor();
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.setBorderColor();
      this.setBackgroundColor();
      this.setFontColor();
    });
  },

  methods: {
    setBorderColor() {
      if (this.reference) {
        this.reference.style.borderColor = this.borderColor;
      }
    },

    setBackgroundColor() {
      if (this.reference) {
        this.reference.style.backgroundColor = this.backgroundColor;
      }
      this.refInput.forEach((input) => { input.style.backgroundColor = this.backgroundColor });
    },

    setFontColor() {
      this.refInput.forEach((input) => { input.style.color = this.color });
    },

    handleMouseEnter() {
      if (this.pickerDisabled) return;

      if (this.clearable) {
        this.showClose = true;
      }
    },

    handleBlur(evt) {
      this.$emit('blur', evt);
    },

    handleFocus(evt) {
      this.$emit('focus', evt);
    },

    blur() {
      this.refInput.forEach((input) => input.blur());
    },

    focusStart() {
      const [start] = this.refInput;
      if (start) start.focus();
    },

    focusEnd() {
      const [, end] = this.refInput;
      if (end) end.focus();
    },

    handleStartInput(event) {
      if (this.displayValue) {
        this.displayValue = [event.target.value, this.displayValue[1]];
      } else {
        this.displayValue = [event.target.value, null];
      }
    },

    handleEndInput(event) {
      if (this.displayValue) {
        this.displayValue = [this.displayValue[0], event.target.value];
      } else {
        this.displayValue = [null, event.target.value];
      }
    },

    handleClickIcon() {
      if (!this.showClose) return;
      this.clear();
      this.$emit('clear');
    },

    clear() {
      this.displayValue = [];
      this.$emit('change', this.displayValue);
    },

    handleChange() {
      this.$emit('change', this.displayValue);
    },
  },
};
</script>
