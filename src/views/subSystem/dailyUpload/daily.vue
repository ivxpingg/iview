<template>
    <div class="daily-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">
            <vFileUpload class="vFileUpload" :url="importFileUrl"  bText="运营生产日报上传"></vFileUpload>
            <a :href="exportFileUrl" class="ivu-btn ivu-btn-success mybtn" target="_blank"><span>下载模板</span></a>
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
                importFileUrl: '',
                exportFileUrl: '',
            }
        },
        components: {vFileUpload, vHeader, vFooter},
        created() {
            this.importFileUrl = Util.domain + '/xm/inte/dailyDownloadParse/uploadDaily';
            this.exportFileUrl = Util.domain + '/static/download/xlsx/运营生产日报_yyyy-mm-dd.xlsx';
        },
        mounted() {

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

            text-align: center;
        }

        .v-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>