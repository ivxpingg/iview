<template>
    <div>
        <Row>
            <Col span="12">
                <Form :model="employee" :rules="ruleInline"　:label-width="120">
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
                        <Select v-if="employee.postCategory != 'other'" v-model="employee.postName" transfer placeholder="请选择岗位名称">
                            <Option v-for="item in dict_post_name" :value="item.value">{{item.label}}</Option>
                        </Select>
                        <Input v-else v-model="employee.otherPost" placeholder="请输入岗位名称"></Input>

                    </FormItem>

                    <FormItem label="取证日期">
                        <FormItem prop="getCertificateTime">
                            <DatePicker type="date" :editable="false" placeholder="选择日期" v-model="getCertificateTime"></DatePicker>
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

                    <FormItem label="入职时间">
                        <FormItem prop="entryDate">
                            <DatePicker type="date" :editable="false" placeholder="选择日期" v-model="entryDate"></DatePicker>
                        </FormItem>
                    </FormItem>
                </Form>
            </Col>
            <Col span="12">
                <Form :model="employee" :rules="ruleInline"　:label-width="120">
                    <FormItem prop=""  label="照片">
                        <vImgUpload :defaultList="defaultHeadPortrait" :onSuccess="onSuccessForHeadPortrait"></vImgUpload>
                    </FormItem>
                    <FormItem prop="phone"  label="联系电话">
                        <Input v-model="employee.phone" placeholder="手机号或者固话"></Input>
                    </FormItem>
                    <FormItem prop="status" label="人员状态">
                        <Select v-model="employee.status" transfer placeholder="请选择人员状态">
                            <Option v-for="item in dict_status" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </Col>
            <Col span="24">
                <Form :model="employee" :rules="ruleInline"　:label-width="120">
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
                        <Table
                                width=""
                                border
                                stripe
                                :columns="oTrainRecordColumns"
                                :data="employee.trainRecord"></Table>
                    </FormItem>
                </Form>
            </Col>

            <Col span="24">
                 <Button type="success" long @click="save">确认提交</Button>
            </Col>

        </Row>

        <Modal
                v-model="trainRecordModal"
                title="添加培训记录"
                :okText="okText"
                @on-ok="editTrainRecord"
                @on-cancel="cancelTrainRecordModal">
            <div>
                <Form :model="oTrainRecord" :label-width="80">
                    <FormItem label="时间">
                        <FormItem prop="trainDate">
                            <DatePicker type="daterange" format="yyyy-MM-dd" :editable="false" placeholder="选择日期" v-model="oTrainRecord.trainDate"></DatePicker>
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
                employee: {
                    employeeId: '',
                    name: '',                   // 姓名
                    jobNum: '',                 // 工号
                    sex: '',                    // 性别     select
                    education: '',              // 文化程度  select
                    getCertificateTime: '',     // 取证日期
                    idNumber: '',               // 身份证号
                    entryDate: '',              // 入职时间
                    phone: '',                  // 联系电话
                    postCategory: '',           // 岗位类别 select
                    postName: '',               // 岗位名称 select
                    otherPost: '',              // 其他岗位名称 注：选择其他时，手动输入
                    status: '',                 // 人员状态 select
                    trainRecord: [],            // 培训记录
                    pictureRelation: []       // 图片
                },
                defaultHeadPortrait: [],
                defaultHeadCertificate: [],
                pictureRelationForHeadPortrait: [],
                pictureRelationForCertificate: [],

                // 数据字典
                dict_post: [],
                dict_education: [],
                dict_sex: [],
                dict_status: [],

                //　日期,接收日期控件的返回值，为Date类型
                getCertificateTime: '',
                entryDate: '',

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
                    { title: '时间', key: 'trainDate', width: 180},
                    { title: '学时', key: 'period' },
                    { title: '培训内容', key: 'trainContent' },
                    { title: '成绩', key: 'achievement', width: 80 },
                    { title: '操作', key: 'action', width: 120, render: (h, params) => {
//                            console.dir(this);
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
                        { required: true, message: '' }
                    ],
                    name: [
                        { required: true, message: '' }
                    ],
                    phone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        { type: 'string', message: '请输入正确的联系方式', trigger: 'blur'}
                    ]
                },
　　　　　　　　　// 控制培训记录弹出框显示和隐藏
                trainRecordModal: false
            }
        },
        computed: {
            okText() {
                return this.isEditStatus ? '确定' : '添加';
            },
            modelTrainDate() {
                console.dir(this.oTrainRecord.trainDate);
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
        },
        components: {vImgUpload},
        mounted() {
            //this.save();
            this.getDictData();
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

            singleDateValue (d){
                console.dir(d);
            },

            // 弹出添加培训记录弹出框
            showTrainRecord () {
                this.isEditStatus = false;
                this.trainRecordModal = true;
            },
            // 添加或者修改培训记录
            editTrainRecord() {
                debugger
                if (this.isEditStatus) {}
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
            },
            // 关闭添加培训记录弹出框
            cancelTrainRecordModal() {},

            // 获取字典数据
            getDictData() {
                var that = this;
                //获取岗位字典数据
                Util.ajax({
                    method: "get",
                    url: '/sys/dict/treeData',
                    params: {
                        type: 'sys_post_category'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_post = response.result;
                        console.dir(response.result);
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
                    url: '/sys/dict/listData',
                    params: {
                        type: 'sys_education'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_education = response.result;
                        console.dir(response.result);
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
                    url: '/sys/dict/listData',
                    params: {
                        type: 'sex'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_sex = response.result;
                        console.dir(response.result);
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
                    url: '/sys/dict/listData',
                    params: {
                        type: 'sys_user_status'
                    }
                }).then(function (response) {
                    if (response.status == 1) {
                        that.dict_status = response.result;
                        console.dir(response.result);
                    }
                    else {
                        console.dir(response.errMsg);
                    }
                }).catch(function (err) {
                    console.dir(err);
                });

            },

            save() {
                console.dir(this.employee);

                Util.ajax({
                    method: "post",
                    url: '/sys/employee/add',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.employee)
                }).then(function (response) {
                    if (response.status == 1) {
                        that.$Message.success('新增成功!');
                    }
                    else {
                        that.$Message.error('新增失败!');
                    }
                }).catch(function (err) {
                    console.log(error);
                });

            }

        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>

</style>