<template>
    <div class="newsList-container">
        <div class="search-panel">
            <Form class="form" inline :label-width="75">
                <FormItem label="查询时间段:"  :label-width="95">
                    <DatePicker type="daterange" format="yyyy-MM-dd" v-model="dateRange" @on-change="dateChange" :editable="false" :clearable="false" placeholder="选择时间" style="width: 190px"></DatePicker>
                </FormItem>

                <FormItem label="发布渠道:":label-width="75">
                    <Select v-model="channelType"  style="width: 80px">
                        <Option value="all">全部</Option>
                        <Option value="1">微博</Option>
                        <Option value="2">新闻</Option>
                        <Option value="3">微信</Option>
                        <Option value="4">论坛</Option>
                        <Option value="5">贴吧</Option>
                        <Option value="6">APP</Option>
                        <Option value="7">电子报</Option>
                        <Option value="8">博客</Option>
                        <Option value="9">视频</Option>
                        <Option value="10">境外</Option>
                        <Option value="11">twitter</Option>
                        <Option value="12">其它</Option>

                    </Select>
                </FormItem>
                <FormItem label="性质:":label-width="50">
                    <Select v-model="natureType" style="width: 80px">
                        <Option value="all">全部</Option>
                        <Option value="1">正面</Option>
                        <Option value="-1">负面</Option>
                        <Option value="0">中立</Option>
                    </Select>
                </FormItem>

                <FormItem  :label-width="10">
                    <Button type="success" @click="onSearch">查询</Button>
                </FormItem>
            </Form>
        </div>
        <div class="list-panel">
            <div v-for="item in newsList" class="item">
                <div class="title">
                    <span>{{item.title}}</span>
                    <span class="icon-text" :class="getClass(item.extend)">{{getNatureType(item.extend)}}</span></div>
                <div class="info">
                    <span class="span1">发布时间：</span>
                    <span class="span2">{{item.publishTime}}</span>
                    <span class="span3">发布渠道：</span>
                    <span class="span4">{{getChannelType(item.source)}}</span>
                    <span class="span5">文章类型：</span>
                    <span class="span6">{{getTopicType(item.topicType)}}</span>
                </div>
                <div class="content">
                   {{item.content || ''}}
                </div>
                <div class="link-div">
                    原文链接：<a :href="item.siteUrl || '#'" target="_blank">{{item.siteUrl || ''}}</a>
                </div>
                <div class="line"></div>
            </div>

            <!--<div class="item">-->
                <!--<div class="title">-->
                    <!--<span>厦门地铁一号线正式开通</span>-->
                    <!--<span class="icon-text icon-text-0">正面</span></div>-->
                <!--<div class="info">-->
                    <!--<span class="span1">发布时间：</span>-->
                    <!--<span class="span2">2018-01-09 14:34:13</span>-->
                    <!--<span class="span3">发布渠道：</span>-->
                    <!--<span class="span4">微博</span>-->
                    <!--<span class="span5">文章类型：</span>-->
                    <!--<span class="span6">精华</span>-->
                <!--</div>-->
                <!--<div class="content">-->
                    <!--2017年底，住房和城乡建设部为今年房地产市场定调之后，2018年以来，福建、湖北、四川、江西、宁夏等多地已召开住房城乡工作会议。-->
                    <!--从住房工作会议内容来看，各个城市目标从2017年的确保房价不上涨逐步转向防止房地产市场大起大落-->
                <!--</div>-->
                <!--<div class="link-div">-->
                    <!--原文链接：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a>-->
                <!--</div>-->
                <!--<div class="line"></div>-->
            <!--</div>-->

        </div>
    </div>
</template>

