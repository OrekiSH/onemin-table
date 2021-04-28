import { mount } from '@vue/test-utils';
import { genInputElm } from '../../../tests/utils';
import ElemAutocomplete from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-autocomplete': ElemAutocomplete,
  },
  ...options,
});

describe('ElemAutocomplete', () => {
  test('create', async () => {
    const wrapper = createVue({
      template: `
        <elem-autocomplete
          v-model="value"
          placeholder="请输入内容"
        />
      `,
      data() {
        return {
          value: 'foo',
        };
      },
    });

    const { vm, input, inputElm } = genInputElm(wrapper);

    expect(input.exists()).toBe(true);
    expect(inputElm.placeholder).toBe('请输入内容');
    expect(inputElm.value).toEqual('foo');

    vm.value = 'bar';
    await sleep();
    expect(inputElm.value).toBe('bar');
  });
});
