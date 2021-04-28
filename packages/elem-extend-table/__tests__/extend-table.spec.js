import { mount } from '@vue/test-utils';
import ElemExtendTable from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-extend-table': ElemExtendTable,
  },
  ...options,
});

describe('ElemTable', () => {
  test('empty', async () => {
    const wrapper = createVue({
      template: `<elem-extend-table />`,
    });

    expect(wrapper.html().includes('暂无数据')).toBe(true);
  });

  test('create', async () => {
    const wrapper = createVue({
      template: `
        <elem-extend-table
          ref="table"
          :columns="columns"
          :data="data"
          :summary-method="summaryMethod"
          :default-sort="{ prop: 'name' }"
          offline
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
            sortable: true,
          }, {
            label: '年龄',
            prop: 'age',
          }];
        },
      },

      methods: {
        summaryMethod() {},
      },
    });

    await sleep();
    const { $el, $refs } = wrapper.vm;
    $refs.table?.handleSortChange?.({ prop: 'name' });
    $refs.table?.handleSortChange?.({ prop: 'name', order: 'ascending' });

    $refs.table?.setPageSize?.(10);
    $refs.table?.setCurrentPage?.(1);
    $refs.table?.setCellAttrs?.('name', 1, {});
    $refs.table?.handleFilterChange?.({});

    expect([...$el.querySelectorAll('thead th')].map(node => node.textContent)).toEqual([ '名称', '年龄' ]);
    expect([...$el.querySelectorAll('td .cell')].map(node => node.textContent)).toEqual([ 'a', '18', 'b', '19' ]);
  });
});