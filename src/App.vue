<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <v-app>
    <v-main>
      <Header />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
