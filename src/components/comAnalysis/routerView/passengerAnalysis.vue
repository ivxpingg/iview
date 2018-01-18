<template>
    <div class="passengerAnalysis-container">
        <vSearchPanel class="v-search-panel" :dates="time" :dim="dim" :timeFrame="timeFrame" @changeTimeFrame="changeTimeFrame" @changeDate="changeDate" @changeDim="changeDim"></vSearchPanel>
        <vTablePanel></vTablePanel>
        <div class="separate-line"></div>
        <vTabsEchartsPanel  class="v-tabs-echarts-panel"></vTabsEchartsPanel>
    </div>
</template>

<script>
    import vSearchPanel from '../passenger/searchPanel.vue';
    import vTablePanel from '../passenger/tablePanel.vue';
    import vTabsEchartsPanel from '../passenger/tabsEchartsPanel.vue';
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                time: [MOMENT().subtract(9, 'days').format('YYYY-MM-DD'), MOMENT().format('YYYY-MM-DD')],
                dim: 'day',
                timeFrame: '0'
            }
        },
        components: {vSearchPanel, vTablePanel, vTabsEchartsPanel},
        methods: {
            changeTimeFrame(val) {
                this.timeFrame = val;
            },
            changeDate(date) {
                this.time = date;
            },
            changeDim(type) {
                this.dim = type;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .passengerAnalysis-container {
        position: relative;
        padding-top: 22px;
        .v-search-panel {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }

        .v-tabs-echarts-panel {
            margin-top: -30px;
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

