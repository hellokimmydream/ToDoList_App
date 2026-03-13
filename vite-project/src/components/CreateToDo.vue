<template>
  <form class="input-with-button" @submit.prevent="soumettreToDo">
    <input
      v-model="newTodo"
      type="text"
      placeholder="Nouvelle tâche"
      aria-label="Nouvelle tâche"
    />
    <button type="submit" class="btn-icon" aria-label="Ajouter une tâche">
      <font-awesome-icon icon="plus" />
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
const newTodo = ref("");
const emit = defineEmits(["addTodo"]);

function soumettreToDo() {
  const val = newTodo.value.trim();
  if (!val) return;
  emit("addTodo", val);
  newTodo.value = "";
}
</script>

<style scoped>
.input-with-button {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  margin-bottom: 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.input-with-button input {
  width: 100%;
  padding: 14px 50px 14px 18px; /* assez large à droite pour bouton */
  font-size: 16px;
  border-radius: 9999px; /* pill shape */
  border: none;
  background: #f4f3ff; /* violet très clair */
  box-shadow: 0 2px 6px rgb(127 86 217 / 0.15);
  transition:
    box-shadow 0.3s ease,
    background 0.3s ease;
  outline-offset: 2px;
  outline-color: transparent;
}

.input-with-button input:focus {
  background: #e6e4ff;
  box-shadow: 0 4px 12px rgb(127 86 217 / 0.35);
  outline-color: #7f56d9;
}

.btn-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #7f56d9; /* violet saturé */
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgb(127 86 217 / 0.4);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 2;
}

.btn-icon:hover {
  background: #5a3ea1;
  box-shadow: 0 4px 14px rgb(90 62 161 / 0.7);
}

.btn-icon svg {
  stroke: currentColor;
  width: 20px;
  height: 20px;
  pointer-events: none; /* pour que clic passe au bouton */
}
</style>
