<template>
  <ul>
    <li v-for="category in categories" v-bind:key="category.id" class="row">
      <button
        class="categoryBtn"
        v-bind:class="{ active: category.id === selectedId }"
        @click="emit('selectCategory', category.id)"
      >
        {{ category.name }}<small>({{ category.todos.length }})</small>
      </button>
      <button class="delBtn" @click="emit('deleteCategory', category.id)">
        X
      </button>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
  selectedId: { type: [Number, String, null], default: null },
});

const emit = defineEmits(["selectCategory", "deleteCategory"]);
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
  color: #e11d48;
}
</style>
