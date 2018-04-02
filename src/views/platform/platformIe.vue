<template>
    <div class="platforms-container">
        <div class="title-img"><img src="./images/login2-title.png" alt=""></div>
        <div ref="panel" class="subSystem-panel">

            <div class="p-block p-center" name="综合展示" :class="systemList['8'].auth ? '':'noauth'" @click="goto(systemList['8'])"><span class="subSystem subSystem8" name="综合展示"></span></div>

            <div class="p-block p-left-1 " name="综合分析" :class="systemList['3'].auth ? '':'noauth'" @click="goto(systemList['3'])"><span class="subSystem subSystem3" name="综合分析"></span></div>
            <div class="p-block p-left-2 " name="运行监视" :class="systemList['2'].auth ? '':'noauth'" @click="goto(systemList['2'])"><span class="subSystem subSystem2" name="运行监视"></span></div>
            <div class="p-block p-left-3 " name="运营考评" :class="systemList['1'].auth ? '':'noauth'" @click="goto(systemList['1'])"><span class="subSystem subSystem1" name="运营考评"></span></div>
            <div class="p-block p-left-4 " name="舆情分析" :class="systemList['4'].auth ? '':'noauth'" @click="goto(systemList['4'])"><span class="subSystem subSystem4" name="舆情分析"></span></div>

            <div class="p-block p-right-1 " name="应急管理" :class="systemList['5'].auth ? '':'noauth'" @click="goto(systemList['5'])"><span class="subSystem subSystem5" name="应急管理"></span></div>
            <div class="p-block p-right-2 " name="从业人员" :class="systemList['6'].auth ? '':'noauth'" @click="goto(systemList['6'])"><span class="subSystem subSystem6" name="从业人员"></span></div>
            <div class="p-block p-right-3 " name="交通衔接" :class="systemList['7'].auth ? '':'noauth'" @click="goto(systemList['7'])"><span class="subSystem subSystem7" name="交通衔接"></span></div>
            <div class="p-block p-right-4 " name="用户权限" :class="systemList['9'].auth ? '':'noauth'" @click="goto(systemList['9'])"><span class="subSystem subSystem9" name="用户权限"></span></div>

        </div>


        <div class="btn-switcher" @click="logout">切换用户</div>
        <div class="btn-pwd" @click="showPwdPanel">修改密码</div>
        <vFooter class="footer"></vFooter>
        <Modal title="密码修改"
               v-model="showPwdEdit"
               :transfer="false"
               width="380">
            <div>
                <Form ref="formInline" :model="pwdForm" :rules="pwdFormRule" inline autocomplete="off">
                    <FormItem prop="oldPwd" label="旧密码:" :label-width="100" >
                        <Input v-model="pwdForm.oldPwd" type="password" autocomplete="off" disableautocomplete  style="width: 220px"></Input>
                    </FormItem>
                    <FormItem prop="newPwd"  label="新密码:" :label-width="100" >
                        <Input v-model="pwdForm.newPwd" type="password"  autocomplete="off" disableautocomplete  style="width: 220px"></Input>
                    </FormItem>
                    <FormItem  prop="newPwdFirst" label="重新输入密码:" :label-width="100" >
                        <Input v-model="pwdForm.newPwdFirst" type="password" autocomplete="off" disableautocomplete  style="width: 220px"></Input>
                    </FormItem>
                    <FormItem  label="">
                        <Button type="primary" style="width: 220px; margin-left: 100px;" @click="onEditPwd">确定</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>

</template>

