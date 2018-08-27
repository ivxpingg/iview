<template>
    <div class="LoginUser-container">
        <Table :data="tableData"
               border
               :columns="tableColumns"
               :height="185"
               
               width="100%"></Table>
    </div>
</template>

<script>
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        name: 'LoginUser',
        data() {
            return {
                tableColumns: [

                    {
                        title: '用户名',
                        align: 'center',
                        width: 100,
                        key: 'name'
                    },
                    {
                        title: '角色',
                        align: 'center',
                        render(h, params) {
                            let list = params.row.roleNameList || [];
                            if (params.row.account === 'admin'){
                                list = ['超级管理员'];
                            }
                            let p_list = [];

                            list.forEach(function (v) {
                                p_list.push(h('p', v));
                            });

                            return h('div', list.join('、'));
                        }
                    },
                    {
                        title: '登陆时间',
                        align: 'center',
                        width: 95,
                        render(h, params) {
                            return h('div', MOMENT(params.row.onlineTime).fromNow());
                        }
                    },
                ],
                tableData: []
            };
        },

        mounted() {
            MOMENT.locale('zh-cn');
            this.addOnlineUser();
        },
        methods: {
            /**
             * 添加在线用户
             */
            addOnlineUser() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/emerg/emergBaseData/addOnlineUser'
                }).then(function (response) {
                    that.getEmergOnlineUser();
                });
            },
            getEmergOnlineUser() {
                let that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/emerg/emergBaseData/getEmergOnlineUser'
                }).then(function (response) {
                    if (response.status === 1) {
                        that.tableData = response.result;

                        setTimeout(function () {
                            that.getEmergOnlineUser();
                        }, 10000);
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .LoginUser-container {
    }
</style>