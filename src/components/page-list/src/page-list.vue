<template>
  <div class="page-list">
    <PageSearch :searchConfig="searchConfig" :params="params" @queryBtnClick="onQuery" @resetBtnClick="onReset" />
    <PageContent
      ref="pageContentRef"
      v-bind="contentConfig"
      :page="pageInfo"
      :loading="loading"
      @page-change="onChangePage"
      :pagination="pagination"
      :list-data="listData"
      :total-count="totalCount"
    >
      <template #headerHandler>
        <el-button type="primary">创建</el-button>
      </template>
      <template v-for="item in contentConfig.propList" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, type PropType, ref, watch } from 'vue'
import PageSearch, { type IFormData } from './page-search'
import PageContent from './page-content'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  props: {
    searchConfig: {
      type: Object,
      default: () => ({})
    },
    contentConfig: {
      type: Object,
      required: true
    },
    listData: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    },
    params: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Boolean,
      default: true
    },
    manualRequest: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load'],
  setup(props, { emit }) {
    const pageInfo = ref({
      page: DEFAULT_PAGE,
      size: DEFAULT_SIZE
    })
    let searchParams: IFormData = {}
    watch(
      () => props.params,
      (val) => {
        searchParams = val
        pageInfo.value.page = val?.page ?? pageInfo.value.page
        pageInfo.value.size = val?.size ?? pageInfo.value.size
      },
      {
        immediate: true
      }
    )
    const onChangePage = (page: any) => {
      pageInfo.value = { ...pageInfo.value, ...page }
      loadData()
    }
    const onQuery = (params: any) => {
      searchParams = params
      loadData()
    }
    const reload = () => {
      onReset()
    }
    onMounted(() => {
      if (!props.manualRequest) {
        loadData()
      }
    })

    const loadData = () => {
      if (props.pagination) {
        searchParams.size = pageInfo.value.size
        searchParams.page = pageInfo.value.page
      }
      emit('load', searchParams)
    }

    const onReset = () => {
      searchParams = props.params
      pageInfo.value.page = props.params?.page ?? DEFAULT_PAGE
      pageInfo.value.size = props.params?.size ?? DEFAULT_SIZE
      loadData()
    }

    return {
      pageInfo,
      onReset,
      onChangePage,
      onQuery,
      loadData,
      reload
    }
  }
})
</script>

<style scoped lang="scss">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
