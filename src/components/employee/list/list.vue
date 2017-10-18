<template>

    <div>
        <Row>
            <Col span="12">
                <Form :model="searchParams" inline :label-width="65">
                    <FormItem prop="name"  label="姓名:">
                        <Input v-model="searchParams.name" placeholder="请输入姓名"></Input>
                    </FormItem>

                    <FormItem prop="postCategory" label="岗位类别:">
                        <Select v-model="searchParams.postCategory" transfer placeholder="请选择岗位">
                            <Option v-for="(item, index) in dict_post_type" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem prop="postName" label="岗位名称:">
                        <Select v-if="searchParams.postCategory != 'other'" v-model="searchParams.postName" transfer placeholder="请选择岗位名称">
                            <Option v-for="item in dict_post_name" :value="item.value">{{item.label}}</Option>
                        </Select>
                        <Input v-else v-model="searchParams.otherPost" placeholder="请输入岗位名称"></Input>
                    </FormItem>

                    <FormItem prop="sex"  label="性别:">
                        <Select v-model="searchParams.sex" placeholder="请选择" transfer>
                            <Option v-for="item in dict_sex" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="入职时间:">
                        <FormItem prop="entryDate">
                            <DatePicker type="daterange" format="yyyy-MM-dd" :editable="false" placeholder="选择日期" v-model="entryDate"></DatePicker>
                        </FormItem>
                    </FormItem>

                    <FormItem label="更新日期:">
                        <FormItem prop="updateDate">
                            <DatePicker
                                    type="datetimerange"
                                    :confirm="false"
                                    :options="DatePickerOptions"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    :editable="false"
                                    placeholder="选择日期"
                                    v-model="updateDate"></DatePicker>
                        </FormItem>
                    </FormItem>

                </Form>
            </Col>
            <Col span="12">
                <Button type="primary" @click="search" icon="ios-search">查询</Button>

                <Button type="primary">导入</Button>

                <Button type="primary" @click="exportFile">导出</Button>
            <a :href="liu">下载</a>
            </Col>
            <Col span="24">
                <Table border :columns="columns" stripe :data="listData"></Table>
                <div>
                    <Page
                        :total="searchParams.count"
                        :page-size="searchParams.pageSize"
                        :page-size-opts="page_size_opts"
                        @on-page-size-change="on_page_size_change"
                        @on-change="on_change"
                        show-elevator
                        show-total
                        show-sizer>
                    </Page>
                </div>
            </Col>
        </Row>

        <Modal
                v-model="modalDetail" title="查看详情">
            <div>
                <Row>
                    <Col span="6">
                        <img :src="" alt="">
                    </Col>
                    <Col span="18">
                         <div>
                             <label for="">姓名</label>
                             <div>{{employee.name}}</div>
                         </div>
                        <div>
                            <label for="">性别</label>
                            <div>{{employee_sex}}</div>
                        </div>
                        <div>
                            <label for="">工号</label>
                            <div>{{employee.jobNum}}</div>
                        </div>
                        <div>
                            <label for="">岗位类别</label>
                            <div>{{dict_post_type}}</div>
                        </div>
                        <div>
                            <label for="">岗位名称</label>
                            <div>{{dict_post_name}}</div>
                        </div>
                        <div>
                            <label for="">取证日期</label>
                            <div>{{employee.getCertificateTime}}</div>
                        </div>
                        <div>
                            <label for="">身份证号</label>
                            <div>{{employee.idNumber}}</div>
                        </div>
                        <div>
                            <label for="">文化程度</label>
                            <div>{{employee_education}}</div>
                        </div>
                        <div>
                            <label for="">入职时间</label>
                            <div>{{employee.entryDate}}</div>
                        </div>
                        <div>
                            <label for="">状态</label>
                            <div>{{employee_status}}</div>
                        </div>

                    </Col>
                    <Col span="24">
                    <Table
                            width=""
                            border
                            stripe
                            :columns="oTrainRecordColumns"
                            :data="employee.trainRecord"></Table>
                    </Col>
                </Row>
            </div>
            <div slot="footer">

            </div>
        </Modal>

    </div>

</template>

