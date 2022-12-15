<template>
  <div>
    <page-list
      ref="PageListRef"
      :search-config="searchFormConfig"
      :content-config="contentTableConfig"
      :params="params"
      :list-data="listData"
      :total-count="totalCount"
      manual-request
      :loading="loading"
      @load="getData"
    >
      <template #handler="scope">
        <el-button @click="onEditData(scope.row)">编辑</el-button>
      </template>
    </page-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import PageList from '@/components/page-list'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageList
  },
  setup() {
    const params = ref({
      name: ''
    })
    const loading = ref(false)
    const PageListRef = ref<InstanceType<typeof PageList>>()
    const listData = ref<any[]>([])
    const totalCount = ref(0)
    const getData = (params: any) => {
      console.log('请求参数: ', params)
      loading.value = true
      setTimeout(() => {
        listData.value = [
          {
            name: '111',
            createAt: '2020-02-20',
            updateAt: '2020-02-22'
          },
          {
            name: '2222',
            createAt: '2020-02-20',
            updateAt: '2020-02-22'
          }
        ]
        totalCount.value = 30
        loading.value = false
      }, 1000)
    }
    const onEditData = (row: any) => {
      console.log(row)
    }
    onMounted(() => {
      PageListRef.value?.reload()
    })
    return {
      loading,
      PageListRef,
      listData,
      totalCount,
      params,
      searchFormConfig,
      contentTableConfig,
      getData,
      onEditData
    }
  }
})
</script>

<style scoped></style>
