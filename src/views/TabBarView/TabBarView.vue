<template>
  <main class="tab-bar">
    <section class="beverages">
      <div class="beverages-list">
        <BeveragesList />
      </div>
      <div class="beverages-form">
        <BeveragesForm title="Open new tab" button-text="Add tab" />
      </div>
    </section>
    <section class="active-tabs">
      <div class="active-tabs-list">
        <ActiveTabs />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import BeveragesList from './components/BeveragesList/BeveragesList.vue'
import BeveragesForm from '@/components/BeveragesForm/BeveragesForm.vue'
import ActiveTabs from './components/ActiveTabs/ActiveTabs.vue'
</script>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
}

.beverages {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60%;
}

.active-tabs {
  width: 40%;
}
</style>
