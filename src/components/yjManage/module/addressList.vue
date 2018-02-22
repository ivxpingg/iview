<template>
    <div class="address-list-container">
        <Table :columns="column" :data="datas" :height="height"></Table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                column: [
                    { type: 'index', title: '序号', align: 'center', width: 60 },
                    { title: '单位', key: 'unit', align: 'center', width: 150 },
                    { title: '部门', key: 'department', align: 'center', width: 160 },
                    { title: '角色', key: 'role', align: 'center' },
                    { title: '姓名', key: 'name', align: 'center' },
                    { title: '职务', key: 'work', align: 'center' },
                    { title: '手机', key: 'phone', align: 'center', width: 120 },
                    { title: '值班电话', key: 'phone2', align: 'center', width: 100 }
                ],
                tableData: [
                    {
                        unit: '市交通运输局',
                        department: '局分管领导',
                        role: '负责人',
                        name: '王文杰',
                        work: '局长',
                        phone: '13806019901',
                        phone2: '2660600'
                    },
                    {
                        unit: '市交通运输局',
                        department: '综运处（轨道处）',
                        role: '负责人',
                        name: '姚世顺',
                        work: '处长',
                        phone: '13806026205',
                        phone2: '2660600'
                    },
                    {
                        unit: '市交通运输局',
                        department: '综运处（轨道处）',
                        role: '负责人',
                        name: '翁明鸿',
                        work: '副处长',
                        phone: '13328780159',
                        phone2: '2660600'
                    },{
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '分管公交处领导',
                        role: '负责人',
                        name: '郑钢',
                        work: '副处长',
                        phone: '13328320802',
                        phone2: '5673868'
                    },
                    {
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '公交科',
                        role: '负责人',
                        name: '宋鹭雯',
                        work: '科长',
                        phone: '13860152767',
                        phone2: '2660600'
                    },
                    {
                        unit: '市道路运输管理处（轨道运营管理处）',
                        department: '轨道安全科',
                        role: '负责人',
                        name: '杨雪松',
                        work: '',
                        phone: '13606924818',
                        phone2: '2660600'
                    },
                    {
                        unit: '市公安局',
                        department: '局指挥情报中心',
                        role: '负责人',
                        name: '周肖荻',
                        work: '副主任',
                        phone: '13959257570',
                        phone2: '2110119'
                    },
                    {
                        unit: '市公安局',
                        department: '地铁分局领导',
                        role: '负责人',
                        name: '吕培勤',
                        work: '政委',
                        phone: '13600943607',
                        phone2: '2262352'
                    },
                    {
                        unit: '市公安局',
                        department: '地铁分局指挥情报中心',
                        role: '负责人',
                        name: '杨日水',
                        work: '负责人',
                        phone: '13950156185',
                        phone2: '2262352'
                    },
                    {
                        unit: '市公安局',
                        department: '交警支队',
                        role: '负责人',
                        name: '林炳聪',
                        work: '副支队长',
                        phone: '13806095259',
                        phone2: '5854433'
                    },
                    {
                        unit: '市公安局',
                        department: '交警支队',
                        role: '负责人',
                        name: '吴志鹏',
                        work: '教导员',
                        phone: '13906000112',
                        phone2: '5854433'
                    },
                    {
                        unit: '市公交集团',
                        department: '集团公司',
                        role: '负责人',
                        name: '高雁',
                        work: '副总经理',
                        phone: '13806051951',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '思明公共交通有限公司',
                        role: '负责人',
                        name: '孙家仟',
                        work: '总经理',
                        phone: '13606037165',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '思明公共交通有限公司',
                        role: '联系人',
                        name: '黄睿',
                        work: '副总',
                        phone: '13606910585',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '湖里公共交通有限公司',
                        role: '负责人',
                        name: '姚扁福',
                        work: '总经理',
                        phone: '13906009624',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '湖里公共交通有限公司',
                        role: '联系人',
                        name: '黄长清',
                        work: '副总',
                        phone: '13063065585',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '集美公共交通有限公司',
                        role: '负责人',
                        name: '王振源',
                        work: '总经理',
                        phone: '13806079696',
                        phone2: '5854531'
                    },
                    {
                        unit: '市公交集团',
                        department: '集美公共交通有限公司',
                        role: '联系人',
                        name: '江炳胜',
                        work: '副总',
                        phone: '18905922350',
                        phone2: '5854531'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '运管中心总经理',
                        role: '负责人',
                        name: '栾文波',
                        work: '运管总经理',
                        phone: '13585170078',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '调度部副经理',
                        role: '负责人',
                        name: '徐莉星',
                        work: '调度部副经理',
                        phone: '13606025987',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '客运部经理',
                        role: '负责人',
                        name: '林志平',
                        work: '客运部经理',
                        phone: '13606025987',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '值班主任',
                        role: '负责人',
                        name: '',
                        work: '客运部经理',
                        phone: '2506110',
                        phone2: '2506110'
                    },
                    {
                        unit: '市轨道交通集团',
                        department: '综合调度',
                        role: '负责人',
                        name: '',
                        work: '综合调度',
                        phone: '2506110',
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
        computed: {
            datas() {
                var that = this;

                if (this.searchValue == '') {
                    return this.tableData;
                }
                else {
                    var relValue = [];
                    this.tableData.forEach(function (val) {
                        if (val.unit.indexOf(that.searchValue) >=0 ) {
                            relValue.push(val);
                        }
                        else if (val.department.indexOf(that.searchValue) >=0 ){
                            relValue.push(val);
                        }
                        else if (val.name.indexOf(that.searchValue) >=0 ){
                            relValue.push(val);
                        }
                    });

                    return relValue;
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .address-list-container {

    }
</style>