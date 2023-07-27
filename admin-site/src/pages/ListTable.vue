<script>
import ButtonComponent from "../components/ButtonComponent.vue";
import TableRowComponent from "../components/TableRowComponent.vue";
export default {
  name: "product",
  emits: [
    "handleDataAll",
    "handleLogsHistory",
    "deleteProduct",
    "handleCategory",
    "handleProduct",
    "changePage",
    "changePage",
    "handleDetailProduct",
    "handlePatchProduct",
    "deleteProduct",
    "deleteCategory",
  ],
  props: ["dataCuisines", "dataAll", "currentPage", "dataCategory", "dataLogs"],
  components: { TableRowComponent, ButtonComponent },
  methods: {
    fetchDataAll() {
      this.$emit("handleDataAll");
    },
    fetchHistory() {
      this.$emit("handleLogsHistory");
    },
    fetchCategory() {
      this.$emit("handleCategory");
    },
    fetchProduct() {
      this.$emit("handleProduct");
    },
    goAddProduct() {
      console.log("masuk kasta2");
      this.$emit("changePage", "addProduct");
    },
    goAddCategory() {
      console.log("masuk kasta2");
      this.$emit("changePage", "addCategory");
    },
    goEditProduct(productId) {
      this.$emit("handleDetailProduct", productId);
    },
    doStatus(id, status) {
      console.log("masuk di kasta2");
      this.$emit("handlePatchProduct", id, status);
    },
    destroy(productId) {
      this.$emit("deleteProduct", productId);
    },
    removeCategory(categoryId) {
      this.$emit("deleteCategory", categoryId);
    },
  },
  created() {
    this.fetchHistory();
    this.fetchCategory();
    this.fetchProduct();
    this.fetchDataAll();
  },
};
</script>

<template>
  <div style="margin-top: 3rem" class="border-bottom">
    <h1 v-if="currentPage === 'product'">Product</h1>
    <h1 v-if="currentPage === 'category'">Category</h1>
    <h1 v-if="currentPage === 'logs'">Logs</h1>
    <ButtonComponent
      :currentPage="currentPage"
      @click.prevent="
        currentPage === 'product' ? goAddProduct() : goAddCategory()
      "
    />
    <div>
      <div class="col-12 table-responsive">
        <table class="table table-bordered text-left">
          <tr v-if="currentPage === 'product'">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col" width="180px">Image</th>
            <th scope="col" width="250px">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Author</th>
            <th scope="col">Status</th>
            <th scope="col" width="50px"></th>
          </tr>
          <tr v-if="currentPage === 'category'">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col" width="50px"></th>
          </tr>
          <tr v-if="currentPage === 'logs'">
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Create Date</th>
            <th scope="col">Update Date</th>
            <th scope="col">Updated By</th>
          </tr>
          <TableRowComponent
            v-for="(element, index) in dataCuisines"
            :key="element.id"
            :element="element"
            :index="index"
            :currentPage="currentPage"
            @handlePatchProduct="doStatus"
            @handleDetailProduct="goEditProduct"
            @fetchDataAll="fetchProduct"
            @goEditProduct="goEditProduct"
            @destroy="destroy"
          />
          <TableRowComponent
            v-for="(element, index) in dataCategory"
            :key="element.id"
            :element="element"
            :index="index"
            :currentPage="currentPage"
            @fetchDataAll="fetchCategory"
            @removeCategory="removeCategory"
          />
          <TableRowComponent
            v-for="(element, index) in dataLogs"
            :key="element.id"
            :element="element"
            :index="index"
            :currentPage="currentPage"
            @fetchDataAll="fetchHistory"
          />
        </table>
      </div>
    </div>
  </div>
</template>
