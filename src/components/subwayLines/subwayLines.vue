<template>
    <div ref="canvasBox" class="canvasBox" :class="fullScreen ? 'fullScreenBox': ''">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <!--<i class="ivu-icon icon-fullScreen"-->
           <!--:class="fullScreen ? 'ivu-icon-android-contract' : 'ivu-icon-android-expand'"-->
           <!--:title="fullScreen ? '退出全屏' : '全屏'"-->
           <!--@click="switchFullScreen"></i>-->

        <vInfoPanel v-if="fullScreen" class="info-position"></vInfoPanel>
    </div>
</template>

<script>
    import metro_main from './js/main';
    import vInfoPanel from './module/infoPanel/infoPanel.vue';

    export default {
        data() {
            return {
               // fullScreen: false,
                scale: 1,    // canvas 被缩放的比例 默认1
                parentDom: null
            };
        },
        props: {
            fullScreen: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        components: {vInfoPanel},
        mounted () {
            var that = this;
            // this.browserFullInit();
            // this.parentDom = this.$el.parentNode;
            // this.pageInit();
            metro_main(that);
        },
        methods: {
            pageInit() {
                this.$refs.canvasBox.style.height = document.querySelector("#layout-content").clientHeight + 'px';

                if (this.$store.state.systemScroll) {
                    this.$store.state.systemScroll.refresh();
                }
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
                var that = this;
                this.fullScreen = !this.fullScreen;
                if (this.fullScreen) {
                    document.body.appendChild(this.$el);

                    this.$refs.canvasBox.style.height = '';

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

                    setTimeout(function () {
                        that.$refs.canvasBox.style.height = document.querySelector("#layout-content").clientHeight + 'px';
                        if (that.$store.state.systemScroll) {
                            that.$store.state.systemScroll.refresh();
                        }
                    }, 100);
                }

                // this.$store.commit('setCancelScroll', this.fullScreen);
            },
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