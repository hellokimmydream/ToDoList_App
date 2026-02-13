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
  background-color: #cacaca;
  color: white;
  margin-top: 15px;
  margin-bottom: 25px;
  max-height: 100px;
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
