<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-orange-700 text-center mb-6 drop-shadow-md">
        よくあるご質問
      </h1>
      <p class="text-center text-gray-700 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
        INUカフェに関する皆様の疑問やご質問に、丁寧にお答えします。<br class="hidden sm:inline">
        ご来店前にぜひご一読ください。
      </p>

      <div class="faq-list space-y-6">
        <div
          v-for="(qa, index) in faqs"
          :key="index"
          class="faq-item bg-white shadow-lg rounded-xl overflow-hidden border border-peach-100 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-xl"
        >
          <div
            class="faq-question flex items-center p-6 cursor-pointer bg-white hover:bg-peach-50 transition-colors duration-200"
            @click="toggleAnswer(index)"
            :aria-expanded="qa.isOpen ? 'true' : 'false'"
            :aria-controls="`faq-answer-${index}`"
          >
            <div class="flex items-center flex-grow">
              <span class="text-3xl text-orange-600 mr-4 font-extrabold leading-none select-none">Q.</span>
              <h3 class="text-lg sm:text-xl font-semibold text-gray-800 flex-grow">{{ qa.question }}</h3>
            </div>
            <span
              class="text-4xl text-orange-500 transition-transform duration-300 ease-in-out"
              :class="{ 'rotate-45': qa.isOpen }"
            >
              +
            </span>
          </div>

          <transition name="fade-slide">
            <div v-if="qa.isOpen" :id="`faq-answer-${index}`" class="faq-answer p-6 border-t border-peach-200 bg-peach-50 text-gray-700">
              <div class="flex items-start">
                <span class="text-3xl text-orange-600 mr-4 font-extrabold leading-none select-none">A.</span>
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
    question: 'INUカフェはどんな場所ですか？',
    answer: 'INUカフェは、保護されたわんちゃんたちが新しい家族と出会える場を提供する、温かいカフェです。美味しいドリンクを楽しみながら、わんちゃんたちと触れ合えます。私たちの目的は、全ての命が幸せに暮らせる社会の実現に貢献することです。',
    isOpen: false,
  },
  {
    question: 'わんちゃんたちはいつでも会えますか？',
    answer: 'はい、カフェの営業時間中（午前11時〜午後6時）はいつでも会うことができます。ただし、わんちゃんの休憩時間や体調を考慮し、触れ合いを一時中断する場合がございます。特に体調管理には配慮しておりますので、ご理解ご協力をお願いいたします。',
    isOpen: false,
  },
  {
    question: '里親になるにはどうすればいいですか？',
    answer: '里親をご希望の方は、まずカフェにご来店いただき、気になるわんちゃんと触れ合ってください。その後、スタッフにご相談いただければ、詳しい手続きやトライアル期間について丁寧にご案内させていただきます。譲渡までのステップはウェブサイトにも詳しく記載していますので、そちらもご参照ください。',
    isOpen: false,
  },
  {
    question: 'カフェの利用に予約は必要ですか？',
    answer: '通常は予約不要でご利用いただけます。しかし、週末や祝日など混雑が予想される日は、スムーズなご案内のため事前のご予約をおすすめしております。ウェブサイトの「お問い合わせ」ページ、またはお電話にてご予約可能です。',
    isOpen: false,
  },
  {
    question: '子供やペットを連れて行くことはできますか？',
    answer: 'お子様のご来店は大歓迎です。ただし、わんちゃんの安全のため、保護者の方の同伴をお願いしております。小さなお子様からは目を離さず、わんちゃんとの触れ合いは優しく見守ってください。恐れ入りますが、感染症予防とわんちゃんのストレス軽減のため、他のペットの同伴はご遠慮いただいております。',
    isOpen: false,
  },
  {
    question: 'どのような種類のわんちゃんがいますか？',
    answer: '時期によって様々な種類の保護犬たちがいます。小型犬から大型犬、子犬から老犬まで、個性豊かなわんちゃんたちが新しい家族との出会いを待っています。最新の保護犬情報は「保護犬情報」ページでご確認いただけます。',
    isOpen: false,
  },
  {
    question: 'ボランティアに参加することはできますか？',
    answer: 'はい、INUカフェではわんちゃんのお世話やイベント運営など、様々な形でボランティアの方を募集しております。動物が好きな方、社会貢献したい方、ぜひお気軽にお問い合わせください。詳細は「お問い合わせ」ページからご連絡ください。',
    isOpen: false,
  }
]);

const toggleAnswer = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>

<style scoped>
/* FAQアイテムのホバー効果をさらに強化 */
.faq-item {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* 軽い影 */
}

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