<script>
import { mapState, mapActions } from 'pinia'
import {useProductStore} from "../stores/counter" 
import Card from "../components/Card.vue"

export default {
    name: "favorite",
    components: {Card},
    computed: {
        ...mapState(useProductStore, ['dataFavorites'])
    },
    methods: {
        ...mapActions(useProductStore, ['handleFavorite']),
    },
    created() {
        this.handleFavorite();
    }
}
</script>
<template lang="">
     <section style="margin-top:15px;" class="col">
                <div class="row">
                    <div v-for="el in dataFavorites" :key="el.id" style="margin-bottom: 1rem;" class="col-4">
                        <div > 
                            <Card :el="el"  />
                    </div>
                    </div>
                </div>
            </section>
</template>
<style lang="">
    
</style>