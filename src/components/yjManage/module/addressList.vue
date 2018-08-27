<template>
    <div class="address-list-container">
        <Table :columns="column" :data="datas" :height="height"></Table>
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                column: [
                    { type: 'index', title: '序号', align: 'center', width: 60 },
                    { title: '单位', key: 'unit', align: 'center', width: 150 },
                    { title: '部门', key: 'department', align: 'center', width: 160 },
                    { title: '角色', key: 'contactType', align: 'center' },
                    { title: '姓名', key: 'name', align: 'center' },
                    { title: '职务', key: 'post', align: 'center' },
                    { title: '手机', key: 'phone', align: 'center', width: 120 },
                    { title: '值班电话', key: 'dutyTelephone', align: 'center', width: 100 }
                ],
                tableData: []
            }
        },
        props: {
            searchValue: {
                type: String,
                default() {
                    return '';
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
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/emerg/emergBaseData/getAddressBookList'
                }).then(function (response) {
                    if(response.status === 1) {
                        that.tableData = response.result;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .address-list-container {

    }
</style>