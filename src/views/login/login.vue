
<template>

    <div ref="loginBg" class="login-bg">
        <div class="login-bg-inner">
            <img class="login-bg1" src="./images/login-bg1.png" alt="">
            <div ref="loginBg2" class="login-bg2"></div>
            <img class="login-bg3" src="./images/login-bg3.png" alt="">
        </div>
        <div ref="loginPanel" class="login-panel">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <Row>
                    <Col span="24">
                    <Form-item class="iputout" prop="user" label="用户名：" :label-width="75">
                        <Input class="input" type="text" v-model="formInline.user" autocomplete="off" placeholder="用户名">
                        <Icon type="ios-person" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    </Col>
                    <Col span="24">
                    <Form-item prop="password" label="密  码：" :label-width="75">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                        <Icon type="ios-locked" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    </Col>
                    <Col span="24">
                    <Form-item :label-width="75">
                        <Button long type="primary" @click="handleSubmit('formInline')">登录</Button>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </div>

        <div ref="msg" class="msg">
            <span>版权所有：厦门市交通运输局</span>
            <span>版权所有：技术支持：背景北大干方科技有限公司</span>
        </div>
    </div>
</template>
<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
    import MOMENT from 'moment';
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 0, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            var that =this;
            document.onkeyup = function (e) {
                if (window.event)//如果window.event对象存在，就以此事件对象为准
                    e = window.event;
                var code = e.charCode || e.keyCode;
                if (code == 13) {
                    that.handleSubmit();
                }
            }

            this.init();
        },
        methods:{
            init() {

                this.initStyle();
                this.initEvent();

            },
            initEvent() {
                var that = this;
                window.onresize = function () {
                    that.initStyle()
                }
            },
            initStyle() {
                var top = 377;
                var msgTop = 700;
                var clientWidth = this.$refs.loginBg.clientWidth;
                var clientHeight = this.$refs.loginBg.clientHeight;

                this.$refs.loginPanel.style.top = (top / 1440) * clientWidth + 'px';
                this.$refs.msg.style.top = (msgTop / 1440) * clientWidth + 'px';

                if (clientHeight > 900) {
                    this.$refs.loginBg2.style.height = (clientHeight - 900) + 'px';
                }

            },
            handleSubmit() {
                let that = this;

                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        Util.ajax({
                            method: "post",
                            url: '/xm/sys/login',
                            data: {
                                username: that.formInline.user,
                                password: that.formInline.password,
                                mobileLogin: true
                            }
                        })
                        .then(function (response) {
                            if (response.status === 1) {
                                Util.cookie.set('xmgd', response.result.token, new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
                                Util.cookie.set('xmgdname', response.result.userName, new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
                                Util.cookie.set('logintime', MOMENT().format('YYYY-MM-DD hh:mm:ss') , new Date(new Date().getTime() + 7 * 24 * 60 * 1000))
                                that.$store.commit('setToken', response.result.sessionid);
                                that.$store.commit('setName', response.result.name);
                                let router = new VueRouter();
                                if (that.$route.query.redirect) {
                                    router.push(that.$route.query.redirect);
                                } else {
                                    router.push({path: '/platform'});
                                }
                            }
                            else {
                                that.$Message.error(response.errMsg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    } else {

                    }

                })


            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

    .login-bg {
        position: relative;
        width: 100%;
        height: 100%;
        min-width: 1440px;
        min-height: 900px;

        .login-bg-inner {
            position: relative;
            width: 100%;
            height: 100%;

            .login-bg1 {
                width: 100%;
                display: block;
            }

            .login-bg2 {
                width: 100%;
                height: 0;
                background: url('./images/login-bg2.png') repeat-y center;
                background-size: 100% auto;
            }

            .login-bg3 {
                display: block;
                width: 100%;
            }

        }

        .login-panel {
            position: absolute;
            z-index: 2;
            top: 377px;
            left: 50%;
            margin-left: -150px;
            width: 300px;
            background: transparent;
        }

        .msg {
            position: absolute;
            top: 700px;
            width: 100%;
            height: 20px;
            color: #FFFFFF;
            font-size: 12px;
            line-height: 20px;
            text-align: center;

            span:first-child{
                padding-right: 30px;
            }
        }
    }

</style>

<style lang="scss" rel="stylesheet/scss">
    .login-panel {

        .ivu-btn {
            font-size: 14px;
            background-color: #f3994f;
            border-color: #f3994f;
            border-radius: 16px;

            &:hover {
                 background-color: rgba(243, 153, 79, 0.8);
                 border-color: rgba(243, 153, 79, 0.8);
            }
        }


        .ivu-form-item-required {

            .ivu-form-item-label {
                padding-right: 7px;
                color: #FFFFFF;
                font-size: 16px;

                &:before {
                    display: none;
                }
            }

            .ivu-form-item-content {
                line-height: 30px;
                .ivu-input-wrapper {
                    font-size: 16px;

                    .ivu-input-group-prepend {
                        padding: 3px 7px 3px 16px;
                        height: 32px;
                        color: #008ccf;
                        text-align: center;
                        background-color: #fff;
                        border: 1px solid #c8daf1;
                        border-right: 0;
                        border-radius: 16px;
                    }

                    .ivu-input {
                        font-size: 14px;
                        padding: 3px 7px;
                        height: 32px;
                        border: 1px solid #c8daf1;
                        line-height: 24px;
                        border-left: 0;
                        border-radius: 16px;

                        &:active, &:focus {
                            box-shadow: none;
                        }
                    }

                }
            }
        }
    }
</style>