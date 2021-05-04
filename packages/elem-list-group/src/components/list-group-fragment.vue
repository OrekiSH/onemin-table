<template>
  <el-checkbox-group
    v-if="isCheckbox"
    v-model="$attrs.value"
    v-bind="$attrs.attrs"
    v-on="$attrs.listeners"
  >
    <component
      v-for="(item, i) in ($attrs.options || [])"
      :key="i"
      v-bind="genSelectBoxAttrs(item)"
      v-bind:is="`el-${$attrs.type}`"
    >{{ item.label }}</component>
  </el-checkbox-group>

  <el-radio-group
    v-else
    v-model="$attrs.value"
    v-bind="$attrs.attrs"
    v-on="$attrs.listeners"
  >
    <component
      v-for="(item, i) in ($attrs.options || [])"
      :key="i"
      v-bind="genSelectBoxAttrs(item)"
      v-bind:is="`el-${$attrs.type}`"
    >{{ item.label }}</component>
  </el-radio-group>
</template>

<script>
export default {
  inheritAttrs: false,

  computed: {
    isCheckbox() {
      return this.$attrs.type.startsWith('checkbox');
    },
  },

  methods: {
    /**
     * checkbox/radio attrs
     * 多选/单选框属性
     */
    genSelectBoxAttrs(item) {
      return {
        ...item,
        label: item.value,
      };
    },
  },
};
</script>
