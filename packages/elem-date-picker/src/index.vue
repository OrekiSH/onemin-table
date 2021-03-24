<template>
  <el-popover
    :value="popoverVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="popoverListeners"
  >
    <template v-if="popoverSlotRender">
      <custom-render :render="popoverSlotRender" />
    </template>

    <div
      :style="`width: ${elWidth || '100%'}`"
      class="el-date-editor"
      slot="reference"
    >
      <el-date-picker
        ref="picker"
        v-model="innerVal"
        v-bind="attrs"
        v-on="$listeners"
      >
        <date-picker-slot
          :range-separator-slot-render="rangeSeparatorSlotRender"
        />
      </el-date-picker>
    </div>
  </el-popover>
</template>

<script>
import { inputMixin, CustomRender } from '@onemin-table/shared';
import DatePickerSlot from './components/date-picker-slot';

const DAY_MS = 24 * 60 * 60 * 1000;

export default {
  name: 'ElemDatePicker',

  mixins: [inputMixin],

  inheritAttrs: false,

  props: {
    /**
     * @language=zh
     * 输入框绑定值
     */
    value: {
      type: [Number, String, Date, Array],
      default: null,
    },

    /**
     * @language=zh
     * 分隔符内容渲染函数
     */
    rangeSeparatorSlotRender: {
      type: Function,
      default: null,
    },

    /**
     * @language=zh
     * 禁用状态的日期距离当前时间之后的天数(开区间)
     */
    disabledDateStart: {
      type: Number,
      default: null,
    },

    /**
     * @language=zh
     * 禁用状态的日期距离当前时间之前的天数(开区间)
     */
    disabledDateEnd: {
      type: Number,
      default: null,
    },

    /**
     * @language=zh
     * 禁用状态的日期距离当前时间的天数集合(闭区间)
     */
    disabledDateRange: {
      type: Array,
      default() { return []; },
    },
  },

  components: {
    CustomRender,
    DatePickerSlot,
  },

  computed: {
    /**
     * input default attributes
     * 日期选择器默认属性
     */
    attrs() {
      const def = this.genDefaultAttrs;
      return {
        placeholder: def('placeholder', '选择日期'),
        'range-separator': def('rangeSeparator', '~'),
        'start-placeholder': def('startPlaceholder', '开始日期'),
        'end-placeholder': def('endPlaceholder', '结束日期'),
        ...this.$attrs,
        'picker-options': {
          disabledDate: (date) => {
            const now = Date.now();
            const pickerTime = date.getTime();

            // 小于当前时间xx天的开区间， xx day early than now.
            const startRange = typeof this.disabledDateStart === 'number'
              ? pickerTime < now - (this.disabledDateStart * DAY_MS)
              : false;
            // 大于当前时间xx天的开区间， xx day later than now.
            const endRange = typeof this.disabledDateEnd === 'number'
              ? pickerTime > now + (this.disabledDateEnd * DAY_MS)
              : false;

            // 小于当前时间xx天并大于当前时间yy天的闭区间
            // xx day early than now and yy day later than now.
            let midRange = false;
            const [start, end] = this.disabledDateRange || [];
            if (typeof start === 'number' && typeof end === 'number') {
              midRange = (pickerTime > now - (start * DAY_MS))
                && (pickerTime < now + (end * DAY_MS));
            }

            return startRange || endRange || midRange;
          },
          ...this.$attrs?.['picker-options'],
        },
      };
    },

    innerPopoverAttrs() {
      return this.genDefaultPopoverAttrs('ot-date-picker__popover--elem');
    },
  },

  mounted() {
    const ref = this.$refs.picker;
    // Proxy <el-date-picker> methods, 代理<el-date-picker>的方法
    if (ref) {
      ['focus'].forEach((key) => {
        this[key] = ref[key];
      });
    }
  },
};
</script>
