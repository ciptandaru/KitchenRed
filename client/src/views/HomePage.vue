<script>
import { mapState, mapActions } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import {useProductStore} from "../stores/counter" 
import Card from "../components/Card.vue"
 export default {
    name: "homePage",
    components: {Card},
    computed: {
        ...mapState(useProductStore, ['dataCuisines', 'totalPage', 'dataCategory'])
    },
    methods: {
        ...mapActions(useProductStore, ['handleProduct', 'handleAddFavorite', 'handleFilter']),
    },
    created() {
        this.handleProduct();
    }
 }
</script>

<template>
 <!-- Home Section -->
 <section style="margin-top: 10px;" class="container">
    <!-- filter -->
        <div class="row">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                </button>
                <ul class="dropdown-menu">
                    <li v-for="category in dataCategory" :key="category.id"><a class="dropdown-item" @click.prevent="handleFilter(category.name)"  href="#">{{category.name}}</a></li>
                    <li><a class="dropdown-item" @click.prevent="handleFilter('')" href="#">All</a></li>
                </ul>
            </div>
            <!-- card -->
            <section style="margin-top: 10px;" class="col">
                <div class="row">
                    <div v-for="el in dataCuisines" :key="el.id" style="margin-bottom: 1rem; border-radius: 100;" class="col-4">
                        <div > 
                            <Card :el="el"  />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section>
            <center>
                <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li v-for="page in totalPage" :key="page" class="page-item">
                        <a @click.prevent="handleProduct(page)" class="page-link" href="#">{{page}}</a>
                    </li>
                </ul>
            </nav>
            </center>

        </section>
    </section>

</template>