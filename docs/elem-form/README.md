# ElemForm

schema-based表单模板组件

## 基础使用 - Usage

::: demo
<template>
  <div>
    <elem-form
      ref="form"
      :query="query"
      :rules="rules"
      :filters="filters"
      :auto-layout="autoLayout"
      label-width="80px"
      label-position="top"
      @on-search="handleSearch"
      @on-change="handleChange"
    />
    <button @click="handleClick">click</button>
    <button @click="autoLayout = !autoLayout">switch</button>
    <button @click="handleSubmit">submit</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          content: [{ text: 'foo' }],
          role: ['cto'],
        },
        // options
        roles: [],
        departments: [],
        autoLayout: true,
      };
    },

    watch: {
      query: {
        handler() {
          console.warn('query', this.query);
        },
        deep: true,
      },
    },

    computed: {
      rules() {
        return {
          // desc: [{ required: true, message: 'xxx' }],
          desc: { required: true, message: 'xxx' },
        };
      },

      filters() {
        return [{
          label: '姓名',
          prop: 'name',
          span: 12,
          required: true,
        }, {
          label: '数量',
          prop: 'count',
          type: 'input-number',
          span: 12,
        }, {
          label: '描述',
          prop: 'desc',
          type: 'autocomplete',
          fetchSuggestions(queryString, cb) {
            cb(new Array(10).fill(0).map((e, i) => ({
              value: `${queryString}_${i}`,
            })));
          },
          span: 8,
        }, {
          label: '文本',
          prop: 'content[0].text',
          type: 'text',
        }, {
          label: '角色',
          prop: 'role',
          type: 'select',
          options: this.roles,
          required: true,
        }, {
          label: '选择',
          prop: 'radio',
          type: 'radio',
          options: [{
            label: 'a',
            value: 1,
          }, {
            label: 'b',
            value: 2,
          }],
          required: true,
        }, {
          label: '区间',
          prop: 'range',
          type: 'input-range',
        }, {
          label: '部门',
          prop: 'department',
          type: 'cascader',
          options: this.departments,
        }, {
          label: '部门2',
          prop: 'department2',
          type: 'single-cascader',
          options: this.departments,
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
            <el-tooltip content="跟随radio值变化">
              <el-switch
                value={this.query.radio}
                active-value={1}
                inactive-value={2}
              />
            </el-tooltip>
          ),
        }];
      },
    },

    mounted() {
      this.fetchRoles();
      this.fetchDepartments();

      setTimeout(() => {
        this.$set(this.query, 'name', 'foo');
      }, 200);
    },

    methods: {
      handleClick() {
        this.query.role = ['ceo'];
      },

      fetchRoles() {
        setTimeout(() => {
          this.roles = [{
            label: 'CEO',
            value: 'ceo',
          }, {
            label: 'CTO',
            value: 'cto',
          }];
        }, 100);
      },

      fetchDepartments() {
        setTimeout(() => {
          this.departments = [{
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

      async handleSubmit() {
        const ref = this.$refs.form;
        if (ref) console.warn(await ref?.validateAsync());
      },
    },
  };
</script>
:::

## 属性 - Attributes

| 参数        | 说明           | 类型  |  默认值  |
| ------------- |---------------| ------| ------ |
| query(必填) | 双向绑定的表单数据值, 同时也会被绑定到`el-form`的model属性上 | Object | - |
| filters(必填) | 表单元素schema, [可用属性](/elem-form/#filter的属性-attributes) | Array | - |
| rowAttrs | [`el-row`的属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes) | Object | { gutter: 24 } |
| required-rule-transform | required选项为true时错误信息格式化文本, `<elem-select>`/`<elem-date-picker>`/`<elem-list-group>`/`<elem-cascader>`为select类型，其余为input类型 | Object | "{ select: (name) => `请选择${name}`, input: (name) => `请输入${name}` }" |
| auto-layout | 根据屏幕宽度(document.body.clientWidth)自动布局 | Boolean | false |
| span-calc-rules | `auto-layout`为true时有效, 列数计算间断点规则: [x, y, span]: (x, y)为width的范围, span为栅格占据的列数(`el-col`的span属性) |  Array | [[0, 768, 24], [768, 992, 12], [992, 1440, 8], [1440, 2560, 6], [2560, 4800, 4]] |
| show-button-group | 是否展示搜索&重置按钮组 | Boolean | false |
| button-layout | 搜索&重置按钮组布局, 三个元素可任选、任意排列, 例如: `['reset', 'search']` | Array | `['search', 'reset', 'collapse']` |
| loading | 搜索&重置按钮组是否加载中 |  Boolean | false |
| search-button-text | 搜索按钮文本 | String | '查 询' |
| reset-button-text | 重置按钮文本 | String | '重 置' |
| collapse-button-text | 收起按钮文本 | String | '收起' |
| expand-button-text | 展开按钮文本 | String | '展开' |
| default-collapsed | 是否默认收起 | Boolean | false |

其他继承自`el-form`的表单属性见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)

## 事件 - Events

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| on-change |`query`值改变时触发| { query: Objct, filters: Array } |
| on-search |点击`查询`按钮时触发| - |
| on-reset |点击`重置`按钮时触发| - |
| on-collapse |点击`收起-展开`按钮时触发| `collapsed`: 是否收起 |

## 方法 - Methods

| 参数        | 说明           | 参数  |
| ------------- |---------------| ------|
| validateAsync | 对整个表单进行校验, 返回一个Promise<{ valid: boolean, invalidFields: Record<string, Array> }> | - |

其他继承自`el-form`的方法见[element-ui文档](https://element.eleme.cn/#/zh-CN/component/form#form-methods)

## Filter的属性 - Attributes

| 参数        | 说明           | 类型  |
| ------------- |---------------| ------|
| prop(必填) | 表单元素的标识, 会被映射到表单数据值`query`中 | String |
| type | 表单元素类型, 默认值`input`, 支持的类型见下方列表 | String |
| label | 表单元素标签 | String |
| labelSlotRender | 表单元素标签文本的内容渲染函数 | Function |
| visible | 表单元素是否可见, 不可见时`query`上绑定的数据值依然存在 | Boolean |
| attrs |继承自表单元素组件的prop属性, 具体组件属性见下方列表 | Object |
| options/... | `options`等表单元素组件的prop属性, 优先级低于attrs中声明的属性 | - |
| label-width/... | `label-width`等[`<el-form-item>`的属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes), 支持同时支持和中划线写法(kebab case)和小驼峰(camel case)写法 | - |
| span/... | `span`等[`<el-col>`的属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) | - |
| listeners | 表单元素组件的事件 | Object |
| render | 自定义渲染函数 | Function |


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

