<template>
    <div class="daily-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">

            <div class="box-panel">
                <div class="item">
                    <div class="title">运营生产日报</div>
                    <div class="center">
                        <div class="tip-msg" :class="dailyFlag ? 'tip-msg-green':'tip-msg-red'">{{dailyFlag? '已上传'+countDateFormat+'的运营生产日报':'未上传'+countDateFormat+'的运营生产日报'}}</div>
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
                        <div class="tip-msg" :class="ODFlag == 'true'?'tip-msg-green':'tip-msg-red'">{{ODFlag? '已上传' + countDateFormat_OD + '的OD数据':'未上传' + countDateFormat_OD + '的OD数据'}}</div>
                        <div class="upload-panel">

                            <Upload name="file"
                                    class="vFileUpload"
                                    :action="importFileUrl_OD"
                                    :headers="headers"
                                    accept=".xlsx"
                                    :on-error="handleError"
                                    :on-success="handleSuccess_OD"
                                    :before-upload="handleBeforeUpload_OD">
                                <Button type="success" shape="circle" icon="ios-cloud-upload-outline"  size="large">OD数据上传</Button>
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
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                importFileUrl_OD: '',
                importFileUrl_daily: '',
                exportFileUrl_daily: '',
                dailyFlag: '',  // 'true':今日已上传过, 'false': 今日没有上传过
                countDate: '',
                ODFlag: '',

                countDate_OD: '',

                headers: {}
            }
        },
        computed: {
            // 把 countDate 日期转为MM月DD日
            countDateFormat() {
                return this.countDate!='' ? MOMENT(this.countDate).format('MM月DD日') : '';
            },
            countDateFormat_OD() {
                return this.countDate_OD!='' ? MOMENT(this.countDate_OD).format('MM月DD日') : '';
            }
        },
        components: {vFileUpload, vHeader, vFooter},
        created() {

            this.importFileUrl_daily = Util.domain + '/xm/inte/dailyDownloadParse/uploadDaily';
            this.exportFileUrl_daily = Util.domain + '/static/download/xlsx/交通局每日报送材料_yyyy-mm-dd.xlsx';

            this.importFileUrl_OD = Util.domain + '/xm/traffic/uploadODData/uploadOD';

            this.headers = {
                Authorization: Util.cookie.get('xmgd') || ''
            }
        },
        mounted() {
            this.ifUpload_daily_today();
            this.ifUpload_OD_today();
        },
        methods: {
            handleBeforeUpload_daily(file) {
                var that = this;

                if(file.name.indexOf(that.countDate) > 0) {
                    return new Promise(
                        function (resolve, reject) {
                            if (that.dailyFlag == true) {

                                that.$Modal.confirm({
                                    title: '提示',
                                    content: '<p>' + that.countDateFormat + '的运营生产日报已上传，是否覆盖?</p>',
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
                }
                else {

                }

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
                if (response.status == 1) {
                    that.$Message.success("《"+file.name+"》上传成功！");
                    that.ifUpload_daily_today();
                }
                else {
                    that.$Message.error({
                        content: response.errMsg,
                        duration: 10,
                        closable: true
                    });
                }

            },
            handleError(error, file, fileList) {
                console.dir(error);
                this.$Message.error({
                    content: '上传失败！',
                    duration: 5
                });
            },

            handleBeforeUpload_OD(file) {
                var that = this;
debugger
                if(file.name.indexOf(that.countDate_OD) > 0) {
                    return new Promise(
                        function (resolve, reject) {
                            if (that.ODFlag == true) {

                                that.$Modal.confirm({
                                    title: '提示',
                                    content: '<p>' + that.countDateFormat_OD + '的OD数据已上传，是否覆盖?</p>',
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
                }
                else {

                }

            },

            handleSuccess_OD(response, file, fileList) {
                var that = this;
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
                    that.$Message.error({
                        content: response.errMsg,
                        duration: 10,
                        closable: true
                    });
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
                        that.countDate = response.result.countDate;
                        that.dailyFlag = response.result.flag;
                    } else {
                        that.countDate = '';
                        that.dailyFlag = false;
                    }
                }).catch(function () {
                });
            },
            // 判断OD数据今天是否上传过
            ifUpload_OD_today() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/traffic/uploadODData/checkTodayUpload',
                    params: {}
                }).then(function (response) {
                    if (response.status == 1) {
                        that.countDate_OD = response.result.countDate;
                        that.ODFlag = response.result.flag;
                    } else {
                        that.countDate_OD = '';
                        that.ODFlag = false;
                    }
                }).catch(function () {
                });
            }
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