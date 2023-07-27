<script>
import { mapState, mapActions } from 'pinia'
import {useProductStore} from "../stores/counter" 

export default {
    name: "detail",
    computed: {
        ...mapState(useProductStore, ['dataCuisinesDetail', 'qr'])
    },
    methods: {
        ...mapActions(useProductStore, ['handleDetailProduct', "handleAddFavorite"]),
    },
    created() {
        this.handleDetailProduct(this.$route.params.id);
    }
}
</script>
<template lang="">
    <div style="margin-top: 15px;" class="container">
        <div class="card">
            <img style="display: block;width: 100%; height: 300px;object-fit: cover;"
                                :src="dataCuisinesDetail.imgUrl" class="card-img-top rounded mx-auto d-block" alt="...">
                            <div class="card-body">
                                <h5 style="text-align: center;" class="card-title">
                                <strong>{{ dataCuisinesDetail.name }}</strong>
                                </h5>
                                <h6 class="text-truncate"> {{ dataCuisinesDetail.description }}</h6>
                                <h6 style="margin-top: 20px;" class="">Category: {{ dataCuisinesDetail.Category.name }}</h6>
                                <h6 class="card-text">Price: {{dataCuisinesDetail.price}}</h6>
                                <h6 class="card-text">
                                   
                                </h6>
                                <h6 class="card-text">
                                 
                                </h6>
                                <div style="align-items: center;">
                                    <button @click.prevent="handleAddFavorite(dataCuisinesDetail.id)" :id=dataCuisinesDetail.id href="" type="button"
                                        class="btn btn-outline-warning">Favorite</button>
                                </div>
                            </div>
                        <section style="height: 195px; width: 200px;">
                <div v-html="qr"></div>
              </section>
    
            </div>
    </div>
</template>
<style lang="">
    
</style>