<template>
    <div class="address-list2-container">
        <Table :columns="column" :data="tableData" :height="height"></Table>
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
                    { title: '部门', key: 'department', align: 'center' },
                    { title: '值班电话', key: 'dutyTelephone', align: 'center' }
                ],
                tableData: []
            };
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
        computed: {},
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/emerg/emergBaseData/getFirstContactList'
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
    .address-list2-container {

    }
</style>