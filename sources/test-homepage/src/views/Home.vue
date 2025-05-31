<template>
  <main class="w-full px-4 mt-8 bg-gray-50 font-sans">
    <HeroSection />

    <section class="py-16 bg-peach-50">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-extrabold text-orange-700 mb-6">INUカフェとは？</h2>
        <p class="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          里親制度や子どもたちの現状について、誰もが気軽に学び、話し合える場です。
          温かいコーヒーを片手に、保護犬たちと触れ合いながら、新しい家族との出会いをサポートします。
          定期的にイベントや相談会も開催しています。
        </p>
      </div>
    </section>

    <!-- 新しい家族を待つわんちゃんたち（3件） -->
    <section
      v-if="limitedDogs.length > 0"
      class="mb-12"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-orange-700 mb-6 text-center">
        新着のわんちゃんたち
      </h2>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <DogCard
          v-for="dog in limitedDogs"
          :key="dog.id"
          :dog="dog"
          @click="goToDetail(dog.id)"
        />
      </div>
    </section>

    <section class="py-16 bg-white shadow-inner">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-orange-600 mb-8 text-center">最新のお知らせ</h2>

        <div class="notifications-list">
          <div
            v-for="(notice, index) in displayedNotices"
            :key="notice.filename"
            class="notice-item py-5 px-4 cursor-pointer transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-peach-100 mb-4 last:mb-0"
            :class="{ 'border-b border-peach-200': index < displayedNotices.length - 1 }"
            @click="goDetail(notice.filename)"
          >
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <small class="text-gray-500 text-sm sm:text-base font-medium">{{ notice.date }}</small>
              <h3 class="text-xl font-semibold text-gray-800 leading-tight">{{ notice.title }}</h3>
            </div>
          </div>

          <div v-if="notices.length > DISPLAY_COUNT" class="flex justify-center mt-6">
            <button
              @click="goNotifications"
              aria-label="お知らせ一覧へ"
              class="text-orange-600 hover:text-orange-700 text-xl font-semibold transition-colors duration-300 flex items-center space-x-2"
            >
              <span>もっと見る</span>
              <span class="material-icons text-2xl">arrow_forward_ios</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-r from-orange-400 to-peach-500">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-6">新しい家族を待っている保護犬たち</h2>
        <router-link
          to="/dogList"
          class="inline-flex items-center justify-center bg-white text-orange-600 py-4 sm:py-5 px-8 sm:px-10 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out text-xl sm:text-2xl font-bold shadow-lg transform hover:scale-105"
        >
          <span class="material-icons text-3xl mr-3">pets</span>
          保護犬を探す
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import { fetchDogsWithoutAdopted } from '@/api/fetchDogs';
import DogCard from '@/components/DogCard.vue';

const limitedDogs = ref([]);

// 表示件数などの定数はここにまとめる
const DISPLAY_COUNT = 3  // お知らせの表示件数
const DOG_LIST_COUNT = 3   // 保護犬リスト取得件数（仮）

const noticesRaw = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })

const notices = ref([])          // 全お知らせデータ
const displayedNotices = ref([]) // 表示中のお知らせ

const router = useRouter()

onMounted(async () => {
  try {
    limitedDogs.value = await fetchDogsWithoutAdopted(DOG_LIST_COUNT); // 上位3件だけ取得
  } catch (error) {
    console.error('最新の犬情報取得エラー:', error);
  }
});

/**
 * ファイル名から日付とタイトルをパースする
 * 例: "2025-05-01-犬のイベント.md" -> { date: "2025-05-01", title: "犬のイベント" }
 */
function parseFilename(filename) {
  const base = filename.replace('.md', '')
  const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!match) {
    return { date: '', title: filename }
  }
  const [, date, rawTitle] = match
  // タイトル部分のハイフンをスペースに変換し、URIデコード
  const title = decodeURIComponent(rawTitle.replace(/-/g, ' '))
  return { date, title }
}

function goToDetail(id) {
  router.push(`/dogs/${id}`);
}

/**
 * Markdownの中身からテキスト要約を作成
 */
function createSummary(content) {
  const plain = content
    .replace(/#+\s/g, '')             // 見出し記号削除
    .replace(/[*_>`-]/g, '')          // マーク記号削除
    .replace(/\[.*?\]\(.*?\)/g, '')   // リンク削除
    .replace(/!\[.*?\]\(.*?\)/g, '')  // 画像削除
    .replace(/\n+/g, ' ')             // 改行削除
    .trim()
  return plain.slice(0, 100) + (plain.length > 100 ? '…' : '')
}

/**
 * noticesフォルダ内のmdファイルを全件ロードし、解析してnotices配列に格納
 */
async function loadNotices() {
  const keys = Object.keys(noticesRaw).sort().reverse()

  const tmpList = []
  for (const key of keys) {
    const raw = await noticesRaw[key]()
    const filename = key.split('/').pop()
    const { date, title } = parseFilename(filename)
    const summary = createSummary(raw)
    tmpList.push({ filename, date, title, summary, rawContent: raw })
  }
  notices.value = tmpList
}

/**
 * お知らせ一覧ページへ遷移
 */
function goNotifications() {
  router.push('/notifications')
}

/**
 * お知らせ詳細ページへ遷移
 * @param {string} filename 
 */
function goDetail(filename) {
  const id = filename.replace('.md', '')
  router.push(`/notifications/${id}`)
}

onMounted(async () => {
  await loadNotices()
  // 先頭からDISPLAY_COUNT件だけ表示
  displayedNotices.value = notices.value.slice(0, DISPLAY_COUNT)
})
</script>

<style scoped>
.notice-item {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 軽い影 */
}

.notice-item:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* ホバー時に影を強調 */
  transform: translateY(-2px); /* わずかに上に移動 */
}
</style>
