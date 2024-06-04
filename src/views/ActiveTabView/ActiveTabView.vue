<template>
  <section>
    <nav>
      <v-btn class="button" variant="elevated" @click="$router.back()">Back</v-btn>
    </nav>
    <div class="active-tab-view">
      <div class="tab-details">
        <TabDetails />
      </div>
      <div class="tab-bill">
        <TabBill />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TabDetails from './components/TabDetails/TabDetails.vue'
import TabBill from './components/TabBill/TabBill.vue'
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.active-tab-view {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.tab-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
}

.tab-bill {
  width: 50%;
}
</style>
