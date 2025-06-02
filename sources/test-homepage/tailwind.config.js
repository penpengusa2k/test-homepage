// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF8F2',   // 非常に薄いピーチ
          100: '#FFEECC',  // 薄いピーチ
          200: '#FFE5B4',  // 少し濃いピーチ
          500: '#FFDAB9',  // メインのピーチ
        },
        orange: {
          400: '#FFA07A',  // ヒーローセクションのボタンなど
          500: '#FF8C00',  // 少し濃いオレンジ
          600: '#FF7F50',  // メインのオレンジ
          700: '#E65C00',  // タイトルなど
        },
        warm_brown: {     // ★このブロックを追加します★
          500: '#8B4513'
        },
        mint: '#8FBC8F', // アクセントグリーン (今回は使用していませんが、将来のために残しておくと良いでしょう)
      },
      // フォントを追加したい場合は、ここに fontFamily の設定を追加します
      // fontFamily: {
      //   'sans': ['Nunito', 'sans-serif'], // 例: Google FontsからNunitoをインポートした場合
      // }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // これを追加しました
    // Line Clamp プラグインを使う場合は require('@tailwindcss/line-clamp') もここに追加してください
  ],
}