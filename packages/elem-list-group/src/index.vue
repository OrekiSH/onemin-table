<template>
  <el-popover
    v-if="!lite"
    ref="popover"
    :value="innerVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <list-group-fragment
      slot="reference"
      :value="innerVal"
      :type="type"
      :options="options"
      :attrs="$attrs"
      :listeners="$listeners"
    />
  </el-popover>

  <list-group-fragment
    v-else
    :value="innerVal"
    :type="type"
    :options="options"
    :attrs="$attrs"
    :listeners="$listeners"
  />
</template>

<script>
import { inputMixin, CustomRender } from '@onemin-table/shared';
import ListGroupFragment from './components/list-group-fragment.vue';

export default {
  name: 'ElemListGroup',

  inheritAttrs: false,

  mixins: [
    // mounted, innerVisible, popoverListeners, popoverSlotRender, lite, elWidth, innerVal
    inputMixin,
  ],

  components: {
    CustomRender,
    ListGroupFragment,
  },

  props: {
    value: {
      type: [Array, String, Number, Boolean],
      default: null,
    },

    /**
     * @language=zh
     * 备选项选择形式: checkbox/checkbox-button/radio/radio-button
     */
    type: {
      type: String,
      default: 'checkbox',
    },

    /**
     * @language=zh
     * 选择数据列表
     * Array<{ label: string, value: any, disabled: boolean }>
     */
    options: {
      type: Array,
      default() { return []; },
    },
  },

  computed: {
    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-list-group__popover--elem');
    },
  },

  created() {
    if (this.type.startsWith('checkbox') && !Array.isArray(this.innerVal)) {
      this.innerVal = [];
    }
  },
};
</script>
