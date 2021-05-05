<template>
  <el-button
    :disabled="loading"
    @click="$emit('on-reset')"
  >{{ resetButtonText }}</el-button>
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

    resetButtonText: {
      type: String,
      default: '',
    },
  },
};
</script>
