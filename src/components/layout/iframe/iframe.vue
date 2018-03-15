<template>
    <div class="iframe-container">
        <iframe class="iframe" ref="iframe" :src="url" width="100%"></iframe>
        <Spin v-if="loading" fix size="large"></Spin>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: false
            }
        },
        props: {
            url: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        created() {
            this.loading = true;
        },
        mounted() {
            this.loadingState();

            window.frames.postMessage({ auth: '24', d: '5' }, '*');
            window.onmessage = function (ev) {
                // console.log(ev.data);
            }
        },
        methods: {
            loadingState() {
                var that = this;
                var iframe = this.$refs.iframe;
                if (iframe.attachEvent){
                    iframe.attachEvent("onload", function(){
                        that.loading = false;
                    });
                } else {
                    iframe.onload = function(){
                        that.loading = false;
                    };
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .iframe-container{
        position: relative;
        width: 100%;
        height: 100%;
        .iframe {
            height:100%;
            border: 0;
            overflow-x: hidden;
        }
    }

</style>