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

.btnAdd {
  margin-left: 10px;
  background-color: #e7e7e7;
  max-height: 28px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.formNewTache {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
