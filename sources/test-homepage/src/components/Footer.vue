<template>
  <footer class="bg-gray-800 text-white py-8 max-w-7xl mx-auto w-full px-4 text-center rounded-t-xl shadow-inner">
    <p class="text-base font-light mb-3">
      &copy; 2025 里親カフェ All rights reserved.
    </p>
    <nav class="text-sm">
      <router-link to="/about" class="text-white hover:text-peach-200 transition duration-300 mx-3">里親カフェとは</router-link>
      <span class="text-peach-200">|</span>
      <router-link to="/faq" class="text-white hover:text-peach-200 transition duration-300 mx-3">よくあるご質問</router-link>
      <span class="text-peach-200">|</span>
      <router-link to="/contact" class="text-white hover:text-peach-200 transition duration-300 mx-3">お問い合わせ</router-link>
    </nav>
  </footer>
</template>

<script setup>
</script>

<style scoped>
/* スタイルは全てTailwind CSSクラスで表現されているため、ここには追加のCSSは不要です。 */
</style>