<script>
    export default {
    name: "addNewCategory",
    emits: ["handleAddCategories", "changePage"],
    data () {
        return {
            input: {
                name:""
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("handleAddCategories", this.input);
        },
        goProduct() {
            this.$emit('changePage', 'category');
        }
    }
}
</script>

<template>
    <section>
                <div style="margin-top: 3rem;" class="d-flex justify-content-center border-bottom">
                    <h1>New Categories</h1>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <div class="col-12 col-md-6">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="product-name">Name <span class="text-danger fw-bold">*</span></label>
                                <input v-model="input.name" type="text" class="form-control"
                                    placeholder="Enter category name" autocomplete="off" required />
                            </div>
                            <div>
                                <div>
                                    <a @click.prevent="goProduct" class="btn btn-lg btn-light rounded-pill" href="">Cancel</a>
                                    <button class="btn btn-lg btn-outline-primary rounded-pill" type="submit" href="">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
</template>