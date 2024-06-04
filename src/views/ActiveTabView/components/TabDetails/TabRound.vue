<template>
  <div class="tab-round">
    <div class="round-header">
      <h3>Round: {{ id }}</h3>
      <p>Total: R {{ roundTotal }}</p>
    </div>
    <AgGridVue
      :gridOptions="{ gridId: id }"
      :rowData="rowData"
      :columnDefs="colDefs"
      :defaultColDef="defColDefs"
      class="ag-theme-quartz"
      domLayout="autoHeight"
    />
  </div>
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { computed, ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef } from 'ag-grid-community'
import type { OrderedBeverageData, TabRoundData } from '@/stores/types'

interface TabRoundProps {
  roundData: TabRoundData
  id: string
}

interface ColomnDef extends OrderedBeverageData {
  total: string
}

const { id, roundData } = defineProps<TabRoundProps>()

const colDefs = ref<ColDef<ColomnDef>[]>([
  { field: 'beverage' },
  {
    field: 'price',
    valueFormatter: (param) => `R ${param.value.toFixed(2)}`
  },
  { field: 'quantity' },
  {
    field: 'total',
    valueFormatter: (param) => `R ${(param.data!.price * param.data!.quantity).toFixed(2)}`
  }
])

const defColDefs = ref<ColDef>({ flex: 1 })

const rowData = roundData.orders.flatMap((order) => order)

const roundTotal = computed(() =>
  rowData
    .reduce((prevValue, currValue) => {
      return (prevValue += currValue.price * currValue.quantity)
    }, 0)
    .toFixed(2)
)
</script>

<style scoped>
.tab-round {
  display: flex;
  flex-direction: column;

  .round-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
