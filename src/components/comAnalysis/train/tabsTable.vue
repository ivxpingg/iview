<template>
    <div class="tabsTable-container">
        <Tabs type="card" :animated="false">
            <TabPane label="行车指标">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHight" border></Table>
            </TabPane>
            <TabPane label="指标记录">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHight" border></Table>
            </TabPane>
            <TabPane label="运营事件">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHight" border></Table>
            </TabPane>
            <TabPane label="其它事项">
                <Table class="myTableIview" :data="tableData1" :columns="columns1" :height="tableHight" border></Table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableHight: 330,
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
                columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '日期',
                        key: 'date',
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
                        align: 'center'
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
                    }]
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
    }
</style>