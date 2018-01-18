<template>
    <div class="comAnalysis-container">
        <vHeader></vHeader>
        <div ref="routerViewBox" class="router-view">
            <router-view></router-view>
        </div>
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
        components: {vHeader, vFooter},
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var that = this;
                that.initStyle();
                window.onresize = function() {
                    that.initStyle();
                }
            },
            initStyle() {
                if (!!this.$refs.routerViewBox) {
                    this.$refs.routerViewBox.style.minHeight = (this.$el.clientHeight - 87 - 30)+ 'px';
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comAnalysis-container {
        position: relative;
        height: 100%;
        background-color: #ecebeb;

        .router-view {
            position: relative;
            padding-left: 32px;
            padding-right: 32px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
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