<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
    import vFooter from '../../components/layout/footer/footer.vue';
    export default {
        data() {
            var that = this;
            return {
                showPwdEdit: false,
                domain: Util.domain,
                mList: [],
                systemList: {
                    '1': {
                        name: '运营考评子系统',
                        url: '',
                        auth: false
                    },
                    '2': {
                        name: '运行监视子系统',
                        url: '',
                        auth: false
                    },
                    '3': {
                        name: '综合分析子系统',
                        url: '',
                        auth: false
                    },
                    '4': {
                        name: '舆情分析子系统',
                        url: '',
                        auth: false
                    },
                    '5': {
                        name: '应急管理子系统',
                        url: '',
                        auth: false
                    },
                    '6': {
                        name: '从业人员管理子系统',
                        url: '',
                        auth: false
                    },
                    '7': {
                        name: '交通衔接子系统',
                        url: '',
                        auth: false
                    },
                    '8': {
                        name: '综合展示子系统',
                        url: '',
                        auth: false
                    },
                    '9': {
                        name: '用户权限',
                        url: '',
                        auth: false
                    }
                },

                userId: '',
                token: '',

                pwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    newPwdFirst: ''
                },
                pwdFormRule: {
                    oldPwd: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },

                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ],
                    newPwdFirst: [
                        { required: true, message: '请输入重新输入新密码', trigger: 'blur' },
                        {
                            validator(rule, value, callback, source, options) {

                                var errors = [];
                                if(that.pwdForm.newPwd == that.pwdForm.newPwdFirst) {

                                }
                                else {
                                    errors.push(new Error('2次新密码必须一样！'));
                                }
                                callback(errors);
                            }
                        }
                    ]
                }

            }
        },
        created() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {

            }
            else {
                this.$router.replace({
                    name: 'platform',  // 路由名称
                    params: {}
                });
            }
        },
        components: {vFooter},
        watch: {
            mList(val, oldVal) {
                var that = this;
                val.forEach(function (val) {
                    switch(val.appFunction.funcId) {
                        // 运行监视子系统
                        case "RUN_SUPERVISION_SYSTEM":
                            that.systemList['2'].url = val.appFunction.url;
                            that.systemList['2'].auth = true;
                            break;
                        // 综合分析子系统
                        case "COM_ANALYSIS_SYSTEM":
                            that.systemList['3'].url = val.appFunction.url;
                            that.systemList['3'].auth = true;
                            break;
                        // 运营考评子系统
                        case "RUN_EVALUATION_SYSTEM":
                            that.systemList['1'].url = val.appFunction.url;
                            that.systemList['1'].auth = true;
                            break;
                        // 应急管理子系统
                        case "YJ_MANAGE_SYSTEM":
                            that.systemList['5'].url = val.appFunction.url;
                            that.systemList['5'].auth = true;
                            break;
                        // 舆情分析子系统
                        case "YQ_ANALYSIS_SYSTEM":
                            that.systemList['4'].url = val.appFunction.url;
                            that.systemList['4'].auth = true;
                            break;

                        // 综合展示子系统
                        case "ZH_SHOW_SYSTEM":
                            that.systemList['8'].url = val.appFunction.url;
                            that.systemList['8'].auth = true;
                            break;

                        // 交通衔接子系统
                        case "TRAFFIC_CONN_SYSTEM":
                            that.systemList['7'].url = val.appFunction.url;
                            that.systemList['7'].auth = true;
                            break;

                        // 用户权限
                        case "SYS_MANAGE":
                            var sParam = '?loginToken='+that.token+'&loginId='+that.userId;
                            that.systemList['9'].url = val.appFunction.url + sParam;
                            that.systemList['9'].auth = true;
                            break;

                        // 从业人员管理子系统
                        case "XM_METRO_SUPERVISION_EMPLOYEE":
                            that.systemList['6'].url = val.appFunction.url;
                            that.systemList['6'].auth = true;
                            break;
                    }
                })
            }
        },
        mounted() {
            this.$Spin.show();
            this.userId = Util.cookie.get('xmgduserid') || '';
            this.token =  Util.cookie.get('xmgd') || '';

            this.getData();
            this.init();
        },
        methods: {
            init(){},
            getData () {
                var that = this;
                Util.ajax.get('/xm/sys/auth/menuList')
                    .then(function (response) {
                        that.$Spin.hide();
                        that.mList = response.result || null;
                    })
                    .catch(function (error) {
                        that.$Spin.hide();
                        console.log(error);
                    });
            },

            logout () {
                const that = this;

                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要退出当前用户？</p>',
                    onOk: () => {
                        Util.ajax.get('/xm/sys/logout')
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
                    },
                    onCancel: () => {
                    }
                });


            },

            goto(info) {

                var third = false;  // 是否是第三方地址
                var url = info.url;

                if (!info.auth) {
                    this.$Message.error('您没有《'+ info.name +'》权限,如有需要,请与管理员联系！');
                    return;
                }

                if (url.indexOf('http://') >= 0) {
                    third = true;
                    window.open(url);
                }
                else {
                    let router = new VueRouter();
                    router.push({path: info.url});
                }

            },

            showPwdPanel() {
                this.showPwdEdit = true;
            },

            onEditPwd() {
                var that = this;
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        Util.ajax({
                            method: "get",
                            url: '/xm/sys/resetPassword',
                            params: {
                                oldPassword: that.pwdForm.oldPwd,
                                newPassword: that.pwdForm.newPwd
                            }
                        }).then(function (response){

                            if (response.status ==  '1') {
                                that.$Message.success('密码修改成功！');
                                Util.ajax.get('/xm/sys/logout')
                                    .then(function (response){
                                        var router = new VueRouter();
                                        Util.cookie.unset('xmgd');
                                        Util.cookie.unset('xmgdname');
                                        that.$store.commit('setToken', null);
                                        setTimeout(function () {
                                            router.push({ path: '/' });
                                        }, 2000);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                            else {
                                that.$Message.error(response.errMsg);
                            }
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                },);
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .platforms-container {
        position: relative;
        height: 100%;
        min-height: 770px;
        background: url('./images/bg.png') no-repeat;
        background-position: center top;
        background-size: 100% auto;

        .title-img {
            position: relative;
            top: 0;
            width: 100%;
            height: 107px;
            text-align: center;
            background: url('./images/login2-title-bg.png') repeat-x top;
        }

        .btn-switcher {
            position: absolute;
            right: 185px;
            bottom: 58px;
            height: 30px;
            padding-left: 39px;
            font-size: 20px;
            color: #FFFFFF;
            background: url('./images/switcher.png') no-repeat left center;
            background-size: 30px 30px;
            cursor: pointer;
            z-index: 2;
        }

        .btn-pwd {
            position: absolute;
            right: 45px;
            bottom: 58px;
            height: 30px;
            padding-left: 39px;
            font-size: 20px;
            color: #FFFFFF;
            background: url('./images/lock2.png') no-repeat left center;
            background-size: 30px 30px;
            cursor: pointer;
            z-index: 2;
        }

        .subSystem-panel {
            position: relative;
            margin: 46px auto 0;
            width: 1410px;
            height: 614px;
            text-align: center;
            overflow: hidden;
            background: url(./images/login2-menu-bg.png) no-repeat center top;

            .p-block {
                position: absolute;
                display: inline-block;
                width: 400px;
                height: 140px;
                cursor: pointer;

                opacity: 0.5;

                &.p-center {
                    position: absolute;
                    display: inline-block;
                    top: 125px;
                    left: 526px;
                    width: 360px;
                    height: 360px;
                    border-radius: 50%;

                    &.noauth:after {
                        top: 300px;
                        left: 164px;
                    }
                }

                &.noauth:after {
                    position: absolute;
                    display: block;
                    top: 49px;
                    content: " ";
                    width: 32px;
                    height:32px;
                    background: url('./images/lock.png') no-repeat;
                    background-size: 32px;
                }

                &.p-left-1 {
                    top: 3px;
                    left: 50px;
                    &.noauth:after {
                        left: 270px;
                    }
                }
                &.p-left-2 {
                    top: 166px; left: 63px;
                    &.noauth:after {
                        left: 210px;
                    }
                }
                &.p-left-3 {
                    top: 323px; left: 134px; width: 350px;
                    &.noauth:after {
                        left: 170px;
                    }
                }
                &.p-left-4 {
                    top: 481px; left: 245px; width: 300px;
                    &.noauth:after {
                        left: 170px;
                    }
                }

                &.p-right-1 {
                    top: 1px; right: 50px;
                    &.noauth:after {
                        right: 270px;
                    }
                }
                &.p-right-2 {
                    top: 162px; right: 63px;
                    &.noauth:after {
                        right: 210px;
                    }
                }
                &.p-right-3 {
                    top: 325px; right: 134px; width: 350px;
                    &.noauth:after {
                        right: 170px;
                    }
                }
                &.p-right-4 {
                    top: 481px; right: 245px; width: 300px;
                    &.noauth:after {
                        right: 170px;
                    }
                }


            }

        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>