<template>
    <div class="infoTable-container" :style="{height: height + 'px'}">
        <div class="btn-panel">
            <div class="btn-com btn-up" :class="upOrDownTable ? 'active': ''" @click="upTable()"><span>上</span><span>行</span></div>
            <div class="btn-com btn-down" :class="upOrDownTable ? '': 'active'" @click="downTable()"><span>下</span><span>行</span></div>
        </div>
        <div class="table-box" v-if="upOrDownTable">
            <Table class="myTableIview" border stripe :columns="tableColumnsUp" :height="tableHeight" :data="tableDataUp"></Table>
        </div>
        <div class="table-box" v-if="!upOrDownTable">
            <Table class="myTableIview" border stripe :columns="tableColumnsDown" :height="tableHeight" :data="tableDataDown"></Table>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import MOMENT from  'moment';
    export default {
        data () {
            var that = this;
            return {
                setTimeOutInfoPanelDataTime: 30000,
                setTimeOutInfoPanelData: null,
                tabsActive: true,
                upOrDownTable: true,  // 默认展示上行表格
                tableHeight: '0',
                tableColumnsUp: [
                    {
                        type: 'index',
                        width: 30,
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

                        key: 'status',
                        align: 'center',
                        render(h, params) {
                            var value = '', clsName = '';

                            switch(params.row.status) {
                                case -1: value = '未发班'; clsName = ''; break;
                                case 0: value = '运行中'; clsName = 'table-row-text-blue'; break;
                                case 1: value = '已完成'; clsName = 'table-row-text-green'; break;
                            }
                            return h('span', {
                                "class": clsName
                            }, value);
                        }
                    },
                    {
                        title: '镇海路站',
                        key: '1',
                        align: 'center',
                        render(h, params) {
//                            if (!params.row['1']) { return '- -';}

                            return that.morningTrain(h, params, '1');
                        }
                    },
                    {
                        title: '中山公园站',
                        key: '2',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '2');
                        }
                    },
                    {
                        title: '将军祠站',
                        key: '3',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '3');
                        }
                    },
                    {
                        title: '文灶站',
                        key: '4',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '4');
                        }
                    },
                    {
                        title: '湖滨东路站',
                        key: '5',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '5');
                        }
                    },
                    {
                        title: '莲坂站',
                        key: '6',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '6');
                        }
                    },
                    {
                        title: '莲花路口站',
                        key: '7',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '7');
                        }
                    },
                    {
                        title: '吕厝站',
                        key: '8',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '8');
                        }
                    },
                    {
                        title: '乌石浦站',
                        key: '9',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '9');
                        }
                    },
                    {
                        title: '塘边站',
                        key: '10',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '10');
                        }
                    },
                    {
                        title: '火炬园站',
                        key: '11',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '11');
                        }
                    },
                    {
                        title: '殿前站',
                        key: '12',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '12');
                        }
                    },
                    {
                        title: '高崎站',
                        key: '13',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '13');
                        }
                    },
                    {
                        title: '集美学村站',
                        key: '14',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '14');
                        }
                    },
                    {
                        title: '园博苑站',
                        key: '15',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '15');
                        }
                    },
                    {
                        title: '杏林村站',
                        key: '16',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '16');
                        }
                    },
                    {
                        title: '杏锦路站',
                        key: '17',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '17');
                        }
                    },
                    {
                        title: '官任站',
                        key: '18',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '18');
                        }
                    },
                    {
                        title: '诚毅广场站',
                        key: '19',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '19');
                        }
                    },
                    {
                        title: '集美软件园',
                        key: '20',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '20');
                        }
                    },
                    {
                        title: '集美大道',
                        key: '21',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '21');
                        }
                    },
                    {
                        title: '天水路',
                        key: '22',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '22');
                        }
                    },
                    {
                        title: '厦门北站',
                        key: '23',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '23');
                        }
                    },
                    {
                        title: '岩内',
                        key: '24',
                        align: 'center',
                        width: 40,
                        render(h, params) {
                            return that.morningTrain(h, params, '24');
                        }
                    }

                ],
                tableColumnsDown: [
                    {
                        type: 'index',
                        width: 30,
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
                        key: 'status',
                        align: 'center',
                        render(h, params) {
                            var value = '', clsName = '';

                            switch(params.row.status) {
                                case -1: value = '未发班'; clsName = ''; break;
                                case 0: value = '运行中'; clsName = 'table-row-text-blue'; break;
                                case 1: value = '已完成'; clsName = 'table-row-text-green'; break;
                            }
                            return h('span', {
                                "class": clsName
                            }, value);
                        }
                    },
                    {
                        title: '岩内',
                        key: '24',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '24');
                        }
                    },
                    {
                        title: '厦门北站',
                        key: '23',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '23');
                        }
                    },
                    {
                        title: '天水路',
                        key: '22',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '22');
                        }
                    },
                    {
                        title: '集美大道',
                        key: '21',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '21');
                        }
                    },
                    {
                        title: '集美软件园',
                        key: '20',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '20');
                        }
                    },
                    {
                        title: '诚毅广场站',
                        key: '19',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '19');
                        }
                    },
                    {
                        title: '官任站',
                        key: '18',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '18');
                        }
                    },
                    {
                        title: '杏锦路站',
                        key: '17',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '17');
                        }
                    },
                    {
                        title: '杏林村站',
                        key: '16',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '16');
                        }
                    },
                    {
                        title: '园博苑站',
                        key: '15',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '15');
                        }
                    },
                    {
                        title: '集美学村站',
                        key: '14',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '14');
                        }
                    },
                    {
                        title: '高崎站',
                        key: '13',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '13');
                        }
                    },
                    {
                        title: '殿前站',
                        key: '12',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '12');
                        }
                    },
                    {
                        title: '火炬园站',
                        key: '11',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '11');
                        }
                    },
                    {
                        title: '塘边站',
                        key: '10',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '10');
                        }
                    },
                    {
                        title: '乌石浦站',
                        key: '9',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '9');
                        }
                    },
                    {
                        title: '吕厝站',
                        key: '8',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '8');
                        }
                    },
                    {
                        title: '莲花路口站',
                        key: '7',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '7');
                        }
                    },
                    {
                        title: '莲坂站',
                        key: '6',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '6');
                        }
                    },
                    {
                        title: '湖滨东路站',
                        key: '5',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '5');
                        }
                    },
                    {
                        title: '文灶站',
                        key: '4',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '4');
                        }
                    },
                    {
                        title: '将军祠站',
                        key: '3',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '3');
                        }
                    },
                    {
                        title: '中山公园站',
                        key: '2',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '2');
                        }
                    },
                    {
                        title: '镇海路站',
                        key: '1',
                        align: 'center',
                        width: 40,
                        render(h, params) {
                            return that.morningTrain(h, params, '1');
                        }
                    }

                ],
                tableDataUp: [
                    {
                        trainId: '00101',
                        state: '0',
                        "24": '2018-01-01 07:30|2018-01-01 07:32',
                        "23": '2018-01-01 08:08|2018-01-01 07:25',
                        "22": '2018-01-01 09:08|2018-01-01 09:08',
                        "21": '2018-01-01 09:08'
                    },
                    {
                        trainId: '00102',
                        state: '1',
                        "24": '2018-01-01 07:30',
                        "23": '2018-01-01 08:08',
                        "22": '2018-01-01 09:08',
                        "21": '2018-01-01 09:08'
                    },
                    {
                        trainId: '00103',
                        state: '2',
                        "24": '2018-01-01 07:30',
                        "23": '2018-01-01 08:08',
                        "22": '2018-01-01 09:08',
                        "21": '2018-01-01 09:08'
                    },
                    {
                        trainId: '00104',
                        state: '2',
                        "24": '2018-01-01 07:30',
                        "23": '2018-01-01 08:08',
                        "22": '2018-01-01 09:08',
                        "21": '2018-01-01 09:08'
                    },
                    {
                        trainId: '00105',
                        state: '2',
                        "24": '2018-01-01 07:30',
                        "23": '2018-01-01 08:08',
                        "22": '2018-01-01 09:08',
                        "21": '2018-01-01 09:08'
                    }
                ],
                tableDataDown: [
                    {
                        trainId: '00502',
                        state: '0',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08',
                        jimeiruanjianyuan: '09:08'
                    },
                    {
                        trainId: '00102',
                        state: '1',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08',
                        jimeiruanjianyuan: '09:08'
                    },
                    {
                        trainId: '00103',
                        state: '2',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08',
                        jimeiruanjianyuan: '09:08'
                    },
                    {
                        trainId: '00104',
                        state: '2',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08',
                        jimeiruanjianyuan: '09:08'
                    },
                    {
                        trainId: '00105',
                        state: '2',
                        yanNei: '07:30',
                        xiamenbei: '08:08',
                        tianshuilu: '09:08',
                        jimeiruanjianyuan: '09:08'
                    }
                ],
                upTrainPosition: {}
            }
        },
        props: {
            height: {
                type: Number,
                default() {
                    return 226;
                }
            }
        },
        watch: {
            height(val, valOld) {
                this.tableHeight = val;
            }
        },
        beforeDestroy() {
            if (this.setTimeOutInfoPanelData) {
                clearTimeout(this.setTimeOutInfoPanelData);
            }
        },
        mounted() {

            this.tableHeight = document.querySelector('.infoTable-container').clientHeight;

            this.getTrainRun();
        },
        methods: {
            upTable() {
                this.upOrDownTable = true;
            },
            downTable() {
                this.upOrDownTable = false;
            },

            morningTrain(h, params, key, type) {
                //var type = '0';
                // 如果没有值

                var value, value1, value2;
                var hh1, hh2, mm1, mm2, mVal = 0;
                if (!params.row[key]) {
                    return '- -';
                }
                else {
                    value = params.row[key];
                }

                value1 = value.split('|')[0];
                value2 = value.split('|')[1] || '';

                if (value2 == '') {
                    return MOMENT(value1).format('hh:mm');
                }
                else {
                    hh1 = MOMENT(value1).hour();
                    mm1 = MOMENT(value1).minute();
                    hh2 = MOMENT(value2).hour();
                    mm2 = MOMENT(value2).minute();

                    mVal = (hh2 - hh1) * 60 + (mm2 - mm1);
                }

                if (mVal < 0) { // 早点
                    return h('span', {
                        'class': 'row-complete'
                    }, [MOMENT(value1).format('hh:mm'), h('span', {
                        'class': 'random-error'
                    }, mVal)]);
                }
                else if (mVal > 0){
                    return h('span', {
                        'class': 'row-complete'
                    }, [MOMENT(value1).format('hh:mm'), h('span', {
                        'class': 'random-error'
                    }, '+' + mVal)]);
                }
                else {
                    return h('span',
                             {'class': 'row-complete'},
                             [MOMENT(value1).format('hh:mm'), h('span',{ 'class': 'icon-complete'})]
                            );
                }
            },

            // 获取
            getTrainRun() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/runCount/getPlanAndActualRunInfo',
                    data: {}
                }).then(function(response){
                    if (response.status === 1) {
                        that.tableDataUp = response.result.upPlanAndActual;
                        that.tableDataDown = response.result.downPlanAndActual;
                    }
                    else {}

                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getTrainRun();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    console.log(error);
                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getTrainRun();
                    }, that.setTimeOutInfoPanelDataTime);
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .infoTable-container {
        position: relative;
        width: 100%;
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
            background-color: #dfdddb;
            .btn-com {
                position: relative;
                width: 33px;
                height: 50%;
                color: #495060;
                text-align: center;
                cursor: pointer;
                background-color: #FFF;
                border: 1px solid #b9b8b8;
                border-right: 0;
                /*border-radius: 10px 0 0 10px;*/

                &.btn-up {
                    border-bottom: 0;
                    &.active{
                        color: #FFF;
                        background-color: #3da088;

                        &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            right: -1px;
                            width: 1px;
                            background-color: #3da088;
                        }
                    }
                }
                &.btn-down {

                    &.active {
                        color: #FFF;
                        background-color: #f39950;

                        &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            right: -1px;
                            width: 1px;
                            background-color: #f39950;
                        }
                    }
                }
                &.active {
                    z-index: 1;
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
            overflow-y: auto;
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
            margin-left: 0px;
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
                //background-color: #f7f7f7;
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