import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElemForm from '../../packages/elem-form/lib/index';
import ElemTable from '../../packages/elem-table/lib/index';
import ElemExtendTable from '../../packages/elem-extend-table/lib/index';
import ElemSelect from '../../packages/elem-select/lib/index';
import ElemInput from '../../packages/elem-input/lib/index';
import ElemDatePicker from '../../packages/elem-date-picker/lib/index';
import ElemCascader from '../../packages/elem-cascader/lib/index';
import ElemAutocomplete from '../../packages/elem-autocomplete/lib/index';
import '../../packages/elem-table/lib/elem-table.css';

export default ({ Vue }) => {
  Vue.use(ElementUI);
  Vue.component('elem-form', ElemForm);
  Vue.component('elem-table', ElemTable);
  Vue.component('elem-extend-table', ElemExtendTable);
  Vue.component('elem-select', ElemSelect);
  Vue.component('elem-input', ElemInput);
  Vue.component('elem-date-picker', ElemDatePicker);
  Vue.component('elem-cascader', ElemCascader);
  Vue.component('elem-autocomplete', ElemAutocomplete);
}
