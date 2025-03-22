<template>
  <div class="container" @click="goToMovieDetails">
    <div class="content">
      <div class="movie-card">
        <div class="movie-image-container">
          <img class="movie-image" :src="movie.poster" :alt="movie.title" />
        </div>
        <div class="movie-text">
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>

            <div v-if="movie.collapse?.duration && movie.collapse.duration.length > 0" class="movie-collapse-duration">
              <div>
                <span  class="movie-duration">
                  {{ formatDuration(movie.collapse.duration[0]) }}
                </span>
              </div>
              <div>
                <img src="@/assets/icons/reverse.png" alt="reverse">
              </div>
              </div>
          </div>

          <p class="movie-year">
            {{ movie.year }}, {{ movie.genres?.join(', ') || '' }}
          </p>
            
          <p class="movie-director"><strong>Режиссер:</strong> {{ movie.directors?.join(', ') || '' }}</p>
          <p class="movie-actors"><strong class="movie-actors-grey">Актеры:</strong> {{ movie.actors?.join(', ') || '' }}</p>

          <p class="movie-description">{{ movie.description }}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToMovieDetails = () => {
  router.push({ name: 'MovieDetails', params: { id: props.movie.id } });
};

const formatDuration = (duration) => {
  return duration.replace(/(\d{2}:\d{2})$/, "$1:00");
}
</script>

<style scoped>
/* Стили остаются такими же */
</style>


<style scoped>
.movie-card {
  display: flex;
  gap: 24px;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  margin-top: 24px;
  background-color: #4D4747;
  color: #FFFFFF;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
/* border-radius: 8px;  Добавьте скругление углов, если нужно */
}

.movie-card:hover {
  transform: translateY(-8px); /* Поднимаем карточку на 8px */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Добавляем тень */
}

.movie-content {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  list-style: none;
}

.movie-content li {
  background-color: transparent;
}

.movie-header {
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.movie-text {
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: transparent;
  width: 100%;
}

/* стили для контейнера с постером */
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

.movie-year {
  font-size: 16px;
  color: #988F8F;
  margin: 0;
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
/* стили для остальных элементов */

.actors-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}


.movie-details p {
  margin: 5px 0;
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

</style>