<template>
    <div class="trafficConn-container">
        <vIframe :url="url"></vIframe>
    </div>
</template>
<script>
    import vIframe from '../layout/iframe/iframe.vue';
    export default {
        data() {
            return {
                url: 'http://ikey.doudou360.com/metrosupervision/xm/traffic/mapstatistics.html'
            }
        },
        components: {vIframe}
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .trafficConn-container {
        height:100%;

        .iframe {
            height:100%;
            min-height: 783px;
        }
    }
</style>