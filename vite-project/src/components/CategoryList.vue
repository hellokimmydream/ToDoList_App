<template>
  <ul class="categoryList">
    <li v-for="category in categories" :key="category.id" class="category">
      <div class="categoryHeader" @click="toggle(category.id)">
        <span>{{ category.name }}</span>
        <span class="count">{{ category.todos.length }}</span>

        <button
          class="delBtn"
          @click.stop="emit('deleteCategory', category.id)"
        >
          🗑
        </button>
      </div>

      <div v-if="openCategory === category.id" class="todoContainer">
        <CreateToDo @addTodo="emit('addTodo', category.id, $event)" />

        <ul class="todoList">
          <li v-for="todo in category.todos" v-bind:key="todo.id" class="todo">
            <input type="checkbox" />
            {{ todo.text }}
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import CreateToDoVue, { CreateTodo } from "./CreateToDo.vue";

const props = defineProps({
  categories: { type: Array, required: true },
  selectedId: { type: [Number, String, null], default: null },
});

const emit = defineEmits(["selectCategory", "deleteCategory", "addTodo"]);
const openCategory = ref(null);

function toggle(id) {
  openCategory.value = openCategory.value === id ? null : id;
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.category {
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 12px;
  background-color: rgb(241, 240, 255);
}

.categoryHeader {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.category.open {
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.todoList {
  list-style: none;
  padding: 0;
}

.todo {
  display: flex;
  gap: 10px;
  padding: 6px o;
}

.categoryHeader::after {
  content: "▾";
  transition: 0.2s;
  color: #999;
}

.category.open .categoryHeader::after {
  transform: rotate(180deg);
}

.count {
  color: #999;
}

.todoContainer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.todoList {
  list-style: none;
  padding: 0;
}

.todoList li {
  display: flex;
  gap: 10px;
  padding: 8px 0;
}
.categoryBtn {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
}

.categoryBtn:hover {
  background: #f1f1f1;
}

.categoryBtn.active {
  background: #eaeafe;
  color: #4f46e5;
  font-weight: 500;
}

small {
  color: #999;
  margin-left: 6px;
}

.delBtn {
  background: transparent;
  color: #bbb;
  padding: 6px;
}

.delBtn:hover {
  color: #da385b;
}
</style>
