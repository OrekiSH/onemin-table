export default {
  functional: true,

  props: {
    options: {
      type: Array,
      default() { return []; },
    },

    optionSlotRender: {
      type: Function,
      default: null,
    },
  },

  render(h, ctx) {
    return (Array.isArray(ctx.props.options) ? ctx.props.options : []).map((item, i) => {
      const slotRender = item.optionSlotRender || ctx.props.optionSlotRender;

      return h('el-option', {
        key: i,
        props: {
          label: item.label,
          value: item.value,
          disabled: item.disabled,
        },
        scopedSlots: {
          default: () => typeof slotRender === 'function' ? slotRender(h, item) : null,
        },
      });
    });
  }
};
