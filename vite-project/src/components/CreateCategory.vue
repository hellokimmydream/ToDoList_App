<template>
  <form @submit.prevent="submit">
    <input v-model="name" type="text" placeholder="Crée une ToDo list" />
    <button>Créer</button>
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

<style scoped></style>
