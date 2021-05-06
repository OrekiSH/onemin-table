import { mount } from '@vue/test-utils';
import { genInputElm, sleep } from '../../../tests/utils';
import ElemDatePicker from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-date-picker': ElemDatePicker,
  },
  ...options,
});

describe('ElemInput', () => {
  test('disabled', () => {
    const wrapper = createVue({
      template: `<elem-date-picker
        v-model="value"
        disabled
      />`,
      data() {
        return {
          value: '',
        };
      },
    });

    expect(wrapper.find('input[disabled]').exists()).toBe(true);
  });

  test('start-placeholder', () => {
    const wrapper = createVue({
      template: '<elem-date-picker type="daterange" />',
    });

    expect(wrapper.html().includes('开始日期')).toBe(true);
  });
});
