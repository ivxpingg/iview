<template>
    <div class="userManage-container">
        <vHeader class="v-header"></vHeader>
        <div class="router-view">
            <vUserManage class="v-user-manage"></vUserManage>
        </div>
        <vFooter class="v-footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/userManage/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    import vUserManage from '../../../components/userManage/userManage.vue';
    export default {
        data () {
            return {}
        },
        components: {
            vHeader,
            vFooter,
            vUserManage
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .userManage-container {
        position: relative;
        height: 100%;

        .v-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
        }

        .router-view {
            position: relative;
            padding-top: 87px;
            padding-bottom: 30px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-height: 900px;
        }

        .v-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>