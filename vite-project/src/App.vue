<script setup>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Home from "./views/Home.vue";

const categories = ref([]);

onMounted(() => {
  const stored = localStorage.getItem("categories");
  if (stored) {
    categories.value = JSON.parse(stored);
  }
});

function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories.value));
}

function addCategory(name) {
  categories.value.push({
    id: Date.now(),
    name,
    todos: [],
  });
  saveCategories();
}

function addTodo(categoryId, text) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;

  category.todos.push({
    id: Date.now(),
    text,
    done: false,
  });

  categories.value = [...categories.value];
  saveCategories();
}
</script>

<template>
  <Header></Header>
  <Home> </Home>
  <Footer></Footer>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #71ff64aa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
