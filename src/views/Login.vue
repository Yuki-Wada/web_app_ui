<template>
    <v-app>
        <v-card width="400px" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">ログイン</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="user_name"
                        prepend-icon="mdi-account-circle"
                        label="ユーザ名"
                    />
                    <v-text-field
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        label="パスワード"
                        @click:append="showPassword = !showPassword"
                    />
                    <v-card-actions>
                        <v-btn class="info" v-on:click="auth">ログイン</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
import Axios from 'axios';

export default {
    name: 'LoginAuthentication',
    data: () => ({
        showPassword : false,
        user_name: "",
        password: ""
    }),
    methods: {
        auth: function() {
            let api_host = 8889;
            let url = 'http://' + location.hostname + ':' + api_host + '/login';
            let info = {
                user_name: this.user_name,
                password: this.password
            };
            Axios.post(
                url, info
            ).then( ( res ) => {
                if (res.data)
                {
                    this.$store.dispatch("setLoginInfo", res.data)
                    this.$router.push('/')
                }
                else{
                    //console.log('bad!');
                }
            }).catch( ( ) => {
                //console.error( res );
            });
        }
    }
};
</script>
