import { describe, it, expect, vi } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../HomeView.vue";
import BookView from "../BookView.vue";

const store = createStore({
  getters: {
    getBookById: vi.fn().mockReturnValue({
      id: 5,
      title: "Book Title",
      author: "Book Author",
      genre: "Book Genre",
      year: 2021,
    }),
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: "/books/:id", name:'', component: BookView },
      { path: "/", name:'home', component: HomeView }
  ],
});

const vuetify = createVuetify({ components, directives })

describe("Book", () => {
  it("renders correctly with book details", () => {
    const wrapper = mount(BookView, {
      global: {
        plugins: [store, router, vuetify],
      },
      props: {
        id: 5,
      },
    });

    expect(wrapper.find("h1").text()).toBe("Edit Book");
  });
});
