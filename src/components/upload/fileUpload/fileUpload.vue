<template>
    <Upload name="file"
            :class="mclass"
            :action="url"
            :headers="headers"
            :data="dataParams"
            :accept="accept"
            :format="format"
            :multiple="multiple"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :before-upload="handleBeforeUpload"
            :on-error="handleError">
        <Button type="ghost" icon="ios-cloud-upload-outline">{{bText}}</Button>
    </Upload>
</template>
<script>
    import Util from '../../../libs/util.js';
    export default {
        data() {
            return {
                // url: '/sys/upload/picture',  // 请求地址
                headers: {}
            }
        },
        props: {
            mclass: {
                type: String,
                default() {
                    return '';
                }
            },
            url: {
                type: String,
                default() {
                    return '';
                }
            },
            // 上传时附带的额外参数
            dataParams: {
                type: Object,
                default() {
                    return {}
                }
            },
            multiple: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            bText: {
                type: String,
                default() {
                    return '上传文件'
                }
            },
            format: {
                type: Array,
                default() {
                    return [];
                }
            },
            accept: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        mounted () {
            this.headers = {
                 Authorization: Util.cookie.get('xmgd') || ''
            }
        },
        methods: {
            handleBeforeUpload() {},
            handleProgress(event, file, fileList) {

            },
            handleSuccess(response, file, fileList) {
//                console.dir(response);
                this.$emit('handleSuccess', response, file, fileList);
            },
            handleError(error, file, fileList) {
                debugger
                console.dir(error);
            }
        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>

</style>