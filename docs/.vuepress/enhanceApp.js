import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElemSelect from '../../packages/elem-select/es/index';
import ElemInput from '../../packages/elem-input/es/index';
import ElemDatePicker from '../../packages/elem-date-picker/es/index';
import ElemCascader from '../../packages/elem-cascader/es/index';
import ElemAutocomplete from '../../packages/elem-autocomplete/es/index';
import ElemInputNumber from '../../packages/elem-input-number/es/index';
import ElemListGroup from '../../packages/elem-list-group/es/index';

import ElemForm from '../../packages/elem-form/es/index';
import ElemTable from '../../packages/elem-table/es/index';
import ElemExtendTable from '../../packages/elem-extend-table/es/index';

import ElemTablePage from '../../packages/elem-table-page/es/index';
import '../../packages/elem-table/lib/elem-table.css';
import '../../packages/elem-form/lib/elem-form.css';

export default ({ Vue }) => {
  Vue.use(ElementUI);
  Vue.component('elem-select', ElemSelect);
  Vue.component('elem-input', ElemInput);
  Vue.component('elem-date-picker', ElemDatePicker);
  Vue.component('elem-cascader', ElemCascader);
  Vue.component('elem-autocomplete', ElemAutocomplete);
  Vue.component('elem-input-number', ElemInputNumber);
  Vue.component('elem-list-group', ElemListGroup);

  Vue.component('elem-form', ElemForm);
  Vue.component('elem-table', ElemTable);
  Vue.component('elem-extend-table', ElemExtendTable);

  Vue.component('elem-table-page', ElemTablePage);
}
