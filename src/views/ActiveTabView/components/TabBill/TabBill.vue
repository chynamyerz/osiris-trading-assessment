<template>
  <section>
    <header>
      <h1>{{ tabOwner }}'s Bill</h1>
    </header>
    <v-card class="tab-bill">
      <div class="tab-bill-total">
        <p>Total: R {{ billTotal.toFixed(2) }}</p>
      </div>
      <AgGridVue
        :gridOptions="{ gridId: 'tab-bill-total' }"
        :rowData="totalBillData"
        :columnDefs="colDefs"
        :defaultColDef="defColDefs"
        class="ag-theme-quartz"
        domLayout="autoHeight"
      />
      <div><v-switch label="Split bill?" color="blue" v-model="isBillSplit" inset></v-switch></div>
      <div v-if="isBillSplit">
        <div>
          <v-text-field
            type="number"
            label="How many people?"
            variant="outlined"
            v-model.number="numberOfPeople"
          ></v-text-field>
        </div>
        <div v-if="numberOfPeople > 0">
          <p>Each person's total: R {{ (billTotal / numberOfPeople).toFixed(2) }}</p>
        </div>
      </div>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { ref, watch } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef } from 'ag-grid-community'
import type { ActiveTabData, OrderedBeverageData, TabRoundData } from '@/stores/types'
import { useRoute } from 'vue-router'
import { useTabBarStore } from '@/stores/tabBar'

interface ColomnDef extends OrderedBeverageData {
  total: string
}

const route = useRoute()
const { ownerActiveTabs } = useTabBarStore()

const tabOwner = (route.params?.owner as string) || ''
const isBillSplit = ref(false)
const numberOfPeople = ref(0)
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
const totalBillData = ref(sumAllRoundsData(ownerActiveTabs))
const billTotal = ref(calculateBillTotal(totalBillData.value))

watch(ownerActiveTabs, async (newOwnerActiveTabs) => {
  totalBillData.value = sumAllRoundsData(newOwnerActiveTabs)
})

watch(totalBillData, async (newTotalBillData) => {
  billTotal.value = calculateBillTotal(newTotalBillData)
})

function sumAllRoundsData(ownersTabs: ActiveTabData[]): OrderedBeverageData[] {
  const roundsData: TabRoundData[] =
    ownersTabs.find((ownerActiveTab) => ownerActiveTab.owner === tabOwner)?.rounds || []
  const allRoundsData = roundsData.flatMap((roundData) => roundData.orders)
  const bevQuantities: { [k: string]: OrderedBeverageData } = {}

  for (const roundData of allRoundsData.values()) {
    if (Object.keys(bevQuantities).includes(roundData.beverage)) {
      bevQuantities[roundData.beverage] = {
        ...roundData,
        quantity: bevQuantities[roundData.beverage].quantity + roundData.quantity
      }
    } else {
      bevQuantities[roundData.beverage] = roundData
    }
  }

  return Object.keys(bevQuantities).map((key) => {
    return {
      beverage: key,
      price: bevQuantities[key].price,
      quantity: bevQuantities[key].quantity
    }
  })
}

function calculateBillTotal(billData: OrderedBeverageData[]) {
  return billData.reduce((prevValue, currValue) => {
    return (prevValue += currValue.price * currValue.quantity)
  }, 0)
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.tab-bill {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.tab-bill-total {
  display: flex;
  justify-content: flex-end;
}
</style>
