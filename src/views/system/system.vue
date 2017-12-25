
<template>
    <div class="content" ref="content">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left" style="height: 100%">

            <Menu ref="menu" theme="dark" :active-name="menuActiveName" :open-names="openNames" @on-select="menuLink" accordion width="auto">
                <div class="layout-logo-left">
                    <img class="logo-img" src="../../images/xmgd.png" alt="">
                    <div class="logo-title">{{ meunList.appFunction.funcName }}</div>
                </div>
                <template v-if="!!meunList.children">
                    <Submenu v-for="lv1 in meunList.children" name="1">
                        <template v-if="!lv1.appFunction.url">
                            <template slot="title">
                                <Icon type="ios-navigate" :size="iconSize"></Icon>
                                <span class="layout-text">{{lv1.appFunction.funcName}}</span>
                            </template>
                            <template v-if="!!lv1.children">
                                <template v-for="lv2 in lv1.children">
                                    <template v-if="!lv2.appFunction.url">
                                        <MenuGroup :title="lv2.appFunction.funcName">
                                            <template v-if="!!lv2.children">
                                                <MenuItem v-for="lv3 in lv2.children" :name="lv3.appFunction.url">{{lv3.appFunction.funcName}}</MenuItem>
                                            </template>
                                        </MenuGroup>
                                    </template>
                                    <template v-else>
                                        <MenuItem :name="lv2.appFunction.url">{{lv2.appFunction.funcName}}</MenuItem>
                                    </template>
                                </template>
                            </template>

                        </template>
                        <template v-else>
                            <template slot="title">
                                <Icon type="ios-navigate" :size="iconSize"></Icon>
                                <span class="layout-text">{{lv1.appFunction.funcName}}</span>
                            </template>
                            <MenuItem :name="lv1.appFunction.url">{{lv1.appFunction.funcName}}</MenuItem>
                        </template>
                    </Submenu>
                </template>
            </Menu>

            </Col>
            <Col :span="spanRight" style="height: 100%">
                <!--<div class="layout-header">-->
                    <!--<Button class="btn-layout" type="text" icon="log-out" title="退出" @click="logout"></Button>-->
                    <!--<div class="userInfo">-->
                        <!--<Avatar class="userImg" :src="userHeaderImgUrl" size="large" icon="person"/>-->
                        <!--&lt;!&ndash;<Avatar src="../../images/avatar.jpg" />&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="userImg"><img src="../../images/avatar.jpg" alt=""></div>&ndash;&gt;-->
                        <!--<Dropdown class="userDrown">-->
                            <!--<a href="javascript:void(0)">-->
                                <!--{{userName}}-->
                                <!--<Icon type="arrow-down-b"></Icon>-->
                            <!--</a>-->
                            <!--<DropdownMenu slot="list">-->
                                <!--<DropdownItem>个人信息</DropdownItem>-->
                                <!--<DropdownItem>修改密码</DropdownItem>-->
                                <!--<DropdownItem>我的通知</DropdownItem>-->
                            <!--</DropdownMenu>-->
                        <!--</Dropdown>-->
                    <!--</div>-->

                <!--</div>-->
                <vHeader></vHeader>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">{{breadcrumbItem}}</BreadcrumbItem>
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
    import vHeader from '../../components/layout/header/header.vue';
    import VueRouter from 'vue-router';
    import Iscroll from 'iscroll';
    export default {
        data() {
            return {
                spanLeft: 4,
                spanRight: 20,
                mList: null,
                userName: '',
                userHeaderImgUrl: '',
                funcId: '',  // 系统菜单功能编号
                myScroll: null,
                breadcrumbItem: '',

                menuTitle: {},

                menuActiveName: '',
                openNames: ["1"]
            };
        },
        components: {vHeader},
        mounted: function() {

            this.funcId = this.$route.params.funcId;

            this.userName = Util.cookie.get('xmgdname') || '';

            this.userHeaderImgUrl = '/static/img/avatar.jpg';

            this.$store.commit('setSystemScroll', new Iscroll("#layout-content", {
                mouseWheel: true,
                scrollbars: true,
                disableMouse: true,
                disableTouch: true,
                disablePointer: true  // 禁用鼠标，防止鼠标左键无法拖动地图。
            }));
            this.getMenuData();

        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            meunList () {

                if (!this.mList) {
                    return {appFunction: {
                        funcName: "厦门轨道监管系统"
                    }};
                };
                for (let i = 0; i < this.mList.length; i++) {
                    if (this.mList[i].appFunction.funcId == this.funcId) {

                        if (!!this.mList[i].children) {
                            for (var k = 0; k < this.mList[i].children.length; k++) {
                                var kObj = this.mList[i].children[k];
                                this.menuTitle[kObj.appFunction.url] = kObj.appFunction.funcName;

                                if (!!kObj.children) {
                                    for (var z = 0; z < kObj.children.length; z++) {
                                        var zObj = kObj.children[z];
                                        this.menuTitle[zObj.appFunction.url] = zObj.appFunction.funcName;
                                    }
                                }
                            }
                        }


                        if(!this.$route.name) {
                            if (!!this.mList[i].children) {
                                if (!!this.mList[i].children[0].children) {
                                    this.menuActiveName = this.mList[i].children[0].children[0].appFunction.url;// + '^' + this.mList[i].children[0].children[0].appFunction.funcName;
                                }
                                else {
                                    this.menuActiveName = this.mList[i].children[0].appFunction.url ;//+ '^' + this.mList[i].children[0].appFunction.funcName;
                                }
                            }
                            else {
                                this.menuActiveName = this.mList[i].appFunction.url;// + '^' + this.mList[i].appFunction.funcName;
                            }
                            this.menuLink(this.menuActiveName, true);
                        }
                        else {
                            this.menuActiveName = this.$route.name;
                        }

                        this.breadcrumbItem = this.menuTitle[this.menuActiveName];

                        this.$nextTick(function() {
                            this.$refs.menu.updateOpened();
                            this.$refs.menu.updateActiveName();
                        });

                        return this.mList[i];
                    }
                }
                return {appFunction: {
                    funcName: "厦门轨道监管系统"
                }};

            }
        },
        methods: {
            getMenuData () {
                var that = this;
                Util.ajax.get('/xm/sys/auth/menuList')
                    .then(function (response) {
                        that.mList = response.result || null;

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
            menuLink (link, isFisrst) {
                // this.$router.push(link); //这种写法重复点击，会导致路径出错
//                this.breadcrumbItem = link.split('^')[1];
                this.breadcrumbItem = this.menuTitle[link];
                if (isFisrst) {
                    this.$router.replace({
                        name: link,  // 路由名称
                        params: {
                            funcId: this.funcId
                        }
                    });
                }
                else {
                    this.$router.push({
                        name: link,  // 路由名称
                        params: {
                            funcId: this.funcId
                        }
                    });
                }

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