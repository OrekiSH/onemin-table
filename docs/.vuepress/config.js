module.exports = {
  theme: '@vuepress-dumi/dumi',
  title: 'onemin-table',
  base: '/onemin-table/',
  themeConfig: {
    sidebar: [
      ['/', '组件总览'],
      ['/elem-input/', 'ElemInput'],
      ['/elem-input-number/', 'ElemInputNumber'],
      ['/elem-autocomplete/', 'ElemAutocomplete'],
      ['/elem-select/', 'ElemSelect'],
      ['/elem-cascader/', 'ElemCascader'],
      ['/elem-date-picker/', 'ElemDatePicker'],
      ['/elem-list-group/', 'ElemListGroup'],
      ['/elem-input-range/', 'ElemInputRange'],

      ['/elem-form/', 'ElemForm'],
      ['/elem-table/', 'ElemTable'],
      ['/elem-extend-table/', 'ElemExtendTable'],

      ['/elem-table-page/', 'ElemTablePage'],
      ['/faq/', '常见问题'],
    ],
  },
  markdown: {
    plugins: ['task-lists'],
  },
};
