<template>
    <div class="employee-container">
        <vHeader></vHeader>
        <router-view class="router-view"></router-view>
        <vFooter class="footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/employee/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {}
        },
        components: {vHeader, vFooter}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .employee-container {
        position: relative;
        height: 100%;

        .router-view {
            position: relative;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            padding-left: 14px;
            padding-right: 14px;
            padding-top: 12px;
            background-color: #ecebeb;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>