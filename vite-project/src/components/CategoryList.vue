<template>
  <ul class="categoryList">
    <li v-for="category in categories" :key="category.id" class="category">
      <!-- Header catégorie -->
      <div class="categoryHeader" @click="toggle(category.id)">
        <span>{{ category.name }}</span>

        <span class="count">
          {{ category.todos ? category.todos.length : 0 }}
        </span>

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

        <transition-group name="fade" tag="ul" class="todoList">
          <li v-for="todo in category.todos" :key="todo.id" class="todo">
            <input
              type="checkbox"
              class="roundedCheckbox"
              @change="emit('deleteTodo', category.id, todo.id)"
            />

            <span>{{ todo.text }}</span>
          </li>
        </transition-group>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import CreateToDo from "./CreateToDo.vue";

const props = defineProps({
  categories: { type: Array, required: true },
});

const emit = defineEmits(["deleteCategory", "addTodo", "deleteTodo"]);

const openCategory = ref(null);

function toggle(id) {
  openCategory.value = openCategory.value === id ? null : id;
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

.category:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Header catégorie */
.categoryHeader {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
}

.count {
  color: #999;
}

/* Bouton suppression catégorie */
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

/* Container tâches */
.todoContainer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

/* Liste tâches */
.todoList {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Ligne tâche */
.todo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

/* Checkbox */
input.roundedCheckbox[type="checkbox"] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  accent-color: #7f56d9;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
