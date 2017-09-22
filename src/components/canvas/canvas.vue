<template>
    <div class="canvasBox">
        <div id="canvas" style="border: 0 solid #000; width: 2700px; height: 2093px;"></div>
    </div>
</template>
<script>
    import main from './js/main';

    export default {
        data() {
            return {};
        },
        mounted: function () {
            this.pageInit();
            main();
        },
        methods: {
            pageInit() {
                document.querySelector("#layout-content-main").style.height = "100%";
            }
        }
    }

</script>
<style scoped>
    * { margin: 0; padding: 0;}

    html, body {
        width: 100%;
        height: 100%;
    }
    .canvasBox {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #4d4d4c;
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('./images/xm_map_bg.jpg');
        background-repeat: no-repeat;
        /*background-position: -900px -1400px;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        transform:scale(1);
        transform-origin: 0 0;
    }
</style>