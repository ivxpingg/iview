<template>
    <div class="container">
        <div class="title">厦门市轨道交通行业运行监视子系统</div>

        <div class="m-btn" :class="routeName == 'videoMonitor' ? 'm-active':''" @click="btnLink('videoMonitor', $event)">视频监视</div>
        <div class="m-btn" :class="routeName == 'flowMonitor' ? 'm-active':''" @click="btnLink('flowMonitor', $event)">客流监视</div>
        <div class="m-btn" :class="routeName == 'runMonitor' ? 'm-active':''" @click="btnLink('runMonitor', $event)">运行监视</div>
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
                if (this.$route.name == 'monitor') {
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
                document.querySelectorAll('.m-active').forEach(function (dom) {
                    dom.className = dom.className.replace(re, '');
                });

                event.target.className += ' ' + this.activeName;
                this.$router.push({
                    name: routerName,  // 路由名称
                    params: {}
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        position: relative;
        height: 80px;
        width: 100%;
        border-bottom: 1px solid #aaa;

        .title {
            position: absolute;
            top: 0;
            left:0;
            padding-left:20px;
            font-size: 20px;
            font-weight: 700;
            line-height: 80px;
        }
        .m-btn {
            float: right;
            margin-top: 26px;
            margin-right: 20px;
            width: 120px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            color: #333;
            background-color: #FFF;
            border: 1px solid #333;

            &.m-active {
                color: #FFF;
                background-color: #51bf08;
            }
        }
    }
</style>