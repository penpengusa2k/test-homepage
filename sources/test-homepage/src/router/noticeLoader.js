const modules = import.meta.glob('../notices/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

const notices = Object.entries(modules).map(([path, raw]) => {
  // ファイル名処理
  const fileName = path.split('/').pop() || ''
  const fileMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)

  const date = fileMatch?.[1] || ''
  const title = decodeURIComponent(fileMatch?.[2]?.replace(/-/g, ' ')) || ''
  const slug = fileName.replace(/\.md$/, '')

  return {
    date,
    title,
    summary: raw.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 50),
    path: slug,
    content
  }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export default notices
