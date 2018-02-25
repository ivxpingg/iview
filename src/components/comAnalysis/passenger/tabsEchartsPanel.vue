<template>
    <div class="tabsEchartsPanel-container">
        <Tabs class="tabs" type="card" :animated="false">
            <TabPane label="全线客流分析">
                <div ref="chart1" class="chart chart1"></div>
            </TabPane>
            <TabPane class="tab-pane-2" label="单站分析">
                <div ref="chart2" class="chart chart2"></div>
                <Select v-model="defaultSelect" class="select-station" style="width:117px">
                    <Option v-for="item in stationData" :value="item.id">{{ item.name }}</Option>
                </Select>
            </TabPane>
            <TabPane label="平均运距分析">
                <div ref="chart3" class="chart chart3"></div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                defaultSelect: '1',
                stationData: [
                    { name: '镇海路站', id: '1' },
                    { name: '中山公园站', id: '2' },
                    { name: '将军祠站', id: '3' },
                    { name: '文灶站', id: '4' },
                    { name: '湖滨东路站', id: '5' },
                    { name: '莲坂站', id: '6' },
                    { name: '莲花路口站', id: '7' },
                    { name: '吕厝站', id: '8' },
                    { name: '乌石浦站', id: '9' },
                    { name: '塘边站', id: '10' },
                    { name: '火炬园站', id: '11' },
                    { name: '殿前站', id: '12' },
                    { name: '高崎站', id: '13' },
                    { name: '集美学村站', id: '14' },
                    { name: '园博苑站', id: '15' },
                    { name: '杏林村站', id: '16' },
                    { name: '杏锦路站', id: '17' },
                    { name: '官任站', id: '18' },
                    { name: '诚毅广场站', id: '19' },
                    { name: '集美软件园站', id: '20' },
                    { name: '集美大道站', id: '21' },
                    { name: '天水路站', id: '22' },
                    { name: '厦门北站', id: '23' },
                    { name: '岩内站', id: '24' }
                ],

                myChart1: null,
                myChart2: null,
                myChart3: null,

                option1: {
//                    xAxis: [ { data: [] } ],
                    series: [
                        { data: [] },
                        { data: [] },
                        { data: [] },
                        { data: [] }
                    ]
                },
                option2: {
                    xAxis: [ { data: [] } ],
                    series: [
                        { data: [] },
                        { data: [] }
                    ]
                },
                option3: {
                    xAxis: [ { data: [] } ],
                    series: [
                        { data: [] },
                        { data: [] },
                        { data: [] }
                    ]
                },

                echartData2: {
                    inSinglePassengerFlow: [],
                    outSinglePassengerFlow: []
                },

                echartData3: {
                    averageDistanceList: []
                }
            }
        },
        props: {
            dates: {
                type: Array,
                default() {
                    return [];
                }
            },
            dim: {
                type: String,
                default() {
                    return 'day';
                }
            },
            timeFrame: {
                type: String,
                default() {
                    return 'allDay';
                }
            }
        },
        watch: {
            dates(val, valOld) {
                this.getData1();
                this.getData2();
                this.getData3();
            },
//            timeFrame(val) {
//                this.getData1();
//                this.getData2();
//            },
            defaultSelect (val) {
                this.getData2();
            },
            echartData2: {
                handler: function (val, oldVal) {
                    var that = this;
                    that.option2.xAxis[0].data = [];
                    that.option2.series[0].data = [];
                    that.option2.series[1].data = [];

                    var smoment = MOMENT(that.dates[0]);
                    var emoment = MOMENT(that.dates[1]);
                    var format = 'YYYY-MM-DD';
                    var type = 'd';

                    switch (that.dim) {
                        case 'day': format = 'YYYY-MM-DD'; type = 'days'; break;
                        case 'week': format = 'YYYY-MM-DD'; type = 'weeks'; break;
                        case 'month': format = 'YYYY-MM'; type = 'months'; break;
                        case 'year':  format = 'YYYY'; type = 'years'; break;
                    }

                    if (smoment.isAfter(emoment)) { return;}

                    while (!smoment.isAfter(emoment)) {
                        that.option2.xAxis[0].data.push(smoment.format(format));
                        that.option2.series[0].data.push(0);
                        that.option2.series[1].data.push(0);
                        smoment.add(1, type);
                    }

                    val.inSinglePassengerFlow.forEach(function (value) {
                        that.option2.series[0].data[that.option2.xAxis[0].data.indexOf(value.insTime)] = value.passengerFlow;
                    });
                    val.outSinglePassengerFlow.forEach(function (value) {
                        that.option2.series[1].data[that.option2.xAxis[0].data.indexOf(value.insTime)] = value.passengerFlow;
                    });
                    that.myChart2.setOption(that.option2);
                },
                deep: true
            },

            echartData3: {
                handler: function (val, oldVal) {
                    var that = this;
                    that.option3.xAxis[0].data = [];
                    that.option3.series[0].data = [];
                    that.option3.series[1].data = [];
                    that.option3.series[2].data = [];

                    var smoment = MOMENT(that.dates[0]);
                    var emoment = MOMENT(that.dates[1]);
                    var format = 'YYYY-MM-DD';
                    var type = 'd';

                    switch (that.dim) {
                        case 'day': format = 'YYYY-MM-DD'; type = 'days'; break;
                        case 'week': format = 'YYYY-MM-DD'; type = 'weeks'; break;
                        case 'month': format = 'YYYY-MM'; type = 'months'; break;
                        case 'year':  format = 'YYYY'; type = 'years'; break;
                    }

                    if (smoment.isAfter(emoment)) { return;}

                    while (!smoment.isAfter(emoment)) {
                        that.option3.xAxis[0].data.push(smoment.format(format));
                        that.option3.series[0].data.push(0);
                        that.option3.series[1].data.push(0);
                        that.option3.series[2].data.push(0);
                        smoment.add(1, type);
                    }

                    val.averageDistanceList.forEach(function (value) {

                        that.option3.series[0].data[that.option3.xAxis[0].data.indexOf(value.insTime)] = value.passengerFlow / 10000;
                        that.option3.series[1].data[that.option3.xAxis[0].data.indexOf(value.insTime)] = value.averageDistance || 0;
                        that.option3.series[2].data[that.option3.xAxis[0].data.indexOf(value.insTime)] = value.passengerFlow * value.averageDistance / 10000;
                    });

//                    val.averageDistance.forEach(function (value) {
//                        that.option3.series[1].data[that.option3.xAxis[0].data.indexOf(value.insTime)] = value.averageDistance;
//                    });
                    that.myChart3.setOption(that.option3);
                },
                deep: true
            }
        },
        mounted() {
            this.setChart1();
            this.setChart2();
            this.setChart3();

            this.getData1();
            this.getData2();
            this.getData3();
        },
        methods: {
            setChart1() {
                this.myChart1 = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['平均进站量','最高进站量','平均出站量', '最高出站量']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['镇海路','中山公园','将军祠','文灶','湖滨东路','莲坂','莲花路口', '吕厝', '乌石浦', '塘边', '火炬园', '殿前', '高崎', '集美学村', '园博苑', '杏林村', '杏锦路', '官任', '诚毅广场', '集美软件园', '集美大道', '天水路', '厦门北站', '岩内'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'平均进站量',
                            type:'bar',
                            data:[]
                        },
                        {
                            name:'最高进站量',
                            type:'bar',
                            data:[]
                        },
                        {
                            name:'平均出站量',
                            type:'line',
                            data:[]
                        },
                        {
                            name:'最高出站量',
                            type:'line',
                            data:[]
                        }
                    ]
                };

                this.myChart1.setOption(option);
            },
            setChart2() {
                this.myChart2 = echarts.init(this.$refs.chart2);
                var option = {
                    color: ['#ea5550', '#65aadd', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['进站量', '出站量']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisTick: {
                            length: 3
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisTick: {
                            length: 3
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        }

                    },
                    series: [
                        {
                            name: '进站量',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: []
                        },
                        {
                            name: '出站量',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: []
                        }
                    ]
                };

                this.myChart2.setOption(option);
            },
            setChart3() {
                this.myChart3 = echarts.init(this.$refs.chart3);
                var option = {
                    color: ['#ea5550','#69a2d8','#8e81bc','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['客运量','平均运距','客运周转量']
                    },
                    grid: {
                        left: 5,
                        right: 80,
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '万人次',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        },
                        {
                            type: 'value',
                            name: '公里',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            position: 'right',
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        },
                        {
                            type: 'value',
                            name: '万人公里',
                            position: 'right',
                            offset: 80,
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }

                    ],
                    series: [
                        {
                            name:'客运量',
                            type:'bar',
                            data:[]
                        },
                        {
                            name:'平均运距',
                            type:'bar',
                            yAxisIndex: 1,
                            data:[]
                        },
                        {
                            name:'客运周转量',
                            type:'line',
                            yAxisIndex: 2,
                            data:[]
                        }
                    ]
                };

                this.myChart3.setOption(option);
            },

            getData1() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/inte/passengerAnalysis/getAllPassengerFlow',
                    params: {
                        beginDate: that.dates[0],
                        endDate: that.dates[1],
                        type: that.dim,
                        timeType: that.timeFrame
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        console.dir(response.result);

                        that.option1.series[0].data =  response.result.avgInPassengerFlowList;
                        that.option1.series[1].data =  response.result.maxInPassengerFlowList;
                        that.option1.series[2].data =  response.result.avgOutPassengerFlowList;
                        that.option1.series[3].data =  response.result.maxOutPassengerFlowList;
                        that.myChart1.setOption(that.option1);
                    }
                    else {}
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getData2() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/inte/passengerAnalysis/getSinglePassengerFlow',
                    params: {
                        beginDate: that.dates[0],
                        endDate: that.dates[1],
                        type: that.dim,
                        timeType: that.timeFrame,
                        stationId: that.defaultSelect
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.echartData2 = response.result;
                    }
                    else {}
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getData3() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/inte/passengerAnalysis/getAverageDistance',
                    params: {
                        beginDate: that.dates[0],
                        endDate: that.dates[1],
                        type: that.dim,
                        timeType: that.timeFrame
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        console.dir(response.result);
                        that.echartData3 = response.result;
                    }
                    else {}
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .tabsEchartsPanel-container {
        display: flex;
        height: 382px;

        .tabs {
            width: 100%;
            height: 100%;
        }
        .chart {
            width: 100%;
            height: 340px;
        }

        .tab-pane-2 {
            position: relative;
        }

    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .tabsEchartsPanel-container {
        .ivu-tabs {
            position: relative;
            .ivu-tabs-bar {
                margin-bottom: 0px;
            }
            .ivu-tabs-content {

            }
        }

        .ivu-tabs-nav{
            float: right;
        }

        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
            padding-top: 5px;
            height: 32px;
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
            position: relative;
            margin-right: 15px;
            height: 26px;
            padding: 0 16px;
            line-height: 26px;
            background-color: #FFFFFF;
            border-radius: 0;
            border-color: #cccccd;

            &:before {
                content: " ";
                position: absolute;
                display: block;
                top: -1px;
                left: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-left.png) no-repeat center;
                z-index: 1;
            }
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-right.png) no-repeat center;
                z-index: 1;
                transition: all .3s ease-in-out;
            }
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
            height: 27px;
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 27px;
                background: url(./images/tabs-nav-bg-right-active.png) no-repeat center;
                z-index: 1;
            }
        }
    }

    .select-station {
        position: absolute;
        top: 13px;
        right: 14px;
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
</style>