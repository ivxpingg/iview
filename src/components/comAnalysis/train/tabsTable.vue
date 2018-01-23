<template>
    <div class="tabsTable-container">
        <Tabs type="card" :animated="false">
            <TabPane label="行车指标">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'指标记录(' + tableData2Count + ')'">
                <Table class="myTableIview" :data="tableData2" :columns="columns2" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'运营事件(' + tableData3Count + ')'">
                <Table class="myTableIview" :data="tableData3" :columns="columns3" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'其它事项(' + tableData4Count + ')'">
                <Table class="myTableIview" :data="tableData4" :columns="columns4" :height="tableHeight" border></Table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                tableHeight: 330,
                columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '日期',
                        key: 'insTime',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '总开行列次',
                        key: 'totalTrainNum',
                        align: 'center'
                    },
                    {
                        title: '计划列次',
                        key: 'planTrainNum',
                        align: 'center'
                    },
                    {
                        title: '实际列次',
                        key: 'actualTrainNum',
                        align: 'center'
                    },
                    {
                        title: '兑现率',
                        key: 'fulfillmentRate',
                        align: 'center'
                    },
                    {
                        title: '正点列次',
                        key: 'onTime',
                        align: 'center'
                    },
                    {
                        title: '晚点列次',
                        key: 'lateTime',
                        align: 'center'
                    },
                    {
                        title: '2-5分晚点',
                        key: 'twoToFiveLate',
                        align: 'center'
                    },
                    {
                        title: '5分及以上晚点',
                        key: 'overFiveLate',
                        align: 'center',
                        renderHeader(h, params) {
                            return [h('span','5分及'),h('br'), h('span','以上晚点')];
                        }
                    },
                    {
                        title: '正点率',
                        key: 'onTimeRate',
                        align: 'center'
                    },
                    {
                        title: '加开列次',
                        key: 'addTrain',
                        align: 'center'
                    },
                    {
                        title: '抽线列次',
                        key: 'pumpLineTrain',
                        align: 'center'
                    },
                    {
                        title: '清客列次',
                        key: 'cleanTrain',
                        align: 'center'
                    },
                    {
                        title: '救援列次',
                        key: 'saveTrain',
                        align: 'center'
                    },
                    {
                        title: '下线列次',
                        key: 'offlineTrain',
                        align: 'center'
                    },
                    {
                        title: '运营列次',
                        key: 'operateMile',
                        align: 'center'
                    },
                    {
                        title: '载客里程',
                        key: 'carryMile',
                        align: 'center'
                    },
                    {
                        title: '空驶里程',
                        width: 80,
                        key: 'notCarryMile',
                        align: 'center'
                    }],
                columns2: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '时间',
                        key: 'insTime',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '列次类型',
                        key: 'trainType',
                        align: 'center'
                    },
                    {
                        title: '车次（车底）',
                        key: 'trainNumber',
                        align: 'center'
                    },
                    {
                        title: '开行区段',
                        key: 'sectionName',
                        align: 'center'
                    },
                    {
                        title: '载客/空驶',
                        key: 'carryOrNot',
                        align: 'center'
                    },
                    {
                        title: '晚点时分',
                        key: 'lateTime',
                        align: 'center'
                    },
                    {
                        title: '下线地点',
                        key: 'offlinePlace',
                        align: 'center'
                    },
                    {
                        title: '原因/备注',
                        key: 'remark',
                        width: 200,
                        align: 'center'
                    }
                ],
                columns3: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '时间',
                        key: 'insTime',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '概述',
                        key: 'description',
                        align: 'center'
                    }
                ],
                columns4: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '时间',
                        key: 'insTime',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '概述',
                        key: 'description',
                        align: 'center'
                    }
                ],

                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: []
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
                this.getData1();
                this.getData2();
                this.getData3();
                this.getData4();
            }
        },
        computed: {
            tableData2Count() {
                return this.tableData2.length;
            },
            tableData3Count() {
                return this.tableData3.length;
            },
            tableData4Count() {
                return this.tableData4.length;
            }
        },
        mounted() {
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
        },
        methods: {
            getData1() {
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
                        that.tableData1 = response.result.driveIndexList;
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
                    url: '/xm/inte/driveAnalysis/getIndexRecord',
                    params: {
                        beginDate: this.dates[0],
                        endDate: this.dates[1],
                        type: this.dim
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.tableData2 = response.result.indexRecordList;
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
                    url: '/xm/inte/driveAnalysis/getOperateEvent',
                    params: {
                        beginDate: this.dates[0],
                        endDate: this.dates[1],
                        type: this.dim
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.tableData3 = response.result.operateEventList;
                    }
                    else {}
                }).catch(function (error) {
                    console.log(error);
                })
            },
            getData4() {
                var that = this;


                Util.ajax({
                    method: "get",
                    url: '/xm/inte/driveAnalysis/getOperateEvent',
                    params: {
                        beginDate: this.dates[0],
                        endDate: this.dates[1],
                        type: this.dim
                    }
                }).then(function(response){
                    if (response.status === 1) {
                        that.tableData4 = response.result.operateEventList;
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

</style>
<style lang="scss" rel="stylesheet/scss">
    .tabsTable-container {
         height: 372px;
        .ivu-tabs-nav{
            float: right;
        }

        .ivu-tabs-bar {
            margin-bottom: 10px;
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
</style>
