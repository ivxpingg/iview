<template>
    <div class="footer-container">
        <div class="userInfo">
            <span class="name-title">用户名：<span class="name">{{userName}}</span></span>
            <span class="login-time-title">登录时间:</span><span class="login-time">{{loginTime}}</span>
            <div class="cop"><span>版权所有：厦门市交通运输局</span><span>技术支持：北京北大干方科技有限公司</span></div>
        </div>
    </div>
</template>
<script>
    import Util from '../../../libs/util';
    import VueRouter from 'vue-router';
    export default {
        data() {
            return {
                userName: '',
                loginTime: ''
            }
        },
        mounted() {
            this.userName = Util.cookie.get('xmgdname') || '';
            this.loginTime = Util.cookie.get('logintime') || '';
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .footer-container {
        .userInfo {
            color: #67707d;
            font-size: 12px;
            line-height: 28px;
            background-color: #bcd3df;
            border-top: 1px solid #b7c6cd;
            border-bottom: 1px solid #b7c6cd;
            .name-title {
                float: left;
                margin-left: 30px;
                font-weight: 700;
                .name {}
            }
            .login-time-title {
                float: left;
                margin-left: 19px;
                .login-time {}
            }
            .cop {
                float: right;
                margin-right: 30px;
                span {
                    margin-left: 30px;
                }
            }
        }
    }

</style>