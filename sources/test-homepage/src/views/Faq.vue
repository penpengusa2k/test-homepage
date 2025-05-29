<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">よくあるご質問</h1>
    <p class="text-gray-700">こちらはよくあるご質問のページです。</p>
  </div>

  <div class="faq-list mt-8">
    <div
      v-for="(qa, index) in faqs"
      :key="index"
      class="faq-item bg-white shadow-sm rounded-lg mb-4 overflow-hidden"
    >
      <div
        class="faq-question flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        @click="toggleAnswer(index)"
      >
        <div class="flex items-center">
          <span class="text-xl text-gray-600 mr-3 font-bold leading-none">Q</span>
          <h3 class="text-lg font-semibold text-gray-800">{{ qa.question }}</h3>
        </div>
        <span
          class="text-xl text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-45': qa.isOpen }"
        >
          + </span>
      </div>

      <div v-if="qa.isOpen" class="faq-answer p-4 border-t border-gray-100 bg-gray-50 text-gray-700">
        <div class="flex items-start">
          <span class="text-xl text-orange-500 mr-3 font-bold leading-none">A</span>
          <p>{{ qa.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: '質問',
    answer: '解答',
    isOpen: false,
  },
  {
    question: 'パブロは可愛いですか？',
    answer: 'はい、めっちゃ可愛いです',
    isOpen: false,
  },
  {
    question: 'がもの名前の由来はなんですか？',
    answer: 'アナグラムです。',
    isOpen: false,
  },
]);

const toggleAnswer = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>

<style scoped>
/* 必要に応じて、Tailwind CSSでカバーできない部分や微調整をここに追加 */
</style>