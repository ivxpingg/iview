<template>
    <div class="header-container">
        <div class="header-inner">
            <div class="title"></div>
            <Button class="btn-layout" type="text" icon="log-out" title="返回导航页" @click="goBack"></Button>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data () {},
        mounted() {

        },
        methods: {
            goBack () {
                this.$router.replace({
                    name: 'platform',  // 路由名称
                    params: {}
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header-container {
        position: relative;
        width: 100%;
        background: linear-gradient(to right, #eaa467 50%, #7cacda 50%);

        .header-inner {
            width: 100%;
            height: 87px;
            background-image: url(./images/header-bg.png);
            background-position: center;
            background-repeat: no-repeat;
        }
        .title {
            position: absolute;
            top: 13px;
            left:40px;
            width: 601px;
            height: 60px;
            background: url(./images/run-system-text-logo.png) no-repeat;
            background-size: auto 100%;
        }
        .btn-panel {
            position: absolute;
            top: 26px;
            right: 102px;
            height: 35px;
            overflow: hidden;
            .m-btn {
                display: inline-block;
                margin-left: 23px;
                width: 107px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                color: #FFF;
                background-color: transparent;
                border: 1px solid #FFF;
                border-radius: 19px;
                cursor: pointer;
                transition: background-color .2s linear;

                &:hover {
                    background-color: rgba(243,153,80, 1);
                }

                &.m-active {
                    background-color: #f39950;
                }
            }
        }

        .btn-layout {
            position: absolute;
            top: 2px;
            right: 0;
            width: 102px;
            font-size: 46px;
            color: #FFF;

            &:hover {
                color: #57a3f3;
            }
        }
    }
</style>