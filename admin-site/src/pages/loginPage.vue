<script>
import { GoogleLogin } from 'vue3-google-login';
export default {
    name: "loginPage",
    emits: ["handleLogin", "changePage", "handleGoogleLogin"],
    data () {
        return {
            login: {
                email: "",
                password: ""
            },
        };
    },
    components: { GoogleLogin },
    methods: {
        callback(res) {
            this.$emit("handleGoogleLogin", res);
        },
        handleSubmit() {
            this.$emit("handleLogin", this.login);
        },
        goRegister() {
            this.$emit('changePage', 'register');
        }
    }
}
</script>

<template>
    <section>
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
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3 mt-3">
                                <div>
                                    <label for="login-email">Email</label>
                                    <label class="text-danger text-end fw-bold">*</label>
                                </div>
                                <input v-model="login.email" type="email" class="form-control" placeholder="Enter email ..."
                                    autocomplete="off" required />
                            </div>
                            <div class="mb-3 mt-3">
                                <div>
                                    <label for="login-password">Password</label>
                                    <label class="text-danger text-end fw-bold">*</label>
                                </div>
                                <input v-model="login.password" type="password" class="form-control" id="login-password"
                                    placeholder="Enter password ..." autocomplete="off" required />
                            </div>
                            <div>
                                <button type="submit" href=""
                                    class="btn btn-outline-primary btn-rounded text-light">Sign
                                    In</button>
                                <button @click.prevent="goRegister" type="click" href="" class="btn btn-secondary btn-rounded text-light m-2">Sign
                                    Up</button>
                            </div>
                        </form>
                        <div style="margin-top: 1rem;">
                            <GoogleLogin :callback="callback"/>
                        </div>
                    </div>

                </div>
            </div>
    </section>

</template>

<style></style>