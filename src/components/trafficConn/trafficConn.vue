<template>
    <div class="trafficConn-container">
        <vIframe :url="url"></vIframe>
    </div>
</template>
<script>
    import Util from  '../../libs/util';
    import vIframe from '../layout/iframe/iframe.vue';
    export default {
        data() {
            return {
                url: 'http://wechat.doudou360.com/metrosupervision/xm/traffic/mapstatistics.html'
            }
        },
        components: {vIframe},
        created() {
            debugger
            this.url += '?t=' + Util.cookie.get('xmgd');
            console.dir(1);
        }
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