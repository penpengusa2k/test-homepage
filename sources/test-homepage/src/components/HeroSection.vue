<template>
  <section class="relative h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-400 text-white overflow-hidden">
    <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
    <div class="container mx-auto text-center z-10">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
        新しい家族を待っている<br>保護犬たち
      </h1>
      <p class="text-xl md:text-2xl mb-8 leading-relaxed drop-shadow-md">
        温かい愛情で包み込んでくれる家族を<br>待っています。
      </p>
      <router-link
        to="/dogList"
        class="inline-flex items-center justify-center bg-white text-orange-600 py-4 px-8 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out text-xl font-bold shadow-lg transform hover:scale-105 active:scale-95"
      >
        <span class="material-icons text-3xl mr-3">pets</span>
        保護犬を探す
      </router-link>
    </div>
  </section>
</template>

<script setup>
// スクリプトは不要
</script>

<style scoped>
/* ヒーローセクションの背景パターン */
.bg-hero-pattern {
  background-image: url("@/assets/hero_pattern.svg"); /* パターンのSVGファイルを配置 */
  background-repeat: repeat;
  background-size: contain;
}
</style>