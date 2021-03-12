import { genCustomSlotRenderFunc } from '@onemin-table/shared';

export default {
  functional: true,

  props: {
    prefixSlotRender: {
      type: Function,
      default: null,
    },

    emptySlotRender: {
      type: Function,
      default: null,
    },
  },

  render: genCustomSlotRenderFunc,
};
