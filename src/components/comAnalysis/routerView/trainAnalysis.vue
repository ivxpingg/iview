<template>
    <div class="trainAnalysis-container">
        <vSearchPanel class="v-search-panel" :dates="time" :dim="dim" @changeDate="changeDate" @changeDim="changeDim"></vSearchPanel>
        <vTabsTable class="v-tabs-table" :dates="time" :dim="dim"></vTabsTable>
        <div class="separate-line"></div>
        <vEchartsPanel :dates="time" :dim="dim"></vEchartsPanel>
    </div>
</template>

<script>
    import vSearchPanel from '../train/searchPanel.vue';
    import vTabsTable from '../train/tabsTable.vue';
    import vEchartsPanel from '../train/echartsPanel.vue';
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                time: [MOMENT().subtract(9, 'days').format('YYYY-MM-DD'), MOMENT().format('YYYY-MM-DD')],
                dim: 'day',
            }
        },
        components: {vSearchPanel, vTabsTable, vEchartsPanel},
        created() {},
        methods: {
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
    .trainAnalysis-container {
        position: relative;
        padding-top: 22px;
        .v-search-panel {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }

        .v-tabs-table {
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

</style>