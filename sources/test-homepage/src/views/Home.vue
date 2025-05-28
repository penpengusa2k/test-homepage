<template>
  <main class="w-full px-4 pt-20">
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
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          お知らせ
        </h2>

        <div class="flex items-center gap-6">
          <!-- お知らせカード -->
          <div class="grid grid-cols-3 gap-6 flex-1">
            <div
              v-for="notice in displayedNotices"
              :key="notice.filename"
              class="notice-card p-4 border rounded cursor-pointer hover:shadow"
              @click="goDetail(notice.filename)"
            >
              <small class="text-gray-500">{{ notice.date }}</small>
              <h3 class="text-lg font-semibold mt-1">{{ notice.title }}</h3>
              <p class="text-gray-700 mt-2">{{ notice.summary }}</p>
            </div>
          </div>

          <!-- 矢印ボタン（3件以上のときだけ表示） -->
          <button
            v-if="notices.length > 3"
            @click="goNotifications"
            aria-label="お知らせ一覧へ"
            class="p-3 text-gray-500 hover:text-gray-800 rounded border border-gray-300 hover:border-gray-600 transition"
            style="align-self: center;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="py-16 bg-green-50">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">イベントのご案内</h2>
        <p class="text-gray-600 mb-6">
          毎月さまざまなイベントを開催中！お気軽にご参加ください。
        </p>
        <router-link to="/notifications" class="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          イベント情報を見る
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
