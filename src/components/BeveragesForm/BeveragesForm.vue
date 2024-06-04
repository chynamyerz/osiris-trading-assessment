<template>
  <section>
    <header>
      <h1>{{ title }}</h1>
    </header>
    <v-alert
      v-if="errorMessage.length > 0"
      :text="errorMessage"
      color="error"
      variant="outlined"
      border
    ></v-alert>
    <form>
      <v-text-field
        type="text"
        label="Tab owner"
        variant="outlined"
        v-model="tabOwner"
        :disabled="!!owner"
        :readonly="!!owner"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        type="number"
        label="How many beers?"
        variant="outlined"
        v-model.number="beerQty"
      ></v-text-field>
      <v-text-field
        type="number"
        label="how many ciders?"
        variant="outlined"
        v-model.number="ciderQty"
      ></v-text-field>
      <v-text-field
        type="number"
        label="How many premixes?"
        variant="outlined"
        v-model.number="premixQty"
      ></v-text-field>
      <v-btn class="button" variant="outlined" color="blue" @click="addNewTab">
        {{ buttonText }}
      </v-btn>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useTabBarStore } from '@/stores/tabBar'
import type { OrderedBeverageData } from '@/stores/types'
import { computed, ref } from 'vue'

const { owner } = defineProps<{
  title: string
  owner?: string
  buttonText: string
}>()

const tabBarStore = useTabBarStore()
const { beverages } = tabBarStore

const tabOwner = ref(owner || '')
const beerQty = ref(0)
const ciderQty = ref(0)
const premixQty = ref(0)
const errorMessage = ref('')

const rules = computed(() => ({
  required: (value: string) => !!value || 'Required'
}))

function addNewTab() {
  if (!tabOwner.value) {
    errorMessage.value = "The tab owner's name is required!"
    return
  }

  if (beerQty.value === 0 && ciderQty.value === 0 && premixQty.value === 0) {
    errorMessage.value = 'At least one beverage is required!'
    return
  }

  errorMessage.value = ''

  const order: OrderedBeverageData[] = beverages.map((beverage) => {
    switch (beverage.beverage) {
      case 'Beer':
        return {
          ...beverage,
          quantity: beerQty.value
        }
      case 'Cider':
        return {
          ...beverage,
          quantity: ciderQty.value
        }
      default:
        return {
          ...beverage,
          quantity: premixQty.value
        }
    }
  })

  tabBarStore.addTab(tabOwner.value, order)
}
</script>

<style scoped>
section,
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
