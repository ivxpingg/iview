<template>
    <div class="echartsPanel-container">
        <div ref="chart2" class="chart chart2"></div>
        <div ref="chart1" class="chart chart1"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                tableData: [],

                myChart1: null,
                myChart2: null,
                myChart3: null,

                option1: {
                    xAxis: [
                        {
                            data: []
                        }
                    ],
                    yAxis: [{ min: 0, max: 100, interval: 10}],
                    series: [
                        { data: [] },
                        { data: [] },
                        { data: [] }
                    ]
                },
                option2: {
                    series: [
                        {
                            data: [
                                { value:0, name:'晚点列次' },
                                { value:0, name:'正点列次' }
                            ]
                        },
                        {
                            data: [
                                {value:0, name:'2-5分晚点'},
                                {value:0, name:'5分及以上晚点'},
                                {value:0, name:'正点列次'}
                            ]
                        }

                    ]
                },

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
            }
        },
        watch: {
            dates(val, valOld) {
                this.getData();
            },
            tableData(val) {
                var that = this;
                that.option1.xAxis[0].data = [];
                that.option1.series[0].data = [];
                that.option1.series[1].data = [];
                that.option1.series[2].data = [];

                that.option2.series[0].data[0].value = 0;
                that.option2.series[0].data[1].value = 0;
                that.option2.series[1].data[0].value = 0;
                that.option2.series[1].data[1].value = 0;
                that.option2.series[1].data[2].value = 0;


                val.forEach(function (val) {
                    that.option1.xAxis[0].data.push(val.insTime);
                    that.option1.series[0].data.push(val.planTrainNum);
                    that.option1.series[1].data.push(val.actualTrainNum);
                    that.option1.series[2].data.push(val.fulfillmentRate);

                    that.option2.series[0].data[0].value += val.lateTime;
                    that.option2.series[0].data[1].value += val.onTime;
                    that.option2.series[1].data[0].value += val.twoToFiveLate;
                    that.option2.series[1].data[1].value += val.overFiveLate;
                    that.option2.series[1].data[2].value += val.onTime;

                });

                that.option1.yAxis[0].max = 0;

                that.option1.series[0].data.forEach(function (value) {
                    if (value > that.option1.yAxis[0].max) {
                        that.option1.yAxis[0].max = value;
                    }
                });

                that.option1.yAxis[0].interval = parseInt(that.option1.yAxis[0].max / 9);
                that.option1.yAxis[0].max = that.option1.yAxis[0].max + that.option1.yAxis[0].interval;

                that.myChart1.setOption(that.option1);
                that.myChart2.setOption(that.option2);
            }
        },
        mounted() {
            this.getData();

            this.setChart1();
            this.setChart2();
        },
        methods: {
            setChart1() {
                this.myChart1 = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#ea5550', '#65aadd', '#8e81bc'],
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
                    legend: {
                        data:['计划列次','实际列次','正点率']
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
                            name: '列次数',
                            nameTextStyle: {
                                color: '#4d8dcb'
                            },
                            min: 0,
                            max: 280,
                            interval: 28,
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
                            },
                            splitLine: {
                                show: false
                            }

                        },
                        {
                            type: 'value',
                            name: '正点率',
                            nameTextStyle: {
                                color: '#4d8dcb'
                            },
                            min: 0,
                            max: 100,
                            interval: 10,
                            axisLabel: {
                                formatter: '{value}%',
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
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name:'计划列次',
                            type:'bar',
                            data:[]
                        },
                        {
                            name:'实际列次',
                            type:'bar',
                            data:[]
                        },
                        {
                            name:'正点率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[]
                        }
                    ]
                };


                this.myChart1.setOption(option);
            },
            setChart2() {
                this.myChart2 = echarts.init(this.$refs.chart2);
                var option = {
                    color: ['#ef857d', '#8e81bc', '#65aadd', '#f4ad70', '#8dca9a', '#779ad0', '#8072b2', '#decd59'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['2-5分晚点', '5分及以上晚点']
                    },
                    grid: {
                        left: 5,
                        right: '0%',
                        bottom: 10,
                        containLabel: true
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                { value:0, name:'晚点列次', selected:true},
                                { value:0, name:'正点列次' }
                            ]
                        },
                        {
//                            name:'分项说明',
                            type:'pie',
                            radius: ['45%', '65%'],
                            label: {
                                normal: {
//                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    formatter: '{b|{b}}\n{hr|}\n{per|  {c} ({d}%)}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#7e7b86',
                                    borderWidth: 1,
                                    borderRadius: 4,
//                                    position: '',
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#454e5e',
                                            lineHeight: 16,
                                            padding: [0,0,0,8]

                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#7e7b86',
                                            width: '100%',

                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 20,
                                            align: 'center',
                                        },
                                        per: {
//                                            color: '#454e5e',
//                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2,
                                            align: 'center'
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 10,
                                    length2: 10,
                                    smooth: true
                                }
                            },
                            data:[
                                {value:0, name:'2-5分晚点'},
                                {value:0, name:'5分及以上晚点'},
                                {value:0, name:'正点列次'}
                            ]
                        }
                    ]
                };

                this.myChart2.setOption(option);
            },

            getData(){
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/inte/driveAnalysis/getDriveIndex',
                    params: {
                        beginDate: this.dates[0],
                        endDate: this.dates[1],
                        type: this.dim
                    }
                }).then(function(response){
                    if (response.status === 1) {
//                        console.dir(response.result);
                        that.tableData = response.result.driveIndexList;
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
    .echartsPanel-container {
        display: flex;
        height: 350px;
        .chart {
            margin-left: 9px;
            height: 100%;
            border: 1px solid #dcdddd;
            background-color: #f7f7f7;

            &:first-child {
                margin-left: 0;
            }

            &.chart1 {
                flex: 2;
            }
            &.chart2 {
                flex: 1;
            }
        }
    }
</style>