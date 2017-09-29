
<template>
    <div class="content" ref="content">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left" style="height: 100%">
                <!--<Menu active-name="/system/employee/add" theme="dark" @on-select="menuLink" width="auto">-->
                    <!--<div class="layout-logo-left">-->
                        <!--<img class="logo-img" src="../../images/xmgd.png" alt="">-->
                        <!--<div class="logo-title">轨道监管平台</div>-->
                    <!--</div>-->
                    <!--<Submenu name="1">-->
                        <!--<template slot="title">-->
                            <!--<Icon type="ios-navigate" :size="iconSize"></Icon>-->
                            <!--<span class="layout-text">从业人员</span>-->
                        <!--</template>-->
                        <!--<MenuItem name="/system/canvas">选项 1</MenuItem>-->
                        <!--<MenuItem name="/system/employee/add" >添加从业人员</MenuItem>-->
                        <!--<MenuItem name="1-3">选项 3</MenuItem>-->

                    <!--</Submenu>-->
                <!--</Menu>-->
            <Menu theme="dark" @on-select="menuLink" accordion width="auto">
                <div class="layout-logo-left">
                    <img class="logo-img" src="../../images/xmgd.png" alt="">
                    <div class="logo-title">轨道监管平台</div>
                </div>
                <Submenu v-for="lv1 in meunList" name="1">
                    <template v-if="!lv1.href">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">{{lv1.name}}</span>
                        </template>
                        <template v-for="lv2 in lv1.childrenList">
                            <template v-if="!lv2.href">
                                <MenuGroup :title="lv2.name">
                                    <MenuItem v-for="lv3 in lv2.childrenList" :name="lv3.href">{{lv3.name}}</MenuItem>
                                </MenuGroup>
                            </template>
                            <template v-else>
                                <MenuItem :name="lv2.href">{{lv2.name}}</MenuItem>
                            </template>
                        </template>
                    </template>

                    <template v-else>
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">{{lv1.name}}</span>
                        </template>
                        <MenuItem :name="lv1.href">{{lv1.name}}</MenuItem>
                    </template>

                </Submenu>
            </Menu>
            </Col>
            <Col :span="spanRight" style="height: 100%">
                <div class="layout-header">
                    <Button class="btn-layout" type="text" icon="log-out" title="退出" @click="logout"></Button>
                    <div class="userInfo">
                        <Avatar class="userImg" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" icon="person"/>
                        <!--<Avatar src="../../images/avatar.jpg" />-->
                        <!--<div class="userImg"><img src="../../images/avatar.jpg" alt=""></div>-->
                        <Dropdown class="userDrown">
                            <a href="javascript:void(0)">
                                {{userName}}
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>个人信息</DropdownItem>
                                <DropdownItem>修改密码</DropdownItem>
                                <DropdownItem>我的通知</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem href="#">某应用</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content"  id="layout-content">
                    <div class="layout-content-main" id="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>

</template>
<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
    import Iscroll from 'iscroll';
    export default {
        data() {
            return {
                spanLeft: 5,
                spanRight: 19,
                mList: [],
                userName: ''
            };
        },
        mounted: function() {

            this.userName = Util.cookie.get('xmgdname') || '';

            if (!this.$state.cancelScroll) {
                var myScroll = new Iscroll("#layout-content", {
                    mouseWheel: true,
                    scrollbars: true,
                    disableMouse: true,
                    disableTouch: true,
                    disablePointer: true  // 禁用鼠标，防止鼠标左键无法拖动地图。
                });
            }
//            this.getMenuData();

        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            meunList () {
                const that = this;
                var list = [];
                that.mList.forEach(function (val, index, attr) {
                    var id = val.id;
                    var aParentIds = val.parentIds.split(',');
                    aParentIds = aParentIds.slice(0, aParentIds.length - 1);

                    if (aParentIds.length === 2) {
                        val.childrenList = that.getChildrenMenu(id);
                        list.push(val);
                    }
                });
                return list;
            }
        },
        methods: {
            getMenuData () {
                var that = this;
                Util.ajax.get('/metro/auth/menuList')
                    .then(function (response) {
                        that.mList = response.result || [];
//                        console.log(response.result);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 遍历菜单
            getChildrenMenu (id) {
                var that = this;
                var child = [];
                that.mList.forEach(function (val) {
                    if ( id == val.parentId ) {
                        val.childrenList = that.getChildrenMenu(val.id);
                        child.push(val);
                    }
                });
                return child;
            },

            toggleClick() {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            menuLink (link) {

                this.$router.push(link);
            },
            logout () {
                const that = this;
                Util.ajax.get('/logout')
                    .then(function (response){
                        var router = new VueRouter();
                        Util.cookie.unset('xmgd');
                        Util.cookie.unset('xmgdname');
                        that.$store.commit('setToken', null);
                        router.push({ path: '/' });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .content{
        height: 100%;
        background: #f5f7f9;
        position: relative;
        overflow: hidden;

        .layout-menu-left{
            background: #464c5b;

            .layout-logo-left{
                width: 90%;
                height: 30px;
                background: #5b6270;
                border-radius: 3px;
                margin: 15px auto;
                .logo-img {
                    float: left;
                    margin: 5px;
                    height: 20px;
                }
                .logo-title {
                    float: left;
                    margin-top: 5px;
                    line-height: 20px;
                    color: #FFF;

                }
            }
        }

        .layout-header{
            height: 57px;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            .userInfo {
                float: right;
                padding-right: 19px;
                height: 100%;
                vertical-align: top;
                border-right: 1px solid rgba(0,0,0,.1);
                .userImg {
                    background-color: #87d068;
                    margin-top: 8px;
                    margin-right: 5px;
                }
                .userDrown {
                    margin-top: 19px;
                    vertical-align: top;
                }
            }

            .btn-layout {
                float: right;
                width: 69px;
                font-size: 26px;
            }
        }
        .layout-breadcrumb{
            padding: 10px 15px 0;
        }
        .layout-content{
            position: relative;
            height: calc(100% - 57px - 31px - 30px);
            min-height: 200px;
            margin: 15px 0;
            padding: 0 15px;
            overflow: hidden;
            background: #fff;
            border-radius: 4px;
            .layout-content-main{
                /*position: relative;*/
                /*height: 100%;*/
            }
        }

    }


    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>