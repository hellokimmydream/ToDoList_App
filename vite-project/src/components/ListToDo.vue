<template>
  <transition-group name="fade" tag="ul" class="todoList">
    <li v-for="todo in todos" :key="todo.id" class="todo">
      <!-- Checkbox supprime automatiquement la tâche -->
      <input
        type="checkbox"
        class="roundedCheckbox"
        @change="emit('removeTodo', todo.id)"
      />

      <!-- texte de la tâche todo en gras si on veut noté comme important -->
      <span :class="{ important: todo.important }">{{ todo.text }}</span>

      <!-- bouton important icone aligné à droite comme poubelle de category -->
      <button
        class="btnImportant"
        @click.stop="emit('toggleImportant', todo.id)"
        :aria-label="
          todo.important ? 'Marquer comme normale' : 'Marquer comme important'
        "
      >
        <font-awesome-icon :icon="todo.important ? 'star' : ['far', 'star']" />
      </button>
    </li>
  </transition-group>
</template>

<script setup>
const props = defineProps({
  todos: { type: Array, required: true },
});

const emit = defineEmits(["removeTodo", "toggleImportant"]);
</script>

<style scoped>
.todoList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todoList,
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.todo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f4f3ff;
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

span.important {
  font-weight: 600;
  color: #7f56d9;
}

/* checkbox */
input.roundedCheckbox[type="checkbox"] {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  accent-color: #7f56d9;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0;
  flex-shrink: 0;
}

/* Bouton pour cocher important */
.btnImportant {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #bbb;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  padding: 0;
  outline: none;
}

.btnImportant:hover {
  color: #ffcc00;
}

.btnImportant:focus-visible {
  outline: 2px solid #7f56d9;
  outline-offset: 2px;
  border-radius: 4px;
}
/* animation pour ajout / suppression */
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
