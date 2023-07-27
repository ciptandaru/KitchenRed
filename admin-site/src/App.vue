<script>
import ListTable from "./pages/ListTable.vue";
import Swal from "sweetalert2";
import loginPage from "./pages/loginPage.vue";
import register from "./pages/register.vue";
import dashboard from "./pages/dashboard.vue";
import axios from "axios";
import Navbar from "./pages/navbar.vue";
import AddProduct from "./pages/FormAddPage.vue";
import AddCategory from "./pages/addCategory.vue";
const baseUrl = "http://localhost:3000";
export default {
  data() {
    return {
      dataAll: [],
      cuisineId: 0,
      dataCuisinesDetail: [],
      dataLogs: [],
      dataCuisines: [],
      dataCategory: [],
      totalCategory: 0,
      totalCuisine: 0,
      dashboards: [],
      currentPage: "login",
      loginStatus: false,
    };
  },
  components: {
    ListTable,
    dashboard,
    loginPage,
    Navbar,
    register,
    AddProduct,
    AddCategory,
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.loginStatus = true;
      this.currentPage = "dashboard";
      this.handleDashboard();
    } else {
      this.currentPage = "login";
    }
  },
  methods: {
    //----------------------pindah-pindah halaman------------------------
    changePage(val) {
      this.currentPage = val;
      if (val === "addProduct" || val === "editProduct") {
        this.handleCategory();
      }
    },
    //----------------------REGISTER START------------------------
    async handleRegister(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/register`, input);
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.currentPage = "login";
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
        console.log(err);
      }
    },
    //----------------------REGISTER END------------------------
    //----------------------Google Login START------------------------
    async handleGoogleLogin(res) {
      try {
        const { data } = await axios.post(`${baseUrl}/glogin`, null, {
          headers: {
            token_google: res.credential,
          },
        });
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        this.currentPage = "dashboard";
        this.loginStatus = true;
        this.handleDashboard();
        Swal.fire({
          width: 200,
          icon: "success",
          text: "login success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.res.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    //----------------------Google Login END------------------------
    //----------------------LOGIN START------------------------
    async handleLogin(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, input);
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        this.loginStatus = true;
        this.currentPage = "dashboard";
        this.handleDashboard();
        Swal.fire({
          width: 200,
          icon: "success",
          text: "login success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    //----------------------LOGIN END------------------------
    async handleLogout() {
      localStorage.clear();
      this.loginStatus = false;
      this.currentPage = "login";
    },
    async handleDashboard() {
      const token = localStorage.getItem("access_token");
      try {
        const { data } = await axios({
          method: "get",
          url: `${baseUrl}/dashboard`,
          headers: {
            access_token: token,
          },
        });
        this.totalCuisine = data.tempCuisine;
        this.totalCategory = data.tempCategory;
      } catch {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleProduct() {
      try {
        const { data } = await axios.get(`${baseUrl}/cuisines`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataCuisines = data.message;
        this.dataAll = data.message;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleCategory() {
      const token = localStorage.getItem("access_token");
      try {
        const { data } = await axios.get(`${baseUrl}/categories`, {
          headers: {
            access_token: token,
          },
        });
        this.dataCategory = data.message;
        this.dataAll = data.message;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleLogsHistory() {
      try {
        const { data } = await axios.get(`${baseUrl}/histories`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataLogs = data.message;
        this.dataAll = data.message;
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleAddProduct(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/cuisines`, input, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Add Product Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        this.changePage("product");
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleAddCategories(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/categories`, input, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Add Category Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        this.currentPage = "category";
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleDetailProduct(id) {
      try {
        this.cuisineId = id;
        const { data } = await axios.get(`${baseUrl}/cuisines/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.dataCuisinesDetail = data.message;
        this.currentPage = "editProduct";
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleEditProduct(input) {
      try {
        const { data } = await axios.put(
          `${baseUrl}/cuisines/${this.cuisineId}`,
          input,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Edit Product Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        this.currentPage = "product";
        this.handleProduct();
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handlePatchProduct(id, status) {
      console.log("dikasta1", id, status);
      try {
        const { data } = await axios.patch(
          `${baseUrl}/cuisines/${id}`,
          { status },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: "Status updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.handleProduct();
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async deleteProduct(id) {
      try {
        const { data } = await axios.delete(`${baseUrl}/cuisines/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.handleProduct();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async deleteCategory(id) {
      try {
        const { data } = await axios.delete(`${baseUrl}/categories/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.handleCategory();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
  },
};
</script>

<template>
  <Navbar
    :loginStatus="loginStatus"
    @changePage="changePage"
    @handleLogout="handleLogout"
  />
  <div class="container">
    <loginPage
      v-if="currentPage === 'login'"
      @handleLogin="handleLogin"
      @changePage="changePage"
      @handleGoogleLogin="handleGoogleLogin"
    />
    <register
      v-else-if="currentPage === 'register'"
      @handleRegister="handleRegister"
      @changePage="changePage"
    />
    <dashboard
      v-else-if="currentPage === 'dashboard'"
      :totalCategory="totalCategory"
      :totalCuisine="totalCuisine"
      @handleDashboard="handleDashboard"
    />
    <ListTable
      v-else-if="currentPage === 'product'"
      :currentPage="currentPage"
      :dataAll="dataAll"
      :dataCuisines="dataCuisines"
      @handleDataAll="handleProduct"
      @changePage="changePage"
      @deleteProduct="deleteProduct"
      @handleDetailProduct="handleDetailProduct"
      @handlePatchProduct="handlePatchProduct"
    />
    <ListTable
      v-else-if="currentPage === 'category'"
      :currentPage="currentPage"
      :dataAll="dataAll"
      :dataCategory="dataCategory"
      @handleDataAll="handleCategory"
      @changePage="changePage"
      @deleteCategory="deleteCategory"
    />
    <AddProduct
      v-else-if="currentPage === 'addProduct' || currentPage === 'editProduct'"
      :currentPage="currentPage"
      :dataCuisinesDetail="dataCuisinesDetail"
      v-bind:dataCategory="dataCategory"
      @handleCategory="handleCategory"
      @handleAddProduct="handleAddProduct"
      @handleEditProduct="handleEditProduct"
      @changePage="changePage"
    />
    <AddCategory
      v-else-if="currentPage === 'addCategory'"
      @handleAddCategories="handleAddCategories"
      @changePage="changePage"
    />
    <ListTable
      v-else-if="currentPage === 'logs'"
      :currentPage="currentPage"
      :dataAll="dataAll"
      :dataLogs="dataLogs"
      @handleDataAll="handleLogsHistory"
    />
  </div>
</template>

<style></style>
