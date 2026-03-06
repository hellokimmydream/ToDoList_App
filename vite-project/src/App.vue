<script setup>
import { ref, onMounted } from "vue";
import Home from "./views/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import CreateToDo from "./components/CreateToDo.vue";
import ListToDo from "./components/ListToDo.vue";
import CategoryList from "./components/CategoryList.vue";

// les données
const todos = ref([]);
// lire depuis le local storage au chargement
// quand le composant se charge, regarde si todos existe, si oui = alors le transforme en tableau JS
onMounted(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos);
  }
});

// fonction save todos
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

// pour le btn delete de chaque todo
function deleteTodo(index) {
  todos.value.splice(index, 1);

  // envoit id categorie quand on ajoute une tache
  function addTodo(categoryId, text) {
    const category = categories.value.find(
      (categorie) => categorie.id === categoryId,
    );

    category.todos.push({
      id: Date.now(),
      text,
    });
  }
}
</script>

<template>
  <Header></Header>
  <Home>
    <ListToDo>
      <CreateToDo>
        <CategoryList :categories="categories" @add-todo="addTodo" />
      </CreateToDo>
    </ListToDo>
  </Home>
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
