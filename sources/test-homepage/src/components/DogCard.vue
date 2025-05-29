<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
    @click="$emit('click')"
  >
    <img
      :src="dog.image?.url"
      alt="犬の写真"
      class="w-full h-48 object-cover"
    />
    <div class="p-4 space-y-1">
      <h2 class="text-lg font-semibold">{{ dog.name }}</h2>
      <p class="text-sm text-gray-600">犬種: {{ dog.breed }}</p>
      <p class="text-sm text-gray-600">性別: {{ dog.gender }}</p>
      <p class="text-sm text-gray-600">年齢: {{ dog.age }}歳</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dog: Object
});
</script>
