<script>
import { mapState, mapActions } from 'pinia'
import {useProductStore} from '../stores/counter' 
import { RouterLink, RouterView } from 'vue-router'
    export default {
        name: 'navbar',
        computed: {
        ...mapState(useProductStore, ['loginStatus'])
    },
        methods: {
        ...mapActions(useProductStore, ['handleLogout']),
    },
    }
</script>

<template>
        <!--navbar -->
        <section style="background-color: #EDC7B7;">
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand text-dark" href="#"><strong>Kitchen<span style="color: #AC3B61;">.Red</span></strong></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink v-if="loginStatus === true" class="nav-link" to="/favorites">Favorites</RouterLink>
                        </li>
                        <li class="nav-item">

                                <RouterLink v-if="loginStatus === false" class="nav-link" to="/register">Sign Up</RouterLink>

                        </li>
                        <li class="nav-item">

                            <RouterLink v-if="loginStatus === false" class="nav-link" to="/login">Sign In</RouterLink>

                        </li>
                        <li class="nav-item">
                            <button
                                v-if="loginStatus === true"
                                @click.prevent="handleLogout()"
                                type="button"
                                class="btn btn-outline-danger rounded-pill"
                                >
                            Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
</template>