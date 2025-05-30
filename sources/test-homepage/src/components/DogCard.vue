<template>
  <div
    class="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300 relative"
    @click="$emit('click')"
    :class="{ 'opacity-50 pointer-events-none': dog.status === '譲渡済' }"
  >
    <!-- 犬の画像ラッパー -->
    <div class="relative">
      <img
        :src="dog.images?.[0]?.url"
        alt="犬の写真"
        class="w-full h-52 object-cover bg-gray-100"
      />

      <!-- 譲渡済みラベル -->
      <div
        v-if="dog.status === '譲渡済'"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-lg font-bold"
      >
        譲渡済みです
      </div>
    </div>

    <!-- 名前と性別 -->
    <div class="px-4 py-3 text-center">
      <div class="flex justify-center items-center gap-2 mb-1">
        <h2 class="text-xl font-bold text-gray-800">{{ dog.name }}</h2>
        <span
          v-if="dog.gender === '男の子'"
          class="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full"
        >
          ♂ 男の子
        </span>
        <span
          v-else-if="dog.gender === '女の子'"
          class="text-xs bg-pink-100 text-pink-700 font-semibold px-2 py-0.5 rounded-full"
        >
          ♀ 女の子
        </span>
      </div>

      <!-- 犬種 -->
      <div class="flex justify-center gap-6 text-sm text-gray-600 mt-2">
        <div class="flex flex-col items-center">
          {{ dog.breed }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dog: Object
});
</script>
