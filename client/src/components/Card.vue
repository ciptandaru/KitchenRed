<script>
import { mapState, mapActions } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import {useProductStore} from "../stores/counter" 
 export default {
    name: "card",
    props: ["el"],
    computed: {
        ...mapState(useProductStore, ['dataCuisines', 'totalPage', 'currentPage'])
    },
    methods: {
        ...mapActions(useProductStore, ['handleProduct', 'handleAddFavorite', 'handleFilter']),
    }
 }
</script>
<template>
        <div class="container">
            <div class="card"  style="background-color: #EEE2DC;">
                                <img @click.prevent="$router.push('/cuisines/'+el.id)" style="display: block;width: 100%; height: 300px;object-fit: cover;"
                                    :src="el.imgUrl" class="img-fluid rounded-start" alt="...">
                                <div class="card-body">
                                    <h5 style="text-align: center;" class="card-title">
                                    <strong>{{ el.name }}</strong>
                                    </h5>
                                    <h6 class="text-truncate"> {{ el.description }}</h6>
                                    <h6 style="margin-top: 20px;" class="">Category: {{ el.Category.name }}</h6>
                                    <h6 class="card-text">Price: {{el.price}}</h6>
                                    <h6 class="card-text">
                                    
                                    </h6>
                                    <h6 class="card-text">
                                    
                                    </h6>
                                    <div style="align-items: center;">
                                        <button v-if="currentPage !== 'favorite'" @click.prevent="handleAddFavorite(el.id)" :id=el.id href="" type="button"
                                            class="btn btn-outline-warning">Favorite</button>
                                    </div>
                                </div>
                            </div>
        </div>

</template>