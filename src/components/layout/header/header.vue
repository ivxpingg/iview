<template>
    <div class="layout-header">
        <Button class="btn-layout" type="text" icon="log-out" title="退出" @click="logout"></Button>
        <div class="userInfo">
            <Avatar class="userImg" :src="userHeaderImgUrl" size="large" icon="person"/>
            <!--<Avatar src="../../images/avatar.jpg" />-->
            <!--<div class="userImg"><img src="../../images/avatar.jpg" alt=""></div>-->
            <Dropdown class="userDrown">
                <a href="javascript:void(0)">
                    {{userName}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>个人信息</DropdownItem>
                    <DropdownItem>修改密码</DropdownItem>
                    <DropdownItem>我的通知</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import VueRouter from 'vue-router';
    export default {
        data () {
            return {
                userName: '',
                userHeaderImgUrl: ''
            }
        },
        mounted() {
            this.userName = Util.cookie.get('xmgdname') || '';

            this.userHeaderImgUrl = '/static/img/avatar.jpg';
        },
        methods: {
            logout () {
                debugger
                const that = this;
                Util.ajax.get('/xm/sys/logout')
                    .then(function (response){
                        var router = new VueRouter();
                        Util.cookie.unset('xmgd');
                        Util.cookie.unset('xmgdname');
                        that.$store.commit('setToken', null);
                        router.push({ path: '/' });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .layout-header{
        height: 57px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        .userInfo {
            float: right;
            padding-right: 19px;
            height: 100%;
            vertical-align: top;
            border-right: 1px solid rgba(0,0,0,.1);
            .userImg {
                background-color: #87d068;
                margin-top: 8px;
                margin-right: 5px;
            }
            .userDrown {
                margin-top: 19px;
                vertical-align: top;
            }
        }

        .btn-layout {
            float: right;
            width: 69px;
            font-size: 26px;
        }
    }
</style>