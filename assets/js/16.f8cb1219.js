(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{604:function(t,e,v){"use strict";v.r(e);v(123);var r={data:function(){return{foo:[],active:!0}},mounted:function(){var t=this.$refs.input;t&&(t.focusStart(),setTimeout((function(){t.blur()}),3e3))},methods:{rangeSeparatorSlotRender:function(){return(0,this.$createElement)("i",{class:"el-icon-time"})},handleClear:function(){var t=this.$refs.input;t&&t.clear()},onChange:function(){for(var t=arguments.length,e=new Array(t),v=0;v<t;v++)e[v]=arguments[v];console.warn(e)}}},_=v(64),o=Object(_.a)(r,(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{align:"center"}},[t._v("elem-input-number")]),t._v(" "),v("p",[t._v("🚀 schema-based区间输入模板组件, 集成"),v("code",[t._v("el-popover")]),t._v("组件，实现关注点集中的反馈模式.")]),t._v(" "),v("h2",{attrs:{id:"安装"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("首先安装 "),v("a",{attrs:{href:"https://github.com/ElemeFE/element",target:"_blank",rel:"noopener noreferrer"}},[t._v("Element v2.x"),v("OutboundLink")],1)])]),t._v(" "),v("li",[v("p",[t._v("接着安装组件")])])]),t._v(" "),v("div",{staticClass:"language-bash extra-class"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[t._v("$ "),v("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i @onemin-table/elem-input-range\n"),v("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# OR")]),t._v("\n$ "),v("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @onemin-table/elem-input-range\n")])])]),v("h2",{attrs:{id:"用法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[t._v("#")]),t._v(" 用法")]),t._v(" "),v("Previewer",{attrs:{scope:!1,code:"%3Ctemplate%3E%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3Cbutton%20%40click%3D%22active%20%3D%20!active%22%3E%E5%88%87%E6%8D%A2%3C%2Fbutton%3E%0A%20%20%20%20%3Cbutton%20%40click%3D%22handleClear%22%3E%E6%B8%85%E7%A9%BA%3C%2Fbutton%3E%0A%20%20%20%20%3Celem-input-range%0A%20%20%20%20%20%20ref%3D%22input%22%0A%20%20%20%20%20%20v-model%3D%22foo%22%0A%20%20%20%20%20%20%3Aborder-color%3D%22active%20%3F%20'red'%20%3A%20''%22%0A%20%20%20%20%20%20%3Apopover-visible%3D%22active%22%0A%20%20%20%20%20%20popover-content%3D%22%E5%86%85%E5%AE%B9%22%0A%20%20%20%20%20%20type%3D%22number%22%0A%20%20%20%20%20%20%3Arange-separator-slot-render%3D%22rangeSeparatorSlotRender%22%0A%20%20%20%20%20%20%40change%3D%22onChange%22%0A%20%20%20%20%2F%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%3E%0Aexport%20default%20%7B%0A%20%20data()%20%7B%0A%20%20%20%20return%20%7B%0A%20%20%20%20%20%20foo%3A%20%5B%5D%2C%0A%20%20%20%20%20%20active%3A%20true%2C%0A%20%20%20%20%7D%3B%0A%20%20%7D%2C%0A%0A%20%20mounted()%20%7B%0A%20%20%20%20const%20ref%20%3D%20this.%24refs.input%3B%0A%20%20%20%20if%20(ref)%20%7B%0A%20%20%20%20%20%20ref.focusStart()%3B%0A%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20ref.blur()%3B%0A%20%20%20%20%20%20%7D%2C%203e3)%3B%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%0A%20%20methods%3A%20%7B%0A%20%20%20%20rangeSeparatorSlotRender()%20%7B%0A%20%20%20%20%20%20return%20%3Ci%20class%3D%22el-icon-time%22%20%2F%3E%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20handleClear()%20%7B%0A%20%20%20%20%20%20const%20ref%20%3D%20this.%24refs.input%3B%0A%20%20%20%20%20%20if%20(ref)%20ref.clear()%3B%0A%20%20%20%20%7D%2C%0A%0A%20%20%20%20onChange(...args)%20%7B%0A%20%20%20%20%20%20console.warn(args)%3B%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%3B%0A%3C%2Fscript%3E%0A"}},[v("template",{slot:"demo"},[[v("div",[v("button",{on:{click:function(e){t.active=!t.active}}},[t._v("切换")]),t._v(" "),v("button",{on:{click:t.handleClear}},[t._v("清空")]),t._v(" "),v("elem-input-range",{ref:"input",attrs:{"border-color":t.active?"red":"","popover-visible":t.active,"popover-content":"内容",type:"number","range-separator-slot-render":t.rangeSeparatorSlotRender},on:{change:t.onChange},model:{value:t.foo,callback:function(e){t.foo=e},expression:"foo"}})],1)]],2)],2),t._v(" "),v("h2",{attrs:{id:"属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#属性"}},[t._v("#")]),t._v(" 属性")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("参数")]),t._v(" "),v("th",[t._v("说明")]),t._v(" "),v("th",[t._v("类型")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("value/v-model")]),t._v(" "),v("td",[t._v("绑定值")]),t._v(" "),v("td",[t._v("Array")])]),t._v(" "),v("tr",[v("td",[t._v("type")]),t._v(" "),v("td",[t._v("text，textarea 和其他 原生 input 的 type 值")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("disabled")]),t._v(" "),v("td",[t._v("是否可禁用")]),t._v(" "),v("td",[t._v("Boolean")])]),t._v(" "),v("tr",[v("td",[t._v("clearable")]),t._v(" "),v("td",[t._v("是否可清空")]),t._v(" "),v("td",[t._v("Boolean")])]),t._v(" "),v("tr",[v("td",[t._v("size")]),t._v(" "),v("td",[t._v("输入框尺寸")]),t._v(" "),v("td",[t._v("medium / small / mini")])]),t._v(" "),v("tr",[v("td",[t._v("start-placeholder")]),t._v(" "),v("td",[t._v("范围选择时开始的占位内容")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("end-placeholder")]),t._v(" "),v("td",[t._v("范围选择时结束的占位内容")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("range-separator")]),t._v(" "),v("td",[t._v("选择范围时的分隔符")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("clear-icon")]),t._v(" "),v("td",[t._v("自定义清空图标的类名")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("data-prop")]),t._v(" "),v("td",[t._v("元素标识，会被绑定到DOM元素的"),v("code",[t._v("data-prop")]),t._v("属性上, 默认为空")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("width")]),t._v(" "),v("td",[t._v("选择器宽度, 传入数字会被识别为像素值(px)")]),t._v(" "),v("td",[v("code",[t._v("String|Number")])])]),t._v(" "),v("tr",[v("td",[t._v("border-color")]),t._v(" "),v("td",[t._v("选择器边框颜色, 可用于校验不通过的提示，设为空字符串可还原")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("background-color")]),t._v(" "),v("td",[t._v("选择器背景颜色, 可用于校验不通过的提示，设为空字符串可还原")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("color")]),t._v(" "),v("td",[t._v("选择器字体颜色, 可用于校验不通过的提示，设为空字符串可还原")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("popover-visible")]),t._v(" "),v("td",[v("code",[t._v("<el-popover>")]),t._v("弹出框是否显示")]),t._v(" "),v("td",[t._v("Boolean")])]),t._v(" "),v("tr",[v("td",[t._v("popover-content")]),t._v(" "),v("td",[v("code",[t._v("<el-popover>")]),t._v("弹出框内容")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("popover-slot-render")]),t._v(" "),v("td",[t._v("弹出框渲染函数, 相当于"),v("code",[t._v("el-popover")]),t._v("的default slot")]),t._v(" "),v("td",[t._v("Function")])]),t._v(" "),v("tr",[v("td",[t._v("popover-attrs")]),t._v(" "),v("td",[v("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/popover#attributes",target:"_blank",rel:"noopener noreferrer"}},[v("code",[t._v("<el-popover>")]),t._v("的属性"),v("OutboundLink")],1)]),t._v(" "),v("td",[t._v("Object")])]),t._v(" "),v("tr",[v("td",[t._v("popover-listeners")]),t._v(" "),v("td",[v("a",{attrs:{href:"https://element.eleme.cn/#/zh-CN/component/popover#events",target:"_blank",rel:"noopener noreferrer"}},[v("code",[t._v("<el-popover>")]),t._v("的事件"),v("OutboundLink")],1)]),t._v(" "),v("td",[t._v("Object")])]),t._v(" "),v("tr",[v("td",[t._v("scroll-wrapper")]),t._v(" "),v("td",[t._v("滚动容器选择器, 用于解决"),v("code",[t._v("<el-popover>")]),t._v("不随目标元素滚动的问题, 滚动元素为window时传'window'字符串, 默认值空")]),t._v(" "),v("td",[t._v("String")])]),t._v(" "),v("tr",[v("td",[t._v("scroll-debounce")]),t._v(" "),v("td",[t._v("滚动容器滚动时更新"),v("code",[t._v("<el-popover>")]),t._v("的位置信息的延迟毫秒数, 仅当"),v("code",[t._v("scroll-wrapper")]),t._v("不为空时生效, 默认值0")]),t._v(" "),v("td",[t._v("Number")])]),t._v(" "),v("tr",[v("td",[t._v("duration")]),t._v(" "),v("td",[t._v("popover显示时间, 毫秒。设为 0 则不会自动关闭")]),t._v(" "),v("td",[t._v("Number")])])])]),t._v(" "),v("h2",{attrs:{id:"事件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事件"}},[t._v("#")]),t._v(" 事件")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("参数")]),t._v(" "),v("th",[t._v("说明")]),t._v(" "),v("th",[t._v("参数")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("input")]),t._v(" "),v("td",[t._v("在 Input 值改变时触发")]),t._v(" "),v("td",[t._v("(value: Array)")])]),t._v(" "),v("tr",[v("td",[t._v("clear")]),t._v(" "),v("td",[t._v("在点击由 clearable 属性生成的清空按钮时触发")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("change")]),t._v(" "),v("td",[t._v("仅在输入框失去焦点或用户按下回车时触发, 先于clear事件")]),t._v(" "),v("td",[t._v("(value: Array)")])]),t._v(" "),v("tr",[v("td",[t._v("focus")]),t._v(" "),v("td",[t._v("在 Input 获得焦点时触发")]),t._v(" "),v("td",[t._v("(event: Event)")])]),t._v(" "),v("tr",[v("td",[t._v("blur")]),t._v(" "),v("td",[t._v("在 Input 失去焦点时触发")]),t._v(" "),v("td",[t._v("(event: Event)")])])])]),t._v(" "),v("h2",{attrs:{id:"方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[t._v("#")]),t._v(" 方法")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("参数")]),t._v(" "),v("th",[t._v("说明")]),t._v(" "),v("th",[t._v("参数")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("focusStart")]),t._v(" "),v("td",[t._v("首输入框获取焦点")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("focusEnd")]),t._v(" "),v("td",[t._v("尾输入框获取焦点")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("blur")]),t._v(" "),v("td",[t._v("输入框失去焦点")]),t._v(" "),v("td",[t._v("-")])]),t._v(" "),v("tr",[v("td",[t._v("clear")]),t._v(" "),v("td",[t._v("清空输入框")]),t._v(" "),v("td",[t._v("-")])])])])],1)}),[],!1,null,null,null);e.default=o.exports}}]);