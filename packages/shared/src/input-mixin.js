export function debounce(fn, wait) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  let result = null;
  let timerId = null;

  function debounced(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      result = fn.apply(this, args);
    }, +wait);

    return result;
  }

  return debounced;
}

/**
 * if can addEventListener
 * 是否是EventTarget
 */
export function isEventTarget() {
  return el instanceof Element || el instanceof HTMLDocument || el instanceof Window;
}

export const popoverMixin = {
  props: {
    /**
     * popover visible
     * 弹出框是否显示
     */
    popoverVisible: {
      type: Boolean,
      default: false,
    },

    /**
     * <el-popover> Attributes
     * 弹出框属性
     */
    popoverAttrs: {
      type: Object,
      default() { return {}; },
    },

    /**
     * <el-popover> Events
     * 弹出框事件
     */
    popoverListeners: {
      type: Object,
      default() { return {}; },
    },

    /**
     * <el-popover> Events
     * 弹出框内容
     */
    popoverContent: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 弹出框渲染函数
     */
    popoverSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 滚动容器选择器(window直接使用window字符串), 指定时会在滚动时更新popover的位置信息
     */
    scrollWrapper: {
      type: String,
      default: '',
    },

    /**
     * @language=zh
     * 滚动debounce延迟时间
     */
    scrollDebounce: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      // if mounted, 是否已挂载
      mounted: false,
      // scroll container, 滚动容器
      scrollEl: null,
    };
  },

  mounted() {
    // corrent popover placement, 纠正<el-popover>的位置
    this.mounted = true;

    if (this.scrollWrapper) {
      // 滚动元素, scroll elment
      const el = this.scrollWrapper === 'window'
        ? window
        : document.querySelector(this.scrollWrapper);

      if (el) {
        this.scrollEl = el;
        this.handleUpdatePopover = debounce(() => {
          const ref = this.$refs.popover;
          if (typeof ref?.updatePopper === 'function') ref.updatePopper();
        }, this.scrollDebounce);
        el.addEventListener('scroll', this.handleUpdatePopover);
      }
    }
  },

  beforeDestroy() {
    if (this.scrollEl && this.handleUpdatePopover) {
      this.scrollEl.removeEventListener('scroll', this.handleUpdatePopover);
    }
  },

  methods: {
    /**
     * default <el-popover> attributes
     * 默认 <el-popover>属性
     */
    genDefaultPopoverAttrs(className, defaultOptions = {
      trigger: 'manual',
      placement: 'top',
    }) {
      const attrs = {
        ...defaultOptions,
        disabled: !this.popoverContent
          && !this.popoverAttrs.content
          && !this.popoverSlotRender,
        'popper-class': className,
      };

      if (this.popoverContent) attrs.content = this.popoverContent;

      return {
        ...attrs,
        ...this.popoverAttrs,
      };
    },
  },
};

/**
 * 输入框 Popover与颜色相关
 * input Popover and color related.
 */
export const inputMixin = {
  mixins: [popoverMixin],

  props: {
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
  },

  data() {
    return {
      // inner value, 内部绑定值
      innerVal: this.value,

      // native input element, 元素输入框元素
      inputEl: null,
    };
  },

  computed: {
    elWidth() {
      return typeof this.width === 'number' ? `${this.width}px` : this.width;
    },
  },

  watch: {
    value: {
      handler() {
        // outer value changed, 外部绑定值改变
        this.innerVal = this.value;
      },
      deep: true,
    },

    borderColor() {
      this.setBorderColor();
    },

    backgroundColor() {
      this.setBackgroundColor();
    },

    color() {
      this.setFontColor();
    },
  },

  mounted() {
    // set input element color handler, 设置输入框元素颜色处理函数
    this.inputEl = this.$el.querySelector('.el-input__inner')
      || this.$el.querySelector('.el-textarea__inner');

    this.setBorderColor();
    this.setBackgroundColor();
    this.setFontColor();
  },

  methods: {
    setBorderColor() {
      if (this.inputEl) this.inputEl.style.borderColor = this.borderColor;
    },

    setBackgroundColor() {
      if (this.inputEl) this.inputEl.style.backgroundColor = this.backgroundColor;
    },

    setFontColor() {
      if (this.inputEl) this.inputEl.style.color = this.color;
    },

    /**
     * component default attributes.
     * 组件默认属性值
     */
    genDefaultAttrs(prop, defaultVal = true) {
      return this.$attrs[prop] === undefined ? defaultVal : this.$attrs[prop];
    },
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
