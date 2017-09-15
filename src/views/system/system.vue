
<template>
    <div class="content" ref="content">
        <Row type="flex" style="height: 100%">
            <Col :span="spanLeft" class="layout-menu-left" style="height: 100%">
                <Menu active-name="/system/employee/add" theme="dark" @on-select="menuLink" width="auto">
                    <div class="layout-logo-left">
                        <img class="logo-img" src="../../images/xmgd.png" alt="">
                        <div class="logo-title">轨道监管平台</div>
                    </div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">从业人员</span>
                        </template>
                        <MenuItem name="/system/canvas">选项 1</MenuItem>
                        <MenuItem name="/system/employee/add" >添加从业人员</MenuItem>
                        <MenuItem name="1-3">选项 3</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col :span="spanRight" style="height: 100%">
                <div class="layout-header">
                    <Button class="btn-layout" type="text" icon="log-out" title="退出"></Button>
                    <div class="userInfo">
                        <Avatar class="userImg" src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="background-color: #87d068" size="large" icon="person"/>
                        <!--<Avatar src="../../images/avatar.jpg" />-->
                        <!--<div class="userImg"><img src="../../images/avatar.jpg" alt=""></div>-->
                        <Dropdown class="userDrown">
                            <a href="javascript:void(0)">
                                系统管理员
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
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>

</template>
<script>
    import Util from '../../libs/util';
    export default {
        data() {
            return {
                spanLeft: 5,
                spanRight: 19
            };
        },
        mounted: function() {

//            Util.ajax.get('/metrosupervision/api/auth/getMenuList').then(function (response) {
//                debugger
//                console.dir(response);
//            }).catch(function (error) {
//                    console.log(error);
//                });
            this.pageInit();
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            pageInit: function() {
//                this.$refs.contentBody.style.height =　(this.$refs.content.clientHeight
//                                                           - this.$refs.contentHeader.$el.clientHeight
//                                                           - this.$refs.contentFooter.clientHeight)
//                                                           + 'px';


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
            menuLink: function(link) {
                this.$router.push(link);
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
            height: calc(100% - 57px - 31px);
            min-height: 200px;
            margin: 15px;
            overflow: hidden;
            background: #fff;
            border-radius: 4px;
            .layout-content-main{
                height: 100%;
                padding: 10px;
                overflow-y: auto;
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