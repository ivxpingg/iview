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
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
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
        <Modal title="查看图片" v-model="visible">
            <img :src="previewImgSrc" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
    import Util from '../../../libs/util.js';
    export default {
        data() {
            return {
                defaultList: [
                ],
                uploadList: [],
                imgName: '',
                visible: false,
                url: '/sys/upload/picture',
                headers: {},
                previewImgSrc: 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/large'
            }
        },
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            multiple: {
                type: Boolean,
                default () {
                    return true;
                }
            },
            dataParams: {
                type: Object,
                default() {
                    return {
                        pictureType: 'HeadPortrait'
                    }
                }
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
                common: {
                    Authorization: Util.cookie.get('xmgd') || ''
                }
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
            },
            handleSuccess(res, file, fileList) {
                if (res.status == 1) {
                    file.url =  res.result.pictureUrl; //'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                    file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload (file) {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
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