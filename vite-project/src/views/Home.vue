<script setup>
import { ref } from "vue";
import ListToDo from "../components/ListToDo.vue";
import CreateToDo from "../components/CreateToDo.vue";

const todos = ref([]);

function addTodo(todoText) {
  todos.value.push({
    id: Date.now(),
    text: todoText,
    done: false,
  });
}
</script>

<template>
  <CreateToDo @add-todo="addTodo"></CreateToDo>
  <ListToDo v-bind:todos="todos"></ListToDo>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
