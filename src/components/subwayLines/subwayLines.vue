<template>
    <div ref="canvasBox" class="canvasBox">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <vInfoPanel class="info-position"></vInfoPanel>
    </div>
</template>

<script>
    import metro_main from './js/main';
    import vInfoPanel from './module/infoPanel/infoPanel.vue';

    export default {
        data() {
            return {
                scale: 1,    // canvas 被缩放的比例 默认1
                parentDom: null,
                timeOut: null
            };
        },
        components: {vInfoPanel},
        beforeDestroy() {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
        },
        mounted () {
            var that = this;
            // this.pageInit();
            this.setFullScreenFor_subwayLines();
            metro_main(that);

        },
        methods: {
            pageInit() {

                if (this.$store.state.systemScroll) {
                    this.$store.state.systemScroll.refresh();
                }
            },
            setFullScreenFor_subwayLines() {
                var screenWidth = window.screen.width;
                var screenHeight = window.screen.height;

                var dom_canvas = this.$el.children[0];
                var scale = 1;

                scale = screenHeight / 1500;

                dom_canvas.style.transform = 'scale('+scale+')';
                dom_canvas.style.left = (-150 * scale) + 'px';
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss"  scoped>
    * { margin: 0; padding: 0;}

    html, body {
        width: 100%;
        height: 100%;
        font-family: "Microsoft YaHei", sans-serif;
    }
    .canvasBox {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 700px;
        overflow: hidden;
        background-color: #4d4d4c;

        .d-popup {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            border: 1px solid #5b6270;
            padding: 10px;
            background-color: #FFF;

            &.popupShow {
                display: block;
            }
        }

        .icon-fullScreen {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            padding: 8px 12px;
            background-color: rgba(0,0,0,.6);
            color: #FFF;
            border-radius: 4px;
            z-index: 1;
            &:hover {
                background-color: rgba(0,0,0,.7);
            }
        }

        .info-position {
            position: fixed;
            bottom: 10px;
            right: 10px;
        }
    }

    .fullScreenBox {
        position: fixed;
        z-index: 10000;
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('./images/xm_map_bg_1.jpg');
        background-repeat: no-repeat;
        background-size: 100% auto;
        /*background-position: -900px -1400px;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        transform:scale(1);
        transform-origin: 0 0;
    }
</style>