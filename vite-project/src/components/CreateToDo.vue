<template>
  <form class="formNewTache" @submit.prevent="soumettreToDo">
    <input v-model="newTodo" type="text" placeholder="Nouvelle tâche" />
    <button class="btnAdd">Ajouter</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addTodo"]);
const newTodo = ref("");

function soumettreToDo() {
  const value = newTodo.value.trim();
  if (!value) return;
  emit("addTodo", value);
  newTodo.value = "";
}
</script>

<style scoped>
.formNewTache {
  display: flex;
  gap: 12px;
  margin-top: 17px;
  margin-bottom: 30px;
}

.formNewTache input {
  flex: 1;
}

button {
  background: #111;
  color: white;
}

button:hover {
  background: #333;
}
</style>
