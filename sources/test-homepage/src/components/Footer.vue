<template>
  <footer class="bg-gray-800 text-white py-8 max-w-7xl mx-auto w-full px-4 text-center rounded-t-xl shadow-xl border-t-2 border-orange-700">
    <p class="text-base font-light mb-4">
      &copy; 2025 INUカフェ All rights reserved.
    </p>
    <nav class="text-sm sm:text-base flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
      <router-link to="/about" class="text-white hover:text-orange-300 transition duration-300">INUカフェとは</router-link>
      <span class="hidden sm:inline text-orange-300">|</span>
      <router-link to="/faq" class="text-white hover:text-orange-300 transition duration-300">よくあるご質問</router-link>
      <span class="hidden sm:inline text-orange-300">|</span>
      <router-link to="/contact" class="text-white hover:text-orange-300 transition duration-300">お問い合わせ</router-link>
    </nav>
  </footer>
</template>

<script setup>
// スクリプトは不要
</script>

<style scoped>
/* スタイルは全てTailwind CSSクラスで表現されているため、ここには追加のCSSは不要です。 */
</style>