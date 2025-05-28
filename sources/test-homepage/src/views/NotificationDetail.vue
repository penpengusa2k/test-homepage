<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import markdownIt from 'markdown-it'
import 'highlight.js/styles/github.css' // Optional: If you want code highlighting
import hljs from 'highlight.js' // Optional: For code highlighting

// Markdown-it のインスタンスを初期化
// コードハイライトを追加する場合の設定
const md = markdownIt({
  html: true,        // HTML タグを許可する
  linkify: true,     // URL を自動的にリンクにする
  typographer: true, // タイポグラフィを改善する
  highlight: function (str, lang) { // コードハイライトのコールバック関数
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // highlight.js が言語を認識しない場合はそのまま返す
  }
})

const route = useRoute()

// リアクティブな状態変数
const contentHtml = ref('')
const date = ref('')
const title = ref('')

// 動的にインポートするマークダウンファイル群
// Vite の import.meta.glob を使用
const notices = import.meta.glob('../notices/*.md', { query: '?raw', import: 'default' })

/**
 * ファイル名から日付とタイトルをパースする関数
 * 例: '2023-04-01-お知らせタイトル.md' -> { date: '2023-04-01', title: 'お知らせタイトル' }
 * @param {string} filename - ファイル名 (例: '2023-04-01-sample-notice.md')
 * @returns {{date: string, title: string}} パースされた日付とタイトル
 */
function parseFilename(filename) {
  const base = filename.replace('.md', '')
  // 日付部分とタイトル部分を正規表現で抽出
  const match = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)
  if (!match) {
    // マッチしない場合はファイル名をそのままタイトルにする
    console.warn(`Filename '${filename}' does not match expected format.`)
    return { date: '', title: filename }
  }
  const [, d, rawTitle] = match
  // タイトル部分のハイフンをスペースに置換し、デコードする
  const t = decodeURIComponent(rawTitle.replace(/-/g, ' '))
  return { date: d, title: t }
}

/**
 * 記事の詳細を読み込み、HTMLに変換して表示する関数
 */
async function loadDetail() {
  const id = route.params.id // ルートパラメータからIDを取得
  // IDに一致するマークダウンファイルを検索
  const matchedKey = Object.keys(notices).find(k => k.includes(id + '.md'))

  if (!matchedKey) {
    // ファイルが見つからない場合
    contentHtml.value = '<p class="text-red-500">お知らせが見つかりませんでした。</p>'
    date.value = ''
    title.value = 'エラー'
    return
  }

  try {
    // 生のマークダウンコンテンツをインポート
    const rawContent = await notices[matchedKey]()
    // マークダウンをHTMLに変換
    contentHtml.value = md.render(rawContent)
    console.log("Rendered HTML:", contentHtml.value) // デバッグ用

    // ファイル名から日付とタイトルを取得
    const filename = matchedKey.split('/').pop() // パスからファイル名のみ取得
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

// コンポーネントがマウントされた時に詳細を読み込む
onMounted(loadDetail)
</script>

<template>
  <div class="notification-detail max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
    <small v-if="date" class="text-gray-500 text-sm">{{ date }}</small>
    <h1 class="text-3xl font-bold mt-1 mb-6 text-gray-800">{{ title }}</h1>
    
    <div class="markdown-content" v-html="contentHtml"></div>
  </div>
</template>

<style>
/* このスタイルブロックは "scoped" 属性を持たないため、グローバルに適用されます。
v-html でレンダリングされるコンテンツの内部要素（h2, p, ul, li など）にスタイルを適用するのに適しています。
*/
.markdown-content h1 {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700; /* font-bold */
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  color: #1a202c; /* gray-900 */
}

.markdown-content h2 {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  margin-top: 1.25em;
  margin-bottom: 0.5em;
  color: #2d3748; /* gray-800 */
}

.markdown-content h3 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #4a5568; /* gray-700 */
}

.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.75; /* leading-relaxed */
  color: #4a5568; /* gray-700 */
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
  color: #4a5568; /* gray-700 */
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
  color: #3182ce; /* blue-600 */
  text-decoration: underline;
}

.markdown-content pre {
  background-color: #f7fafc; /* gray-100 */
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  margin-bottom: 1em;
}

.markdown-content code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  background-color: #edf2f7; /* gray-200 */
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

/* Optional: Add styles for blockquote, table etc. as needed */
.markdown-content blockquote {
  border-left: 4px solid #cbd5e0; /* gray-300 */
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
  color: #718096; /* gray-600 */
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e2e8f0; /* gray-200 */
  padding: 0.75rem;
  text-align: left;
}

.markdown-content th {
  background-color: #f7fafc; /* gray-100 */
  font-weight: 600;
}
</style>

<style scoped>
/* このスタイルブロックは "scoped" 属性を持つため、
このコンポーネントのルート要素とその子孫要素（ただし v-html で挿入されたものは除く）にのみ適用されます。
*/
.notification-detail {
  /* Tailwind CSS を利用している場合、これらは不要になることが多いです */
  /* padding: 2rem; */
  /* max-width: 800px; */
  /* margin: auto; */
}
</style>