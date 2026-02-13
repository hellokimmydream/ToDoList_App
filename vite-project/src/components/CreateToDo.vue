<!--html dans template , condition , boucle , evenement-->
<template>
  <form class="formNewTache" @submit.prevent="soumettreToDo">
    <input v-model="newTodo" type="text" placeholder="Nouvelle tâche" />
    <button class="btnAdd">Ajouter</button>
  </form>
</template>

<!-- js dans script-->
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

<style lang="css" scoped>
.completed {
  text-decoration: line-through;
}

.btnAdd {
  margin-left: 10px;
  background-color: #e2e2e2b6;
  max-height: 28px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 80px;
}

.formNewTache {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
