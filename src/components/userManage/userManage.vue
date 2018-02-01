<template>
    <div>
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
<style lang="scss" rel="stylesheet/scss" scoped></style>