<!--html dans template , condition , boucle , evenement-->
<template>
  <ul>
    <li v-for="todo in todos" v-bind:key="todo.id">
      <input
        type="checkbox"
        v-bind:checked="todo.done"
        @change="(e) => emit('toggleTodo', todo.id, e.target.checked)"
      />
      <span
        v-bind:style="{ textDecoration: todo.done ? 'line-through' : 'none' }"
      >
        {{ todo.text }}</span
      >
      <button class="btnDelete" @click="emit('removeTodo', todo.id)">
        Delete
      </button>
    </li>
  </ul>
</template>

<!-- js dans script-->
<script setup>
const props = defineProps({
  todos: { type: Array, required: true },
});

const emit = defineEmits(["removeTodo", "toggleTodo"]);

function removeTask(id) {
  emit("removeTodo", id);
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  transition: 0.2s;
}

li:hover {
  background: #f7f7f7;
}

span {
  font-size: 14px;
}

.btnDelete {
  background: transparent;
  color: #bbb;
  font-size: 13px;
}

.btnDelete:hover {
  color: #e11d48;
}
</style>
