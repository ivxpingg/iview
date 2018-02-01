<template>
    <div class="comShow-container">
        <div ref="routerViewBox" class="router-view">
            <vSubwayLinesComShow></vSubwayLinesComShow>
        </div>
        <vRankPanel class="v-rank-panel"></vRankPanel>
        <vWebInfoPanel class="v-web-info-panel"></vWebInfoPanel>
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
        methods: {}
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
            left: 0;
            bottom: 0;
            z-index: 1;
        }
        .v-web-info-panel {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    }
</style>