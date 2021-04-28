import { mount } from '@vue/test-utils';
import { genInputElm } from '../../../tests/utils';
import ElemInputNumber from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-input-number': ElemInputNumber,
  },
  ...options,
});

describe('ElemInputNumber', () => {
  test('create', async () => {
    const wrapper = createVue({
      template: `
        <elem-input-number
          v-model="value"
          placeholder="请输入内容"
        />
      `,
      data() {
        return {
          value: 1,
        };
      },
    });

    const { vm, input, inputElm } = genInputElm(wrapper);

    expect(input.exists()).toBe(true);
    expect(inputElm.placeholder).toBe('请输入内容');
    expect(inputElm.value).toEqual('1');

    vm.value += 1;
    await sleep();
    expect(inputElm.value).toBe('2');
  });
});
