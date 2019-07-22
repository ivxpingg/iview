<template>
    <Form  class="modalImport-container" label-width="100">
        <FormItem  label="从业人员导入:">
            <a :href="exportFileUrl" class="ivu-btn ivu-btn-warning" target="_blank" style="width: 160px; margin-right: 10px;">
                <Icon type="ios-cloud-download-outline"></Icon>
                <span>模板下载</span>
            </a>

            <Upload class="vFileUpload"
                    :action="importUrl1"
                    :show-upload-list="false"
                    :headers="headers"
                    accept=".xlsx"
                    :on-error="handleError"
                    :on-success="handleSuccess1">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 160px;">从业人员导入</Button>
            </Upload>
        </FormItem>
        <FormItem  label="关键岗位:">
            <Upload class="vFileUpload"
                    :action="importUrl2"
                    multiple
                    :show-upload-list="false"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess2">
                <Button type="success"
                        icon="ios-cloud-upload-outline"
                        style="width: 160px;">头像上传</Button>
            </Upload>

            <Upload class="vFileUpload"
                    :action="importUrl3"
                    multiple
                    :show-upload-list="false"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess3">
                <Button type="success"
                        icon="ios-cloud-upload-outline"
                        style="width: 160px;">证书照片上传</Button>
            </Upload>
        </FormItem>
        <FormItem label="特种设备作业:">
            <Upload class="vFileUpload"
                    :action="importUrl4"
                    multiple
                    :show-upload-list="false"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess4">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 160px;">头像上传</Button>
            </Upload>
            <Upload class="vFileUpload"
                    :action="importUrl5"
                    multiple
                    :show-upload-list="false"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess5">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 160px;">证书照片上传</Button>
            </Upload>
        </FormItem>
        <FormItem style="margin-bottom: 0;">
            <div style="color: #ed3f14;">
                注：头像及证书照片根据岗位类别分别上传,且以身份证号作为名称.
            </div>
        </FormItem>
    </Form>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
      name: 'modalImport',
      created () {
        this.headers = {
          Authorization: Util.cookie.get('xmgd') || ''
        };
      },
      computed: {
        importUrl1 () {
          return Util.domain + '/xm/sys/employee/uploadEmployeeExcel';
        },
        importUrl2 () {
          return Util.domain + '/xm/sys/employee/uploadHeadPortrait/key';
        },
        importUrl3 () {
          return Util.domain + '/xm/sys/employee/uploadCertificate/key';
        },
        importUrl4 () {
          return Util.domain + '/xm/sys/employee/uploadHeadPortrait/special';
        },
        importUrl5 () {
          return Util.domain + '/xm/sys/employee/uploadCertificate/special';
        },
        exportFileUrl () {
          return Util.domain + '/static/download/xlsx/从业人员信息导入模板.xlsx?t=' + Math.random();
        }
      },
      data () {
        return {
          headers: {},
        };
      },
      methods: {
        handleSuccess1(response, file, fileList) {
          var that = this;
          if (response.errCode == "A0002") {
            this.$router.push({
              path: '/',  // 路由名称
              query: { redirect: this.$route.name }
            });

            return;
          }
          if (response.status == 1) {
            this.$Message.success("《"+file.name+"》上传成功！");
            this.$emit('modal-callback');
          }
          else {
            that.$Message.error({
              content: response.errMsg,
              duration: 10,
              closable: true
            });
          }

        },
        handleSuccess2(response, file, fileList) {
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
          }
          else {
            that.$Message.error({
              content: response.errMsg,
              duration: 0,
              closable: true
            });
          }

        },
        handleSuccess3(response, file, fileList) {
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
          }
          else {
            that.$Message.error({
              content: response.errMsg,
              duration: 0,
              closable: true
            });
          }

        },
        handleSuccess4(response, file, fileList) {
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
          }
          else {
            that.$Message.error({
              content: response.errMsg,
              duration: 0,
              closable: true
            });
          }

        },
        handleSuccess5(response, file, fileList) {
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
          }
          else {
            that.$Message.error({
              content: response.errMsg,
              duration: 0,
              closable: true
            });
          }

        },
        handleError(error, file, fileList) {
          this.$Message.error({
            content: '上传失败！',
            duration: 5
          });
        },
      }
    }
</script>

<style lang="scss" scoped>
    .modalImport-container {
        .vFileUpload{
            display: inline-block;
            margin-right: 10px;
        }
    }
</style>