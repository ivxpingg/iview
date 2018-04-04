<template>
    <div ref="canvasBox" class="canvasBox">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <!--<img ref="gif1" class="img-gif" src="./images/gif/1.gif" alt="">-->
        <!--<img ref="gif2" class="img-gif" src="./images/gif/2.gif" alt="">-->
        <!--<img ref="gif3" class="img-gif" src="./images/gif/3.gif" alt="">-->
    </div>
</template>

<script>
    import metro_main from './js/main';
    import lineData from './js/baseData';
    export default {
        data() {
            return {
                scale: 1,    // canvas 被缩放的比例 默认1
                offsetY: -150,    // canvas 偏移量
                offsetX: -150,   // canvas 偏移量

                parentDom: null,
                timeOut: null,

                leve1: '20',
                leve2: '08',
                leve3: '09'
            };
        },

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
//            this.setLevel();
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

                //var top = 150;

                scale = (screenHeight) / (1500 + this.offsetY);

                this.scale = scale;

                dom_canvas.style.transform = 'scale('+scale+')';
                dom_canvas.style.left = (this.offsetX * scale) + 'px';

                dom_canvas.style.top = (this.offsetY * scale) + 'px';
            },

            setLevel () {
                var that = this;
                lineData.baseLine.forEach(function (val) {
                    if (parseInt(val.station_Id) == parseInt(that.leve1)) {
                        that.$refs.gif1.style.top = ((val.text_point.y + that.offsetY) * that.scale) + 'px';
                        that.$refs.gif1.style.left = ((val.text_point.x + that.offsetX )* that.scale) + 'px';
                    }

                    if (parseInt(val.station_Id) == parseInt(that.leve2)) {
                        that.$refs.gif2.style.top = ((val.text_point.y + that.offsetY) * that.scale) + 'px';
                        that.$refs.gif2.style.left = ((val.text_point.x + that.offsetX )* that.scale) + 'px';
                    }

                    if (parseInt(val.station_Id) == parseInt(that.leve3)) {
                        that.$refs.gif3.style.top = ((val.text_point.y + that.offsetY) * that.scale) + 'px';
                        that.$refs.gif3.style.left = ((val.text_point.x + that.offsetX )* that.scale) + 'px';
                    }
                })
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
        /*overflow-y: auto;*/
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

        .img-gif {
            position: absolute;
            top: 300px;
            left: 300px;
            border: 0;
            border-image: none;
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
        background-image: url('./images/bg.png');
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