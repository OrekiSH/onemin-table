export const atomicProps = {
  /**
   * @language=zh
   * 选择器边框颜色
   */
  borderColor: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 选择器背景颜色
   */
  backgroundColor: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 选择器字体颜色
   */
  color: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 元素长度
   */
  width: {
    type: [String, Number],
    default: '',
  },

  /**
   * @language=zh
   * 是否添加Popover
   */
  lite: {
    type: Boolean,
    default: false,
  },
};

export const inputSlotRenderProps = {
  /**
   * @language=zh
   * 头部内容渲染函数
   */
  prefixSlotRender: {
    type: Function,
    default: null,
  },

  /**
   * @language=zh
   * 尾部内容渲染函数
   */
  suffixSlotRender: {
    type: Function,
    default: null,
  },

  /**
   * @language=zh
   * 前置内容渲染函数
   */
  prependSlotRender: {
    type: Function,
    default: null,
  },

  /**
   * @language=zh
   * 后置内容渲染函数
   */
  appendSlotRender: {
    type: Function,
    default: null,
  },
};

/**
 * 输入框与Autocomplete的共有props
 * input and Autocomplete shared props
 */
export const inputProps = {
  ...inputSlotRenderProps,

  /**
   * @language=zh
   * 前置内容字符串
   */
  prepend: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 后置内容字符串
   */
  append: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 尾部图标类名
   */
  suffixIcon: {
    type: String,
    default: '',
  },

  /**
   * @language=zh
   * 首部图标类名
   */
  prefixIcon: {
    type: String,
    default: '',
  },
};

/**
 * 加载状态props
 * loading state props
 */
export const loadingProps = {
  /**
   * @language=zh
   * 选项加载中列表内容渲染函数
   */
  loadingSlotRender: {
    type: Function,
    default: null,
  },

  /**
   * @language=zh
   * 选项加载中列表内容
   */
  loadingText: {
    type: String,
    default: '加载中...',
  },

  /**
   * @language=zh
   * 选项加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
};

/**
 * 搜索重置按钮组props
 * Search & Reset Button Group props,
 */
export const searchResetProps = {
  /**
   * @language=zh
   * 搜索重置按钮组
   */
  buttonLayout: {
    type: Array,
    default() { return ['search', 'reset', 'collapse']; },
  },

  /**
   * @language=zh
   * 搜索按钮文本
   */
  searchButtonText: {
    type: String,
    default: '查 询',
  },

  /**
   * @language=zh
   * 重置按钮文本
   */
  resetButtonText: {
    type: String,
    default: '重 置',
  },

  /**
   * @language=zh
   * 收起按钮文本
   */
  collapseButtonText: {
    type: String,
    default: '收起',
  },

  /**
   * @language=zh
   * 展开按钮文本
   */
  expandButtonText: {
    type: String,
    default: '展开',
  },

  /**
   * @language=zh
   * 搜索&重置按钮组是否加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
};
