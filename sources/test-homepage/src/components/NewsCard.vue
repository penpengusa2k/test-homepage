<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ease-in-out border border-peach-200">
    <p class="text-base text-gray-500 mb-2">{{ date }}</p>
    <h3 class="text-xl font-bold text-orange-600 mb-2 leading-snug">
      {{ title }}
    </h3>
    <p class="text-gray-700 text-base line-clamp-2">
      {{ summary }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  date: String,
  summary: String
})
</script>

<style scoped>
/* 必要に応じて、Tailwind CSSでカバーできない部分や微調整をここに追加 */
/* line-clamp-2 は Tailwind CSS のプラグインが必要な場合があります */
/* tailwind.config.js に require('@tailwindcss/line-clamp') を追加してください */
</style>