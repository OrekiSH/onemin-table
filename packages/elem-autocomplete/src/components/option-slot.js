export default {
  functional: true,

  props: {
    item: {
      type: Object,
      default: null,
    },

    render: {
      type: Function,
      default: null,
    },
  },

  render(h, ctx) {
    const { render, item } = ctx.props;
    return typeof render === 'function'
      ? render(h, item)
      : '';
  },
};
