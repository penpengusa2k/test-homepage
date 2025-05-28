<template>
  <div class="notifications">
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">お知らせ</h1>
      <div class="notice-list">
        <div v-for="notice in pagedNotices" :key="notice.filename" class="notice-card" @click="goDetail(notice.filename)">
          <small>{{ notice.date }}</small>
          <h2>{{ notice.title }}</h2>
          <p>{{ notice.summary }}</p>
        </div>
      </div>
      <div class="pagination">
        <button @click="goPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        <button
          v-for="n in pageCount"
          :key="n"
          @click="goPage(n)"
          :class="{ active: n === currentPage }"
        >
          {{ n }}
        </button>
        <button @click="goPage(currentPage + 1)" :disabled="currentPage === pageCount">Next</button>
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
    return { date: '', title: filename }
  }
  const [, date, rawTitle] = match
  const title = decodeURIComponent(rawTitle.replace(/-/g, ' '))
  return { date, title }
}

function createSummary(content) {
  const plain = content
    .replace(/#+\s/g, '')         // 見出し記号削除
    .replace(/[*_>`-]/g, '')      // マーク記号削除
    .replace(/\[.*?\]\(.*?\)/g, '') // リンク削除
    .replace(/!\[.*?\]\(.*?\)/g, '') // 画像削除
    .replace(/\n+/g, ' ')         // 改行削除
    .trim()
  return plain.slice(0, 100) + (plain.length > 100 ? '…' : '')
}

async function loadNotices() {
  const keys = Object.keys(notices).sort().reverse()

  const tmpList = []
  for (const key of keys) {
    const raw = await notices[key]()
    const filename = key.split('/').pop()
    const { date, title } = parseFilename(filename)
    const summary = createSummary(raw)
    tmpList.push({ filename, date, title, summary, rawContent: raw })
  }
  noticeList.value = tmpList
}

const pageCount = computed(() => Math.ceil(noticeList.value.length / itemsPerPage))

const pagedNotices = computed(() =>
  noticeList.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

function goPage(n) {
  if (n < 1 || n > pageCount.value) return
  currentPage.value = n
}

function goDetail(filename) {
  const id = filename.replace('.md', '')
  router.push(`/notifications/${id}`)
}

onMounted(loadNotices)
</script>

<style scoped>
.notice-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notice-card {
  border: 1px solid #ccc;
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: box-shadow 0.2s ease;
}

.notice-card h2 {
  font-size: 1.2rem; /* 本文の約1.2倍 */
  font-weight: bold;
  margin: 0.25rem 0;
}

.notice-card:hover {
  box-shadow: 0 0 8px #888;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.pagination button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
  background: #007acc;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
