<template>
    <div class="tablePanel-container">
        <Tabs type="card" :animated="false">
            <TabPane label="进站客流">
                <Table class="myTableIview" :data="tableDataIn" :columns="tableColumns" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane label="出站客流">
                <Table class="myTableIview" :data="tableDataOut" :columns="tableColumns" :height="tableHeight" border></Table>
            </TabPane>
        </Tabs>
        <!--<Table class="myTableIview" border stripe :columns="tableColumnsUp" :data="tableDataUp" :height="tableHeight"></Table>-->
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    export default{
        data() {
            var that = this;
            return {
                tableDim: 'day',
                tableHeight: 330,
                tableColumns: [
                    {
                        type: 'index',
                        width: 30,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '时期',
                        key: 'insTime',
                        width: 90,
                        align: 'center',
                        render(h, params) {
                            if (that.tableDim == 'day' && that.timeFrame == 'allDay') {
                                return h('a', {
                                    attrs: {
                                        href: Util.domain + params.row['localUrl'],
                                        target: '_blank',
                                        title: '交通局每日报送材料_' + params.row[params.column.key]
                                    }
                                }, params.row[params.column.key]);
                            }
                            else {
                                return h('span', params.row[params.column.key]);
                            }
                        }
                    },
                    {
                        title: '镇海路站',
                        key: '1',
                        align: 'center'
                    },
                    {
                        title: '中山公园站',
                        key: '2',
                        align: 'center'
                    },
                    {
                        title: '将军祠站',
                        key: '3',
                        align: 'center'
                    },
                    {
                        title: '文灶站',
                        key: '4',
                        align: 'center'
                    },
                    {
                        title: '湖滨东路站',
                        key: '5',
                        align: 'center'
                    },
                    {
                        title: '莲坂站',
                        key: '6',
                        align: 'center'
                    },
                    {
                        title: '莲花路口站',
                        key: '7',
                        align: 'center'
                    },
                    {
                        title: '吕厝站',
                        key: '8',
                        align: 'center'
                    },
                    {
                        title: '乌石浦站',
                        key: '9',
                        align: 'center'
                    },
                    {
                        title: '塘边站',
                        key: '10',
                        align: 'center'
                    },
                    {
                        title: '火炬园站',
                        key: '11',
                        align: 'center'
                    },
                    {
                        title: '殿前站',
                        key: '12',
                        align: 'center'
                    },
                    {
                        title: '高崎站',
                        key: '13',
                        align: 'center'
                    },
                    {
                        title: '集美学村站',
                        key: '14',
                        align: 'center'
                    },
                    {
                        title: '园博苑站',
                        key: '15',
                        align: 'center'
                    },
                    {
                        title: '杏林村站',
                        key: '16',
                        align: 'center'
                    },
                    {
                        title: '杏锦路站',
                        key: '17',
                        align: 'center'
                    },
                    {
                        title: '官任站',
                        key: '18',
                        align: 'center'
                    },
                    {
                        title: '诚毅广场站',
                        key: '19',
                        align: 'center'
                    },
                    {
                        title: '集美软件园',
                        key: '20',
                        align: 'center'
                    },
                    {
                        title: '集美大道',
                        key: '21',
                        align: 'center'
                    },
                    {
                        title: '天水路',
                        key: '22',
                        align: 'center'
                    },
                    {
                        title: '厦门北站',
                        key: '23',
                        align: 'center'
                    },
                    {
                        title: '岩内',
                        key: '24',
                        width: 40,
                        align: 'center',
                        renderHeader(h, params) {
                            return h('span', {
                                style: {
                                    paddingRight: '11px'
                                }
                            }, '岩内');
                        }
                    }

                ],
                tableDataIn: [],
                tableDataOut: [],
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
            },
            timeFrame: {
                type: String,
                default() {
                    return 'allDay';
                }
            }
        },
        watch: {
            dates(val, valOld) {
                this.tableDim = this.dim;
                this.getDataTable();
            },
            timeFrame(val) {
                this.tableDim = this.dim;
                this.getDataTable();
            }
        },
        mounted() {
            this.tableDim = this.dim;
            this.getDataTable();
        },
        methods: {
            getDataTable() {
                var that = this;
                this.$Spin.show();
                Util.ajax({
                    method: "get",
                    url: '/xm/inte/passengerAnalysis/getPassengerIndex',
                    params: {
                        beginDate: that.dates[0],
                        endDate: that.dates[1],
                        type: that.dim,
                        timeType: that.timeFrame
                    }
                }).then(function(response){
                    that.$Spin.hide();
                    if (response.status === 1) {
                        that.tableDataIn = response.result.inPassengerIndexList;
                        that.tableDataOut = response.result.outPassengerIndexList;
                    }
                    else {}
                }).catch(function (error) {
                    that.$Spin.hide();
                    console.log(error);
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
<style lang="scss" rel="stylesheet/scss">


    .tablePanel-container {
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
        .table-row-text-green {
            color: #28a868;
        }
        .table-row-text-blue {
            color: #3980c3;
        }

        // 更改表格样式
        .ivu-table-wrapper {
            border: 1px solid #b9b8b8;
            border-bottom: 0;
            border-right: 0;
        }

        .ivu-table {
            &:after {
                background-color: #b9b8b8;
            }

            &:before {
                background-color: #b9b8b8;
            }

            th {
                background-color: #f7f7f7;

                .ivu-table-cell {
                    padding: 0;
                }
            }
            td {
                background-color: #f7f7f7;
                height: 29px;
                .ivu-table-cell {
                    padding: 0;
                }
            }
        }

        .ivu-table-border {
            th {
                border-right: 1px solid #dadbdb;
                border-bottom: 1px solid #dadbdb;
            }
            td {
                border-right: 1px solid #dadbdb;
                border-bottom: 1px solid #dadbdb;
            }

        }
    }



</style>