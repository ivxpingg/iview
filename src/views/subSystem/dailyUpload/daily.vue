<template>
    <div class="daily-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">

            <div class="box-panel">
                <div class="item">
                    <div class="title">运营生产日报</div>
                    <div class="center">
                        <div class="tip-msg" :class="dailyFlag ? 'tip-msg-green':'tip-msg-red'">{{dailyFlag? '今日已上传运营生产日报':'今日未上传运营生产日报'}}</div>
                        <div class="upload-panel">
                            <Upload name="file"
                                    class="vFileUpload"
                                    :action="importFileUrl_daily"
                                    :headers="headers"
                                    accept=".xlsx"
                                    :on-error="handleError"
                                    :on-success="handleSuccess_daily"
                                    :before-upload="handleBeforeUpload_daily">
                                <Button type="success" shape="circle" icon="ios-cloud-upload-outline" size="large">运营生产日报上传</Button>
                            </Upload>
                        </div>
                    </div>
                    <div class="download">
                        <a :href="exportFileUrl_daily" class="ivu-btn ivu-btn-warning mybtn" target="_blank">
                            <Icon type="ios-cloud-download-outline"></Icon>
                            <span>下载模板</span>
                        </a>
                    </div>
                </div>

                <div class="item">
                    <div class="title">OD数据</div>
                    <div class="center">
                        <div class="tip-msg" :class="ODFlag == 'true'?'tip-msg-green':'tip-msg-red'">{{ODFlag == 'true'? '今日已上传OD数据':'今日未上传OD数据'}}</div>
                        <div class="upload-panel">

                            <Upload name="file"
                                    class="vFileUpload"
                                    :action="importFileUrl_OD"
                                    :headers="headers"
                                    accept=".xlsx"
                                    :on-error="handleError"
                                    :on-success="handleSuccess_OD"
                                    :before-upload="handleBeforeUpload_OD">
                                <Button type="success" shape="circle" icon="ios-cloud-upload-outline"  size="large" disabled="disabled">OD数据上传</Button>
                            </Upload>
                        </div>

                    </div>
                    <div class="download"></div>
                </div>

            </div>
        </div>
        <vFooter class="v-footer"></vFooter>
    </div>

</template>
<script>
    import Util from '../../../libs/util';
    import vFileUpload from '../../../components/upload/fileUpload/fileUpload.vue';
    import vHeader from '../../../components/daily/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {
                importFileUrl_OD: '',
                importFileUrl_daily: '',
                exportFileUrl_daily: '',
                dailyFlag: '',  // 'true':今日已上传过, 'false': 今日没有上传过
                ODFlag: '',

                headers: {}
            }
        },
        components: {vFileUpload, vHeader, vFooter},
        created() {
            this.importFileUrl_daily = Util.domain + '/xm/inte/dailyDownloadParse/uploadDaily';
            this.exportFileUrl_daily = Util.domain + '/static/download/xlsx/运营生产日报_yyyy-mm-dd.xlsx';

            this.headers = {
                Authorization: Util.cookie.get('xmgd') || ''
            }
        },
        mounted() {
            this.ifUpload_daily_today();
        },
        methods: {
            handleBeforeUpload_daily(file) {
                var that = this;

                return new Promise(
                    function(resolve, reject) {
                        if (that.dailyFlag == true) {
                            that.$Modal.confirm({
                                title: '提示',
                                content: '<p>今天《运营生产日报》已上传，是否覆盖?</p>',
                                loading: false,
                                onOk: () => {
                                    resolve();
                                },
                                onCancel: () => {
                                    reject();
                                }
                            });
                        }
                        else {
                            resolve();
                        }
                    }
                );

            },
            handleSuccess_daily(response, file, fileList) {
                var that = this;
                if (response.errCode == "A0002") {
                    this.$router.push({
                        path: '/',  // 路由名称
                        query: { redirect: this.$route.name }
                    });

                    return;
                }
                console.dir(response);
                if (response.status == 1) {
                    that.$Message.success("《"+file.name+"》上传成功！");
                    that.ifUpload_daily_today();
                }
                else {
                    that.$Message.error({
                        content: response.errMsg,
                        duration: 5,
                        closable: true
                    });
                }

            },
            handleError(error, file, fileList) {
                console.dir(error);
                this.$Message.error({
                    content: '上传失败！',
                    duration: 3
                });
            },

            handleBeforeUpload_OD(file) {
                var that = this;

                return new Promise(
                    function(resolve, reject) {
                        if (that.dailyFlag == true) {
                            that.$Modal.confirm({
                                title: '提示',
                                content: '<p>今天《OD数据》已上传，是否覆盖?</p>',
                                loading: false,
                                onOk: () => {
                                    resolve();
                                },
                                onCancel: () => {
                                    reject();
                                }
                            });
                        }
                        else {
                            resolve();
                        }
                    }
                );

            },

            handleSuccess_OD(response, file, fileList) {
                if (response.errCode == "A0002") {
                    this.$router.push({
                        path: '/',  // 路由名称
                        query: { redirect: this.$route.name }
                    });
                    return;
                }

                if (response.status == 1) {
                    that.$Message.success("《"+file.name+"》上传成功！");
                    that.ifUpload_OD_today();
                }
                else {
                    that.$Message.error(response.errMsg);
                }
            },

            // 判断运营生产日报今天是否上传过
            ifUpload_daily_today() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/inte/dailyDownloadParse/checkTodayUpload',
                    params: {}
                }).then(function (response) {
                    if (response.status == 1) {

                        that.dailyFlag = response.result.flag;
                    } else {

                    }
                }).catch(function () {
                    that.$Modal.remove();
                    that.$Message.info('删除失败!');
                });
            },
            // 判断OD数据今天是否上传过
            ifUpload_OD_today() {}
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .daily-container {
        position: relative;
        height: 100%;

        .v-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }

        .router-view {
            position: relative;
            padding-top: 87px;
            padding-bottom: 30px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-height: 900px;
            background: #ccd7dd url(./images/bg.png) center 70px no-repeat;

            .mybtn {
               // margin-top: 150px;
            }
            .vFileUpload {
              //  margin-top: 20px;
            }
        }

        .v-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }


    .box-panel {
        margin: 135px auto 0;
        width: 900px;
        background: rgba(169,206,237,0.8);
        border: 1px solid #c6dcf2;
        border-left: 5px solid rgba(119,178,225, 0.8);

        .item {
            display: flex;
            border-bottom: 1px solid #c6dcf2;

            &:last-child {
                border-bottom-width: 0;
            }
            .title {
                width: 200px;
                font-size: 16px;
                font-weight: 700;
                text-align: center;
                line-height: 224px;
                border-right: 1px solid #c6dcf2;
            }
            .center {
                flex: 1;

                .tip-msg {
                    margin-top: 40px;
                    padding-left:54px;
                    height: 35px;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 35px;

                    &.tip-msg-green {
                        color: green;
                    }
                    &.tip-msg-red {
                        color: red;
                    }
                }
                .upload-panel {
                    margin-top: 18px;
                    margin-left: 20px;
                    margin-right: 20px;
                    text-align: center;
                }

            }
            .download {
                width: 200px;
                text-align: center;
                border-left: 1px solid #c6dcf2;

                a {
                    margin-top: 90px;
                }
            }
        }
    }
</style>