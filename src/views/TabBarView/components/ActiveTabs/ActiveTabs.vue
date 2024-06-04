<template>
  <section>
    <header>
      <h1>Active tabs</h1>
    </header>
    <ActiveTabsItem
      v-for="ownerActiveTab in ownerActiveTabs"
      :key="ownerActiveTab.owner"
      :tabOwner="ownerActiveTab.owner"
      :numberOfRounds="ownerActiveTab.rounds.length"
    />
  </section>
</template>

<script setup lang="ts">
import { useTabBarStore } from '@/stores/tabBar'
import ActiveTabsItem from './ActiveTabsItem.vue'

const { ownerActiveTabs } = useTabBarStore()
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
