<template>
    <div class="trainAnalysis-container">
        <vSearchPanel :dates="time" :dim="dim" @changeDate="changeDate"></vSearchPanel>
        <vTabsTable :dates="time" :dim="dim"></vTabsTable>
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
            }
        }


    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>