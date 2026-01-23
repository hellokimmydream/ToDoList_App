<script setup>
import { ref } from "vue";
import ListToDo from "../components/ListToDo.vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <ListToDo />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
