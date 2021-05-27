<h1 align="center">elem-extend-table</h1>

🚀 schema-based带分页表格模板组件, 内置了部分表单元素组件，并对选中状态和单元格事件的封装进行些许优化, 若无需分页请使用elem-table

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
  <div>
    <elem-input
      v-model="searchText"
      :width="200"
      placeholder="编号/ID"
      lite
    />
    <elem-extend-table
      ref="table"
      :data="data"
      :columns="columns"
      :default-sort="{ prop: 'name', order: 'descending' }"
      :pagination-left-slot-render="leftSlot"
      :summary-method="summaryMethod"
      :query="query"
      @current-change="handleCurrentChange"
    />
    <button @click="handleResetPage">reset</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: new Array(100).fill(0).map((e, i) => ({
          index: i,
          name: `name_${Math.random(10)}_${i}`,
          id: i + 1,
        })),

        searchText: '99',
      };
    },

    computed: {
      query() {
        return {
          id: this.searchText,
          index: this.searchText,
        };
      },

      columns() {
        return [{
          label: '编号',
          prop: 'index',
          filters: [{ text: '98', value: 98 }, { text: '24', value: 24 }],
          type: 'input',
          attrs: {
            type: 'number',
          },
        }, {
          label: '名称',
          prop: 'name',
          sortable: true,
          type: 'input',
          listeners: {
            input: (index) => {
              const ref = this.$refs.table;
              if (ref) {
                ref.setCellAttrs('name', index, {
                  borderColor: 'red',
                });
              }
            },
          },
        }, {
          label: 'ID',
          prop: 'id',
        }];
      },
    },

    methods: {
      handleCurrentChange(page) {
        console.warn(page);
        if (page === 3) {
          const ref = this.$refs.table;
          ref.setCellAttrs('index', 32, {
            borderColor: 'red',
          });
        }
      },

      handleResetPage() {
        const ref = this.$refs.table;
        if (ref) ref.setCurrentPage(1);
      },

      leftSlot(h) {
        return h('i', { class: 'el-icon-time' });
      },

      summaryMethod({ data }) {
        return [data.reduce((a, c) => a + (+c.index), 0)];
      },
    },
  };
</script>

<style>
.ot-pagination--elem {
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
| default-sort | 默认的排序列的 prop 和顺序, 当该列可编辑时不默认排序 | Object |

其他继承自`elem-table`的属性见[elem-table文档](/onemin-table/elem-table/#属性)

## 事件

继承自`elem-table`的事件见[elem-table文档](/onemin-table/elem-table/#事件)

## 方法

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| setCurrentPage | 通过代码1修改当前页数, 仅在`offline`为true时可用 | page |
| setPageSize | 通过代码修改每页显示条目个数, 仅在`offline`为true时可用 | size |

其他继承自`elem-table`的方法见[elem-table文档](/onemin-table/elem-table/#方法)
