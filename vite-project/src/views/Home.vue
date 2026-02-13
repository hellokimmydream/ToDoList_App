<script setup>
import { ref, onMounted, watch } from "vue";
import ListToDo from "../components/ListToDo.vue";
import CreateToDo from "../components/CreateToDo.vue";

const STORAGE_KEY = "todos";
const todos = ref([]);

// 1)charger depuis le localStorage au chargement
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      todos.value = JSON.parse(stored);
    } catch (e) {
      // pour repartir propre
      todos.value = [];
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});

// 2)sauvegarder automatiquement à chaque changement de add/delete/done
watch(
  todos,
  (newTodos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  },
  { deep: true },
);

// ajouter
function addTodo(todoText) {
  todos.value.push({
    id: Date.now(),
    text: todoText,
    done: false,
  });
}

//supprimer
function deleteTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}
</script>

<template>
  <CreateToDo @addTodo="addTodo" />
  <ListToDo :todos="todos" @removeTodo="deleteTodo" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
