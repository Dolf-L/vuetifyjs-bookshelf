<script setup>
import { ref } from "vue";
import router from "../router";
import { useRoute } from "vue-router";
import store from "../store";
const route = useRoute();
const id = route.params.id;

const bookById = store.getters.getBookById(parseInt(id));
const book = ref(
  bookById
    ? bookById
    : {
        id: null,
        title: "",
        author: "",
        genre: "",
        year: null,
      }
);

defineProps({
  pageTitle: String,
})

const deleteBook = (id) => {
  store.commit("deleteBook", parseInt(id));
  router.push("/");
};

const save = (book) => {
  if (book.id === null) {
    store.commit("addNewBook", book);
  } else {
    store.commit("editBook", book);
  }

  router.push("/");
};
</script>

<template>
  <v-container>
    <v-btn variant="text" :to="{ name: 'home' }">
      <v-icon start icon="mdi-arrow-left"></v-icon>
      Back to Home
    </v-btn>
    <h1 class="text-center">{{ pageTitle }}</h1>
    <div class="wrapper">
      <div v-if="book">
        <div class="book-description">
          <v-responsive class="mx-auto mb-5" max-width="680">
            <v-text-field
              label="Title"
              hide-details="auto"
              v-model="book.title"
            ></v-text-field>
          </v-responsive>
          <v-responsive class="mx-auto mb-5" max-width="680">
            <v-text-field
              label="Author"
              hide-details="auto"
              v-model="book.author"
            ></v-text-field>
          </v-responsive>
          <v-responsive class="mx-auto mb-5" max-width="680">
            <v-text-field
              label="Genre"
              hide-details="auto"
              v-model="book.genre"
            ></v-text-field>
          </v-responsive>
          <v-responsive class="mx-auto mb-5" max-width="680">
            <v-text-field
              label="Year"
              hide-details="auto"
              v-model="book.year"
            ></v-text-field>
          </v-responsive>

          <div class="buttons-group">
            <v-btn color="green" @click="save(book)">Save</v-btn>
            <v-btn
                color="red"
                variant="text"
                v-if="book.id"
                @click="deleteBook(book.id)"
              >Delete</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.buttons-group {
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 2em;
}
</style>
