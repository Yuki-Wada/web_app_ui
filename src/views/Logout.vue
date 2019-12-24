<template>
    <v-app>
        <v-card width="400px" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">ログアウトしました</h1>
            </v-card-title>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        elapsed_time: 1
    }),
    created : function() {
        this.$store.dispatch(
            "setLoginInfo", 
            {
                token: false,
                name: "ゲスト",
                expire: 0
            }
        )
        setInterval(() => { this.elapsed_time-- }, 1000)
    },
    watch: {
    elapsed_time: function(time) {
        if (time <= 0) {
            this.$router.push("/");
        }
    }
  }
};
</script>
