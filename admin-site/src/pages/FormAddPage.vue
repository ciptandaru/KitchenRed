<script>
    export default {
    name: "addNewProduct",
    emits: ["handleAddProduct", "changePage", "handleEditProduct", "handleCategory"],
    props: ["dataCategory", "dataCuisinesDetail", "currentPage"],
    data () {
        return {
            input: {
                name:'',
                categoryId:'',
                description:'',
                price:'',
                imgUrl:''
            }
        };
    },
    methods: {
        handleEditProduct() {
            this.$emit("handleEditProduct", this.input);
        },
        handleSubmit() {
            this.$emit("handleAddProduct", this.input);
        },
        goProduct() {
            this.$emit('changePage', 'product');
        }
    },
    created () {
        this.$emit("handleCategory")

        if (this.currentPage === 'editProduct') {
            this.input.name = this.dataCuisinesDetail.name;
            this.input.categoryId = this.dataCuisinesDetail.categoryId;
            this.input.description = this.dataCuisinesDetail.description;
            this.input.price = this.dataCuisinesDetail.price;
            this.input.imgUrl = this.dataCuisinesDetail.imgUrl;
        } else {
            this.input.name = '';
            this.input.categoryId = '';
            this.input.description = '';
            this.input.price = '';
            this.input.imgUrl = '';
        }
    }
}
</script>

<template>
    <section style="margin-top: 3rem;">
                <div class="d-flex justify-content-center border-bottom">
                    <h1>{{ currentPage === 'addProduct' ? 'Add Product' : 'Edit Product' }}</h1>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <div class=" col-12 col-md-6">
                        <form @submit.prevent="currentPage==='addProduct'?handleSubmit() : handleEditProduct()">
                            <div class="mb-3">
                                <label for="product-name">Name <span class="text-danger fw-bold">*</span></label>
                                <input v-model="input.name" type="text" class="form-control"
                                    placeholder="Enter product name" autocomplete="off" required />
                            </div>
                            <div class="mb-3">
                                <label for="product-category">Category <span
                                        class="text-danger fw-bold">*</span></label>
                                <select v-model="input.categoryId" class="form-select" required>
                                    <option value="" selected disabled>
                                        -- Select Category --
                                    </option>
                                    <option v-for="element in dataCategory" :key="element.id" :value="element.id">{{ element.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">

                                <label for="product-desc">Description
                                    <span class="text-danger fw-bold">*</span></label>
                                <input v-model="input.description" type="text" class="form-control" 
                                    placeholder="Enter product description" autocomplete="off" required />
                            </div>
                            <div class="mb-3">
                                <label for="product-price">Price <span class="text-danger fw-bold">*</span></label>
                                <input v-model="input.price" type="number" min="0" class="form-control" 
                                    placeholder="Enter product price" autocomplete="off" required />
                            </div>
                            <div class="mb-3">
                                <label for="product-image">Image <span class="text-danger fw-bold">*</span></label>
                                <input  v-model="input.imgUrl" type="text" class="form-control" 
                                    placeholder="Enter product image url" autocomplete="off" required />
                            </div>
                            <div>
                                <div>
                                    <a @click.prevent="goProduct" class="btn btn-lg btn-light rounded-pill" href="">Cancel</a>
                                    <button class="btn btn-lg btn-outline-primary rounded-pill ms-2" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
</template>