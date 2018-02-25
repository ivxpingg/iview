<template>
    <div class="info-panel">
        <div class="top-panel">

            <div class="info-item">
                <div class="title">列车平均</div>
                <div class="sub-title">上行</div>
                <div class="percent">
                    <div class="percent-value orange" :style="{width: datas.downAverageSpeed + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.upAverageSpeed}}</span>km/h</div>
            </div>
            <div class="info-item">
                <div class="title">运行速度</div>
                <div class="sub-title">下行</div>
                <div class="percent">
                    <div class="percent-value green" :style="{width: datas.downAverageSpeed + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.downAverageSpeed}}</span>km/h</div>
            </div>

            <div class="dotted-line1"></div>

            <div class="info-item">
                <div class="title">列车平均</div>
                <div class="sub-title">上行</div>
                <div class="percent">
                    <div class="percent-value orange" :style="{width: datas.upAverageRunTime + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.upAverageRunTime}}</span>min</div>
            </div>
            <div class="info-item">
                <div class="title">运行时长</div>
                <div class="sub-title">下行</div>
                <div class="percent">
                    <div class="percent-value green" :style="{width: datas.downAverageRunTime + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.downAverageRunTime}}</span>min</div>
            </div>

            <div class="dotted-line1"></div>

            <div class="info-item">
                <div class="title">站间平均</div>
                <div class="sub-title">上行</div>
                <div class="percent">
                    <div class="percent-value orange" :style="{width: datas.upAverageWait + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.upAverageWait}}</span>min</div>
            </div>
            <div class="info-item">
                <div class="title">等待时长</div>
                <div class="sub-title">下行</div>
                <div class="percent">
                    <div class="percent-value green" :style="{width: datas.downAverageWait + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.downAverageWait}}</span>min</div>
            </div>

            <div class="dotted-line2"></div>

            <div class="wait-info-panel">

                <div class="wait-info-box">
                    <div class="title title-left"><span>上</span><span>行</span></div>
                    <div class="title title-right"><span>下</span><span>行</span></div>

                    <div class="station-wait station-wait-down">
                        <div class="station-name station-name-left">{{datas.upWaitLongFirstStation}}<span>{{datas.upWaitLongFirstWaitTime}}</span><span class="unit">min</span></div>
                        <div class="station-name station-name-right">{{datas.upWaitLongSecondStation}}<span>{{datas.upWaitLongSecondWaitTime}}</span><span class="unit">min</span></div>
                    </div>
                    <div class="dotted-vertical-line"></div>
                    <div class="station-wait  station-wait-up">
                        <div class="station-name station-name-left">{{datas.downWaitLongFirstStation}}<span>{{datas.downWaitLongFirstWaitTime}}</span><span class="unit">min</span></div>
                        <div class="station-name station-name-right">{{datas.downWaitLongSecondStation}}<span>{{datas.downWaitLongSecondWaitTime}}</span><span class="unit">min</span></div>
                    </div>
                    <div class="explain">等待时间最长站点</div>
                </div>



                <div class="wait-info-box">
                    <div class="title title-left"><span>上</span><span>行</span></div>
                    <div class="title title-right"><span>下</span><span>行</span></div>

                    <div class="station-wait station-wait-down">
                        <div class="station-name station-name-left">{{datas.upWaitShortFirstStation}}<span>{{datas.upWaitShortFirstWaitTime}}</span><span class="unit">min</span></div>
                        <div class="station-name station-name-right">{{datas.upWaitShortSecondStation}}<span>{{datas.upWaitShortSecondWaitTime}}</span><span class="unit">min</span></div>
                    </div>
                    <div class="dotted-vertical-line"></div>
                    <div class="station-wait  station-wait-up">
                        <div class="station-name station-name-left">{{datas.downWaitShortFirstStation}}<span>{{datas.downWaitShortFirstWaitTime}}</span><span class="unit">min</span></div>
                        <div class="station-name station-name-right">{{datas.downWaitShortSecondStation}}<span>{{datas.downWaitShortSecondWaitTime}}</span><span class="unit">min</span></div>
                    </div>

                    <div class="explain">等待时间最短站点</div>
                </div>

            </div>

        </div>

        <div class="bottom-panel">
            <div class="layout-box">
                <div class="layout-left">
                    <div class="row">
                        <div class="col col2">时间</div>
                    </div>
                    <div class="row">
                        <div class="col">早高峰</div>
                    </div>
                    <div class="row">
                        <div class="col">平峰</div>
                    </div>
                    <div class="row">
                        <div class="col">晚高峰</div>
                    </div>
                    <div class="row">
                        <div class="col">夜间</div>
                    </div>
                </div>
                <div class="layout-right">
                    <div class="row sxc-flex">
                        <div class="col col-title sxc-flex__item">完成班次数</div>
                        <div class="col col-title sxc-flex__item">平均发班时隔</div>
                    </div>
                    <div class="row sxc-flex">
                        <div class="col col-subtitle sxc-flex__item">上行</div>
                        <div class="col col-subtitle sxc-flex__item">下行</div>
                        <div class="col col-subtitle sxc-flex__item">上行</div>
                        <div class="col col-subtitle sxc-flex__item">下行</div>
                    </div>
                    <div class="row sxc-flex">
                        <div class="col col-odd sxc-flex__item">{{datas.upEarlyPeak}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.downEarlyPeak}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.upEarlyAverageClass}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.downEarlyAverageClass}}</div>
                    </div>
                    <div class="row sxc-flex">
                        <div class="col col-even sxc-flex__item">{{datas.upFlatPeak}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.downFlatPeak}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.upFlatAverageClass}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.downFlatAverageClass}}</div>
                    </div>
                    <div class="row sxc-flex">
                        <div class="col col-odd sxc-flex__item">{{datas.upLatePeak}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.downLatePeak}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.upLateAverageClass}}</div>
                        <div class="col col-odd sxc-flex__item">{{datas.downLateAverageClass}}</div>
                    </div>
                    <div class="row sxc-flex">
                        <div class="col col-even sxc-flex__item">{{datas.upNight}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.downNight}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.upNightAverageClass}}</div>
                        <div class="col col-even sxc-flex__item">{{datas.downNightAverageClass}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        props: {
            datas: {
                type: Object,
                default() {
                    return {
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
            }
        },
        methods: {
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss"  scoped>

    .info-panel {
        /*transform: scale(0.7, 0.7);*/
        /*transform-origin: 100% 50%;*/
        position: relative;
        .top-panel {
            position: relative;
            background: #ffffff;
            padding: 10px 18px 13px;
            width: 340px;
            border: 4px solid #01977d;
            border-radius: 10px;

            .info-item {
                /*margin: 2px 0px;*/
                display: flex;
                height: 30px;
                line-height: 30px;
                .title {
                    /*padding-left: 7px;*/
                    width: 63px;
                    color: #4fa896;
                    font-size: 14px;
                    font-weight: 700;
                }
                .sub-title {
                    padding-right: 15px;
                    width: 50px;
                    text-align: right;
                    color: #3c3c3c;
                    font-size: 12px;
                }
                .percent {
                    position: relative;
                    flex: 1;
                    margin: 9px 0;
                    height: 10px;
                    background: #727071;
                    border: 1px solid #676465;
                    border-radius: 7px;
                    .percent-value {
                        position: absolute;
                        height: 10px;
                        top: -1px;
                        left: -1px;
                        border-radius: 7px;

                        &.orange {
                            background: #de7323;
                            border: 1px solid #db630a;
                        }
                        &.green {
                            background: #279999;
                            border: 1px solid #098c8c;
                        }
                    }
                }
                .value{
                    /*padding-right: 7px;*/
                    width: 56px;
                    text-align: right;
                    color: #3c3c3c;
                    font-size: 12px;
                }
            }

            .dotted-line1 {
                 margin: 5px 0px 5px 55px;
                 height: 0;
                 border-top-width: 1px;
                 border-top-color: #c5c5c5;
                 border-top-style: dotted;
            }
            .dotted-line2 {
                margin: 5px 0px 12px;
                height: 0;
                border-top-width: 1px;
                border-top-color: #c5c5c5;
                border-top-style: dotted;
            }

            .wait-info-panel {
                display: flex;
                .wait-info-box {
                    position: relative;
                    flex: 1;
                    padding: 24px 0px 20px;
                    display: flex;
                    width: 208px;

                    &:first-child {
                        margin-right: 18px;
                    }

                    .dotted-vertical-line {
                        margin: 8px 0px 28px 0px;
                        width: 1px;
                        border-left-width: 1px;
                        border-left-color: #c5c5c5;
                        border-left-style: dotted;
                    }

                    .title {
                        position: absolute;
                        width: 50px;
                        height: 24px;
                        line-height: 22px;
                        text-align: center;
                        color: #FFF;
                        font-size: 13px;
                        > span {
                            /*display: block;*/
                            /*text-align: center;*/
                        }

                        &.title-left {
                            top: 0;
                            left: 11px;
                            border: 1px solid #de7323;
                            background-color: #de7323;
                        }
                        &.title-right {
                            top: 0;
                            right: 3px;
                            background-color: #279999;
                            border: 1px solid #279999
                        }
                    }

                    .station-wait {
                        position: relative;
                        margin: 0 0px;
                        width: 56px;
                        padding-top: 22px;
                        padding-bottom: 20px;
                        flex: 1;
                        /*overflow: hidden;*/

                        &.station-wait-down {
                            background: url('./images/station-down.gif') no-repeat top center;
                            background-size: 100%;
                            margin: 0 9px 0 8px;
                        }
                        &.station-wait-up {
                            margin-left: 9px;
                            background: url('./images/station-up.gif') no-repeat top center;
                            background-size: 100%;
                        }

                        .station-name {
                            position: relative;
                            padding-bottom: 10px;
                            width: 20px;
                            line-height: 20px;
                            text-align: center;
                            /*word-wrap: break-word;*/
                            /*overflow: hidden;*/

                            & > span {
                                display: inline-block;
                                width: 100%;
                                &.unit {
                                    position: absolute;
                                    bottom: 0;
                                    left:0;
                                    right: 0;
                                }
                            }


                            &.station-name-left {
                                float: left;
                            }
                            &.station-name-right {
                                float: right;
                            }
                        }
                    }

                    .explain {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: 20px;
                        font-size: 14px;
                        line-height:20px;
                        color: #4fa896;
                        text-align: center;
                        font-weight: 700;
                    }
                }
            }
        }

        .bottom-panel {
            position: relative;
            margin-top: 10px;
            background: #ffffff;
            width: 340px;
            color: #403e3b;
            font-size: 12px;
            border: 4px solid #01977d;
            border-radius: 10px;
            overflow: hidden;

            .layout-box {
                display: flex;
                .layout-left {
                    flex: 1;

                    .row {
                        width: 100%;
                        text-align: center;

                        &:nth-child(odd) {
                            .col {
                                background-color: #c0dcf2;
                            }
                        }
                        &:nth-child(even) {
                            .col {
                                background-color: #aed3f0;
                            }
                        }

                        &:first-child {
                            .col {
                                background-color: #e1edf9;
                            }
                        }

                        &:last-child {
                            .col {
                                margin-bottom: 0;
                            }
                        }

                        .col {
                            margin: 0 1px 1px 0;
                            height: 32px;
                            line-height: 32px;
                        }
                        .col2 {
                            height: 65px;
                            line-height: 65px;
                        }
                    }
                }
                .layout-right {
                    flex: 4;

                    .row {
                        margin: 1px 0;
                        width: 100%;
                        text-align: center;

                        &:nth-child(odd) {
                            .col {
                                background-color: #add7b3;
                            }
                        }
                        &:nth-child(even) {
                            .col {
                                background-color: #bee1c3;
                            }
                        }

                        &:first-child {
                            margin-top: 0;
                            .col {
                                background-color: #8dcb9a;
                            }
                        }
                        &:last-child {
                            margin-bottom: 0;
                        }
                        &:nth-child(2) {
                            .col {
                                background-color: #e1efe2;
                            }
                        }

                        .col {
                            margin: 0 1px 0 0;
                            width: 100%;
                            height: 32px;
                            line-height: 32px;

                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
