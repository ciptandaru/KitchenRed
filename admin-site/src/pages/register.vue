<script>
export default {
    name: "register",
    emits: ["handleRegister", "changePage"],
    data () {
        return {
            input: {
                username:'',
                email:'',
                password:'',
                phoneNumber:'',
                address:''
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("handleRegister", this.input);
        },
        goRegister() {
            this.$emit('changePage', 'login');
        }
    }
}
</script>

<template>
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
                                        <label for="register-username">Username</label>
                                        <label class="text-danger text-end fw-bold">*</label>
                                    </div>
                                    <input v-model="input.username" type="text" class="form-control" placeholder="Enter username ..."
                                        autocomplete="off" required />
                                </div>
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
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="register-phone-number">Phone Number</label>
                                    </div>
                                    <input v-model="input.phoneNumber" type="text" class="form-control" placeholder="Enter phone number ..."
                                        autocomplete="off" />
                                </div>
                                <div class="mb-3 mt-3">
                                    <div>
                                        <label for="register-address">Address</label>
                                    </div>
                                    <textarea v-model="input.address" type="text" class="form-control" placeholder="Enter address ..."
                                        autocomplete="off"></textarea>
                                </div>
                                <div>
                                    <button type="submit" href="" class="btn btn-outline-primary text-light">Sign
                                        Up</button>
                                    <button @click.prevent="goRegister" type="click" href="" class="btn btn-secondary text-light m-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
</template>