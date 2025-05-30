<template>
  <div class="max-w-6xl mx-auto px-4 py-10 bg-peach-50 rounded-lg" v-if="dog">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-orange-700 mb-2">{{ dog.name }}</h1>
      <span
        class="status-badge px-4 py-1.5 rounded-full text-lg font-semibold"
        :class="{
          'bg-green-100 text-green-700': dog.status === '募集中',
          'bg-blue-100 text-blue-700': dog.status === 'トライアル中',
          'bg-gray-200 text-gray-600': dog.status === '譲渡済'
        }"
      >
        {{ dog.status }}
      </span>
    </div>

    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="md:w-1/2 w-full">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          pagination
          class="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-peach-200"
        >
          <SwiperSlide
            v-for="(image, index) in dog.images"
            :key="index"
            @click="openModal(index)"
            class="cursor-zoom-in bg-peach-100 flex items-center justify-center"
          >
            <img
              :src="image.url"
              :alt="`${dog.name}の画像 ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <!-- PhotoSwipeのモーダルはJSで生成するのでテンプレート不要 -->
      </div>

      <div class="md:w-1/2 w-full mt-6 md:mt-0 bg-white p-6 rounded-2xl shadow-lg border border-peach-200">
        <div class="space-y-4">
          <div
            v-for="(item, index) in details"
            :key="index"
            class="grid grid-cols-1 grid-cols-2 gap-y-2 gap-x-4 py-3 border-b border-orange-100 last:border-b-0"
          >
            <div>
              <span class="font-bold text-orange-700 text-lg">{{ item.label1 }}</span><br />
              <span class="text-gray-700 text-base">{{ item.value1 }}</span>
            </div>

            <div v-if="item.label2">
              <span class="font-bold text-orange-700 text-lg">{{ item.label2 }}</span><br />
              <span class="text-gray-700 text-base">{{ item.value2 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full text-center mt-12">
      <template v-if="dog.status === '譲渡済'">
        <div
          class="inline-flex flex-col items-center justify-center bg-gray-200 text-gray-600 py-6 px-8 rounded-full text-2xl font-bold w-full max-w-md mx-auto cursor-not-allowed shadow-md"
        >
          <span class="material-icons text-4xl mb-2">info</span>
          このわんちゃんは新しい家族と幸せに暮らしています
        </div>
      </template>
      <template v-else>
        <router-link
          to="/contact"
          class="inline-flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-orange-400 to-peach-500 text-white py-5 px-8 rounded-full hover:bg-orange-500 transition duration-300 ease-in-out text-2xl font-bold w-full max-w-md mx-auto shadow-lg transform hover:scale-105"
        >
          <span class="material-icons text-3xl mr-0 sm:mr-3 mb-2 sm:mb-0">mail</span>
          このわんちゃんについて<br class="sm:hidden" />お問い合わせする
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { fetchDogById } from '@/api/fetchDogs';
import 'swiper/css';
import 'swiper/css/pagination';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const route = useRoute();
const dog = ref(null);
const lightbox = ref(null);

function openModal(index) {
  if (!lightbox.value) return;
  lightbox.value.loadAndOpen(index);
}

onMounted(async () => {
  try {
    dog.value = await fetchDogById(route.params.id);
  } catch (error) {
    console.error('犬詳細データ取得エラー:', error);
  }

  // PhotoSwipeの初期化
  lightbox.value = new PhotoSwipeLightbox({
    gallery: '.swiper', // Swiperの親クラスを指定
    children: 'img', // 子要素（画像）を指定
    pswpModule: () => import('photoswipe'),
  });
  lightbox.value.init();
});

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
    lightbox.value = null;
  }
});

function formatDate(dateStr) {
  if (!dateStr) return '不明';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '不明';
  return date.toLocaleDateString('ja-JP');
}

const details = computed(() => {
  if (!dog.value) return [];

  const getValueOrDefault = (value, defaultValue = '不明') => {
    return value !== null && value !== undefined && value !== '' ? value : defaultValue;
  };

  return [
    {
      label1: '犬種',
      value1: getValueOrDefault(dog.value.breed),
      label2: '性別',
      value2: getValueOrDefault(dog.value.gender),
    },
    {
      label1: '誕生日',
      value1: formatDate(dog.value.birthday),
      label2: '体重',
      value2: dog.value.weight ? `${dog.value.weight} kg` : '不明',
    },
    {
      label1: '保護日',
      value1: formatDate(dog.value.rescueDate),
      label2: '健康状態',
      value2: getValueOrDefault(dog.value.health),
    },
    {
      label1: '性格',
      value1: getValueOrDefault(dog.value.character),
      label2: '備考',
      value2: getValueOrDefault(dog.value.notes, '特になし'),
    },
  ];
});
</script>

<style scoped>
.status-badge {
  white-space: nowrap;
}
</style>
