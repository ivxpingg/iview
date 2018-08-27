<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>
<script>
    import Util from './libs/util';
    export default {
        data() {
            return {

            };
        },
        mounted() {
            this.initUserInfo();
        },
        beforeDestroy() {

        },
        methods: {
            initUserInfo() {
                this.$store.commit('setToken', Util.cookie.get('xmgd'));
                this.$store.commit('setName', Util.cookie.get('xmgdname'));
                this.$store.commit('setUserId', Util.cookie.get('xmgduserid'));
            }
        }
    };
</script>
<style scoped>
    .container {
        height: 100%;
        overflow-y: auto;

        /*overflow-x: auto;*/
    }
</style>