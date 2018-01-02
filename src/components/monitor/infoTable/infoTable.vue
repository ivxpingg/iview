<template>
    <div class="container">
        <Table border stripe :columns="tableColumns" :data="tableData"></Table>
    </div>
</template>

<script>
    export default {
        data () {
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
                        key: 'trainId',
                        align: 'center',
                        render(h, params) {
                            return h('span', {
                                'class': 'row-complete'
                            }, params.row.yanNei);
                        }
                    }
                ],
                tableData: [
                    {
                        trainId: '00101',
                        state: '0',
                        yanNei: '07:30'
                    },
                    {
                        trainId: '00102',
                        state: '1',
                        yanNei: '07:30'
                    },
                    {
                        trainId: '00103',
                        state: '2',
                        yanNei: '07:30'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>