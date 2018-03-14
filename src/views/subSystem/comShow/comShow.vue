<template>
    <div class="comShow-container">
        <div ref="routerViewBox" class="router-view">
            <vSubwayLinesComShow></vSubwayLinesComShow>
        </div>
        <vRankPanel class="v-rank-panel"></vRankPanel>
        <vWebInfoPanel class="v-web-info-panel"></vWebInfoPanel>
        <Button class="btn-layout" type="text" icon="log-out" title="返回导航页" @click="goBack"></Button>
    </div>
</template>
<script>
    import vSubwayLinesComShow from '../../../components/subwayLines/subwayLines_comShow.vue';
    import vRankPanel from '../../../components/comShow/module/rankPanel.vue';
    import vTrainPanel from '../../../components/comShow/module/trainPanel.vue';
    import vFlowPanel from '../../../components/comShow/module/flowPanel.vue';
    import vSpeedPanel from '../../../components/comShow/module/speedPanel.vue';
    import vWebInfoPanel from '../../../components/comShow/module/webInfoPanel.vue';
    export default {
        data() {
            return {}
        },
        components: {vSubwayLinesComShow, vRankPanel, vTrainPanel, vSpeedPanel, vWebInfoPanel},
        mounted() {},
        methods: {
            goBack () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要返回系统菜单？</p>',
                    onOk: () => {
                        this.$router.push({
                            name: 'platform',  // 路由名称
                            params: {}
                        });
                    },
                    onCancel: () => {}
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .comShow-container {
        position: relative;
        height: 100%;

        .router-view {
            position: relative;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            min-height: 900px;
        }

        .v-rank-panel {
            position: absolute;
            left: 20px;
            bottom: 35px;
            z-index: 1;
        }
        .v-web-info-panel {
            position: absolute;
            right: 50px;
            bottom: 25px;
            z-index: 1;
        }

        .btn-layout {
            position: fixed;
            top: 2px;
            right: 15px;
            width: 102px;
            font-size: 46px;
            color: #FFF;
            z-index: 10;

            &:hover {
                color: #57a3f3;
            }
        }
    }
</style>