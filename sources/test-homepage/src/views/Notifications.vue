<template>
  <div class="notifications bg-peach-50 min-h-screen py-10">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-8">
        お知らせ
      </h1>

      <div class="notice-list space-y-6">
        <div 
          v-for="notice in pagedNotices" 
          :key="notice.filename" 
          class="notice-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out border border-peach-200" 
          @click="goDetail(notice.filename)"
        >
          <div class="p-6">
            <small class="text-sm text-gray-500 block mb-2">{{ notice.date }}</small>
            <h2 class="text-xl font-bold text-orange-600 mb-2 leading-snug">{{ notice.title }}</h2>
            <p class="text-gray-700 text-base line-clamp-2">{{ notice.summary }}</p>
          </div>
        </div>
      </div>

      <div v-if="pageCount > 1" class="pagination flex justify-center items-center gap-3 mt-10">
        <button 
          @click="goPage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="px-4 py-2 rounded-lg border border-orange-300 bg-white text-orange-600 font-semibold shadow-sm hover:bg-peach-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          aria-label="前のページ"
        >
          &lt; 前へ
        </button>
        <button
          v-for="n in pageCount"
          :key="n"
          @click="goPage(n)"
          :class="{ 
            'bg-orange-600 text-white shadow-md': n === currentPage, 
            'bg-white text-gray-700 border border-orange-300 hover:bg-peach-100': n !== currentPage 
          }"
          class="px-4 py-2 rounded-lg font-semibold transition duration-200"
          :aria-current="n === currentPage ? 'page' : undefined"
        >
          {{ n }}
        </button>
        <button 
          @click="goPage(currentPage + 1)" 
          :disabled="currentPage === pageCount"
          class="px-4 py-2 rounded-lg border border-orange-300 bg-white text-orange-600 font-semibold shadow-sm hover:bg-peach-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          aria-label="次のページ"
        >
          次へ &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const notices = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })

const noticeList = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

const router = useRouter()

function parseFilename(filename) {
  const base = filename.replace('.md', '')
  const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!match) {
    console.warn(`ファイル名解析失敗: ${filename}`);
    return { date: '', title: filename };
  }
  const [, date, rawTitle] = match
  // ファイル名から取得したタイトルをデコードし、ハイフンをスペースに変換
  const title = decodeURIComponent(rawTitle.replace(/-/g, ' '));
  return { date, title }
}

function createSummary(content) {
  const plain = content
    .replace(/#+\s/g, '')             // 見出し記号削除
    .replace(/[*_>`-]/g, '')          // マーク記号削除
    .replace(/\[.*?\]\(.*?\)/g, '')   // リンク削除
    .replace(/!\[.*?\]\(.*?\)/g, '')  // 画像削除
    .replace(/\n+/g, ' ')             // 改行削除
    .trim()
  return plain.slice(0, 150) + (plain.length > 150 ? '…' : '') // 概要の文字数を少し長く調整
}

async function loadNotices() {
  const keys = Object.keys(notices).sort().reverse() // 新しいお知らせが上にくるように逆順にソート

  const tmpList = []
  for (const key of keys) {
    try {
      const raw = await notices[key]();
      const filename = key.split('/').pop();
      const { date, title } = parseFilename(filename);
      const summary = createSummary(raw);
      tmpList.push({ filename, date, title, summary, rawContent: raw });
    } catch (error) {
      console.error(`お知らせファイルの読み込みエラー: ${key}`, error);
    }
  }
  noticeList.value = tmpList;
}

const pageCount = computed(() => Math.ceil(noticeList.value.length / itemsPerPage))

const pagedNotices = computed(() =>
  noticeList.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

function goPage(n) {
  if (n < 1 || n > pageCount.value) return
  currentPage.value = n
  // ページトップへスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goDetail(filename) {
  const id = filename.replace('.md', '')
  router.push(`/notifications/${id}`)
}

onMounted(loadNotices)
</script>

<style scoped>
/* スタイルはTailwind CSSクラスでほとんど置き換えられたため、ここには最小限の調整のみ残します */
/* もしカスタムフォントを使用する場合は、グローバルCSSで設定してください */

/* line-clamp-2 は Tailwind CSS のプラグインが必要な場合があります */
/* tailwind.config.js に require('@tailwindcss/line-clamp') を追加してください */
/* plugins: [
 * require('@tailwindcss/line-clamp'),
 * ],
 */
</style>