<script>
    import Util from '../../../libs/util';
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                modalDetail: true,               // 显示/隐藏弹出框
                employee: {                      // 当前选中的从业人员信息
                    name: '',
                    jobNum: '',
                    sex: '',
                    education: '',
                    getCertificateTime: '',
                    idNumber: '',
                    entryDate: '',
                    phone: '',
                    postCategory: '',
                    postName: '',
                    otherPost: '',
                    status: '',
                    trainRecord: [],
                    pictureRelation: []
                },
                // 培训记录表格配置信息
                oTrainRecordColumns: [
                    { title: '时间', key: 'trainDate', width: 180},
                    { title: '学时', key: 'period' },
                    { title: '培训内容', key: 'trainContent' },
                    { title: '成绩', key: 'achievement', width: 80 }],
                searchParams: {
                    pageNo: 1,                   // 当前页数
                    pageSize: 3,                // 每页记录数
                    count: 0,                    // 总数据量
                    pageCount: 0,                // 总页数
                    name: '',                      // 姓名
                    sex: '',                       // 性别
                    postCategory: '',              // 岗位类别
                    postName: '',                  // 岗位名称
                    entryBeginDate: '',            // 入职开始时间
                    entryEndDate: '',              // 入职结束时间
                    updateBeginDate: '',           // 更新开始时间
                    updateEndDate: '',             // 更新结束时间
                    otherPost: ''                  // 其他岗位
                },
                entryDate: '',
                updateDate: '',

                // 数据字典
                dict_post: [],
                dict_education: [],
                dict_sex: [],
                dict_status: [],

                // 分页控件
                page_size_opts: [1, 2, 3],

                // 导出文件存放流
                liu: '',

                // 表格
                listData: [],                       // 表格数据，接收ajax返回的数据
                columns: [
                    { title: '序号', type: 'index', width: 80, align: 'center' },
                    { title: '姓名', key: 'name'},
//                    { title: '工号', key: 'jobNum' },
                    { title: '性别', key: 'sex' },
                    { title: '岗位类别', key: 'postCategory', sortable: true },
                    { title: '岗位名称', key: 'postName', sortable: true },
                    { title: '取证日期', key: 'getCertificateTime', sortable: true },
                    { title: '联系电话', key: 'phone' },
                    { title: '操作', key: 'action', width: 180, render: (h, params) => {
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
                                        that.getEmployeeInfoByID(params.row.employeeId);
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click() {
                                        that.$router.push({
                                            name: 'employeeEdit',  // 路由名称
                                            params: {
                                                funcId: that.$route.params.funcId,
                                                employeeId: params.row.employeeId
                                            }
                                        });
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click() {
//                                        console.dir(params.row);
                                        that.deleteData(params.row);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                    }
                ],
                DatePickerOptions: {
                    shortcuts: [
                        {
                            text: '最近7天内',
                            value () {
                                return [MOMENT().subtract(7, 'days'), MOMENT()];
                            },
                            onClick: (picker) => {}
                        },
                        {
                            text: '昨天',
                            value () {
                                return [MOMENT().subtract(1, 'days').hour(0).minute(0).second(0), MOMENT().subtract(1, 'days').hour(23).minute(59).second(59)];
                            },
                            onClick: (picker) => {}
                        },
                        {
                            text: '一周前',
                            value () {
                                return [MOMENT().subtract(14, 'days').hour(0).minute(0).second(0), MOMENT().subtract(7, 'days').hour(23).minute(59).second(59)];
                            },
                            onClick: (picker) => {}
                        }
                    ]
                }
            }
        },
        computed: {
            // 性别
            employee_sex() {
                for (let i = 0; i < this.dict_sex.length; i++) {
                    if (this.dict_sex[i].value == this.employee.sex) {
                        return this.dict_sex[i].label;
                    }
                }
                return '';
            },
            employee_status() {
                for (let i = 0; i < this.dict_status.length; i++) {
                    if (this.dict_status[i].value == this.employee.status) {
                        return this.dict_status[i].label;
                    }
                }
                return '';
            },
            employee_education() {
                for (let i = 0; i < this.dict_education.length; i++) {
                    if (this.dict_education[i].value == this.employee.education) {
                        return this.dict_education[i].label;
                    }
                }
                return '';
            },
            // 岗位类别
            dict_post_type() {
                for (let i = 0; i < this.dict_post.length; i++) {
                    if (this.dict_post[i].value == this.employee.postCategory) {
                        return this.dict_post[i].label;
                    }
                }
                return '';
            },
            dict_post_name() {
                if (this.employee.postCategory == 'other') return '';
                for (let i = 0; i < this.dict_post.length; i++) {
                    if (this.dict_post[i].value == this.employee.postName) {
                        return this.dict_post[i].label;
                    }
                }
                return '';
            }
        },
        watch: {
            entryDate(val, oldVal) {
                if (val == '' || val[0] == '') {
                    this.searchParams.entryBeginDate = '';
                    this.searchParams.entryEndDate = '';
                }
                else {
                    this.searchParams.entryBeginDate = MOMENT(val[0]).format('YYYY-MM-DD');
                    this.searchParams.entryEndDate = MOMENT(val[1]).format('YYYY-MM-DD');
                }
            },
            updateDate(val, oldVal) {
                if (val == '' || val[0] == '') {
                    this.searchParams.updateBeginDate = '';
                    this.searchParams.updateEndDate = '';
                }
                else {
                    this.searchParams.updateBeginDate = MOMENT(val[0]).format('YYYY-MM-DD hh:mm:ss');
                    this.searchParams.updateEndDate = MOMENT(val[1]).format('YYYY-MM-DD hh:mm:ss');
                }
            }
        },
        mounted() {
            this.getDictData();
            this.getData();
        },

        methods: {
            on_page_size_change(pageSize) {
                 this.searchParams.pageSize = pageSize;
            },
            on_change(pageNo) {
                this.searchParams.pageNo = pageNo;
                this.getData();
            },
            getEmployeeInfoByID(id) {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/sys/employee/detail',
                    params: {
                        employeeId: id
                    }
                }).then(function (response) {

                    if (response.status == 1) {

                        that.employee.name = response.result.name;
                        that.employee.jobNum = response.result.jobNum;
                        that.employee.sex = response.result.sex;
                        that.employee.education = response.result.education;
                        that.employee.getCertificateTime = response.result.getCertificateTime;
                        that.employee.idNumber = response.result.idNumber;
                        that.employee.entryDate = response.result.entryDate;
                        that.employee.phone = response.result.phone;
                        that.employee.postCategory = response.result.postCategory;
                        that.employee.postName = response.result.postName;
                        that.employee.otherPost = response.result.otherPost || '';
                        that.employee.status = response.result.status;
                        that.employee.trainRecord = response.result.trainRecord || [];
                        that.employee.pictureRelation = response.result.pictureList || [];

                        that.getCertificateTime = response.result.getCertificateTime;
                        that.entryDate = response.result.entryDate;

                        that.modalDetail = true;

                    } else {

                    }

                }).catch(function (err) {
                    console.dir(err);
                })
            },
            getData() {
                var that = this;
                Util.ajax({
                    method: 'post',
                    url: '/sys/employee/list',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {
                    debugger
                    if (response.status == 1) {
                        that.searchParams.count = response.result.count;
                        that.searchParams.pageCount = Math.ceil(response.result.count / response.result.pageSize);
                        that.listData = response.result.list;
                        console.dir(that.listData);
                    }
                    else {
                        console.log(response.errMsg);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            // 获取字典数据
            getDictData(cb) {
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

            // 查询按钮
            search() {
                this.getData();
            },
            // 导出
            exportFile () {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/sys/employee/downEmployeeExcel',
                    headers: {
                        'Content-Type': 'application/octet-stream;charset=utf-8'
                    },
                    responseType: 'arraybuffer',
//                    params: this.searchParams
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {
                    debugger
                    var blob = new Blob([response], {type: 'application/msexcel'}), fileName = '文件名称'; downFile(blob, fileName);
                    that.liu = response;
//                    if (response.status == 1) {
//
//                    }
//                    else {
//                        console.log(response.errMsg);
//                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },

            // 根据ID删除一条从业人员信息
            deleteData(row) {
                var that = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定删除 \"'+ row.name +' \"?</p>',
                    loading: true,
                    onOk: () => {
                        Util.ajax({
                            method: 'get',
                            url: '/sys/employee/delete',
                            params: {
                                employeeId: row.employeeId
                            }
                        }).then(function (response) {
                            if (response.status == 1) {
                                that.listData.splice(that.listData.indexOf(row), 1);
                                that.$Modal.remove();
                                that.$Message.info('删除成功!');

                            } else {
                                that.$Modal.remove();
                                that.$Message.info('删除失败!');
                            }
                        }).catch(function () {
                            that.$Modal.remove();
                            that.$Message.info('删除失败!');
                        });

                    },
                    onCancel: () => {
                        // this.$Message.info('点击了取消');
                    }
                });
            }
        }
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>

</style>