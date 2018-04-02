<template>
    <div class="yjEdit-container">
        <div class="bmap" id="bmap">

        </div>

        <div class="edit-panel">

        </div>

        <a class="aa" href="alert:www.baidu.com">百度</a>
    </div>
</template>
<script>
    import edit_main from './js/yjEdit_main';
    export default {
        data() {
            return {}
        },
        mounted() {
            var that = this;
            edit_main(that, 'bmap');
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .yjEdit-container {
        width: 100%;
        height: 100%;
        user-select: none;
        .bmap {
            width: 100%;
            height: 100%;
        }

        .aa {
            position: absolute;
            display: block;
            top: 200px;
            left: 20px;
            z-index: 1;
        }
    }
</style>