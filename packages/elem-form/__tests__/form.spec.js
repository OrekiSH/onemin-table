import { mount } from '@vue/test-utils';
import ElemForm from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-form': ElemForm,
  },
  ...options,
});

describe('ElemForm', () => {
  test('empty', async () => {
    const wrapper = createVue({
      template: `
        <elem-form collapsed />
      `,
    });

    expect(wrapper.html().includes('el-col-8')).toBe(true);
  });

  test('empty', async () => {
    const wrapper = createVue({
      template: `
        <elem-form
          ref="form"
          :filters="filters"
        />
      `,
      data() {
        return {
          filters: [{
            label: '姓名',
            prop: 'name',
          }],
        };
      },
    });

    const { $refs } = wrapper.vm;
    const filter = {
      label: '姓名',
      prop: 'name',
    };
    $refs.form?.genPickerDefaultAttrs?.(filter, '');
    $refs.form?.genSelectDefaultAttrs?.(filter);
    $refs.form?.genCascaderProps?.(filter);
    $refs.form?.handleChange?.(filter);
    $refs.form?.genSelectBoxAttrs?.({});
    $refs.form?.handleSetCollapsed?.(true);
    $refs.form?.initResizeObserver?.();

    $refs.form?.genButtonGroupProps?.('search');
    $refs.form?.genButtonGroupProps?.('reset');
    $refs.form?.genButtonGroupProps?.('collapse');
    $refs.form?.genButtonGroupProps?.();
    expect(wrapper.html().includes('el-col-8')).toBe(true);

    wrapper.vm.filters = [];
  });
});