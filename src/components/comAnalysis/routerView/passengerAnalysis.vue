<template>
    <div class="passengerAnalysis-container">
        <vSearchPanel></vSearchPanel>
        <vTablePanel></vTablePanel>
        <vTabsEchartsPanel></vTabsEchartsPanel>
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

</style>

