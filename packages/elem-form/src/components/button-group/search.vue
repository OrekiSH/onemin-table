<template>
  <el-button
    type="primary"
    :loading="loading"
    @click="$emit('on-search')"
  >{{ searchButtonText }}</el-button>
</template>

<script>
import { Button } from 'element-ui';

export default {
  components: {
    ElButton: Button,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    searchButtonText: {
      type: String,
      default: '',
    },
  },
};
</script>
