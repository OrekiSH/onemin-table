<h1 align="center">elem-select</h1>

🚀 element-ui样式的schema-based选择器模板组件, 集成`el-popover`组件，实现关注点集中的反馈模式.

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-select
# OR
$ yarn add @onemin-table/elem-select
```

## 用法

::: demo
<template>
  <div>
    <button @click="group = !group">切换</button>
    <span>{{ !group ? '单选' : '分组' }}</span>
    <elem-select
      ref="select"
      v-model="foo"
      :popoverVisible="!group"
      :options="group ? groupOptions : options"
      :prefix-slot-render="prefixSlotRender"
      :border-color="group ? '' : 'red'"
      :width="300"
      :popover-slot-render="popoverSlotRender"
      :loading="loading"
      multiple
      @change="handleChange"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        foo: [1],

        group: true,
        groupOptions: [],
        loading: false,
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
        }];
      },
    },

    mounted() {
      const ref = this.$refs.select;
      if (ref) ref.focus();
      this.fetchGroupOptions();
    },

    methods: {
      fetchGroupOptions() {
        this.loading = true;
        setTimeout(() => {
          const ref = this.$refs.select;
          if (ref) ref.blur();
          this.groupOptions = [{
            label: '分组1',
            children: this.options,
          }, {
            label: '分组2',
            children: [{
              label: 'd',
              value: 4,
              disabled: true,
            }],
          }];
          this.loading = false;
        }, 2e3);
      },

      handleChange(val) {
        console.warn(this.foo, val);
      },

      prefixSlotRender(h) {
        return <i class="el-icon-time el-input__icon" />;
      },

      popoverSlotRender() {
        return (
          <div>
            <i style="color: #F46A6A;margin-right: 10px;" class="el-icon-error" />
            错误
          </div>
        );
      },
    },
  };
</script>

<style>
  .ot-select__popover--elem {
    padding: 16px;
  }

  .el-select-dropdown__loading {
    color: #000;
  }
</style>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| options(必填) | 选择器下拉列表数据, 含有children的列表自动分组展示 | Array<{ label: string, value?: any, disabled?: boolean, children?: Array }> |
| prefix-slot-render | 选择器头部内容渲染函数, 相当于`el-select`的prefix slot | Function |
| empty-slot-render | 选择器无选项时列表渲染函数, 相当于`el-select`的empty slot | Function |
| loading | 选择器是否加载中 | Boolean |
| loading-text | 选择器选项加载中列表提示文字 | String |
| loading-slot-render | 选择器选项加载中列表内容渲染函数, 优先级高于`loading-text` | Function |
| prop | 元素标识，会被绑定到DOM元素的`data-prop`属性上, 默认为空 | String |
| width | 选择器宽度, 传入数字会被识别为像素值(px) | `String|Number` |
| border-color | 选择器边框颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| background-color | 选择器背景颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| color | 选择器字体颜色, 可用于校验不通过的提示，设为空字符串可还原 | String |
| popover-visible | `<el-popover>`弹出框是否显示 | Boolean |
| popover-content | `<el-popover>`弹出框内容 | String |
| popover-attrs | [`<el-popover>`的属性](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | Object |
| popover-listeners | [`<el-popover>`的事件](https://element.eleme.cn/#/zh-CN/component/popover#events) | Object |
| popover-slot-render | 弹出框渲染函数, 相当于`el-popover`的default slot | Function |

其他继承自`el-select`的属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)

## 事件

继承自`el-select`的事件见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/select#select-events)

## 方法

继承自`el-select`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/select#methods)
