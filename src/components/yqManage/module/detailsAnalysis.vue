<template>
    <div class="detailsAnalysis-container">
        <div class="search-panel">
            <Form class="form" inline :label-width="75">
                <FormItem label="查询时间段:"  :label-width="95">
                    <DatePicker type="daterange" format="yyyy-MM-dd" v-model="dateRange" :editable="false" :clearable="false" placeholder="选择时间" style="width: 190px"></DatePicker>
                </FormItem>

                <FormItem  :label-width="10">
                    <Button type="success" @click="onSearch">查询</Button>
                </FormItem>
            </Form>
        </div>

        <div class="chart-panel">
            <div class="top-box">
                <div class="left-box">
                    <div ref="chart1" class="chart-box"></div>
                </div>
                <div class="right-box">
                    <div ref="chart2" class="chart-box"></div>
                </div>
            </div>
            <div class="bottom-box">
                <div ref="chart3" class="chart-box"></div>
                <div class="chart-title chart-title1">舆论话题分布</div>
            </div>
        </div>

    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import MOMENT from 'moment';
    import echarts from 'echarts';
    require('../../../libs/echarts2/chart/wordCloud');
    import echarts2 from '../../../libs/echarts2';
//    var echarts2 = require('../../../libs/echarts2/build/echarts');
    export default {
        data() {
            return {
                dateRange: [new Date(), new Date()],
                sTime: '',
                eTime: '',

                chart1: null,
                chart2: null,
                chart3: null,

                option1: {
                    series: [{ data: [
                        {value: 0, name: '总数'},
                        {value: 0, name: '正面'},
                        {value: 0, name: '中立'},
                        {value: 0, name: '负面'}
                    ] }]
                },
                option2: {
                    series: [
                        {
                            name: '正面',
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
                            name: '负面',
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
                            name: '中立',
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

                },
                option3: {
                    series: [
                        {
                            name: '',
                            type: 'wordCloud',
                            size: ['100%', '80%'],
                            textRotation : [0,0,0,0],
                            textPadding: 0,
                            autoSize: {
                                enable: true,
                                minSize: 14
                            },
                            data: []
                        }
                    ]
                }
            }
        },
        watch: {
            dateRange(val) {
                this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
                this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');
            }
        },
        created() {
            this.dateRange[0] = MOMENT().subtract(6, 'days')._d;
        },
        mounted() {
            this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
            this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');

            this.setChart1();
            this.setChart2();
            this.setChart3();

            this.onSearch();
        },
        methods: {
            onSearch() {
                this.getData1();
            },

            getData1() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/pub/pubOpinionInfo/pubOpinionDetailAnalysis',
                    params: {
                        beginDate: that.sTime,
                        endDate: that.eTime
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        console.dir(response.result);
                        that.setChartOption(response.result);
                    }
                    else {}

                }).catch(function (error) {
                    console.log(error);
                })
            },

            setChartOption(result) {
                var that = this;

                this.option1.series[0].data[0].value = result.all;
                this.option1.series[0].data[1].value = result.positive;
                this.option1.series[0].data[2].value = result.neutral;
                this.option1.series[0].data[3].value = result.negative;

                this.option2.series[0].data = [];
                this.option2.series[1].data = [];
                this.option2.series[2].data = [];

                for(var key in result.sourceMap) {
                    var val  = result.sourceMap[key];
                    that.option2.series[0].data.push(val[2]);
                    that.option2.series[1].data.push(val[1]);
                    that.option2.series[2].data.push(val[0]);
                }

                that.option3.series[0].data = [];

                result.topicList.forEach(function (val, idx) {
                   var contKeywordList = val.contKeyword.split(',');
                   var num = val.num;

                    contKeywordList.forEach(function(v){

                        that.option3.series[0].data[idx] = {};
                        that.option3.series[0].data[idx].name = v;
                        that.option3.series[0].data[idx].value = 1000;
                        that.option3.series[0].data[idx].itemStyle = that.createRandomItemStyle();
                    });

                });


                console.dir(this.option3);
                this.chart1.setOption(this.option1);
                this.chart2.setOption(this.option2);
                this.chart3.setOption(this.option3);
            },

            setChart1() {
                var that = this;
                that.chart1 = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#88c897','#65aadd', '#ef857d'],
                    backgroundColor: '#f3f4f5',
                    title : {},
                    grid: {
                        top: '0%',
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {},
                    series : [
                        {
                            name: '岗位类别',
                            type: 'pie',
                            radius : '70%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 1542, name: '总数'},
                                {value: 24, name: '正面'},
                                {value: 100, name: '中立'},
                                {value: 24, name: '负面'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 5,
                                    length2: 5,
                                    smooth: true
                                }
                            }
                        }
                    ]
                };

                that.chart1.setOption(option);
            },
            setChart2() {
                this.chart2 = echarts.init(this.$refs.chart2);
                var option = {
                    color: ['#88c897','#65aadd', '#ef857d'],
                    backgroundColor: '#f3f4f5',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        x : 'right',
                        data: ['正面', '负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['微博', '新闻', '微信', '论坛', '贴吧', 'App', '电子报', '博客', '视频', '境外', 'twitter', '其它'],
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
                            name: '正面',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [1241, 432, 443, 168, 341, 578, 357, 48, 957, 135, 246, 357]
                        },
                        {
                            name: '负面',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [41, 2, 43, 18, 31, 58, 37, 8, 57, 15, 26, 37]
                        },
                        {
                            name: '中立',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [234,44,79,88,12,31, 45,88,41,74,52,12]
                        }
                    ]
                };

                this.chart2.setOption(option);
            },
            setChart3() {
                var that = this;

                this.chart3 = echarts2.init(this.$refs.chart3);

                var option = {
                    title: {},
                    tooltip: {
                        show: true
                    },
                    series: [{
                        name: '',
                        type: 'wordCloud',
                        size: ['100%', '80%'],
                        textRotation : [0,0,0,0],
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        data: [
                            {
                                name: " ",
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: 'black'
                                    }
                                }
                            },
//                            {
//                                name: "新闻",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "微信",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "论坛",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "贴吧",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "App",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "电子报",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "博客",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "视频",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "境外",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "twitter",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            },
//                            {
//                                name: "其它",
//                                value: 0,
//                                itemStyle: that.createRandomItemStyle()
//                            }
                        ]
                    }]
                };

                this.chart3.setOption(option);
            },
            createRandomItemStyle() {
                return {
                    normal: {
                        color: 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')'
                    }
                };
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .detailsAnalysis-container {
        width: 100%;
        height: 100%;
        border: 1px solid #c8dcf2;
        background-color: #F7F7F7;
        .search-panel {
            padding-top: 10px;
            height: 54px;
            .form {
                margin-top: 3px;
            }
        }
        .chart-panel {
            width: 100%;
            height: 719px;
            .top-box {
                display: flex;
                width: 100%;
                height: 360px;
                overflow: hidden;

                .left-box {
                    width: 400px;
                }
                .right-box {
                    flex: 1;
                }
            }

            .bottom-box {
                position: relative;
                width: 100%;
                height: 359px;

                .chart-title {
                    position: absolute;
                    padding-left: 6px;
                    height: 18px;
                    font-size: 16px;
                    line-height: 18px;
                    border-left: 6px solid #3071b8;
                    overflow: hidden;
                    z-index: 1;

                    &.chart-title1 {
                        top: 6px;
                        left: 18px;
                    }
                }
            }

            .chart-box {
                width: 100%;
                height:100%;
            }

        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>