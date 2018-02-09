<template>
    <div class="yq-container">
        <div class="left-panel">
            <div class="box box1">
                <div class="box-inner">
                    <div class="title">全部舆情</div>
                    <div class="info"><span class="span1">878</span> <span class="span2">条</span></div>
                </div>
            </div>

            <div class="box box2">
                <div class="box-inner">
                    <div class="title">负面信息</div>
                    <div class="info"><span class="span1">78</span> <span class="span2">条</span></div>
                </div>
            </div>

            <div class="box box3">
                <div class="box-inner">
                    <div class="title">正面信息</div>
                    <div class="info"><span class="span1">78</span> <span class="span2">条</span></div>
                </div>
            </div>

            <div class="box box4">
                <div class="box-inner">
                    <div class="title">新闻报道</div>
                    <div class="info"><span class="span1">78</span> <span class="span2">条</span></div>
                </div>
            </div>

            <div class="box box5">
                <div class="box-inner" @click="switchCard('3')">
                    <div class="title">微博发文</div>
                    <div class="info"><span class="span1">78</span> <span class="span2">条</span></div>
                </div>
            </div>
        </div>
        <div class="right-panel">
            <Tabs type="card" :animated="false" v-model="cardName">
                <TabPane label="舆情走势分析" name="1">
                    <vTrendAnalysis></vTrendAnalysis>
                </TabPane>
                <TabPane label="舆情详细分析" name="2">
                    <vDetailsAnalysis></vDetailsAnalysis>
                </TabPane>
                <TabPane label="新闻报道搜索" name="3">
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
            return {
                cardName: '2'
            }
        },
        components: {vTrendAnalysis, vDetailsAnalysis, vNewsList},
        created() {
        },
        mounted() {

        },
        methods: {
            switchCard(name) {
                this.cardName = name;
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .yq-container {
        position: relative;
        display: flex;
        height: 100%;

        .left-panel {
            width: 144px;

            .box {
                position: relative;
                width: 144px;
                height: 150px;
                margin-top: 5px;

                .box-inner {
                    width: 144px;
                    height: 150px;

                    &:before {
                        content: "020";
                        display: block;
                        height: 0;
                        clear: both;
                        visibility: hidden;
                    }
                }

                .title {
                    margin-top: 15px;
                    margin-left: 16px;
                    padding-left: 24px;
                    color: #FFFFFF;
                    font-size: 18px;
                    text-align: left;
                    line-height: 20px;
                }

                .info {
                    position: relative;
                    padding-left: 26px;
                    margin-top: 18px;
                    width: 130px;
                    height: 76px;

                    .span1 {
                        display: inline-block;
                        width: 76px;
                        height: 76px;
                        font-size: 36px;
                        line-height: 76px;
                        text-align: center;
                        font-weight: 700;
                        background-color: #FFFFFF;
                        border-radius: 50%;

                    }
                    .span2 {
                        position: absolute;
                        left: 102px;
                        bottom: 3px;
                        display: inline-block;
                        color: #FFFFFF;
                        font-size: 18px;
                    }
                }

                &.box1 {
                    margin-top: 8px;
                    overflow: hidden;
                    &:after {
                        position: absolute;
                        top: 0;
                        right: 0;
                        display: block;
                        content: ' ';
                        width: 14px;
                        height: 21px;
                        background: url("./images/box-top.png") no-repeat;
                        z-index: 1;
                    }
                    .box-inner {
                        background-color: #65aadd;
                        border-right: 4px solid #5793c0;

                        .title {
                            background: url("./images/icon1.png") no-repeat left center;
                        }

                        .info {
                            .span1 {
                                color: #65aadd;
                            }
                        }
                    }
                }
                &.box2 {
                    .box-inner {
                        background-color: #ef857d;
                        border-right: 4px solid #cf736d;

                        .title {
                            background: url("./images/icon2.png") no-repeat left center;
                        }

                        .info {
                            .span1 {
                                color: #ef857d;
                            }
                        }
                    }
                }
                &.box3 {
                    .box-inner {
                        background-color: #88c897;
                        border-right: 4px solid #76ae84;

                        .title {
                            background: url("./images/icon3.png") no-repeat left center;
                        }

                        .info {
                            .span1 {
                                color: #88c897;
                            }
                        }
                    }

                }
                &.box4 {
                    .box-inner {
                        background-color: #8e81bc;
                        border-right: 4px solid #7c70a3;

                        .title {
                            background: url("./images/icon4.png") no-repeat left center;
                        }

                        .info {
                            .span1 {
                                color: #8e81bc;
                            }
                        }
                    }

                }
                &.box5  {
                    &:after {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        display: block;
                        content: ' ';
                        width: 14px;
                        height: 21px;
                        background: url("./images/box-bottom.png") no-repeat;
                        z-index: 1;
                    }
                    .box-inner {
                        background-color: #f3994f;
                        border-right: 4px solid #d28444;
                        cursor: pointer;

                        .title {
                            background: url("./images/icon5.png") no-repeat left center;
                        }

                        .info {
                            .span1 {
                                color: #f3994f;
                            }
                        }
                    }

                }
            }
        }

        .right-panel {
            flex: 1;
            margin-top: 8px;
            margin-left: 23px;
            margin-right: 27px;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    // 菜单栏
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
                background: url(./images/tabs-nav-bg-right.png) no-repeat center;
                z-index: 1;
            }
        }
    }

    // 内容
    .yq-container {

        .ivu-tabs-content {
            min-height: 730px;
        }
    }
</style>