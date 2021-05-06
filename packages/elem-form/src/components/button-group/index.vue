<template>
  <div class="ot-form__button-group">
    <template v-for="button in buttonLayout">
      <component
        :key="button"
        :is="button"
        v-bind="genButtonGroupProps(button)"
        v-on="$listeners"
      />
    </template>
  </div>
</template>

<script>
import { searchResetProps } from '@onemin-table/shared';
import search from './search.vue';
import reset from './reset.vue';
import collapse from './collapse.vue';

export default {
  inheritAttrs: false,

  components: {
    search,
    reset,
    collapse,
  },

  props: {
    ...searchResetProps,

    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    /**
     * search&reset button group props
     * 搜索&重置按钮组props
     */
    genButtonGroupProps(name) {
      switch (name) {
        case 'search':
          return {
            searchButtonText: this.searchButtonText,
            loading: this.loading,
          };
        case 'reset':
          return {
            resetButtonText: this.resetButtonText,
            loading: this.loading,
          };
        case 'collapse':
          return {
            collapseButtonText: this.collapseButtonText,
            expandButtonText: this.expandButtonText,
            collapsed: this.collapsed,
          };
        default:
          return {};
      }
    },
  },
};
</script>
