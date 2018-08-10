<template>
    <div class="infoTable-container" :style="{height: height + 'px'}">
        <div class="btn-panel">
            <div class="btn-com btn-up" :class="upOrDownTable ? 'active': ''" @click="upTable()"><span>上</span><span>行</span></div>
            <div class="btn-com btn-down" :class="upOrDownTable ? '': 'active'" @click="downTable()"><span>下</span><span>行</span></div>
        </div>
        <div class="table-box" v-show="upOrDownTable">
            <Table ref="tableUp" class="myTableIview" :no-data-text="noDataText_table" border stripe :columns="tableColumnsUp"  :loading="loading" :height="tableHeight" :data="tableDataUp"></Table>
        </div>
        <div class="table-box" v-show="!upOrDownTable">
            <Table ref="tableDown" class="myTableIview" :no-data-text="noDataText_table" border stripe :columns="tableColumnsDown" :loading="loading" :height="tableHeight" :data="tableDataDown"></Table>
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
                tableHeight: 0,
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
                                case 2: value = '待确认'; clsName = 'table-row-text-gray'; break;
                            }
                            return h('span', {
                                "class": clsName
                            }, value);
                        }
                    },
                    {
                        title: '镇海路',
                        key: '1',
                        align: 'center',
                        render(h, params) {
//                            if (!params.row['1']) { return '- -';}

                            return that.morningTrain(h, params, '1');
                        }
                    },
                    {
                        title: '中山公园',
                        key: '2',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '2');
                        }
                    },
                    {
                        title: '将军祠',
                        key: '3',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '3');
                        }
                    },
                    {
                        title: '文灶',
                        key: '4',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '4');
                        }
                    },
                    {
                        title: '湖滨东路',
                        key: '5',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '5');
                        }
                    },
                    {
                        title: '莲坂',
                        key: '6',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '6');
                        }
                    },
                    {
                        title: '莲花路口',
                        key: '7',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '7');
                        }
                    },
                    {
                        title: '吕厝',
                        key: '8',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '8');
                        }
                    },
                    {
                        title: '乌石浦',
                        key: '9',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '9');
                        }
                    },
                    {
                        title: '塘边',
                        key: '10',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '10');
                        }
                    },
                    {
                        title: '火炬园',
                        key: '11',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '11');
                        }
                    },
                    {
                        title: '殿前',
                        key: '12',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '12');
                        }
                    },
                    {
                        title: '高崎',
                        key: '13',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '13');
                        }
                    },
                    {
                        title: '集美学村',
                        key: '14',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '14');
                        }
                    },
                    {
                        title: '园博苑',
                        key: '15',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '15');
                        }
                    },
                    {
                        title: '杏林村',
                        key: '16',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '16');
                        }
                    },
                    {
                        title: '杏锦路',
                        key: '17',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '17');
                        }
                    },
                    {
                        title: '官任',
                        key: '18',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '18');
                        }
                    },
                    {
                        title: '诚毅广场',
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
                        width: 60,
                        renderHeader(h, params) {
                            return h('span', {
                                style: {
                                    paddingRight: '11px'
                                }
                            }, '岩内');
                        },
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
                                case 2: value = '待确认'; clsName = 'table-row-text-gray'; break;
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
                        title: '厦门北',
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
                        title: '诚毅广场',
                        key: '19',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '19');
                        }
                    },
                    {
                        title: '官任',
                        key: '18',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '18');
                        }
                    },
                    {
                        title: '杏锦路',
                        key: '17',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '17');
                        }
                    },
                    {
                        title: '杏林村',
                        key: '16',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '16');
                        }
                    },
                    {
                        title: '园博苑',
                        key: '15',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '15');
                        }
                    },
                    {
                        title: '集美学村',
                        key: '14',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '14');
                        }
                    },
                    {
                        title: '高崎',
                        key: '13',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '13');
                        }
                    },
                    {
                        title: '殿前',
                        key: '12',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '12');
                        }
                    },
                    {
                        title: '火炬园',
                        key: '11',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '11');
                        }
                    },
                    {
                        title: '塘边',
                        key: '10',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '10');
                        }
                    },
                    {
                        title: '乌石浦',
                        key: '9',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '9');
                        }
                    },
                    {
                        title: '吕厝',
                        key: '8',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '8');
                        }
                    },
                    {
                        title: '莲花路口',
                        key: '7',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '7');
                        }
                    },
                    {
                        title: '莲坂',
                        key: '6',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '6');
                        }
                    },
                    {
                        title: '湖滨东路',
                        key: '5',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '5');
                        }
                    },
                    {
                        title: '文灶',
                        key: '4',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '4');
                        }
                    },
                    {
                        title: '将军祠',
                        key: '3',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '3');
                        }
                    },
                    {
                        title: '中山公园',
                        key: '2',
                        align: 'center',
                        render(h, params) {
                            return that.morningTrain(h, params, '2');
                        }
                    },
                    {
                        title: '镇海路',
                        key: '1',
                        align: 'center',
                        width: 60,
                        renderHeader(h, params) {
                            return h('span', {
                                style: {
                                    paddingRight: '11px'
                                }
                            }, '镇海路');
                        },
                        render(h, params) {
                            return that.morningTrain(h, params, '1');
                        }
                    }

                ],
                tableDataUp: [],
                tableDataDown: [],

                watchTableDataUp: [],
                watchTableDataDown: [],

                upTrainPosition: {},
                loading: true,
                noDataText_table: '加载中...'
            }
        },
        props: {
            height: {
                type: Number,
                default() {
                    return 286;
                }
            }
        },
        watch: {
            height(val, valOld) {
                this.tableHeight = val;
            },
            watchTableDataUp(val, valOld) {
                try {
                    if (valOld.length == 0) {
                        this.tableDataUp = val;
                    }
                    else {
                        this.updateTable(val, valOld, this.$refs.tableUp.$el, 'up');
                    }
                } catch (e) {
                    console.dir(e);
                }
            },
            watchTableDataDown(val, valOld) {
                try {
                    if (valOld.length == 0) {
                        this.tableDataDown = val;
                    }
                    else {
                        this.updateTable(val, valOld, this.$refs.tableDown.$el, 'down');
                    }
                } catch (e) {
                    console.dir(e);
                }
            },
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

            updateTable(val, valOld, tableDom, direction) {
                var x = 0, // 表格第几行
                    y = 0; // 表格第几列

                var keyInt = 0,
                    cellText = '';

                // 测试
                // valOld = val;

                val.forEach((v, idx, array) => {
                    x = idx;
                    if (v.status != valOld[idx].status) {
                        y = 2;
                        switch(v.status) {
                            case -1: cellText = '<span>未发班</span>'; break;
                            case 0: cellText = '<span class="table-row-text-blue">运行中</span>';  break;
                            case 1: cellText = '<span class="table-row-text-green">已完成</span>'; break;
                            case 2: cellText = '<span class="table-row-text-gray">待确认</span>'; break;
                            default: break;
                        }
                        tableDom.querySelectorAll('.ivu-table-body tr')[x].children[y].innerHTML = cellText;
                    }

                    for (var key in v) {
                        if (key != 'status' && key != 'trainId') {

                            if (v[key] != valOld[idx][key]) {
//                                console.dir(idx);
//                                console.dir(key);
//                                console.dir(v[key] +'   '+valOld[idx][key]);

                                keyInt = parseInt(key);
                                if (direction == 'up') {y = keyInt + 2;}
                                else { y = 25 - keyInt + 2;
//                                console.dir('x:' + x + '  y:' + y);
//                                console.dir(tableDom.querySelectorAll('.ivu-table-body tr')[x].children[y]);
                                }
                                cellText = this.getCellValue(v[key]);

                                tableDom.querySelectorAll('.ivu-table-body tr')[x].children[y].innerHTML = cellText;
                            }
                        }
                    }

                });
            },
            getCellValue(value) {
                var value1, value2;
                var hh1, hh2, mm1, mm2, ss1, ss2, mVal = 0;

                if (!value) {
                    return '- -';
                }

                value1 = value.split('|')[0];
                value2 = value.split('|')[1] || '';

                if (value2 == '') {
                    return MOMENT(value1).format('HH:mm');
                }
                else {
                    hh1 = MOMENT(value1).hour();
                    mm1 = MOMENT(value1).minute();
                    hh2 = MOMENT(value2).hour();
                    mm2 = MOMENT(value2).minute();

                    ss1 = MOMENT(value1).seconds();
                    ss2 = MOMENT(value2).seconds();

                    mVal = (hh2 - hh1) * 60 + (mm2 - mm1) + ((ss2 - ss1) >= 30 ? 1 : 0);
                }

                if (mVal < 0) { // 早点
                    return '<span class="row-complete">'+MOMENT(value1).format('HH:mm')+'<span class="random-error early-error">'+ mVal+'</span></span>';
                }
                else if (mVal > 0){
                    return '<span class="row-complete">'+MOMENT(value1).format('HH:mm')+'<span class="random-error later-error">+'+ mVal+'</span></span>';
                }
                else {
                    return '<span class="row-complete">'+MOMENT(value1).format('HH:mm')+'<span class="icon-complete"></span></span>';
                }
            },

            morningTrain(h, params, key, type) {
                //var type = '0';
                // 如果没有值

                var value, value1, value2;
                var hh1, hh2, mm1, mm2, ss1, ss2, mVal = 0;
                if (!params.row[key]) {
                    return '- -';
                }
                else {
                    value = params.row[key];
                }

                value1 = value.split('|')[0];
                value2 = value.split('|')[1] || '';


                if (value2 == '') {
                    return MOMENT(value1).format('HH:mm');
                }
                else {
                    hh1 = MOMENT(value1).hour();
                    mm1 = MOMENT(value1).minute();
                    hh2 = MOMENT(value2).hour();
                    mm2 = MOMENT(value2).minute();

                    ss1 = MOMENT(value1).seconds();
                    ss2 = MOMENT(value2).seconds();

                    mVal = (hh2 - hh1) * 60 + (mm2 - mm1) + ((ss2 - ss1) >= 30 ? 1 : 0);
                }

                if (mVal < 0) { // 早点
                    return h('span', {
                        'class': 'row-complete'
                    }, [MOMENT(value1).format('HH:mm'), h('span', {
                        'class': 'random-error early-error'
                    }, mVal)]);
                }
                else if (mVal > 0){
                    return h('span', {
                        'class': 'row-complete'
                    }, [MOMENT(value1).format('HH:mm'), h('span', {
                        'class': 'random-error later-error'
                    }, '+' + mVal)]);
                }
                else {
                    return h('span',
                             {'class': 'row-complete'},
                             [MOMENT(value1).format('HH:mm'), h('span',{ 'class': 'icon-complete'})]
                            );
                }
            },

            // 获取
            getTrainRun() {
                var that = this;
                Util.ajax({
                    method: "get",
                    url: '/xm/run/runCount/getPlanAndActualRunInfo?t=' + Math.random(),
                    data: {}
                }).then(function(response){
                    that.loading = false;
                    if (response.status === 1) {
                        that.watchTableDataUp = response.result.upPlanAndActual;
                        that.watchTableDataDown = response.result.downPlanAndActual;
                    }
                    else {}

                    that.noDataText_table = '暂无数据';

                    that.setTimeOutInfoPanelData = setTimeout(function () {
                        that.getTrainRun();
                    }, that.setTimeOutInfoPanelDataTime);
                }).catch(function (error) {
                    that.loading = false;
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
        min-height: 286px;

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
        .later-error {
            margin-left: 0px;
            color: #FFF;
            background-color: #ed9990;
        }
        .early-error {
            margin-left: 0px;
            color: #FFF;
            background-color: #84b4de;
        }
    }

    .table-box {

        .table-row-text-green {
            color: #28a868;
        }
        .table-row-text-blue {
            color: #3980c3;
        }
        .table-row-text-gray {
            color: rgb(171, 178, 191);
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