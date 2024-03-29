<template>
  <el-popover
    :value="attrs.popoverVisible && mounted"
    v-bind="innerPopoverAttrs"
    v-on="attrs.popoverListeners"
  >
    <template v-if="attrs.popoverSlotRender">
      <custom-render :render="attrs.popoverSlotRender" />
    </template>

    <template v-else>
      <el-image
        class="ot-table__popover-image--elem"
        :src="imageSrc"
        :preview-src-list="previewSrcList"
      >
        <image-slot
          :error-slot-render="col.errorSlotRender"
          :placeholder-slot-render="col.placeholderSlotRender"
        />
      </el-image>
    </template>

    <el-image
      slot="reference"
      :src="imageSrc"
      :preview-src-list="previewSrcList"
      :data-prop="col.prop"
      class="ot-table__image--elem"
      v-bind="attrs"
      v-on="listeners"
    >
      <image-slot
        :error-slot-render="col.errorSlotRender"
        :placeholder-slot-render="col.placeholderSlotRender"
      />
    </el-image>
  </el-popover>
</template>

<script>
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import ImageSlot from './image-slot';

export default {
  components: {
    ImageSlot,
  },

  inheritAttrs: false,

  props: {
    col: {
      type: Object,
      default() { return {}; },
    },

    scope: {
      type: Object,
      default() { return {}; },
    },

    /**
     * @language=zh
     * 图片类型的列是否显示Popover
     */
    imagePopover: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 图片类型的列是否启用预览
     */
    imagePreview: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 图片类型的列加载失败是否不显示Popover
     */
    loadErrorNoPopover: {
      type: Boolean,
      default: true,
    },

    /**
     * @language=zh
     * 图片类型的列图片地址转换函数
     */
    imageSrcTransformer: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      // if mounted, 是否已挂载
      mounted: false,

      failed: false,
    };
  },

  computed: {
    innerPopoverAttrs() {
      const result = {
        trigger: 'hover',
        placement: 'right',
        width: '200',
        'popper-class': 'ot-image__popover--elem',
      };

      // global not show or load failed, 全局不展示或者加载失败
      if (!this.imagePopover || (this.loadErrorNoPopover && this.failed)) result.disabled = true;

      return {
        ...result,
        ...this.col?.popoverAttrs,
      };
    },

    attrs() {
      const temp = {};
      const attrs = this?.col?.attrs || {};
      Object.keys(attrs).forEach((k) => {
        temp[k] = attrs[k];
        temp[kebabCase(k)] = attrs[k];
      });

      return {
        'z-index': 9999,
        ...temp,
      };
    },

    listeners() {
      const result = this.col?.listeners || {};
      result.error = (err) => {
        this.failed = true;
        if (typeof this.col?.listeners?.error === 'function') this.col.listeners.error(err);
      };

      return result;
    },

    /**
     * image src
     * 图片src属性
     */
    imageSrc() {
      const data = get(this.scope?.row, this.col?.prop);
      const url = (Array.isArray(data) && data.length) ? data[0] : data;
      if (typeof this.imageSrcTransformer === 'function') {
        return this.imageSrcTransformer(url);
      }

      return url;
    },

    previewSrcList() {
      return this.genPreviewSrcList(this.scope?.row, this.col);
    },
  },

  mounted() {
    // corrent popover placement, 纠正<el-popover>的位置
    this.mounted = true;
  },

  methods: {
    /**
     * preview url list
     * 预览url列表
     */
    genPreviewSrcList(row, col) {
      if (!this.imagePreview) return [];

      const isFunc = typeof this.imageSrcTransformer === 'function';
      // previewProp
      const previewData = get(row, col.previewProp);
      // Array<string> or string, 默认传入的为字符串数组或字符串
      if (previewData) {
        const previewSrcList = Array.isArray(previewData) ? previewData : [previewData];
        return isFunc ? previewSrcList.map(this.imageSrcTransformer) : previewSrcList;
      }

      // prop
      const data = get(row, col.prop);
      const srcList = Array.isArray(data) ? data : [data];
      return isFunc ? srcList.map(this.imageSrcTransformer) : srcList;
    },
  },
};
</script>
