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
                url: Util.domain + '/modules/traffic/mapstatistics.html'
            }
        },
        components: {vIframe},
        created() {
            this.url += '?t=' + Util.cookie.get('xmgd');
        },
        mounted() {
            var that = this;

            window.onmessage = function (ev) {
                if (ev.data.type == "logOut") {
                    that.$router.push({
                        path: '/',
                        query: {redirect: that.$route.name}
                    });
                }
            }
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