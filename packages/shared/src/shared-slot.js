import { inputProps } from './shared-props';

/**
 * 输入框 Slot函数组件
 * input slot functional component.
 */
// eslint-disable-next-line import/prefer-default-export
export const InputSlot = {
  functional: true,

  props: {
    ...inputProps,

    value: {
      type: [String, Number, Array],
      default: null,
    },
  },

  render: (h, ctx) => {
    const result = [];

    Object.keys(ctx.props).forEach((key) => {
      const slot = ctx.props[key];
      if (!slot) return;
      // eslint-disable-next-line no-nested-ternary
      const slotFunc = typeof slot === 'function'
        ? slot
        : () => h('div', null, slot);

      result.push(h('template', { slot: key }, [
        slotFunc(h, ctx.props.value),
      ]));
    });

    return result;
  },
};
