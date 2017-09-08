<style scoped>
    .login-panel {
        position: relative;
        top: 260px;
        margin: 0 auto;
        padding: 24px;
        width: 269px;
        height: 229px;
        border: 1px solid #d9d9d9;
    }
</style>
<template>
    <div class="login-panel">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" >
            <Row>
                <Col span="24">
                    <Form-item class="iputout" prop="user">
                        <Input type="text" v-model="formInline.user" size="large" placeholder="Username">
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
</template>
<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
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
                        { type: 'string', min: 5, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                let that = this;

                this.$refs[name].validate((valid) => {
                    debugger
                    if (valid) {
                        Util.ajax.get('/metrosupervision/api/login', {
                            params: {
                                loginName: that.formInline.user,
                                password: that.formInline.password
                            }
                        })
                        .then(function (response) {
                            debugger
                            Util.cookie.set('xmgd', response.result.token, new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
                            that.$store.commit('setToken', response.result.token);
                            // that.$store.state.token = response.data.token;
                            let router = new VueRouter();
                            if (that.$route.query.redirect) {
                                router.push(that.$route.query.redirect);
                            } else {
                                router.push({ path: '/system' });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        this.$Message.success('提交成功!');

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
