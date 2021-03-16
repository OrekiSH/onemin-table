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
      result.push(h('template', { slot: kebabCase(slot) }, [ctx.props[key](h)]));
    }
  });

  return result;
};

/**
 * datetime range picker types
 * 日期时间区间选择类型
 */
export const ELEM_DATE_RANGE_TYPES = [
  'dates',
  'datetimerange',
  'daterange',
  'monthrange',
];

/**
 * datetime picker types
 * 日期时间选择类型
 */
export const ELEM_DATE_TYPES = [
  'year',
  'month',
  'date',
  'week',
  'datetime',
  ...ELEM_DATE_RANGE_TYPES,
];