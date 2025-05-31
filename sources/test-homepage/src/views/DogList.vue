<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-orange-700 text-center mb-10 drop-shadow-md">
        新しい家族を待つわんちゃんたち
      </h1>

      <div class="mb-12 bg-white p-5 sm:p-6 rounded-xl shadow-lg border border-peach-100">

        <div class="mb-6">
          <label for="breed-select" class="block text-orange-700 text-base font-bold mb-2">
            <span class="material-icons text-lg align-middle mr-1">pets</span>犬種:
          </label>
          <select
            id="breed-select"
            v-model="selectedBreed"
            class="block w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-700 text-sm transition duration-200 ease-in-out appearance-none bg-white pr-8"
          >
            <option value="">すべての犬種</option>
            <option v-for="breed in availableBreeds" :key="breed" :value="breed">
              {{ breed }}
            </option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block text-orange-700 text-base font-bold mb-2">
            <span class="material-icons text-lg align-middle mr-1">info</span>ステータス:
          </label>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedStatus"
                value=""
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">すべて</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedStatus"
                value="里親募集中"
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">里親募集中</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedStatus"
                value="トライアル中"
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">トライアル中</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedStatus"
                value="譲渡済"
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">譲渡済</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-orange-700 text-base font-bold mb-2">
            <span class="material-icons text-lg align-middle mr-1">wc</span>性別:
          </label>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedGender"
                value=""
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">すべて</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedGender"
                value="男の子"
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">男の子</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                v-model="selectedGender"
                value="女の子"
                class="form-radio h-4 w-4 text-orange-600 border-orange-300 focus:ring-2 focus:ring-orange-400 transition duration-150 ease-in-out"
              />
              <span class="ml-2 text-gray-700 text-sm">女の子</span>
            </label>
          </div>
        </div>

        <div class="mt-6 text-right">
          <button
            @click="clearFilters"
            class="inline-flex items-center px-4 py-1 text-orange-500 font-bold underline hover:text-orange-600 transition-colors duration-200 text-sm"
          >
            <span class="material-icons text-lg mr-1">cancel</span>
            絞り込みをクリア
          </button>
        </div>
      </div>

      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <DogCard
          v-for="dog in filteredAndSortedDogs"
          :key="dog.id"
          :dog="dog"
          @click="goToDetail(dog.id)"
        />
      </div>

      <div v-if="filteredAndSortedDogs.length === 0" class="text-center mt-16 py-12 bg-white rounded-xl shadow-lg border border-orange-100">
        <p class="text-gray-600 text-2xl font-medium mb-4">
          <span class="material-icons text-6xl text-orange-500 block mb-4">sentiment_dissatisfied</span>
          ご希望の条件に合うわんちゃんは見つかりませんでした。
        </p>
        <p class="text-gray-500 text-lg">
          条件を変更して再度お探しいただくか、<br>
          <router-link to="/contact" class="text-orange-600 hover:underline">お問い合わせ</router-link>よりご相談ください。
        </p>
      </div>
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

  // 譲渡済の犬をリストの最後に表示
  return filtered.sort((a, b) => {
    if (a.status === '譲渡済' && b.status !== '譲渡済') {
      return 1;
    }
    if (a.status !== '譲渡済' && b.status === '譲渡済') {
      return -1;
    }
    // それ以外の場合は元の順序を維持（またはIDなどでソート）
    return 0; // 必要に応じて return a.id - b.id; などを追加
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
/* カスタムスタイルは不要になりました。全てTailwind CSSクラスで表現されています。 */
/* select要素のデフォルト矢印を非表示にし、カスタム矢印をCSSで追加したい場合は、別途スタイルが必要です。
   ここではappearance-noneでデフォルトの矢印を非表示にしています。
   カスタム矢印を追加する場合は、::after 擬似要素などを使用します。
*/
</style>