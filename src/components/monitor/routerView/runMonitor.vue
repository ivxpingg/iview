<template>
    <div class="container">
        <div class="line-map-bg">
            <vInfoPanel></vInfoPanel>
            <vLineMap class="v-line-map"></vLineMap>
        </div>
        <vInfoTable></vInfoTable>

        <vSubwayLines v-if="fullScreen" ref="subwayLines" class="fullScreenBox"></vSubwayLines>
        <i class="ivu-icon icon-fullScreen"
           :class="fullScreen ? 'ivu-icon-android-contract' : 'ivu-icon-android-expand'"
           :title="fullScreen ? '退出全屏' : '全屏'"
           @click="switchFullScreen"></i>
    </div>
</template>

<script>
    import vInfoPanel from '../infoPanel/infoPanel.vue';
    import vLineMap from '../lineMap/lineMap.vue';
    import vInfoTable from '../infoTable/infoTable.vue';
    import vSubwayLines from '../../subwayLines/subwayLines.vue';
    export default {
        data () {
            return {
                fullScreen: false,
                parentDom: null
            }
        },
        components: {
            vInfoPanel,
            vLineMap,
            vInfoTable,
            vSubwayLines
        },
        mounted() {
            this.browserFullInit();
            this.parentDom = this.$el.parentNode;
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
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        position: relative;

        .line-map-bg {
            padding-top: 7px;
            width: 100%;
            background: #dfdddc url(./images/line-map-bg.png) no-repeat;
            background-size: 1440px auto;
            background-position: top center;

            .v-line-map {
                margin: 5px 40px 0px 30px;
                padding-bottom: 3px;
            }
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