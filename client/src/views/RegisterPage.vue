<script>
import {mapActions} from "pinia"
import { RouterLink, RouterView } from 'vue-router'
import {useProductStore} from "../stores/counter" 

export default {
    name: "register",
    data() {

        return {
            input: {
                email: "",
                password: ""
            },
        };
    },
    methods: {
        ...mapActions(useProductStore, ["handleRegister"]),
        handleSubmit() {
            this.handleRegister(this.input);
        }
    }
}
</script>
<template lang="">
                <div>
                    <div style="margin: 2rem;">
                        <div>
                            <div class="d-flex justify-content-center">
                                <h3>
                                    Sign up and enjoy
                                </h3>
                            </div>
                        </div>
                        <div>
                            <form @submit.prevent="handleSubmit">
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="login-email">Email</label>
                                        <label class="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input v-model="input.email" type="email" class="form-control" placeholder="Enter email ..."
                                        autocomplete="off" required />
                                </div>
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="register-password">Password</label>
                                        <label class="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input v-model="input.password" type="password" class="form-control" placeholder="Enter password ..."
                                        autocomplete="off" required />
                                </div>
                                <div>
                                    <button type="submit" href="" class="btn btn-outline-primary">Sign
                                        Up</button>
                                    <button type="submit" href="" class="btn btn-outline-secondary m-2"><RouterLink class="nav-link" to="/login">Cancel</RouterLink></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
</template>
