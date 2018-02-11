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
                    { title: '部门', key: 'department', align: 'center', width: 150 },
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