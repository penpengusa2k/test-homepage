<template>
  <header class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <router-link to="/" class="flex items-center space-x-2 text-xl font-bold text-orange-600">
        <img src="@/assets/logo.png" alt="ロゴ" class="h-8 w-8" />
        <span>里親カフェ</span>
      </router-link>

      <button @click="toggleMenu" class="md:hidden focus:outline-none" aria-label="Toggle navigation menu">
        <svg class="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav class="hidden md:flex space-x-6 text-gray-800">
        <router-link to="/" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">home</span>
          <span>ホーム</span>
        </router-link>
        <router-link to="/about" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">info</span>
          <span>里親カフェとは</span>
        </router-link>
        <router-link to="/dogList" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">pets</span>
          <span>保護犬情報</span>
        </router-link>
        <router-link to="/notifications" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">notifications</span>
          <span>お知らせ</span>
        </router-link>
        <router-link to="/faq" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">help_outline</span>
          <span>よくある質問</span>
        </router-link>
        <router-link to="/contact" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">mail</span>
          <span>お問い合わせ</span>
        </router-link>
        <router-link to="/access" class="flex items-center space-x-1 hover:text-orange-600">
          <span class="material-icons text-base">place</span>
          <span>アクセス</span>
        </router-link>
      </nav>

    </div>

    <transition name="slide-down">
      <div v-if="isOpen" class="md:hidden bg-white shadow-md" ref="mobileMenu">
        <nav class="flex flex-col space-y-2 p-4 text-gray-800">
          <router-link to="/" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">home</span>
            <span>ホーム</span>
          </router-link>
          <router-link to="/about" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">info</span>
            <span>里親カフェとは</span>
          </router-link>
          <router-link to="/dogList" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">pets</span>
            <span>保護犬情報</span>
          </router-link>
          <router-link to="/notifications" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">notifications</span>
            <span>お知らせ</span>
          </router-link>
          <router-link to="/faq" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">help_outline</span>
            <span>よくある質問</span>
          </router-link>
          <router-link to="/contact" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">mail</span>
            <span>お問い合わせ</span>
          </router-link>
          <router-link to="/access" @click="closeMenu" class="flex items-center space-x-1 hover:text-orange-600">
            <span class="material-icons text-base">place</span>
            <span>アクセス</span>
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

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
  // Check if the click occurred outside the mobile menu AND outside the hamburger button
  if (mobileMenu.value && !mobileMenu.value.contains(event.target) && !event.target.closest('button.md\\:hidden')) {
    closeMenu();
  }
};

// Watch for changes in isOpen to add/remove the event listener
watch(isOpen, (newValue) => {
  if (newValue) {
    // Menu is open, add event listener to close on outside click
    document.addEventListener('click', handleClickOutside);
  } else {
    // Menu is closed, remove event listener
    document.removeEventListener('click', handleClickOutside);
  }
});

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
/* Transition styles for slide-down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  /* Added ease-out for smoother effect */
  overflow: hidden;
  /* Hides content during height transition */
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  /* A value large enough to contain all menu items */
  opacity: 1;
  transform: translateY(0);
}
</style>
