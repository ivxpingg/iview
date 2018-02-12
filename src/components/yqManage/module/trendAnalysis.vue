<template>
    <div class="trendAnalysis-container">
        <div ref="chart1" class="chart chart1"></div>
        <div ref="chart2" class="chart chart2"></div>
        <div class="chart-title chart-title1">舆论话题分布</div>
        <div class="chart-title chart-title2">整体舆情走势</div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                myChart1: null,
                myChart2: null,

                option1: {
                    series: [
                        { data: [] },
                        { data: [] },
                        { data: [] },
                        { data: [] }
                    ]
                },
                option2: {
                    xAxis: [ {data: []} ],
                    series: [
                        { data: [] },
                        { data: [] },
                        { data: [] },
                        { data: [] }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
            this.setChart1();
            this.setChart2();

            this.getData1();
        },
        methods: {
            setChart1() {
                this.myChart1 = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#8e81bc','#88c897','#ef857d','#65aadd'],
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
                        x : 'center',
                        y : 'bottom',
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
                            name:'全部',
                            type:'line',
                            data:[]
                        },
                        {
                            name:'正面',
                            type:'line',
                            data:[]
                        },
                        {
                            name:'负面',
                            type:'line',
                            data:[]
                        },
                        {
                            name:'中立',
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
                    color: ['#8e81bc','#88c897','#ef857d','#65aadd'],
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
                        x : 'center',
                        y : 'bottom',
                        data:['全部','正面','负面', '中立']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01','2018-01-01'],
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
                            name:'全部',
                            type:'line',
                            data:[100, 110, 120, 115, 87, 92, 101, 113, 254, 201, 198, 156, 110, 100]
                        },
                        {
                            name:'正面',
                            type:'line',
                            data:[80, 90, 100, 110, 50, 87, 77, 110, 204, 201, 148, 144, 110, 88]
                        },
                        {
                            name:'负面',
                            type:'line',
                            data:[4, 5, 6, 2, 0, 4, 3, 0, 12, 14, 9, 7, 7, 4]
                        },
                        {
                            name:'中立',
                            type:'line',
                            data:[16, 25, 14, 3, 37, 1, 8, 13, 3, 38, 26, 1, 5, 8]
                        }
                    ]
                };

                this.myChart2.setOption(option);
            },

            getData1() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/pub/pubOpinionInfo/getPubOpinionTrend',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.setChartOptionData(response.result);
                    }
                    else {}

                }).catch(function (error) {
                    console.log(error);
                })
            },
            setChartOptionData(result) {
                var that = this;

                this.option1.series[0].data = result.todayAllList;
                this.option1.series[1].data = result.todayPositiveList;
                this.option1.series[2].data = result.todayNegativeList;
                this.option1.series[3].data = result.todayMicroBlogList;

                that.option2.xAxis[0].data = [];
                that.option2.series[0].data = [];
                that.option2.series[1].data = [];
                that.option2.series[2].data = [];
                that.option2.series[3].data = [];

                for( var key in result.fourteenAll) {
                    that.option2.xAxis[0].data.push(key);
                    that.option2.series[0].data.push(result.fourteenAll[key]);
                    that.option2.series[1].data.push(result.fourteenPositive[key]);
                    that.option2.series[2].data.push(result.fourteenNegative[key]);
                    that.option2.series[3].data.push(result.fourteenMicroBlog[key]);
                }

                this.myChart1.setOption(this.option1);
                this.myChart2.setOption(this.option2);
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .trendAnalysis-container {
        position: relative;
        width: 100%;
        height: 100%;

        .chart {
            width: 100%;
            height: 361px;
            border: 1px solid #c8dcf2;
            background-color: #F7F7F7;
            &.chart2 {
                margin-top: 8px;
            }
        }

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
            &.chart-title2 {
                top: 375px;
                left: 18px;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>