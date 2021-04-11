<h1 align="center">elem-extend-table</h1>

🚀 element-ui样式的schema-based带分页表格模板组件, 内置了部分表单元素组件，并对选中状态和单元格事件的封装进行些许优化, 若无需分页请使用elem-table

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-extend-table
# OR
$ yarn add @onemin-table/elem-extend-table
```

## 用法

::: demo
<template>
  <elem-extend-table
    :data="data"
    :columns="columns"
    :default-sort="{ prop: 'name', order: 'descending' }"
    :pagination-left-slot-render="leftSlot"
    @current-change="handleCurrentChange"
  />
</template>

<script>
  export default {
    data() {
      return {
        data: new Array(100).fill(0).map((e, i) => ({
          index: i,
          name: `name_${Math.random(10)}_${i}`,
        })),
      };
    },

    computed: {
      columns() {
        return [{
          label: '编号',
          prop: 'index',
          filters: [{ text: '98', value: 98 }, { text: '24', value: 24 }],
        }, {
          label: '名称',
          prop: 'name',
          sortable: true,
        }];
      },
    },

    methods: {
      handleCurrentChange(page) {
        console.warn(page);
      },

      leftSlot(h) {
        return h('i', { class: 'el-icon-time' });
      },
    },
  };
</script>

<style>
.elem-pagination {
  display: flex;
}
</style>
:::

## 属性

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| pagination-position | 分页位于表格上方还是下方, 默认值bottom | `top/bottom` |
| pagination-slot-render | 分页layout自定义元素的内容渲染函数, 相当于`el-pagination`的default slot | Function |
| pagination-left-slot-render | 分页左侧内容渲染函数 | Function |
| pagination-right-slot-render | 分页右侧内容渲染函数 | Function |
| pagination-top-slot-render | 分页上方内容渲染函数 | Function |
| pagination-bottom-slot-render | 分页下方内容渲染函数 | Function |
| offline | 翻页不从服务端获取数据, 默认值true | Boolean |