<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" @change="emit('removeTodo', todo.id)" />

      <span>
        {{ todo.text }}
      </span>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  todos: { type: Array, required: true },
});

const emit = defineEmits(["removeTodo"]);
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
  font-size: 14px;
  border: none;
  padding: 4px;
  cursor: pointer;
  margin-left: auto;
}

/* pour eviter que le texte pousse le bouton hors écran */
.todo span {
  flex: 1;
}
.btnDelete:hover {
  color: #da385b;
}
</style>
