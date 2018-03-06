<template>
    <div class="webInfoPanel-container">
        <div class="train-panel">
            <div class="train-box train-box1">
                <div class="title">上行列车数</div>
                <div class="num">{{upTrainNum}}</div>
            </div>
            <div class="train-box train-box2">
                <div class="title">下行列车数</div>
                <div class="num">{{downTrainNum}}</div>
            </div>
        </div>

        <div class="flow-panel">
            <div class="flow-box flow-box1">
                <div class="title">进站客流量</div>
                <div class="num">{{todayTotalInPassenger}}</div>
            </div>
            <div class="flow-box flow-box2">
                <div class="title">出站客流量</div>
                <div class="num">{{todayTotalOutPassenger}}</div>
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
            <div class="prob prob3">正面<span>{{p_positive}}</span>%</div>
            <div class="prob prob2">负面<span>{{p_negative}}</span>%</div>
            <div class="prob prob1">中立<span>{{p_neutral}}</span>%</div>

            <div class="circle circle-box">
                <div class="circle circle3" :class="clsName1">
                    <div class="circle circle2" :class="clsName2">
                        <div class="circle circle1" :class="clsName3"></div>
                    </div>
                </div>
                <div class="sum">
                    <div class="title">总数</div>
                    <div class="num">{{yq_all}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                datas: {
                    "upAverageRunTime": "0",     //上行平均运行时长
                    "downAverageRunTime": "0",   //下行平均运行时长
                    "upAverageSpeed": "0",       //上行平均运行速度
                    "downAverageSpeed": "0",     //下行平均运行速度
                },
                sTime: '2018-2-22 08:40:00',
//                timeOut: null,
                setTimeOutInfoPanelData: null,
                timeOutPassenger: null,

                trainPositionData: [],         // 动车位置数据
                upTrainNum: 0,                 // 上行动车数量
                downTrainNum: 0,　　　　　　　　 // 下行动车数量

                todayTotalInPassenger: 0,
                todayTotalOutPassenger: 0,

                // 舆情
                yqData: {
                    all: 0,
                    positive: 0,   //正面
                    neutral: 0,    // 中立
                    negative: 0    // 负面
                },
                yq_all: 0,        // 总数
                p_positive: 0,    //正面 百分比
                p_neutral: 0,     // 中立  百分比
                p_negative: 0,     // 负面  百分比

                clsName1: 'bar-0',
                clsName2: 'bar-0',
                clsName3: 'bar-0',
            }
        },
        watch: {
            trainPositionData(val) {

                var up = 0;
                var down = 0;
                val.forEach(function (val) {
                    if (val.direction == '0') {
                        ++up;
                    }
                    if (val.direction == '1') {
                        ++down;
                    }
                });
                this.upTrainNum = up;
                this.downTrainNum = down;
            }
        },
        beforeDestroy() {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }

            if (this.setTimeOutInfoPanelData) {
                clearTimeout(this.setTimeOutInfoPanelData);
            }

            if (this.timeOutPassenger) {
                clearTimeout(this.timeOutPassenger);
            }
        },
        mounted() {
            this.getTrainPosition();
            this.getRunMonitorInfo();
            this.getTodayTotalPassenger();
            this.getTodayYQData();
        },
        methods: {
            // 用于计算上行列车数和下行列车数量
            getTrainPosition() {
                var that = this;
                var d = MOMENT(this.sTime).add(30, 'seconds');

                this.sTime = d.format('YYYY-MM-DD hh:mm:ss');

                Util.ajax({
                    method: "get",
                    url: '/xm/run/getTrainPosition',
                    params: {
                        time: that.sTime
                    }
                }).then(function (response) {

                    if (response.status == 1) {
                        that.trainPositionData = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }

                    that.timeOut = setTimeout(function () {
                        that.getTrainPosition();
                    }, 5000);
                }).catch(function (err) {
                    console.dir(err);

                    that.timeOut = setTimeout(function () {
                        that.getTrainPosition();
                    }, 5000);
                });
            },

            getRunMonitorInfo() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/runCount/getRunCount',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.datas = response.result;
                    }
                    else {}

                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getRunMonitorInfo();
                    }, 30000);
                }).catch(function (error) {
                    console.log(error);
                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getRunMonitorInfo();
                    }, 30000);
                })
            },

            getTodayTotalPassenger() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/show/passengerShow/getTodayTotalPassenger'
                }).then(function(response){
                    if (response.status === 1) {
                        that.todayTotalInPassenger = response.result.todayTotalInPassenger || 0;
                        that.todayTotalOutPassenger = response.result.todayTotalOutPassenger || 0;
                    }
                    else {}

                    that.timeOutPassenger = setTimeout(function () {
                        that.getTodayTotalPassenger();
                    }, 30000);
                }).catch(function (error) {
                    console.log(error);
                    that.timeOutPassenger = setTimeout(function () {
                        that.getTodayTotalPassenger();
                    }, 30000);
                })
            },

            getTodayYQData() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/pub/pubOpinionInfo/pubOpinionDetailAnalysis',
                    params: {
                        beginDate: MOMENT().format('YYYY-MM-DD'),
                        endDate: MOMENT().format('YYYY-MM-DD')
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        console.dir(response.result);
                        that.setYqData(response.result);
                    }
                    else {}

                }).catch(function (error) {
                    console.log(error);
                })
            },

            setYqData(result) {
                var that = this;

                this.yq_all = result.all;

                this.p_positive = ((result.positive / result.all) * 100).toFixed(1);
                this.p_neutral = ((result.neutral / result.all) * 100).toFixed(1);
                this.p_negative = ((result.negative / result.all) * 100).toFixed(1);

                if (this.p_positive > 95) { this.clsName1 = 'bar-100'; }
                else if (this.p_positive > 90) { this.clsName1 = 'bar-95'; }
                else if (this.p_positive > 85) { this.clsName1 = 'bar-90'; }
                else if (this.p_positive > 80) { this.clsName1 = 'bar-85'; }
                else if (this.p_positive > 75) { this.clsName1 = 'bar-80'; }
                else if (this.p_positive > 70) { this.clsName1 = 'bar-75'; }
                else if (this.p_positive > 65) { this.clsName1 = 'bar-70'; }
                else if (this.p_positive > 60) { this.clsName1 = 'bar-65'; }
                else if (this.p_positive > 55) { this.clsName1 = 'bar-60'; }
                else if (this.p_positive > 50) { this.clsName1 = 'bar-55'; }
                else if (this.p_positive > 45) { this.clsName1 = 'bar-50'; }
                else if (this.p_positive > 40) { this.clsName1 = 'bar-45'; }
                else if (this.p_positive > 35) { this.clsName1 = 'bar-40'; }
                else if (this.p_positive > 30) { this.clsName1 = 'bar-35'; }
                else if (this.p_positive > 25) { this.clsName1 = 'bar-30'; }
                else if (this.p_positive > 20) { this.clsName1 = 'bar-25'; }
                else if (this.p_positive > 15) { this.clsName1 = 'bar-20'; }
                else if (this.p_positive > 10) { this.clsName1 = 'bar-15'; }
                else if (this.p_positive > 5) { this.clsName1 = 'bar-10'; }
                else if (this.p_positive > 0) { this.clsName1 = 'bar-5'; }
                else { this.clsName1 = 'bar-0'; }

                if (this.p_neutral > 95) { this.clsName3 = 'bar-100'; }
                else if (this.p_neutral > 90) { this.clsName3 = 'bar-95'; }
                else if (this.p_neutral > 85) { this.clsName3 = 'bar-90'; }
                else if (this.p_neutral > 80) { this.clsName3 = 'bar-85'; }
                else if (this.p_neutral > 75) { this.clsName3 = 'bar-80'; }
                else if (this.p_neutral > 70) { this.clsName3 = 'bar-75'; }
                else if (this.p_neutral > 65) { this.clsName3 = 'bar-70'; }
                else if (this.p_neutral > 60) { this.clsName3 = 'bar-65'; }
                else if (this.p_neutral > 55) { this.clsName3 = 'bar-60'; }
                else if (this.p_neutral > 50) { this.clsName3 = 'bar-55'; }
                else if (this.p_neutral > 45) { this.clsName3 = 'bar-50'; }
                else if (this.p_neutral > 40) { this.clsName3 = 'bar-45'; }
                else if (this.p_neutral > 35) { this.clsName3 = 'bar-40'; }
                else if (this.p_neutral > 30) { this.clsName3 = 'bar-35'; }
                else if (this.p_neutral > 25) { this.clsName3 = 'bar-30'; }
                else if (this.p_neutral > 20) { this.clsName3 = 'bar-25'; }
                else if (this.p_neutral > 15) { this.clsName3 = 'bar-20'; }
                else if (this.p_neutral > 10) { this.clsName3 = 'bar-15'; }
                else if (this.p_neutral > 5) { this.clsName3 = 'bar-10'; }
                else if (this.p_neutral > 0) { this.clsName3 = 'bar-5'; }
                else { this.clsName3 = 'bar-0'; }

                if (this.p_negative > 95) { this.clsName2 = 'bar-100'; }
                else if (this.p_negative > 90) { this.clsName2 = 'bar-95'; }
                else if (this.p_negative > 85) { this.clsName2 = 'bar-90'; }
                else if (this.p_negative > 80) { this.clsName2 = 'bar-85'; }
                else if (this.p_negative > 75) { this.clsName2 = 'bar-80'; }
                else if (this.p_negative > 70) { this.clsName2 = 'bar-75'; }
                else if (this.p_negative > 65) { this.clsName2 = 'bar-70'; }
                else if (this.p_negative > 60) { this.clsName2 = 'bar-65'; }
                else if (this.p_negative > 55) { this.clsName2 = 'bar-60'; }
                else if (this.p_negative > 50) { this.clsName2 = 'bar-55'; }
                else if (this.p_negative > 45) { this.clsName2 = 'bar-50'; }
                else if (this.p_negative > 40) { this.clsName2 = 'bar-45'; }
                else if (this.p_negative > 35) { this.clsName2 = 'bar-40'; }
                else if (this.p_negative > 30) { this.clsName2 = 'bar-35'; }
                else if (this.p_negative > 25) { this.clsName2 = 'bar-30'; }
                else if (this.p_negative > 20) { this.clsName2 = 'bar-25'; }
                else if (this.p_negative > 15) { this.clsName2 = 'bar-20'; }
                else if (this.p_negative > 10) { this.clsName2 = 'bar-15'; }
                else if (this.p_negative > 5) { this.clsName2 = 'bar-10'; }
                else if (this.p_negative > 0) { this.clsName2 = 'bar-5'; }
                else { this.clsName2 = 'bar-0'; }
            }
        }
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
                width: 100%;
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
                    margin-right: 15px;
                    flex: 1;
                    text-align: right;
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

            .prob {
                position: absolute;
                font-size: 12px;
                text-align: right;

                &.prob1 {
                    top: 132px;
                    left: 15px;
                }
                &.prob2 {
                    top: 83px;
                    left: 23px;
                }
                &.prob3 {
                    top: 215px;
                    left: 270px;
                    text-align: left;

                }
            }

            .circle {
                position: absolute;
                top: 0;
                left: 0;
                width: 255px;
                height: 255px;

                &.circle-box {
                    top: 13px;
                    left: 55px;

                    &:after {
                        position: absolute;
                        top: 77px;
                        left: 22px;
                        display: block;
                        content: " ";
                        width: 179px;
                        height: 141px;
                        background: url("./images/eline.png") no-repeat center;
                    }

                    .sum {
                        position: absolute;
                        top: 102px;
                        left: 0;
                        width: 255px;
                        color: #FFFFFF;
                        text-align: center;

                        .title {
                            font-size: 16px;
                            line-height: 32px;
                        }
                        .num {
                            font-size: 12px;
                        }
                    }
                }

                .circle3 {
                    transform:rotate(-90deg);
                    transform-origin: 50%;
                    background: url('./images/circle-green-bg.png') no-repeat center;

                    &:after {
                        position: absolute;
                        top: 0;
                        left:0;
                        display: block;
                        content: " ";
                        width: 255px;
                        height: 255px;
                    }
                    &.bar-5:after { background: url('./images/c_green_3/5.png') no-repeat center; }
                    &.bar-10:after { background: url('./images/c_green_3/10.png') no-repeat center; }
                    &.bar-15:after { background: url('./images/c_green_3/15.png') no-repeat center; }
                    &.bar-20:after { background: url('./images/c_green_3/20.png') no-repeat center; }
                    &.bar-25:after { background: url('./images/c_green_3/25.png') no-repeat center; }
                    &.bar-30:after { background: url('./images/c_green_3/30.png') no-repeat center; }
                    &.bar-35:after { background: url('./images/c_green_3/35.png') no-repeat center; }
                    &.bar-40:after { background: url('./images/c_green_3/40.png') no-repeat center; }
                    &.bar-45:after { background: url('./images/c_green_3/45.png') no-repeat center; }
                    &.bar-50:after { background: url('./images/c_green_3/50.png') no-repeat center; }
                    &.bar-55:after { background: url('./images/c_green_3/55.png') no-repeat center; }
                    &.bar-60:after { background: url('./images/c_green_3/60.png') no-repeat center; }
                    &.bar-65:after { background: url('./images/c_green_3/65.png') no-repeat center; }
                    &.bar-70:after { background: url('./images/c_green_3/70.png') no-repeat center; }
                    &.bar-75:after { background: url('./images/c_green_3/75.png') no-repeat center; }
                    &.bar-80:after { background: url('./images/c_green_3/80.png') no-repeat center; }
                    &.bar-85:after { background: url('./images/c_green_3/85.png') no-repeat center; }
                    &.bar-90:after { background: url('./images/c_green_3/90.png') no-repeat center; }
                    &.bar-95:after { background: url('./images/c_green_3/95.png') no-repeat center; }
                    &.bar-100:after { background: url('./images/c_green_3/100.png') no-repeat center; }

                    .circle2 {
                        background: url('./images/circle-orange-bg.png') no-repeat center; ;

                        &:after {
                            position: absolute;
                            top: 0;
                            left:0;
                            display: block;
                            content: " ";
                            width: 255px;
                            height: 255px;
                        }
                        &.bar-5:after { background: url('./images/c_orange_2/5.png') no-repeat center; }
                        &.bar-10:after { background: url('./images/c_orange_2/10.png') no-repeat center; }
                        &.bar-15:after { background: url('./images/c_orange_2/15.png') no-repeat center; }
                        &.bar-20:after { background: url('./images/c_orange_2/20.png') no-repeat center; }
                        &.bar-25:after { background: url('./images/c_orange_2/25.png') no-repeat center; }
                        &.bar-30:after { background: url('./images/c_orange_2/30.png') no-repeat center; }
                        &.bar-35:after { background: url('./images/c_orange_2/40.png') no-repeat center; }
                        &.bar-45:after { background: url('./images/c_orange_2/45.png') no-repeat center; }
                        &.bar-50:after { background: url('./images/c_orange_2/50.png') no-repeat center; }
                        &.bar-55:after { background: url('./images/c_orange_2/55.png') no-repeat center; }
                        &.bar-60:after { background: url('./images/c_orange_2/60.png') no-repeat center; }
                        &.bar-65:after { background: url('./images/c_orange_2/65.png') no-repeat center; }
                        &.bar-70:after { background: url('./images/c_orange_2/70.png') no-repeat center; }
                        &.bar-75:after { background: url('./images/c_orange_2/75.png') no-repeat center; }
                        &.bar-80:after { background: url('./images/c_orange_2/80.png') no-repeat center; }
                        &.bar-85:after { background: url('./images/c_orange_2/85.png') no-repeat center; }
                        &.bar-90:after { background: url('./images/c_orange_2/90.png') no-repeat center; }
                        &.bar-95:after { background: url('./images/c_orange_2/95.png') no-repeat center; }
                        &.bar-100:after { background: url('./images/c_orange_2/100.png') no-repeat center; }

                        .circle1 {
                            background: url('./images/circle-blue-bg.png') no-repeat center; ;

                            &:after {
                                position: absolute;
                                top: 0;
                                left:0;
                                display: block;
                                content: " ";
                                width: 255px;
                                height: 255px;
                            }
                            &.bar-5:after { background: url('./images/c_blue_1/5.png') no-repeat center; }
                            &.bar-10:after { background: url('./images/c_blue_1/10.png') no-repeat center; }
                            &.bar-15:after { background: url('./images/c_blue_1/15.png') no-repeat center; }
                            &.bar-20:after { background: url('./images/c_blue_1/20.png') no-repeat center; }
                            &.bar-25:after { background: url('./images/c_blue_1/25.png') no-repeat center; }
                            &.bar-30:after { background: url('./images/c_blue_1/30.png') no-repeat center; }
                            &.bar-35:after { background: url('./images/c_blue_1/40.png') no-repeat center; }
                            &.bar-45:after { background: url('./images/c_blue_1/45.png') no-repeat center; }
                            &.bar-50:after { background: url('./images/c_blue_1/50.png') no-repeat center; }
                            &.bar-55:after { background: url('./images/c_blue_1/55.png') no-repeat center; }
                            &.bar-60:after { background: url('./images/c_blue_1/60.png') no-repeat center; }
                            &.bar-65:after { background: url('./images/c_blue_1/65.png') no-repeat center; }
                            &.bar-70:after { background: url('./images/c_blue_1/70.png') no-repeat center; }
                            &.bar-75:after { background: url('./images/c_blue_1/75.png') no-repeat center; }
                            &.bar-80:after { background: url('./images/c_blue_1/80.png') no-repeat center; }
                            &.bar-85:after { background: url('./images/c_blue_1/85.png') no-repeat center; }
                            &.bar-90:after { background: url('./images/c_blue_1/90.png') no-repeat center; }
                            &.bar-95:after { background: url('./images/c_blue_1/95.png') no-repeat center; }
                            &.bar-100:after { background: url('./images/c_blue_1/100.png') no-repeat center; }
                        }
                    }
                }

            }
        }
    }
</style>