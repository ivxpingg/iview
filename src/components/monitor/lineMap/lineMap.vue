<template>
    <div class="container">
        <div class="up-line"></div>
        <div class="down-line"></div>

        <div class="station-out station-24">岩内</div>
        <div class="station-out station-1">镇海路</div>
        <div ref="downBox" class="down-station-box sxc-flex">
            <div class="station sxc-flex__item">
                <div class="name">岩内</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">厦门北站</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">天水路</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美大道</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美软件园</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">诚毅广场</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">官任</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">杏锦路</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">杏林村</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">园博苑</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">集美学村</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">高崎</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">殿前</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">火炬园</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">塘边</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">乌石浦</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">吕厝</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">莲花路口</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">莲坂</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">湖滨东路</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">文灶</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">将军祠</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">中山公园</div>
                <div class="circle"></div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">镇海路</div>
            </div>

            <!--<div class="train train-down" style="left: 25%;"></div>-->
            <!--<div class="train train-down" style="left: 52.083325%;"></div>-->
        </div>
        <div ref="upBox" class="up-station-box sxc-flex">

            <div class="train train-up" style="left: 8.3333%;"></div>

            <div class="station sxc-flex__item">
                <div class="name">岩内</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">厦门北站</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">天水路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">集美大道</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">集美软件园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">诚毅广场</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">官任</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">杏锦路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">杏林村</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">园博苑</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">集美学村</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">高崎</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">殿前</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">火炬园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">塘边</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">乌石浦</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">吕厝</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">莲花路口</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">莲坂</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">湖滨东路</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">文灶</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">将军祠</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="circle"></div>
                <div class="name">中山公园</div>
            </div>
            <div class="station sxc-flex__item">
                <div class="name">镇海路</div>
            </div>
        </div>

    </div>
</template>

