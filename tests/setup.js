import Element from 'element-ui';
import Vue from 'vue';
import ElemTable from '@onemin-table/elem-table';
import ElemExtendTable from '@onemin-table/elem-extend-table';
import 'regenerator-runtime/runtime';
import { sleep, defineGetter } from './utils';

Vue.use(Element);
Vue.component('elem-table', ElemTable);
Vue.component('elem-extend-table', ElemExtendTable);

global.sleep = sleep;
global.defineGetter = defineGetter;
