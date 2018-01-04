<template>
    <div class="container">
        <Table border stripe :columns="tableColumns" :data="tableData"></Table>
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
                            var value = '';
                            switch(params.row.state) {
                                case '0': value = '未发班'; break;
                                case '1': value = '运行中'; break;
                                case '2': value = '已完成'; break;
                            }
                            return value;
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
                             [params.row[key], h('Icon',{ props: { type: 'checkmark-round' }})]
                            );
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>

<style lang="scss" rel="stylesheet/scss">
    .row-complete {
        line-height: 20px;
        display: inline-block;
        height: 20px;
        font-size: 12px;

        .ivu-icon {
            color: green;
            padding-left: 5px;
        }
        .random-error {
            padding-left: 5px;
            color: red;
        }
    }
</style>