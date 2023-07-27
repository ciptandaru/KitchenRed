<script>
import {mapActions} from "pinia"
import {useProductStore} from "../stores/counter" 
import { GoogleLogin } from 'vue3-google-login';
import { RouterLink, RouterView } from 'vue-router'
export default {
    name: "loginPage",
    data() {
        return {
            login: {
                email: "",
                password: ""
            },
        };
    },
    methods: {
        ...mapActions(useProductStore, ["handleLogin", "handleGoogleLogin"]),
        handleSubmit() {
            this.handleLogin(this.login);
        },
        callback(res) {
            this.handleGoogleLogin(res);
        }
    },
}
</script>

<template>
                <div class="container">
                    <div>
                        <h1 class="d-flex justify-content-center">Login Option</h1>
                        <span class="d-flex justify-content-center border-bottom">Log in and autocomplete your order with
                            your
                            personal data,
                            or
                            sign
                            up to enjoy all the benefits of an KitchenRed.</span>
                    </div>
                    <div style="margin: 2rem;">
                        <div class="d-flex justify-content-center">
                            <h3>
                                Log in into your account
                            </h3>
                        </div>
                        <div>
                            <form @submit.prevent="handleSubmit(login)" action="">
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="login-email">Email</label>
                                        <label class="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input v-model='login.email' type="email" class="form-control" placeholder="Enter email ..."
                                        autocomplete="off" required />
                                </div>
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="login-password">Password</label>
                                        <label class="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input v-model='login.password' type="password" class="form-control" id="login-password"
                                        placeholder="Enter password ..." autocomplete="off" required />
                                </div>
                                <div>
                                    <button  type="submit" href=""
                                        class="btn btn-outline-primary btn-rounded me-3">Sign
                                        In</button>
                                    <button type="submit" href="" class="btn btn-outline-secondary btn-rounded"><RouterLink class="nav-link" to="/register">Sign Up</RouterLink></button>
                                </div>
                            </form>
                                <center>
                                    <GoogleLogin style="margin-top: 1rem;" :callback="callback"/>
                                </center>
                        </div>
                    </div>
                </div>

</template>