<script>
export default {
  name: "tableRows",
  emits: [
    "fetchDataAll",
    "fetchHistory",
    "fetchCategory",
    "fetchProduct",
    "handleDetailProduct",
    "handlePatchProduct",
    "destroy",
    "removeCategory",
  ],
  props: ["element", "index", "currentPage"],
  methods: {
    listDataAll() {
      this.$emit("fetchDataAll");
    },
    listLogs() {
      this.$emit("fetchHistory");
    },
    listCategopry() {
      this.$emit("fetchCategory");
    },
    listCuisines() {
      this.$emit("fetchProduct");
    },
    goEditProduct(productId) {
      this.$emit("handleDetailProduct", productId);
    },
    doStatus(id, status) {
      console.log("masuk di kasta 3", id, status);
      this.$emit("handlePatchProduct", id, status);
    },
    destroyProduct(productId) {
      this.$emit("destroy", productId);
    },
    destroyCategoy(categoryId) {
      this.$emit("removeCategory", categoryId);
    },
  },
  created() {
    this.listCuisines();
    this.listCategopry();
    this.listLogs();
    this.listDataAll();
  },
};
</script>

<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ element.name }}</td>
    <td v-if="currentPage === 'product'">
      <img :src="element.imgUrl" class="img-fluid" />
    </td>
    <td v-if="currentPage === 'product' || currentPage === 'logs'">
      {{ element.description }}
    </td>
    <td v-if="currentPage === 'product'">
      {{ element.categoryId }}
    </td>
    <td v-if="currentPage === 'product'">{{ element.price }}</td>
    <td v-if="currentPage === 'product'">{{ element.authorId }}</td>
    <td v-if="currentPage === 'logs'">{{ element.createdAt }}</td>
    <td v-if="currentPage === 'logs'">{{ element.updatedAt }}</td>
    <td v-if="currentPage === 'logs'">{{ element.updatedBy }}</td>
    <td v-if="currentPage === 'product'">
      <select
        class="form-select"
        v-model="element.status"
        :id="element.id"
        @change="doStatus(element.id, element.status)"
        required
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Archived">Archived</option>
      </select>
    </td>
    <td>
      <div style="display: flex; justify-content: center; align-items: center">
        <div v-if="currentPage === 'product'" style="margin-left: 2rem">
          <a @click.prevent="goEditProduct(element.id)"
            ><img src="../assets/edit.svg" alt=""
          /></a>
        </div>
        <div v-if="currentPage === 'product' || currentPage === 'category'">
          <a
            @click.prevent="
              currentPage === 'product'
                ? destroyProduct(element.id)
                : destroyCategoy(element.id)
            "
            ><img src="../assets/trash-1.svg" alt=""
          /></a>
        </div>
      </div>
    </td>
  </tr>
</template>
