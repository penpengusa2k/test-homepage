<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="notification-detail p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-peach-100">
        <small v-if="date" class="text-gray-500 text-sm sm:text-base font-medium block mb-2">{{ date }}</small>
        <h1 class="text-3xl sm:text-4xl font-extrabold mt-1 mb-8 text-orange-700 leading-tight drop-shadow-sm">
          {{ title }}
        </h1>

        <div class="markdown-content text-gray-700 leading-relaxed" v-html="contentHtml"></div>

        <div v-if="contentHtml.length === 0 && !title" class="text-center py-8">
          <p class="text-red-500 text-xl font-semibold mb-2">お知らせが見つかりませんでした。</p>
          <p class="text-gray-600 text-lg">指定されたURLをご確認ください。</p>
          <router-link to="/notifications" class="inline-block mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-200">
            お知らせ一覧へ戻る
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import markdownIt from 'markdown-it'
import 'highlight.js/styles/github.css' // Optional: If you want code highlighting
import hljs from 'highlight.js' // Optional: For code highlighting

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return ''
  }
})

const route = useRoute()

const contentHtml = ref('')
const date = ref('')
const title = ref('')

const notices = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })

function parseFilename(filename) {
  const base = filename.replace('.md', '')
  const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!match) {
    console.warn(`Filename '${filename}' does not match expected format.`)
    return { date: '', title: filename }
  }
  const [, d, rawTitle] = match
  const t = decodeURIComponent(rawTitle.replace(/-/g, ' '))
  return { date: d, title: t }
}

async function loadDetail() {
  const id = route.params.id
  const matchedKey = Object.keys(notices).find(k => k.includes(id + '.md'))

  if (!matchedKey) {
    contentHtml.value = ''
    date.value = ''
    title.value = 'お知らせが見つかりません'
    return
  }

  try {
    const rawContent = await notices[matchedKey]()
    contentHtml.value = md.render(rawContent)
    const filename = matchedKey.split('/').pop()
    const parsed = parseFilename(filename)
    date.value = parsed.date
    title.value = parsed.title
  } catch (error) {
    console.error("Error loading or rendering markdown:", error)
    contentHtml.value = `<p class="text-red-500">コンテンツの読み込み中にエラーが発生しました: ${error.message}</p>`
    date.value = ''
    title.value = '読み込みエラー'
  }
}

onMounted(loadDetail)
</script>

<style>
/* v-html でレンダリングされるコンテンツの内部要素にスタイルを適用 */
.markdown-content h1 {
  font-size: 2.5rem; /* より大きく、ページタイトルと区別 */
  font-weight: 800; /* Extra bold */
  margin-top: 1.8em;
  margin-bottom: 0.8em;
  color: #CC4A00; /* orange-800, より深いオレンジ */
  border-bottom: 2px solid #FFDAB9; /* peach-200 */
  padding-bottom: 0.5em;
}

.markdown-content h2 {
  font-size: 2rem; /* text-3xl */
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  color: #E65C00; /* orange-700 */
  border-left: 5px solid #FF8C00; /* orange-500 */
  padding-left: 0.75rem;
}

.markdown-content h3 {
  font-size: 1.625rem; /* 約 text-2xl */
  font-weight: 600;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  color: #FF7F50; /* orange-600 */
}

.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.7; /* leading-relaxedに近い */
  color: #4A5568; /* gray-700 */
  font-size: 1rem; /* base */
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1em;
  padding-left: 2em;
  color: #4A5568; /* gray-700 */
}

.markdown-content ul li {
  list-style-type: disc;
  margin-bottom: 0.5em;
}

.markdown-content ol li {
  list-style-type: decimal;
  margin-bottom: 0.5em;
}

.markdown-content a {
  color: #FF7F50; /* orange-600 */
  text-decoration: underline;
  transition: color 0.2s ease;
}
.markdown-content a:hover {
  color: #E65C00; /* orange-700 */
}

.markdown-content strong {
  color: #E65C00; /* orange-700 */
  font-weight: bold;
}

.markdown-content em {
  font-style: italic;
  color: #FF8C00; /* orange-500 */
}

.markdown-content pre {
  background-color: #F8F8F8; /* よりニュートラルなライトグレー */
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5em;
  border: 1px solid #E2E8F0; /* gray-200 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.markdown-content code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  background-color: #EDF2F7; /* gray-100 */
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  color: #C05621; /* orange-800に近い */
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
}

.markdown-content blockquote {
  border-left: 5px solid #FFDAB9; /* peach-200 */
  padding-left: 1.5rem;
  margin: 1.5em 0;
  font-style: italic;
  color: #718096; /* gray-600 */
  background-color: #FEFCE8; /* yellow-50, より優しい色 */
  border-radius: 0 0.5rem 0.5rem 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem; /* テーブル全体に角丸 */
  overflow: hidden; /* 角丸を効かせるため */
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #E2E8F0; /* gray-200 */
  padding: 1rem;
  text-align: left;
  font-size: 0.95rem; /* slightly smaller for table content */
}

.markdown-content th {
  background-color: #FFEDE0; /* peach-100 */
  font-weight: 600;
  color: #E65C00; /* orange-700 */
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5em auto;
  border-radius: 0.75rem; /* より大きな角丸 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 影を強調 */
}
</style>

<style scoped>
/* Scopedスタイルは既存のままでOK */
.notification-detail {
  /* Tailwind CSS を利用している場合、これらは不要になることが多いです */
}
</style>