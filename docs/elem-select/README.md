<h1 align="center">elem-select</h1>

ð schema-basedéæ©å¨æ¨¡æ¿ç»ä»¶, éæ`el-popover`ç»ä»¶ï¼å®ç°å³æ³¨ç¹éä¸­çåé¦æ¨¡å¼.

## å®è£

* é¦åå®è£ [Element v2.x](https://github.com/ElemeFE/element)

* æ¥çå®è£ç»ä»¶

```bash
$ npm i @onemin-table/elem-select
# OR
$ yarn add @onemin-table/elem-select
```

## ç¨æ³

::: demo
<template>
  <div>
    <button @click="group = !group">åæ¢</button>
    <span>{{ !group ? 'åé' : 'åç»' }}</span>
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
            label: 'åç»1',
            children: this.options,
          }, {
            label: 'åç»2',
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
            éè¯¯
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

## å±æ§

| åæ°        | è¯´æ           | ç±»å  |
| ------------- |---------------| ------|
| options(å¿å¡«) | éæ©å¨ä¸æåè¡¨æ°æ®, å«æchildrençåè¡¨èªå¨åç»å±ç¤º | Array<{ label: string, value?: any, disabled?: boolean, children?: Array, optionSlotRender?: function }> |
| prefix-slot-render | éæ©å¨å¤´é¨åå®¹æ¸²æå½æ°, ç¸å½äº`el-select`çprefix slot | Function |
| empty-slot-render | éæ©å¨æ éé¡¹æ¶åè¡¨æ¸²æå½æ°, ç¸å½äº`el-select`çempty slot | Function |
| option-slot-render | éæ©å¨åè¡¨èªå®ä¹å¤éé¡¹æ¸²æå½æ°, ç¸å½äº`el-option`çdefault slot, åæ°ä¸ºä¼ å¥çoptionsä¸­çè¡ | Function |
| loading | éæ©å¨æ¯å¦å è½½ä¸­ | Boolean |
| loading-text | éæ©å¨éé¡¹å è½½ä¸­åè¡¨æç¤ºæå­ | String |
| loading-slot-render | éæ©å¨éé¡¹å è½½ä¸­åè¡¨åå®¹æ¸²æå½æ°, ä¼åçº§é«äº`loading-text` | Function |
| data-prop | åç´ æ è¯ï¼ä¼è¢«ç»å®å°DOMåç´ ç`data-prop`å±æ§ä¸, é»è®¤ä¸ºç©º | String |
| width | éæ©å¨å®½åº¦, ä¼ å¥æ°å­ä¼è¢«è¯å«ä¸ºåç´ å¼(px) | `String|Number` |
| border-color | éæ©å¨è¾¹æ¡é¢è², å¯ç¨äºæ ¡éªä¸éè¿çæç¤ºï¼è®¾ä¸ºç©ºå­ç¬¦ä¸²å¯è¿å | String |
| background-color | éæ©å¨èæ¯é¢è², å¯ç¨äºæ ¡éªä¸éè¿çæç¤ºï¼è®¾ä¸ºç©ºå­ç¬¦ä¸²å¯è¿å | String |
| color | éæ©å¨å­ä½é¢è², å¯ç¨äºæ ¡éªä¸éè¿çæç¤ºï¼è®¾ä¸ºç©ºå­ç¬¦ä¸²å¯è¿å | String |
| popover-visible | `<el-popover>`å¼¹åºæ¡æ¯å¦æ¾ç¤º | Boolean |
| popover-content | `<el-popover>`å¼¹åºæ¡åå®¹ | String |
| popover-attrs | [`<el-popover>`çå±æ§](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | Object |
| popover-listeners | [`<el-popover>`çäºä»¶](https://element.eleme.cn/#/zh-CN/component/popover#events) | Object |
| popover-slot-render | å¼¹åºæ¡æ¸²æå½æ°, ç¸å½äº`el-popover`çdefault slot | Function |
| scroll-wrapper | æ»å¨å®¹å¨éæ©å¨, ç¨äºè§£å³`<el-popover>`ä¸éç®æ åç´ æ»å¨çé®é¢, æ»å¨åç´ ä¸ºwindowæ¶ä¼ 'window'å­ç¬¦ä¸², é»è®¤å¼ç©º | String |
| scroll-debounce | æ»å¨å®¹å¨æ»å¨æ¶æ´æ°`<el-popover>`çä½ç½®ä¿¡æ¯çå»¶è¿æ¯«ç§æ°, ä»å½`scroll-wrapper`ä¸ä¸ºç©ºæ¶çæ, é»è®¤å¼0 | Number |
| duration | popoveræ¾ç¤ºæ¶é´, æ¯«ç§ãè®¾ä¸º 0 åä¸ä¼èªå¨å³é­ | Number | 3000 |

å¶ä»ç»§æ¿èª`el-select`çå±æ§è§[element-uiææ¡£](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)

## äºä»¶

ç»§æ¿èª`el-select`çäºä»¶è§[element-uiææ¡£](https://element.eleme.cn/#/zh-CN/component/select#select-events)

## æ¹æ³

ç»§æ¿èª`el-select`çæ¹æ³è§[element-uiææ¡£](https://element.eleme.cn/#/zh-CN/component/select#methods)
