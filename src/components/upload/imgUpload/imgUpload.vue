<template>
    <div class="img-upload">
        <div class="upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            :headers="headers"
            :data="dataParams"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :accept="accept"
            :format="['jpg','jpeg','png','bmp','gif']"
            :max-size="10240"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :multiple="multiple"
            type="drag"
            :action="actionUrl"
            :with-credentials="true"
            name="file"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="查看图片" v-model="visible" style="z-index: 1000">
            <img :src="previewImgSrc" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
    import Util from '../../../libs/util.js';
    export default {
        data() {
            return {
                uploadList: [],              // 上传图片信息
                visible: false,              // 浏览图片弹出窗隐藏/显示
                url: '/xm/sys/upload/picture',  // 请求地址
                headers: {},                 // 请求的头部信息
                previewImgSrc: '' // 预览图片的地址
            }
        },
        props: {
            // 默认上传图片信息
            defaultList: {
                type: Array,
                default() {
                    return [];
                }
            },
            accept: {
                type: String,
                default() {
                    return ".jpg,.jpeg,.png,.bmp,.gif";
                }
            },
            // 是否支持多选文件, 默认单选
            multiple: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            // 上传时附带的额外参数
            dataParams: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 最大上传数量
            maxCount: {
                type: Number,
                default () {
                    return 20;
                }
            },
            /**
             *　文件上传成功后回调的函数，附带fileList参数。
             */
            onSuccess: Function
        },
        destroyed() {
            this.uploadList = [];
        },
        watch: {
            defaultList (val, oldVal) {
                var that = this;
                this.uploadList = [];
                val = val.map(item => {
                    item.status = 'finished';
                    item.percentage = 100;
                    item.uid = Date.now() + this.tempIndex++;
                    return item;
                });
                oldVal.forEach(function (val) {
                    that.uploadList.forEach(function (val2) {

                        if (val.url == val2.url) {
                            that.uploadList.splice(that.uploadList.indexOf(val2), 1);
                        }
                    });
                });

                val.forEach(function (val, index) {
                    that.uploadList.splice(index, 0, val);
                });
            }
        },
        computed: {
            actionUrl () {
                return Util.domain + this.url;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;

            this.headers = {
                  Authorization: Util.cookie.get('xmgd') || ''
            }
        },
        methods: {
            handleView (url) {
                this.previewImgSrc = url;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.uploadList = this.$refs.upload.fileList;

                if (this.onSuccess) {
                    this.onSuccess(this.$refs.upload.fileList);
                }
            },
            handleSuccess(res, file, fileList) {

                if (res.status == 1) {
                    file.url =  Util.domain + res.result.pictureUrl;
                    file.name = res.result.pictureName;
                    file.pictureId = res.result.pictureId
                }
                else {
                    const mfileList = fileList;
                    fileList.splice(mfileList.indexOf(file), 1);
                    this.$Notice.warning({
                        title: '提示',
                        desc: res.errMsg
                    });
                }

                if (!this.multiple) {
                    fileList = [file];
                }
                this.uploadList = fileList;

                if (this.onSuccess) {
                    this.onSuccess(fileList);
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg | jpeg | png | bmp | gif 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 10M。'
                });
            },
            handleBeforeUpload (file) {
                const check = this.uploadList.length < this.maxCount;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 ' + this.maxCount + ' 张图片。'
                    });
                }
                return check;
            }
        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>
    .upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .upload-list img{
        width: 100%;
        height: 100%;
    }
    .upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .upload-list:hover .upload-list-cover{
        display: block;
    }
    .upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>