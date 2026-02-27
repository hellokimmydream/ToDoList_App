<template>
  <h2 class="monTitre">Mes listes</h2>
  <form class="creeCat" @submit.prevent="submit">
    <input v-model="name" type="text" placeholder="Crée une ToDo list" />
    <button class="add">Créer</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addCategory"]);
const name = ref("");

function submit() {
  const value = name.value.trim();
  if (!value) return;
  emit("addCategory", value);
  name.value = "";
}
</script>

<style scoped>
.monTitre {
  margin-bottom: 10px !important;
}
.creeCat {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.creeCat input {
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
