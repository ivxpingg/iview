<template>
    <div class="yq-container">
        <div class="left-panel">
            <div class="box">
                <div class="title">全部舆情</div>
                <div class="info"><span>78</span> <span>条</span></div>
            </div>

            <div class="box">
                <div class="title">负面信息</div>
                <div class="info"><span>78</span> <span>条</span></div>
            </div>

            <div class="box">
                <div class="title">正面信息</div>
                <div class="info"><span>78</span> <span>条</span></div>
            </div>

            <div class="box">
                <div class="title">新闻报道</div>
                <div class="info"><span>78</span> <span>条</span></div>
            </div>

            <div class="box">
                <div class="title">微博发文</div>
                <div class="info"><span>78</span> <span>条</span></div>
            </div>
        </div>
        <div class="right-panel">
            <Tabs type="card" :animated="false">
                <TabPane label="舆情走势分析">
                    <vTrendAnalysis></vTrendAnalysis>
                </TabPane>
                <TabPane label="舆情详细分析">
                    <vDetailsAnalysis></vDetailsAnalysis>
                </TabPane>
                <TabPane label="新闻报道搜索">
                    <vNewsList></vNewsList>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    import vTrendAnalysis from '../module/trendAnalysis.vue';
    import vDetailsAnalysis from '../module/detailsAnalysis.vue';
    import vNewsList from '../module/newsList.vue';
    import MOMENT from 'moment';
    export default {
        data() {
            return {}
        },
        components: {vTrendAnalysis, vDetailsAnalysis, vNewsList},
        created() {
        },
        mounted() {

        },
        methods: {
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .yq-container {
        position: relative;
        display: flex;
        height: 100%;

        .left-panel {
            width: 200px;
        }

        .right-panel {
            flex: 1;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .yq-container {
        .ivu-tabs-nav{
            float: right;
        }

        .ivu-tabs-bar {
            margin-bottom: 10px;
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
            padding-top: 5px;
            height: 32px;
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
            position: relative;
            margin-right: 15px;
            height: 26px;
            padding: 0 16px;
            line-height: 26px;
            background-color: #FFFFFF;
            border-radius: 0;
            border-color: #cccccd;

            &:before {
                content: " ";
                position: absolute;
                display: block;
                top: -1px;
                left: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-left.png) no-repeat center;
                z-index: 1;
            }
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-right.png) no-repeat center;
                z-index: 1;
                transition: all .3s ease-in-out;
            }
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
            height: 27px;
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 27px;
                background: url(./images/tabs-nav-bg-right-active.png) no-repeat center;
                z-index: 1;
            }
        }
    }
</style>