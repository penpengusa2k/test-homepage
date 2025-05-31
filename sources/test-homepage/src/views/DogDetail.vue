<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-peach-100" v-if="dog">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-orange-700 text-center mb-10 drop-shadow-md">
          {{ dog.name }}
        </h1>

        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="md:w-1/2 w-full">
            <div
              class="w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-orange-200 cursor-zoom-in flex items-center justify-center bg-orange-50 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out"
              @click="openPhotoSwipe(0)"
            >
              <img
                v-if="dog.images && dog.images.length > 0"
                :src="dog.images[0].url"
                :alt="`${dog.name}の画像`"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-gray-500 text-center text-xl p-4">画像がありません<br>（準備中）</div>
            </div>

            <div v-if="dog.images.length > 1" class="flex mt-4 gap-3 overflow-x-auto p-1 -m-1">
              <template
                v-for="(image, index) in dog.images.slice(1, displayCount + 1)"
                :key="index + 1"
              >
                <div
                  class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-400 transition-colors duration-200 bg-orange-50 flex items-center justify-center shadow-sm"
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
                class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-400 bg-orange-50 flex items-center justify-center relative group shadow-sm"
                @click="openPhotoSwipe(displayCount + 1)"
              >
                <img
                  :src="dog.images[displayCount + 1].url"
                  class="w-full h-full object-cover opacity-50 group-hover:opacity-40"
                  :alt="`${dog.name}の画像 ${displayCount + 2}`"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xl font-bold select-none"
                >
                  +{{ dog.images.length - (displayCount + 1) }}枚
                </div>
              </div>
            </div>
          </div>

          <div class="md:w-1/2 w-full">
            <div
              v-for="(detail, index) in details"
              :key="index"
              class="flex justify-between py-3 border-b border-gray-200 last:border-b-0"
            >
              <div class="w-1/2 pr-4">
                <p class="font-semibold text-gray-800 text-lg">{{ detail.label1 }}</p>
                <p class="text-gray-700 text-base">{{ detail.value1 }}</p>
              </div>
              <div v-if="detail.label2" class="w-1/2 pl-4 border-l border-gray-200">
                <p class="font-semibold text-gray-800 text-lg">{{ detail.label2 }}</p>
                <p v-if="detail.label2 === 'ステータス'">
                  <span
                    :class="{
                      'text-green-600 font-semibold': detail.value2 === '里親募集中',
                      'text-blue-600 font-semibold': detail.value2 === 'トライアル中',
                      'text-gray-500': detail.value2 === '譲渡済'
                    }"
                    class="text-base"
                  >
                    {{ detail.value2 }}
                  </span>
                </p>
                <p class="text-gray-700 text-base" v-else>{{ detail.value2 }}</p>
              </div>
            </div>

            <div class="w-full text-center mt-12">
              <template v-if="dog.status === '譲渡済'">
                <div
                  class="inline-flex flex-col items-center justify-center bg-gray-100 text-gray-600 py-6 px-8 rounded-xl text-xl font-bold w-full max-w-md mx-auto cursor-not-allowed shadow-md border border-gray-200"
                >
                  <span class="material-icons text-4xl mb-2 text-gray-500">info</span>
                  このわんちゃんは新しい家族と幸せに暮らしています
                </div>
              </template>
              <template v-else>
                <router-link
                  to="/contact"
                  class="inline-flex flex-col sm:flex-row items-center justify-center bg-orange-600 text-white py-5 px-8 rounded-xl hover:bg-orange-700 transition duration-300 ease-in-out text-xl font-bold w-full max-w-md mx-auto shadow-lg transform hover:scale-105 active:scale-95"
                >
                  <span class="material-icons text-3xl mr-0 sm:mr-3 mb-2 sm:mb-0">mail</span>
                  このわんちゃんについて<br class="sm:hidden" />お問い合わせする
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center bg-white p-8 rounded-xl shadow-lg border border-peach-100">
        <p class="text-xl text-gray-600">わんちゃんの情報が見つかりませんでした。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDogById } from '@/api/fetchDogs';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';

const route = useRoute();
const dog = ref(null);
let lightbox = null;

const displayCount = 3; // サムネイルに表示する追加の画像の数

const openPhotoSwipe = async (index = 0) => {
  if (!dog.value || !dog.value.images || dog.value.images.length === 0) return;

  const items = dog.value.images.map((img) => ({
    src: img.url,
    width: img.width || 1200, // 大きめのデフォルト値に調整
    height: img.height || 900, // 大きめのデフォルト値に調整
    alt: img.alt || '',
  }));

  // 既存のlightboxインスタンスがある場合は破棄して再作成
  // これにより、新しいクリックで確実にlightboxが開き直される
  if (lightbox && lightbox.pswp) {
    lightbox.pswp.destroy();
    lightbox = null;
    await nextTick(); // DOMの更新を待つ
  }

  lightbox = new PhotoSwipeLightbox({
    pswpModule: () => import('photoswipe'),
    dataSource: items,
    initialIndex: index,
    bgOpacity: 0.85,
    paddingFn: (viewportSize, itemData) => {
        return {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30
        };
    },
    preload: [1, 2], // 現在の画像から前後1-2枚を事前にロード
  });

  lightbox.init();
  lightbox.loadAndOpen(index);
};

onMounted(async () => {
  try {
    dog.value = await fetchDogById(route.params.id);
  } catch (e) {
    console.error('犬データの取得に失敗しました:', e);
    dog.value = null; // エラー時は犬データをnullに設定
  }
});

// コンポーネトがアンマウントされるときにPhotoSwipeを破棄
onUnmounted(() => {
  if (lightbox && lightbox.pswp) {
    lightbox.pswp.destroy();
    lightbox = null;
  }
});


const details = computed(() => {
  if (!dog.value) return [];

  const rawDetails = [
    { label: '名前', value: dog.value.name },
    { label: 'ステータス', value: dog.value.status },
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
/* カスタムスタイルはTailwind CSSでほぼカバーされています */
/* PhotoSwipeのデフォルトスタイルはphotoswipe.cssで提供されます */
</style>