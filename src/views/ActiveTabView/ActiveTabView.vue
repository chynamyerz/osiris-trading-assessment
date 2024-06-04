<template>
  <section>
    <nav>
      <v-btn class="button" variant="elevated" @click="$router.back()">Back</v-btn>
      <v-btn class="button" variant="elevated" @click="goToCheckout">Checkout</v-btn>
    </nav>
    <div class="active-tab-view">
      <div class="tab-details">
        <TabDetails :roundsData="roundsData" :owner="tabOwner" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TabDetails from './components/TabDetails/TabDetails.vue'
import { useRoute } from 'vue-router'
import type { TabRoundData } from '@/stores/types'
import { useTabBarStore } from '@/stores/tabBar'
import router from '@/router'

const route = useRoute()
const { ownerActiveTabs } = useTabBarStore()

const tabOwner = (route.params?.owner as string) || ''

const roundsData: TabRoundData[] =
  ownerActiveTabs.find((ownerActiveTab) => ownerActiveTab.owner === tabOwner)?.rounds || []

function goToCheckout() {
  router.push({
    name: 'checkout',
    params: {
      owner: tabOwner
    }
  })
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
