<template>
    <div class="LoginUser-container">
        <!--<Table :data="tableData"-->
               <!--border-->
               <!--:columns="tableColumns"-->
               <!--:height="185"-->

               <!--width="100%"></Table>-->
        <div class="user-list-item">
            <span class="item item-color-1">轨</span>
            <template v-for="item in userList">
                <span v-if="item.roleNameList.indexOf('轨道公司') > -1" class="user-name">{{item.name}}</span>
            </template>
        </div>
        <div class="user-list-item">
            <span class="item item-color-2">管</span>
            <template v-for="item in userList">
                <span v-if="item.roleNameList.indexOf('运管处') > -1" class="user-name">{{item.name}}</span>
            </template>
        </div>
        <div class="user-list-item">
            <span class="item item-color-3">公</span>
            <template v-for="item in userList">
                <span v-if="item.roleNameList.indexOf('公交公司') > -1" class="user-name">{{item.name}}</span>
            </template>
        </div>
        <div class="user-list-item">
            <span class="item item-color-4">执</span>
            <template v-for="item in userList">
                <span v-if="item.roleNameList.indexOf('执法支队') > -1" class="user-name">{{item.name}}</span>
            </template>
        </div>
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
        computed: {
            userList() {
                return this.tableData.filter(val => {
                    return val.account !== 'admin' && (
                        val.roleNameList.indexOf('轨道公司') > -1 ||
                        val.roleNameList.indexOf('运管处') > -1 ||
                        val.roleNameList.indexOf('公交公司') > -1 ||
                        val.roleNameList.indexOf('执法支队') > -1);
                });
            }
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
        .user-list-item {
            position: relative;
            padding: 5px 10px 5px 45px;
            overflow: hidden;
            min-height: 35px;
            .item {
                position: absolute;
                top: 2px;
                left: 10px;
                display: inline-block;
                width: 30px;
                height: 30px;
                font-size: 15px;
                font-weight: 700;
                text-align: center;
                line-height: 26px;
                border: 2px solid #FFF;
                border-radius: 50%;

                &.item-color-1 {
                    color: #19be6b;
                    border-color: #19be6b;
                }
                &.item-color-2 {
                    color: #2d8cf0;
                    border-color: #2d8cf0;
                }
                &.item-color-3 {
                    color: #ed3f14;
                    border-color: #ed3f14;
                }
                &.item-color-4 {
                    color: #f90;
                    border-color: #f90;
                }
            }

            .user-name {
                display: inline-block;
                padding: 0 5px;
                font-size: 15px;
            }
        }

    }
</style>