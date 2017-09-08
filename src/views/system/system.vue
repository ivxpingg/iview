<style scoped>
    .content{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        height:100%;
    }
    .content-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-content-main{
        padding: 10px;
        height: calc(100% - 47px);
    }
    .content-footer{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="content" ref="content">
        <Menu class="content-header" ref="contentHeader" mode="horizontal" theme="dark" active-name="1">
            <div class="content-logo"></div>
        </Menu>
        <div class="content-body" ref="contentBody" :class="{'layout-hide-text': spanLeft < 5}">
            <Row type="flex" style="height:100%;">
                <Col :span=spanLeft class="layout-menu-left">
                    <Menu active-name="1-1" theme="light" :open-names="['1']" accordion width="auto" @on-select="menuLink" style="height:100%;">
                        <div class="layout-logo-left"></div>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate" :size="iconSize"></Icon>
                                <span class="layout-text">导航一</span>
                            </template>
                            <MenuItem name="/system/canvas">选项 1</MenuItem>
                            <MenuItem name="1-2">选项 2</MenuItem>
                            <MenuItem name="1-3">选项 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad" :size="iconSize"></Icon>
                                <span class="layout-text">导航二</span>
                            </template>
                            <MenuItem name="2-1">选项 1</MenuItem>
                            <MenuItem name="2-2">选项 2</MenuItem>
                            <MenuItem name="2-3">选项 3</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <span class="layout-text">导航三</span>
                            </template>
                            <MenuItem name="3-1">选项 1</MenuItem>
                            <MenuItem name="3-2">选项 2</MenuItem>
                            <MenuItem name="3-3">选项 3</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col :span=spanRight>
                    <div class="layout-header">
                        <Button type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                    </div>
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </Col>
            </Row>
        </div>
        <div class="content-footer" ref="contentFooter">
            2011-2016 &copy; TalkingData
        </div>
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

            Util.ajax.get('/metrosupervision/api/auth/getMenuList').then(function (response) {
                debugger
                console.dir(response);
            }).catch(function (error) {
                    console.log(error);
                });
            this.pageInit();
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            pageInit: function() {
                this.$refs.contentBody.style.height =　(this.$refs.content.clientHeight
                                                           - this.$refs.contentHeader.$el.clientHeight
                                                           - this.$refs.contentFooter.clientHeight)
                                                           + 'px';
                console.dir(this.$refs.contentBody);

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
                debugger
                this.$router.push(link);
            }
        }
    }
</script>