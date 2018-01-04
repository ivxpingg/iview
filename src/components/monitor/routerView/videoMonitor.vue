<template>
    <div class="videoMonitor-container">
        <div class="panel-tree">
            <div class="tree-search"></div>
            <div class="tree-box">
                <Tree :data="data1" ></Tree>

            </div>
        </div>
        <div class="panel-video"></div>
    </div>
</template>

<script>
    export default {
        data () {
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
                                            console.dir(node);
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
                        }]
            }
        },
        mounted() {},
        methods: {
            onSelectChange(n) {

                n[0].expand = !n[0].expand;
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .videoMonitor-container {

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