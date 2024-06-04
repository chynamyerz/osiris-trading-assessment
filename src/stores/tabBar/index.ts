import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ActiveTabData, BeverageData, OrderedBeverageData } from '../types'

export const useTabBarStore = defineStore('tabBarStore', () => {
  const beverages = ref<BeverageData[]>([
    { beverage: 'Beer', price: 45 },
    { beverage: 'Cider', price: 52 },
    { beverage: 'Premix', price: 59 }
  ])

  const ownerActiveTabs = ref<ActiveTabData[]>([])

  function addTab(owner: string, data: OrderedBeverageData[]) {
    const ownerTab = ownerActiveTabs.value.find((ownerActiveTab) => ownerActiveTab.owner === owner)

    if (!ownerTab) {
      ownerActiveTabs.value.push({ owner, rounds: [{ orders: data }] })
      return
    }

    ownerTab.rounds.push({ orders: data })
  }

  return { beverages, ownerActiveTabs, addTab }
})
