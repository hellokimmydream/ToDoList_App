<script setup>
import { ref, onMounted, watch } from "vue";
import CreateCategory from "../components/CreateCategory.vue";
import CategoryList from "../components/CategoryList.vue";

const STORAGE_KEY = "todo_categories_v1";
const categories = ref([]);

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) categories.value = JSON.parse(stored);
});

watch(
  categories,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

// Ajouter une nouvelle catégorie
function addCategory(name) {
  const newCat = {
    id: Date.now(),
    name,
    todos: [],
  };
  categories.value.push(newCat);
}

// Ajouter une nouvelle tâche dans une catégorie
function addTodo(categoryId, text) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;

  category.todos.push({
    id: Date.now(),
    text, // ⚠️ Assurez-vous que ce champ est bien le texte
    done: false,
  });
}

// Supprimer une catégorie
function deleteCategory(id) {
  categories.value = categories.value.filter((c) => c.id !== id);
}

// Supprimer une tâche
function deleteTodo(categoryId, todoId) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;
  category.todos = category.todos.filter((t) => t.id !== todoId);
}

// Toggle checkbox
function toggleTodo(categoryId, todoId, done) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;
  const todo = category.todos.find((t) => t.id === todoId);
  if (todo) todo.done = done;
}
</script>

<template>
  <div class="layout">
    <CreateCategory @addCategory="addCategory" />
    <CategoryList
      :categories="categories"
      @addTodo="addTodo"
      @deleteCategory="deleteCategory"
    />
  </div>
</template>

<style scoped>
.layout {
  max-width: 600px;
  margin: 60px auto;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
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
