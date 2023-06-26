import { createStore } from "vuex";
import { set, del, keys, getAll } from "../api/indexedDBService";

const store = createStore({
  state: {
    sortOrder: "title",
    books: [],
  },
  getters: {
    books: (state) => state.books,
    getBookById: (state) => (id) => {
      return state.books.find((book) => book.id === id);
    },
  },
  mutations: {
    addNewBook(state, newBook) {
      const latestBookId = state.books.reduce(
        (prev, current) => {
          return prev.id > current.id ? prev : current;
        },
        { id: 0 }
      ).id;

      const newBookId = latestBookId + 1;

      newBook.id = newBookId;

      set(newBookId, { ...newBook });
      state.books.push(newBook);
    },
    editBook(state, updatedBook) {
      const index = state.books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        set(updatedBook.id, { ...updatedBook });
        state.books[index] = { ...updatedBook };
      }
    },
    deleteBook(state, id) {
      const index = state.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        del(id);
        state.books.splice(index, 1);
      }
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
  },
  actions: {
    async populateFromCache({ state }) {
      if (state.books.length === 0) {
        let [keyss, values] = await Promise.all([keys(), getAll()]);

        state.books = keyss.map((key, index) => ({
          id: key,
          ...values[index],
        }));
      }
    },
  },
});

export default store;
