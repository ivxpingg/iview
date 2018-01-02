<template>
    <div class="monitor-container">
        <vHeader></vHeader>
        <router-view></router-view>
    </div>
</template>

<script>
    import vHeader from '../../../components/monitor/header/header.vue';
    import vRunMonitor from '../../../components/monitor/routerView/runMonitor.vue';
    import vFlowMonitor from '../../../components/monitor/routerView/flowMonitor.vue';
    import vVideoMonitor from '../../../components/monitor/routerView/videoMonitor.vue';
    export default {
        data () {
            return {}
        },
        components: {
            vHeader,
            vRunMonitor,
            vFlowMonitor,
            vVideoMonitor
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>