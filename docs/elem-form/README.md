# ElemForm

element-ui样式的schema-based表单模板组件

## 基础使用 - Usage

::: demo
<template>
  <elem-form
    ref="form"
    :query="query"
    :filters="filters"
    label-width="80px"
    show-button
    range-double
    @on-search="handleSearch"
    @on-change="handleChange"
  />
</template>

<script>
  export default {
    data() {
      return {
        query: {
          role: ['cto'], // 选择器(多选)使用默认值
          status: [], // 💡注意: 多选框需要显式声明默认值数组
        },
        // options
        roleList: [],
        departmentList: [],
      };
    },

    computed: {
      filters() {
        return [{
          label: '姓名',
          prop: 'name',
        }, {
          label: '角色',
          prop: 'role',
          type: 'select',
          options: this.roleList,
        }, {
          label: '部门',
          prop: 'department',
          type: 'cascader',
          checkStrictly: true,
          options: this.departmentList,
        }, {
          label: '创建日期',
          prop: 'createTime',
          type: 'datetimerange',
          attrs: {
            valueFormat: 'yyyy-MM-dd',
          },
        }, {
          label: '状态',
          prop: 'status',
          type: 'checkbox',
          options: [{
            label: '启用',
            value: 1,
          }, {
            label: '停用',
            value: 2,
          }],
        }, {
          label: '自定义',
          prop: 'foo',
          render: (h) => (
            <el-tooltip content="跟随role值变化">
              <span>{ this.query.role }</span>
            </el-tooltip>
          ),
        }];
      },
    },

    mounted() {
      this.handleFetchRoleList();
      this.handleFetchDepartmentList();
    },

    methods: {
      handleFetchRoleList() {
        setTimeout(() => {
          this.roleList = [{
            label: 'CEO',
            value: 'ceo',
          }, {
            label: 'CTO',
            value: 'cto',
          }];
        }, 100);
      },

      handleFetchDepartmentList() {
        setTimeout(() => {
          this.departmentList = [{
            label: '研发中心',
            value: 1,
            children: [{
              label: '前端',
              value: 3,
            }, {
              label: '后端',
              value: 4,
            }],
          }, {
            label: '品牌中心',
            value: 2,
          }];
        }, 100);
      },

      handleSearch() {
        this.$refs.form.validate((valid) => {
          console.warn(this.query);
        });
      },

      handleChange(e) {
        console.warn(e);
      },
    },
  };
</script>
:::

## 属性 - Attributes

| 参数        | 说明           | 类型  |  默认值  |
| ------------- |---------------| ------| ------ |
| query(必填)      | 双向绑定的表单数据值, 同时也会被绑定到`el-form`的model属性上。<br /> 💡注意: 表单元素schema中存在`checkbox`类型时, 需要显式声明默认值数组, 具体见上方[基础使用](/elem-form/#基础使用-usage) | Object | - |
| filters(必填) | 表单元素schema, 见下方Filter属性 |  Array | - |
| rowAttrs | [`el-row`的属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      |    Object | { gutter: 24 } |
| loading | 搜索&重置按钮组是否加载中 |  Boolean | false |
| showButton | 是否展示搜索&重置按钮组      |    Boolean | false |
| buttonLayout | 搜索&重置按钮组布局, 三个元素可任选、任意排列 | String | 'reset, search, collapse' |
| searchButtonText | 搜索按钮文本      |    String | '查 询' |
| resetButtonText | 重置按钮文本      |    String | '重 置' |
| collapseButtonText | 收起按钮文本      |    String | '收起' |
| expandButtonText | 展开按钮文本      |    String | '展开' |
| defaultCollapsed | 是否默认收起      |    Boolean | false |
| spanCalcRules | 列数计算间断点规则（根据width = document.body.clientWidth计算）<br /> [x, y, span]: (x, y)为width的范围, span为栅格占据的列数(`el-col`的span属性) |  Array | [[0, 768, 24], <br />[768, 992, 12], [992, 1440, 8], [1440, 2560, 6], [2560, 4800, 4]] |
| buttonGroupItemAttrs | 按钮组的FormItem属性 | Object | { labelWidth: '0px' } |
| rangeDouble | 区间选择器(`dates` / `datetimerange` / `daterange` / `monthrange`)占两倍栅格 | Boolean | false |

其他继承自`el-form`的表单属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)

## 事件 - Events

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| on-change |`query`值改变时触发| { query: Objct, filters: Array } |
| on-search |点击`查询`按钮时触发| - |
| on-reset |点击`重置`按钮时触发| - |
| on-collapse |点击`收起-展开`按钮时触发| `collapsed`: 是否收起 |

## Filter属性 - Attributes

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| prop(必填) |表单元素的标识, 会被映射到表单数据值`query`中| String |
| type |表单元素类型, 不填为默认值`input`, 支持的类型见下方列表| String |
| label |表单元素标签| String |
| visible |表单元素是否可见, 不可见时`query`上绑定的数据值依然存在, 可用于一些默认值请求的场景| Boolean |
| itemAttrs | [`el-form-item`的属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) |  Object |
| attrs |继承自element-ui组件的原有属性, **在此声明的优先级最高**。具体组件属性点击下方列表链接查看| Object |
| listeners |继承自element-ui组件的原有事件| Object |
| options(部分必填) |当表单元素类型为`(级联)选择器`/`(单/多)选框`时需要赋值 | Array<{ label: `string`, value: `any`, disabled?: `boolean`, children?: `Array` }> |
| clearable |表单元素组件存在该属性时可被赋值, 默认值`true`| Boolean |
| filterable |表单元素组件存在该属性时可被赋值, 默认值`true`| Boolean |
| placeholder |表单元素组件存在该属性时可被赋值, 默认值`请输入`/`请选择`| String |
| collapseTags |表单元素组件存在该属性时可被赋值, 默认值`true`| Boolean |
| props |表单元素组件类型为`级联选择器`时可被赋值 | Object |
| render | 自定义组件渲染 | Function |


**表单元素支持的类型(type):**

- [select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes): 选择器(多选), 默认属性: `{ multiple: true, collapseTags: true }`
- [single-select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes): 选择器(单选)
- [cascader](https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes): 级联选择器(多选), 默认属性: `{ props: { multiple: true, collapseTags: true }, }`
- [single-cascader](https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes): 级联选择器(单选)
- [year/month/date/dates/week/datetime/datetimerange/daterange/monthrange](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes): 日期选择器
- [time/timerange](https://element.eleme.cn/#/zh-CN/component/time-picker#attributes): 时间选择器
- [checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes): 多选框组
- [checkbox-button](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes): 按钮样式的多选框组
- [radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes): 单选框组
- [radio-button](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes): 按钮样式的单选框组
- [input(默认)](https://element.eleme.cn/#/zh-CN/component/input#input-attributes): 输入框
- [input-number](https://element.eleme.cn/#/zh-CN/component/input-number#attributes): 计数器
- text: 纯文本

其余element-ui内置的组件类型需要指定render函数来使用

