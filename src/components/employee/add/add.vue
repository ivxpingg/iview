<template>
    <div class="employee-add-panel">
        <Row>
            <Form ref="formInline" :model="employee" :rules="ruleInline"　:label-width="120">
            <Col span="12">

                    <FormItem prop="name"  label="姓名">
                        <Input v-model="employee.name" placeholder="请输入姓名"></Input>
                    </FormItem>

                    <FormItem prop="sex"  label="性别">
                        <Select v-model="employee.sex" placeholder="请选择" transfer value="1">
                            <Option v-for="item in dict_sex" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem prop="jobNum"  label="工号">
                        <Input v-model="employee.jobNum" placeholder="请输入工号"></Input>
                    </FormItem>

                    <FormItem prop="postCategory" label="岗位类别">
                        <Select v-model="employee.postCategory" transfer placeholder="请选择岗位">
                            <Option v-for="(item, index) in dict_post_type" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem prop="postName" label="岗位名称">
                        <Select ref="select_post_name" v-if="employee.postCategory != 'other'" clearable v-model="employee.postName" transfer placeholder="请选择岗位名称">
                            <Option v-for="item in dict_post_name" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                        <Input v-else v-model="employee.otherPost" placeholder="请输入岗位名称"></Input>

                    </FormItem>

                    <FormItem label="取证日期" class="ivu-form-item-required">
                        <FormItem prop="getCertificateTime">
                            <DatePicker type="date" :editable="false" :transfer="true" placeholder="选择日期" v-model="getCertificateTime"></DatePicker>
                        </FormItem>
                    </FormItem>

                    <FormItem prop="idNumber"  label="身份证号">
                        <Input v-model="employee.idNumber" placeholder="请输入身份证"></Input>
                    </FormItem>

                    <FormItem prop="education" label="文化程度">
                        <Select v-model="employee.education" placeholder="请选择文化程度">
                            <Option v-for="item in dict_education" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="入职时间"  class="ivu-form-item-required">
                        <FormItem prop="entryDate">
                            <DatePicker type="date" :editable="false" :transfer="true" placeholder="选择日期" v-model="entryDate"></DatePicker>
                        </FormItem>
                    </FormItem>

            </Col>
            <Col span="12">
                <!--<Form  ref="formInline2" :model="employee" :rules="ruleInline"　:label-width="120">-->
                    <FormItem prop=""  label="照片">
                        <vImgUpload :defaultList="defaultHeadPortrait" :onSuccess="onSuccessForHeadPortrait"></vImgUpload>
                    </FormItem>
                    <FormItem prop="certificateName"  label="从业资格证名称">
                        <Select v-model="employee.certificateName" transfer placeholder="请选择">
                            <Option v-for="(item, index) in dict_certificateName" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="certificateUseDate"  label="从业资格证有效期">
                        <DatePicker type="date" :editable="false" placeholder="选择日期" :transfer="true" v-model="certificateUseDate"></DatePicker>
                    </FormItem>
                    <FormItem prop="issuingUnit"  label="发证单位">
                        <Select v-model="employee.issuingUnit" transfer placeholder="请选择">
                            <Option v-for="(item, index) in dict_issuingUnit" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="phone"  label="联系电话">
                        <Input v-model="employee.phone" placeholder="手机号或者固话"></Input>
                    </FormItem>
                    <FormItem prop="status" label="人员状态">
                        <Select v-model="employee.status" transfer placeholder="请选择人员状态">
                            <Option v-for="item in dict_status" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="leaveJobDate"  label="离职时间">
                        <DatePicker type="date" :editable="false" :transfer="true" placeholder="选择日期" v-model="leaveJobDate"></DatePicker>
                    </FormItem>
                    <FormItem prop="leaveJobDate"  label="离职原因">
                        <Input v-model="employee.leaveJobDate" type="textarea" placeholder="离职原因..." :rows="3"></Input>
                    </FormItem>

                <!--</Form>-->
            </Col>
            </Form>
            <Col span="24">
                <Form ref="formInline2" :model="employee"　:label-width="120">
                    <FormItem prop=""  label="从业资格证">
                        <vImgUpload :defaultList="defaultHeadCertificate" :multiple="true" :onSuccess="onSuccessForCertificate"></vImgUpload>
                    </FormItem>
                </Form>
            </Col>

            <Col span="24">
                <Form :label-width="120">
                    <FormItem prop=""  label="培训记录">
                        <Button type="primary" icon="plus-round" @click="showTrainRecord">
                            添加
                        </Button>
                    </FormItem>
                    <FormItem prop=""  label="">
                        <Table  class="myTableIview"
                                width=""
                                height="200"
                                border
                                stripe
                                :columns="oTrainRecordColumns"
                                :data="employee.trainRecord"></Table>
                    </FormItem>
                </Form>
            </Col>

            <Col span="24">
                 <div class="bt-panel"><Button type="success" long @click="save">确认提交</Button></div>
            </Col>

        </Row>

        <Modal
                v-model="trainRecordModal"
                transfer
                title="添加培训记录"
                :okText="okText"
                @on-ok="editTrainRecord"
                @on-cancel="cancelTrainRecordModal">
            <div>
                <Form :model="oTrainRecord" :label-width="80">
                    <FormItem label="时间">
                        <FormItem prop="trainDate">
                            <DatePicker type="daterange" format="yyyy-MM-dd" :editable="false" placeholder="选择日期" v-model="oTrainRecord.trainDate" style="width: 200px"></DatePicker>
                        </FormItem>
                    </FormItem>
                    <FormItem prop="period"  label="学时">
                        <Input v-model="oTrainRecord.period" placeholder="几天"></Input>
                    </FormItem>
                    <FormItem prop="trainContent"  label="培训内容">
                        <Input v-model="oTrainRecord.trainContent" type="textarea" placeholder="培训内容"></Input>
                    </FormItem>
                    <FormItem prop="achievement"  label="成绩">
                        <Input v-model="oTrainRecord.achievement" placeholder="请输入成绩"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
    import vImgUpload from '../../upload/imgUpload/imgUpload.vue';
    import Util from '../../../libs/util';
    import MOMENT from 'moment';
    import $ from 'jquery';
    export default {
        data() {
            return {
                //

                // 从业人员信息
                employee: {
                    employeeId: '',
                    name: '',                   // 姓名
                    jobNum: '',                 // 工号
                    sex: '',                    // 性别     select
                    education: '',              // 文化程度  select
                    getCertificateTime: '',     // 取证日期
                    certificateUseDate: '',     // 证有效期
                    certificateName: '',        // 从业资格证名称
                    issuingUnit: '',            // 发证单位
                    idNumber: '',               // 身份证号
                    entryDate: '',              // 入职时间
                    phone: '',                  // 联系电话
                    postCategory: '',           // 岗位类别 select
                    postName: '',               // 岗位名称 select
                    otherPost: '',              // 其他岗位名称 注：选择其他时，手动输入
                    status: '',                 // 人员状态 select
                    trainRecord: [],            // 培训记录
                    pictureRelation: [],        // 图片
                    leaveJobDate: '',           // 离职时间
                    leaveJobReason: '',         // 离职原因
                },

                defaultHeadPortrait: [],        //头像
                defaultHeadCertificate: [],     //从业资格证
                pictureRelationForHeadPortrait: [],
                pictureRelationForCertificate: [],

                // 数据字典
                dict_post: [],
                dict_education: [],
                dict_sex: [],
                dict_status: [],

                dict_certificateName: [],  //
                dict_issuingUnit: [],


                //　日期,接收日期控件的返回值，为Date类型
                getCertificateTime: new Date(),
                entryDate: new Date(),
                certificateUseDate: new Date(),
                leaveJobDate: '',

                // 添加培训记录表单
                oTrainRecord: {
                    index: '0',                 // 用于编辑使用
                    trainDate: '',              // 培训时间
                    period: '',                 // 学时
                    trainContent: '',           // 培训内容
                    achievement: ''             // 成绩
                },
                // 培训记录表格配置信息
                oTrainRecordColumns: [
                    { title: '时间', align: 'center', key: 'trainDate', width: 180},
                    { title: '学时', align: 'center', key: 'period' },
                    { title: '培训内容', align: 'center', key: 'trainContent' },
                    { title: '成绩', align: 'center', key: 'achievement', width: 80 },
                    { title: '操作', align: 'center', key: 'action', width: 120, render: (h, params) => {
                            var that = this;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click() {
                                            that.employee.trainRecord.splice(params.index, 1);
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click() {
                                            that.isEditStatus = true;
                                            that.trainRecordModal = true;
                                            that.oTrainRecord.index = params.index;
                                            that.oTrainRecord.trainDate = [new Date(params.row.trainDate.split('~')[0]),new Date(params.row.trainDate.split('~')[1])];
                                            that.oTrainRecord.period = params.row.period;
                                            that.oTrainRecord.trainContent = params.row.trainContent;
                                            that.oTrainRecord.achievement = params.row.achievement;
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                //　培训记录是否是修改状态
                isEditStatus: false,
                ruleInline: {
                    name: [
                        { required: true, message: '名字不能为空!', trigger: 'blur' }],
                    jobNum: [
                        { required: true, message: '工号不能为空!', trigger: 'blur' }],
                    sex: [
                        { required: true, message: '性别不能为空!', trigger: 'change' }],
                    education: [
                        { required: true, message: '文化程度不能为空!', trigger: 'change' }],
                    postCategory: [
                        { required: true, message: '岗位类别不能为空!', trigger: 'change' }],
                    status: [
                        { required: true, message: '人员状态不能为空!', trigger: 'change' }],
                    idNumber: [
                        { required: true, message: '身份证不能为空!', trigger: 'blur' },
                        { type: 'string', min: 18, max: 18, message: '请输入正确的身份证', trigger: 'blur' }],
                    phone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        { type: 'string', message: '请输入正确的联系方式', trigger: 'blur'}]
                },
　　　　　　　　　// 控制培训记录弹出框显示和隐藏
                trainRecordModal: false
            }
        },
        props: {
            // 当前页面是添加(add)或者是编辑(edit)状态
            status: {
                type: String,
                default() {
                    return 'add';
                }
            },
            employeeId: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        computed: {
            okText() {
                return this.isEditStatus ? '确定' : '添加';
            },
            modelTrainDate() {
                if (Array.isArray(this.oTrainRecord.trainDate) && this.oTrainRecord.trainDate[0] !== '') {
                    return MOMENT(this.oTrainRecord.trainDate[0]).format('YYYY-MM-DD') + '~' + MOMENT(this.oTrainRecord.trainDate[1]).format('YYYY-MM-DD');
                }
                else {
                    return '';
                }
            },
            // 头像图片
            pictureRelation() {
                return this.pictureRelationForCertificate.concat(this.pictureRelationForHeadPortrait);
            },
            // 岗位类别
            dict_post_type() {
                var typeList = [];
                this.dict_post.forEach(function (val) {
                    if(val.parentId === '0') {
                        typeList.push(val);
                    }
                });
                return typeList;
            },
            dict_post_name() {

                var that = this;


                if(this.$refs.select_post_name) {
                    this.$refs.select_post_name.$forceUpdate();
                }


                var nameList = [];
                var id = '';
                this.dict_post.forEach(function (val) {
                    if (val.value == that.employee.postCategory) {
                        id = val.id;
                    }
                });
                this.dict_post.forEach(function (val) {
                    if(val.parentId == id) {
                        nameList.push(val);
                    }
                });
                return nameList;
            }

        },
        watch: {
            getCertificateTime(val, oldVal) {
                this.employee.getCertificateTime = MOMENT(val).format('YYYY-MM-DD');
            },
            entryDate(val, oldVal) {
                this.employee.entryDate = MOMENT(val).format('YYYY-MM-DD');
            },
            certificateUseDate(val, oldVal) {
                if (val == "") {
                    this.employee.certificateUseDate = "";
                }
                else {
                    this.employee.certificateUseDate = MOMENT(val).format('YYYY-MM-DD');
                }
            },
            leaveJobDate(val, oldVal) {
                if (val == "") {
                    this.employee.leaveJobDate = "";
                }
                else {
                    this.employee.leaveJobDate = MOMENT(val).format('YYYY-MM-DD');
                }
            },
            employeeId(val, oldVal) {
                var that = this;
                this.employee.employeeId = this.employeeId;
                if (this.status == 'edit') {
                    this.getDictData(() => {
                        that.getEmployeeInfo();
                    });
                }
                else {
                    this.getDictData();
                }
            }
        },
        components: {vImgUpload},
        created() {
            this.employee.employeeId = this.employeeId;
        },

        mounted() {
            var that = this;

            this.getCertificateTime = new Date();
            this.entryDate = new Date();

//            if (this.$route.params.employeeId) {
//                this.employee.employeeId = this.$route.params.employeeId;
//                this.status = 'edit';
//                this.getDictData(() => {
//                    that.getEmployeeInfo();
//                });
//            }
//            else {
//                this.status = 'add';
//                this.getDictData();
//            }

            if (this.status == 'edit') {
                this.getDictData(() => {
                    that.getEmployeeInfo();
                });
            }
            else {
                this.getDictData();
            }
        },
        methods: {
            onSuccessForHeadPortrait (fileList) {
                fileList.forEach(function (val) {
                   val.pictureType = 'HeadPortrait';
                });
                this.pictureRelationForHeadPortrait = fileList;
                this.employee.pictureRelation = this.pictureRelationForCertificate.concat(this.pictureRelationForHeadPortrait);
            },

            onSuccessForCertificate (fileList) {
                fileList.forEach(function (val) {
                    val.pictureType = 'Certificate';
                });
                this.pictureRelationForCertificate = fileList;
                this.employee.pictureRelation = this.pictureRelationForCertificate.concat(this.pictureRelationForHeadPortrait);
            },

            // 弹出添加培训记录弹出框
            showTrainRecord () {
                this.isEditStatus = false;
                this.trainRecordModal = true;

                this.oTrainRecord.trainDate = '';
                this.oTrainRecord.period = '';
                this.oTrainRecord.trainContent = '';
                this.oTrainRecord.achievement = '';
            },
            // 添加或者修改培训记录
            editTrainRecord() {
                var that = this;

                if (this.isEditStatus) {

                }
                else {
                    this.employee.trainRecord.push({
                        trainDate : this.modelTrainDate,
                        period : this.oTrainRecord.period,
                        trainContent : this.oTrainRecord.trainContent,
                        achievement : this.oTrainRecord.achievement
                    });
                    this.oTrainRecord.trainDate = '';
                    this.oTrainRecord.period = '';
                    this.oTrainRecord.trainContent = '';
                    this.oTrainRecord.achievement = '';
                }

                setTimeout(function () {
                    if(that.$store.state.systemScroll)
                        that.$store.state.systemScroll.refresh();
                },0);

            },
            // 关闭添加培训记录弹出框
            cancelTrainRecordModal() {},

            // 获取字典数据
            getDictData(cb) {
                var that = this;
                //获取岗位字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/treeData',
                    params: {
                        type: 'sys_post_category'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_post = response.result;
                        if (cb) {
                            cb();
                        }
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });
　　　　　　　　　
                // 获取文化程度字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/listData',
                    params: {
                        type: 'sys_education'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_education = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

                // 获取性别字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/listData',
                    params: {
                        type: 'sex'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_sex = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

                // 获取员工状态字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/listData',
                    params: {
                        type: 'sys_user_status'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_status = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

                // 获取从业资格证名称字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/listData',
                    params: {
                        type: 'certificate_type'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_certificateName = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

                // 获取发证单位字典数据
                Util.ajax({
                    method: "get",
                    url: '/xm/sys/dict/listData',
                    params: {
                        type: 'issuing_unit'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_issuingUnit = response.result;
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

            },

            // 根据employeeId获取从业人员信息
            getEmployeeInfo() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/sys/employee/detail',
                    params: {
                        employeeId: that.employee.employeeId
                    }
                }).then(function (response) {

                    if (response.status == 1) {
                        that.employee.name = response.result.name;
                        that.employee.jobNum = response.result.jobNum;
                        that.employee.sex = response.result.sex;
                        that.employee.education = response.result.education;
                        that.employee.getCertificateTime = response.result.getCertificateTime;
                        that.employee.certificateUseDate = response.result.certificateUseDate;
                        that.employee.certificateName = response.result.certificateName;
                        that.employee.issuingUnit = response.result.issuingUnit;
                        that.employee.idNumber = response.result.idNumber;
                        that.employee.entryDate = response.result.entryDate;
                        that.employee.phone = response.result.phone;
                        that.employee.postCategory = response.result.postCategory;
                        that.employee.postName = response.result.postName;
                        that.employee.otherPost = response.result.otherPost || '';
                        that.employee.status = response.result.status;
                        that.employee.trainRecord = response.result.trainRecord || [];
                        that.employee.pictureRelation = response.result.pictureList || [];

                        that.getCertificateTime = MOMENT(response.result.getCertificateTime);
                        that.entryDate = MOMENT(response.result.entryDate);
                        that.certificateUseDate = MOMENT(response.result.certificateUseDate);
                        that.employee.leaveJobDate = response.result.leaveJobDate;
                        that.employee.leaveJobReason = response.result.leaveJobReason;

//                        that.defaultHeadPortrait = [{ url: "http://10.131.1.222:8088//upload/image/2017/10/2017101814310000253633.jpg" }];
//                        that.defaultHeadCertificate = [{ url: "http://10.131.1.222:8088//upload/image/2017/10/2017101814310000253633.jpg" }];
                        that.defaultHeadPortrait = [];
                        that.pictureRelationForHeadPortrait = [];
                        that.defaultHeadCertificate = [];
                        that.pictureRelationForCertificate = [];

                        that.employee.pictureRelation.forEach(function(val){

                            val.url = Util.domain + val.pictureUrl;
                            val.name = val.pictureId;


                            if (val.pictureType == 'HeadPortrait') {
                                that.defaultHeadPortrait = [val];
                                that.pictureRelationForHeadPortrait = [val];
                            }
                            if (val.pictureType == 'Certificate') {
                                that.defaultHeadCertificate.push(val);
                                that.pictureRelationForCertificate.push(val);
                            }
                        });

                        setTimeout(function () {
                            if(that.$store.state.systemScroll)
                                that.$store.state.systemScroll.refresh();
                        },0);

                    } else {

                    }

                }).catch(function (err) {
                    console.dir(err);
                })
            },

            save() {

                var that = this;
                var url = this.status == 'add'? '/xm/sys/employee/add' : '/xm/sys/employee/update';

                that.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        Util.ajax({
                            method: "post",
                            url: url,
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            data: JSON.stringify(this.employee)
                        }).then(function (response) {
                            if (response.status == 1) {
                                if (that.status == 'add') {
                                    that.$Message.success({
                                        content: '新增成功!',
                                        onClose() {
                                              that.$emit('hideModalAdd');
                                        }
                                    });
                                }
                                else {
                                    that.$Message.success({
                                        content: '修改成功!',
                                        onClose() {
                                            that.$emit('hideModalEdit');
                                        }
                                    });
                                }
                            }
                            else {
                                if (that.status == 'add') {
                                    that.$Message.error('新增失败!');
                                }
                                else {
                                    that.$Message.error('修改失败!');
                                }
                            }
                        }).catch(function (err) {
                            console.log(error);
                        });
                    }
                });
            }

        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>
    .employee-add-panel {
        padding-top: 20px;
        padding-bottom: 45px;
        min-width: 720px;
        max-width: 1024px;
    }

    .bt-panel {
        margin-left: 120px;
    }
</style>