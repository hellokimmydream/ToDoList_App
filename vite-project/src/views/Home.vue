<script setup>
import { ref, onMounted, watch } from "vue";
import CreateCategory from "../components/CreateCategory.vue";
import CategoryList from "../components/CategoryList.vue";

const STORAGE_KEY = "todo_categories_v1";
const categories = ref([]);

// Charger les données
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) categories.value = JSON.parse(stored);
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

// supprimer une catégorie
function deleteCategory(id) {
  categories.value = categories.value.filter((c) => c.id !== id);
}

// Supprimer une tâche
function deleteTodo(categoryId, todoId) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;

  category.todos = category.todos.filter((t) => t.id !== todoId);
}

// tache todo comme important
function toggleImportant(categoryId, todoId) {
  const category = categories.value.find((c) => c.id === categoryId);
  if (!category) return;
  const todo = category.todos.find((t) => t.id === todoId);
  if (!todo) todo.important = !todo.important;
}
</script>

<template>
  <div class="layout">
    <!-- création de liste -->
    <CreateCategory @addCategory="addCategory" />

    <!-- Liste des catégories et tâches -->
    <CategoryList
      :categories="categories"
      @addTodo="addTodo"
      @deleteCategory="deleteCategory"
      @deleteTodo="deleteTodo"
    />
  </div>
</template>

<style scoped>
/* Container principal harmonisé */
.layout {
  max-width: 650px;
  margin: 50px auto;
  padding: 24px;
  border-radius: 24px;
  background: #f4f3ff; /* violet très clair */
  box-shadow: 0 12px 36px rgba(127, 86, 217, 0.15); /* effet flottant */
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Style responsive */
@media (min-width: 768px) {
  .layout {
    max-width: 800px;
    padding: 32px;
    gap: 32px;
  }
}

/* harmonisation typo */
h2,
span,
input,
button {
  font-family: "Poppins", sans-serif;
}

/* Pour les transitions douces */
* {
  transition: all 0.3s ease;
}
</style>
