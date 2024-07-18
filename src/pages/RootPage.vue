<script setup lang="ts">
import Sidebar from "../components/sidebar/Sidebar.vue";
</script>

<template>
  <div class="grid min-h-screen grid-cols-1 xl:grid-cols-6">
    <Sidebar />
    <div class="xl:col-span-5">
      <router-view></router-view> <!-- Agrega esto para renderizar rutas hijas -->
    </div>
  </div>
</template>

<style scoped>

</style>
