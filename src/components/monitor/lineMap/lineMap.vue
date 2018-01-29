<template>
    <div class="container">
        <div class="up-line"></div>
        <div class="down-line"></div>

        <div class="station-out station-24">岩内</div>
        <div class="station-out station-1">镇海路</div>
        <div ref="upBox" class="up-station-box sxc-flex">


            <div class="station sxc-flex__item" style="opacity: 0;">
                <!--<div class="name">镇海路</div>-->
                <div class="circle"></div>
                <div class="circle2 circle-up-1"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">中山公园</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-2"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">将军祠</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-3"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">文灶</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-4"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">湖滨东路</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-5"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">莲坂</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-6"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">莲花路口</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-7"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">吕厝</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-8"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">乌石浦</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-9"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">塘边</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-10"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">火炬园</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-11"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">殿前</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-12"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">高崎</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-13"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美学村</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-14"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">园博苑</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-15"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">杏林村</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-16"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">杏锦路</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-17"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">官任</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-18"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">诚毅广场</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-19"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美软件园</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-20"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美大道</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-21"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">天水路</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-22"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">厦门北站</div>
                <div class="circle"></div>
                <div class="circle2 circle-up-23"></div>
            </div>
            <div class="station sxc-flex__item" style="opacity: 0;">
                <!--<div class="name">岩内</div>-->
                <div class="circle"></div>
                <div class="circle2 circle-up-24 00101-show"></div>
            </div>



            <!--<div class="train train-up" style="left: 8.3333%;"></div>-->
            <!--<div class="train train-up" style="left: 8.3333%;"></div>-->

            <!--<div class="circle circle-up"></div>-->
        </div>
        <div ref="downBox" class="down-station-box sxc-flex">
            <!--<div class="circle circle-down"></div>-->


            <div class="station sxc-flex__item" style="opacity: 0;">
                <div class="circle"></div>
                <div class="circle2 circle-down-1"></div>
                <!--<div class="name">镇海路</div>-->
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-2"></div>
                <div class="name">中山公园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-3"></div>
                <div class="name">将军祠</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-4"></div>
                <div class="name">文灶</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-5"></div>
                <div class="name">湖滨东路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-6"></div>
                <div class="name">莲坂</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-7"></div>
                <div class="name">莲花路口</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-8"></div>
                <div class="name">吕厝</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-9"></div>
                <div class="name">乌石浦</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-10"></div>
                <div class="name">塘边</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-11"></div>
                <div class="name">火炬园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-12"></div>
                <div class="name">殿前</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-13"></div>
                <div class="name">高崎</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-14"></div>
                <div class="name">集美学村</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-15"></div>
                <div class="name">园博苑</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-16"></div>
                <div class="name">杏林村</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-17"></div>
                <div class="name">杏锦路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-18"></div>
                <div class="name">官任</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-19"></div>
                <div class="name">诚毅广场</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-20"></div>
                <div class="name">集美软件园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-21"></div>
                <div class="name">集美大道</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-22"></div>
                <div class="name">天水路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="circle2 circle-down-23"></div>
                <div class="name">厦门北站</div>
            </div>
            <div class="station sxc-flex__item"  style="opacity: 0;">
                <div class="circle"></div>
                <div class="circle2 circle-down-24"></div>
                <!--<div class="name">岩内</div>-->
            </div>
        </div>

    </div>
</template>

