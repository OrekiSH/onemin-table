(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{534:function(t,e,a){var n=a(1),r=a(535),l=a(123);n({target:"Array",proto:!0},{fill:r}),l("fill")},535:function(t,e,a){"use strict";var n=a(23),r=a(124),l=a(17);t.exports=function(t){for(var e=n(this),a=l(e.length),o=arguments.length,s=r(o>1?arguments[1]:void 0,a),v=o>2?arguments[2]:void 0,d=void 0===v?a:r(v,a);d>s;)e[s++]=t;return e}},553:function(t,e,a){},579:function(t,e,a){"use strict";a(553)},592:function(t,e,a){"use strict";a.r(e);a(52),a(534),a(18),a(127);var n={data:function(){return{data:new Array(100).fill(0).map((function(t,e){return{index:0,name:"name_".concat(Math.random(10),"_").concat(e)}}))}},computed:{columns:function(){var t=this;return[{label:"编号",prop:"index",filters:[{text:"98",value:98},{text:"24",value:24}],type:"input",attrs:{type:"number"}},{label:"名称",prop:"name",sortable:!0,type:"input",listeners:{input:function(e){var a=t.$refs.table;a&&a.setCellAttrs("name",e,{borderColor:"red"})}}}]}},methods:{handleCurrentChange:function(t){(console.warn(t),3===t)&&this.$refs.table.setCellAttrs("index",32,{borderColor:"red"})},handleResetPage:function(){var t=this.$refs.table;t&&t.setCurrentPage(1)},leftSlot:function(t){return t("i",{class:"el-icon-time"})},summaryMethod:function(t){return[t.data.reduce((function(t,e){return t+ +e.index}),0)]}}},r=(a(579),a(62)),l=Object(r.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{align:"center"}},[t._v("elem-extend-table")]),t._v(" "),a("p",[t._v("🚀 element-ui样式的schema-based带分页表格模板组件, 内置了部分表单元素组件，并对选中状态和单元格事件的封装进行些许优化, 若无需分页请使用elem-table")]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("首先安装 "),a("a",{attrs:{href:"https://github.com/ElemeFE/element",target:"_blank",rel:"noopener noreferrer"}},[t._v("Element v2.x"),a("OutboundLink")],1)])]),t._v(" "),a("li",[a("p",[t._v("接着安装组件")])])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i @onemin-table/elem-extend-table\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# OR")]),t._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @onemin-table/elem-extend-table\n")])])]),a("h2",{attrs:{id:"用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[t._v("#")]),t._v(" 用法")]),t._v(" "),a("Previewer",{attrs:{scope:!1,code:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3Celem-extend-table%0A%20%20%20%20%20%20ref%3D%22table%22%0A%20%20%20%20%20%20%3Adata%3D%22data%22%0A%20%20%20%20%20%20%3Acolumns%3D%22columns%22%0A%20%20%20%20%20%20%3Adefault-sort%3D%22%7B%20prop%3A%20'name'%2C%20order%3A%20'descending'%20%7D%22%0A%20%20%20%20%20%20%3Apagination-left-slot-render%3D%22leftSlot%22%0A%20%20%20%20%20%20%3Asummary-method%3D%22summaryMethod%22%0A%20%20%20%20%20%20%40current-change%3D%22handleCurrentChange%22%0A%20%20%20%20%2F%3E%0A%20%20%20%20%3Cbutton%20%40click%3D%22handleResetPage%22%3Ereset%3C%2Fbutton%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%3E%0A%20%20export%20default%20%7B%0A%20%20%20%20data()%20%7B%0A%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20new%20Array(100).fill(0).map((e%2C%20i)%20%3D%3E%20(%7B%0A%20%20%20%20%20%20%20%20%20%20index%3A%200%2C%0A%20%20%20%20%20%20%20%20%20%20name%3A%20%60name_%24%7BMath.random(10)%7D_%24%7Bi%7D%60%2C%0A%20%20%20%20%20%20%20%20%7D))%2C%0A%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20computed%3A%20%7B%0A%20%20%20%20%20%20columns()%20%7B%0A%20%20%20%20%20%20%20%20return%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E7%BC%96%E5%8F%B7'%2C%0A%20%20%20%20%20%20%20%20%20%20prop%3A%20'index'%2C%0A%20%20%20%20%20%20%20%20%20%20filters%3A%20%5B%7B%20text%3A%20'98'%2C%20value%3A%2098%20%7D%2C%20%7B%20text%3A%20'24'%2C%20value%3A%2024%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20%20%20%20%20attrs%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20type%3A%20'number'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%90%8D%E7%A7%B0'%2C%0A%20%20%20%20%20%20%20%20%20%20prop%3A%20'name'%2C%0A%20%20%20%20%20%20%20%20%20%20sortable%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20type%3A%20'input'%2C%0A%20%20%20%20%20%20%20%20%20%20listeners%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20input%3A%20(index)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.table%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(ref)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20ref.setCellAttrs('name'%2C%20index%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20borderColor%3A%20'red'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%5D%3B%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20methods%3A%20%7B%0A%20%20%20%20%20%20handleCurrentChange(page)%20%7B%0A%20%20%20%20%20%20%20%20console.warn(page)%3B%0A%20%20%20%20%20%20%20%20if%20(page%20%3D%3D%3D%203)%20%7B%0A%20%20%20%20%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.table%3B%0A%20%20%20%20%20%20%20%20%20%20ref.setCellAttrs('index'%2C%2032%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20borderColor%3A%20'red'%2C%0A%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20handleResetPage()%20%7B%0A%20%20%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.table%3B%0A%20%20%20%20%20%20%20%20if%20(ref)%20ref.setCurrentPage(1)%3B%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20leftSlot(h)%20%7B%0A%20%20%20%20%20%20%20%20return%20h('i'%2C%20%7B%20class%3A%20'el-icon-time'%20%7D)%3B%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20summaryMethod(%7B%20data%20%7D)%20%7B%0A%20%20%20%20%20%20%20%20return%20%5Bdata.reduce((a%2C%20c)%20%3D%3E%20a%20%2B%20(%2Bc.index)%2C%200)%5D%3B%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%3B%0A%3C%2Fscript%3E%0A%0A%3Cstyle%3E%0A.ot-pagination--elem%20%7B%0A%20%20display%3A%20flex%3B%0A%7D%0A%3C%2Fstyle%3E%0A"}},[a("template",{slot:"demo"},[[a("div",[a("elem-extend-table",{ref:"table",attrs:{data:t.data,columns:t.columns,"default-sort":{prop:"name",order:"descending"},"pagination-left-slot-render":t.leftSlot,"summary-method":t.summaryMethod},on:{"current-change":t.handleCurrentChange}}),t._v(" "),a("button",{on:{click:t.handleResetPage}},[t._v("reset")])],1)]],2)],2),t._v(" "),a("h2",{attrs:{id:"属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数")]),t._v(" "),a("th",[t._v("说明")]),t._v(" "),a("th",[t._v("类型")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("pagination-position")]),t._v(" "),a("td",[t._v("分页位于表格上方还是下方, 默认值bottom")]),t._v(" "),a("td",[a("code",[t._v("top/bottom")])])]),t._v(" "),a("tr",[a("td",[t._v("pagination-slot-render")]),t._v(" "),a("td",[t._v("分页layout自定义元素的内容渲染函数, 相当于"),a("code",[t._v("el-pagination")]),t._v("的default slot")]),t._v(" "),a("td",[t._v("Function")])]),t._v(" "),a("tr",[a("td",[t._v("pagination-left-slot-render")]),t._v(" "),a("td",[t._v("分页左侧内容渲染函数")]),t._v(" "),a("td",[t._v("Function")])]),t._v(" "),a("tr",[a("td",[t._v("pagination-right-slot-render")]),t._v(" "),a("td",[t._v("分页右侧内容渲染函数")]),t._v(" "),a("td",[t._v("Function")])]),t._v(" "),a("tr",[a("td",[t._v("pagination-top-slot-render")]),t._v(" "),a("td",[t._v("分页上方内容渲染函数")]),t._v(" "),a("td",[t._v("Function")])]),t._v(" "),a("tr",[a("td",[t._v("pagination-bottom-slot-render")]),t._v(" "),a("td",[t._v("分页下方内容渲染函数")]),t._v(" "),a("td",[t._v("Function")])]),t._v(" "),a("tr",[a("td",[t._v("offline")]),t._v(" "),a("td",[t._v("翻页不从服务端获取数据, 默认值true")]),t._v(" "),a("td",[t._v("Boolean")])]),t._v(" "),a("tr",[a("td",[t._v("default-sort")]),t._v(" "),a("td",[t._v("默认的排序列的 prop 和顺序, 当该列可编辑时不默认排序")]),t._v(" "),a("td",[t._v("Object")])])])]),t._v(" "),a("p",[t._v("其他继承自"),a("code",[t._v("elem-table")]),t._v("的属性见"),a("RouterLink",{attrs:{to:"/onemin-table/elem-table/#属性"}},[t._v("elem-table文档")])],1),t._v(" "),a("h2",{attrs:{id:"事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),a("p",[t._v("继承自"),a("code",[t._v("elem-table")]),t._v("的事件见"),a("RouterLink",{attrs:{to:"/onemin-table/elem-table/#事件"}},[t._v("elem-table文档")])],1),t._v(" "),a("h2",{attrs:{id:"方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("参数")]),t._v(" "),a("th",[t._v("说明")]),t._v(" "),a("th",[t._v("参数")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("setCurrentPage")]),t._v(" "),a("td",[t._v("通过代码1修改当前页数, 仅在"),a("code",[t._v("offline")]),t._v("为true时可用")]),t._v(" "),a("td",[t._v("page")])]),t._v(" "),a("tr",[a("td",[t._v("setPageSize")]),t._v(" "),a("td",[t._v("通过代码修改每页显示条目个数, 仅在"),a("code",[t._v("offline")]),t._v("为true时可用")]),t._v(" "),a("td",[t._v("size")])])])]),t._v(" "),a("p",[t._v("其他继承自"),a("code",[t._v("elem-table")]),t._v("的方法见"),a("RouterLink",{attrs:{to:"/onemin-table/elem-table/#方法"}},[t._v("elem-table文档")])],1)],1)}),[],!1,null,null,null);e.default=l.exports}}]);