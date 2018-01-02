<template>
    <div class="container">
        <vInfoPanel></vInfoPanel>
        <vLineMap></vLineMap>
        <vInfoTable></vInfoTable>
    </div>
</template>

<script>
    import vInfoPanel from '../infoPanel/infoPanel.vue';
    import vLineMap from '../lineMap/lineMap.vue';
    import vInfoTable from '../infoTable/infoTable.vue';
    export default {
        data () {
            return {}
        },
        components: {
            vInfoPanel,
            vLineMap,
            vInfoTable
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>