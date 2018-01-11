<template>
    <div class="infoPanel-container">

        <div class="left-panel">
            <div class="bg">
                <div class="bg-left"></div>
                <div class="bg-bg"></div>
                <div class="bg-bg-extra"></div>
                <div class="bg-join bg-join1"></div>
                <div class="bg-bg">
                </div>
                <div class="bg-join bg-join2"></div>
                <div class="bg-bg">
                </div>
                <div class="bg-right"></div>
            </div>
            <div class="box-panel">
                <div class="info-content">
                    <div class="title">列车平均</br>运行速度</div>
                    <div class="value-panel">
                        <div class="sub-title">上行：</div>
                        <div class="value"> <span>86.1</span><span class="unit">km/h</span> </div>
                        <div class="sub-title">下行：</div>
                        <div class="value"> <span>85.0</span><span class="unit">km/h</span> </div>
                    </div>
                </div>
                <div class="info-content">
                    <div class="title">列车平均</br>运行时长</div>
                    <div class="value-panel">
                        <div class="sub-title">上行：</div>
                        <div class="value"> <span>86.1</span><span class="unit">min</span> </div>
                        <div class="sub-title">下行：</div>
                        <div class="value"> <span>85.0</span><span class="unit">min</span> </div>
                    </div>
                </div>
                <div class="info-content">
                    <div class="title">列车平均</br>等待时长</div>
                    <div class="value-panel">
                        <div class="sub-title">上行：</div>
                        <div class="value"> <span>86.1</span><span class="unit">min</span> </div>
                        <div class="sub-title">下行：</div>
                        <div class="value"> <span>85.0</span><span class="unit">min</span> </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-panel">
            <div class="info-panel">
                <div class="top">
                    <span class="text">完成班次数</span>
                </div>
                <div class="bottom">
                    <div class="box box-1">
                        <div class="title">早高峰</div>
                        <div class="value-panel">
                            <div class="value"><span class="tit">上行:</span><span class="num">50</span></div>
                            <div class="value"><span class="tit">下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-2">
                        <div class="title">平峰</div>
                        <div class="value-panel">
                            <div class="value"><span class="tit">上行:</span><span class="num">50</span></div>
                            <div class="value"><span class="tit">下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-3">
                        <div class="title">晚高峰</div>
                        <div class="value-panel">
                            <div class="value"><span class="tit">上行:</span><span class="num">50</span></div>
                            <div class="value"><span class="tit">下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-4">
                        <div class="title">夜间</div>
                        <div class="value-panel">
                            <div class="value"><span class="tit">上行:</span><span class="num">50</span></div>
                            <div class="value"><span class="tit">下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-panel">
                <div class="top">
                    <span class="text">平均发班间隔</span>
                </div>
                <div class="bottom">
                    <div class="box box-1">
                        <div class="title">早高峰</div>
                        <div class="value-panel">
                            <div class="value"><span>上行:</span><span class="num">50</span></div>
                            <div class="value"><span>下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-2">
                        <div class="title">平峰</div>
                        <div class="value-panel">
                            <div class="value"><span>上行:</span><span class="num">50</span></div>
                            <div class="value"><span>下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-3">
                        <div class="title">晚高峰</div>
                        <div class="value-panel">
                            <div class="value"><span>上行:</span><span class="num">50</span></div>
                            <div class="value"><span>下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                    <div class="box box-4">
                        <div class="title">夜间</div>
                        <div class="value-panel">
                            <div class="value"><span>上行:</span><span class="num">50</span></div>
                            <div class="value"><span>下行:</span><span class="num">52</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .infoPanel-container {
        position: relative;
        width: 100%;
        height: 128px;

        .left-panel {
            position: absolute;
            top: 0;
            left: 0;
            height: 128px;
            width: 41.5%;

            .bg {
                display: flex;
                width: 100%;
                height: 100%;
                .bg-left {
                    width: 33px;
                    height: 100%;
                    background: transparent url(./images/bg1-left.png) no-repeat center;
                }

                .bg-join {
                    width: 41px;
                    height: 100%;
                    background: transparent url(./images/bg1-join.png) no-repeat center;
                }

                .bg-right {
                    width: 39px;
                    height: 100%;
                    background: transparent url(./images/bg1-right.png) no-repeat center;
                }

                .bg-bg {
                    flex: 1;
                    height: 100%;
                    background: transparent url(./images/bg1-bg.png) repeat-x center;
                }
                .bg-bg-extra {
                    width: 8px;
                    height: 100%;
                    background: transparent url(./images/bg1-bg.png) repeat-x center;
                }
            }

            .box-panel {
                position: absolute;
                display: flex;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                padding-left: 15px;
                padding-right: 16px;
                z-index: 1;

                .info-content {
                    display: flex;
                    box-sizing: border-box;
                    flex: 1;
                    padding-left: 7px;
                    padding-right: 10px;

                    &:first-child {
                        padding-right: 18px;
                    }

                    .title {
                        position: relative;
                        padding: 41px 20px 41px 0;
                        flex: 1;
                        color: #FFF;
                        font-size: 13px;
                        line-height: 18px;
                        text-align: center;
                        z-index: 1;

                        &:after {
                            content: " ";
                            top: 19px;
                            right: 15px;
                            display: block;
                            position: absolute;
                            background-color: #47856a;
                            width: 1px;
                            height: 90px;
                            transform: rotate(14deg);
                            z-index: 1;
                        }
                    }
                    .value-panel{
                        padding-top: 15px;
                        flex: 1;
                        color: #FFF;
                        .sub-title {
                            width: 84px;
                            margin: 0 auto;
                            font-size: 12px;
                        }
                        .value {
                            width: 84px;
                            margin: 0 auto;
                            padding-left: 16px;
                            font-size: 16px;
                            .unit {
                                padding-left: 4px;
                                font-size: 12px;
                            }
                        }
                    }
                }

            }
        }
        .right-panel {
            display: flex;
            position: absolute;
            box-sizing: border-box;
            top: 0;
            right: 0;
            height: 128px;
            width: 58.5%;
            color: #FFF;

            .info-panel {
                flex: 1;
                height: 100%;
                .top {
                    position: relative;
                    height: 26px;
                    background-color: #767cbb;
                    /*border-top: 1px solid #8388c0;*/
                    text-align: center;
                    overflow: hidden;

                    &:before {
                        content: " ";
                        position: absolute;
                        left: -99px;
                        bottom: 0;
                        display: block;
                        width: 100px;
                        height: 100px;
                        background-color: #dedcdb;
                        border: 1px solid #8388c0;
                        z-index: 1;
                        transform-origin: 100% 100%;
                        transform: rotate(14deg);
                    }
                    &:after {
                        content: " ";
                        position: absolute;
                        right: -99px;
                        bottom: 0;
                        display: block;
                        width: 100px;
                        height: 100px;
                        background-color: #dedcdb;
                        border: 1px solid #8388c0;
                        z-index: 1;
                        transform-origin: 0% 100%;
                        transform: rotate(-14deg);
                    }

                    .text {
                        position: relative;
                        display: inline-block;
                        font-size: 15px;
                        line-height: 26px;

                        &:after {
                            content: " ";
                            position: absolute;
                            display: block;
                            left: 0;
                            bottom: 2px;
                            height: 1px;
                            width: 100%;
                            background-color: #6b70ab;
                        }
                    }
                }
                .bottom {
                    display: flex;
                    width: 100%;
                    height: 102px;
                    .box {
                        position: relative;
                        flex: 1;
                        &.box-1 {
                            background-color: #ed9990;

                            .title {
                                background-color: #dc7e77;
                            }
                        }
                        &.box-2 {
                            background-color: #84b4de;
                            .title {
                                padding: 15px 0;
                                background-color: #649fcd;
                            }
                        }
                        &.box-3 {
                            background-color: #9f94c4;
                            .title {
                                background-color: #877baf;
                            }
                        }
                        &.box-4 {
                            background-color: #9dcea6;
                            .title {
                                padding: 15px 0;
                                background-color: #82bb8f;
                            }
                        }

                        .title {
                            position: absolute;
                            padding: 4px 0;
                            top: 14px;
                            left: 4.8%;
                            width: 26px;
                            height: 74px;
                            font-size: 16px;
                            line-height: 22px;
                            text-align: center;
                            border-radius: 13px;
                        }
                        .value-panel {
                            position: absolute;
                            top: 0px;
                            left: 37.3%;
                            .value {
                                margin-top: 18px;
                                font-size: 12px;
                                line-height: 24px;
                                .tit {
                                    vertical-align: top;
                                }
                                .num {
                                    padding-left: 5px;
                                    font-size: 18px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>