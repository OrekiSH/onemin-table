import { genCustomSlotRenderFunc } from './custom-render';
import { inputSlotRenderProps } from './shared-props';

/**
 * 输入框 Slot函数组件
 * input slot functional component.
 */
export const InputSlot = {
  functional: true,

  props: inputSlotRenderProps,

  render: genCustomSlotRenderFunc,
};
