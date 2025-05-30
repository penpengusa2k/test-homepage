<template>
  <div class="bg-peach-50 min-h-screen py-10">
    <div class="notification-detail max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-2xl border border-peach-200">
      <small v-if="date" class="text-gray-500 text-base block mb-2">{{ date }}</small>
      <h1 class="text-3xl sm:text-4xl font-extrabold mt-1 mb-6 text-orange-700 leading-tight">
        {{ title }}
      </h1>
      
      <div class="markdown-content" v-html="contentHtml"></div>

      <div v-if="contentHtml.length === 0 && !title" class="text-center py-8">
        <p class="text-red-500 text-lg font-semibold">お知らせが見つかりませんでした。</p>
        <p class="text-gray-600 mt-2">指定されたURLをご確認ください。</p>
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
    contentHtml.value = '' // コンテンツを空にする
    date.value = ''
    title.value = 'お知らせが見つかりません' // 見つからない旨のタイトル
    return
  }

  try {
    // 生のマークダウンコンテンツをインポート
    const rawContent = await notices[matchedKey]()
    // マークダウンをHTMLに変換
    contentHtml.value = md.render(rawContent)
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

<style>
/* このスタイルブロックは "scoped" 属性を持たないため、グローバルに適用されます。
v-html でレンダリングされるコンテンツの内部要素（h2, p, ul, li など）にスタイルを適用するのに適しています。
*/
.markdown-content h1 {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700; /* font-bold */
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  color: #E65C00; /* orange-700 */
}

.markdown-content h2 {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  margin-top: 1.25em;
  margin-bottom: 0.5em;
  color: #FF7F50; /* orange-600 */
}

.markdown-content h3 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #FF8C00; /* orange-500 */
}

.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.8; /* leading-relaxedより少し広めに */
  color: #4A5568; /* gray-700 */
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1em;
  padding-left: 1.8em; /* 少し広めに */
  color: #4A5568; /* gray-700 */
}

.markdown-content ul li {
  list-style-type: disc;
  margin-bottom: 0.6em; /* 少し広めに */
}

.markdown-content ol li {
  list-style-type: decimal;
  margin-bottom: 0.6em; /* 少し広めに */
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
  background-color: #FFF8F2; /* peach-50 */
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5em;
  border: 1px solid #FFE5B4; /* peach-200 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.markdown-content code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  background-color: #FFEECC; /* peach-100 */
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  color: #E65C00; /* orange-700 */
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit; /* pre内のコードの色は継承 */
}

/* Optional: Add styles for blockquote, table etc. as needed */
.markdown-content blockquote {
  border-left: 5px solid #FFDAB9; /* peach-500 */
  padding-left: 1.5rem;
  margin: 1.5em 0; /* 上下左右のマージン */
  font-style: italic;
  color: #718096; /* gray-600 */
  background-color: #FFF8F2; /* peach-50 */
  border-radius: 0 0.5rem 0.5rem 0; /* 右側だけ角丸 */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #FFE5B4; /* peach-200 */
  padding: 1rem;
  text-align: left;
}

.markdown-content th {
  background-color: #FFEECC; /* peach-100 */
  font-weight: 600;
  color: #E65C00; /* orange-700 */
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  display: block; /* 中央寄せ用 */
  margin: 1.5em auto; /* 上下のマージンと中央寄せ */
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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