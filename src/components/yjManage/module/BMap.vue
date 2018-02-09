<template>
    <div class="bmap-container">
        <div class="bmap" id="bmap">

        </div>
    </div>
</template>
<script>
    import bmap_main from './js/bmap_main';
    export default {
        data() {
            return {}
        },
        mounted() {
            var that = this;
            bmap_main(that, 'bmap');
        },
        methods:{}
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .bmap-container {
        width: 100%;
        height: 100%;

        .bmap {
            width: 100%;
            height: 100%;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .bmap-container {

        // 去掉百度地图Logo
        .anchorBL {
            display: none;
        }
    }
</style>