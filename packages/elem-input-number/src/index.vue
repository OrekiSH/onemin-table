<template>
  <el-popover
    ref="popover"
    :value="innerVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <div
      :style="`width: ${elWidth || '100%'}`"
      class="el-input-number"
      slot="reference"
    >
      <el-input-number
        ref="input"
        :value="innerVal"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
      />
    </div>
  </el-popover>
</template>

<script>
import { inputMixin, CustomRender } from '@onemin-table/shared';

export default {
  name: 'ElemInputNumber',

  inheritAttrs: false,

  mixins: [inputMixin],

  props: {
    /**
     * @language=zh
     * 输入框绑定值
     */
    value: {
      type: Number,
      default: 0,
    },
  },

  components: {
    CustomRender,
  },

  computed: {
    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-input-number__popover--elem');
    },
  },

  mounted() {
    const ref = this.$refs.input;
    // Proxy <el-input-number> methods, 代理<el-input-number>的方法
    if (ref) {
      ['focus', 'select'].forEach((key) => {
        this[key] = ref[key];
      });
    }
  },
};
</script>