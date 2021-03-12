<template>
  <span
    class="ot-form-collapse"
    @click="handleClick">
    <span>{{ !collapsed ? collapseButtonText : expandButtonText }}</span>

    <i
      class="ot-form-collapse__icon"
      :class="collapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
  </span>
</template>

<script>
export default {
  props: {
    /**
     * @language=zh
     * 收起按钮文本
     */
    collapseButtonText: {
      type: String,
      default: '收起',
    },

    /**
     * @language=zh
     * 展开按钮文本
     */
    expandButtonText: {
      type: String,
      default: '展开',
    },

    /**
     * @language=zh
     * 是否收起
     */
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      this.$emit('on-collapse', !this.collapsed);
    },
  },
};
</script>

<style>
.ot-form-collapse {
  margin-left: 12px;
  color: #49A8FF;
  cursor: pointer;
}

.ot-form-collapse__icon {
  margin-left: 6px;
}
</style>
