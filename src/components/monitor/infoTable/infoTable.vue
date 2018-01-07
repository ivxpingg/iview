<template>
    <div class="infoTable-container">
        <div class="btn-panel">
            <div class="btn-com btn-up"><span>上</span><span>行</span></div>
            <div class="btn-com btn-down"><span>下</span><span>行</span></div>
        </div>
        <div class="table-box">
            <Table border stripe :columns="tableColumns" :data="tableData"></Table>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data () {
            var that = this;
            return {
                tableColumns: [
                    {
                        type: 'index',
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '车次号',
                        key: 'trainId',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        align: 'center',
                        render(h, params) {
                            var value = '', clsName = '';

                            switch(params.row.state) {
                                case '0': value = '未发班'; clsName = ''; break;
                                case '1': value = '运行中'; clsName = 'table-row-text-blue'; break;
                                case '2': value = '已完成'; clsName = 'table-row-text-green'; break;
                            }
                            return h('span', {
                                "class": clsName
                            }, value);
                        }
                    },
                    {
                        title: '岩内',
                        key: 'yanNei',
                        align: 'center',
                        render(h, params) {

                            return that.morningTrain(h, params, 'yanNei', '2');
                        }
                    },
                    {
                        title: '厦门北站',
                        key: 'xiamenbei',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, 'xiamenbei', '1');
                        }
                    },
                    {
                        title: '天水路',
                        key: 'tianshuilu',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, 'tianshuilu', '0');
                        }
                    }
                ],
                tableData: [
                    {
                        trainId: '00101',
                        state: '0',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08'
                    },
                    {
                        trainId: '00102',
                        state: '1',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08'
                    },
                    {
                        trainId: '00103',
                        state: '2',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08'
                    }
                ]
            }
        },
        mounted() {},
        methods: {

            morningTrain(h, params, key, type) {
                //var type = '0';

                if (type == '0') { // 早点
                    return h('span', {
                        'class': 'row-complete'
                    }, [params.row[key], h('span', {
                        'class': 'random-error'
                    }, '-2')]);
                }
                else if (type == '1'){
                    return h('span', {
                        'class': 'row-complete'
                    }, [params.row[key], h('span', {
                        'class': 'random-error'
                    }, '+5')]);
                }
                else {
                    return h('span',
                             {'class': 'row-complete'},
                             [params.row[key], h('span',{ 'class': 'icon-complete'})]
                            );
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .infoTable-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 226px;

        .btn-panel {
            position: absolute;
            box-sizing: border-box;
            top: 0;
            left: 0;
            bottom: 0;
            width: 33px;
            height: 100%;
            color: #FFF;
            font-size: 16px;

            .btn-com {
                position: relative;
                width: 33px;
                height: 50%;
                text-align: center;

                &.btn-up {
                    background-color: #f39950;
                }
                &.btn-down {
                    background-color: #3da088;
                }
                span:first-child {
                    position: absolute;
                    left: 0;
                    top: 25%;
                    margin-top: -6px;
                    display: inline-block;
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                }

                span:last-child {
                    position: absolute;
                    left: 0;
                    bottom: 25px;
                    margin-bottom: -6px;
                    display: inline-block;
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                }
            }


        }

        .table-box {
            position: absolute;
            top: 0;
            right: 0;
            left: 33px;
            bottom: 0;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .row-complete {
        line-height: 20px;
        display: inline-block;
        height: 20px;
        font-size: 12px;

        .icon-complete {
            display: inline-block;
            width: 11px;
            height: 11px;
            margin-left: 5px;
            background: url(./images/tick.png) no-repeat;
            background-position: center;
            vertical-align: middle;
        }
        .random-error {
            margin-left: 5px;
            color: red;
        }
    }

    .table-box {

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
            }
            td {
                background-color: #f7f7f7;
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