import {ref, computed} from "vue";
import {defineStore} from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

const baseUrl = "http://localhost:3000/pub";
// const baseUrl = 'https://challenge3.ciptadr.site/pub'
export const useProductStore = defineStore("product", {
  state: () => ({
    qr: "",
    dataFavorites: [],
    dataCuisines: [],
    dataCuisinesDetail: [],
    loginStatus: localStorage.getItem("access_token") ? true : false,
    totalPage: 0,
    currentPage: "",
    dataCategory: [],
  }),
  actions: {
    async handleRegister(input) {
      try {
        const {data} = await axios.post(`${baseUrl}/register`, input);
        this.currentPage = "register";
        Swal.fire({
          width: 200,
          icon: "success",
          text: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.push("/login");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
        console.log(err);
      }
    },
    async handleLogin(login) {
      try {
        const {data} = await axios.post(`${baseUrl}/login`, login);
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        this.currentPage = "login";
        this.loginStatus = true;
        this.router.push("/");
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
    async handleGoogleLogin(res) {
      try {
        const {data} = await axios.post(`${baseUrl}/glogin`, null, {
          headers: {
            token_google: res.credential,
          },
        });
        console.log(data);
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);
        this.loginStatus = true;
        this.router.push("/");
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
    async handleLogout() {
      localStorage.clear();
      this.loginStatus = false;
    },
    async handleProduct(page = 1, limit = 8) {
      try {
        const {data} = await axios.get(
          `${baseUrl}/cuisines?page=${page}&pageLimit=${limit}`
        );
        this.dataCuisines = data.message.rows;
        this.page = data.halaman;
        this.totalPage = data.totalPage;
        this.dataCategory = data.categories;
        this.currentPage = "home";
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleDetailProduct(id) {
      try {
        const {data} = await axios.get(`${baseUrl}/cuisines/${id}`);
        this.dataCuisinesDetail = data.message;
        this.qr = data.qrCode;
        this.currentPage = "detail";
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: `Error (${err.response.status})`,
          text: `${err.response.data.message}`,
        });
      }
    },
    async handleFavorite() {
      try {
        const {data} = await axios.get(`${baseUrl}/favorites`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(data);
        this.dataFavorites = data.data.map((el) => el.Cuisine);
        this.currentPage = "favorite";
      } catch (err) {
        console.log(err);
      }
    },
    async handleAddFavorite(CuisineId) {
      try {
        const {data} = await axios.post(
          `${baseUrl}/favorites`,
          {CuisineId},
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        console.log(data);
        this.dataFavorites = data.data;
        Swal.fire({
          width: 200,
          icon: "success",
          text: `Added Favourite Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `already to favourite`,
        });
      }
    },
    async handleFilter(search) {
      try {
        const {data} = await axios.get(`${baseUrl}/cuisines?search=${search}`);
        this.dataCuisines = data.message.rows;
        this.totalPage = data.totalPage;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
