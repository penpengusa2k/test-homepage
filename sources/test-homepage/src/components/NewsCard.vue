<template>
  <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
    <p class="text-sm text-gray-500 mb-2">{{ date }}</p>
    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm">{{ summary }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  date: String,
  summary: String
})
</script>
