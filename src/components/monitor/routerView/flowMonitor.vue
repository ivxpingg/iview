<template>
    <div class="flowMonitor-container" style="height: 100%">
        <div class="panel-left">
            <div class="echart-top">
                <div ref="lineFlowEchart" class="line-line-flow-echart"></div>
            </div>
            <div class="echarts-title">全线客流24小时趋势图</div>

            <div class="echart-bottom">
                <div ref="stationFlowEchart" class="station-line-flow-echart"></div>
                <Select v-model="defaultSelect" class="select-station" style="width:107px">
                    <Option v-for="item in stationData" :value="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <div class="echarts-title">站点客流24小时趋势图</div>
        </div>
        <div class="panel-right">
            <div ref="barEchart" class="bar-flow-echart"></div>
            <div class="echarts-title">站点客流总量图</div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '../../../libs/util';
    export default {
        data () {
            return {
                oSetTimeOut1: null,
                oSetTimeOut2: null,
                oSetTimeOut3: null,
                setTimeOutInfoPanelDataTime: 30000,
                defaultSelect: '2',
                stationData: [
                     { name: '镇海路', id: '1' },
                     { name: '中山公园', id: '2' },
                     { name: '将军祠', id: '3' },
                     { name: '文灶', id: '4' },
                     { name: '湖滨东路', id: '5' },
                     { name: '莲坂', id: '6' },
                     { name: '莲花路口', id: '7' },
                     { name: '吕厝', id: '8' },
                     { name: '乌石浦', id: '9' },
                     { name: '塘边', id: '10' },
                     { name: '火炬园', id: '11' },
                     { name: '殿前', id: '12' },
                     { name: '高崎', id: '13' },
                     { name: '集美学村', id: '14' },
                     { name: '园博苑', id: '15' },
                     { name: '杏林村', id: '16' },
                     { name: '杏锦路', id: '17' },
                     { name: '官任', id: '18' },
                     { name: '诚毅广场', id: '19' },
                     { name: '集美软件园', id: '20' },
                     { name: '集美大道', id: '21' },
                     { name: '天水路', id: '22' },
                     { name: '厦门北', id: '23' },
                     { name: '岩内', id: '24' }
                 ],

                myChart1: null,
                myChart2: null,
                myChart3: null,

                option1: { series:
                    [
                        {
                            name:'今日进站量',
                            type:'bar',
                            data: []
                            // data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 220]
                        },
                        {
                            name:'上周同期进站量',
                            type:'bar',
                            data: []
                            // data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        },
                        {
                            name:'今日出站量',
                            type:'line',
                            data: []
                            // data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 220]
                        },
                        {
                            name:'上周同期出站量',
                            type:'line',
                            data: []
                            // data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        }
                ]},
                result1: {
                    lastWeekOutList: [],
                    lastWeekInList: [],
                    todayOutList: [],
                    todayInList: []
                },

                option2: {
                    series: [
                                {
                                    name:'今日进站量',
                                    type:'bar',
                                    data: []
                                },
                                {
                                    name:'上周同期进站量',
                                    type:'bar',
                                    data: []
                                },
                                {
                                    name:'今日出站量',
                                    type:'line',
                                    data: []
                                },
                                {
                                    name:'上周同期出站量',
                                    type:'line',
                                    data: []
                                }
                    ]
                },
                result2: {
                    lastWeekOutList: [],
                    lastWeekInList: [],
                    todayOutList: [],
                    todayInList: []
                },

                option3: {
                    series: [{data: []}, {data: []}, {data: []}]
                },
                result3: {
                    todayPassengerOutList: [],
                    todayPassengerInList: []
                }
            }
        },
        props: {},
        watch: {},
        beforeDestroy() {
            if (this.oSetTimeOut1) {
                clearTimeout(this.oSetTimeOut1);
            }

            if (this.oSetTimeOut2) {
                clearTimeout(this.oSetTimeOut1);
            }

            if (this.oSetTimeOut3) {
                clearTimeout(this.oSetTimeOut1);
            }
        },
        watch: {
            defaultSelect(val, oldVal) {
                this.getData22();
            },
            result1: {
                handler: function (val, oldVal) {
                    this.option1.series[0].data = val.todayInList;
                    this.option1.series[1].data = val.lastWeekInList;
                    this.option1.series[2].data = val.todayOutList;
                    this.option1.series[3].data = val.lastWeekOutList;
                    this.myChart1.setOption(this.option1);  // 更新图表数据
                },
                deep: true
            },
            result2: {
                handler: function (val, oldVal) {
                    this.option2.series[0].data = val.todayInList;
                    this.option2.series[1].data = val.lastWeekInList;
                    this.option2.series[2].data = val.todayOutList;
                    this.option2.series[3].data = val.lastWeekOutList;
                    this.myChart2.setOption(this.option2);  // 更新图表数据
                },
                deep: true
            },
            result3: {
                handler: function (val, oldVal) {
                    var data1 = [],
                        data2 = [],
                        data3 = [];

                    val.todayPassengerInList.forEach(function (v, idx) {
                        data1.push(val.todayPassengerOutList[idx] + val.todayPassengerInList[idx]);

                        data2.push(val.todayPassengerInList[idx]);

                        data3.push(~val.todayPassengerOutList[idx] + 1);
                    });


                    this.option3.series[0].data = data1;
                    this.option3.series[1].data = data2;
                    this.option3.series[2].data = data3;

                    this.myChart3.setOption(this.option3);  // 更新图表数据
                },
                deep: true
            }

        },
        mounted() {
            this.lineEchart();
            this.stationEchart();
            this.barEchart();

            this.getData1();
            this.getData2();
            this.getData3();
        },
        methods: {
            getData1(){
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/passengerCount/getPassengerInfoByTime',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.result1 = response.result;
                    }
                    else {}

                    that.oSetTimeOut1 = setTimeout(function () {
                        that.getData1();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    console.log(error);
                    that.oSetTimeOut1 = setTimeout(function () {
                        that.getData1();
                    }, that.setTimeOutInfoPanelDataTime);
                })
            },
            getData2(){
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/passengerCount/getPassengerInfoByTime',
                    params: {
                        stationId: that.defaultSelect
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.result2 = response.result;
                    }
                    else {}

                    that.oSetTimeOut2 = setTimeout(function () {
                        that.getData2();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    console.log(error);
                    that.oSetTimeOut2 = setTimeout(function () {
                        that.getData2();
                    }, that.setTimeOutInfoPanelDataTime);
                })
            },
            getData22(){
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/passengerCount/getPassengerInfoByTime',
                    params: {
                        stationId: that.defaultSelect
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.result2 = response.result;
                    }
                    else {}
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getData3(){
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/passengerCount/getTodayPassengerInfo',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.result3 = response.result;
                    }
                    else {}

                    that.oSetTimeOut3 = setTimeout(function () {
                        that.getData3();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    console.log(error);
                    that.oSetTimeOut3 = setTimeout(function () {
                        that.getData3();
                    }, that.setTimeOutInfoPanelDataTime);
                })
            },

            lineEchart() {
                this.myChart1 = echarts.init(this.$refs.lineFlowEchart);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: 10,
                        data:['今日进站量','上周同期进站量','今日出站量', '上周同期出站量']
                    },
                    grid: {
                        show: true,
                        top: '44',
                        left: '20',
                        right: '15',
                        bottom: '10',
                        containLabel: true,
                        backgroundColor: '#FFF',
                        borderColor: 'transparent'
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
//                        boundaryGap: false,
                        data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23', '24']

                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#ececed'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#faf9f9', '#f3f4f4']
                            }
                        }

                    },
                    series: [
                        {
                            name:'今日进站量',
                            type:'bar',
                            data: []
                        },
                        {
                            name:'上周同期进站量',
                            type:'bar',
                            data: []
                        },
                        {
                            name:'今日出站量',
                            type:'line',
                            data: []
                        },
                        {
                            name:'上周同期出站量',
                            type:'line',
                            data: []
                        }
                    ]
                };
                this.myChart1.setOption(option);
            },

            stationEchart() {
                this.myChart2 = echarts.init(this.$refs.stationFlowEchart);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: 10,
                        data:['今日进站量','上周同期进站量','今日出站量', '上周同期出站量']
                    },
                    grid: {
                        show: true,
                        top: '44',
                        left: '20',
                        right: '15',
                        bottom: '10',
                        containLabel: true,
                        backgroundColor: '#FFF',
                        borderColor: 'transparent'
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
//                        boundaryGap: false,
                        data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23', '24']

                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#ececed'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#faf9f9', '#f3f4f4']
                            }
                        }
                    },
                    series: [
                        {
                            name:'今日进站量',
                            type:'bar',
                            data: []
                        },
                        {
                            name:'上周同期进站量',
                            type:'bar',
                            data: []
                        },
                        {
                            name:'今日出站量',
                            type:'line',
                            data: []
                        },
                        {
                            name:'上周同期出站量',
                            type:'line',
                            data: []
                        }
                    ]
                };
                this.myChart2.setOption(option);
            },

            barEchart(){
                var that = this;

                this.myChart3 = echarts.init(this.$refs.barEchart);

                var option = {
                    color: ['#ea5550','#69a2d8','#8e81bc'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        top: 10,
                        data:['站点乘降量', '进站客流量', '出站客流量']
                    },
                    grid: {
                        show: true,
                        top: '44',
                        left: '20',
                        right: '15',
                        bottom: '10',
                        containLabel: true,
                        backgroundColor: '#FFF',
                        borderColor: '#FFF'
                    },
                    xAxis : [
                        {
                            type : 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#ececed'
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['#faf9f9', '#f3f4f4']
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            axisTick : {show: false},
                            data : ['镇海路','中山公园','将军祠','文灶','湖滨东路','莲坂','莲花路口', '吕厝', '乌石浦', '塘边', '火炬园', '殿前', '高崎', '集美学村', '园博苑', '杏林村', '杏锦路', '官任', '诚毅广场', '集美软件园', '集美大道', '天水路', '厦门北站', '岩内'],
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#454e5e'
                                },
//                                width: 100,
//                                height: 20,
//                                backgroundColor: 'yellow',

//                                width: 64,
//                                height: 20,
//                                fontSize: 12,
//                                borderWidth: 1,
//                                borderRadius: 10,
//                                borderColor: '#F9F9F9'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'站点乘降量',
                            type:'bar',
//                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside' //inside
                                }
                            },
                            data:[]
                        },
                        {
                            name:'进站客流量',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[]
                        },
                        {
                            name:'出站客流量',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: function(a)
                                    {
                                        return Math.abs(a.data);
                                    } // 这里是数据展示的时候显示的数据
                                }
                            },
                            data:[]
                        }
                    ]
                };

                this.myChart3.setOption(option);

                this.myChart3.on('click', function (params) {
                   for (var i = 0; i < that.stationData.length; i++) {

                       if (that.stationData[i].name == params.name || that.stationData[i].name.replace('站','') == params.name) {
                           that.defaultSelect = that.stationData[i].id;
                           return;
                       }
                   }
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .flowMonitor-container {
        position: relative;
        display: flex;
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #ecebeb;

        .panel-left {
            flex: 1;
            margin: 19px 19px 0;

            .echart-top {
                height: 342px;
                background-color: #eeeeee;
                border: 2px solid #e2e3e3;
                .line-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
            }
            .echart-bottom {
                position: relative;
                height: 342px;
                background-color: #eeeeee;
                border: 2px solid #e2e3e3;
                .station-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
                .select-station {
                    position: absolute;
                    top: 6px;
                    right: 14px;
                }
            }

        }

        .panel-right {
            flex: 1;
            margin: 19px 19px 0 0;
            height: 724px;
            background-color: #eeeeee;
            border: 2px solid #e2e3e3;
            .bar-flow-echart {
                width: 100%;
                height: 100%;
            }
        }

        .echarts-title {
            padding-bottom: 8px;
            width: 100%;
            height: 40px;
            color: #454e5e;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
        }

    }

</style>

<style lang="scss" rel="stylesheet/scss">
    .select-station {
        .ivu-select-selection {
            border-radius: 16px;
            border: 1px solid #7fbc8e;

            &:hover {
                border-color: #7fbc8e;
            }
        }

        &.ivu-select-visible .ivu-select-selection {
            border-color: #7fbc8e;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(127,188,142,.2);
        }
    }

    .flowMonitor-container .ivu-select-item-selected,.flowMonitor-container .ivu-select-item-selected:hover {
        background: rgba(127,188,142,.9);
    }
</style>