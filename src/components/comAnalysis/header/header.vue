<template>
    <div class="header-container">
        <div class="header-inner">
            <div class="title"></div>

            <Button class="btn-layout" type="text" icon="log-out" title="返回导航页" @click="goBack"></Button>
            <div class="btn-panel">
                <div class="m-btn" :class="routeName == 'trainAnalysis' ? 'm-active':''" @click="btnLink('trainAnalysis', $event)">行车分析</div>
                <div class="m-btn" :class="routeName == 'passengerAnalysis' ? 'm-active':''" @click="btnLink('passengerAnalysis', $event)">客流分析</div>
            </div>

        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data () {
            return {
                activeName: 'm-active',  // 激活样式名
                routeName: ''            // 当前路由路径
            }
        },
        mounted() {
            this.redirectUrl();
        },
        methods: {
            // 重定向，未指定菜单，默认指定运行监视
            redirectUrl() {
                this.routeName = this.$route.name;
                if (this.$route.name == 'comAnalysis') {
                    this.routeName = 'trainAnalysis';
                    this.$router.replace({
                        name: 'trainAnalysis',  // 路由名称
                        params: {}
                    });
                }
            },
            /**
             * // 菜单按钮事件
             * @param routerName  路由名
             * @param event 事件对象
             */
            btnLink(routerName, event) {
                var re = new RegExp('\\s'+ this.activeName +'|'+ this.activeName +'', 'g');
                document.querySelectorAll('.m-active').forEach(function (dom) {
                    dom.className = dom.className.replace(re, '');
                });

                event.target.className += ' ' + this.activeName;
                this.$router.push({
                    name: routerName,  // 路由名称
                    params: {}
                });
            },

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
            top: 25px;
            left:40px;
            width: 504px;
            height: 35px;
            background: url(./images/logo-title.png) no-repeat;
            background-size: auto 35px;
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