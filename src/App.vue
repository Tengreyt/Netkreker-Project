<template>
  <div>
    <IsHeader />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import IsHeader from './components/IsHeader.vue';
</script>
