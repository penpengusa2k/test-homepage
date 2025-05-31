<template>
  <div class="max-w-6xl mx-auto px-4 py-10 bg-peach-50 rounded-lg" v-if="dog">
    <!-- 犬名・詳細見出し -->
    <div class="text-center mb-8">
      <div class="inline-flex flex-col sm:flex-row sm:items-center gap-2 justify-center">
        <h1 class="text-4xl font-extrabold text-orange-700">{{ dog.name }}</h1>
        <span
          class="status-badge px-4 py-1.5 rounded-full text-lg font-semibold"
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

    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- 画像部分 -->
      <div class="md:w-1/2 w-full">
        <div
          class="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-peach-200 cursor-zoom-in flex items-center justify-center bg-peach-100"
          @click="openPhotoSwipe(0)"
        >
          <img
            v-if="dog.images && dog.images.length > 0"
            :src="dog.images[0].url"
            :alt="`${dog.name}の画像`"
            class="w-full h-full object-cover"
          />
          <div v-else class="text-gray-500">画像がありません</div>
        </div>

        <!-- サムネイル -->
        <div v-if="dog.images.length > 1" class="flex mt-4 gap-2 overflow-x-auto">
          <template
            v-for="(image, index) in dog.images.slice(1, displayCount + 1)"
            :key="index + 1"
          >
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border border-peach-100 hover:border-orange-400 transition-colors duration-200 bg-peach-100 flex items-center justify-center"
              @click="openPhotoSwipe(index + 1)"
            >
              <img
                :src="image.url"
                :alt="`${dog.name}の画像 ${index + 2}`"
                class="w-full h-full object-cover"
              />
            </div>
          </template>

          <div
            v-if="dog.images.length > displayCount + 1"
            class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border border-peach-100 bg-peach-100 flex items-center justify-center relative group"
            @click="openPhotoSwipe(displayCount + 1)"
          >
            <img
              :src="dog.images[displayCount + 1].url"
              class="w-full h-full object-cover opacity-50 group-hover:opacity-40"
              :alt="`${dog.name}の画像 ${displayCount + 2}`"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold select-none"
            >
              +{{ dog.images.length - (displayCount + 1) }}枚
            </div>
          </div>
        </div>
      </div>

      <!-- 詳細部分 -->
      <div class="md:w-1/2 w-full">
        <div
          v-for="(detail, index) in details"
          :key="index"
          class="flex justify-between py-3 border-b border-peach-200"
        >
          <div class="w-1/2 pr-4">
            <p class="font-semibold text-peach-900">{{ detail.label1 }}</p>
            <p class="text-peach-700">{{ detail.value1 }}</p>
          </div>
          <div v-if="detail.label2" class="w-1/2 pl-4 border-l border-peach-200">
            <p class="font-semibold text-peach-900">{{ detail.label2 }}</p>
            <p class="text-peach-700">{{ detail.value2 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDogById } from '@/api/fetchDogs';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';

const route = useRoute();
const dog = ref(null);
let lightbox = null;

// 表示するサムネイル枚数（メイン画像は含まない）
const displayCount = 3;

const openPhotoSwipe = async (index = 0) => {
  if (!dog.value || !dog.value.images || dog.value.images.length === 0) {
    console.warn('画像がありません。PhotoSwipeを開けません。');
    return;
  }

  const items = dog.value.images.map((img) => ({
    src: img.url,
    width: img.width || 800,
    height: img.height || 600,
    alt: img.alt || '',
  }));

  if (lightbox && lightbox.pswp) {
    lightbox.pswp.destroy();
    lightbox = null;
    await nextTick();
    openPhotoSwipe(index);
    return;
  }

  lightbox = new PhotoSwipeLightbox({
    pswpModule: () => import('photoswipe'),
    dataSource: items,
    initialIndex: index,
    bgOpacity: 0.85,
    preload: [1, 2],
  });

  lightbox.init();
  lightbox.loadAndOpen(index);
};

onMounted(async () => {
  try {
    dog.value = await fetchDogById(route.params.id);
  } catch (e) {
    console.error('犬データの取得に失敗しました:', e);
  }
});

// 詳細情報を2列にまとめる computed
const details = computed(() => {
  if (!dog.value) return [];

  const rawDetails = [
    { label: '犬種', value: dog.value.breed },
    { label: '性別', value: dog.value.gender },
    { label: '誕生日', value: dog.value.birthday },
    { label: '保護日', value: dog.value.rescueDate },
    { label: '体重', value: dog.value.weight },
    { label: '性格', value: dog.value.character },
    { label: '健康状態', value: dog.value.health },
    { label: 'その他', value: dog.value.notes },
  ];

  const grouped = [];
  for (let i = 0; i < rawDetails.length; i += 2) {
    grouped.push({
      label1: rawDetails[i].label,
      value1: rawDetails[i].value,
      label2: rawDetails[i + 1]?.label || null,
      value2: rawDetails[i + 1]?.value || null,
    });
  }
  return grouped;
});
</script>
