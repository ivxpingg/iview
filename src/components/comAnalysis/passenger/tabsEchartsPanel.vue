<template>
    <div class="tabsEchartsPanel-container">
        <Tabs class="tabs" type="card" :animated="false">
            <TabPane label="全线分析">
                <div ref="chart1" class="chart chart1"></div>
            </TabPane>
            <TabPane class="tab-pane-2" label="单站分析">
                <div ref="chart2" class="chart chart2"></div>
                <Select v-model="defaultSelect" class="select-station" style="width:117px">
                    <Option v-for="item in stationData" :value="item.id">{{ item.name }}</Option>
                </Select>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
                defaultSelect: '2',
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
                ]
            }
        },
        mounted() {
            this.setChart1();
            this.setChart2();
        },
        methods: {
            setChart1() {
                var myChart = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#ea5550', '#8e81bc', '#65aadd'],
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
                        data:['平均值','最高值','最低值']
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
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
                            name:'平均值',
                            type:'line',
                            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name:'最高值',
                            type:'line',
                            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name:'最低值',
                            type:'line',
                            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                };


                myChart.setOption(option);
            },
            setChart2() {
                var myChart = echarts.init(this.$refs.chart2);
                var option = {
                    color: ['#ea5550', '#8e81bc', '#65aadd'],
                    backgroundColor: '#FFF',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['早高峰', '晚高峰', '其它']
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
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
                            name: '早高峰',
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
                            name: '晚高峰',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '其它',
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
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                margin-bottom: 0px;
            }
            .ivu-tabs-content {

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