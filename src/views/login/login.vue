<style lang="scss" type="stylesheet/scss" scoped>

    .login-bg {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .login-panel-title {
            height: 55px;
            line-height: 55px;
            border-bottom: 1px solid #eee;
            margin-bottom: 24px;
            span {
                font-size: 18px;
                border-bottom: 3px solid #e56124;
                color: #666;
                padding-bottom: 14px;
            }
        }

        .swiper-container {
            position: absolute;
            z-index: 1;
            width: 100%;
            img {
                width: 100%;
            }
        }

    }


    .login-panel {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        margin-top: -260px;
        margin-left: -187px;
        padding: 0 24px 0;
        width: 374px;
        border: 1px solid #eee;
        background: #fff;
        border-radius: 5px;
    }

</style>
<template>

    <div class="login-bg">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../../images/login-bg2.jpeg" alt="" />
                </div>
                <div class="swiper-slide">
                    <img src="../../images/login-bg3.jpeg" alt="" />
                </div>
                <div class="swiper-slide">
                    <img src="../../images/login-bg4.jpeg" alt="" />
                </div>
            </div>
        </div>
        <div class="login-panel">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <Row>
                    <Col span="24">
                        <div class="login-panel-title">
                            <span>账号登录</span>
                        </div>
                    </Col>
                    <Col span="24">
                    <Form-item class="iputout" prop="user">
                        <Input class="input" type="text" v-model="formInline.user" size="large" autocomplete="off" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    </Col>
                    <Col span="24">
                    <Form-item prop="password">
                        <Input type="password" v-model="formInline.password" size="large" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    </Col>
                    <Col span="24">
                    <Form-item>
                        <Button long type="primary" size="large" @click="handleSubmit('formInline')">登录</Button>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
    import $ from 'jquery';
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.css';
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
            new Swiper ('.swiper-container', {
                autoplay: 3000,
                effect : 'fade',
                speed: 1000,
                autoplayDisableOnInteraction: false,
                loop: true
            });

//            debugger
            document.onkeyup = function (e) {
                if (window.event)//如果window.event对象存在，就以此事件对象为准
                    e = window.event;
                var code = e.charCode || e.keyCode;
                if (code == 13) {
                    that.handleSubmit();
                }
            }
        },
        methods:{
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
                                that.$store.commit('setToken', response.result.sessionid);
                                that.$store.commit('setName', response.result.name);
                                let router = new VueRouter();
                                if (that.$route.query.redirect) {
                                    router.push(that.$route.query.redirect);
                                } else {
                                    router.push({path: '/system/SYS_MANAGE'});
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
