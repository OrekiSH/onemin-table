<template>
  <el-popover
    v-if="!$attrs.lite"
    ref="popover"
    :value="innerVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <el-input-range
      ref="input-range"
      :value="innerVal"
      slot="reference"
      v-bind="attrs"
      v-on="$listeners"
    >
      <custom-render
        slot="range-separator"
        :render="rangeSeparatorSlotRender" />

      <input-slot
        :value="innerVal"
        v-bind="$attrs"
      />
    </el-input-range>
  </el-popover>

  <el-input-range
    v-else
    ref="input-range"
    :value="innerVal"
    v-bind="attrs"
    v-on="$listeners"
  >
    <custom-render
      slot="range-separator"
      :render="rangeSeparatorSlotRender" />

    <input-slot
      :value="innerVal"
      v-bind="$attrs"
    />
  </el-input-range>
</template>

<script>
import pick from 'lodash/pick';
import {
  popoverMixin, InputSlot, EL_INPUT_RANGE_ATTRS, proxyMethods, ATOMIC_ATTRS,
  CustomRender,
} from '@onemin-table/shared';
import ElInputRange from './components/input-range.vue';

export default {
  name: 'ElemInputRange',

  inheritAttrs: false,

  mixins: [popoverMixin],

  components: {
    ElInputRange,
    CustomRender,
    InputSlot,
  },

  props: {
    /**
     * @language=zh
     * 输入框绑定值
     */
    value: {
      type: Array,
      default() { return []; },
    },

    /**
     * @language=zh
     * 分隔符内容渲染函数
     */
    rangeSeparatorSlotRender: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      // inner value, 内部绑定值
      innerVal: this.value,

      container: null,
      inputs: [],
    };
  },

  watch: {
    value: {
      handler() {
        // outer value changed, 外部绑定值改变
        this.innerVal = this.value;
      },
      deep: true,
    },
  },

  computed: {
    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-input-range__popover--elem');
    },

    attrs() {
      return pick(this.$attrs, [
        ...EL_INPUT_RANGE_ATTRS,
        ...ATOMIC_ATTRS,
      ]);
    },
  },

  mounted() {
    // Proxy <el-form> Methods, 代理<el-form>方法
    proxyMethods(this, 'input-range', ['focusStart', 'focusEnd', 'blur', 'clear']);
  },
};
</script>
