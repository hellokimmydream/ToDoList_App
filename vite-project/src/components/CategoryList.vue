<template>
  <ul class="categoryList">
    <li v-for="category in categories" :key="category.id" class="category">
      <!-- Header pour les catégorie (contien les todo)) -->
      <div class="categoryHeader" @click="toggle(category.id)">
        <span>{{ category.name }}</span>

        <span class="count">
          {{ category.todos ? category.todos.length : 0 }}
        </span>

        <button
          class="delBtn"
          @click.stop="emit('deleteCategory', category.id)"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>

      <!-- liste des tâches -->
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
/* liste catégories */
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.category {
  border-radius: 16px;
  background: #f4f3ff;
  margin-bottom: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(127, 86, 217, 0.15);
  transition: all 0.3s ease;
}

/* survol moderne */
.category:hover {
  box-shadow: 0 6px 20px rgba(127, 86, 217, 0.25);
  transform: translateY(-2px);
}

/* Header catégorie */
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

/* bouton supprimer catégorie */
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

/* container des tâches */
.todoContainer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(127, 86, 217, 0.2); /* violet léger */
}

/* liste tâches */
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
