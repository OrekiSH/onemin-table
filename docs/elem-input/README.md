# elem-input

## 特性

- [x] 集成`el-popover`组件，实现关注点集中的反馈模式

- [x] 为slot添加render function, 更便利的使用JSX

- [x] 增加分隔模式，针对特定字符分隔字符串, 将绑定值转换为数组

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-input
# OR
$ yarn add @onemin-table/elem-input
```


## 分隔模式

::: demo[scope]
<template>
  <elem-input
    v-model="foo"
    split
    placeholder="空格分隔"
    :suffix-slot-render="suffix"
  />
</template>

<script>
  export default {
    data() {
      return {
        foo: [1, 2],
      };
    },
    watch: {
      foo(val) {
        console.warn(val);
      },
    },
    methods: {
      suffix() {
        return <i class="el-icon-time el-input__icon" />;
      },
    }
  };
</script>
:::

## Popover

::: demo[scope]
<template>
  <div>
    <button @click="active = !active">切换</button>
    <span>{{ !active ? '' : '激活' }}</span>
    <elem-input
      v-model="foo"
      :popoverVisible="active"
      :border-color="active ? 'red' : ''"
      append=".com"
      prepend="https://"
      popover-content="content"
      @change="handleChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foo: '',
        active: true,
      };
    },

    methods: {
      handleChange(val) {
        console.warn(this.foo, val);
      },
    },
  };
</script>
:::

## 插槽元素

::: demo[scope]
<template>
  <div>
    <elem-input
      v-model="foo"
      :prefix-slot-render="prefixSlotRender"
      append=".com"
      prepend="https://"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foo: '',
      };
    },

    methods: {
      prefixSlotRender() {
        return <i class="el-icon-time el-input__icon" />;
      },
    },
  };
</script>
:::


## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| prefix-slot-render | 选择器头部内容渲染函数, 相当于`el-input`的prefix slot | Function |
| suffix-slot-render | 选择器尾部内容渲染函数, 相当于`el-input`的suffix slot | Function |
| append-slot-render | 选择器后置内容渲染函数, 相当于`el-input`的append slot | Function |
| prepend-slot-render | 选择器前置内容渲染函数, 相当于`el-input`的prepend slot | Function |
| append | 选择器后置内容字符串, 优先级低于`appendSlotRender` | String |
| prepend | 选择器前置内容字符串, 优先级低于`prependSlotRender` | String |
| split | 分隔模式，双向绑定值为根据`this.splitChar`分隔的数组, 默认值false | Boolean |
| split-char | 分隔模式分隔字符串，默认值`" "` | Boolean |
| convert-number | type="number"时, 输入字符串是否转换为number类型，默认值true | Boolean |
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

其他继承自`el-input`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input#input-attributes)

## 事件

继承自`el-input`的事件见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input#input-events)

## 方法

继承自`el-input`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input#input-methods)
