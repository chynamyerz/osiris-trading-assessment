<template>
  <TabBarHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TabBarHeader from '@/components/TabBarHeader/TabBarHeader.vue'
</script>

<style>
.button {
  text-transform: none;
}

body {
  max-height: 100vh;
  overflow: hidden;
}
</style>
