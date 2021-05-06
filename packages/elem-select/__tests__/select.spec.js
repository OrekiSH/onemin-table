import { mount } from '@vue/test-utils';
import ElemSelect from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-select': ElemSelect,
  },
  ...options,
});

describe('ElemSelect', () => {
  test('default value', async () => {
    const wrapper = createVue({
      template: `
        <elem-select
          v-model="value"
          :options="options"
        />
      `,
      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕',
          }, {
            value: '选项2',
            label: '双皮奶',
          }],
          value: '选项2',
        };
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.el-input__inner').element.value).toBe('双皮奶');
  });

  test('sync set value and options', async () => {
    const wrapper = createVue({
      template: `
        <elem-select
          v-model="value"
          :options="options"
        />
      `,
      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕',
          }, {
            value: '选项2',
            label: '双皮奶',
          }],
          value: '选项2',
        };
      },
    });

    const { vm } = wrapper;
    vm.options = [{
      value: '选项1',
      label: '黄金糕',
    }];
    vm.value = '选项1';
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.el-input__inner').element.value).toBe('黄金糕');
  });

  test('event:blur', async () => {
    const handleBlur = jest.fn();
    const wrapper = createVue({
      template: `
        <elem-select
          v-model="value"
          :options="options"
          :empty-slot-render="emptySlotRender"
          loading
          @blur="handleBlur"
        />
      `,
      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕',
          }, {
            value: '选项2',
            label: '双皮奶',
          }],
          value: '选项2',
        };
      },
      methods: {
        handleBlur,
        emptySlotRender(h) {
          return h('span', null, '123');
        },
      },
    });

    await wrapper.trigger('blur');

    const { vm } = wrapper;
    vm.options = [{
      value: '选项1',
      label: '黄金糕',
    }];
    vm.value = '选项1';
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.el-input__inner').element.value).toBe('黄金糕');

    wrapper;
  });
});
