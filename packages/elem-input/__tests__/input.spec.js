import { mount } from '@vue/test-utils';
import ElemInput from '../lib';

const createVue = (options) => mount({
  components: {
    'elem-input': ElemInput,
  },
  ...options,
});

describe('ElemInput', () => {
  test('create', async () => {
    const wrapper = createVue({
      template: `
        <elem-input
          :value="input"
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
        >
        </elem-input>
      `,
      data() {
        return {
          input: 'foo',
        };
      },
    });

    const inputElm = wrapper.find('input');
    const { vm } = wrapper;
    const nativeInput = inputElm.element;

    await inputElm.trigger('focus');

    expect(inputElm.exists()).toBe(true);
    expect(nativeInput.placeholder).toBe('请输入内容');
    expect(nativeInput.value).toBe('foo');
    expect(nativeInput.minLength).toBe(3);
    expect(nativeInput.maxLength).toBe(5);

    vm.input = 'text';
    await sleep();
    expect(inputElm.element.value).toBe('text');
  });

  test('default to empty', () => {
    const wrapper = createVue({
      template: '<elem-input />',
    });
    const inputElm = wrapper.find('input');
    expect(inputElm.element.value).toBe('');
  });

  test('disabled', () => {
    const wrapper = createVue({
      template: '<elem-input disabled />',
    });
    const inputElm = wrapper.find('input');
    expect(inputElm.element.disabled).not.toBeNull();
  });

  test('suffixIcon', () => {
    const wrapper = createVue({
      template: '<elem-input suffix-icon="time" />',
    });
    const icon = wrapper.find('.el-input__icon');
    expect(icon.exists()).toBe(true);
  });

  test('prefixIcon', () => {
    const wrapper = createVue({
      template: '<elem-input prefix-icon="time" />',
    });
    const icon = wrapper.find('.el-input__icon');
    expect(icon.exists()).toBe(true);
  });

  test('size', () => {
    const wrapper = createVue({
      template: '<elem-input size="large" lite />',
    });
    expect(wrapper.classes('el-input--large')).toBe(true);
  });

  test('type', () => {
    const wrapper = createVue({
      template: '<elem-input type="textarea" lite />',
    });
    expect(wrapper.classes('el-textarea')).toBe(true);
  });

  test('rows', () => {
    const wrapper = createVue({
      template: '<elem-input type="textarea" :rows="3" />',
    });
    expect(wrapper.find('textarea').element.rows).toEqual(3);
  });

  test('resize', async () => {
    const wrapper = createVue({
      template: `
        <div>
          <elem-input type="textarea" :resize="resize" />
        </div>
      `,
      data() {
        return {
          resize: 'none',
        };
      },
    });
    const { vm } = wrapper;
    const textarea = wrapper.find('textarea').element;
    await sleep();
    expect(textarea.style.resize).toEqual(vm.resize);
    vm.resize = 'horizontal';
    await sleep();
    expect(textarea.style.resize).toEqual(vm.resize);
  });

  test('sets value on textarea / input type change', async () => {
    const wrapper = createVue({
      template: '<elem-input :type="type" v-model="val" />',
      data() {
        return {
          type: 'text',
          val: '123',
        };
      },
    });
    const { vm } = wrapper;
    expect(vm.$el.querySelector('input').value).toEqual('123');
    vm.type = 'textarea';
    await sleep();
    expect(vm.$el.querySelector('textarea').value).toEqual('123');
    vm.type = 'password';
    await sleep();
    expect(vm.$el.querySelector('input').value).toEqual('123');
  });

  test('limit input and show word count', async () => {
    const wrapper = createVue({
      template: `
        <div>
          <elem-input
            class="test-text"
            type="text"
            v-model="input1"
            maxlength="10"
            :show-word-limit="show">
          </elem-input>
          <elem-input
            class="test-textarea"
            type="textarea"
            v-model="input2"
            maxlength="10"
            show-word-limit>
          </elem-input>
          <elem-input
            class="test-password"
            type="password"
            v-model="input3"
            maxlength="10"
            show-word-limit>
          </elem-input>
          <elem-input
            class="test-initial-exceed"
            type="text"
            v-model="input4"
            maxlength="2"
            show-word-limit
            lite
          >
          </elem-input>
        </div>
      `,
      data() {
        return {
          input1: '',
          input2: '',
          input3: '',
          input4: 'exceed',
          show: false,
        };
      },
    });

    const inputElm1 = wrapper.vm.$el.querySelector('.test-text');
    const inputElm2 = wrapper.vm.$el.querySelector('.test-textarea');
    const inputElm3 = wrapper.vm.$el.querySelector('.test-password');
    const inputElm4 = wrapper.vm.$el.querySelector('.test-initial-exceed');

    expect(inputElm1.querySelectorAll('.el-input__count').length).toEqual(0);
    expect(inputElm2.querySelectorAll('.el-input__count').length).toEqual(1);
    expect(inputElm3.querySelectorAll('.el-input__count').length).toEqual(0);
    expect(inputElm4.classList.contains('is-exceed')).toBe(true);

    const { vm } = wrapper;
    vm.show = true;
    await sleep();
    expect(inputElm1.querySelectorAll('.el-input__count').length).toEqual(1);

    vm.input4 = '1';
    await sleep();
    expect(inputElm4.classList.contains('is-exceed')).toBe(false);
  });

  describe('Input Methods', () => {
    test('method:select', async () => {
      const testContent = 'test';
      const wrapper = createVue({
        template: '<elem-input v-model="text" />',
        data() {
          return {
            text: testContent,
          };
        },
      });

      const input = wrapper.find('input').element;
      // mock selectionRange behaviour, due to jsdom's reason this case cannot run well, may be fixed later using headlesschrome or puppeteer
      let selected = false;
      defineGetter(input, 'selectionStart', function () {
        return selected ? 0 : this.value.length;
      });
      defineGetter(input, 'selectionEnd', function () {
        return this.value.length;
      });

      expect(input.selectionStart).toEqual(testContent.length);
      expect(input.selectionEnd).toEqual(testContent.length);

      input.select();
      selected = true;
      await sleep();
      expect(input.selectionStart).toEqual(0);
      expect(input.selectionEnd).toEqual(testContent.length);
    });
  });

  test('event:change', async () => {
    // NOTE: should be same as native's change behavior
    const wrapper = createVue({
      template: `
        <elem-input
          placeholder="请输入内容"
          v-model="input"
          @change="handleChange"
        />
      `,
      data() {
        return {
          input: 'a',
          val: '',
        };
      },
      methods: {
        handleChange(val) {
          this.val = val;
        },
      },
    });

    const el = wrapper.find('input').element;
    const { vm } = wrapper;
    const simulateEvent = (text, event) => {
      el.value = text;
      el.dispatchEvent(new Event(event));
    };

    // simplified test, component should emit change when native does
    simulateEvent('2', 'change');
    await sleep();
    expect(vm.val).toBe('2');
    simulateEvent('1', 'input');
    await sleep();
    expect(vm.val).toBe('2');
  });

  describe('Textarea Events', () => {
    test('event:keydown', async () => {
      const handleKeydown = jest.fn();
      const wrapper = createVue({
        template: `<el-input
          type="textarea"
          :value="val"
          @keydown.native="handleKeydown"
        />`,
        methods: {
          handleKeydown,
        },
      });

      await wrapper.find('textarea').trigger('keydown');
      expect(handleKeydown).toBeCalledTimes(1);
    });
  });
});
