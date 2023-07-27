<script>
export default {
    name: "Dashboard",
    props: ["totalCuisine", "totalCategory"],
    emits: ["listCuisines", "listCategory"],
    method: {
        getTotal () {
            this.$emit("handleDashboard")  
        }
    }
}
</script>

<template>
            <!-- Dashboard Section -->
            <section style="margin-top: 3rem;">
                <div class="row">
                    <div>
                        <h1>Dashboard</h1>
                    </div>
                    <div class="col">
                        <div class="card col">
                            <div class="card-body">
                                <h2 class="card-title">Total Menu</h2>
                                <h1>{{ totalCuisine }}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card col">
                            <div class="card-body">
                                <h2 class="card-title">Total Category</h2>
                                <h1>{{ totalCategory }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
</template>