<script>
    import MOMENT from 'moment';
    import Util from '../../../libs/util';
    export default {
        data() {
            return {
                dateRange: [new Date(), new Date()],
                channelType: 'all',     // 发布渠道

                channelTypeList: {
                    '1': '微博',
                    '2': '新闻',
                    '3': '微信',
                    '4': '论坛',
                    '5': '贴吧',
                    '6': 'APP',
                    '7': '电子报',
                    '8': '博客',
                    '9': '视频',
                    '10': '境外',
                    '11': 'twitter',
                    '12': '其它'
                },

                natureType: 'all',      // 性质  正面、中立、负面

                natureTypeList: {
                    '-1': '负面',
                    '0': '中立',
                    '1': '正面'
                },

                sTime: '',
                eTime: '',

                newsList: []
            }
        },
        props: {
            pDateRange: {
                type: Array,
                default() {
                    return [new Date(), new Date()];
                }
            },
            // 发布渠道
            source: {
                type: String,
                default() {
                    return 'all';
                }
            },
            //  性质  正面、中立、负面
            topicType: {
                type: String,
                default() {
                    return 'all';
                }
            }
        },
        computed: {

        },
        watch: {
            pDateRange(val){
                this.dateRange = val;
                this.sTime = MOMENT(val[0]).format('YYYY-MM-DD');
                this.eTime = MOMENT(val[1]).format('YYYY-MM-DD');
                this.onSearch();
            },
            dateRange(val) {
                this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
                this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');
            },
            source(val) {
                this.channelType = val;
                this.dateRange = [new Date(), new Date()];
                this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
                this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');
                this.onSearch();
            },
            topicType(val) {
                this.natureType = val;
                this.dateRange = [new Date(), new Date()];
                this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
                this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');
                this.onSearch();
            }
        },
        created() {
            this.dateRange = this.pDateRange;
            //this.dateRange[0] = MOMENT().subtract(6, 'days')._d;
        },
        mounted() {
            this.sTime = MOMENT(this.dateRange[0]).format('YYYY-MM-DD');
            this.eTime = MOMENT(this.dateRange[1]).format('YYYY-MM-DD');

            this.onSearch();
        },
        methods: {
            getTopicType(type){

                switch(type) {
                    case '0':  return '普通贴'; break;
                    case '1':  return '高亮'; break;
                    case '2':  return '置顶'; break;
                    case '4':  return '精华'; break;
                    case '8':  return '首页出现'; break;
                    case '16':  return '调查贴'; break;
                    case '32':  return '专题贴'; break;
                }
            },

            getChannelType(type) {
                return this.channelTypeList[type];
            },
            getNatureType(type){
                return this.natureTypeList[type];
            },
            getClass(type){
                switch (type) {
                    case 1: return ' icon-text-0'; break;
                    case 0: return ' icon-text-1'; break;
                    case -1: return ' icon-text-2'; break;
                    default: return '';
                }
            },

            dateChange(d) {
                this.$emit('dateChange', d);
            },

            onSearch() {
                var that = this;
                that.$Spin.show();
                Util.ajax({
                    method: "get",
                    url: '/xm/pub/pubOpinionInfo/getNewsList',
                    params: {
                        source: that.channelType == 'all' ? '' : that.channelType,
                        extend: that.natureType == 'all' ? '' : that.natureType,
                        beginDate: that.sTime,
                        endDate: that.eTime
                    }
                }).then(function(response){
                    that.$Spin.hide();
                    if (response.status === 1) {
                        that.newsList = response.result.newsList;
                    }
                    else {}

                }).catch(function (error) {
                    that.$Spin.hide();
                    console.log(error);
                })
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .newsList-container {
        width: 100%;
        height: 100%;
        border: 1px solid #c8dcf2;
        background-color: #F7F7F7;
        .search-panel {
            padding-top: 10px;
            padding-bottom: 20px;
            height: 74px;
            .form {
                margin-top: 3px;
            }
        }

        .list-panel {
            padding-right: 20px;
            height: 646px;
            overflow-y: auto;
            .item {
                padding-left: 20px;
                .title {
                    margin-bottom: 12px;
                    text-align: left;
                    color: #3f4959;
                    font-size: 18px;

                    .icon-text {
                        margin-left: 13px;
                        padding: 3px 15px;
                        color: #FFFFFF;
                        font-size: 12px;
                        line-height: 12px;
                        text-align: center;
                        border-radius: 9px;

                        &.icon-text-0 {
                            background-color: #88c897;
                        }
                        &.icon-text-1 {
                            background-color: #65aadd;
                        }
                        &.icon-text-2 {
                            background-color: #ef857d;
                        }
                    }
                }
                
                .info {
                    color: #7684a1;
                    height: 12px;
                    font-size: 12px;
                    text-align: left;
                    line-height: 12px;
                    overflow: hidden;
                    > span {

                        height: 12px;
                        line-height: 12px;
                    }

                    .span2 {
                        padding-right: 18px;
                    }
                    .span3 {
                        padding-left: 18px;
                        border-left: 1px solid #babccb;
                    }
                    .span4 {
                        padding-right: 18px;
                        border-right: 1px solid #babccb;
                    }
                    .span5 {
                        padding-left: 18px;
                    }
                }

                .content {
                    margin-top: 15px;
                    margin-bottom: 10px;
                    color: #424d5b;
                    font-size: 13px;
                    text-align: left;
                    line-height: 20px;
                }

                .link-div {
                    color: #3071b9;
                    font-size: 13px;
                    text-align: left;
                    line-height: 20px;

                    > a {
                        font-weight: 500;
                        text-decoration: underline;
                    }
                }

                .line {
                    margin: 8px 0px 26px 20px;
                    height: 0;
                    border-top: 2px dotted #dee1ee;
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>