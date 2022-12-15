<template>
  <div class="page-content">
    <div class="table">
      <div class="header" v-if="headerProps.show">
        <slot name="header">
          <div class="title" v-if="headerProps.title">{{ headerProps.title }}</div>
          <div class="handler">
            <slot name="headerHandler"></slot>
          </div>
        </slot>
      </div>
      <el-table :data="listData" border @selection-change="selectionChange" v-bind="childrenProps" v-loading="loading">
        <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
        <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
        <template v-for="item in propList" :key="item.prop">
          <el-table-column v-bind="item" align="center" show-overflow-tooltip>
            <template #default="scope" v-if="item.slotName">
              <slot :name="item.slotName" :row="scope.row">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <slot></slot>
      </el-table>
      <div class="footer" v-if="pagination">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.page"
            :page-size="page.size"
            :total="totalCount"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
          >
          </el-pagination>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    headerProps: {
      type: Object,
      default: () => ({
        show: true,
        title: ''
      })
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    propList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    totalCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        page: 1,
        size: 10
      })
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange', 'pageChange'],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      if (props.showSelectColumn) {
        emit('selectionChange', value)
      }
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('pageChange', { ...props.page, page: currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('pageChange', { ...props.page, size: pageSize })
    }

    return {
      selectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="scss">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
