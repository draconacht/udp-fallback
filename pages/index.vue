<template>
  <div class="max-w-4xl mx-auto px-4 py-8 font-sans space-y-10">
    <h1 class="text-3xl font-bold text-center mb-8">Units</h1>
    <nav class="flex flex-wrap justify-center gap-3 mb-8">
      <a v-for="rarity in orderedRarities" :key="rarity" :href="`#toc-${rarity.replace(/\s+/g, '-')}`" class="bg-pastelGreen text-gray-800 rounded-lg px-4 py-2 font-medium shadow hover:bg-pastelPink/60 transition-colors border border-pastelPink/40 cursor-pointer">
        {{ rarity }}
      </a>
    </nav>
    <div v-for="(rarity, idx) in orderedRarities" :key="idx" class="space-y-4">
      <template v-if="getUnitsByRarity(rarity).length">
        <div :id="`toc-${rarity.replace(/\s+/g, '-')}`" class="bg-pastelPink text-gray-800 rounded-xl px-4 py-2 text-xl font-semibold text-center">{{ rarity }}</div>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink
            v-for="unit in getUnitsByRarity(rarity)"
            :key="unit.id"
            :to="`/units/${unit.id}`"
            class="bg-gray-50 text-gray-800 rounded-lg px-4 py-2 font-medium shadow hover:bg-pastelPink/60 transition-colors border border-pastelPink/40"
          >
            {{ unit.Name }}
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const units = ref<Record<string, any>>({})

onMounted(async () => {
  const res = await fetch('/units.json')
  units.value = await res.json()
})

const orderedRarities: string[] = [
  'Ubers and Legends',
  'Super Rare Cats',
  'Rare Cats',
  'CF-Purchasable Specials',
  'Gacha Super Rares',
  'Normal Cats',
  'Advent and Cyclone Drops',
  'Story Legends',
]

const unitsByRarity = computed(() => {
  const byRarity: Record<string, { id: string, Name: string }[]> = {}
  for (const [id, unit] of Object.entries(units.value)) {
    if (!byRarity[unit.Rarity]) byRarity[unit.Rarity] = []
    byRarity[unit.Rarity].push({ ...unit, id })
  }
  for (const rarity in byRarity) {
    byRarity[rarity].sort((a, b) => a.Name.localeCompare(b.Name))
  }
  return byRarity
})

function getUnitsByRarity(rarity: string) {
  return unitsByRarity.value[rarity] || []
}
</script> 