<script setup lang="tsx">
import { AtTable, type GpTableInst, type TableColumns, useTableListApi } from '@art-admin/components'
import { NButton, NSpace, NTag } from 'naive-ui'
import { shallowRef } from 'vue'
import { getListData } from './mock'

const { getList } = useTableListApi(getListData)
const $table = shallowRef<GpTableInst>()
const columns: TableColumns<any> = [
  { key: '1', title: '表名', width: 100 },
  { key: '2', title: '描述', width: 100, ellipsis: true },
  { key: '3', title: '数据量', width: 200, render(rowData) { return <NTag>{rowData['3']}</NTag> } },
  { key: '4', title: '占用磁盘', width: 100 },
  { title: '最近更新时间', key: '5', width: 180 },
  { title: '操作', key: 'operation', fixed: 'right', width: 150, render() {
    return (
      <NSpace>
        <NButton size="small" secondary type="info">
          编辑
        </NButton>
        <NButton size="small" secondary type="error">
          删除
        </NButton>
      </NSpace>
    )
  } },
]
</script>

<template>
  <div class="h-300px w-full">
    <AtTable
      ref="$table"
      class="h-full"
      :row-key="(row: any) => row.id"
      :columns="(columns as any)"
      table-title="这是表格标题"
      :scroll-x="1000"
      :selection="{ type: 'selection', disabled(row:any) { return row[1] === '名字0' } }"
      flex-height
      :list-api="getList"
      :pager-keys="{ total: 'total', page: 'page', pageSize: 'size', list: 'list' }"
    >
      <template #extra>
        <NButton type="error">
          自定义
        </NButton>
        <NButton type="primary">
          新建
        </NButton>
      </template>
    </AtTable>
  </div>
</template>
