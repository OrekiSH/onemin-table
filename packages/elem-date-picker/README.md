<h1 align="center">elem-date-picker</h1>

🚀 schema-based日期时间选择器模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-date-picker
# OR
$ yarn add @onemin-table/elem-date-picker
```

## 用法

在 HTML 中以 UMD 的形式使用:

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css" rel="stylesheet">
</head>
<body>
  <main id="app">
    <elem-date-picker
      v-model="foo"
      type="daterange"
      :width="300"
      :disabled-date-start="3"
    />
  </main>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js"></script>
  <script src="./node_modules/@onemin-table/elem-date-picker/dist/elem-date-picker.js"></script>
  <script>
    new Vue({
      el: '#app',
      components: {
        ElemDatePicker,
      },
      data() {
        return {
          foo: [],
        };
      },
    });
  </script>
</body>
</html>
```

在工程项目中以 CommonJS / ESM 的形式使用:

``` html
<template>
  <div>
    <button @click="active = !active">切换</button>
    <elem-date-picker
      v-model="foo"
      type="daterange"
      :width="300"
      :disabled-date-start="3"
      :disabled-date-end="10"
      :disabled-date-range="[1, 1]"
      :range-separator-slot-render="rangeSeparatorSlotRender"
      :popover-visible="active"
      :border-color="active ? 'red' : ''"
      popover-content="content"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foo: [],

        active: false,
      };
    },

    methods: {
      rangeSeparatorSlotRender() {
        return <i class="el-icon-time" />;
      },
    },
  };
</script>
```

代码预览

![代码预览](https://s3.ax1x.com/2021/03/16/6yrDe0.png)

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| range-separator-slot-render | 选择器分隔符内容渲染函数, 相当于`el-date-picker`的range-separator slot | Function |
| disabled-date-start | 禁用状态的日期距离当前时间之后的天数(开区间), 天数计算包含当前日期 | Number |
| disabled-date-end | 禁用状态的日期距离当前时间之前的天数(开区间), 天数计算不含当前日期 | Number |
| disabled-date-range | 禁用状态的日期距离当前时间的天数区间(闭区间), [start, end], start的天数计算包含当前日期 | `Array<Number>` |
| data-prop | 元素标识，会被绑定到DOM元素的`data-prop`属性上, 默认为空 | String |
| width | 选择器宽度, 传入数字会被识别为像素值(px) | `String|Number` |
| border-color | 选择器边框颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| background-color | 选择器背景颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| color | 选择器字体颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| popover-visible | `<el-popover>`弹出框是否显示 | Boolean |
| popover-content | `<el-popover>`弹出框内容 | String |
| popover-attrs | [`<el-popover>`的属性](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | Object |
| popover-listeners | [`<el-popover>`的事件](https://element.eleme.cn/#/zh-CN/component/popover#events) | Object |
| popover-slot-render | 弹出框渲染函数, 相当于`el-popover`的default slot | Function |

其他继承自`el-date-picker`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes)

## 事件

继承自`el-date-picker`的事件见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/date-picker#events)

## 方法

继承自`el-date-picker`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/date-picker#methods)
