<template>
    <div class="checkManage-container">
        <vIframe :url="url"></vIframe>
    </div>
</template>
<script>
    import Util from  '../../libs/util';
    import vIframe from '../layout/iframe/iframe.vue';
    export default {
        data() {
            return {}
        },
        props: {
            url: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        components: {vIframe},
        created() {},
        mounted() {
            var that = this;
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .checkManage-container {
        height:100%;

        .iframe {
            height:100%;
            min-height: 783px;
        }
    }
</style>