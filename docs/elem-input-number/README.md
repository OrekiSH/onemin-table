<h1 align="center">elem-input-number</h1>

🚀 element-ui样式的schema-based计数器模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-input-number
# OR
$ yarn add @onemin-table/elem-input-number
```

## 用法

::: demo
<template>
  <elem-input-number
    v-model="foo"
    color="red"
    popover-visible
    popover-content="内容"
  />
</template>

<script>
export default {
  data() {
    return {
      foo: 2,
    };
  },
};
</script>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
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

其他继承自`el-input-number`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input-number#attributes)

## 事件

继承自`el-input-number`的事件见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input-number#events)

## 方法

继承自`el-input-number`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input-number#methods)