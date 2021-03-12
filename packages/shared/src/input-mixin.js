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
  },

  data() {
    return {
      // if mounted, 是否已挂载
      mounted: false,
    };
  },

  mounted() {
    // corrent popover placement, 纠正<el-popover>的位置
    this.mounted = true;
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
      inputVal: this.value,

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
        this.inputVal = this.value;
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
