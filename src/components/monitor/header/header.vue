<template>
    <div class="header-container">
        <div class="header-inner">
            <div class="title"></div>

            <Button class="btn-layout" type="text" icon="log-out" title="返回导航页" @click="goBack"></Button>
            <div class="btn-panel">
                <div class="m-btn" :class="routeName == 'runMonitor' ? 'm-active':''" @click="btnLink('runMonitor', $event)">行车监视</div>
                <div class="m-btn" :class="routeName == 'flowMonitor' ? 'm-active':''" @click="btnLink('flowMonitor', $event)">客流监视</div>
                <a class="m-btn" :class="routeName == 'videoMonitor' ? 'm-active':''"  v-if="!isIE" :href="viewIEUrl">视频监视</a>
                <div v-if="isIE" class="m-btn" :class="routeName == 'videoMonitor' ? 'm-active':''" @click="btnLink('videoMonitor', $event)">视频监视</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import browserType from '../../../libs/package/browser-type';
    import MOMENT from 'moment';
    export default {
        data () {
            return {
                viewIEUrl: 'openIE:',
                isIE: false,
                activeName: 'm-active',  // 激活样式名
                routeName: ''            // 当前路由路径
            }
        },
        created() {
            const bt = browserType();
            debugger
            if(bt.isIE) {
                this.isIE = bt.isIE;
            }
            else {
                this.viewIEUrl = 'openIE:' + window.location.href.split('/monitor')[0] + '/monitor/videoMonitor';
                this.viewIEUrl += '?t=' + Util.cookie.get('xmgd');
                this.viewIEUrl += '--' + encodeURIComponent(Util.cookie.get('xmgdname'));
                this.viewIEUrl += '--' + Util.cookie.get('xmgduserid');
                this.isIE = bt.isIE;
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
             * @param routerName  路由名
             * @param event 事件对象
             */
            btnLink(routerName, event) {
                var re = new RegExp('\\s'+ this.activeName +'|'+ this.activeName +'', 'g');
                var dom = document.querySelectorAll('.m-active');

                for (var i = 0; i < dom.length; i++) {
                    dom[i].className = dom[i].className.replace(re, '');
                }
//                document.querySelectorAll('.m-active').forEach(function (dom) {
//                    dom.className = dom.className.replace(re, '');
//                });

                event.target.className += ' ' + this.activeName;
                this.$router.push({
                    name: routerName,  // 路由名称
                    params: {}
                });
            },

            goBack () {
                if (this.$route.name == 'videoMonitor') {
                    this.$router.push({
                        name: 'platform',  // 路由名称
                        params: {}
                    });
                }
                else {
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
            top: 16px;
            left:40px;
            width: 518px;
            height: 54px;
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