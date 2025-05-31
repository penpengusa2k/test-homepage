<template>
  <div class="max-w-6xl mx-auto px-4 py-10 bg-peach-50 rounded-lg" v-if="dog">
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
            class="w-full h-full object-contain"
          />
          <div v-else class="text-gray-500">画像がありません</div>
        </div>

        <div class="flex mt-4 gap-2 overflow-x-auto">
          <div
            v-for="(image, index) in dog.images"
            :key="index"
            class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border border-peach-100 hover:border-orange-400 transition-colors duration-200 bg-peach-100 flex items-center justify-center"
            @click="openPhotoSwipe(index)"
          >
            <img
              :src="image.url"
              :alt="`${dog.name}の画像 ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 詳細欄 -->
      <div class="md:w-1/2 w-full mt-6 md:mt-0 bg-white p-6 rounded-2xl shadow-lg border border-peach-200">
        <div class="space-y-4">
          <div
            v-for="(item, index) in details"
            :key="index"
            class="grid grid-cols-1 grid-cols-2 gap-y-2 gap-x-4 py-3 border-b border-orange-100 last:border-b-0"
          >
            <div v-if="item.label1">
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

    <!-- 問い合わせボタン / 譲渡済メッセージ -->
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
          このわんちゃんについて<br/>お問い合わせする
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDogById } from '@/api/fetchDogs';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';

const route = useRoute();
const dog = ref(null);
let lightbox = null;

const openPhotoSwipe = async (index = 0) => {
  if (!dog.value || !dog.value.images || dog.value.images.length === 0) {
    console.warn('画像がありません。PhotoSwipeを開けません。');
    return;
  }

  const items = dog.value.images.map(img => ({
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

<style scoped>
/* 必要に応じてカスタムスタイルを追加 */
</style>
