(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{552:function(e,t,o){},578:function(e,t,o){"use strict";o(552)},591:function(e,t,o){"use strict";o.r(t);o(122);var r={data:function(){return{foo:[1],group:!0,groupOptions:[],loading:!1}},computed:{options:function(){return[{label:"a",value:1},{label:"b",value:2},{label:"c",value:3}]}},mounted:function(){var e=this.$refs.select;e&&e.focus(),this.fetchGroupOptions()},methods:{fetchGroupOptions:function(){var e=this;this.loading=!0,setTimeout((function(){var t=e.$refs.select;t&&t.blur(),e.groupOptions=[{label:"分组1",children:e.options},{label:"分组2",children:[{label:"d",value:4,disabled:!0}]}],e.loading=!1}),2e3)},handleChange:function(e){console.warn(this.foo,e)},prefixSlotRender:function(e){return e("i",{class:"el-icon-time el-input__icon"})},popoverSlotRender:function(){var e=this.$createElement;return e("div",[e("i",{style:"color: #F46A6A;margin-right: 10px;",class:"el-icon-error"}),"错误"])}}},n=(o(578),o(62)),v=Object(n.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{align:"center"}},[e._v("elem-select")]),e._v(" "),o("p",[e._v("🚀 element-ui样式的schema-based选择器模板组件, 集成"),o("code",[e._v("el-popover")]),e._v("组件，实现关注点集中的反馈模式.")]),e._v(" "),o("h2",{attrs:{id:"安装"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[e._v("#")]),e._v(" 安装")]),e._v(" "),o("ul",[o("li",[o("p",[e._v("首先安装 "),o("a",{attrs:{href:"https://github.com/ElemeFE/element",target:"_blank",rel:"noopener noreferrer"}},[e._v("Element v2.x"),o("OutboundLink")],1)])]),e._v(" "),o("li",[o("p",[e._v("接着安装组件")])])]),e._v(" "),o("div",{staticClass:"language-bash extra-class"},[o("pre",{pre:!0,attrs:{class:"language-bash"}},[o("code",[e._v("$ "),o("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" i @onemin-table/elem-select\n"),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# OR")]),e._v("\n$ "),o("span",{pre:!0,attrs:{class:"token function"}},[e._v("yarn")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" @onemin-table/elem-select\n")])])]),o("h2",{attrs:{id:"用法"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[e._v("#")]),e._v(" 用法")]),e._v(" "),o("Previewer",{attrs:{scope:!1,code:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3Cbutton%20%40click%3D%22group%20%3D%20!group%22%3E%E5%88%87%E6%8D%A2%3C%2Fbutton%3E%0A%20%20%20%20%3Cspan%3E%7B%7B%20!group%20%3F%20'%E5%8D%95%E9%80%89'%20%3A%20'%E5%88%86%E7%BB%84'%20%7D%7D%3C%2Fspan%3E%0A%20%20%20%20%3Celem-select%0A%20%20%20%20%20%20ref%3D%22select%22%0A%20%20%20%20%20%20v-model%3D%22foo%22%0A%20%20%20%20%20%20%3ApopoverVisible%3D%22!group%22%0A%20%20%20%20%20%20%3Aoptions%3D%22group%20%3F%20groupOptions%20%3A%20options%22%0A%20%20%20%20%20%20%3Aprefix-slot-render%3D%22prefixSlotRender%22%0A%20%20%20%20%20%20%3Aborder-color%3D%22group%20%3F%20''%20%3A%20'red'%22%0A%20%20%20%20%20%20%3Awidth%3D%22300%22%0A%20%20%20%20%20%20%3Apopover-slot-render%3D%22popoverSlotRender%22%0A%20%20%20%20%20%20%3Aloading%3D%22loading%22%0A%20%20%20%20%20%20multiple%0A%20%20%20%20%20%20%40change%3D%22handleChange%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%3E%0A%20%20export%20default%20%7B%0A%20%20%20%20data()%20%7B%0A%20%20%20%20%20%20return%20%7B%0A%20%20%20%20%20%20%20%20foo%3A%20%5B1%5D%2C%0A%0A%20%20%20%20%20%20%20%20group%3A%20true%2C%0A%20%20%20%20%20%20%20%20groupOptions%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20loading%3A%20false%2C%0A%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20computed%3A%20%7B%0A%20%20%20%20%20%20options()%20%7B%0A%20%20%20%20%20%20%20%20return%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'a'%2C%0A%20%20%20%20%20%20%20%20%20%20value%3A%201%2C%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'b'%2C%0A%20%20%20%20%20%20%20%20%20%20value%3A%202%2C%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20'c'%2C%0A%20%20%20%20%20%20%20%20%20%20value%3A%203%2C%0A%20%20%20%20%20%20%20%20%7D%5D%3B%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20mounted()%20%7B%0A%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.select%3B%0A%20%20%20%20%20%20if%20(ref)%20ref.focus()%3B%0A%20%20%20%20%20%20this.fetchGroupOptions()%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20methods%3A%20%7B%0A%20%20%20%20%20%20fetchGroupOptions()%20%7B%0A%20%20%20%20%20%20%20%20this.loading%20%3D%20true%3B%0A%20%20%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.select%3B%0A%20%20%20%20%20%20%20%20%20%20if%20(ref)%20ref.blur()%3B%0A%20%20%20%20%20%20%20%20%20%20this.groupOptions%20%3D%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%88%86%E7%BB%841'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20children%3A%20this.options%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'%E5%88%86%E7%BB%842'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20children%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20label%3A%20'd'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3A%204%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20disabled%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%5D%3B%0A%20%20%20%20%20%20%20%20%20%20this.loading%20%3D%20false%3B%0A%20%20%20%20%20%20%20%20%7D%2C%202e3)%3B%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20handleChange(val)%20%7B%0A%20%20%20%20%20%20%20%20console.warn(this.foo%2C%20val)%3B%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20prefixSlotRender(h)%20%7B%0A%20%20%20%20%20%20%20%20return%20%3Ci%20class%3D%22el-icon-time%20el-input__icon%22%20%2F%3E%3B%0A%20%20%20%20%20%20%7D%2C%0A%0A%20%20%20%20%20%20popoverSlotRender()%20%7B%0A%20%20%20%20%20%20%20%20return%20(%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ci%20style%3D%22color%3A%20%23F46A6A%3Bmargin-right%3A%2010px%3B%22%20class%3D%22el-icon-error%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%E9%94%99%E8%AF%AF%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%3B%0A%3C%2Fscript%3E%0A%0A%3Cstyle%3E%0A%20%20.ot-select__popover--elem%20%7B%0A%20%20%20%20padding%3A%2016px%3B%0A%20%20%7D%0A%0A%20%20.el-select-dropdown__loading%20%7B%0A%20%20%20%20color%3A%20%23000%3B%0A%20%20%7D%0A%3C%2Fstyle%3E%0A"}},[o("template",{slot:"demo"},[[o("div",[o("button",{on:{click:function(t){e.group=!e.group}}},[e._v("切换")]),e._v(" "),o("span",[e._v(e._s(e.group?"分组":"单选"))]),e._v(" "),o("elem-select",{ref:"select",attrs:{popoverVisible:!e.group,options:e.group?e.groupOptions:e.options,"prefix-slot-render":e.prefixSlotRender,"border-color":e.group?"":"red",width:300,"popover-slot-render":e.popoverSlotRender,loading:e.loading,multiple:""},on:{change:e.handleChange},model:{value:e.foo,callback:function(t){e.foo=t},expression:"foo"}})],1)]],2)],2),e._v(" "),o("h2",{attrs:{id:"属性"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[e._v("#")]),e._v(" 属性")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("参数")]),e._v(" "),o("th",[e._v("说明")]),e._v(" "),o("th",[e._v("类型")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[e._v("options(必填)")]),e._v(" "),o("td",[e._v("选择器下拉列表数据, 含有children的列表自动分组展示")]),e._v(" "),o("td",[e._v("Array<{ label: string, value?: any, disabled?: boolean, children?: Array, optionSlotRender?: function }>")])]),e._v(" "),o("tr",[o("td",[e._v("prefix-slot-render")]),e._v(" "),o("td",[e._v("选择器头部内容渲染函数, 相当于"),o("code",[e._v("el-select")]),e._v("的prefix slot")]),e._v(" "),o("td",[e._v("Function")])]),e._v(" "),o("tr",[o("td",[e._v("empty-slot-render")]),e._v(" "),o("td",[e._v("选择器无选项时列表渲染函数, 相当于"),o("code",[e._v("el-select")]),e._v("的empty slot")]),e._v(" "),o("td",[e._v("Function")])]),e._v(" "),o("tr",[o("td",[e._v("option-slot-render")]),e._v(" "),o("td",[e._v("选择器列表自定义备选项渲染函数, 相当于"),o("code",[e._v("el-option")]),e._v("的default slot, 参数为传入的options中的行")]),e._v(" "),o("td",[e._v("Function")])]),e._v(" "),o("tr",[o("td",[e._v("loading")]),e._v(" "),o("td",[e._v("选择器是否加载中")]),e._v(" "),o("td",[e._v("Boolean")])]),e._v(" "),o("tr",[o("td",[e._v("loading-text")]),e._v(" "),o("td",[e._v("选择器选项加载中列表提示文字")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("loading-slot-render")]),e._v(" "),o("td",[e._v("选择器选项加载中列表内容渲染函数, 优先级高于"),o("code",[e._v("loading-text")])]),e._v(" "),o("td",[e._v("Function")])]),e._v(" "),o("tr",[o("td",[e._v("data-prop")]),e._v(" "),o("td",[e._v("元素标识，会被绑定到DOM元素的"),o("code",[e._v("data-prop")]),e._v("属性上, 默认为空")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("width")]),e._v(" "),o("td",[e._v("选择器宽度, 传入数字会被识别为像素值(px)")]),e._v(" "),o("td",[o("code",[e._v("String|Number")])])]),e._v(" "),o("tr",[o("td",[e._v("border-color")]),e._v(" "),o("td",[e._v("选择器边框颜色, 可用于校验不通过的提示，设为空字符串可还原")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("background-color")]),e._v(" "),o("td",[e._v("选择器背景颜色, 可用于校验不通过的提示，设为空字符串可还原")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("color")]),e._v(" "),o("td",[e._v("选择器字体颜色, 可用于校验不通过的提示，设为空字符串可还原")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("popover-visible")]),e._v(" "),o("td",[o("code",[e._v("<el-popover>")]),e._v("弹出框是否显示")]),e._v(" "),o("td",[e._v("Boolean")])]),e._v(" "),o("tr",[o("td",[e._v("popover-content")]),e._v(" "),o("td",[o("code",[e._v("<el-popover>")]),e._v("弹出框内容")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("popover-attrs")]),e._v(" "),o("td",[o("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/popover#attributes",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("<el-popover>")]),e._v("的属性"),o("OutboundLink")],1)]),e._v(" "),o("td",[e._v("Object")])]),e._v(" "),o("tr",[o("td",[e._v("popover-listeners")]),e._v(" "),o("td",[o("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/popover#events",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("<el-popover>")]),e._v("的事件"),o("OutboundLink")],1)]),e._v(" "),o("td",[e._v("Object")])]),e._v(" "),o("tr",[o("td",[e._v("popover-slot-render")]),e._v(" "),o("td",[e._v("弹出框渲染函数, 相当于"),o("code",[e._v("el-popover")]),e._v("的default slot")]),e._v(" "),o("td",[e._v("Function")])]),e._v(" "),o("tr",[o("td",[e._v("scroll-wrapper")]),e._v(" "),o("td",[e._v("滚动容器选择器, 用于解决"),o("code",[e._v("<el-popover>")]),e._v("不随目标元素滚动的问题, 滚动元素为window时传'window'字符串, 默认值空")]),e._v(" "),o("td",[e._v("String")])]),e._v(" "),o("tr",[o("td",[e._v("scroll-debounce")]),e._v(" "),o("td",[e._v("滚动容器滚动时更新"),o("code",[e._v("<el-popover>")]),e._v("的位置信息的延迟毫秒数, 仅当"),o("code",[e._v("scroll-wrapper")]),e._v("不为空时生效, 默认值0")]),e._v(" "),o("td",[e._v("Number")])]),e._v(" "),o("tr",[o("td",[e._v("duration")]),e._v(" "),o("td",[e._v("popover显示时间, 毫秒。设为 0 则不会自动关闭")]),e._v(" "),o("td",[e._v("Number")])])])]),e._v(" "),o("p",[e._v("其他继承自"),o("code",[e._v("el-select")]),e._v("的属性见"),o("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/select#select-attributes",target:"_blank",rel:"noopener noreferrer"}},[e._v("element-ui文档"),o("OutboundLink")],1)]),e._v(" "),o("h2",{attrs:{id:"事件"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[e._v("#")]),e._v(" 事件")]),e._v(" "),o("p",[e._v("继承自"),o("code",[e._v("el-select")]),e._v("的事件见"),o("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/select#select-events",target:"_blank",rel:"noopener noreferrer"}},[e._v("element-ui文档"),o("OutboundLink")],1)]),e._v(" "),o("h2",{attrs:{id:"方法"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[e._v("#")]),e._v(" 方法")]),e._v(" "),o("p",[e._v("继承自"),o("code",[e._v("el-select")]),e._v("的方法见"),o("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/select#methods",target:"_blank",rel:"noopener noreferrer"}},[e._v("element-ui文档"),o("OutboundLink")],1)])],1)}),[],!1,null,null,null);t.default=v.exports}}]);