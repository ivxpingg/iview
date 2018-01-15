<template>
    <div class="echartsPanel-container">
        <div ref="chart1" class="chart chart1"></div>
        <div ref="chart2" class="chart chart2"></div>
        <div ref="chart3" class="chart chart3"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {}
        },
        mounted() {
            this.setChart1();
            this.setChart2();
            this.setChart3();
        },
        methods: {
            setChart1() {
                var myChart = echarts.init(this.$refs.chart1);
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
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['计划列次','实际列次','正点率'],
                        left: 10
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
//                            min: 0,
//                            max: 250,
//                            interval: 50,
                            axisLabel: {
                                formatter: '{value}个',
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
                            }
                        }
                    ],
                    series: [
                        {
                            name:'计划列次',
                            type:'bar',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name:'实际列次',
                            type:'bar',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'正点率',
                            type:'line',
                            yAxisIndex: 1,
                            data:[92, 95, 94, 99, 98, 95, 92, 92, 95, 94, 99, 98]
                        }
                    ]
                };


                myChart.setOption(option);
            },
            setChart2() {
                var myChart = echarts.init(this.$refs.chart2);
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
                        data:['5分及以上晚点','加开列次','救援列次']
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
                                {value:679, name:'其它', selected:true},
                                {value:335, name:'晚点列次'},
                                {value:1548, name:'正点列次'}
                            ]
                        },
                        {
                            name:'分项说明',
                            type:'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#7e7b86',
                                    borderWidth: 1,
                                    borderRadius: 4,
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
                                            width: 56,
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 20
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
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
                                {value:335, name:'加开列次'},
                                {value:310, name:'救援列次'},
                                {value:234, name:'2-5分晚点'},
                                {value:135, name:'5分及以上晚点'},
                                {value:1548, name:'计划列次'}
                            ]
                        }
                    ]
                };

                myChart.setOption(option);
            },
            setChart3() {
                var myChart = echarts.init(this.$refs.chart3);
                var option = {
                    color: ['#ea5550', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['空载里程', '空驾里程']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月'],
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
                            name: '空载里程',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '空驾里程',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
                };

                myChart.setOption(option);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .echartsPanel-container {
        display: flex;
        height: 350px;
        .chart {
            flex: 1;
            margin-left: 9px;
            height: 100%;
            border: 1px solid #dcdddd;
            background-color: #f7f7f7;

            &:first-child {
                margin-left: 0;
            }
        }
    }
</style>