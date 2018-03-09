<template>
    <iframe class="iframe" ref="iframe" :src="url" width="100%"></iframe>
</template>
<script>
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
        mounted() {
            window.frames.postMessage({ auth: '24', d: '5' }, '*');
            window.onmessage = function (ev) {
                // console.log(ev.data);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
     .iframe {
         height:100%;
         border: 0;
         overflow-x: hidden;
      }
</style>