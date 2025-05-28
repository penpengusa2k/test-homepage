<template>
  <div
    id="app"
    class="flex flex-col min-h-screen"
    style="width:100vw; min-height:100vh; overflow-x:hidden;"
  >
    <Header />
    <router-view class="flex-grow max-w-7xl mx-auto w-full" />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
