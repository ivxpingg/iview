<template>
    <div class="comAnalysis-container">
        <vHeader></vHeader>
        <router-view class="router-view"></router-view>
        <vFooter class="footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/comAnalysis/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {}
        },
        components: {vHeader, vFooter}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comAnalysis-container {
        position: relative;
        height: 100%;

        .router-view {
            position: relative;
            top: 0px;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
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