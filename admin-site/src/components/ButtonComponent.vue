<script>
export default {
  name: "buttonAdd",
  props: ["currentPage"],
  emits: [],
};
</script>

<template>
  <div class="d-flex justify-content-end" style="margin-bottom: 1rem">
    <button
      v-if="currentPage === 'product' || currentPage === 'category'"
      class="btn btn-primary rounded-pill"
    >
      <img src="../assets/plus.svg" alt="" />
      {{ currentPage === "product" ? "Add Product" : "Add Category" }}
    </button>
  </div>
</template>
