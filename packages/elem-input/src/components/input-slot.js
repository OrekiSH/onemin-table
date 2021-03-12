import { genCustomSlotRenderFunc } from '@onemin-table/shared';

export default {
  functional: true,

  props: {
    prefixSlotRender: {
      type: Function,
      default: null,
    },

    suffixSlotRender: {
      type: Function,
      default: null,
    },

    prependSlotRender: {
      type: Function,
      default: null,
    },

    appendSlotRender: {
      type: Function,
      default: null,
    },
  },

  render: genCustomSlotRenderFunc,
};
