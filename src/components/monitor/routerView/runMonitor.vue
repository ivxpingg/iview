<template>
    <div class="runMonitor-container">
        <div class="line-map-bg">
            <vInfoPanel :datas="infoPanelData"></vInfoPanel>
            <vLineMap class="v-line-map"></vLineMap>
        </div>
        <vInfoTable ref="vInfoTable" class="v-info-table"></vInfoTable>

        <vSubwayLines v-if="fullScreen" ref="subwayLines" class="fullScreenBox"></vSubwayLines>
        <i class="ivu-icon icon-fullScreen"
           :class="fullScreen ? 'ivu-icon-android-contract' : 'ivu-icon-android-expand'"
           :title="fullScreen ? '退出全屏' : '全屏'"
           @click="switchFullScreen"></i>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import vInfoPanel from '../infoPanel/infoPanel.vue';
    import vLineMap from '../lineMap/lineMap.vue';
    import vInfoTable from '../infoTable/infoTable.vue';
    import vSubwayLines from '../../subwayLines/subwayLines.vue';
    export default {
        data () {
            return {
                fullScreen: false,
                parentDom: null,

                setTimeOutInfoPanelData: null,
                setTimeOutInfoPanelDataTime: 30000,
                infoPanelData: {
                    "upAverageRunTime": "0",     //上行平均运行时长
                    "downAverageRunTime": "0",   //下行平均运行时长
                    "upAverageSpeed": "0",       //上行平均运行速度
                    "downAverageSpeed": "0",     //下行平均运行速度
                    "downAverageWait": "0",      //下行站间平均等待时长
                    "upAverageWait": "0",        //上行站间平均等待时长

                    "upLatePeak": 0,             //上行完成班次数（晚高峰）
                    "downLatePeak": 0,           //下行完成班次数（晚高峰）
                    "upEarlyPeak": 0,	         //上行完成班次数（早高峰）
                    "downEarlyPeak": 0,          //下行完成班次数（早高峰）
                    "upFlatPeak": 0,             //上行完成班次数（平峰）
                    "downFlatPeak": 0,           //下行完成班次数 （平峰）
                    "upNight": 0,                //上行完成班次（夜间）
                    "downNight": 0,              //下行完成班次（夜间）

                    "upEarlyAverageClass": "0",    //上行平均发班间隔（早高峰）
                    "downEarlyAverageClass": "0",  //下行平均发班间隔（早高峰）
                    "upFlatAverageClass":"0",      //上行平均发班间隔（平峰）
                    "downFlatAverageClass":"0",    //下行平均发班间隔（平峰）
                    "upLateAverageClass":"0",      //上行平均发班间隔（晚高峰）
                    "downLateAverageClass":"0",    //下行平均发班间隔（晚高峰）
                    "upNightAverageClass":"0",     //上行平均发班间隔（夜间）
                    "downNightAverageClass":"0",   //下行平均发班间隔（夜间）

                    "downWaitLongFirstStation": "",   //下行平均等待时间最长的站点
                    "upWaitLongFirstStation": "",     //上行平均等待时间最长的站点
                    "upWaitLongSecondStation": "",    //上行平均等待时间最长的站点
                    "upWaitShortSecondStation": "",   //上行平均等待时间最短的站点
                    "downWaitShortFirstStation": "",  //下行平均等待时间最短的站点
                    "downWaitShortSecondStation": "", //下行平均等待时间最短的站点
                    "upWaitShortFirstStation": "",    //上行平均等待时间最短的站点
                    "downWaitLongSecondStation": "",  //下行平均等待时间最长的站点

                    "downWaitLongFirstWaitTime": "0",  //下行平均等待时间最长的时间
                    "upWaitLongFirstWaitTime": "0",    //上行平均等待时间最长的时间
                    "upWaitLongSecondWaitTime": "0",   //上行平均等待时间最长的时间
                    "upWaitShortSecondWaitTime": "0",  //上行平均等待时间最短的时间
                    "downWaitShortFirstWaitTime": "0", //下行平均等待时间最短的时间
                    "downWaitShortSecondWaitTime": "0",//下行平均等待时间最短的时间
                    "upWaitShortFirstWaitTime": "0",   //上行平均等待时间最短的时间
                    "downWaitLongSecondWaitTime": "0"  //下行平均等待时间最长的时间
                }
            }
        },
        props: {
            domHeight: {
                type: Number,
                default() {
                    return 0;
                },
            }
        },
        watch: {
            domHeight(val, valOld) {
                console.log(val);
            }
        },
        components: {
            vInfoPanel,
            vLineMap,
            vInfoTable,
            vSubwayLines
        },
        beforeDestroy() {
            if (this.setTimeOutInfoPanelData) {
                clearTimeout(this.setTimeOutInfoPanelData);
            }
        },
        mounted() {
            this.browserFullInit();
            this.parentDom = this.$el.parentNode;

            this.getRunMonitorInfo();

        },
        methods: {
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
                var that = this;
                if (this.fullScreen) {

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
            },

            setFullScreenFor_subwayLines() {
                var screenWidth = window.screen.width;
                var screenHeight = window.screen.height;

                var dom_canvas = this.$refs.subwayLines.$el.children[0];
                var scale = 1;

                scale = screenHeight / 1500;

                dom_canvas.style.transform = 'scale('+scale+')';
                dom_canvas.style.left = (-150 * scale) + 'px';
            },


            getRunMonitorInfo() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/runCount/getRunCount',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.infoPanelData = response.result;
                    }
                    else {}

                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getRunMonitorInfo();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    console.log(error);
                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getRunMonitorInfo();
                    }, that.setTimeOutInfoPanelDataTime);
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .runMonitor-container {
        position: relative;
        height: 100%;
        .line-map-bg {
            padding-top: 7px;
            width: 100%;
            height:557px;
            background: #dfdddc url(./images/line-map-bg.png) no-repeat;
            background-size: 1440px auto;
            background-position: top center;

            .v-line-map {
                margin: 5px 40px 0px 30px;
                padding-bottom: 3px;
            }
        }

        .vInfoTable {

        }

        .icon-fullScreen {
            position: fixed;
            top: 242px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            padding: 8px 12px;
            /*background-color: rgba(0,0,0,.6);*/
            color: #454e5e;
            border-radius: 4px;
            z-index: 10001;
            &:hover {
                background-color: rgba(0,0,0,.4);
            }

            &.ivu-icon-android-contract {
                top: 20px;
            }
        }
        .fullScreenBox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
        }
    }
</style>