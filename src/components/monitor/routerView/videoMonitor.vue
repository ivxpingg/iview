<template>
    <div class="videoMonitor-container">
        <div class="panel-tree">
            <div class="tree-search"></div>
            <div class="tree-box">
                <Tree :data="data2" ></Tree>
            </div>
        </div>
        <div class="panel-video">
            <iframe :src="iframeSrc" id="iframe_video" frameborder="0" height="100%" width="100%"></iframe>
        </div>
    </div>
</template>

<script>
    import Util from '../../../libs/util';
    export default {
        data () {
            var that = this;
            return {
                data1: [{
                            title: '站点视频监控',
                            expand: true,
                            render: (h, { root, node, data }) => {

                                return h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%'
                                    },
                                    on: {
                                        click: () => {
                                            data.expand = !data.expand;
                                            console.dir(root);
                                            console.dir(node);
                                            console.dir(data);
                                        }
                                    }
                                }, [
                                    h('span', [
                                        h('Icon', {
                                            props: {
                                                type: 'ios-folder-outline'
                                            },
                                            style: {
                                                marginRight: '8px'
                                            }
                                        }),
                                        h('span', data.title)
                                    ])]
                                )
                            },
                            children: [
                                {
                                    title: '岩内战',
                                    expand: true,
                                    children: [
                                        {
                                            title: '位点-1'
                                        },
                                        {
                                            title: '位点-2'
                                        }
                                    ]
                                },
                                {
                                    title: '厦门北站',
                                    expand: true,
                                    children: [
                                        {
                                            title: '位点-1'
                                        },
                                        {
                                            title: '位点-2'
                                        }
                                    ]
                                }
                            ]
                        }, {
                                title: '列车视频监控',
                                expand: true,
                                children: [
                                    {
                                        title: '00101',
                                        expand: true,
                                        children: [
                                            {
                                                title: '位点-1'
                                            },
                                            {
                                                title: '位点-2'
                                            }
                                        ]
                                    },
                                    {
                                        title: '00201',
                                        expand: true,
                                        children: [
                                            {
                                                title: '位点-1'
                                            },
                                            {
                                                title: '位点-2'
                                            }
                                        ]
                                    }
                                ]
                        }],

                data2: [
                    {
                        title: '列车视频监控',
                        expand: true,
                        render(h, {root, node, data}) {
                            return that.renderContent(h, {root, node, data});
                        },
                        children: [
                            {
                                title: '厦门市公安局',
                                expand: true,
                                render(h, {root, node, data}) {
                                    return that.renderContent(h, {root, node, data});
                                },
                                children: [
                                    {
                                        title: '厦禾路',
                                        render(h, {root, node, data}) {
                                            return that.renderContent(h, {root, node, data});
                                        },
                                        children: [
                                            {
                                                title: '2028厦禾路白鹭洲路口',
                                                puid: 'c34fdcecdef6434db242dbc2fdbee61d@kedacom',
                                                render(h, {root, node, data}) {
                                                   return that.renderContent(h, {root, node, data});
                                                }
                                            },
                                            {
                                                title: '厦禾路银行中心路口3',
                                                puid: '802e4068b3904192948fbbb7f9c5f511@kedacom',
                                                render(h, {root, node, data}) {
                                                    return that.renderContent(h, {root, node, data});
                                                }
                                            },
                                            {
                                                title: '厦禾路公园小学路口3bf',
                                                puid: '7216441fdd4043bc9cc13d8fcb780aee@kedacom',
                                                render(h, {root, node, data}) {
                                                    return that.renderContent(h, {root, node, data});
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],

                    }
                ],

                iframeSrc: '',
                windowIndex: 0,
            }
        },
        mounted() {
//            window.onmessage = function (ev) {
//
//                console.log(100)
//                console.log(ev.data);
//            }
            var that = this;

//            setInterval(function () {
//
//                document.getElementById("iframe_video").contentWindow.postMessage({  }, '*');
////                window.frames['iframe_video'].contentWindow.postMessage({ auth: '24', d: '5' }, '*');
//
//                that.windowIndex = 0;
//            }, 1000);

            this.initIframeSrc();
        },
        methods: {
            initIframeSrc() {
                this.iframeSrc = "/html/video.html";
            },
            onSelectChange(n) {

                n[0].expand = !n[0].expand;
            },
            renderContent (h, { root, node, data }) {

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
                                     data.expand = !data.expand;
                                 }
                             }
                         }, [ h('span', data.title)]);

                 }
                 else {
                     return  h('span', {
                         style: {
                             display: 'inline-block',
                             width: '100%'
                         },
                         on: {
                             click: () => {
                                 alert(data.puid);
                             }
                         }
                     }, [ h('span', data.title)]);
                 }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .videoMonitor-container {
         display: flex;
         height: 530px;
        .panel-tree {
            width: 260px;
        }

        .panel-video {
            position: relative;
            flex: 1;
            overflow: hidden;
        }
    }


</style>

<style lang="scss" rel="stylesheet/scss">

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
</style>