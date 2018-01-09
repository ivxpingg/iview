<template>
    <div class="container">
        <div class="panel-left">
            <div class="echart-top">
                <div ref="lineFlowEchart" class="line-line-flow-echart"></div>
            </div>
            <div class="echart-bottom">
                <div ref="stationFlowEchart" class="station-line-flow-echart"></div>
            </div>
        </div>
        <div class="panel-right">
            <div ref="barEchart" class="bar-flow-echart"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '../../../libs/util';
    export default {
        data () {
            return {

            }
        },
        mounted() {
            this.lineEchart();
            this.stationEchart();
            this.barEchart();
        },
        methods: {
            getData(){

            },

            lineEchart() {
                var myChart = echarts.init(this.$refs.lineFlowEchart);
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['今日','昨日','上周同期']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'今日',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
                        },
                        {
                            name:'昨日',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                        },
                        {
                            name:'上周同期',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 190, 330, 410]
                        }
                    ]
                };
                myChart.setOption(option);


            },
            stationEchart() {
                var myChart = echarts.init(this.$refs.stationFlowEchart);
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['今日','昨日','上周同期']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'今日',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
                        },
                        {
                            name:'昨日',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                        },
                        {
                            name:'上周同期',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 190, 330, 410]
                        }
                    ]
                };
                myChart.setOption(option);
            },

            barEchart(){
                debugger
                var myChart = echarts.init(this.$refs.barEchart);

                var option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['利润', '支出', '收入']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            axisTick : {show: false},
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    series : [
                        {
                            name:'利润',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[200, 170, 240, 244, 200, 220, 210]
                        },
                        {
                            name:'收入',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[320, 302, 341, 374, 390, 450, 420]
                        },
                        {
                            name:'支出',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[-120, -132, -101, -134, -190, -230, -210]
                        }
                    ]
                };

                myChart.setOption(option);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        display: flex;

        .panel-left {
            flex: 1;
            height: 100%;

            .echart-top {
                height: 50%;
                .line-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
            }
            .echart-bottom {
                height: 50%;
                .station-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
            }

        },

        .panel-right {
            flex: 1;
            height: 100%;

            .bar-flow-echart {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>