import { genCustomSlotRenderFunc } from '@onemin-table/shared';

export default {
  functional: true,

  props: {
    emptySlotRender: {
      type: Function,
      default: null,
    },
  },

  render: genCustomSlotRenderFunc,
};
