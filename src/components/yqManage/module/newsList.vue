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
                    <span class="">中立</span></div>
                <div class="info">
                    <span>发布时间：</span>
                    <span>2018-01-09</span>
                    <span>发布渠道：</span>
                    <span>微博</span>
                    <span>文章类型：</span>
                    <span>精华</span>
                </div>
                <div class="content">
                    2017年底，住房和城乡建设部为今年房地产市场定调之后，2018年以来，福建、湖北、四川、江西、宁夏等多地已召开住房城乡工作会议。
                    从住房工作会议内容来看，各个城市目标从2017年的确保房价不上涨逐步转向防止房地产市场大起大落
                </div>
                <div class="link-div">
                    链接地址：<a href="http://www.baidu.com" target="_blank">http://www.baidu.com</a>
                </div>
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
</style>

<style lang="scss" rel="stylesheet/scss">

</style>