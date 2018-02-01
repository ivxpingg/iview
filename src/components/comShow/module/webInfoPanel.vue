<template>
    <div class="webInfoPanel-container">
        <div class="train-panel">
            <div class="train-box train-box1">
                <div class="title">上行列车数</div>
                <div class="num">8</div>
            </div>
            <div class="train-box train-box2">
                <div class="title">下行列车数</div>
                <div class="num">10</div>
            </div>
        </div>

        <div class="flow-panel">
            <div class="flow-box flow-box1">
                <div class="title">进站客流量</div>
                <div class="num">109876</div>
            </div>
            <div class="flow-box flow-box2">
                <div class="title">出站客流量</div>
                <div class="num">106254</div>
            </div>
        </div>

        <div class="speed-panel">
            <div class="info-item info-item1">
                <div class="title">列车平均</div>
                <div class="sub-title">上行</div>
                <div class="percent">
                    <div class="percent-value orange" :style="{width: datas.downAverageSpeed + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.upAverageSpeed}}</span>km/h</div>
            </div>

            <div class="info-item info-item2">
                <div class="title">运行速度</div>
                <div class="sub-title">下行</div>
                <div class="percent">
                    <div class="percent-value green" :style="{width: datas.downAverageSpeed + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.downAverageSpeed}}</span>km/h</div>
            </div>

            <div class="info-item info-item3">
                <div class="title">列车平均</div>
                <div class="sub-title">上行</div>
                <div class="percent">
                    <div class="percent-value orange" :style="{width: datas.upAverageRunTime + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.upAverageRunTime}}</span>min</div>
            </div>

            <div class="info-item info-item4">
                <div class="title">运行时长</div>
                <div class="sub-title">下行</div>
                <div class="percent">
                    <div class="percent-value green" :style="{width: datas.downAverageRunTime + '%', borderWidth: (datas.downAverageWait > 0 ? 1 : 0)}"></div>
                </div>
                <div class="value"><span class="text">{{datas.downAverageRunTime}}</span>min</div>
            </div>
        </div>

        <div class="info-panel">
            <div class="prob prob1">正面<span>4.55</span>%</div>
            <div class="prob prob2">中立<span>4.55</span>%</div>
            <div class="prob prob3">负面<span>4.55</span>%</div>

            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>

            <div class="sum">
                <div class="title">总数</div>
                <div class="num">12302</div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                datas: {
                    "upAverageRunTime": "54",     //上行平均运行时长
                    "downAverageRunTime": "60",   //下行平均运行时长
                    "upAverageSpeed": "60",       //上行平均运行速度
                    "downAverageSpeed": "65",     //下行平均运行速度
                }
            }
        },
        mounted() {},
        methods: {}
    }
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
    .webInfoPanel-container {
        position: relative;
        width: 472px;
        height: 838px;
        background: url("./images/right-panel.png");
        color: #FFFFFF;
        user-select: none;

        .train-panel {
            position: absolute;
            top: 40px;
            left: 40px;
            width: 282px;
            height: 102px;
            overflow: hidden;

            .train-box {
                float: left;
                width: 140px;
                height: 102px;

                .title {
                    padding: 18px 0 8px;
                    font-size: 14px;
                    text-align: center;
                }
                .num {
                    font-size: 26px;
                    text-align: center;
                }
            }
        }

        .flow-panel {
            position: absolute;
            top: 180px;
            left: 40px;
            width: 282px;
            height: 102px;
            overflow: hidden;

            .flow-box {
                float: left;
                padding-left: 20px;
                width: 122px;
                height: 102px;
                text-align: left;

                &.flow-box2 {
                    padding-left: 40px;
                }

                .title {
                    padding: 18px 0 8px;
                    font-size: 14px;
                }
                .num {
                    font-size: 26px;
                }
            }
        }

        .speed-panel {
            position: absolute;
            top: 321px;
            left: 40px;
            width: 392px;
            height: 186px;
            color: #FFFFFF;
            overflow: hidden;

            .info-item {
                position: absolute;
                left: 0;
                display: flex;
                height: 30px;
                line-height: 30px;

                &.info-item1 {
                    top: 14px;
                }

                &.info-item2 {
                    top: 50px;
                }

                &.info-item3 {
                    top: 105px;
                }

                &.info-item4 {
                    top: 142px;
                }

                .title {
                    margin-left:20px;
                    width: 88px;
                    font-size: 16px;
                    text-align: left;
                }
                .sub-title {
                    width: 45px;
                    text-align: left;
                    font-size: 14px;
                }
                .percent {
                    position: relative;
                    margin: 10px 0;
                    width: 152px;
                    height: 8px;
                    background: rgba(17, 50, 82, 0.4);
                    border-radius: 7px;
                    .percent-value {
                        position: absolute;
                        height: 8px;
                        top: 0px;
                        left: 0px;
                        border-radius: 7px;
                        box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);

                        &.orange {
                            background: rgba(238,120,31, 0.8);//#de7323;
                            border: 0px solid rgba(238,120,31, 0.8);

                            &:after {
                                position: absolute;
                                display: block;
                                content: " ";
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                box-shadow: 0 0 15px rgba(238,120,31, 0.4);
                            }

                        }
                        &.green {
                            background: rgba(38,150,192, 0.8);
                            border: 0px solid rgba(38,150,192, 0.8);

                            &:after {
                                position: absolute;
                                display: block;
                                content: " ";
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                box-shadow: 0 0 15px rgba(38,150,192, 0.4);
                            }
                        }
                    }
                }
                .value{
                    margin-left: 13px;
                    flex: 1;
                    text-align: left;
                    font-size: 13px;
                }
            }
        }

        .info-panel {
            position: absolute;
            top: 545px;
            left: 40px;
            width: 392px;
            height: 256px;
            color: #FFFFFF;
            overflow: hidden;
        }
    }
</style>