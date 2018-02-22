<template>
    <div class="rankPanel-container">
        <div class="station station1">
            <div class="station-name"><span class="station-name-inner">{{stationName1}}</span></div>
            <div class="in-box" :class="[inClsName1]">
                <span>{{topThreeStationList["0"]["0"]}}</span>
            </div>
            <div class="out-box" :class="[outClsName1]">
                <span>{{topThreeStationList["0"]["1"]}}</span>
            </div>
        </div>
        <div class="station station2">
            <div class="station-name"><span class="station-name-inner">{{stationName2}}</span></div>
            <div class="in-box" :class="[inClsName2]">
                <span>{{topThreeStationList["1"]["0"]}}</span>
            </div>
            <div class="out-box" :class="[outClsName2]">
                <span>{{topThreeStationList["1"]["1"]}}</span>
            </div>
        </div>
        <div class="station station3">
            <div class="station-name"><span class="station-name-inner">{{stationName3}}</span></div>
            <div class="in-box" :class="[inClsName3]">
                <span>{{topThreeStationList["2"]["0"]}}</span>
            </div>
            <div class="out-box" :class="[outClsName3]">
                <span>{{topThreeStationList["2"]["1"]}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    import baseData from '../../subwayLines/js/baseData';
    export default {
        data() {
            return {
                maxNum: 20000,          // 设置进出站客流量最大值为2万人次

                stationName1: '',
                inClsName1: 'bar-0',
                outClsName1: 'bar-0',

                stationName2: '',
                inClsName2: 'bar-0',
                outClsName2: 'bar-0',

                stationName3: '',
                inClsName3: 'bar-0',
                outClsName3: 'bar-0',

                timeOut: null,

                topThreeStationList: {
                    "0": {
                        "0": 0,
                        "1": 0,
                        stationId: ''
                    },
                    "1": {
                        "0": 0,
                        "1": 0,
                        stationId: ''
                    },
                    "2": {
                        "0": 0,
                        "1": 0,
                        stationId: ''
                    }
                }
            }
        },
        watch: {
            topThreeStationList: {
                handler(val) {
                    this.inClsName1 = this.clsName(val[0]["0"]);
                    this.outClsName1 = this.clsName(val[0]["1"]);
                    this.stationName1 = val[0].stationId != '' ?  baseData.station_info[val[0].stationId].name : '';

                    this.inClsName2 = this.clsName(val[1]["0"]);
                    this.outClsName2 = this.clsName(val[1]["1"]);
                    this.stationName2 = val[1].stationId != '' ?  baseData.station_info[val[1].stationId].name : '';

                    this.inClsName3 = this.clsName(val[2]["0"]);
                    this.outClsName3 = this.clsName(val[2]["1"]);
                    this.stationName3 = val[2].stationId != '' ?  baseData.station_info[val[2].stationId].name : '';
                },
                deep: true
            }
        },
        computed: {},
        beforeDestroy() {
            if (this.setTimeOutInfoPanelData) {
                clearTimeout(this.setTimeOutInfoPanelData);
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            clsName(val) {
                var claName = '';

                var v = (val / this.maxNum) * 100;

                if (v > 95) { claName = 'bar-100'; }
                else if (v > 90) { claName = 'bar-95'; }
                else if (v > 85) { claName = 'bar-90'; }
                else if (v > 80) { claName = 'bar-85'; }
                else if (v > 75) { claName = 'bar-80'; }
                else if (v > 70) { claName = 'bar-75'; }
                else if (v > 65) { claName = 'bar-70'; }
                else if (v > 60) { claName = 'bar-65'; }
                else if (v > 55) { claName = 'bar-60'; }
                else if (v > 50) { claName = 'bar-55'; }
                else if (v > 45) { claName = 'bar-50'; }
                else if (v > 40) { claName = 'bar-45'; }
                else if (v > 35) { claName = 'bar-40'; }
                else if (v > 30) { claName = 'bar-35'; }
                else if (v > 25) { claName = 'bar-30'; }
                else if (v > 20) { claName = 'bar-25'; }
                else if (v > 15) { claName = 'bar-20'; }
                else if (v > 10) { claName = 'bar-15'; }
                else if (v > 5) { claName = 'bar-10'; }
                else if (v > 0) { claName = 'bar-5'; }
                else { claName = 'bar-0'; }

                return claName;
            },

            getData() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/show/passengerShow/getTopThreeStation',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {

                        if (response.result.topThreeStationList.length == 0) {
                            that.topThreeStationList[0]["0"] = 0;
                            that.topThreeStationList[0]["1"] = 0;
                            that.topThreeStationList[0]["stationId"] = '';

                            that.topThreeStationList[1]["0"] = 0;
                            that.topThreeStationList[1]["1"] = 0;
                            that.topThreeStationList[1]["stationId"] = '';

                            that.topThreeStationList[2]["0"] = 0;
                            that.topThreeStationList[2]["1"] = 0;
                            that.topThreeStationList[2]["stationId"] = '';
                        }
                        else {
                            that.topThreeStationList = response.result.topThreeStationList;
                        }
                    }
                    else {}

                    that.timeOut = setTimeout(function () {
                        that.getData();
                    }, 30000);
                }).catch(function (error) {
                    console.log(error);
                    that.timeOut = setTimeout(function () {
                        that.getData();
                    }, 30000);
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
    .rankPanel-container {
        width: 389px;
        height: 467px;
        background: url("./images/rank-panel.png");
        user-select: none;
        .station {
            position: absolute;
            left: 0;
            width: 100%;
            height: 120px;
            color: #FFFFFF;
            overflow: hidden;
            &.station1 {
                top: 40px;
            }
            &.station2 {
                top: 182px;
            }
            &.station3 {
                top: 324px;
            }

            .station-name {
                position: absolute;
                top: 0px;
                left: 88px;
                display: table;
                width: 20px;
                height: 100px;
                font-size: 16px;
                line-height: 18px;

                .station-name-inner {
                    display: table-cell;
                    vertical-align:middle;
                    text-align:center;
                }
            }
        }

        .in-box, .out-box {
            position: absolute;
            top: -15px;
            left: 110px;
            width: 160px;
            height: 160px;
            text-align: center;
            font-size: 20px;
            background: url('./images/circle-gray.png') no-repeat center;


            & > span {
                line-height: 160px;
            }
        }
        .in-box {
            &:after {
                position: absolute;
                top: 0;
                left:0;
                display: block;
                content: " ";
                width: 160px;
                height: 160px;
            }

            &.bar-5:after { background: url('./images/c_orange/5.png') no-repeat center; }
            &.bar-10:after { background: url('./images/c_orange/10.png') no-repeat center; }
            &.bar-15:after { background: url('./images/c_orange/15.png') no-repeat center; }
            &.bar-20:after { background: url('./images/c_orange/20.png') no-repeat center; }
            &.bar-25:after { background: url('./images/c_orange/25.png') no-repeat center; }
            &.bar-30:after { background: url('./images/c_orange/30.png') no-repeat center; }
            &.bar-35:after { background: url('./images/c_orange/35.png') no-repeat center; }
            &.bar-40:after { background: url('./images/c_orange/40.png') no-repeat center; }
            &.bar-45:after { background: url('./images/c_orange/45.png') no-repeat center; }
            &.bar-50:after { background: url('./images/c_orange/50.png') no-repeat center; }
            &.bar-55:after { background: url('./images/c_orange/55.png') no-repeat center; }
            &.bar-60:after { background: url('./images/c_orange/60.png') no-repeat center; }
            &.bar-65:after { background: url('./images/c_orange/65.png') no-repeat center; }
            &.bar-70:after { background: url('./images/c_orange/70.png') no-repeat center; }
            &.bar-75:after { background: url('./images/c_orange/75.png') no-repeat center; }
            &.bar-80:after { background: url('./images/c_orange/80.png') no-repeat center; }
            &.bar-85:after { background: url('./images/c_orange/85.png') no-repeat center; }
            &.bar-90:after { background: url('./images/c_orange/90.png') no-repeat center; }
            &.bar-95:after { background: url('./images/c_orange/95.png') no-repeat center; }
            &.bar-100:after { background: url('./images/c_orange/100.png') no-repeat center; }

        }
        .out-box {
            left: 224px;
            &:after {
                position: absolute;
                top: 0;
                left:0;
                display: block;
                content: " ";
                width: 160px;
                height: 160px;
            }

            &.bar-5:after { background: url('./images/c_blue/5.png') no-repeat center; }
            &.bar-10:after { background: url('./images/c_blue/10.png') no-repeat center; }
            &.bar-15:after { background: url('./images/c_blue/15.png') no-repeat center; }
            &.bar-20:after { background: url('./images/c_blue/20.png') no-repeat center; }
            &.bar-25:after { background: url('./images/c_blue/25.png') no-repeat center; }
            &.bar-30:after { background: url('./images/c_blue/30.png') no-repeat center; }
            &.bar-35:after { background: url('./images/c_blue/35.png') no-repeat center; }
            &.bar-40:after { background: url('./images/c_blue/40.png') no-repeat center; }
            &.bar-45:after { background: url('./images/c_blue/45.png') no-repeat center; }
            &.bar-50:after { background: url('./images/c_blue/50.png') no-repeat center; }
            &.bar-55:after { background: url('./images/c_blue/55.png') no-repeat center; }
            &.bar-60:after { background: url('./images/c_blue/60.png') no-repeat center; }
            &.bar-65:after { background: url('./images/c_blue/65.png') no-repeat center; }
            &.bar-70:after { background: url('./images/c_blue/70.png') no-repeat center; }
            &.bar-75:after { background: url('./images/c_blue/75.png') no-repeat center; }
            &.bar-80:after { background: url('./images/c_blue/80.png') no-repeat center; }
            &.bar-85:after { background: url('./images/c_blue/85.png') no-repeat center; }
            &.bar-90:after { background: url('./images/c_blue/90.png') no-repeat center; }
            &.bar-95:after { background: url('./images/c_blue/95.png') no-repeat center; }
            &.bar-100:after { background: url('./images/c_blue/100.png') no-repeat center; }
        }
    }
</style>