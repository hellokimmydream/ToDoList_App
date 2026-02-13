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
  margin: 10px 0 0 0;
}
.row {
  display: flex;
  gap: 8px;
  margin: 6px 0;
}
.catBtn {
  flex: 1;
  text-align: left;
  padding: 8px;
}
.catBtn.active {
  font-weight: 700;
}
.delBtn {
  width: 38px;
}
</style>
