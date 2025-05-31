<template>
  <UContainer class="py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-pastelPink" />
    </div>

    <div v-else-if="unit" class="space-y-8 font-sans max-w-3xl mx-auto px-4">
      <!-- Header with back button -->
      <div class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-arrow-left"
          variant="ghost"
          to="/"
          class="hover:bg-pastelPink/40 text-pastelPink"
        >
          Back to Units
        </UButton>
      </div>

      <!-- Unit Card -->
      <UCard class="overflow-hidden border-0 rounded-2xl shadow-none" style="background-color: #bfead6;">
        <template #header>
          <div class="flex items-center justify-between p-4 bg-pastelGreen text-gray-800 rounded-t-2xl">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-pastelPink flex items-center justify-center">
                <UIcon name="i-heroicons-user-circle" class="w-8 h-8 text-pastelBlue" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-800">{{ unit.Name }}</h1>
                <UBadge class="bg-pastelPink text-gray-700 mt-2">{{ unit.Rarity }}</UBadge>
              </div>
            </div>
          </div>
        </template>

        <!-- Description Section -->
        <div v-if="unit.Description" class="p-6 space-y-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-pastelPink" />
            <h2 class="text-xl font-semibold text-gray-800">Description</h2>
          </div>
          <div class="space-y-4">
            <p v-for="(desc, i) in unit.Description" :key="i" class="text-gray-600 leading-relaxed">
              {{ desc }}
            </p>
          </div>
        </div>

        <!-- Comments Section -->
        <div v-if="unit.Comments" class="p-6 border-t-0 space-y-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 text-pastelPink" />
            <h2 class="text-xl font-semibold text-gray-800">Comments</h2>
          </div>
          <div class="grid gap-4">
            <UCard v-for="(comment, key) in unit.Comments" :key="key" class="bg-pastelPink border-0 rounded-xl">
              <div class="p-4">
                <div class="flex items-center gap-2 mb-2">
                  <UIcon :name="getCommentIcon(key)" class="w-4 h-4 text-pastelBlue" />
                  <div class="font-medium text-gray-800">{{ formatCommentKey(key) }}</div>
                </div>
                <p class="text-gray-700">{{ comment }}</p>
              </div>
            </UCard>
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="text-center py-12 max-w-3xl mx-auto px-4">
      <UIcon name="i-heroicons-exclamation-circle" class="w-12 h-12 text-pastelPink mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Unit Not Found</h2>
      <p class="text-gray-600 mb-4">The requested unit could not be found.</p>
      <UButton to="/" class="bg-pastelPink text-gray-800 hover:bg-pastelPink/80">Return to Units List</UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

interface Unit {
  Name: string
  Description: string[]
  Rarity: string
  Comments: Record<string, string>
}

const route = useRoute()
const unit = ref<Unit | null>(null)
const loading = ref(true)

const getRarityColor = (rarity: string) => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
    'Ubers and Legends': 'primary',
    'CF-Purchasable Specials': 'info',
    'Rare Cats': 'success',
    'Super Rare Cats': 'warning',
    'Normal Cats': 'neutral'
  }
  return colors[rarity] || 'neutral'
}

const getCommentIcon = (key: string) => {
  const icons: Record<string, string> = {
    'own': 'i-heroicons-star',
    'talent': 'i-heroicons-sparkles',
    'tf': 'i-heroicons-arrow-trending-up'
  }
  return icons[key] || 'i-heroicons-chat-bubble-left'
}

const formatCommentKey = (key: string) => {
  const formats: Record<string, string> = {
    'own': 'When to Own',
    'talent': 'Talent Usage',
    'tf': 'True Form Usage'
  }
  return formats[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

onMounted(async () => {
  try {
    const res = await fetch('/units.json')
    const data = await res.json()
    unit.value = data[route.params.id as string]
  } catch (error) {
    console.error('Error loading unit:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.space-y-6 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1.5rem;
}

.space-y-8 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 2rem;
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}
</style> 