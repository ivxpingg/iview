<template>
    <div class="videoMonitor-container" style="height: 100%">
        <div class="panel-tree">
            <div class="tree-search">
                <Form ref="formInline"  inline>
                    <FormItem prop="">
                        <Input type="text" v-model="searchValue" placeholder="" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary"  icon="ios-search" @click="onSubmit">检索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="btn-box">
                <Button type="ghost" shape="circle" icon="ios-grid-view" title="屏幕" @click="videoSwitch">屏幕</Button>
                <Button type="ghost" shape="circle" icon="arrow-expand" title="全屏" @click="videoZoom">全屏</Button>
                <Button type="ghost" shape="circle" icon="close-round" title="关闭" @click="videoStop">关闭</Button>
            </div>
            <div class="tree-box">
                <Tree :data="treeData" :load-data="loadData"></Tree>
            </div>
        </div>
        <div class="panel-video">
            <iframe :src="iframeSrc" id="iframe_video" frameborder="0" height="100%" width="100%"></iframe>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    import deepCopy from 'deep-copy';
    import MOMENT from 'moment';
    export default {
        data () {
            var that = this;
            return {
                searchValue: '',     // 检索表单控件model
                keyword: '',         // 检索关键字
                baseData: [],
                ajaxData: [],
                treeData: [],        // 检索后的数据
                searchData: [],

                iframeSrc: '',
                windowIndex: 0,
                contentWindow: null,
                screenNum: 4   //屏幕数量
            };
        },
        watch: {
            keyword(value) {
                var that = this;

                var datas = [],
                    reValue;

                that.baseData.forEach(function (obj) {
                    reValue = that.searchTree(value, obj);
                    if (reValue != null) {
                        datas.push(reValue);
                    }
                });

                this.ajaxData = datas;
            },
            ajaxData: {
                deep: true,
                handler(val) {
                    var that = this;
                    that.searchData = [];

                    val.forEach(function (v) {
                        that.searchData.push(that.callBackDataToTreeData(v, true));
                    });

                    var obj = {
                        title: '视频监控',
                        expand: true,
                        render(h, {root, node, data}) {
                            return that.renderContent(h, {root, node, data});
                        },
                        children: []
                    };


                    val.forEach(function (v) {
                        obj.children.push(that.callBackDataToTreeData(v, false));
                    });

                    that.treeData = [obj];
                }
            }
        },
        mounted() {
            var that = this;

            this.onMessage();

            this.getData();

            this.contentWindow = document.getElementById("iframe_video").contentWindow;

            this.initIframeSrc();
        },
        methods: {
            // 接受iframe 的传递信息
            onMessage() {
                var that = this;
                window.onmessage = function (ev) {
                    switch(ev.data.type) {
                        case 'windowIndex':
                            that.windowIndex = ev.data.windowIndex;
                            break;
                        default: break;
                    }
                };
            },
            initIframeSrc() {
                this.iframeSrc = "/html/video.html";
            },

            loadData(item, callback) {
                var that = this;

                for (var i = 0; i < that.searchData.length; i++) {
                    if (that.searchData[i].videoPositionInfoId === item.videoPositionInfoId) {

                        callback(that.searchData[i].children);

                    }
                }
            },

            // ajax 获取树
            getData() {
                var that = this;
                this.$Spin.show();

                Util.ajax({
                    method: "get",
                    url: '/xm/run/videoPosition/getVideoPositionInfo',
                    data: {}
                }).then(function(response){
                    that.$Spin.hide();
                    if (response.status === 1) {
                        that.ajaxData = response.result.videoPositionList;
                        that.baseData = deepCopy(response.result.videoPositionList);
                    }
                    else {}
                }).catch(function (error) {
                    that.$Spin.hide();
                    console.log(error);
                })
            },

            callBackDataToTreeData(children, deep) {
                var that = this;

                var obj = {
                    title: children.groupName,
                    expand: false,
                    videoPositionInfoId: children.videoPositionInfoId,
                    render(h, {root, node, data}) {
                        return that.renderContent(h, {root, node, data});
                    }
                }

                if (children.puId) {
                    obj.puid = children.puId;
                }


                if (children.childVideoPosition && children.childVideoPosition.length > 0) {
                    obj.loading = false;
                    obj.children = [];
                }

                if (deep && children.childVideoPosition && children.childVideoPosition.length > 0) {
                    children.childVideoPosition.forEach(function (v) {
                        obj.children.push(that.callBackDataToTreeData(v, deep));
                    });
                }

                return obj;
            },

            //  提交检索
            onSubmit() {
                this.keyword = this.searchValue.trim();
            },

            // 数据检索

            /**
             * @keyname [String]
             * @children [Object]
             * @return Object || null
             */
            searchTree(keyname, children) {
                var pChildren = {};

                var childVideoPosition = [];

                if (children.childVideoPosition && children.childVideoPosition.length > 0) {
                    children.childVideoPosition.forEach(function (val) {
                        if (val.groupName.indexOf(keyname) >= 0){
                            childVideoPosition.push(deepCopy(val));
                        }
                    });
                }

                if (childVideoPosition.length > 0) {
                    pChildren = {
                        groupName: children.groupName,
                        insTime: children.insTime,
                        stationId: children.stationId,
                        videoPositionInfoId: children.videoPositionInfoId,
                        childVideoPosition: childVideoPosition
                    };
                }
                else {
                    if (children.groupName.indexOf(keyname) >= 0){
                        pChildren = {
                            groupName: children.groupName,
                            insTime: children.insTime,
                            stationId: children.stationId,
                            videoPositionInfoId: children.videoPositionInfoId
                        };
                    }
                    else {
                        pChildren = null;
                    }
                }

                return pChildren;
            },

            // 树的方法
            onSelectChange(n) {
                n[0].expand = !n[0].expand;
            },
            renderContent (h, { root, node, data }) {
                var that = this;

                var title = data.title, dom = [];

                if (this.keyword != '' && title.indexOf(this.keyword) != -1) {
                    var ls = title.split(this.keyword);
                    var dls = [];

                    for(var i = 0; i < ls.length; i++) {
                        dls.push(ls[i]);
                        if (i != (ls.length - 1)) {
                            dls.push(h('span', {'class': {'font-color-highlight': true}}, this.keyword));
                        }
                    }

                    dom = [ h('span', dls)];
                }
                else {
                    dom = [ h('span', title)];
                }

                 if (!data.puid) {

                     return  h('span', {
                             'class': {
                                 'ivu-tree-title': true
                             },
                             style: {
                                 display: 'inline-block',
                                 width: '100%'
                             },
                             on: {
                                 click: () => {
                                     if (data.children && data.children.length > 0) {
                                         data.expand = !data.expand;
                                     }
                                 }
                             }
                         }, dom);

                 }
                 else {
                     return  h('span', {
                         'class': {
                             'ivu-tree-title': true
                         },
                         style: {
                             display: 'inline-block',
                             width: '100%'
                         },
                         on: {
                             click: () => {
                                 that.onClickToPostMessage(data);
                             },
                             dblclick: () => {

                             }
                         }
                     }, [
                         h('span', [
                             h('Icon', {
                                 props: {
                                     type: 'ios-videocam-outline'
                                 },
                                 style: {
                                     marginRight: '8px'
                                 }
                             }),
                             dom
                         ])]);
                 }
            },
            /**
             * 给iframe传递信息
             * @param data
             */
            onClickToPostMessage(data) {

                var info = {
                    type: 'video',
                    video: {
                        puid: data.puid,
                        screenNum: this.screenNum
                    }
                };
                this.contentWindow.postMessage(info, '*');

                if (this.screenNum === 4) {
                    this.windowIndex = (this.windowIndex + 1) % 4;
                }
                else {
                    this.windowIndex = (this.windowIndex + 1) % 9;
                }
            },

            // 设置屏幕数量
            videoSwitch() {
                this.screenNum = this.screenNum === 4 ? 9 : 4;
                this.windowIndex = 0;
                var info = {
                    type: 'videoScreen',
                    video: {
                        screenNum: this.screenNum
                    }
                };
                this.contentWindow.postMessage(info, '*');
            },
            videoZoom() {
                var info = {
                    type: 'videoZoom',
                    video: {}
                };
                this.contentWindow.postMessage(info, '*');
            },
            videoStop() {
                var info = {
                    type: 'videoStop',
                    video: {
                        windowIndex: this.windowIndex
                    }
                };
                this.contentWindow.postMessage(info, '*');
//                this.windowIndex = (this.windowIndex + 1) % 4;
            },
            handleSpinShow() {
                this.$Spin.show();

                setTimeout(() =>{
                    this.$Spin.hide();
                }, 3000);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .videoMonitor-container {
        position: relative;
        /*top: 87px;*/
        width: 100%;
        display: flex;
        height: 100%;
        overflow: auto;
        /*height: 717px;*/
        .panel-tree {
            position: relative;
            width: 280px;
            height: 100%;
            min-height: 717px;
            overflow-y: hidden;

            &:after {
                content: "";
                display: block;
                width: 1px;
                height: 100%;
                background: #dddee1;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 1;
            }

            .tree-search {
                position: relative;
                padding: 10px 0;
                text-align: center;
                background: #FFF;
                z-index: 1;
                &:after {
                    content: "";
                    display: block;
                    height: 1px;
                    width: 90%;
                    background: #dddee1;
                    position: absolute;
                    bottom: 0;
                    left: 5%;
                    right: 5%;
                    z-index: 1;
                }
            }
            .btn-box {
                position: relative;
                padding-top: 10px;
                padding-right: 10px;
                padding-bottom: 10px;
                text-align: right;
                background: #FFF;
                z-index: 2;
            }

            .tree-box {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100%;
                padding-left: 15px;
                padding-top: 106px;
                overflow-y: auto;
            }
        }

        .panel-video {
            position: relative;
            flex: 1;
            overflow: hidden;
            height: 100%;
            min-height: 717px;
        }
    }


</style>

<style lang="scss" rel="stylesheet/scss">
    .tree-search {
        .ivu-form-item {
            margin-bottom: 0;
        }
    }


    .ivu-menu .ivu-menu{
        padding-left:20px;
    }

    .ivu-menu >.ivu-menu-submenu-title >.ivu-menu-submenu-title-icon{
        transform: rotate(0deg);
    }

    .ivu-menu.ivu-menu-opened >.ivu-menu-submenu-title >.ivu-menu-submenu-title-icon{
        transform: rotate(180deg);
    }

    .ivu-menu-custom {
        background: #495060;
    }

    .font-color-highlight {
        color: orange;
    }
</style>