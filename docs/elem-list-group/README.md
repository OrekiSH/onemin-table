<h1 align="center">elem-list-group</h1>

🚀 schema-based备选项选择器模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-list-group
# OR
$ yarn add @onemin-table/elem-list-group
```

## 用法

::: demo
<template>
  <div>
    <button @click="handleClick">click</button>
    <elem-list-group
      v-model="foo"
      :options="options"
      :type="type"
      popover-visible
      popover-content="内容"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: 2,
      type: 'radio',
    };
  },

  computed: {
    options() {
      return [{
        label: 'a',
        value: 1,
      }, {
        label: 'b',
        value: 2,
      }, {
        label: 'c',
        value: 3,
        disabled: true,
      }, {
        label: 'd',
        value: 4,
        border: true,
      }];
    },
  },

  watch: {
    foo() {
      console.warn(this.foo);
    },
  },

  methods: {
    handleClick() {
      if (this.type === 'radio') {
        this.foo = [1];
        this.type = 'checkbox';
      } else {
        this.foo = 2;
        this.type = 'radio';
      }
    },
  },
};
</script>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| type(必填) | 备选项选择形式, 默认值`checkbox` | checkbox/checkbox-button/radio/radio-button |
| options(必填) | 备选项列表 | Array<{ label: string, value: any, disabled: boolean }> |
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

其他继承自`el-checkbox-group`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)
继承自`el-radio-group`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)

## 事件

| 事件名称        | 说明           | 回调参数  |
| ------------- |---------------| ------|
| change | 绑定值变化时触发的事件 | 选中的 label 值 |