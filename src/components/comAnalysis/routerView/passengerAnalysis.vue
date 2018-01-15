<template>
    <div class="passengerAnalysis-container">
        <vSearchPanel></vSearchPanel>
        <vTablePanel></vTablePanel>
        <div class="separate-line"></div>
        <vTabsEchartsPanel class="v-tabs-echarts-panel"></vTabsEchartsPanel>
    </div>
</template>

<script>
    import vSearchPanel from '../passenger/searchPanel.vue';
    import vTablePanel from '../passenger/tablePanel.vue';
    import vTabsEchartsPanel from '../passenger/tabsEchartsPanel.vue';
    export default {
        data() {
            return {}
        },
        components: {vSearchPanel, vTablePanel, vTabsEchartsPanel}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .passengerAnalysis-container {
        position: relative;
        .v-search-panel {
            position: absolute;
            top: 0;
            left: 32px;
            z-index: 1;
        }
        .separate-line {
            height: 28px;
            background: url('./images/line-bg.png') no-repeat;
            background-position: center;
            background-size: auto 4px;
        }
    }
</style>
<style lang="scss" rel="stylesheet/scss">
    .passengerAnalysis-container {
        passengerAnalysis-container {


        }
    }

</style>

