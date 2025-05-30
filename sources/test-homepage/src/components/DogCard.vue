<template>
  <div
    class="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300 relative transform hover:-translate-y-1"
    @click="$emit('click')"
    :class="{ 'opacity-60 pointer-events-none': dog.status === '譲渡済' }"
  >
    <div class="relative w-full h-52 overflow-hidden">
      <img
        :src="dog.images?.[0]?.url"
        alt="犬の写真"
        class="w-full h-full object-include bg-peach-50"
      />

      <div
        v-if="dog.status === '譲渡済'"
        class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white text-2xl font-extrabold tracking-wide"
      >
        <span class="material-icons text-4xl mr-2">pets</span>
        譲渡済み
      </div>
    </div>

    <div class="p-4 sm:p-5 text-center">
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-2">
        <h2 class="text-2xl font-bold text-orange-700 leading-tight">{{ dog.name }}</h2>
        <span
          v-if="dog.gender === '男の子'"
          class="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1"
        >
          <span class="material-icons text-base">male</span>
          男の子
        </span>
        <span
          v-else-if="dog.gender === '女の子'"
          class="text-xs bg-pink-100 text-pink-700 font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1"
        >
          <span class="material-icons text-base">female</span>
          女の子
        </span>
      </div>

      <div class="text-sm text-gray-600 mb-3">
        <p class="font-medium">{{ dog.breed }}</p>
        </div>

      <div class="mt-auto flex justify-center">
        <span
          class="status-badge px-3 py-1 rounded-full text-sm font-semibold"
          :class="{
            'bg-green-100 text-green-700': dog.status === '募集中',
            'bg-blue-100 text-blue-700': dog.status === 'トライアル中',
            'bg-gray-200 text-gray-600': dog.status === '譲渡済'
          }"
        >
          {{ dog.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dog: Object
});
</script>

<style scoped>
/* 必要であれば追加のスタイルをここに記述 */
/* たとえば、status-badgeの細かな調整など */
.status-badge {
  white-space: nowrap; /* テキストの折り返しを防ぐ */
}
</style>