<template>
  <main class="w-full px-4 mt-8 bg-gray-100 font-sans">
    <HeroSection />

    <section class="py-24 bg-white">
      <div class="container mx-auto px-4 md:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="md:order-2">
            <img src="@/assets/inu_cafe.jpg" alt="INUカフェの様子" class="rounded-lg shadow-lg">
          </div>
          <div class="md:order-1 text-center md:text-left">
            <h2 class="text-4xl font-extrabold text-orange-700 mb-6 drop-shadow-md">INUカフェとは？</h2>
            <p class="text-gray-700 text-lg leading-relaxed">
              里親制度や子どもたちの現状について、誰もが気軽に学び、話し合える場です。
              温かいコーヒーを片手に、保護犬たちと触れ合いながら、新しい家族との出会いをサポートします。
              定期的にイベントや相談会も開催しています。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-peach-100">
      <div class="container mx-auto px-4 md:px-0">
        <h2 class="text-4xl font-extrabold text-orange-700 text-center mb-12 drop-shadow-md">譲渡までのステップ</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold mb-4">
              1
            </div>
            <h3 class="text-xl font-semibold text-orange-600 mb-2">お問い合わせ・事前アンケート</h3>
            <p class="text-gray-700">
              ご希望のわんちゃんについてお問い合わせください。
              家族構成や飼育環境に関するアンケートにご回答いただきます。
            </p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold mb-4">
              2
            </div>
            <h3 class="text-xl font-semibold text-orange-600 mb-2">面談・お見合い</h3>
            <p class="text-gray-700">
              当カフェにてスタッフとの面談を行い、わんちゃんの性格や特徴、飼育に関するご説明をします。
              その後、わんちゃんと触れ合う時間を設けます。
            </p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white text-2xl font-bold mb-4">
              3
            </div>
            <h3 class="text-xl font-semibold text-orange-600 mb-2">トライアル期間・正式譲渡</h3>
            <p class="text-gray-700">
              数週間のトライアル期間を経て、問題がなければ正式な譲渡手続きを行います。
              新しい家族の一員として、わんちゃんを温かくお迎えください。
            </p>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link
            to="/contact"
            class="inline-flex items-center justify-center bg-orange-600 text-white py-4 px-8 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out text-xl font-bold shadow-lg transform hover:scale-105 active:scale-95"
          >
            <span class="material-icons text-3xl mr-3">mail</span>
            お問い合わせはこちら
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="limitedDogs.length > 0" class="py-24 bg-white">
      <div class="container mx-auto px-4 md:px-0">
        <h2 class="text-4xl font-extrabold text-orange-700 text-center mb-12 drop-shadow-md">
          新着のわんちゃんたち
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DogCard
            v-for="dog in limitedDogs"
            :key="dog.id"
            :dog="dog"
            @click="goToDetail(dog.id)"
          />
        </div>
        <div class="text-center mt-12">
          <router-link
            to="/dogList"
            class="inline-flex items-center justify-center bg-orange-600 text-white py-4 px-8 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out text-xl font-bold shadow-lg transform hover:scale-105 active:scale-95"
          >
            <span class="material-icons text-3xl mr-3">pets</span>
            もっと見る
          </router-link>
        </div>
      </div>
    </section>

    <section class="py-24 bg-gray-100">
      <div class="container mx-auto px-4 md:px-0">
        <h2 class="text-4xl font-extrabold text-orange-700 text-center mb-12 drop-shadow-md">最新のお知らせ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(notice, index) in displayedNotices"
            :key="notice.filename"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-6 cursor-pointer"
            @click="goDetail(notice.filename)"
          >
            <p class="text-gray-500 text-sm mb-2">{{ notice.date }}</p>
            <h3 class="text-xl font-semibold text-gray-800">{{ notice.title }}</h3>
            <p class="text-gray-700">{{ notice.summary }}</p>
          </div>
        </div>
        <div v-if="notices.length > DISPLAY_COUNT" class="text-center mt-12">
          <router-link
            to="/notifications"
            class="inline-flex items-center justify-center bg-orange-600 text-white py-4 px-8 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out text-xl font-bold shadow-lg transform hover:scale-105 active:scale-95"
          >
            お知らせ一覧へ
            <span class="material-icons text-3xl ml-3">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue' // 更新されたHeroSectionをインポート
import DogCard from '@/components/DogCard.vue';
import { fetchDogsWithoutAdopted } from '@/api/fetchDogs';

const limitedDogs = ref([]);
const DISPLAY_COUNT = 4;
const DOG_LIST_COUNT = 6;

const noticesRaw = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })
const notices = ref([])
const displayedNotices = ref([])

const router = useRouter()

onMounted(async () => {
  try {
    limitedDogs.value = await fetchDogsWithoutAdopted(DOG_LIST_COUNT);
  } catch (error) {
    console.error('犬のデータ取得エラー:', error);
  }

  await loadNotices();
  displayedNotices.value = notices.value.slice(0, DISPLAY_COUNT);
})

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
    .replace(/#+\s/g, '')
    .replace(/[*_>`-]/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\n+/g, ' ')
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

function goToDetail(id) {
  router.push(`/dogs/${id}`);
}

function goDetail(filename) {
  const id = filename.replace('.md', '')
  router.push(`/notifications/${id}`)
}
</script>