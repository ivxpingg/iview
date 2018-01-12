<template>
    <div ref="canvasBox" class="canvasBox">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <vInfoPanel :datas="datas" class="info-position"></vInfoPanel>
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
        props: {
            datas: {
                type: Object,
                default() {
                    return {
                        "upAverageClass": "7.5",        //上行平均发班间隔
                        "downLatePeak": 0,              //下行晚高峰完成班次
                        "downAverageClass": "0",        //下行平均发班间隔
                        "upLatePeak": 0,                //上行晚高峰完成班次
                        "upAverageRunTime": "0",        //上行平均运行时长
                        "downAverageRunTime": "0",      //下行平均运行时长
                        "upWaitLongSecondStation": "",  //上行平均等待时间最长的站点
                        "downAverageSpeed": "0",        //下行平均运行速度
                        "upNight": 0,                   //上行夜间完成班次
                        "downAverageWait": "0",         //下行站间平均等待时长
                        "upFlatPeak": 0,                // 上行平峰完成班次数
                        "upWaitShortSecondStation": "", //上行平均等待时间最短的站点
                        "downNight": 0,                 //下行夜间完成班次
                        "upEarlyPeak": 0,               //上行早高峰完成班次数
                        "upAverageWait": "0",           //上行站间平均等待时长
                        "downWaitLongFirstStation": "", //下行平均等待时间最长的站点
                        "upWaitLongFirstStation": "",   //上行平均等待时间最长的站点
                        "downWaitShortFirstStation": "",// 下行平均等待时间最短的站点
                        "downFlatPeak": 0,              //下行平峰完成班次数
                        "downWaitShortSecondStation": "", //下行平均等待时间最短的站点
                        "upWaitShortFirstStation": "",  //上行平均等待时间最短的站点
                        "downEarlyPeak": 0,             //下行早高峰完成班次数
                        "upAverageSpeed": "0",          //上行平均运行速度
                        "downWaitLongSecondStation": "" //下行平均等待时间最长的站点
                    }
                }
            }
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