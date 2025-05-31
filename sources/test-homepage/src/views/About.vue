<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <section class="relative bg-gradient-to-br from-peach-200 to-orange-100 rounded-xl shadow-xl overflow-hidden mb-16 py-16 px-6 sm:px-10 text-center">
        <div class="absolute inset-0 opacity-30 bg-center bg-cover" :style="{ backgroundImage: 'url(' + AboutHeroBg + ')' }"></div>
        <div class="relative z-10 text-orange-800">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
            INUカフェとは？
          </h1>
          <p class="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto text-orange-900 font-semibold drop-shadow-sm">
            保護犬と新しい家族との出会いをサポートする、心温まる場所です。<br class="hidden sm:inline">
            愛らしい保護犬たちと触れ合い、里親制度について深く学び、
            同じ思いを持つ人々との交流を深めることができます。
          </p>
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-orange-700 mb-10 drop-shadow-sm">
          私たちのミッション
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="text-center md:text-left">
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              INUカフェは、ただ美味しいコーヒーを提供するだけでなく、
              **すべての命が幸せに暮らせる社会**を目指し、活動しています。
              私たちは、行き場のない保護犬たちに新しい家を見つける手助けをすると同時に、
              里親制度への理解を深めるための啓発活動にも力を入れています。
            </p>
            <p class="text-gray-700 text-lg leading-relaxed">
              地域社会と連携し、子どもから大人まで誰もが動物福祉について考え、
              具体的な行動を起こせるきっかけを提供することが私たちの使命です。
            </p>
          </div>
          <div class="order-first md:order-last">
            <img :src="AboutMissionImg" alt="犬と人が触れ合う画像" class="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          </div>
        </div>
      </section>

      </div>
  </div>
</template>

<script setup>
import AboutHeroBg from '@/assets/about_hero_bg.jpg';
import AboutMissionImg from '@/assets/about_mission.jpg';
</script>

<style scoped>
/* 必要に応じて、このページ固有のスタイルを追加 */
</style>