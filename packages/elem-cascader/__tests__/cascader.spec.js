import { mount } from '@vue/test-utils';
import { genInputElm, sleep } from '../../../tests/utils';
import ElemCascader from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-cascader': ElemCascader,
  },
  ...options,
});

const TRIGGER = '.el-cascader';
const DROPDOWN = '.el-cascader__dropdown';

const OPTIONS = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
      },
    ],
  },
];

describe('ElemCascader', () => {
  test('with default value', async () => {
    const wrapper = createVue({
      template: `
        <elem-cascader
          v-model="value"
          :options="options"
        />
      `,
      data() {
        return {
          value: ['zhejiang', 'hangzhou'],
          options: OPTIONS,
        };
      },
    });

    await sleep();
    const { vm, inputElm } = genInputElm(wrapper);
    expect(inputElm.placeholder).toBe('请选择');
    expect(inputElm.value).toBe('Zhejiang / Hangzhou');
    vm.value = ['zhejiang', 'ningbo'];
    await sleep();
    expect(inputElm.value).toBe('Zhejiang / Ningbo');
  });

  test('options change', async () => {
    const wrapper = createVue({
      template: `
        <elem-cascader
          v-model="value"
          :options="options"
        />
      `,
      data() {
        return {
          value: ['zhejiang', 'hangzhou'],
          options: OPTIONS,
        };
      },
    });

    const { vm, inputElm } = genInputElm(wrapper);
    vm.options = [];
    expect(inputElm.value).toBe('');
  });

  test('disabled', async () => {
    const handleVisibleChange = jest.fn();
    const wrapper = createVue({
      template: `
        <elem-cascader disabled @visible-change="handleVisibleChange" />
      `,
      methods: {
        handleVisibleChange,
      },
    });
    await wrapper.find(TRIGGER).trigger('click');
    expect(handleVisibleChange).not.toBeCalled();
    expect(wrapper.find('input[disabled]').exists()).toBe(true);
  });

  test('custom placeholder', async () => {
    const wrapper = createVue({
      template: `
        <elem-cascader
          placeholder="请选择内容"
        />
      `,
    });
    expect(wrapper.find('input').attributes().placeholder).toBe('请选择内容');
  });

  test('same level merge', async () => {
    const wrapper = createVue({
      template: `
        <elem-cascader
          v-model="foo"
          :lazy="false"
          same-level-merge
          placeholder="请选择内容"
          @change="handleChange"
        />
      `,
      data() {
        return {
          foo: [[12], [5], [6]],
          options: [{
            label: '分组1',
            value: 11,
            children: [{
              label: 'aaaaaaaaaaa',
              value: 1,
            }, {
              label: 'bbbbbbbbbbb',
              value: 2,
            }, {
              label: 'c',
              value: 3,
            }],
          }, {
            label: '分组2',
            value: 12,
            children: [{
              label: 'd',
              value: 4,
              disabled: true,
            }, {
              label: 'e',
              value: 5,
              children: [{
                label: 'f',
                value: 6,
              }, {
                label: 'g',
                value: 7,
              }],
            }],
          }, {
            label: '分组3',
            value: 31,
          }],
        };
      },
      methods: {
        handleChange() {},
      },
    });

    expect(wrapper.find('input').attributes().placeholder).toBe('请选择内容');
  });

  test('empty options', async () => {
    const wrapper = createVue({
      template: `
        <elem-cascader @input="handleInput" />
      `,
      methods: {
        handleInput() {},
      },
    });

    expect(wrapper.find('input').attributes().placeholder).toBe('请选择');
  });
});
