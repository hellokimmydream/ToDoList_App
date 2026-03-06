<template>
  <ul class="categoryList">
    <li v-for="category in categories" :key="category.id" class="category">
      <!-- Header catégorie -->
      <div class="categoryHeader" @click="toggle(category.id)">
        <span>{{ category.name }}</span>
        <span class="count">{{
          category.todos ? category.todos.length : 0
        }}</span>

        <button
          class="delBtn"
          @click.stop="emit('deleteCategory', category.id)"
        >
          🗑
        </button>
      </div>

      <!-- Liste des tâches -->
      <div v-if="openCategory === category.id" class="todoContainer">
        <CreateToDo @addTodo="emit('addTodo', category.id, $event)" />

        <ul class="todoList">
          <li v-for="todo in category.todos" :key="todo.id" class="todo">
            <input
              type="checkbox"
              v-model="todo.done"
              @change="onTodoCheck(category.id, todo)"
              class="roundedCheckbox"
            />
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
            <button
              class="delBtn"
              @click.stop="emit('deleteTodo', category.id, todo.id)"
            >
              🗑
            </button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import CreateToDo from "./CreateToDo.vue";

const props = defineProps({
  categories: { type: Array, required: true },
  selectedId: { type: [Number, String, null], default: null },
});

const emit = defineEmits([
  "selectCategory",
  "deleteCategory",
  "addTodo",
  "deleteTodo",
]);
const openCategory = ref(null);

function toggle(id) {
  openCategory.value = openCategory.value === id ? null : id;
}

// Supprimer automatiquement la tâche cochée
function onTodoCheck(categoryId, todo) {
  if (todo.done) {
    emit("deleteTodo", categoryId, todo.id);
  }
}
</script>

<style scoped>
/* Liste catégories */
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.category {
  border-radius: 12px;
  background: #f9f9f9;
  margin-bottom: 12px;
  padding: 12px;
  transition: 0.2s;
}

.categoryHeader {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
}

.category:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.count {
  color: #999;
}

/* Container tâches */
.todoContainer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.todoList {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

/* Checkbox arrondie et petite */
input.roundedCheckbox[type="checkbox"] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  accent-color: #7f56d9; /* violet moderne */
}

/* Texte barre quand fait */
.todo span.done {
  text-decoration: line-through;
  color: #aaa;
  transition: all 0.2s;
}

/* Bouton supprimer tâche */
.delBtn {
  background: transparent;
  color: #bbb;
  border: none;
  padding: 4px;
  font-size: 14px;
  cursor: pointer;
}

.delBtn:hover {
  color: #da385b;
}
</style>
