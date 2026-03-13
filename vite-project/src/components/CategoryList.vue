<template>
  <ul class="categoryList">
    <li v-for="category in categories" :key="category.id" class="category">
      <!-- Header catégorie -->
      <div class="categoryHeader" @click="toggle(category.id)">
        <span>{{ category.name }}</span>
        <span class="count">{{
          category.todos ? category.todos.length : 0
        }}</span>

        <!-- poubelle pour delet-->
        <button
          class="delBtn"
          @click.stop="emit('deleteCategory', category.id)"
          aria-label="Supprimer la catégorie"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>

      <!-- Liste des tâches -->
      <div v-if="openCategory === category.id" class="todoContainer">
        <CreateToDo @addTodo="emit('addTodo', category.id, $event)" />

        <ListToDo
          :todos="category.todos"
          @removeTodo="emit('deleteTodo', category.id, $event)"
          @toggleImportant="toggleImportant(category.id, $event)"
        />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import CreateToDo from "./CreateToDo.vue";
import ListToDo from "./ListToDo.vue";

const props = defineProps({
  categories: { type: Array, required: true },
});

const emit = defineEmits([
  "deleteCategory",
  "addTodo",
  "deleteTodo",
  "toggleImportant",
]);

const openCategory = ref(null);

function toggle(id) {
  openCategory.value = openCategory.value === id ? null : id;
}

function toggleImportant(categoryId, todoId) {
  const category = props.categories.find((c) => c.id === categoryId);
  if (!category) return;

  const todo = category.todos.find((t) => t.id === todoId);
  if (!todo) return;

  todo.important = !todo.important;
}
</script>

<style scoped>
.category {
  border-radius: 16px;
  background: #f4f3ff;
  margin-bottom: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(127, 86, 217, 0.15);
  transition: all 0.3s ease;
}

.category:hover {
  box-shadow: 0 6px 20px rgba(127, 86, 217, 0.25);
  transform: translateY(-2px);
}

.categoryHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding-bottom: 8px;
}

.count {
  color: #7f56d9;
  font-weight: 500;
}

.delBtn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #bbb;
  transition: color 0.2s;
}

.delBtn:hover {
  color: #ff4d6d;
}

.todoContainer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(127, 86, 217, 0.2);
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
