<h1 align="center">elem-table-page</h1>

🚀 element-ui样式的schema-based组合表单和表格并封装请求的模板组件

## 安装

* 首先安装 [Element v2.x](https://github.com/ElemeFE/element)

* 接着安装组件

```bash
$ npm i @onemin-table/elem-table-page
# OR
$ yarn add @onemin-table/elem-table-page
```

## 用法

::: demo
<template>
  <div>
    <elem-table-page
      ref="table"
      :columns="columns"
      :current-page="0"
      :pagination-left-slot-render="leftSlot"
      :on-response="onResponse"
      :on-error="onError"
      data-key="programs"
      total-key="count"
      page-key="offset"
      page-size-key="limit"
      url="https://musicapi.leanapp.cn/dj/program?rid=336355127"
    />
    <button @click="handleResetPage">reset</button>
  </div>
</template>

<script>
  export default {
    computed: {
      columns() {
        return [{
          label: '名称',
          prop: 'mainSong.name',
        }, {
          label: '头像',
          prop: 'mainSong.artists[0].picUrl',
          type: 'image',
        }];
      },
    },

    methods: {
      handleResetPage() {
        const ref = this.$refs.table;
        if (ref) ref.setCurrentPage(0);
      },

      leftSlot(h) {
        return h('i', { class: 'el-icon-time' });
      },

      onResponse(err, response) {
        console.warn(err, response);
      },

      onError(err) { console.warn(err); }
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
| url(必填) | 提交给后端的请求地址 | String |
| total-key(必填) | 解析后端返回列表数据的总数, 支持使用"."或者`[0]`解析嵌套值 | String |
| data-key(必填) | 解析后端返回列表数据, 支持使用"."或者`[0]`解析嵌套值 | String |
| page-key(必填) | 提交给后端的当前页值, 支持使用"."或者`[0]`解析嵌套值 | String |
| page-size-key(必填) | 提交给后端的当前分页大小值, 支持使用"."或者`[0]`解析嵌套值 | String |
| request-config | axios请求配置, 具体见[axios文档](https://axios-http.com/docs/req_config) | AxiosRequestConfig |
| on-request | axios请求拦截器, 接收两个参数：请求错误与请求配置, 不存在请求错误时第一个参数为null | Function(error, config) |
| on-response | axios响应拦截器, 接收两个参数：响应错误与响应, 不存在响应错误时第一个参数为null | Function(error, response) |
| on-error | 请求过程中出现错误时的回调函数, 接收拦截到的错误对象 | Function |
| pagination-position | 分页位于表格上方还是下方, 默认值bottom | `top/bottom` |
| pagination-slot-render | 分页layout自定义元素的内容渲染函数, 相当于`el-pagination`的default slot | Function |
| pagination-left-slot-render | 分页左侧内容渲染函数 | Function |
| pagination-right-slot-render | 分页右侧内容渲染函数 | Function |
| pagination-top-slot-render | 分页上方内容渲染函数 | Function |
| pagination-bottom-slot-render | 分页下方内容渲染函数 | Function |
| default-sort | 默认的排序列的 prop 和顺序, 当该列可编辑时不默认排序 | Object |

其他继承自`elem-table`的属性见[elem-table文档](/onemin-table/elem-table/#属性)

## 事件

继承自`elem-table`的事件见[elem-table文档](/onemin-table/elem-table/#事件)

## 方法

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| setCurrentPage | 通过代码修改当前页数 | page |
| setPageSize | 通过代码修改每页显示条目个数 | size |

其他继承自`elem-table`的方法见[elem-table文档](/onemin-table/elem-table/#方法)
