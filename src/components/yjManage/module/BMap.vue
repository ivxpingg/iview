<template>
    <div class="bmap-container">
        <div class="bmap" id="bmap">

        </div>

        <div class="fault-by-info" v-if="busCompanys.length > 0">
            <span class="inner">
                <span>发起人：</span>
                <span style="padding-right: 10px;">{{currentFaultRecord.userName}} </span>
                <span> 发起时间：</span>
                <span>{{currentFaultRecord.happenTime}}</span>
            </span>
        </div>

        <div class="bus-info-panel" v-show="busCompanys.length > 0">
            <div class="title">承运公交公司信息</div>
            <div v-for="item in busCompanys" class="info-box">
                <div class="item">{{item.companyName}}</div>
                <div class="item">值班电话<span>{{item.dutyTelephone}}</span></div>
                <div class="item">负责人<span>{{item.principal}}</span> <span>{{item.principalPhone}}</span></div>
                <div class="item">联系人<span>{{item.contact}}</span> <span>{{item.contactPhone}}</span></div>
            </div>
        </div>
        
        <div class="breakImg" :class="{breakImgShow: breakImgShow}">
            <img :src="domain + img" alt="">
            <Button class="btn-close" type="ghost" shape="circle" icon="close-round" @click="breakClose"></Button>
        </div>

        <div v-if="busCompanys.length > 0" class="legend-panel" :class="{breakImgShow: breakImgShow}">
            <div class="item">
                <div class="item-legend legend-1"></div>
                <div class="item-msg">故障站点或故障区段</div>
            </div>
            <div class="item">
                <div class="item-legend legend-2"></div>
                <div class="item-msg">中断区间</div>
            </div>
            <div class="item">
                <div class="item-legend legend-3"></div>
                <div class="item-msg">上行接驳线路（开往岩内）</div>
            </div>
            <div class="item">
                <div class="item-legend legend-4"></div>
                <div class="item-msg">下行接驳线路（开往镇海路）</div>
            </div>
            <div class="item">
                <div class="item-legend legend-5"></div>
                <div class="item-msg">上行接驳站点</div>
            </div>
            <div class="item">
                <div class="item-legend legend-6"></div>
                <div class="item-msg">下行接驳站点</div>
            </div>
            <div class="item">
                <div class="item-legend legend-7"></div>
                <div class="item-msg">上行接驳出站口，闪烁为始发出站口</div>
            </div>
            <div class="item">
                <div class="item-legend legend-8"></div>
                <div class="item-msg">下行接驳出站口，闪烁为始发出站口</div>
            </div>
        </div>

        <div class="echart-panel demo-spin-col" :class="{ isshow: busCompanys.length > 0}">
            <div class="title">
                <div class="t1">进站客流分析</div>
                <div class="t2">数据更新于{{time}}</div>
            </div>
            <div ref="echart1" class="echart"></div>
            <Spin v-if="loading" fix size="large"></Spin>
        </div>

        <div class="position-left" v-if="currentFaultRecord.faultRecordId">
            <div class="login-panel">
                <div class="title">当前在线用户</div>
                <vLoginUser></vLoginUser>
            </div>

            <vBusInfo ref="busInfo" v-if="isBusRole && busCompanys.length > 0"
                      class="bus-conn-panel"
                      :busStopPositionList="busStopPositionList"
                      :faultRecordId="currentFaultRecord.faultRecordId">
                <Button style="position: absolute; top: 5px; right: 5px;" type="primary" @click="onClick_switch">{{bus_destination_showHidden? '隐藏目的地': '显示目的地'}}</Button>

            </vBusInfo>
        </div>
        
    </div>
