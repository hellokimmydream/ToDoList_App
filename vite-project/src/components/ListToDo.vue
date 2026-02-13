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
      <button class="btnDelete" @click="removeTask(todo.id)">Delete</button>
    </li>
  </ul>
</template>

<!-- js dans script-->
<script setup>
const props = defineProps({
  todos: Array,
});

const emit = defineEmits(["removeTodo"]);

function removeTask(id) {
  emit("removeTodo", id);
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
  justify-content: space-between;
  margin-left: 15px;
  gap: 8px;
  margin-top: 8px;
}

.btnDelete {
  background-color: #e2e2e2b6;
  max-height: 28px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 80px;
}
</style>
