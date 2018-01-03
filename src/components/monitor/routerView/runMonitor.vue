<template>
    <div class="container">
        <vInfoPanel></vInfoPanel>
        <vLineMap></vLineMap>
        <vInfoTable></vInfoTable>

        <vSubwayLines ref="subwayLines" :class="fullScreen ? 'fullScreenBox': ''" :fullScreen="fullScreen"></vSubwayLines>
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
                var that = this;
                this.fullScreen = !this.fullScreen;
                if (this.fullScreen) {
                    debugger
                    document.body.appendChild(this.$refs.subwayLines.$el);


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
                    this.parentDom.appendChild(this.$refs.subwayLines.$el);

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

//                    setTimeout(function () {
//                        that.$refs.canvasBox.style.height = document.querySelector("#layout-content").clientHeight + 'px';
//                        if (that.$store.state.systemScroll) {
//                            that.$store.state.systemScroll.refresh();
//                        }
//                    }, 100);
                }

                // this.$store.commit('setCancelScroll', this.fullScreen);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        position: relative;

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
            z-index: 10001;
            &:hover {
                background-color: rgba(0,0,0,.7);
            }
        }
        .fullScreenBox {
            position: fixed;
            z-index: 10000;
        }
    }
</style>