<script>
    import Util from '../../../libs/util.js';
    import lineData from '../../subwayLines/js/baseData';
    export default {
        data () {
            return {
                trainLeftRatio: 2.083333,   // 列车距离
                trainPosition: { },
                test_d: '2017-12-20 08:20:00',

                o_dom_list: {},  // 存放当前页面上实时列车元素对象 { '00101': dom }
                // 存放从后台获取的最新列车位置信息。
                train_list: {}
            }
        },
        mounted() {

//             console.dir(lineData);
            this.getData();
        },
        methods: {
            getData() {
                var that = this;

                var sTime = this.test_d;

                var d = new Date(sTime);
                d = new Date(d.getTime() + 30000);

                var Y = d.getFullYear();
                var M = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
                var D =  d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

                var h = d.getHours() < 9 ? '0' + d.getHours()  : d.getHours();
                var m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
                var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

                this.test_d = Y + '-' + M + '-' + D + ' '
                    + h + ':' + m + ':' + s;

                Util.ajax({
                    method: "get",
                    url: '/xm/run/getTrainPosition',
                    params: {
                        time: sTime
                    }
                }).then(function (response) {

                    if (response.status == 1) {
                        // train_list = response.result;
                        that.refresh_train_position(response.result);
                    }
                    else {
                        console.dir(response.errMsg);
                    }

                    setTimeout(function () {
                        that.getData();
                    }, 5000);
                }).catch(function (err) {
                    console.dir(err);

                    setTimeout(function () {
                        that.getData();
                    }, 1000);
                });
            },
            refresh_train_position(new_train_list) {

                this.train_remove_nonexits(new_train_list);
                this.train_update_exist(new_train_list);
            },
            train_remove_nonexits(new_train_list) {
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
                        var element = o_zr_list[val];
//                        zr_element_list.forEach(function (key) {
////                            zr.remove(o_zr_list[val][key]);
//
//                        });
                        element.parentNode.removeChild(element);

                        delete o_zr_list[val];
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

                var that = this;
                var dom = o_element;

                var passStation = false; // 是否经过了站点
                var left = 0;

                if (o_data.direction == '0') {

                    for(var i = 0; i < lineData.up_line.length; i++) {

                        if(o_data.stationId != lineData.up_line[i].station_Id) {
                            passStation = false;
                        }

                        if (lineData.up_line[i].section_name == o_data.sectionName) {
                            if (o_data.arriveFlag == '1') {  // 到站
                                left = (24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio;
                            }
                            else if (!passStation && lineData.up_line[i].is_station) {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) + that.trainLeftRatio;
                            }
                            else {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                            }

                            break;
                        }

                        if( o_data.stationId == lineData.up_line[i].station_Id && lineData.up_line[i].is_station) {
                            passStation = true;
                        }
                    }

                    dom.style.left = left + '%';
                }
                else {

                    for(var i = 0; i < lineData.down_line.length; i++) {

                        if(o_data.stationId != lineData.up_line[i].station_Id) {
                            passStation = false;
                        }

                        if (lineData.down_line[i].section_name == o_data.sectionName) {
                            if (o_data.arriveFlag == '1') {  // 到站
                                left = (24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio;
                            }
                            else if (passStation && lineData.down_line[i].is_station) {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) + that.trainLeftRatio;
                            }
                            else if(!passStation && lineData.down_line[i].is_station) {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                            }
                            else {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                            }

                            break;
                        }

                        if( o_data.stationId == lineData.down_line[i].station_Id && lineData.down_line[i].is_station) {
                            passStation = true;
                        }
                    }

                    dom.style.left = left + '%';
                }
            },
            train_add(o_data) {
                var that = this;
                var dom = document.createElement('div');

                var passStation = false; // 是否经过了站点

                var left = 0;

                if (o_data.direction == '0') {
                    dom.className = 'train train-up';

                    for(var i = 0; i < lineData.up_line.length; i++) {

                        if(o_data.stationId != lineData.up_line[i].station_Id) {
                            passStation = false;
                        }

                        if (lineData.up_line[i].section_name == o_data.sectionName) {
                            if (o_data.arriveFlag == '1') {  // 到站
                                left = (24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio;
                            }
                            else if (passStation) {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                            }
                            else {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) + that.trainLeftRatio;
                            }

                            break;
                        }

                        if( o_data.stationId == lineData.up_line[i].station_Id && lineData.up_line[i].is_station) {
                            passStation = true;
                        }
                    }

                    dom.style.left = left + '%';
                    this.$refs.upBox.appendChild(dom);
                }
                else {
                    dom.className = 'train train-down';

                    for(var i = 0; i < lineData.down_line.length; i++) {

                        if(o_data.stationId != lineData.up_line[i].station_Id) {
                            passStation = false;
                        }

                        if (lineData.down_line[i].section_name == o_data.sectionName) {
                            if (o_data.arriveFlag == '1') {  // 到站
                                left = (24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio;
                            }
                            else if (!passStation && lineData.down_line[i].is_station) {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) + that.trainLeftRatio;
                            }
                            else {
                                left = ((24 - parseInt(o_data.stationId)) * 2 * that.trainLeftRatio) - that.trainLeftRatio;
                            }

                            break;
                        }

                        if( o_data.stationId == lineData.down_line[i].station_Id && lineData.down_line[i].is_station) {
                            passStation = true;
                        }
                    }

                    dom.style.left = left + '%';
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

    $train_width: 20px;
    $train_height: 20px;

    .container {
        position: relative;
        overflow: hidden;
        .up-line {
            position: absolute;
            top: 141px;
            left: 100px;
            right: 100px;
            height: 1px;
            background-color: #333;
        }
        .down-line {
            position: absolute;
            bottom: 141px;
            left: 100px;
            right: 100px;
            height: 1px;
            background-color: #333;
        }

        .station-out {
            position: absolute;
            font-size: 24px;
            line-height: 32px;
            width: 30px;
            text-align: center;


            &.station-24 {
                top: 168px;
                left: 100px;
            }
            &.station-1 {
                top: 152px;
                right: 100px;
            }
        }

        .up-station-box{
            box-sizing: border-box;
            position: relative;
            margin: 0 100px;
            background-color: transparent;
            height: 200px;
            /*border: 1px solid #666;*/
            z-index: 1;

            .station {
                margin-top: 50px;
                position: relative;
                overflow: hidden;
                .circle {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -($station_circle_size / 2) ;
                    width: $station_circle_size;
                    height: $station_circle_size;
                    background-color: #fff;
                    border: 2px solid #3c3c3c;
                    border-radius: 50%;
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

        .down-station-box{
            box-sizing: border-box;
            position: relative;
            margin: 0 100px;
            background-color: transparent;
            height: 200px;
            z-index: 1;

            .station {
                position: relative;
                bottom: 50px;
                overflow: hidden;
                .circle {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -($station_circle_size / 2);
                    width: $station_circle_size;
                    height: $station_circle_size;
                    background-color: #fff;
                    border: 2px solid #3c3c3c;
                    border-radius: 50%;
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
<style>
    /*.train {*/
        /*position: absolute;*/
        /*width: $train_width;*/
        /*height: $train_height;*/
        /*background-repeat: no-repeat;*/
        /*background-size: 100%;*/
        /*z-index: 2;*/
        /*transition: left 2s ease-in-out 0s;*/
    /*&.train-down{*/
         /*bottom: 25px;*/
         /*margin-left: -($train_width / 2);*/
         /*background-image: url(./images/car-down-small.png);*/
     /*}*/

    /*&.train-up{*/
         /*top: 25px;*/
         /*margin-left: -($train_width / 2);*/
         /*background-image: url(./images/car-up-small.png);*/
     /*}*/
    /*}*/
    .train {
        position: absolute;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100%;
        z-index: 2;
        transition: left 2s ease-in-out 0s;

    }

    .train.train-down{
         bottom: 25px;
         margin-left: -10px;
         background-image: url(./images/car-down-small.png);
     }

    .train.train-up{
         top: 25px;
         margin-left: -10px;
         background-image: url(./images/car-up-small.png);
     }
</style>