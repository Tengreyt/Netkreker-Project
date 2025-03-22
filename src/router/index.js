import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import MovieDetailsPage from '../components/MovieDetailsPage.vue';

const routes = [
  {
    path: '/',
    component: Home, 
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetailsPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;