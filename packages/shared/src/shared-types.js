/**
 * datetime range picker types
 * 日期时间区间选择类型
 */
export const ELEM_DATE_RANGE_TYPES = Object.freeze([
  'dates',
  'datetimerange',
  'daterange',
  'monthrange',
]);

/**
 * datetime picker types
 * 日期时间选择类型
 */
export const ELEM_DATE_TYPES = Object.freeze([
  'year',
  'month',
  'date',
  'week',
  'datetime',
  ...ELEM_DATE_RANGE_TYPES,
]);

export const COMPONENT_MAP = Object.freeze({
  // input, 输入框
  input: 'elem-input',

  // input-number, 计数器
  'input-number': 'elem-input-number',

  // select, 选择器
  select: 'elem-select',
  'single-select': 'elem-select',

  // cascader, 级联选择器
  cascader: 'elem-cascader',
  'single-cascader': 'elem-cascader',

  // autocomplete, 输入匹配框
  autocomplete: 'elem-autocomplete',

  // date-picker, 日期选择器
  ...Object.fromEntries(ELEM_DATE_TYPES.map((e) => [e, 'elem-date-picker'])),

  // checkbox, 多选框
  checkbox: 'elem-list-group',
  'checkbox-button': 'elem-list-group',

  // radio, 单选框
  radio: 'elem-list-group',
  'radio-button': 'elem-list-group',

  'input-range': 'elem-input-range',
});

export const LIST_COMPONENTS = [
  'checkbox',
  'checkbox-button',
  'radio',
  'radio-button',
];

/**
 * bind value changes by input event.
 * 绑定至随input事件触发的组件类型
 */
export const INPUT_TYPES = [
  'input',
  'autocomplete',
  ...LIST_COMPONENTS,
];

/**
 * components with options prop
 * 含有options属性的组件
 */
export const OPTIONS_COMPONENTS = [
  'select',
  'single-select',
  'cascader',
  'single-cascader',
  ...LIST_COMPONENTS,
];

/**
 * components with value prop
 * 只含有value属性的组件
 */
export const VALUE_COMPONENTS = [
  ...ELEM_DATE_TYPES,
  'input',
  'input-number',
  'autocomplete',
  'input-range',
];

export const ELEM_COMPONENTS = OPTIONS_COMPONENTS.concat(VALUE_COMPONENTS);
