<template>
  <main class="w-full px-4 mt-8">
    <HeroSection />
    <section class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">里親カフェとは？</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          里親制度や子どもたちの現状について、誰もが気軽に学び、話し合える場です。イベントや相談会も開催しています。
        </p>
      </div>
    </section>
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">最新のお知らせ</h2>

        <div class="notifications-list"> 
          <div
            v-for="(notice, index) in displayedNotices"
            :key="notice.filename"
            class="notice-item py-4 cursor-pointer hover:bg-gray-50"
            :class="{ 'border-b border-gray-200': index < displayedNotices.length - 1 }"
            @click="goDetail(notice.filename)"
          >
            <div class="flex items-baseline gap-4"> <small class="text-gray-500">{{ notice.date }}</small>
              <h3 class="text-lg font-semibold mt-1 leading-tight">{{ notice.title }}</h3> </div>
            </div>

          <div v-if="notices.length > 3" class="flex justify-center mt-2">
            <button
              @click="goNotifications"
              aria-label="お知らせ一覧へ"
              class="hover:text-gray-500 text-lg font-medium transition"
            >
              more &gt;
            </button>
          </div>

        </div>
      </div>
    </section>
    <section>
      <div class="w-full text-center"> 
        <router-link
          to="/dogList"
          class="inline-flex items-center justify-center bg-orange-400 text-white py-6 rounded-lg hover:bg-orange-500 transition duration-300 ease-in-out text-xl font-semibold w-full block px-4"
        >
          <span class="material-icons text-2xl mr-2">search</span>
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

const noticesRaw = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })

const notices = ref([])

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
    .replace(/#+\s/g, '')             // 見出し記号削除
    .replace(/[*_>`-]/g, '')          // マーク記号削除
    .replace(/\[.*?\]\(.*?\)/g, '')   // リンク削除
    .replace(/!\[.*?\]\(.*?\)/g, '')  // 画像削除
    .replace(/\n+/g, ' ')             // 改行削除
    .trim()
  return plain.slice(0, 100) + (plain.length > 100 ? '…' : '')
}

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

const displayedNotices = ref([])

function goNotifications() {
  router.push('/notifications')
}

function goDetail(filename) {
  const id = filename.replace('.md', '')
  router.push(`/notifications/${id}`)
}

onMounted(async () => {
  await loadNotices()
  displayedNotices.value = notices.value.slice(0, 3)
})
</script>

<style scoped>
.notice-card {
  transition: box-shadow 0.2s ease;
}

.notice-card:hover {
  box-shadow: 0 0 8px #888;
}
</style>
