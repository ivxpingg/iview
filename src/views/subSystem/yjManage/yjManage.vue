<template>
    <div class="yqManage-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">
            <router-view></router-view>
        </div>
        <vFooter class="footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/yjManage/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {}
        },
        components: {vHeader, vFooter},
        mounted() {
            this.init();
        },
        methods: {
            init() {
            },
            initStyle() {
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .yqManage-container {
        position: relative;
        height: 100%;
        background-color: #dff2fc;

        .v-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }

        .router-view {
            position: relative;
            padding-top: 87px;
            padding-bottom: 30px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            min-height: 900px;
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