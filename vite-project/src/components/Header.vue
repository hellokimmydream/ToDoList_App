<template>
  <header class="header">
    <h1>To Do List</h1>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #222;
  color: white;
}

.logo-image img {
  height: 50px;
}
.search-container {
  position: relative;
}
#search-input {
  padding: 5px;
}
</style>
