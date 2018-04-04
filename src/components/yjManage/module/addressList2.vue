<template>
    <div class="address-list2-container">
        <Table :columns="column" :data="tableData" :height="height"></Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                column: [
                    { type: 'index', title: '序号', align: 'center', width: 60 },
                    { title: '单位', key: 'unit', align: 'center', width: 150 },
                    { title: '部门', key: 'department', align: 'center' },
//                    { title: '角色', key: 'role', align: 'center' },
//                    { title: '姓名', key: 'name', align: 'center' },
//                    { title: '职务', key: 'work', align: 'center' },
//                    { title: '手机', key: 'phone', align: 'center' },
                    { title: '值班电话', key: 'phone2', align: 'center' }
                ],
                tableData: [
                    {
                        unit: '市交通运输局',
                        department: '局分管领导',
                        phone2: '2660600'
                    },
                    {
                        unit: '市交通运输局',
                        department: '综运处（轨道处）',
                        phone2: '2660600'
                    },
                    {
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '分管公交处领导',
                        phone2: '5673868'
                    },{
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '公交科',
                        phone2: '5673868'
                    },
                    {
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '轨道安全科',
                        phone2: '5673868'
                    },
                    {
                        unit: '市公安局',
                        department: '局指挥情报中心',
                        phone2: '2110119'
                    },
                    {
                        unit: '市公安局',
                        department: '地铁分局领导',
                        phone2: '2262352'
                    },
                    {
                        unit: '市公安局',
                        department: '地铁分局指挥情报中心',
                        phone2: '2262352'
                    },
                    {
                        unit: '市公安局',
                        department: '交警支队',
                        phone2: '5854433'
                    },
                    {
                        unit: '市公交集团',
                        department: '集团公司',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '思明公共交通有限公司',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '湖里公共交通有限公司',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '集美公共交通有限',
                        phone2: '5854531'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '运管中心总经理',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '调度部副经理',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '客运部经理',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '控制中心值班主任',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '综合调度',
                        phone2: '2506110'
                    }


                ]
            }
        },
        props: {
            searchValue: {
                type: String,
                default() {
                    return ''
                }
            },
            height: {
                type: Number,
                default() {
                    return 500;
                }
            }
        },
        computed: {}
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .address-list2-container {

    }
</style>