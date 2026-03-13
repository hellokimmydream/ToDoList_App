<template>
  <transition-group name="fade" tag="ul" class="todoList">
    <li v-for="todo in todos" :key="todo.id" class="todo">
      <input
        type="checkbox"
        class="roundedCheckbox"
        @change="emit('removeTodo', todo.id)"
      />
      <span>{{ todo.text }}</span>
    </li>
  </transition-group>
</template>

<script setup>
const props = defineProps({
  todos: { type: Array, required: true },
});

const emit = defineEmits(["removeTodo"]);
</script>

<style scoped>
/* Liste de tâches */
.todoList {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Ligne tâche moderne */
.todo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f4f3ff; /* violet clair */
  box-shadow: 0 2px 6px rgba(127, 86, 217, 0.15);
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.todo:hover {
  box-shadow: 0 4px 12px rgba(127, 86, 217, 0.25);
  transform: translateY(-1px);
}

span {
  font-size: 15px;
  color: #333;
  flex: 1;
}

/* Checkbox stylisée */
input.roundedCheckbox[type="checkbox"] {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  accent-color: #7f56d9; /* violet moderne */
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Animation ajout / suppression */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
