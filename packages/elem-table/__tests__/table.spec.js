import { mount } from '@vue/test-utils';
import ElemTable from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-table': ElemTable,
  },
  ...options,
});

describe('ElemTable', () => {
  test('empty', async () => {
    const wrapper = createVue({
      template: `<elem-table />`,
    });

    expect(wrapper.html().includes('暂无数据')).toBe(true);
  });

  test('create', async () => {
    const wrapper = createVue({
      template: `
        <elem-table
          :columns="columns"
          :data="data"
        />
      `,
      data() {
        return {
          data: [{
            name: 'a',
            age: 18,
          }, {
            name: 'b',
            age: 19,
          }],
        };
      },

      computed: {
        columns() {
          return [{
            label: '名称',
            prop: 'name',
          }, {
            label: '年龄',
            prop: 'age',
          }];
        },
      },
    });

    await sleep();
    const { $el } = wrapper.vm;

    expect([...$el.querySelectorAll('thead th')].map(node => node.textContent).filter(Boolean)).toEqual([ '名称', '年龄' ]);
    expect([...$el.querySelectorAll('td .cell')].map(node => node.textContent).filter(Boolean)).toEqual([ 'a', '18', 'b', '19' ]);
  });

  test('methods', async () => {
    const wrapper = createVue({
      template: `
        <elem-table
          ref="table"
          :columns="columns"
          :data="data"
          :selection="selection"
          selection-key="name"
          @cell-mouse-enter="cellMouseEnter"
          @sort-change="handleSortChange"
        />
      `,
      data() {
        return {
          data: [{
            name: 'a',
            age: 18,
          }, {
            name: 'b',
            age: 19,
          }],

          selection: [],
          columns: [{
            label: '',
            prop: 'selection',
            type: 'selection',
          }, {
            label: '名称',
            prop: 'name',
            fixed: true,
          }, {
            label: '年龄',
            prop: 'age',
          }],
        };
      },

      methods: {
        cellMouseEnter() {},
        handleSortChange() {},
      },
    });

    await sleep();
    const { $el, $refs } = wrapper.vm;

    $refs?.table?.clearSelection();
    $refs?.table?.toggleAllSelection();
    $refs?.table?.toggleRowSelection();
    $refs?.table?.checkSelectionKey();
    $refs?.table?.handleSelect([{ name: 'a', age: 18 }]);
    $refs?.table?.handleSelectEvent([]);
    $refs?.table?.handleSelectAllEvent([]);
    $refs?.table?.handleToggleSelection([]);
    $refs?.table?.setCellAttrs('name', 0, { popoverVisible: true });
    $refs?.table?.initCellAttrsMap();

    expect([...$el.querySelectorAll('thead th')].map(node => node.textContent).filter(Boolean)).toEqual([ '名称', '年龄', '名称', '年龄' ]);
    expect([...$el.querySelectorAll('td .cell')].map(node => node.textContent).filter(Boolean)).toEqual([ 'a', '18', 'b', '19', 'a', '18', 'b', '19' ]);

    wrapper.vm.data = [];
    wrapper.vm.selection = [];
    wrapper.vm.columns = [];
    $refs?.table?.handleCellEvent('', null, { property: 'name' });
    $refs?.table?.genColumnItemListeners({ type: 'input' });
    $refs?.table?.genColumnItemListeners({ type: 'select' });
    $refs?.table?.handleChange('', { row: '' }, { type: 'input' });
    $refs?.table?.genColumnItemAttrs({ type: 'input' }, { row: '' });
    $refs?.table?.genColumnEnterChangeLine({ type: 'input', enterChangeLine: true }, { row: '' }, { keyCode: 13, target: {} });
  });

  test('no selectionKey', () => {
    const wrapper = createVue({
      template: `
        <elem-table
          ref="table"
          :columns="columns"
          :data="data"
          stack-selection
        />
      `,
      data() {
        return {
          columns: [{
            label: '',
            prop: 'selection',
            type: 'selection',
          }],
          data: [],
        };
      },
    });

    const { $refs } = wrapper.vm;

    try {
      $refs?.table?.checkSelectionKey();
    } catch (err) {
      expect(err.message).toBe('[ElemTable]: prop selection-key is required!');
    }
  });

  test('no selectionKey', () => {
    const wrapper = createVue({
      template: `
        <elem-table
          ref="table"
          :columns="columns"
          :data="data"
          :selection="[]"
          selection-key="name"
          stack-selection
        />
      `,
      data() {
        return {
          columns: [{
            label: '',
            prop: 'selection',
            type: 'selection',
          }, {
            label: '姓名',
            prop: 'age',
          }],
          data: [],
        };
      },
    });

    const { $refs } = wrapper.vm;
    $refs?.table?.handleSelect([{ name: 'a', age: 18 }]);
    $refs?.table?.handleToggleSelection();
  });
});