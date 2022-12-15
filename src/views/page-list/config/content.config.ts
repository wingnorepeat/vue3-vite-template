export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250' },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      formatter: (row: any) => {
        return row.updateAt + ' 00:00'
      }
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

// 备注：slotName的优先级高于formatter, 如配置列有自定义slotName， 则formatter无效
