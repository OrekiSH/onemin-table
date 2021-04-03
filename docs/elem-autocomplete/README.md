<h1 align="center">elem-autocomplete</h1>

🚀 element-ui样式的schema-based输入匹配框模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-autocomplete
# OR
$ yarn add @onemin-table/elem-autocomplete
```

## 用法

::: demo
<template>
  <div>
    <button @click="active = !active">切换</button>
    <span>{{ !active ? '' : '激活' }}</span>
    <elem-autocomplete
      ref="autocomplete"
      v-model="foo"
      :popoverVisible="active"
      :border-color="active ? 'red' : ''"
      :prefix-slot-render="prefixSlotRender"
      :fetch-suggestions="fetchSuggestions"
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
        foo: 'a',

        active: true,
      };
    },

    watch: {
      foo() {
        console.warn(this.foo);
      },
    },

    methods: {
      handleChange(val) {
        console.warn(this.foo, val);
      },

      prefixSlotRender() {
        return <i class="el-icon-time el-input__icon" />;
      },

      fetchSuggestions(queryString, cb) {
        if (queryString.length > 4) {
          setTimeout(() => {
            cb(new Array(10).fill(0).map((e, i) => ({
              value: `${queryString}_${i}`,
            })));
          }, 1e3);
        } else {
          // eslint-disable-next-line
          cb([]);
        }
      },
    },
  };
</script>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| prefix-slot-render | 输入匹配框头部内容渲染函数, 相当于`el-autocomplete`的prefix slot | Function |
| suffix-slot-render | 输入匹配框尾部内容渲染函数, 相当于`el-autocomplete`的suffix slot | Function |
| append-slot-render | 输入匹配框后置内容渲染函数, 相当于`el-autocomplete`的append slot | Function |
| prepend-slot-render | 输入匹配框前置内容渲染函数, 相当于`el-autocomplete`的prepend slot | Function |
| append | 输入匹配框后置内容字符串, 优先级低于`appendSlotRender` | String |
| prepend | 输入匹配框前置内容字符串, 优先级低于`prependSlotRender` | String |
| option-slot-render | 输入匹配框自定义备选项渲染函数, 相当于`el-autocomplete`的scoped slot, 参数为当前输入建议对象 | Function |
| data-prop | 元素标识，会被绑定到DOM元素的`data-prop`属性上, 默认为空 | String |
| width | 输入匹配框宽度, 传入数字会被识别为像素值(px) | `String|Number` |
| border-color | 输入匹配框边框颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| background-color | 输入匹配框背景颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| color | 输入匹配框字体颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| popover-visible | `<el-popover>`弹出框是否显示 | Boolean |
| popover-content | `<el-popover>`弹出框内容 | String |
| popover-slot-render | 弹出框渲染函数, 相当于`el-popover`的default slot | Function |
| popover-attrs | [`<el-popover>`的属性](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | Object |
| popover-listeners | [`<el-popover>`的事件](https://element.eleme.cn/#/zh-CN/component/popover#events) | Object |
| scroll-wrapper | 滚动容器输入匹配框, 用于解决`<el-popover>`不随目标元素滚动的问题, 滚动元素为window时传'window'字符串, 默认值空 | String |
| scroll-debounce | 滚动容器滚动时更新`<el-popover>`的位置信息的延迟毫秒数, 仅当`scroll-wrapper`不为空时生效, 默认值0 | Number |
| duration | popover显示时间, 毫秒。设为 0 则不会自动关闭 | Number | 3000 |

其他继承自`el-autocomplete`的属性见[element-ui文档](hhttps://element.eleme.cn/#/zh-CN/component/input#autocomplete-attributes)

## 事件

继承自`el-autocomplete`的事件见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input#autocomplete-events)

## 方法

继承自`el-autocomplete`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/input#autocomplete-methods)
