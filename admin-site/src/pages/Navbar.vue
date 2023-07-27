<script>
export default {
  name: "navbar",
  emits: ["handleLogout", "changePage"],
  props: ["loginStatus"],
  methods: {
    openPage(val) {
      this.$emit("changePage", val);
    },
  },
};
</script>
<template>
  <section>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          >Kitchen<span class="text-danger">Red</span></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                @click.prevent="openPage('dashboard')"
                class="nav-link text-light"
                href=""
                ><img src="../assets/shopping-cart.svg" alt="" /> Dashboard</a
              >
            </li>
            <li class="nav-item">
              <a
                @click.prevent="openPage('product')"
                class="nav-link text-light"
                href=""
                ><img src="../assets/shopping-bag.svg" alt="" /> Products</a
              >
            </li>
            <li class="nav-item">
              <a
                @click.prevent="openPage('category')"
                class="nav-link text-light"
                ><img src="../assets/layers.svg" alt="" /> Categories</a
              >
            </li>
            <li class="nav-item">
              <a @click.prevent="openPage('logs')" class="nav-link text-light"
                ><img src="../assets/archive.svg" alt="" /> Logs</a
              >
            </li>
          </ul>
        </div>
        <div>
          <div>
            <button
              v-if="loginStatus === true"
              @click.prevent="$emit('handleLogout')"
              type="button"
              class="btn btn-outline-danger text-light rounded-pill"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>
