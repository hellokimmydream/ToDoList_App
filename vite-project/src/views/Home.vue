<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ListToDo from "../components/ListToDo.vue";
import CreateToDo from "../components/CreateToDo.vue";
import CreateCategory from "../components/CreateCategory.vue";
import CategoryList from "../components/CategoryList.vue";

const STORAGE_KEY = "todo_categories_v1";
const categories = ref([]);
const selectedCategoryId = ref(null);

// category selectionnée ref
const selectedCategory = computed(() => {
  return (
    categories.value.find((c) => c.id === selectedCategoryId.value) || null
  );
});

// 1)charger depuis le localStorage au chargement
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      categories.value = JSON.parse(stored);
      if (categories.value.length > 0) {
        selectedCategoryId.value = categories.value[0].id;
      }
    } catch (e) {
      // pour repartir propre
      localStorage.removeItem(STORAGE_KEY);
      categories.value = [];
      selectedCategoryId.value = null;
    }
  }
});

// 2)sauvegarder automatiquement deep à chaque changement de add/delete/done
watch(
  categories,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

// --- Catégories ---
function addCategory(name) {
  const clean = name.trim();
  if (!clean) return;

  const newCat = {
    id: Date.now(),
    name: clean,
    todos: [],
  };

  categories.value.push(newCat);
  selectedCategoryId.value = newCat.id;
}

function selectCategory(id) {
  selectedCategoryId.value = id;
}

function deleteCategory(id) {
  const idx = categories.value.findIndex((c) => c.id === id);
  if (idx === -1) return;

  categories.value.splice(idx, 1);

  // pour si on supprime une categorie selectionner alors on selectionne une autee
  if (selectedCategoryId.value === id) {
    selectedCategoryId.value = categories.value.length
      ? categories.value[0].id
      : null;
  }
}

// --- Todos dans une catégorie ---
function addTodo(todoText) {
  if (!selectedCategory.value) return;

  const clean = todoText.trim();
  if (!clean) return;

  selectedCategory.value.todos.push({
    id: Date.now(),
    text: clean,
    done: false,
  });
}

function deleteTodo(todoId) {
  if (!selectedCategory.value) return;

  selectedCategory.value.todos = selectedCategory.value.todos.filter(
    (t) => t.id !== todoId,
  );
}

function toggleTodo(todoId, done) {
  if (!selectedCategory.value) return;

  const t = selectedCategory.value.todos.find((x) => x.id === todoId);
  if (t) t.done = done;
}
</script>

<template>
  <div style="display: grid; grid-template-columns: 280px 1fr; gap: 16px">
    <!-- Colonne gauche: catégories -->
    <aside>
      <CreateCategory @addCategory="addCategory" />
      <CategoryList
        :categories="categories"
        :selectedId="selectedCategoryId"
        @selectCategory="selectCategory"
        @deleteCategory="deleteCategory"
      />
    </aside>

    <!-- Colonne droite: todos de la catégorie -->
    <main>
      <div v-if="!selectedCategory">
        <p>Crée une catégorie pour commencer.</p>
      </div>

      <div v-else>
        <h2 style="margin: 0 0 10px 0">{{ selectedCategory.name }}</h2>

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
.read-the-docs {
  color: #888;
}
</style>
