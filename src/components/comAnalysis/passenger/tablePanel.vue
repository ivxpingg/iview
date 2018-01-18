<template>
    <div class="tablePanel-container">
        <Tabs type="card" :animated="false">
            <TabPane label="进站客流">
                <Table class="myTableIview" :data="tableDataUp" :columns="tableColumnsUp" :height="tableHeight" border></Table>
            </TabPane>
            <TabPane label="出站客流">
                <Table class="myTableIview" :data="tableDataUp" :columns="tableColumnsUp" :height="tableHeight" border></Table>
            </TabPane>
        </Tabs>
        <!--<Table class="myTableIview" border stripe :columns="tableColumnsUp" :data="tableDataUp" :height="tableHeight"></Table>-->
    </div>
</template>
<script>
    export default{
        data() {
            return {
                tableHeight: 330,
                tableColumnsUp: [
                    {
                        type: 'index',
                        width: 30,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '时期',
                        key: 'date',
                        width: 90,
                        align: 'center'
                    },
                    {
                        title: '镇海路站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '中山公园站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '将军祠站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '文灶站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '湖滨东路站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '莲坂站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '莲花路口站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '吕厝站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '乌石浦站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '塘边站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '火炬园站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '殿前站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '高崎站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '集美学村站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '园博苑站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '杏林村站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '杏锦路站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '官任站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '诚毅广场站',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '集美软件园',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '集美大道',
                        key: 'jimeiruanjianyuan',
                        align: 'center'
                    },
                    {
                        title: '天水路',
                        key: 'tianshuilu',
                        align: 'center'
                    },
                    {
                        title: '厦门北站',
                        key: 'xiamenbei',
                        align: 'center'
                    },
                    {
                        title: '岩内',
                        key: 'yanNei',
                        align: 'center'
                    }

                ],
                tableDataUp: [
                    {
                        trainId: '00101',
                        date: '2018-10-01',
                        yanNei: '200',
                        xiamenbei: '150',
                        tianshuilu: '33',
                        jimeiruanjianyuan: '345'
                    },
                    {
                        trainId: '00102',
                        date: '2018-10-02',
                        yanNei: '200',
                        xiamenbei: '150',
                        tianshuilu: '33',
                        jimeiruanjianyuan: '345'
                    },
                    {
                        trainId: '00103',
                        date: '2018-10-03',
                        yanNei: '200',
                        xiamenbei: '150',
                        tianshuilu: '33',
                        jimeiruanjianyuan: '345'
                    },
                    {
                        trainId: '00104',
                        date: '2018-10-04',
                        yanNei: '200',
                        xiamenbei: '150',
                        tianshuilu: '33',
                        jimeiruanjianyuan: '345'
                    },
                    {
                        trainId: '00105',
                        date: '2018-10-05',
                        yanNei: '200',
                        xiamenbei: '150',
                        tianshuilu: '33',
                        jimeiruanjianyuan: '345'
                    }
                ]
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
            margin-right: 18px;
            height: 26px;
            padding: 0 16px;
            line-height: 26px;
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
                height: 37px;
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