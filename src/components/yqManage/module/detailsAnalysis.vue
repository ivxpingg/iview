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

                chart1: null,
                chart2: null,
                chart3: null,
            }
        },
        created() {
        },
        mounted() {

            this.setChart1();
            this.setChart2();
            this.setChart3();
        },
        methods: {
            onSearch() {},

            getData1() {},
            getData2() {},
            getData3() {},

            setChart1() {
                var that = this;
                that.chart1 = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#88c897', '#8e81bc','#65aadd','#f3994f', '#ef857d'],
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
                                {value: 100, name: '中立'},
                                {value: 24, name: '负面'},
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
                    color: ['#ea5550', '#65aadd', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
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
                        name: 'Google Trends',
                        type: 'wordCloud',
                        size: ['80%', '80%'],
                        textRotation : [0, 45, 90, -45],
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        data: [
                            {
                                name: "Sam S Club",
                                value: 10000,
                                itemStyle: {
                                    normal: {
                                        color: 'black'
                                    }
                                }
                            },
                            {
                                name: "Macys",
                                value: 6181,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Amy Schumer",
                                value: 4386,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Jurassic World",
                                value: 4055,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Charter Communications",
                                value: 2467,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Chick Fil A",
                                value: 2244,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Planet Fitness",
                                value: 1898,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Pitch Perfect",
                                value: 1484,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Express",
                                value: 1112,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Home",
                                value: 965,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Johnny Depp",
                                value: 847,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Lena Dunham",
                                value: 582,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Lewis Hamilton",
                                value: 555,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "KXAN",
                                value: 550,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Mary Ellen Mark",
                                value: 462,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Farrah Abraham",
                                value: 366,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Rita Ora",
                                value: 360,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Serena Williams",
                                value: 282,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "NCAA baseball tournament",
                                value: 273,
                                itemStyle: that.createRandomItemStyle()
                            },
                            {
                                name: "Point Break",
                                value: 265,
                                itemStyle: that.createRandomItemStyle()
                            }
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
                width: 100%;
                height: 359px;
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