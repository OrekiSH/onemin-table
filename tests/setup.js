import Element from 'element-ui';
import Vue from 'vue';
import 'regenerator-runtime/runtime';
import { sleep, defineGetter } from './utils';

Vue.use(Element);

global.sleep = sleep;
global.defineGetter = defineGetter;
