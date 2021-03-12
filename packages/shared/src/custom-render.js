/**
 * custom render props
 * 自定义渲染函数
 */
export const CustomRender = {
  functional: true,
  props: {
    render: {
      type: Function,
      default: null,
    },
  },
  render: (h, ctx) => typeof ctx.props.render === 'function' ? ctx.props.render(h) : '',
};

/**
 * slot's custom render function
 * 插槽的自定义渲染函数
 */
export const genCustomSlotRenderFunc = (h, ctx) => {
  const result = [];

  Object.keys(ctx.props).forEach((key) => {
    const slot = key.slice(0, -'SlotRender'.length);
    if (typeof ctx.props[key] === 'function') {
      result.push(h('template', { slot }, [ctx.props[key](h)]));
    }
  });

  return result;
};