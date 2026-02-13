<!--html dans template , condition , boucle , evenement-->
<template>
  <ul>
    <li v-for="(todo, index) in todos" v-bind:key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <span
        v-bind:style="{ textDecoration: todo.done ? 'line-through' : 'none' }"
      >
        {{ todo.text }}</span
      >
      <button class="btnDelete" @click="removeTask(index)">Delete</button>
    </li>
  </ul>
</template>

<!-- js dans script-->
<script setup>
const props = defineProps({
  todos: Array,
});

const emit = defineEmits(["removeTodo"]);

function removeTask(index) {
  emit("removeTodo", index);
}
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 10px;
}

li {
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 15px;
  gap: 8px;
}

.btnDelete {
  display: flex;
  justify-content: right;
  justify-items: right;
}
</style>
