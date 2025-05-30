<template>
  <div class="max-w-5xl mx-auto px-4 py-8" v-if="dog">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- 画像スワイパー -->
      <div class="md:w-1/2">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          pagination
          class="w-full h-64 rounded-xl overflow-hidden"
        >
          <SwiperSlide
            v-for="(image, index) in dog.images"
            :key="index"
            @click="openModal(index)"
            class="cursor-zoom-in"
          >
            <img
              :src="image.url"
              alt="犬の画像"
              class="w-full h-full object-contain"
            />
          </SwiperSlide>
        </Swiper>

        <!-- モーダル -->
        <div
          v-if="modalOpen"
          class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          @click.self="closeModal"
          @touchstart.self="closeModal"
        >
          <Swiper
            :modules="[Navigation, Pagination]"
            :slides-per-view="1"
            :initial-slide="currentIndex"
            navigation
            pagination
            loop
            class="w-full max-h-[90vh]"
          >
            <SwiperSlide
              v-for="(image, index) in dog.images"
              :key="'modal-' + index"
              @click="closeModal"
            >
              <img
                :src="image.url"
                alt="犬の画像"
                class="w-full max-h-[90vh] object-contain"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <!-- 犬の詳細 -->
      <div class="md:w-1/2 mt-6 md:mt-0">
        <div class="space-y-2">
          <div
            v-for="(item, index) in details"
            :key="index"
            class="grid grid-cols-2 gap-y-2 gap-x-4 py-2 border-b border-gray-200 last:border-b-0"
          >
            <!-- 左側 -->
            <div>
              <span class="font-bold">{{ item.label1 }}</span><br />
              <span>{{ item.value1 }}</span>
            </div>

            <!-- 右側（ラベル2がある場合のみ表示） -->
            <div v-if="item.label2">
              <span class="font-bold">{{ item.label2 }}</span><br />
              <span>{{ item.value2 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ボタン -->
    <div class="w-full text-center mt-8">
        <template v-if="dog.status === '譲渡済'">
            <div
            class="inline-flex items-center justify-center bg-gray-300 text-gray-600 py-4 rounded-lg text-xl font-semibold w-full block px-4 cursor-not-allowed"
            >
            <span class="material-icons text-2xl mr-2">info</span>
            譲渡済みのわんちゃんです
            </div>
        </template>
        <template v-else>
            <router-link
            to="/contact"
            class="inline-flex items-center justify-center bg-orange-400 text-white py-4 rounded-lg hover:bg-orange-500 transition duration-300 ease-in-out text-xl font-semibold w-full block px-4"
            >
            <span class="material-icons text-2xl mr-2">search</span>
            このわんちゃんについて<br />
            お問い合わせする
            </router-link>
        </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import { fetchDogById } from '@/api/fetchDogs';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const route = useRoute();
const dog = ref(null);
const modalOpen = ref(false);
const currentIndex = ref(0);

function openModal(index) {
  currentIndex.value = index;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

onMounted(async () => {
  document.addEventListener('keydown', handleKeydown);
  try {
    dog.value = await fetchDogById(route.params.id);
  } catch (error) {
    console.error('詳細取得エラー:', error);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

function formatDate(dateStr) {
  if (!dateStr) return '不明';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP');
}

const details = computed(() => {
  if (!dog.value) return [];

  const list = [
    {
      label1: '名前',
      value1: dog.value.name,
      label2: 'ステータス',
      value2: dog.value.status,
    },
    {
      label1: '犬種',
      value1: dog.value.breed,
      label2: '性別',
      value2: dog.value.gender,
    },
    {
      label1: '誕生日',
      value1: formatDate(dog.value.birthday),
      label2: '保護日',
      value2: formatDate(dog.value.rescueDate),
    },
    {
      label1: '体重',
      value1: dog.value.weight,
      label2: '健康状態',
      value2: dog.value.health,
    },
    {
      label1: '性格',
      value1: dog.value.character,
      label2: '備考',
      value2: dog.value.notes || '特になし',
    },
  ];

  return list;
});
</script>

<style scoped>
/* モーダルのスクロール防止や細かい調整はここに */
/* borderは行区切りの下線だけなのでtableの枠線はなし */
</style>
