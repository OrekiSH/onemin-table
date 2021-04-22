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
