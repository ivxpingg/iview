<template>
    <div class="newsList-container">
        <div class="search-panel">
            <Form class="form" inline :label-width="75">
                <FormItem label="查询时间段:"  :label-width="95">
                    <DatePicker type="daterange" format="yyyy-MM-dd" v-model="dateRange" :editable="false" :clearable="false" placeholder="选择时间" style="width: 190px"></DatePicker>
                </FormItem>

                <FormItem label="发布渠道:":label-width="75">
                    <Select v-model="channelType">
                        <Option value="0">全部</Option>
                        <Option value="1">微博</Option>
                        <Option value="2">微信</Option>
                        <Option value="3">论坛</Option>
                    </Select>
                </FormItem>
                <FormItem label="性质:":label-width="50">
                    <Select v-model="natureType">
                        <Option value="0">全部</Option>
                        <Option value="1">正面</Option>
                        <Option value="2">负面</Option>
                        <Option value="3">中立</Option>
                    </Select>
                </FormItem>

                <FormItem  :label-width="10">
                    <Button type="success" @click="onSearch">查询</Button>
                </FormItem>
            </Form>
        </div>
        <div class="list-panel">
            <div class="item">
                <div class="title">
                    <span>厦门地铁一号线正式开通</span>
                    <span class="icon-text icon-text-1">中立</span></div>
                <div class="info">
                    <span class="span1">发布时间：</span>
                    <span class="span2">2018-01-09 14:34:13</span>
                    <span class="span3">发布渠道：</span>
                    <span class="span4">微博</span>
                    <span class="span5">文章类型：</span>
                    <span class="span6">精华</span>
                </div>
                <div class="content">
                    2017年底，住房和城乡建设部为今年房地产市场定调之后，2018年以来，福建、湖北、四川、江西、宁夏等多地已召开住房城乡工作会议。
                    从住房工作会议内容来看，各个城市目标从2017年的确保房价不上涨逐步转向防止房地产市场大起大落
                </div>
                <div class="link-div">
                    原文链接：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a>
                </div>
                <div class="line"></div>
            </div>

            <div class="item">
                <div class="title">
                    <span>厦门地铁一号线正式开通</span>
                    <span class="icon-text icon-text-0">正面</span></div>
                <div class="info">
                    <span class="span1">发布时间：</span>
                    <span class="span2">2018-01-09 14:34:13</span>
                    <span class="span3">发布渠道：</span>
                    <span class="span4">微博</span>
                    <span class="span5">文章类型：</span>
                    <span class="span6">精华</span>
                </div>
                <div class="content">
                    2017年底，住房和城乡建设部为今年房地产市场定调之后，2018年以来，福建、湖北、四川、江西、宁夏等多地已召开住房城乡工作会议。
                    从住房工作会议内容来看，各个城市目标从2017年的确保房价不上涨逐步转向防止房地产市场大起大落
                </div>
                <div class="link-div">
                    原文链接：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a>
                </div>
                <div class="line"></div>
            </div>

            <div class="item">
                <div class="title">
                    <span>厦门地铁一号线正式开通</span>
                    <span class="icon-text icon-text-2">负面</span></div>
                <div class="info">
                    <span class="span1">发布时间：</span>
                    <span class="span2">2018-01-09 14:34:13</span>
                    <span class="span3">发布渠道：</span>
                    <span class="span4">微博</span>
                    <span class="span5">文章类型：</span>
                    <span class="span6">精华</span>
                </div>
                <div class="content">
                    2017年底，住房和城乡建设部为今年房地产市场定调之后，2018年以来，福建、湖北、四川、江西、宁夏等多地已召开住房城乡工作会议。
                    从住房工作会议内容来看，各个城市目标从2017年的确保房价不上涨逐步转向防止房地产市场大起大落
                </div>
                <div class="link-div">
                    原文链接：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a>
                </div>
                <div class="line"></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dateRange: [new Date(), new Date()],
                channelType: '0',
                natureType: '0'
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            onSearch() {}
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .newsList-container {
        .search-panel {}

        .list-panel {
            .item {
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
                    margin: 8px 20px 26px;
                    height: 0;
                    border-top: 2px dotted #dee1ee;
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">

</style>