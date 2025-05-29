<template>
  <div
    id="app"
    class="flex flex-col min-h-screen"
    style="width:100vw; min-height:100vh; overflow-x:hidden;"
  >
    <Header />

    <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>