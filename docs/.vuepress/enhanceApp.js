import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElemForm from '../../packages/elem-form/lib/index';
import ElemTable from '../../packages/elem-table/lib/index';
import ElemSelect from '../../packages/elem-select/lib/index';
import ElemInput from '../../packages/elem-input/lib/index';

export default ({ Vue }) => {
  Vue.use(ElementUI);
  Vue.component('elem-form', ElemForm);
  Vue.component('elem-table', ElemTable);
  Vue.component('elem-select', ElemSelect);
  Vue.component('elem-input', ElemInput);
}