</template>
<script>
    // import bmap_main from './js/bmap_main2';
    import Util from '../../../libs/util';
    import echarts from 'echarts';
    import DB_data from './js/databaseData';
    import MOMENT from 'moment';

    import bmap from './js/bmap/bmap';
    import vLoginUser from './LoginUser';
    import vBusInfo from './busInfo/busInfo';
    export default {
        components: {vLoginUser, vBusInfo},
        data() {
            return {
                busCompanyInfo: [],             // 承运公交信息
                busCompanys: [],
                domain: Util.staticImgUrl + '/static/img/breakimg/',  // 静态资源 路径
                img: '',                 // 故障运行交路图
                breakImgShow: false,     // 是否显示中断
                loading: false,
                stationIds: '',          // 存放当前中断区段包含站点, 用“，”分开站点Id  ps: '2,3,4'
                echart1: null,           // 图表对象
                echartData: [],
                option1: {
                    series: [{
                        name: '进站客流数据',
                        data: []
                    }]
                },

                roleList: [],            // 角色列表
                map: null,               // 百度地图对象
                Auth: null,              // 权限实例对象
                StationAndSection: null, // stationAndSection 对象
                stationAndSectionItem: {},
                breakLine: null,
                busInfo: null,
                busSupport: null,

                // 当前在线用户

                // 公交车辆安排
                // 公交可停靠位置
                busStopPositionList: [],
                // 当前故障记录
                currentFaultRecord: {
                    faultRecordId: '',
                    faultStatus: '',
                    faultStatusStr: '',
                    happenTime: '',
                    stationSectionId: '',
                    userId: ''
                },

                // 定时获取公交实时位置
                setInterval_busPosition: null,
                setInterval_loginUser: null,

                // 地图是否显示公交车的目的地
                bus_destination_showHidden: false
            };
        },
        destroyed() {
            // if (this.setInterval_busPosition) {
            //     clearInterval(this.setInterval_busPosition);
            // }
            // if (this.setInterval_loginUser) {
            //     clearInterval(this.setInterval_loginUser);
            // }
            this.setInterval_busPosition ? clearInterval(this.setInterval_busPosition) : '';
            this.setInterval_loginUser ? clearInterval(this.setInterval_loginUser) : '';
        },
        mounted() {
            this.setEchart();
            bmap(this);
        },
        watch: {
            stationAndSectionItem: {
                deep: true,
                handler(val) {
                    if (val.effectStation) {
                        this.getEchartData();
                    }
                }
            },
            echartData(val) {
                this.option1.series[0].data = [];
                //this.option1.title.text = '数据更新于' + MOMENT( val[0].insTime).format('YYYY-MM-DD HH:SS');
                val.forEach((v) => {
                    this.option1.series[0].data.push({
                        name: DB_data.stationName[v.stationId],
                        value: v.passengerFlow
                    });
                });

                this.echart1.setOption(this.option1);
            },
            bus_destination_showHidden(val) {
                val ? this.busSupport.show_text() : this.busSupport.show_hide();
            }
        },
        computed: {
            time() {
                if (this.echartData.length > 0) {
                    return MOMENT( this.echartData[0].insTime).format('YYYY-MM-DD HH:SS');
                }
                else {
                    return '';
                }
            },
            // 是否是公交角色
            isBusRole() {
                return this.Auth ? this.Auth.handleAuth('2') : false;
            }
        },
        methods:{
            breakClose() {
                this.breakImgShow = false;
            },

            // 饼图 - 初始化图表
            setEchart() {
                this.echart1 = echarts.init(this.$refs.echart1);
                var option = {
                    color: ['#88c897', '#8e81bc','#65aadd','#f3994f', '#ef857d', '#2ec7c9', '#b6a2de', '#ffb980', '#d87a80'],
                    backgroundColor: '',
                    title : {},
                    grid: {
                        top: '20%',
                        left: '10%',
                        right: '10%',
                        bottom: '5%',
                        containLabel: false
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {

                    },
                    series : [
                        {
                            name: '进站客流数据',
                            type: 'pie',
                            radius : '85%',
                            center: ['50%', '50%'],
                            label: {
                                normal: {
                                    show: true,
                                   // formatter: '{b}: {c}'
                                    position: 'inside' //outside
                                }
                            },
                            data: [],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    smooth: true
                                }
                            }
                        }
                    ]
                };
                this.echart1.setOption(option);
            },

            // 获取中断站点最近统计的进站客流量
            getEchartData() {
                var that = this;
                this.loading = true;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/passengerCount/getLastPassengerFlow',
                    params: {
                        stationIds: that.stationAndSectionItem.effectStation
                    }
                }).then(function (response) {
                    that.loading = false;

                    if (response.status === 1) {
                        that.echartData = response.result.passengerFlowList;
                    }
                    else {
                        that.echartData = [];
                    }
                }).catch(function (err) {
                    that.loading = false;
                    console.dir(err);
                });
            },

            onClick_switch() {
                this.bus_destination_showHidden = !this.bus_destination_showHidden;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .bmap-container {
        position: relative;
        width: 100%;
        height: 100%;
        user-select: none;
        min-height: 800px;
        .bmap {
            width: 100%;
            height: 100%;
            min-height: 800px;
        }

        .fault-by-info {
            position: fixed;
            z-index: 1;
            top:  87px;
            left: 0;
            right: 0;
            line-height: 40px;
            font-size: 14px;
            text-align: center;

            .inner {
                display: inline-block;
                padding: 0 16px;
                border-radius: 0 0 4px 4px;
                color: #FFF;
                background-color: #63b1e3;
            }
        }

        .breakImg {
            position: fixed;
            z-index: 2;
            bottom: -200px;
            width: 100%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            overflow-x: auto;
            overflow-y: hidden;
            background-color: #FFF;
            border-top: 2px solid #e9eaec;

            transition: bottom .3s ease-out;

            &.breakImgShow {
                bottom: 30px;
            }

            .btn-close {
                position: absolute;
                top: 10px;
                right: 20px;
                z-index: 1;
            }

            img {
                max-height: 180px;
                vertical-align: middle;
            }
        }

        .bus-info-panel {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #63b1e3;
            overflow: hidden;
            border-radius: 10px;
            .title {
                height: 36px;
                color: #FFFFFF;
                font-size: 16px;
                line-height: 36px;
                text-align: center;
            }

            .info-box{
                margin: 0 6px 3px;
                width: 240px;
                color: #3e3a39;
                font-size: 14px;
                background: #FFF;
                overflow: hidden;

                &:first-child {
                    border-radius: 10px 10px 0 0;
                }
                &:last-child {
                    border-radius: 0 0 10px 10px;
                    margin-bottom: 6px;
                }
                .item {
                    padding-left: 11px;
                    height: 29px;
                    text-align: left;
                    line-height: 29px;
                    border-bottom: 1px solid #eaeef2;
                    &:first-child{
                        font-size: 16px;
                        line-height: 35px;
                    }

                    > span {
                        padding-left: 16px;
                    }
                }
            }
        }

        .legend-panel {
            position: absolute;
            padding: 5px;
            right: 5px;
            bottom: 0px;
            width: 300px;
            height: 250px;
            background-color: rgba(255,255,255,0.8);
            border: 4px solid #63b1e3;
            border-radius: 8px;
            z-index: 1;

            .item {
                overflow: hidden;
                margin-bottom: 3px;
                .item-legend {
                    display: inline-block;
                    float: left;
                    width: 80px;
                    height: 26px;

                    &.legend-1 {
                        background: url(./images/malfunction2.png) no-repeat center;
                    }

                    &.legend-2 {
                        position: relative;

                        &:after {
                            position: absolute;
                            content: " ";
                            width: 40px;
                            height: 6px;
                            top: 10px;
                            left: 20px;
                            background-color: #f99191;
                        }
                    }
                    &.legend-3 {
                        position: relative;

                        &:after {
                            position: absolute;
                            content: " ";
                            width: 40px;
                            height: 6px;
                            top: 10px;
                            left: 20px;
                            background-color: #11a361;
                        }
                    }
                    &.legend-4 {
                        position: relative;

                        &:after {
                            position: absolute;
                            content: " ";
                            width: 40px;
                            height: 6px;
                            top: 10px;
                            left: 20px;
                            background-color: #2c9dd3;
                        }
                    }
                    &.legend-5 {
                        background: url(./images/icon2.png) no-repeat center;
                    }
                    &.legend-6 {
                        background: url(./images/icon1.png) no-repeat center;
                    }

                    &.legend-7 {
                        position: relative;

                        &:after {
                            position: absolute;
                            content: "X号口";
                            color: #FFF;
                            width: 40px;
                            height: 18px;
                            font-size: 12px;
                            line-height: 18px;
                            text-align: center;
                            top: 3px;
                            left: 20px;
                            background-color: #11a361;
                        }
                    }

                    &.legend-8 {
                        position: relative;

                        &:after {
                            position: absolute;
                            content: "X号口";
                            color: #FFF;
                            width: 40px;
                            height: 18px;
                            font-size: 12px;
                            line-height: 18px;
                            text-align: center;
                            top: 3px;
                            left: 20px;
                            background-color: #2c9dd3;
                        }
                    }
                }
                .item-msg {
                    display: inline-block;
                    float: left;
                    width: 200px;
                    font-size: 12px;
                    line-height: 26px;
                }
            }
        }

        .echart-panel {
            position: absolute;
            padding-top: 50px;
            bottom: 250px;
            right: 5px;
            width: 300px;
            height: 250px;
            background-color: rgba(255,255,255, 0.8);
            border: 4px solid #63b1e3;
            border-radius: 8px;
            z-index: 1;
            opacity: 0;

            &.isshow {
                /*left: 10px;*/
                opacity: 1;
            }

            .title {
                position: absolute;
                top: 10px;
                left: 0;
                width: 100%;
                text-align: center;
                z-index: 10;

                .t1 {
                    font-size: 16px;
                    font-weight: 700;
                }
                .t2 {
                    font-size: 12px;
                }
            }

            .echart {
                width: 100%;
                height: 150px;
            }
        }

        .position-left {
            position: absolute;
            padding-top: 50px;
            top: 20px;
            left: 5px;
            z-index: 1;

            .login-panel {
                position: relative;
                margin-bottom: 10px;
                width: 350px;
                background-color: rgba(255,255,255, 0.8);
                border: 4px solid #63b1e3;
                border-radius: 8px;

                .title {
                    /*position: absolute;*/
                    /*top: 10px;*/
                    /*left: 0;*/
                    line-height: 40px;
                    width: 100%;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    z-index: 10;
                    border-bottom: 1px solid #dcdee2;
                }
            }

            .bus-conn-panel {
                /*position: absolute;*/
                /*padding-top: 50px;*/
                /*top: 330px;*/
                /*left: 5px;*/
                width: 350px;
                background-color: rgba(255,255,255, 0.8);
                border: 4px solid #63b1e3;
                border-radius: 8px;
                z-index: 1;
            }
        }


    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .bmap-container {

        // 去掉百度地图Logo
        .anchorBL {
            display: none;
        }
    }
</style>