<template>
    <div ref="pathwayMap" class="pathwayMap-container">
        <Button class="btn-layout" type="text" icon="close-round" title="关闭" @click="closePath"></Button>
        <img class="img show" src="./images/pathwayMap/map_bg.png" alt="">
        <img class="img" :class="{show: lines.line1}" src="./images/pathwayMap/line1.png" alt="">
        <img class="img" :class="{show: lines.line2}" src="./images/pathwayMap/line2.png" alt="">
        <img class="img" :class="{show: lines.line3}" src="./images/pathwayMap/line3.png" alt="">
        <img class="img" :class="{show: lines.line4}" src="./images/pathwayMap/line4.png" alt="">
        <img class="img" :class="{show: lines.line6}" src="./images/pathwayMap/line6.png" alt="">

        <div class="legend-box">
            <div class="title">图例说明</div>
            <!--<div class="sub-title">Legend</div>-->
            <div class="flex-panel">
                <div class="checkList">
                    <div class="line line1"><Checkbox v-model="lines.line1"><span class="color-panel"></span>一号线(运营中)</Checkbox></div>
                    <div class="line line2"><Checkbox v-model="lines.line2"><span class="color-panel"></span>二号线(建设中)</Checkbox></div>
                    <div class="line line3"><Checkbox v-model="lines.line3"><span class="color-panel"></span>三号线(建设中)</Checkbox></div>
                    <div class="line line4"><Checkbox v-model="lines.line4"><span class="color-panel"></span>四号线(建设中)</Checkbox></div>
                    <div class="line line6"><Checkbox v-model="lines.line6"><span class="color-panel"></span>六号线(建设中)</Checkbox></div>
                </div>
                <div class="icon-explain">
                    <div class="label-box">
                        <label><img src="./images/pathwayMap/icon-legend-1.png" alt="">地铁站点</label>
                    </div>
                    <div class="label-box">
                        <label><img src="./images/pathwayMap/icon-legend-2.png" alt="">地铁转乘站</label>
                    </div>
                    <div class="label-box">
                        <label><img src="./images/pathwayMap/icon-legend-3.png" alt="">机场</label>
                    </div>
                    <div class="label-box">
                        <label><img src="./images/pathwayMap/icon-legend-4.png" alt="">火车站</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pathwayMap",
        data() {
            return {
                lines:{
                    line1: true,
                    line2: true,
                    line3: true,
                    line4: true,
                    line6: true
                }
            };
        },
        mounted() {},
        methods: {
            initStyle() {
                var width = this.$refs.pathwayMap.clientWidth;
                var height = this.$refs.pathwayMap.clientHeight;

            },

            closePath() {
                this.$parent.$data.oTrackMap = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pathwayMap-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 900px;
        overflow-y: auto;
        z-index: 99;
        background-color: #FFFFFF;

        .btn-layout {
            position: fixed;
            top: 2px;
            right: 15px;
            width: 102px;
            font-size: 26px;
            color: rgba(51,51,51,0.5);
            z-index: 10;
            opacity: 0.4;

            &:hover {
                color: rgba(51,51,51,0.8);
                opacity: 1;
            }
        }

        .img {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            opacity: 0;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            transition: all 1s;

            &.show {
                opacity: 1;
            }
        }

        .legend-box {
            position: absolute;
            padding: 20px 20px 0px;
            right: 40px;
            top: 60px;
            background-color: rgba(255,255,255,1);
            border: 4px solid #21a38d;
            border-radius: 12px;

            .title {
                font-size: 26px;
                line-height: 26px;
                text-align: center;
            }
            .sub-title {
                font-size: 14px;
                line-height: 28px;
                text-align: center;
            }
            .flex-panel {
                display: flex;
                @at-root .checkList {
                    .line {
                        position: relative;
                        padding: 6px 0;
                        line-height: 20px;
                        .color-panel {
                            display: inline-block;
                            vertical-align: middle;
                            white-space: nowrap;
                            cursor: pointer;
                            outline: 0;
                            line-height: 1;
                            position: relative;
                            width: 88px;
                            height: 8px;
                            background-color: rgb(202,202,202);
                            border-radius: 10px;
                        }
                    }
                }

                .icon-explain {
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 35px;
                    margin-right: 8px;
                    .label-box {
                        label {
                            font-size: 12px;
                            display: inline-block;
                            margin: 0 0 13px;

                            img {
                                margin-right: 28px;
                                display: inline-block;
                                vertical-align: middle;
                                white-space: nowrap;
                                cursor: pointer;
                                outline: 0;
                                line-height: 1;
                                position: relative;
                            }
                        }

                        &:first-child{
                            margin-top: 9px;
                            img {
                                margin-left: 8px;
                                margin-right: 38px;
                                width: 15px;
                            }
                        }
                        &:nth-child(2){
                            img {
                                margin-left: 4px;
                                margin-right: 32px;
                                width: 25px;
                            }
                        }
                    }

                }
            }
        }


    }

</style>
<style lang="scss">
    .checkList {
        .line{
            &.line1 {
                .ivu-checkbox-wrapper-checked {
                    .color-panel {
                        background-color: #e17628;
                    }
                }
            }
            &.line2 {
                .ivu-checkbox-wrapper-checked {
                    .color-panel {
                        background-color: #22943c;
                    }
                }
            }
            &.line3 {
                .ivu-checkbox-wrapper-checked {
                    .color-panel {
                        background-color: #c8187a;
                    }
                }
            }
            &.line4 {
                .ivu-checkbox-wrapper-checked {
                    .color-panel {
                        background-color: #652363;
                    }
                }
            }
            &.line6 {
                .ivu-checkbox-wrapper-checked {
                    .color-panel {
                        background-color: #136ea7;
                    }
                }
            }
        }
    }



</style>