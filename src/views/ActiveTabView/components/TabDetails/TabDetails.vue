<template>
  <section>
    <header>
      <h1>{{ owner }} tab details</h1>
    </header>

    <v-card v-if="roundsData.length > 0" class="tab-details">
      <v-dialog max-width="500">
        <template #activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="blue" text="Add round" variant="outlined"></v-btn>
        </template>

        <template #default="{ isActive }">
          <v-card class="new-round">
            <BeveragesForm title="Add round" buttonText="Add" :owner="owner" />

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn class="button" text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <TabRound
        v-for="(roundData, index) in roundsData"
        :key="index"
        :roundData="roundData"
        :id="`${owner} ${index}`"
      />
    </v-card>
  </section>
</template>

<script setup lang="ts">
import type { TabRoundData } from '@/stores/types'
import TabRound from './TabRound.vue'
import BeveragesForm from '@/components/BeveragesForm/BeveragesForm.vue'

defineProps<{ roundsData: TabRoundData[]; owner: string }>()
</script>

<style scoped>
.tab-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.new-round {
  padding: 1rem;
}
</style>
