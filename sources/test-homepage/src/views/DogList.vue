<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">保護犬一覧</h1>
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <DogCard
        v-for="dog in dogs"
        :key="dog.id"
        :dog="dog"
        @click="goToDetail(dog.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchDogs } from '@/api/fetchDogs';
import DogCard from '@/components/DogCard.vue';
import { useRouter } from 'vue-router';

const dogs = ref([]);
const router = useRouter();

onMounted(async () => {
  dogs.value = await fetchDogs();
});

function goToDetail(id) {
  router.push(`/dogs/${id}`);
}
</script>
