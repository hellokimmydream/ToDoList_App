<!--html dans template , condition , boucle , evenement-->
<template>
  <form @submit.prevent="soumettreToDo">
    <input v-model="newTodo" type="text" placeholder="Nouvelle tâche" />
    <button>Ajouter</button>
  </form>
</template>

<!-- js dans script-->
<script setup>
import { ref } from "vue";

const emitAddTodo = defineEmits(["addTodo"]);
const newTodo = ref("");

function soumettreToDo() {
  if (newTodo.value.trim() !== "") {
    emitAddTodo("addTodo", newTodo.value);
    newTodo.value = "";
  }
}
</script>

<style lang="css" scoped>
.completed {
  text-decoration: line-through;
}
</style>
