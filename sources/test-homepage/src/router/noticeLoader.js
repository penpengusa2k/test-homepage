const modules = import.meta.glob('../notices/*.md', { eager: true })

const notices = Object.entries(modules).map(([path, mod]) => {
  const file = mod.__file || path
  const raw = mod?.default || ''

  // ファイル名から日付とタイトルを抽出
  const fileNameMatch = file.match(/(\d{4}-\d{2}-\d{2})-(.+)\.md$/)
  const date = fileNameMatch?.[1] || ''
  const title = decodeURIComponent(fileNameMatch?.[2]?.replace(/-/g, ' ')) || ''

  return {
    date,
    title,
    summary: raw.slice(0, 50).replace(/\n/g, ''), // 最初の50文字をsummaryとして
    path: file.replace(/^.*\/notices\/|\.md$/g, ''),
    content: raw
  }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export default notices
