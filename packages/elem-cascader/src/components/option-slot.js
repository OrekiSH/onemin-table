export default {
  functional: true,

  props: {
    node: {
      type: Object,
      default: null,
    },

    data: {
      type: Object,
      default: null,
    },

    render: {
      type: Function,
      default: null,
    },
  },

  render(h, ctx) {
    const { render, node, data } = ctx.props;
    return typeof render === 'function'
      ? render(h, { node, data })
      : '';
  },
};
