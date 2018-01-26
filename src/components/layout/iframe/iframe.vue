<template>
    <iframe ref="iframe" src="http://localhost:8880/#/test1" height="783" width="100%"></iframe>
</template>
<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            window.frames.postMessage({ auth: '24', d: '5' }, '*');
            window.onmessage = function (ev) {
                console.log(ev.data);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>