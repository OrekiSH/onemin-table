import get from 'lodash/get';

export default {
  functional: true,

  inject: [
    'disabledKey',
    'labelKey',
    'valueKey',
  ],

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
    const { props, injections } = ctx;
    return (Array.isArray(props.options) ? props.options : []).map((item, i) => {
      const slotRender = item.optionSlotRender || props.optionSlotRender;

      console.error({
        label: get(item, injections.labelKey),
        value: get(item, injections.valueKey),
        disabled: get(item, injections.disabledKey),
      });

      return h('el-option', {
        key: i,
        props: {
          label: get(item, injections.labelKey),
          value: get(item, injections.valueKey),
          disabled: get(item, injections.disabledKey),
        },
        scopedSlots: {
          default: () => (typeof slotRender === 'function' ? slotRender(h, item) : null),
        },
      });
    });
  },
};
