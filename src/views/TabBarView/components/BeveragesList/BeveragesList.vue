<template>
  <header>
    <h1>Beverages</h1>
  </header>
  <AgGridVue
    :gridOptions="{ gridId: 'beverages-list' }"
    :rowData="beverages"
    :columnDefs="colDefs"
    :defaultColDef="defColDefs"
    class="ag-theme-quartz"
    domLayout="autoHeight"
  />
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { useTabBarStore } from '@/stores/tabBar'
import type { ColDef } from 'ag-grid-community'
import type { BeverageData } from '@/stores/types'

const { beverages } = useTabBarStore()

const colDefs = ref<ColDef<BeverageData>[]>([
  { field: 'beverage' },
  {
    field: 'price',
    valueFormatter: (price) => `R ${price.value.toFixed(2)}`
  }
])

const defColDefs = ref<ColDef>({ flex: 1 })
</script>
