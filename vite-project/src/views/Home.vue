<script setup>
import { ref, onMounted, watch } from "vue";
import CreateCategory from "../components/CreateCategory.vue";
import CategoryList from "../components/CategoryList.vue";

const STORAGE_KEY = "todo_categories_v1";
const categories = ref([]);

// Charger les données
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    categories.value = JSON.parse(stored);
  }
});

// Sauvegarde automatique
watch(
  categories,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

// Ajouter une catégorie
function addCategory(name) {
  categories.value.push({
    id: Date.now(),
    name,
    todos: [],
  });
}

// Ajouter une tâche
function addTodo(categoryId, text) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;

  category.todos.push({
    id: Date.now(),
    text,
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
</script>

<template>
  <div class="layout">
    <CreateCategory @addCategory="addCategory" />

    <CategoryList
      :categories="categories"
      @addTodo="addTodo"
      @deleteCategory="deleteCategory"
      @deleteTodo="deleteTodo"
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
</style>
