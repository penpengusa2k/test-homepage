<template>
  <div class="p-6 bg-peach-50 min-h-screen py-10">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-6">
        よくあるご質問
      </h1>
      <p class="text-center text-gray-700 text-lg mb-8">
        里親カフェに関する疑問やご質問にお答えします。
      </p>

      <div class="faq-list space-y-4">
        <div
          v-for="(qa, index) in faqs"
          :key="index"
          class="faq-item bg-white shadow-lg rounded-2xl overflow-hidden border border-peach-200 transition-all duration-300 ease-in-out"
        >
          <div
            class="faq-question flex items-center justify-between p-5 cursor-pointer hover:bg-peach-50 transition-colors duration-200"
            @click="toggleAnswer(index)"
            :aria-expanded="qa.isOpen ? 'true' : 'false'"
            :aria-controls="`faq-answer-${index}`"
          >
            <div class="flex items-center flex-grow">
              <span class="text-2xl text-orange-600 mr-4 font-extrabold leading-none select-none">Q</span>
              <h3 class="text-lg sm:text-xl font-semibold text-gray-800 flex-grow">{{ qa.question }}</h3>
            </div>
            <span
              class="text-3xl text-orange-500 transition-transform duration-300 ease-in-out"
              :class="{ 'rotate-45': qa.isOpen }"
            >
              +
            </span>
          </div>

          <transition name="fade-slide">
            <div v-if="qa.isOpen" :id="`faq-answer-${index}`" class="faq-answer p-5 border-t border-peach-200 bg-peach-50 text-gray-700">
              <div class="flex items-start">
                <span class="text-2xl text-orange-600 mr-4 font-extrabold leading-none select-none">A</span>
                <p class="text-base sm:text-lg leading-relaxed">{{ qa.answer }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: '里親カフェはどんな場所ですか？',
    answer: '里親カフェは、保護されたわんちゃんたちが新しい家族と出会える場を提供する、温かいカフェです。美味しいドリンクを楽しみながら、わんちゃんたちと触れ合えます。',
    isOpen: false,
  },
  {
    question: 'わんちゃんたちはいつでも会えますか？',
    answer: 'はい、カフェの営業時間中はいつでも会うことができます。ただし、わんちゃんの休憩時間や体調を考慮し、触れ合いを一時中断する場合がございますのでご了承ください。',
    isOpen: false,
  },
  {
    question: '里親になるにはどうすればいいですか？',
    answer: '里親をご希望の方は、まずカフェにご来店いただき、気になるわんちゃんと触れ合ってください。その後、スタッフにご相談いただければ、詳しい手続きについてご案内させていただきます。',
    isOpen: false,
  },
  {
    question: 'カフェの利用に予約は必要ですか？',
    answer: '通常は予約不要ですが、週末や祝日など混雑が予想される日は、事前のご予約をおすすめしております。ウェブサイトの「お問い合わせ」ページからご予約いただけます。',
    isOpen: false,
  },
  {
    question: '子供やペットを連れて行くことはできますか？',
    answer: 'お子様のご来店は大歓迎です。ただし、わんちゃんの安全のため、保護者の方の同伴をお願いしております。恐れ入りますが、他のペットの同伴はご遠慮いただいております。',
    isOpen: false,
  },
]);

const toggleAnswer = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>

<style scoped>
/* アコーディオン開閉のアニメーション */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
  max-height: 500px; /* 十分な高さを設定 */
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  max-height: 500px; /* 開いた時の高さ */
  opacity: 1;
  transform: translateY(0);
}
</style>