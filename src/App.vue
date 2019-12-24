<template>
    <v-app>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css">
        <v-navigation-drawer app v-model="drawer" clipped>
            <v-container>
                <div style="display: flex;">
                    <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
                    <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                        transition="scale-transition"
                        width="40"
                    />
                </div>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            Navigation lists
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense nav>
                    <div v-for="nav_list in nav_lists" :key="nav_list.name">
                        <v-list-group
                            v-if="nav_list.lists"
                            :prepend-icon="nav_list.icon"
                            no-action
                        >
                            <template v-slot:activator>
                                <v-list-item-content :to="nav_list.link">
                                    <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="list in nav_list.lists" :key="list.name" :to="list.link">
                                <v-list-item-content>
                                    <v-list-item-title>{{ list.name }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                        <v-list-item v-else :to="nav_list.link">
                            <v-list-item-icon>
                                <v-icon>{{ nav_list.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list>

            </v-container>
        </v-navigation-drawer>

        <v-app-bar color="primary" dark app >
            <div class="d-flex align-center">            
                <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="/login"
                text
                v-if="aaa"
            >
                <span class="mr-2">Login</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn
                href="/logout"
                text
                v-if="!aaa"
            >
                <span class="mr-2">Logout</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>

        <v-footer color="primary" dark app>
            Vuetify
        </v-footer>    

    </v-app>
</template>

<script>
import constant from './constant'

export default {
    name: "App",
    mixins: [constant],
    data: () => ({
        drawer: null,
        nav_lists:[
            {
                name: "Top Page",
                icon: "mdi-vuetify",
                link: "/"
            },
            {
                name: "Curriculum Vitae",
                icon: "mdi-cogs",
                link: "/cv"
            },
            {
                name: "Applications",
                icon: "mdi-view-dashboard",
                lists: [
                    {
                        name: "Example",
                        link: "/app"
                    }
                ]
            },
            {
                name: "Mathematics",
                icon: "mdi-palette",
                link: "/math"
            },
        ]
    }),
    computed: {
        aaa() {
            return !this.$store.state.auth.login.token;
        }
    }
};
</script>