<script>
    import Util from '../../../libs/util.js';
    import lineData from '../../subwayLines/js/baseData';
    import MOMENT from 'moment';
    export default {
        data () {
            return {
                timeOut: null,
                prefixClassNameUp: 'circle-up-',   // 到站线路前置样式名称
                prefixClassNameDown: 'circle-down-',   // 到站线路前置样式名称
                prefixClassNameShow: 'show-',
                trainLeftRatio: 2.083333,   // 列车距离
                trainPosition: { },
                test_d: '2017-12-20 08:40:00',

                o_dom_list: {},  // 存放当前页面上实时列车元素对象 { '00101': dom }
                // 存放从后台获取的最新列车位置信息。
                train_list: {},


                upLeft: {},      // 存放上行动车的实时位置，每个区段的 到站和 站与站的中间位置
                downLeft: {},    // 存放下行动车的实时位置，每个区段的 到站和 站与站的中间位置
            }
        },
        beforeDestroy() {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
        },
        mounted() {

            this.getUpLeft();
            this.getDownLeft();
            this.getData();
        },
        methods: {
            //
            getUpLeft() {
                var that = this;
                var o = {};

                var id = '';
                var pass = false;
                var left = 0;

                lineData.up_line.forEach(function (val) {
                    var stationId = parseInt(val.station_Id);

                    if (stationId != id) {
                        id = stationId;
                        pass = false;
                    }

                    if (val.is_station) {
                        if (stationId == 1) {
                            left = 0;
                        }
                        else if (stationId == 24) {
                            left = 100 ;
                        }
                        else {
                            left = (stationId * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                        }

                    }
                    else if (pass) {
                        left = ( stationId * 2 * that.trainLeftRatio);
                    }
                    else {
                        left = (stationId * 2 * that.trainLeftRatio) - that.trainLeftRatio * 2;
                    }

                    o[val.section_name] = {
                        left: left,
                        pass: pass
                    }

                    if (val.is_station) {
                        pass = true;
                    }

                });

                this.upLeft = o;
            },
            getDownLeft() {
                var that = this;
                var o = {};

                var id = '';
                var pass = false;
                var left = 0;

                lineData.down_line.forEach(function (val) {
                    var stationId = parseInt(val.station_Id);

                    if (stationId != id) {
                        id = stationId;
                        pass = false;
                    }

                    if (val.is_station) {

                        if (stationId == 1) {
                            left = 0;
                        }
                        else if (stationId == 24) {
                            left = 100 ;
                        }
                        else {
                            left = (stationId * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                        }
                    }
                    else if (pass) {
                        left = (stationId * 2 * that.trainLeftRatio) - that.trainLeftRatio * 2;
                    }
                    else {
                        left = (stationId * 2 * that.trainLeftRatio);
                    }

                    o[val.section_name] = {
                        left: left,
                        pass: pass
                    }

                    if (val.is_station) {
                        pass = true;
                    }

                });

                this.downLeft = o;
            },
            getData() {
                var that = this;

                var sTime = that.test_d;

                var d = MOMENT(sTime).add(30, 'seconds');

                that.test_d = d.format('YYYY-MM-DD hh:mm:ss');


                Util.ajax({
                    method: "get",
                    url: '/xm/run/getTrainPosition',
                    params: {
                        time: sTime
                    }
                }).then(function (response) {

                    if (response.status == 1) {
                        that.refresh_train_position(response.result);
                    }
                    else {
                        console.dir(response.errMsg);
                    }

                    that.timeOut = setTimeout(function () {
                        that.getData();
                    }, 5000);
                }).catch(function (err) {
                    console.dir(err);

                    that.timeOut =setTimeout(function () {
                        that.getData();
                    }, 1000);
                });
            },
            refresh_train_position(new_train_list) {

                this.train_remove_nonexits(new_train_list);
                this.train_update_exist(new_train_list);
            },
            train_remove_nonexits(new_train_list) {
                var that = this;
                var list = Object.keys(this.o_dom_list);
                var exit = false;
                list.forEach(function (val) {

                    exit = false;

                    for(var i = 0; i < new_train_list.length; i++) {
                        if (new_train_list[i].trainId == val) {
                            exit = true;
                            break;
                        }
                    }

                    if(!exit) {

                        var element = that.o_dom_list[val];
                        element.parentNode.removeChild(element);

                        delete that.o_dom_list[val];
                    }
                });
            },
            train_update_exist(new_train_list) {
                var that = this;
                var list = Object.keys(this.o_dom_list);

                var train_list2 = {};

                new_train_list.forEach(function(val) {

                    train_list2[val.trainId] = val;

                    if (list.indexOf(val.trainId) >= 0) {
                        // 更新位置信息 code

                        that.train_update(val, that.train_list[val.trainId], that.o_dom_list[val.trainId]);
                    }
                    else {
                        that.train_add(val);
                    }
                });

                this.train_list = train_list2;
            },
            train_update(o_data, old_o_data, o_element) {
                var dom = o_element;
                var dom_arrive_circle;

                var dom_re = document.querySelector('.' + this.prefixClassNameShow + old_o_data.trainId);

                if (!!dom_re) {
                    var re = new RegExp('\\s' + this.prefixClassNameShow + old_o_data.trainId , 'g');
                    dom_re.className = dom_re.className.replace(re, '');
                }

                if (o_data.direction == '0') {
                    for(var i = 0; i < lineData.up_line.length; i++) {

                        if (lineData.up_line[i].section_name == o_data.sectionName) {
                            if (lineData.up_line[i].is_station) {  // 到站
                                dom_arrive_circle = document.querySelector('.' + this.prefixClassNameUp + o_data.stationId);
                                dom_arrive_circle.className += ' ' + this.prefixClassNameShow + o_data.trainId;
                            }
                        }
                    }

//                    console.log(o_data.sectionName);
//                    console.dir(this.upLeft);
//                    console.log(this.upLeft[o_data.sectionName].left);
//                    console.log(1);

                    dom.style.left =  this.upLeft[o_data.sectionName].left + '%';
                }
                else {

                    for(var i = 0; i < lineData.down_line.length; i++) {

                        if (lineData.down_line[i].section_name == o_data.sectionName) {
                            if (lineData.down_line[i].is_station) {  // 到站
                                dom_arrive_circle = document.querySelector('.' + this.prefixClassNameDown + o_data.stationId);
                                dom_arrive_circle.className += ' ' + this.prefixClassNameShow + o_data.trainId;
                            }
                        }
                    }

                    dom.style.left =  this.downLeft[o_data.sectionName].left + '%';
                }
            },
            train_add(o_data) {
                var dom = document.createElement('div');
                var dom_arrive_circle;

                if (o_data.direction == '0') {
                    dom.className = 'train train-up ';

                    for(var i = 0; i < lineData.up_line.length; i++) {

                        if (lineData.up_line[i].section_name == o_data.sectionName) {
                            if (lineData.up_line[i].is_station) {  // 到站
                                dom_arrive_circle = document.querySelector('.' + this.prefixClassNameUp + o_data.stationId);
                                dom_arrive_circle.className += ' ' + this.prefixClassNameShow + o_data.trainId;
                            }
                            break;
                        }
                    }

                    dom.style.left = this.upLeft[o_data.sectionName].left + '%';
                    this.$refs.upBox.appendChild(dom);
                }
                else {
                    dom.className = 'train train-down';

                    for(var i = 0; i < lineData.down_line.length; i++) {

                        if (lineData.down_line[i].section_name == o_data.sectionName) {

                            if (lineData.down_line[i].is_station) {  // 到站
                                dom_arrive_circle = document.querySelector('.' + this.prefixClassNameDown + o_data.stationId);
                                dom_arrive_circle.className += ' ' + this.prefixClassNameShow + o_data.stationId;
                            }
                        }
                    }

                    dom.style.left = this.downLeft[o_data.sectionName].left + '%';
                    this.$refs.downBox.appendChild(dom);
                }

                this.o_dom_list[o_data.trainId] = dom;
            }

        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    $station_name_fontSize: 14px;
    $station_name_color: #333;

    $station_circle_size: 18px;

    $station_circle2_size: 8px;

    $train_width: 20px;
    $train_height: 20px;

    .container {
        position: relative;
        overflow: hidden;
        .up-line {
            position: absolute;
            top: 119px;
            left: 66px;
            right: 66px;
            height: 4px;
            background-color: #3da088;
            border: 1px solid #f4f4f4;

            &:after {
                position: absolute;
                right: 0;
                top: 0;
                content: " ";
                display: block;
                width: 16px;
                height: 4px;
                background-color: #3da088;
                border: 1px solid #f4f4f4;
                transform-origin: 100% 50%;
                transform: rotate(35deg);
                z-index: 1;
            }
            &:before {
                position: absolute;
                right: 1px;
                top: 0;
                content: " ";
                display: block;
                width: 16px;
                height: 2px;
                background-color: #3da088;
                border: 1px solid transparent;
                z-index: 2;
            }
        }
        .down-line {
            position: absolute;
            bottom: 122px;
            left: 66px;
            right: 66px;
            height: 4px;
            background-color: #f39950;
            border: 1px solid #f4f4f4;

            &:after {
                position: absolute;
                left: 0;
                top: -2px;
                content: " ";
                display: block;
                width: 16px;
                height: 4px;
                background-color: #f39950;
                border: 1px solid #f4f4f4;
                transform-origin: 0% 50%;
                transform: rotate(35deg);
                z-index: 1;
            }
            &:before {
                position: absolute;
                left: 1px;
                top: 0;
                content: " ";
                display: block;
                width: 16px;
                height: 2px;
                background-color: #f39950;
                border: 1px solid transparent;
                z-index: 2;
            }
        }

        .station-out {
            position: absolute;
            padding: 10px 0;
            width: 50px;
            height: 160px;
            font-size: 32px;
            color: #474f5f;
            text-align: center;
            background-color: #c9cacb;
            border: 1px solid #ececec;
            border-radius: 25px;

            &.station-24 {
                top: 97px;
                right: 0px;
                line-height: 70px;
            }
            &.station-1 {
                top: 97px;
                left: 0px;
                line-height: 46px;
            }
        }

        .down-station-box{
            box-sizing: border-box;
            position: relative;
            margin: 0 66px;
            background-color: transparent;
            height: 177px;
            /*border: 1px solid #666;*/
            z-index: 1;

            .station {
                margin-top: 47px;
                position: relative;
                overflow: hidden;
                .circle {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -($station_circle_size / 2) ;
                    width: $station_circle_size;
                    height: $station_circle_size;
                    background-color: #f39950;
                    border: 3px solid #FFF;
                    border-radius: 50%;
                }
                .circle2 {
                    display: none;
                    position: absolute;
                    top: ($station_circle_size - $station_circle2_size) / 2;
                    left: 50%;
                    margin-left: -($station_circle2_size / 2);
                    width: $station_circle2_size;
                    height: $station_circle2_size;
                    background-color: #23ac38;
                    border: 1px solid #f7f7f7;
                    border-radius: 50%;

                    &[class*='show-'] {
                        display: block;
                    }
                }
                .name {
                    position: absolute;
                    top: 32px;
                    left: 50%;
                    margin-left: -8px;
                    color: $station_name_color;
                    font-size: $station_name_fontSize;
                    width: 16px;
                    line-height: 16px;
                    text-align: center;
                }
            }
        }

        .up-station-box{
            box-sizing: border-box;
            position: relative;
            margin: 0 66px;
            background-color: transparent;
            height: 177px;
            z-index: 1;

            .station {
                position: relative;
                bottom: 47px;
                overflow: hidden;
                .circle {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -($station_circle_size / 2);
                    width: $station_circle_size;
                    height: $station_circle_size;
                    background-color: #3da088;
                    border: 3px solid #FFF;
                    border-radius: 50%;
                }
                .circle2 {
                    position: absolute;
                    display: none;
                    bottom: ($station_circle_size - $station_circle2_size) / 2;
                    left: 50%;
                    margin-left: -($station_circle2_size / 2);
                    width: $station_circle2_size;
                    height: $station_circle2_size;
                    background-color: #f39700;
                    border: 1px solid #f7f7f7;
                    border-radius: 50%;

                    &[class*='show-'] {
                        display: block;
                    }
                }
                .name {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    margin-left: -8px;
                    color: $station_name_color;
                    font-size: $station_name_fontSize;
                    width: 16px;
                    line-height: 16px;
                    text-align: center;
                }
            }
        }


    }
</style>
<style lang="scss" rel="stylesheet/scss">
    .train {
        position: absolute;
        width: 33px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100%;
        z-index: 2;
        transition: left 2s ease-in-out 0s;


        &.train-up{
            bottom: 25px;
            margin-left: -16.5px;
            background-image: url(images/car-up-small.png);
        }
        &.train-down{
            top: 25px;
            margin-left: -16.5px;
            background-image: url(images/car-down-small.png);
        }

    }

    .circle-attain {
        position: absolute;
        display: none;
        width: 8px;
        height: 8px;
        border: 1px solid #f7f7f7;
        border-radius: 50%;
        z-index: 2;

        &.show {
            display: block;
        }

        &.circle-up {
            bottom: 52px;
            margin-left: -4px;
            background-color: #f39700;
        }
        &.circle-down {
            top: 52px;
            margin-left: -4px;
            background-color: #23ac38;
        }
    }

</style>