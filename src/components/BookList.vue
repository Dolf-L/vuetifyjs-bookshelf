<script setup>
import { computed } from "vue";
import store from "../store";

store.dispatch("populateFromCache");

const sortOrder = computed(() => store.state.sortOrder);

const books = computed(() => {
  let sortedBooks = store.state.books;
  sortedBooks.sort((x, y) =>
    x[sortOrder.value] > y[sortOrder.value] ? 1 : -1
  );
  return sortedBooks;
});

const setSortBy = (field) => {
  store.commit("setSortOrder", field);
};
</script>

<template>
  <v-container class="home-container" max-width="1024">
    <v-row justify="center" align="center">
      <v-col @click="setSortBy('title')" cols="auto"> Sort by: </v-col>

      <v-col @click="setSortBy('title')" cols="auto">
        <v-btn
          density="compact"
          :variant="sortOrder === 'title' ? 'outlined' : 'elevated'"
          >Title</v-btn
        >
      </v-col>

      <v-col @click="setSortBy('author')" cols="auto">
        <v-btn
          density="compact"
          :variant="sortOrder === 'author' ? 'outlined' : 'elevated'"
          >Author</v-btn
        >
      </v-col>

      <v-col @click="setSortBy('genre')" cols="auto">
        <v-btn
          density="compact"
          :variant="sortOrder === 'genre' ? 'outlined' : 'elevated'"
          >Genre</v-btn
        >
      </v-col>

      <v-col @click="setSortBy('year')" cols="auto">
        <v-btn
          density="compact"
          :variant="sortOrder === 'year' ? 'outlined' : 'elevated'"
          >Year</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="py-4">
      <v-col v-for="book of books" :key="book.id" col="12" md="4">
        <v-card
          class="mx-auto book-card"
          variant="elevated"
          :to="{ name: 'book_edit', params: { id: book.id } }"
        >
          <div class="pa-4"></div>

          <v-card-title> {{ book.title }} </v-card-title>

          <v-card-text class="text-body-1 text-secondary font-weight-bold">
            Author: {{ book.author }}
          </v-card-text>

          <v-card-text class="text-body-1 text-secondary font-weight-bold">
            Genre: {{ book.genre }}
          </v-card-text>

          <v-card-text class="text-body-1 text-secondary font-weight-bold">
            Year of publication: {{ book.year }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-container {
  max-width: 1024px;
}
</style>
