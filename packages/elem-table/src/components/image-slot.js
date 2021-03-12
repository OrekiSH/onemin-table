export default {
  functional: true,

  props: {
    errorSlotRender: {
      type: Function,
      default: (h) => h('i', { class: 'el-icon-picture-outline' }),
    },

    placeholderSlotRender: {
      type: Function,
      default: (h) => h('i', { class: 'el-icon-loading' }),
    },
  },

  render: (h, ctx) => [
    h('div', { slot: 'error', class: 'el-image__error' }, [ctx.props.errorSlotRender(h)]),
    h('div', { slot: 'placeholder', class: 'el-image__placeholder' }, [ctx.props.placeholderSlotRender(h)]),
  ],
};
