<template>
  <div class="p-6 bg-peach-50 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-8">
      新しい家族を待つわんちゃんたち
    </h1>

    <div class="mb-10 bg-peach-100 p-6 rounded-2xl shadow-lg border border-peach-200">
      <!-- 犬種で絞り込み -->
      <div class="mb-6">
        <label for="breed-select" class="block text-orange-700 text-lg font-bold mb-3">
          犬種で絞り込む:
        </label>
        <select
          id="breed-select"
          v-model="selectedBreed"
          class="block w-full p-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-orange-400 text-gray-700 transition duration-200 ease-in-out"
        >
          <option value="">すべての犬種</option>
          <option v-for="breed in availableBreeds" :key="breed" :value="breed">
            {{ breed }}
          </option>
        </select>
      </div>

      <!-- ステータスで絞り込み -->
      <div class="mb-6">
        <label class="block text-orange-700 text-lg font-bold mb-3">
          ステータスで絞り込む:
        </label>
        <div class="flex flex-wrap gap-x-6 gap-y-3">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value=""
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">すべて</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="里親募集中"
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">里親募集中</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="トライアル中"
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">トライアル中</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="譲渡済"
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">譲渡済</span>
          </label>
        </div>
      </div>

      <!-- 性別で絞り込み -->
      <div>
        <label class="block text-orange-700 text-lg font-bold mb-3">
          性別で絞り込む:
        </label>
        <div class="flex flex-wrap gap-x-6 gap-y-3">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedGender"
              value=""
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">すべて</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedGender"
              value="男の子"
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">男の子</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="selectedGender"
              value="女の子"
              class="form-radio h-5 w-5 text-orange-600 border-orange-300 focus:ring-orange-400 transition duration-150 ease-in-out"
            />
            <span class="ml-2 text-gray-700 text-base">女の子</span>
          </label>
        </div>

        <!-- クリアボタン -->
        <div class="mt-4 text-right">
          <button
            @click="clearFilters"
            class="px-6 py-2 text-orange-400 font-bold underline hover:text-orange-500 transition"
          >
            絞り込みをクリア
          </button>
        </div>
      </div>
    </div>

    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <DogCard
        v-for="dog in filteredAndSortedDogs"
        :key="dog.id"
        :dog="dog"
        @click="goToDetail(dog.id)"
      />
    </div>

    <div v-if="filteredAndSortedDogs.length === 0" class="text-center mt-12 py-8 bg-white rounded-lg shadow-md border border-orange-100">
      <p class="text-gray-600 text-xl font-medium mb-4">
        <span class="material-icons text-4xl text-orange-500 block mb-2">pets</span>
        ご希望の条件に合うわんちゃんは見つかりませんでした。
      </p>
      <p class="text-gray-500">
        条件を変更して再度お探しください。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchDogs } from '@/api/fetchDogs';
import DogCard from '@/components/DogCard.vue';
import { useRouter } from 'vue-router';

const allDogs = ref([]);
const selectedBreed = ref('');
const selectedStatus = ref('');
const selectedGender = ref('');
const router = useRouter();

onMounted(async () => {
  try {
    const fetchedDogs = await fetchDogs();
    allDogs.value = fetchedDogs;
  } catch (error) {
    console.error('犬データ取得エラー:', error);
  }
});

const availableBreeds = computed(() => {
  const breeds = new Set();
  allDogs.value.forEach(dog => {
    if (dog.breed) {
      breeds.add(dog.breed);
    }
  });
  return Array.from(breeds).sort();
});

const filteredAndSortedDogs = computed(() => {
  let filtered = allDogs.value;

  if (selectedBreed.value) {
    filtered = filtered.filter(dog => dog.breed === selectedBreed.value);
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(dog => dog.status === selectedStatus.value);
  }

  if (selectedGender.value) {
    filtered = filtered.filter(dog => dog.gender === selectedGender.value);
  }

  return filtered.sort((a, b) => {
    if (a.status === '譲渡済' && b.status !== '譲渡済') {
      return 1;
    }
    if (a.status !== '譲渡済' && b.status === '譲渡済') {
      return -1;
    }
    return 0;
  });
});

function goToDetail(id) {
  router.push(`/dogs/${id}`);
}

function clearFilters() {
  selectedBreed.value = '';
  selectedStatus.value = '';
  selectedGender.value = '';
}
</script>

<style scoped>
</style>
