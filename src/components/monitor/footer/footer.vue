<template>
    <div class="footer-container">
        <div class="userInfo">
            <span class="name-title">用户名：<span class="name">admin</span></span>
            <span class="login-time-title">登录时间:</span><span class="login-time">2018-01-01 12:12:25</span></div>
        <div class="cop"><span>版权所有：厦门市交通运输局</span><span>技术支持：背景北大干方科技有限公司</span></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .footer-container {
        .userInfo {
            .name-title {
                .name {}
            }
            .login-time-title {

                .login-time {}
            }
        }
    }

</style>