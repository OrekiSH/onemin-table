/**
 * 驼峰转中划线
 * camelcase to kebabcase
 */
export function kebabCase(str) {
  return str.replace(/(?!^)([A-Z\u00C0-\u00D6])/g, (match) => `-${match.toLowerCase()}`);
}

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
    attrs: {
      type: Object,
      default: null,
    },
    listeners: {
      type: Object,
      default: null,
    },
  },
  render: (h, ctx) => (
    typeof ctx.props.render === 'function'
      ? ctx.props.render(h, ctx.props.attrs, ctx.props.listeners) : ''
  ),
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
      result.push(h('template', { slot: kebabCase(slot) }, [ctx.props[key](h)]));
    }
  });

  return result;
};
