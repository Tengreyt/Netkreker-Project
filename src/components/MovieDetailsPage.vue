<template>
    <div class="container">
        <div class="movie-details-page">

            <div class="back">
                <img src="@/assets/icons/Vector.png" alt="back">
                <button @click="goBack" class="back-button">Назад к списку</button>
            </div>
          <!-- Прелоадер -->
          <div v-if="loading" class="loading">
            <img src="../assets/Loader.svg" alt="loading">
          </div>
      
          <!-- Сообщение об ошибке -->
          <div v-else-if="error" class="error-message">
            К сожалению, по вашему запросу ничего не найдено...
          </div>
      
          <!-- Карточка фильма -->
          <div v-else class="movie-card">
            <div class="movie-image-container">
              <img class="movie-image" :src="movie.poster" :alt="movie.title" />
            </div>
            <div class="movie-text">
              <div class="movie-info">
                <h3 class="movie-title">{{ movie.title }}</h3>
                <div v-if="movie.collapse?.duration && movie.collapse.duration.length > 0" class="movie-collapse-duration">
                    <div>
                        <span class="movie-duration">
                          {{ formatDuration(movie.collapse.duration[0]) }}
                        </span>
                    </div>
                    <div>
                        <img src="@/assets/icons/reverse.png" alt="reverse">
                    </div>
                </div>
              </div>
              <p class="movie-year">{{ movie.year }}, {{ movie.genres?.join(', ') || '' }}</p>
              <p class="movie-director"><strong>Режиссер:</strong> {{ movie.directors?.join(', ') || '' }}</p>
              <p class="movie-actors"><strong class="movie-actors-grey">Актеры:</strong> {{ movie.actors?.join(', ') || '' }}</p>
              <p class="movie-description">{{ movie.description }}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const movie = ref({});
const loading = ref(true);
const error = ref(null);

// Проверяем, есть ли фильм в сохраненном списке
const moviesFromList = JSON.parse(localStorage.getItem('movies')) || [];
const movieFromList = moviesFromList.find(m => m.id === parseInt(route.params.id));

if (movieFromList) {
  // Если фильм есть в списке, используем его
  movie.value = movieFromList;
  loading.value = false;
} else {
  // Если фильма нет в списке, запрашиваем из API
  onMounted(async () => {
    try {
      const response = await axios.get(`https://mashroom-movies-api.netlify.app/api/movie/${route.params.id}`);
      movie.value = response.data.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  });
}

// Форматирование длительности
const formatDuration = (duration) => {
  return duration.replace(/(\d{2}:\d{2})$/, "$1:00");
};

// Переход на страницу списка
const goBack = () => {
  localStorage.removeItem('movies'); // Очищаем сохраненный список
  router.push({ path: '/' });
};
</script>

<style scoped>
/* Стили из MovieCard.vue */
.movie-card {
  display: flex;
  gap: 24px;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  margin-top: 40px;
  background-color: #4D4747;
  color: #FFFFFF;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.movie-text {
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: transparent;
  width: 100%;
}

.movie-image-container {
  padding: 0px 28px 17px 28px;
  max-width: 168px;
  min-height: 168px;
  background-color: #C4C4C4;
}

.movie-image {
  width: 112px;
  margin-top: 30px;
}

.movie-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 0%;
}

.movie-year {
  padding-top: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #988F8F;
}

.movie-director {
  padding-top: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #988F8F;
}

.movie-actors-grey {
  color: #988F8F;
}

.movie-actors {
  padding-top: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0%;
  color: #ffffff;
  margin: 8px 0px 8px 0px;
}

.movie-info {
  padding-top: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
}

.movie-collapse-duration {
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('@/assets/Rectangle 7.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 194px;
    height: 30px;
}

.movie-collapse-duration div {
    background-color: transparent;
}

.movie-collapse-duration img {
  margin-top: 5px;
  width: 15px;
  height: 17px;
  margin-right: 28px;
}

.movie-duration {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0%;
  text-align: right;
  text-transform: uppercase;
  color: #000000;
  padding: 9px 18px 9px 18px;
}

.movie-description {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0%;
  color: #FFFFFF;
  margin-bottom: 32px;
}

/* Стили для страницы деталей */
.movie-details-page {
  padding: 20px;
  margin: 0 auto;
}

.back {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.back-button {
    outline: none;
    border: none;

    background-color: transparent;    
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0%;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-thickness: 0%;
    color: #FF5252FA;
    cursor: pointer;
}

.error-message {
    margin-top: 48px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0%;
    color: #FFFFFF;
}
</style>