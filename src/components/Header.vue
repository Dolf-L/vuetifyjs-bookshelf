<script setup>
import { computed, unref } from "vue";
import { useDisplay } from "vuetify";

const display = useDisplay();

const isMobile = computed(() => {
  return unref(display.mobile);
});
</script>

<template>
  <v-app-bar color="#15202B" class="d-flex flex-column">
    <v-app-bar-title class="font-weight-bold text-h4 text-white">
      <div v-if="!isMobile">
        <v-icon size="large" color="white" icon="mdi-bookshelf"></v-icon>
        MY BOOKSHELF
      </div>
      <div v-else>
        <v-icon size="large" color="white" icon="mdi-bookshelf"></v-icon>
      </div>
    </v-app-bar-title>
    <v-btn
      prepend-icon="mdi-plus"
      variant="flat"
      :to="{ name: 'book_add', pageTitle: 'Add New Book' }"
    >
      Add New Book
    </v-btn>
  </v-app-bar>
</template>

<style scoped></style>
