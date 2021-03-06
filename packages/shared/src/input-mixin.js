import { debounce } from './utils';
import { atomicProps } from './shared-props';

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

    /**
     * @language=zh
     * 显示时间, 毫秒。设为 0 则不会自动关闭
     */
    duration: {
      type: Number,
      default: 3000,
    },
  },

  data() {
    return {
      // if mounted, 是否已挂载
      mounted: false,
      // scroll container, 滚动容器
      scrollEl: null,
      // timer id for hide popover, 隐藏popover的定时器id
      timerId: null,
      // popover if visible, popover是否可见
      innerVisible: this.popoverVisible,
    };
  },

  watch: {
    popoverVisible(val) {
      this.innerVisible = val;

      if (!val && this.timerId) clearTimeout(this.timerId);
      if (val) this.delayHidePopover();
    },
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
          if (ref && typeof ref.updatePopper === 'function') ref.updatePopper();
        }, this.scrollDebounce);
        el.addEventListener('scroll', this.handleUpdatePopover);
      }
    }

    this.delayHidePopover();
  },

  beforeDestroy() {
    if (this.scrollEl && this.handleUpdatePopover) {
      this.scrollEl.removeEventListener('scroll', this.handleUpdatePopover);
    }

    if (this.timerId) clearTimeout(this.timerId);
  },

  methods: {
    /**
     * duration毫秒后隐藏popover
     * hide popover after duration ms
     */
    delayHidePopover() {
      if (this.duration && this.innerVisible) {
        this.timerId = setTimeout(() => {
          this.innerVisible = false;
        }, this.duration);
      }
    },

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

  props: atomicProps,

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
      return (typeof this.$attrs[prop] === 'undefined') ? defaultVal : this.$attrs[prop];
    },
  },
};
