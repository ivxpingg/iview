<template>
    <div class="checkManage-container">
        <vHeader class="v-header" @setUrl="setUrl"></vHeader>
        <div ref="routerViewBox" class="router-view">
            <vCheckManage class="v-user-manage" :url="url"></vCheckManage>
        </div>
        <vFooter class="footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/checkManage/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    import vCheckManage from '../../../components/checkManage/checkManage.vue';
    export default {
        data() {
            return {
                url: 'http://218.85.132.71:9788/gd/gdCorp!listforuid.action?uid=gdkp',
            }
        },
        components: {vHeader, vFooter, vCheckManage},
        mounted() {
            this.init();
        },
        methods: {
            init() {

            },
            setUrl(url) {
                this.url = url;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .checkManage-container {
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

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>