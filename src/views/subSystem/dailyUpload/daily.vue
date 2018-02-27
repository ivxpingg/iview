<template>
    <div class="daily-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">

            <div class="box-panel">
                <div class="item">
                    <div class="title">运营生产日报</div>
                    <div class="center">
                        <div class="tip-msg tip-msg-green">今天已上传</div>
                        <div class="upload-panel">
                            <vFileUpload class="vFileUpload"
                                         :url="importFileUrl_daily"
                                         bText="运营生产日报上传"
                                         accept=".xlsx"
                                         @handleSuccess="handleSuccess_daily"></vFileUpload>
                        </div>
                    </div>
                    <div class="download">
                        <a :href="exportFileUrl_daily" class="ivu-btn ivu-btn-success mybtn" target="_blank"><span>下载模板</span></a>
                    </div>
                </div>
                <div class="item">
                    <div class="title">OD数据</div>
                    <div class="center">
                        <div class="tip-msg  tip-msg-red">今天未上传</div>
                        <div class="upload-panel">
                            <vFileUpload class="vFileUpload"
                                         :url="importFileUrl_OD"
                                         bText="OD数据上传"
                                         accept=".xlsx"
                                         @handleSuccess="handleSuccess_OD"></vFileUpload>
                        </div>
                    </div>
                    <div class="download"></div>
                </div>
            </div>

            <!--<a :href="exportFileUrl" class="ivu-btn ivu-btn-success mybtn" target="_blank"><span>下载模板</span></a>-->
            <!--<vFileUpload class="vFileUpload" :url="importFileUrl"  bText="运营生产日报上传" @handleSuccess="handleSuccess"></vFileUpload>-->
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
            }
        },
        components: {vFileUpload, vHeader, vFooter},
        created() {
            this.importFileUrl_daily = Util.domain + '/xm/inte/dailyDownloadParse/uploadDaily';
            this.exportFileUrl_daily = Util.domain + '/static/download/xlsx/运营生产日报_yyyy-mm-dd.xlsx';
        },
        mounted() {

        },
        methods: {
            handleSuccess_daily(response, file, fileList) {

                if (response.errCode == "A0002") {
                    this.$router.push({
                        path: '/',  // 路由名称
                        query: { redirect: this.$route.name }
                    });
                }
            },
            handleSuccess_OD(response, file, fileList) {
                if (response.errCode == "A0002") {
                    this.$router.push({
                        path: '/',  // 路由名称
                        query: { redirect: this.$route.name }
                    });
                }
            },

            // 判断运营生产日报今天是否上传过
            ifUpload_daily_today() {},
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
            //text-align: center;

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
        margin: 150px auto 0;
        width: 800px;
        border: 1px solid #e1e1e1;

        .item {
            display: flex;
            border-bottom: 1px solid #e1e1e1;

            &:last-child {
                border-bottom-width: 0;
            }
            .title {
                width: 150px;
                font-size: 16px;
                font-weight: 700;
                text-align: center;
                line-height: 150px;
                border-right: 1px solid #e1e1e1;
            }
            .center {
                flex: 1;

                .tip-msg {
                    margin-top: 15px;
                    padding-left:20px;
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
                    margin-top: 10px;
                    margin-left: 20px;
                    margin-right: 20px;
                }

            }
            .download {
                width: 150px;
                text-align: center;
                border-left: 1px solid #e1e1e1;

                a {
                    margin-top: 50px;
                }
            }
        }
    }
</style>