<template>
  <div class="container container-sort">
    <div class="movie-details">
      <h2 class="movie-details__title">Фильмы</h2>
      <div class="sort-controls">
        <label>
          <input
            type="radio"
            name="sort"
            :value="'title'"
            v-model="sortField"
            @change="handleSortChange"
          />
          Отсортировать по названию
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            :value="'year'"
            v-model="sortField"
            @change="handleSortChange"
          />
          Отсортировать по году
        </label>
      </div>
    </div>
    <hr>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sortField = ref(null); // Текущее поле для сортировки (title, year или null)

const emit = defineEmits(['sort-change']);

const handleSortChange = () => {
  emit('sort-change', sortField.value); 
};
</script>

<style scoped>
.container-sort {
  margin-bottom: 40px;
}

.movie-details {
    margin: 16px 0px 20px 0px;
}

.movie-details__title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: 0%;
    color: #FFFFFF;
}

.sort-controls {
    margin-top: 16px;
}

label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0%;
    color: #C4C4C4;
}

label:not(:last-child) {
    margin-right: 32px;
}


input {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #d9d9d9;
  margin-top: 10px;
  outline: none;
}
 input:checked {
  background-color: #FF5252FA;
}

input:after {
  content: "";
  
  background-image: url("../assets/icons/Path.png");
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center;
}
/*
input:focus, input:hover {
  box-shadow: 0 0 0 3px #ebebeb;
  border-color: #8c8c8c;
}
label {
  padding: 0.75rem 1rem 0.75rem calc(1.2rem * 2.25);
  display: inline-block;
  font-size: 17px;
  width: 100%;
  user-select: none;
  border-bottom: 2px solid #ededed;
  cursor: pointer;
}
label:hover {
  border-bottom-color: #adadad;
} */

</style>

