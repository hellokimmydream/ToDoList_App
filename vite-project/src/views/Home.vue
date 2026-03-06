<script setup>
import { ref, computed, onMounted, watch } from "vue";

import ListToDo from "../components/ListToDo.vue";
import CreateToDo from "../components/CreateToDo.vue";
import CreateCategory from "../components/CreateCategory.vue";
import CategoryList from "../components/CategoryList.vue";

const STORAGE_KEY = "todo_categories_v1";

const categories = ref([]);
const selectedCategoryId = ref(null);

const selectedCategory = computed(
  () => categories.value.find((c) => c.id === selectedCategoryId.value) || null,
);

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    categories.value = JSON.parse(stored);

    if (categories.value.length > 0) {
      selectedCategoryId.value = categories.value[0].id;
    }
  }
});

watch(
  categories,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

function addCategory(name) {
  const newCat = {
    id: Date.now(),
    name,
    todos: [],
  };

  categories.value.push(newCat);
  selectedCategoryId.value = newCat.id;
}

function selectCategory(id) {
  selectedCategoryId.value = id;
}

function deleteCategory(id) {
  categories.value = categories.value.filter((c) => c.id !== id);

  if (selectedCategoryId.value === id) {
    selectedCategoryId.value = categories.value.length
      ? categories.value[0].id
      : null;
  }
}

function addTodo(text) {
  if (!selectedCategory.value) return;

  selectedCategory.value.todos.push({
    id: Date.now(),
    text,
    done: false,
  });
}

function deleteTodo(id) {
  if (!selectedCategory.value) return;

  selectedCategory.value.todos = selectedCategory.value.todos.filter(
    (t) => t.id !== id,
  );
}

function toggleTodo(id, done) {
  if (!selectedCategory.value) return;

  const todo = selectedCategory.value.todos.find((t) => t.id === id);
  if (todo) todo.done = done;
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <CreateCategory @addCategory="addCategory" />

      <CategoryList
        :categories="categories"
        :selectedId="selectedCategoryId"
        @selectCategory="selectCategory"
        @deleteCategory="deleteCategory"
      />
    </aside>

    <main class="content">
      <div v-if="!selectedCategory" class="empty">
        Crée une catégorie pour commencer.
      </div>

      <div v-else>
        <h2 class="category-title">
          {{ selectedCategory.name }}
        </h2>

        <CreateToDo @addTodo="addTodo" />

        <ListToDo
          :todos="selectedCategory.todos"
          @removeTodo="deleteTodo"
          @toggleTodo="toggleTodo"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  max-width: 1100px;
  margin: 60px auto;
  background: white;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sidebar {
  border-right: 1px solid #eee;
  padding: 40px 30px;
  background: #fafafa;
}
@media (min-width: 768px) {
  .sidebar {
    grid-template-columns: repeat(3, 1fr);
  }
}

.content {
  padding: 40px 30px;
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-title {
  margin-bottom: 7px;
  font-size: 20px;
}

.empty {
  color: #777;
}
</style>
