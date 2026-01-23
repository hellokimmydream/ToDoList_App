<script setup>
const todos = [
  {
    title: "titre todo 1",
    date: "2025",
  },
  {
    title: "titre todo 1",
    date: "2025",
  },
];
</script>

<template>
  <ul v-for="todo in todos">
    <li>{{ todo.title }} - {{ todo.date }}</li>
  </ul>
</template>

<style lang="css" scoped></style>
