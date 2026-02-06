<!--html dans template , condition , boucle , evenement-->
<template>
  <ul>
    <li v-for="todo in todos" v-bind:key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <span
        v-bind:style="{ textDecoration: todo.done ? 'line-through' : 'none' }"
      >
        {{ todo.text }}</span
      >
    </li>
  </ul>
</template>

<!-- js dans script-->
<script setup>
defineProps({
  todos: Array,
});
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 10px;
}

li {
  display: flex;
  align-items: flex-start;
  margin-left: 15px;
  gap: 8px;
}
</style>
