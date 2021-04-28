import { mount } from '@vue/test-utils';
import ElemTablePage from '../src/index.vue';

const createVue = (options) => mount({
  components: {
    'elem-table-page': ElemTablePage,
  },
  ...options,
});

describe('ElemTablePage', () => {
  test('empty', async () => {
    const wrapper = createVue({
      template: `
        <elem-table-page
          ref="table"
          :columns="columns"
          :current-page="0"
          :pagination-left-slot-render="leftSlot"
          :on-request="onRequest"
          :on-response="onResponse"
          :on-error="onError"
          data-key="programs"
          total-key="count"
          page-key="offset"
          page-size-key="limit"
          url="https://musicapi.leanapp.cn/dj/program?rid=336355127"
          @size-change="onSizeChange"
        />
      `,
      computed: {
        columns() {
          return [{
            label: '名称',
            prop: 'mainSong.name',
          }, {
            label: '头像',
            prop: 'mainSong.artists[0].picUrl',
            type: 'image',
          }];
        },
      },

      methods: {
        handleResetPage() {
          const ref = this.$refs.table;
          if (ref) ref.setCurrentPage(0);
        },

        leftSlot(h) {
          return h('i', { class: 'el-icon-time' });
        },

        onRequest() {},
        onResponse(err, response) {},
        onError(err) {},
        onSizeChange() {}
      },
    });

    expect(wrapper.html().includes('暂无数据')).toBe(true);
    const { $refs } = wrapper.vm;
    $refs?.table?.setCurrentPage(1);
    $refs?.table?.setPageSize(10);
  });

  test('request config', async () => {
    const wrapper = createVue({
      template: `
        <elem-table-page
          :columns="columns"
          :request-config="{ method: 'post' }"
          data-key="programs"
          total-key="count"
          page-key="offset"
          page-size-key="limit"
          url="https://musicapi.leanapp.cn/dj/program?rid=336355127"
          @size-change="onSizeChange"
        />
      `,
      computed: {
        columns() {
          return [{
            label: '名称',
            prop: 'mainSong.name',
          }, {
            label: '头像',
            prop: 'mainSong.artists[0].picUrl',
            type: 'image',
          }];
        },
      },
    });

    expect(wrapper.html().includes('暂无数据')).toBe(true);
  });
});