<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">保護犬一覧</h1>

    <div class="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div class="mb-4">
        <label for="breed-select" class="block text-gray-700 text-sm font-bold mb-2">犬種で絞り込む:</label>
        <select
          id="breed-select"
          v-model="selectedBreed"
          class="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">すべての犬種</option>
          <option v-for="breed in availableBreeds" :key="breed" :value="breed">
            {{ breed }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">ステータスで絞り込む:</label>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="selectedStatus"
              value=""
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2 text-gray-700">すべて</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="selectedStatus"
              value="募集中"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2 text-gray-700">募集中</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="selectedStatus"
              value="トライアル中"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2 text-gray-700">トライアル中</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="selectedStatus"
              value="譲渡済"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2 text-gray-700">譲渡済</span>
          </label>
        </div>
      </div>
    </div>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <DogCard
        v-for="dog in filteredAndSortedDogs"
        :key="dog.id"
        :dog="dog"
        @click="goToDetail(dog.id)"
      />
    </div>

    <div v-if="filteredAndSortedDogs.length === 0" class="text-center text-gray-500 mt-8">
      選択された条件に一致するわんちゃんは見つかりませんでした。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchDogs } from '@/api/fetchDogs'; // 犬データを取得するAPI関数
import DogCard from '@/components/DogCard.vue'; // 各犬を表示するコンポーネント
import { useRouter } from 'vue-router'; // ルーティング用

const allDogs = ref([]); // 全ての犬データを保持（フィルタリング前の元データ）
const selectedBreed = ref(''); // 選択された犬種を保持
const selectedStatus = ref(''); // 選択されたステータスを保持
const router = useRouter();

// コンポーネントがマウントされた時に犬データを取得
onMounted(async () => {
  try {
    const fetchedDogs = await fetchDogs();
    allDogs.value = fetchedDogs; // 取得したデータをallDogsに保存
  } catch (error) {
    console.error('犬データ取得エラー:', error);
  }
});

// 利用可能な犬種のリストを動的に生成
const availableBreeds = computed(() => {
  const breeds = new Set(); // 重複を防ぐためにSetを使う
  allDogs.value.forEach(dog => {
    if (dog.breed) {
      breeds.add(dog.breed);
    }
  });
  // Setを配列に変換し、アルファベット順にソート (任意)
  return Array.from(breeds).sort();
});

// フィルタリングとソートを組み合わせた計算プロパティ
const filteredAndSortedDogs = computed(() => {
  let filtered = allDogs.value;

  // 1. 犬種によるフィルタリング
  if (selectedBreed.value) {
    filtered = filtered.filter(dog => dog.breed === selectedBreed.value);
  }

  // 2. ステータスによるフィルタリング
  if (selectedStatus.value) {
    filtered = filtered.filter(dog => dog.status === selectedStatus.value);
  }

  // 3. 譲渡済みの犬を最後にソート
  return filtered.sort((a, b) => {
    if (a.status === '譲渡済' && b.status !== '譲渡済') {
      return 1;
    }
    if (a.status !== '譲渡済' && b.status === '譲渡済') {
      return -1;
    }
    return 0; // その他の場合は順序を変えない
  });
});

// 犬の詳細ページへ遷移
function goToDetail(id) {
  router.push(`/dogs/${id}`);
}
</script>

<style scoped>
/* 必要であれば追加のスタイルをここに記述 */
</style>