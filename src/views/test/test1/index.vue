<template>
    <div class="">
        <div id="canvas" style="border: 1px solid #000; width: 800px; height: 400px; margin: 100px;"></div>
    </div>
</template>
<script>
    import test from './main.js';
    export default {
        data() {
            return {}
        },
        mounted: function () {
            var that = this;
            test(that);
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss"  scoped></style>