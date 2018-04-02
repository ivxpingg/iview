<template>
    <div class="monitor-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">
            <router-view :domHeight="domHeight"></router-view>
        </div>
        <vFooter class="v-footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/monitor/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    import vRunMonitor from '../../../components/monitor/routerView/runMonitor.vue';
    import vFlowMonitor from '../../../components/monitor/routerView/flowMonitor.vue';
    import vVideoMonitor from '../../../components/monitor/routerView/videoMonitor.vue';
    export default {
        data () {
            return {
                domHeight: 783
            }
        },
        components: {
            vHeader,
            vFooter,
            vRunMonitor,
            vFlowMonitor,
            vVideoMonitor
        },
        created() {

        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var that = this;

                window.onresize = function() {
                    that.initStyle();
                }
                that.initStyle();
            },
            initStyle() {
                var clientHeight = this.$el.clientHeight;

                if (clientHeight < 900) {
//                    this.$refs.routerViewBox.style.height = (900 - 87 - 30)+ 'px';
                }
                else {
                    this.domHeight = (this.$el.clientHeight - 87 - 30);
                    this.$refs.routerViewBox.style.minHeight = (this.$el.clientHeight - 87 - 30)+ 'px';
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .monitor-container {
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