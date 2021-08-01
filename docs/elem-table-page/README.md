<h1 align="center">elem-table-page</h1>

🚀 schema-based组合表单和表格并封装请求的模板组件

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
      :request-config="requestConfig"
      :filters="filters"
      :parse-request-path="false"
      :button-layout="buttonLayout"
      :immediate="false"
      :custom-render="customRender"
      data-key="data"
      total-key="meta.count"
      page-key="page[offset]"
      page-size-key="page[limit]"
      url="https://kitsu.io/api/edge/anime"
      show-button-group
      layout="total, sizes, ->, prev, pager, next, jumper"
      @sort-change="sortChange"
    >
      <section>
        <button @click="customRender = null">sku</button>
        <button @click="customRender = CUSTOM_RENDER">spu</button>
      </section>
    </elem-table-page>
    <button @click="handleResetPage">reset</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [],
        filters: [],
        customRender: null,
      };
    },

    computed: {
      buttonLayout() {
        return [
          () => <span onClick={this.handleFooClick}>foo</span>,
          'reset',
          'search',
          'collapse',
        ];
      },

      requestConfig() {
        return {
          params: {
            foo: 1,
          },
        };
      },
    },

    mounted() {
      const ref = this.$refs.table;
      if (ref) ref.loading = true;

      setTimeout(() => {
        this.filters = [{
          label: '单号查询',
          prop: 'order',
          defaultValue: ['kkk'],
          type: 'input-range',
        }, {
          label: 'foo',
          prop: 'foo',
        }, {
          label: 'bar',
          prop: 'bar',
        }, {
          label: 'baz',
          prop: 'baz',
        }];
      }, 1e3);

      this.columns = [{
        label: 'id',
        prop: 'id',
        sortable: 'custom',
        fixed: true,
      }, {
        label: '名称',
        prop: 'attributes.titles.en_jp',
        minWidth: 160,
        fixed: true,
      }, {
        label: '封面',
        prop: 'attributes.posterImage.small',
        type: 'image',
      }, {
        label: '上映日期',
        prop: 'onDate',
        minWidth: 200,
        render: (h, { row }) => (
          <span>{`${row?.attributes?.startDate || ''}~${row?.attributes?.endDate || ''}`}</span>
        ),
      }, {
        label: '集数',
        prop: 'attributes.episodeCount',
      }, {
        label: '单集长度',
        prop: 'attributes.episodeLength',
      }, {
        label: '平均分',
        prop: 'attributes.averageRating',
        fixed: 'right',
      }];
    },

    methods: {
      CUSTOM_RENDER(h, bindData, listeners) {
        return (
          <div>
            <section
              {...{ directives: [{ name: 'loading', value: bindData.loading }] }}
              style="margin: -12px;">
              {
                bindData.data.map((e) => (
                  <div
                    class="card"
                    key={e.id}>{ e?.attributes?.titles?.en_jp || '' }</div>
                ))
              }
            </section>

            <el-pagination
              props={bindData}
              on={listeners}
            />
          </div>
        );
      },

      handleFooClick() {
        this.filters.splice(0, 1);
        console.error(this.filters);
      },

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

      onError(err) { console.warn(err); },

      sortChange(e) {
        console.error(e);
      },
    },
  };
</script>

<style>
.ot-pagination--elem {
  display: flex;
}

.card {
  width: 254px;
  height: 100px;
  display: inline-block;
  border: 1px solid #F7F9FC;
  margin: 12px;
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
| transformer | 响应列表数据处理函数 | Function |
| pagination-position | 分页位于表格上方还是下方, 默认值bottom | `top/bottom` |
| pagination-slot-render | 分页layout自定义元素的内容渲染函数, 相当于`el-pagination`的default slot | Function |
| pagination-left-slot-render | 分页左侧内容渲染函数 | Function |
| pagination-right-slot-render | 分页右侧内容渲染函数 | Function |
| pagination-top-slot-render | 分页上方内容渲染函数 | Function |
| pagination-bottom-slot-render | 分页下方内容渲染函数 | Function |
| default-sort | 默认的排序列的 prop 和顺序, 当该列可编辑时不默认排序 | Object |
| filters | 表单元素schema | Array |
| showButtonGroup | 是否展示搜索&重置按钮组, 值为false时表单元素数据变化后会重新请求, 默认值false | Boolean |
| inputDebounce | showButtonGroup为false时生效, 输入值改变后触发请求的间隔(ms), 默认值300 | Number |

其他继承自`elem-table`的属性见[elem-table文档](/onemin-table/elem-table/#属性)

## 事件

继承自`elem-table`的事件见[elem-table文档](/onemin-table/elem-table/#事件)

## 方法

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| setCurrentPage | 通过代码修改当前页数 | page |
| setPageSize | 通过代码修改每页显示条目个数 | size |

其他继承自`elem-table`的方法见[elem-table文档](/onemin-table/elem-table/#方法)
