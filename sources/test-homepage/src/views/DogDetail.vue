<template>
  <div class="max-w-3xl mx-auto px-4 py-8" v-if="dog">
    <img
      :src="dog.image?.url"
      alt="犬の画像"
      class="w-full h-64 object-cover rounded-xl"
    />

    <div class="mt-6 space-y-2">
      <h2 class="text-2xl font-bold">{{ dog.name }}</h2>
      <p class="text-gray-700">犬種: {{ dog.breed }}</p>
      <p class="text-gray-700">性別: {{ dog.gender }}</p>
      <p class="text-gray-700">年齢: {{ dog.age }}歳</p>
      <p class="text-gray-700">性格: {{ dog.character }}</p>
      <p class="text-gray-700">健康状態: {{ dog.health }}</p>
      <p class="text-gray-700">保護日: {{ formatDate(dog.rescueDate) }}</p>
      <p class="text-gray-700">ステータス: {{ dog.status }}</p>
      <p v-if="dog.notes" class="text-gray-700">備考: {{ dog.notes }}</p>
    </div>

    <div class="mt-6">
      <button
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        :disabled="dog.status !== '募集中'"
      >
        譲渡希望する
      </button>
      <p v-if="dog.status !== '募集中'" class="text-sm text-red-500 mt-2">
        現在この子は「{{ dog.status }}」のため、譲渡はできません。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const dog = ref(null);

onMounted(async () => {
  const domain = import.meta.env.VITE_MICROCMS_DOMAIN;
  const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
  const url = `https://${domain}.microcms.io/api/v1/dogs/${route.params.id}`;

  try {
    const response = await axios.get(url, {
      headers: { 'X-MICROCMS-API-KEY': apiKey }
    });
    dog.value = response.data;
  } catch (error) {
    console.error('詳細取得エラー:', error);
  }
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP');
}
</script>
