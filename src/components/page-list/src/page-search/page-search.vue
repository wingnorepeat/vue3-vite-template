<template>
  <div>
    <BaseForm v-bind="searchConfig" v-model="formData" ref="hyFormRef">
      <template #footer>
        <div class="btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleQueryClick">查询</el-button>
        </div>
      </template>
    </BaseForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue'

import BaseForm, { type IForm } from '../base-form'
import type { IFormData } from './type'

export default defineComponent({
  components: {
    BaseForm
  },
  props: {
    searchConfig: {
      type: Object as PropType<IForm>
    },
    params: {
      type: Object
    }
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const originFormData: IFormData = {}

    const formData = ref<IFormData>({})

    const hyFormRef = ref<InstanceType<typeof BaseForm>>()

    watch(
      () => props.params,
      (newVal) => {
        const formItems = props.searchConfig?.formItems ?? []
        for (const formItem of formItems) {
          originFormData[`${formItem.field}`] = newVal ? newVal[`${formItem.field}`] ?? undefined : undefined
        }
        formData.value = { ...originFormData }
        hyFormRef.value?.onUpdateFormData()
      },
      {
        immediate: true,
        deep: true
      }
    )

    const handleResetClick = () => {
      for (const key in originFormData) {
        formData.value[`${key}`] = originFormData[key]
      }
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      hyFormRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.title {
  padding-left: 30px;
  text-align: left;
}

.btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
