<template>
  <v-card class="active-tab">
    <div class="active-tab-content">{{ tabOwner }}</div>
    <div class="active-tab-content">{{ roundSummary }}</div>
    <div class="active-tab-button">
      <v-btn class="button" color="blue" size="small" variant="outlined" @click="viewTab"
        >View</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { tabOwner, numberOfRounds } = defineProps({
  tabOwner: String,
  numberOfRounds: Number
})

const roundSummary = computed(() =>
  numberOfRounds === 1 ? `${numberOfRounds} Round` : `${numberOfRounds} Rounds`
)

function viewTab() {
  router.push({
    name: 'active-tab',
    params: {
      owner: tabOwner
    }
  })
}
</script>

<style scoped>
.active-tab {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;

  .active-tab-content {
    flex: 1;
  }
}
</style>
