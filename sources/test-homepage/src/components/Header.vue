<template>
  <header class="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <router-link to="/" class="flex items-center space-x-2 text-xl font-bold text-orange-700 hover:text-orange-800 transition-colors duration-200 ease-in-out">
        <img src="@/assets/logo.png" alt="INUカフェ ロゴ" class="h-8 w-8 animate-bounce-in" />
        <span>INUカフェ</span>
      </router-link>

      <button @click="toggleMenu" class="md:hidden focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200" aria-label="Toggle navigation menu">
        <svg class="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <nav class="hidden md:flex space-x-6 text-gray-700 text-sm font-bold">
        <router-link to="/" class="nav-item">
          <span class="material-icons text-lg">home</span>
          <span>ホーム</span>
        </router-link>
        <router-link to="/about" class="nav-item">
          <span class="material-icons text-lg">info</span>
          <span>INUカフェとは</span>
        </router-link>
        <router-link to="/dogList" class="nav-item">
          <span class="material-icons text-lg">pets</span>
          <span>保護犬情報</span>
        </router-link>
        <router-link to="/notifications" class="nav-item">
          <span class="material-icons text-lg">notifications</span>
          <span>お知らせ</span>
        </router-link>
        <router-link to="/faq" class="nav-item">
          <span class="material-icons text-lg">help_outline</span>
          <span>よくある質問</span>
        </router-link>
        <router-link to="/contact" class="nav-item">
          <span class="material-icons text-lg">mail</span>
          <span>お問い合わせ</span>
        </router-link>
        <router-link to="/access" class="nav-item">
          <span class="material-icons text-lg">place</span>
          <span>アクセス</span>
        </router-link>
      </nav>
    </div>

    <transition name="slide-down">
      <div v-if="isOpen" class="md:hidden bg-white shadow-md border-t border-gray-100" ref="mobileMenu">
        <nav class="flex flex-col space-y-2 p-4 text-gray-700 text-sm font-bold">
          <router-link to="/" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">home</span>
            <span>ホーム</span>
          </router-link>
          <router-link to="/about" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">info</span>
            <span>INUカフェとは</span>
          </router-link>
          <router-link to="/dogList" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">pets</span>
            <span>保護犬情報</span>
          </router-link>
          <router-link to="/notifications" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">notifications</span>
            <span>お知らせ</span>
          </router-link>
          <router-link to="/faq" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">help_outline</span>
            <span>よくある質問</span>
          </router-link>
          <router-link to="/contact" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">mail</span>
            <span>お問い合わせ</span>
          </router-link>
          <router-link to="/access" @click="closeMenu" class="mobile-nav-item">
            <span class="material-icons text-lg">place</span>
            <span>アクセス</span>
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';

const isOpen = ref(false);
const mobileMenu = ref(null); // Ref to the mobile menu element

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

// Function to handle clicks outside the menu
const handleClickOutside = (event) => {
  if (mobileMenu.value && !mobileMenu.value.contains(event.target) && !event.target.closest('button.md\\:hidden')) {
    closeMenu();
  }
};

// Watch for changes in isOpen to add/remove the event listener
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* ナビゲーションアイテムの共通スタイル */
.nav-item, .mobile-nav-item {
  @apply flex items-center space-x-2 p-2 rounded-md;
  transition: all 0.2s ease-in-out;
}

/* デスクトップナビゲーションのホバーエフェクト */
.nav-item {
  @apply text-gray-700 hover:text-orange-600 hover:bg-orange-50;
}

/* モバイルナビゲーションのホバーエフェクト */
.mobile-nav-item {
  @apply text-gray-700 hover:text-orange-600 hover:bg-orange-50;
}

/* Transition styles for slide-down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px; /* 十分な高さに設定 */
  opacity: 1;
  transform: translateY(0);
}

/* ロゴのアニメーション */
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out forwards;
}
</style>