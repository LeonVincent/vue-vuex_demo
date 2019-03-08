<template>
    <div id="app">
        <!-- <Headerbar>
        </Headerbar> -->
        <router-view v-if="isRouterAlive"></router-view>
        <!-- <Footer/> -->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        computed: {
            ...mapGetters([
                'langpack',
                'isLogin'
            ])
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
        },
        mounted() {

        },
        created() {
        },
        components: {
        }

    }
</script>
<style lang="less" scoped>

</style>
