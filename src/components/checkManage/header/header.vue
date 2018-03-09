<template>
    <div class="header-container">
        <div class="header-inner">
            <div class="title"></div>

            <Button class="btn-layout" type="text" icon="log-out" title="返回导航页" @click="goBack"></Button>
            <div class="btn-panel">
                <div class="m-btn" :class="menuIndex == 1 ? 'm-active':''" @click="btnLink(1, $event)">轨道运营企业</div>
                <div class="m-btn" :class="menuIndex == 2 ? 'm-active':''" @click="btnLink(2, $event)">轨道线路</div>
                <div class="m-btn" :class="menuIndex == 3 ? 'm-active':''" @click="btnLink(3, $event)">轨道站点</div>
                <div class="m-btn" :class="menuIndex == 4 ? 'm-active':''" @click="btnLink(4, $event)">检查人员</div>
                <div class="m-btn" :class="menuIndex == 5 ? 'm-active':''" @click="btnLink(5, $event)">站点考评</div>
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
                routeName: '',           // 当前路由路径
                menuIndex: 1,
                url1: 'http://218.85.132.71:9788/gd/gdCorp!listforuid.action?uid=gdkp',        // 轨道运营企业
                url2: 'http://218.85.132.71:9788/gd/gdLine!listforuid.action?uid=gdkp',        // 轨道线路
                url3: 'http://218.85.132.71:9788/gd/gdStation!listforuid.action?uid=gdkp',     // 轨道站点
                url4: 'http://218.85.132.71:9788/gd/gdCheckMan!listforuid.action?uid=gdkp',    // 检查人员
                url5: 'http://218.85.132.71:9788/gd/gdStationcheck!listforuid.action?uid=gdkp',// 站点考评
            }
        },
        mounted() {
            this.redirectUrl();
        },
        methods: {
            // 重定向，未指定菜单，默认指定运行监视
            redirectUrl() {
                this.routeName = this.$route.name;
                if (this.$route.name == 'monitor') {
                    this.routeName = 'runMonitor';
                    this.$router.replace({
                        name: 'runMonitor',  // 路由名称
                        params: {}
                    });
                }
            },
            /**
             * // 菜单按钮事件
             * @param idx  目录
             * @param event 事件对象
             */
            btnLink(idx, event) {

                this.menuIndex = idx;

                this.$emit('setUrl', this['url' + idx]);
            },

            goBack () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要返回系统菜单？</p>',
                    onOk: () => {
                        this.$router.push({
                            name: 'platform',  // 路由名称
                            params: {}
                        });
                    },
                    onCancel: () => {}
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
            top: 26px;
            left:40px;
            width: 540px;
            height: 34px;
            background: url(./images/logo-title.png) no-repeat;
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