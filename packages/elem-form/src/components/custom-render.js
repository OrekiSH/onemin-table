export default {
  functional: true,
  props: {
    render: {
      type: Function,
      default: () => {},
    },
  },
  render: (h, ctx) => ctx.props.render(h),
};
