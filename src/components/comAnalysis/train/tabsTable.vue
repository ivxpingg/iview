<template>
    <div class="tabsTable-container">
        <Tabs type="card" :animated="false">
            <TabPane label="行车指标">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'指标记录(' + tableData2Count + ')'">
                <Table class="myTableIview" :data="tableData6" :columns="columns2" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'运营事件(' + tableData3Count + ')'">
                <Table class="myTableIview" :data="tableData6" :columns="columns3" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane :label="'其它事项(' + tableData4Count + ')'">
                <Table class="myTableIview" :data="tableData6" :columns="columns3" :height="tableHeight" border></Table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
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
                        key: 'date',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '总开行列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '计划列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '实际列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '兑现率',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '正点列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '晚点列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '2-5分晚点',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '5分及以上晚点',
                        key: 'col1',
                        align: 'center',
                        renderHeader(h, params) {
                            return [h('span','5分及'),h('br'), h('span','以上晚点')];
                        }
                    },
                    {
                        title: '正点率',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '加开列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '抽线列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '清客列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '救援列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '下线列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '运营列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '载客列次',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '空驶列次',
                        key: 'col1',
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
                        key: 'date',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '列次类型',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '车次（车底）',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '开行区段',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '载客/空驶',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '晚点时分',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '下线地点',
                        key: 'col1',
                        align: 'center'
                    },
                    {
                        title: '原因/备注',
                        key: 'col1',
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
                        key: 'date',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '概述',
                        key: 'col1',
                        align: 'center'
                    }
                ],

                tableData1: [
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    }],
                tableData2: [],
                tableData3: [],
                tableData4: [],
                tableData6: [
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    },
                    {
                        date: '2018-01-01',
                        col1: '25'
                    }],
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
        mounted() {},
        methods: {

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