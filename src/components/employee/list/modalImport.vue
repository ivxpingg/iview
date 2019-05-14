<template>
    <Form  class="modalImport-container" label-width="160">
        <FormItem  label="从业人员导入:">
            <a :href="exportFileUrl" class="ivu-btn ivu-btn-warning" target="_blank" style="width: 200px; margin-bottom: 10px;">
                <Icon type="ios-cloud-download-outline"></Icon>
                <span>下载从业人员导入模板</span>
            </a>

            <Upload name="file1"
                    class="vFileUpload"
                    :action="importUrl1"
                    :headers="headers"
                    accept=".xlsx"
                    :on-error="handleError"
                    :on-success="handleSuccess1">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 200px;">从业人员导入</Button>
            </Upload>
        </FormItem>
        <FormItem  label="关键岗位人员头像上传:">
            <Upload name="file2"
                    class="vFileUpload"
                    :action="importUrl2"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess2">
                <Button type="success"
                        icon="ios-cloud-upload-outline"
                        style="width: 200px;">关键岗位人员头像上传</Button>
            </Upload>
        </FormItem>
        <FormItem label="特种设备作业人员头像上传:">
            <Upload name="file2"
                    class="vFileUpload"
                    :action="importUrl3"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess3">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 200px;">特种设备作业人员头像上传</Button>
            </Upload>
        </FormItem>
        <FormItem label="证件照片上传:">
            <Upload name="file2"
                    class="vFileUpload"
                    :action="importUrl4"
                    :headers="headers"
                    :on-error="handleError"
                    :on-success="handleSuccess4">
                <Button type="success" icon="ios-cloud-upload-outline" style="width: 200px;">证件照片上传</Button>
            </Upload>
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
          return Util.domain + '/xm/sys/employee/uploadKeyHeadPortrait';
        },
        importUrl3 () {
          return Util.domain + '/xm/sys/employee/uploadHeadPortrait';
        },
        importUrl4 () {
          return Util.domain + '/xm/sys/employee/uploadCertificate';
        },
        exportFileUrl () {
          return Util.domain + '/static/download/xlsx/从业人员信息导入模板.xlsx';
        }
      },
      data () {
        return {
          headers: {},
        };
      },
      method: {
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
            that.$Message.success("《"+file.name+"》上传成功！");
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
    }
</style>