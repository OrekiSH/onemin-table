<h1 align="center">elem-input-number</h1>

🚀 schema-based区间输入模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-input-range
# OR
$ yarn add @onemin-table/elem-input-range
```

## 用法

::: demo
<template>
  <div>
    <button @click="active = !active">切换</button>
    <button @click="handleClear">清空</button>
    <elem-input-range
      ref="input"
      v-model="foo"
      :border-color="active ? 'red' : ''"
      :popover-visible="active"
      popover-content="内容"
      type="number"
      :range-separator-slot-render="rangeSeparatorSlotRender"
      append="%"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: [],
      active: true,
    };
  },

  mounted() {
    const ref = this.$refs.input;
    if (ref) {
      ref.focusStart();
      setTimeout(() => {
        ref.blur();
      }, 3e3);
    }
  },

  methods: {
    rangeSeparatorSlotRender() {
      return <i class="el-icon-time" />;
    },

    handleClear() {
      const ref = this.$refs.input;
      if (ref) ref.clear();
    },

    onChange(...args) {
      console.warn(args);
    },
  },
};
</script>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| value/v-model | 绑定值 | Array |
| type | text，textarea 和其他 原生 input 的 type 值 | String |
| disabled | 是否可禁用 | Boolean |
| clearable | 是否可清空 | Boolean |
| size | 输入框尺寸 | medium / small / mini |
| start-placeholder | 范围选择时开始的占位内容 | String |
| end-placeholder | 范围选择时结束的占位内容 | String |
| range-separator | 选择范围时的分隔符 | String |
| clear-icon | 自定义清空图标的类名 | String |
| data-prop | 元素标识，会被绑定到DOM元素的`data-prop`属性上, 默认为空 | String |
| width | 选择器宽度, 传入数字会被识别为像素值(px) | `String|Number` |
| border-color | 选择器边框颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| background-color | 选择器背景颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| color | 选择器字体颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| popover-visible | `<el-popover>`弹出框是否显示 | Boolean |
| popover-content | `<el-popover>`弹出框内容 | String |
| popover-slot-render | 弹出框渲染函数, 相当于`el-popover`的default slot | Function |
| popover-attrs | [`<el-popover>`的属性](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | Object |
| popover-listeners | [`<el-popover>`的事件](https://element.eleme.cn/#/zh-CN/component/popover#events) | Object |
| scroll-wrapper | 滚动容器选择器, 用于解决`<el-popover>`不随目标元素滚动的问题, 滚动元素为window时传'window'字符串, 默认值空 | String |
| scroll-debounce | 滚动容器滚动时更新`<el-popover>`的位置信息的延迟毫秒数, 仅当`scroll-wrapper`不为空时生效, 默认值0 | Number |
| duration | popover显示时间, 毫秒。设为 0 则不会自动关闭 | Number | 3000 |

## 事件

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| input | 在 Input 值改变时触发 | (value: Array) |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | - |
| change | 仅在输入框失去焦点或用户按下回车时触发, 先于clear事件 | (value: Array) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| blur | 在 Input 失去焦点时触发 | (event: Event) |

## 方法

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| focusStart | 首输入框获取焦点 | - |
| focusEnd | 尾输入框获取焦点 | - |
| blur | 输入框失去焦点 | - |
| clear | 清空输入框 | - |