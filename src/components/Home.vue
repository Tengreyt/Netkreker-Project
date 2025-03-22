<template>
    <div>
      <MovieDetails @sort-change="handleSortChange" />
      <div v-if="loading" class="loading">
        <img src="../assets/Loader.svg" alt="loading">
      </div>
      <div v-else-if="error">Ошибка: {{ error.message }}</div>
      <div v-else>
        <MovieCard v-for="movie in sortedMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import MovieDetails from '../components/MovieDetails.vue';
import MovieCard from '../components/MovieCard.vue';

// Реактивные переменные
const movies = ref([]);
const loading = ref(true);
const error = ref(null);
const sortField = ref(null);

// Загрузка фильмов
const fetchMovies = async () => {
  try {
    const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies');
    movies.value = response.data.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const handleSortChange = (field) => {
  sortField.value = field;
};

const sortedMovies = computed(() => {
  if (!sortField.value) return movies.value; // Если сортировка не выбрана, возвращаем исходный список

  return [...movies.value].sort((a, b) => {
    const fieldA = a[sortField.value];
    const fieldB = b[sortField.value];

    // Обработка null или undefined значений
    if (fieldA == null) return 1;
    if (fieldB == null) return -1;

    // Сортировка по году
    if (sortField.value === 'year') {
      const yearA = parseInt(fieldA, 10);
      const yearB = parseInt(fieldB, 10);
      return yearA - yearB; 
    }

    // Сортировка по названию
    if (sortField.value === 'title') {
      return fieldA.localeCompare(fieldB, undefined, { sensitivity: 'base' }); // A-Z
    }

    return 0; 
  });
});


onMounted(async () => {
  try {
    const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies');
    movies.value = response.data.data;
    localStorage.setItem('movies', JSON.stringify(movies.value)); // Сохраняем список фильмов
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});

onMounted(() => {
  fetchMovies();
});
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>