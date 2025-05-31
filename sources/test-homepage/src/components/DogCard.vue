<template>
  <div
    class="bg-white rounded-xl shadow-lg border border-peach-100 overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300 relative transform hover:scale-102"
    @click="$emit('click')"
    :class="{ 'opacity-60 pointer-events-none': dog.status === '譲渡済' }"
  >
    <div class="relative w-full h-52 overflow-hidden">
      <span
        v-if="isNew"
        class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10"
      >
        NEW
      </span>

      <img
        :src="dog.images?.[0]?.url"
        alt="犬の写真"
        class="w-full h-full object-include bg-orange-50"
      />

      <div
        v-if="dog.status === '譲渡済'"
        class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white text-xl font-extrabold tracking-wide"
      >
        <span class="material-icons text-3xl mr-2">pets</span>
        譲渡済み
      </div>
    </div>

    <div class="p-4 sm:p-5 text-center">
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-2">
        <h2 class="text-xl sm:text-2xl font-bold text-orange-700 leading-tight">{{ dog.name }}</h2>
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

      <div class="text-sm text-gray-700 mb-3">
        <p class="font-medium">{{ dog.breed }}</p>
      </div>

      <div class="mt-auto flex justify-center">
        <span
          class="status-badge px-3 py-1 rounded-full text-sm font-semibold"
          :class="{
            'bg-green-100 text-green-700': dog.status === '里親募集中',
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
import { computed } from 'vue';

const props = defineProps({
  dog: Object
});

// ✅ 作成日が30日以内かつ譲渡済以外なら「NEW」バッジ表示
const isNew = computed(() => {
  if (!props.dog) return false;
  if (props.dog.status === '譲渡済') return false;
  const createdAt = new Date(props.dog.createdAt);
  const now = new Date();
  const diffInMs = now - createdAt;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays <= 30;
});
</script>

<style scoped>
.status-badge {
  white-space: nowrap;
}
</style>