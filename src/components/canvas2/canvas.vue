<template>
    <div ref="canvasBox" class="canvasBox" :class="fullScreen ? 'fullScreenBox': ''">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <i class="ivu-icon icon-fullScreen"
           :class="fullScreen ? 'ivu-icon-android-contract' : 'ivu-icon-android-expand'"
           :title="fullScreen ? '退出全屏' : '全屏'"
           @click="switchFullScreen"></i>

        <div class="d-popup" :class="popupShow ? 'popupShow' : ''"
             :style="{ left: popupPositionX + 'px', top: popupPositionY + 'px'}" @mouseup.stop >
            <h1>{{stationName}}</h1>
            <p>镇海路 》 岩内：距离下一辆还有：5分钟</p>
            <p>岩内 》 镇海路：距离下一辆还有：2分钟</p>
            <div class="echartdemo" id="echartdemo" style="width: 600px;height:400px;"></div>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import main from './js/main';

    export default {
        data() {
            return {
                fullScreen: false,
                stationName: '',
                popupShow: false,
                popupPositionX: 0,
                popupPositionY: 0,
                scale: 1,    // canvas 被缩放的比例 默认1
                parentDom: null
            };
        },
        mounted: function () {

            var that = this;

            this.browserFullInit();

            this.parentDom = this.$el.parentNode;

            this.pageInit();
            main(that);
            this.echartDemo();
        },
        methods: {
            pageInit() {
                document.querySelector("#layout-content-main").style.height = "100%";
            },
            /**
             * 浏览器全屏设置
             */
            browserFullInit() {
                document.addEventListener("fullscreenchange", function () {

                    fullscreenState.innerHTML = (document.fullscreen) ? "" : "not ";
                }, false);

                document.addEventListener("mozfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.mozFullScreen) ? "" : "not ";
                }, false);



                document.addEventListener("webkitfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.webkitIsFullScreen) ? "" : "not ";
                }, false);

                document.addEventListener("msfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.msFullscreenElement) ? "" : "not ";
                }, false);
            },
            switchFullScreen () {
                this.fullScreen = !this.fullScreen;
                if (this.fullScreen) {
                    document.body.appendChild(this.$el);

                    var docElm = document.documentElement;
                    //W3C
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    }
                    //FireFox
                    else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    }
                    //Chrome等
                    else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    }
                    //IE11
                    else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                } else {
                    this.parentDom.appendChild(this.$el);
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                    else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }

                // this.$store.commit('setCancelScroll', this.fullScreen);
            },
            stationPopupShow (p) {
                this.popupShow = true;
                this.popupPositionX = p[0];
                this.popupPositionY = p[1];
            },
            stationPopupHidden () {
                this.popupShow = false;
            },

            echartDemo() {
                var myChart = echarts.init(document.getElementById('echartdemo'));
                myChart.setOption({
                    angleAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        z: 10
                    },
                    radiusAxis: {
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: '进站量',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: '出站量',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: '总进出量',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['进站量', '出站量', '总进出量']
                    }
                });
            }

        }
    }

</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
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
            &:hover {
                background-color: rgba(0,0,0,.7);
            }
        }
    }

    .fullScreenBox {
        position: fixed;

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