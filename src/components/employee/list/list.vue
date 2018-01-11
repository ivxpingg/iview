<template>

    <div class="my-list">
        <div class="top-panel">
            <div class="top-left-panel">
                <div class="search-panel">
                    <div class="col">
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="name"  label="模糊条件">
                                <Input v-model="searchParams.name" placeholder="请输入姓名或工号" style="width: 130px"></Input>
                            </FormItem>
                            <FormItem prop="postCategory" label="人员状态">
                                <Select transfer placeholder="请选择"  style="width: 130px">
                                    <Option :value="''" :label="'全选'"></Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="postCategory" label="岗位">
                                <Select v-model="searchParams.postCategory" transfer placeholder="请选择岗位"  style="width: 130px">
                                    <Option :value="''" :label="'全选'"></Option>
                                    <Option v-for="(item, index) in dict_post_type_List" :value="item.value">{{item.label}}</Option>
                                </Select>
                            </FormItem>

                            <FormItem v-if="searchParams.postCategory !=''" prop="postName" label="岗位名称">
                                <Select v-if="searchParams.postCategory != 'other'" v-model="searchParams.postName" transfer placeholder="请选择岗位名称" style="width: 130px">
                                    <Option :value="''">全选</Option>
                                    <Option v-for="item in dict_post_name_List" :value="item.value">{{item.label}}</Option>
                                </Select>
                                <Input class="ms-input" v-else v-model="searchParams.otherPost" placeholder="请输入岗位名称" style="width: 130px"></Input>
                            </FormItem>
                        </Form>
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="entryDate" label="取证日期">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="取证日期" v-model="entryDate" style="width: 130px"></DatePicker>
                            </FormItem>
                            <FormItem  label="证有效期" prop="entryDate">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="证有效期" v-model="entryDate" style="width: 130px"></DatePicker>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="col">
                        <Form inline :label-width="75">
                            <FormItem prop="updateDate"  label="更新日期">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="更新日期" v-model="updateDate" style="width: 130px"></DatePicker>
                            </FormItem>
                        </Form>
                        <div class="search-btn-panel">
                            <Button type="success">查询</Button>
                            <Button type="success">导出</Button>
                        </div>
                    </div>
                </div>
                <div class="btn-panel">

                    <router-link class="ivu-btn ivu-btn-success" to="employeeAdd">新增从业人员信息</router-link>
                    <Button type="success">导入从业人员报备表</Button>
                    <Button type="success">导入从业人员异动报备表</Button>
                </div>
            </div>
            <div class="top-right-panel">
                <div ref="echartPie1" class="echartPie"></div>
                <div ref="echartPie2" class="echartPie"></div>
                <div class="updateInfo">
                    <div>更新10</div>
                    <div>更新10</div>
                </div>
            </div>
        </div>
        <div class="table-panel"></div>

        <Row>
            <!--<Col span="24" class="ms-col-btn-panel">-->
                <!--<Button type="primary" icon="ios-cloud-upload-outline" @click="showModalExport">导入从业人员</Button>-->
                <!--<Button type="primary" icon="ios-cloud-upload-outline" @click="showModalExportReocrd">导入从业人员培训记录</Button>-->
            <!--</Col>-->
            <!--<Col span="24">-->
                <!--<Form class="ms-form-search" :model="searchParams" inline :label-width="0">-->
                    <!--<FormItem prop="name"  label="模糊条件">-->
                        <!--<Input v-model="searchParams.name" placeholder="请输入姓名或工号" style="width: 160px"></Input>-->
                    <!--</FormItem>-->

                    <!--<FormItem prop="postCategory" label="人员状态">-->
                        <!--<Select v-model="searchParams.postCategory" transfer placeholder="请选择"  style="width: 160px">-->
                            <!--<Option :value="''" :label="'全选'"></Option>-->
                            <!--<Option v-for="(item, index) in dict_post_type_List" :value="item.value">{{item.label}}</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->

                    <!--<FormItem prop="postCategory" label="">-->
                        <!--<Select v-model="searchParams.postCategory" transfer placeholder="请选择岗位"  style="width: 160px">-->
                            <!--<Option :value="''" :label="'全选'"></Option>-->
                            <!--<Option v-for="(item, index) in dict_post_type_List" :value="item.value">{{item.label}}</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->

                    <!--<FormItem v-if="searchParams.postCategory !=''" prop="postName" label="">-->
                        <!--<Select v-if="searchParams.postCategory != 'other'" v-model="searchParams.postName" transfer placeholder="请选择岗位名称" style="width: 220px">-->
                            <!--<Option :value="''">全选</Option>-->
                            <!--<Option v-for="item in dict_post_name_List" :value="item.value">{{item.label}}</Option>-->
                        <!--</Select>-->
                        <!--<Input class="ms-input" v-else v-model="searchParams.otherPost" placeholder="请输入岗位名称" style="width: 220px"></Input>-->
                    <!--</FormItem>-->

                    <!--&lt;!&ndash;<FormItem prop="sex"  label="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<Select v-model="searchParams.sex" placeholder="性别" transfer  style="width: 80px">&ndash;&gt;-->
                            <!--&lt;!&ndash;<Option v-for="item in dict_sex" :value="item.value">{{item.label}}</Option>&ndash;&gt;-->
                        <!--&lt;!&ndash;</Select>&ndash;&gt;-->
                    <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->



                    <!--<FormItem label="">-->
                        <!--<FormItem prop="entryDate">-->
                            <!--<DatePicker type="daterange" format="yyyy-MM-dd" :editable="false" placeholder="入职时间" v-model="entryDate" style="width: 190px"></DatePicker>-->
                        <!--</FormItem>-->
                    <!--</FormItem>-->

                    <!--<FormItem label="">-->
                        <!--<FormItem prop="updateDate">-->
                            <!--<DatePicker-->
                                    <!--type="datetimerange"-->
                                    <!--:confirm="false"-->
                                    <!--:options="DatePickerOptions"-->
                                    <!--format="yyyy-MM-dd HH:mm:ss"-->
                                    <!--:editable="false"-->
                                    <!--placeholder="选择日期"-->
                                    <!--v-model="updateDate"-->
                                    <!--style="width: 290px"></DatePicker>-->
                        <!--</FormItem>-->
                    <!--</FormItem>-->
                    <!--<Button type="primary" @click="search" icon="ios-search">查询</Button>-->
                    <!--<a :href="exportFileUrl" class="ivu-btn ivu-btn-primary"><span>导出</span></a>-->
                <!--</Form>-->
            <!--</Col>-->

            <Col span="24">
                <Table border :columns="columns" stripe :data="listData"></Table>
                <div class="ms-table-page">
                    <Page
                        :total="searchParams.count"
                        :page-size="searchParams.pageSize"
                        :page-size-opts="page_size_opts"
                        @on-page-size-change="on_page_size_change"
                        @on-change="on_change"
                        show-total
                        show-sizer>
                    </Page>
                </div>
            </Col>
        </Row>

        <Modal v-model="modalDetail" width="700" title="人员基本信息">
            <div>
                <div class="sxc-flex employeeInfo-box">
                    <div class="left-box sxc-flex__item">
                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">姓名:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.name}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">工号:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.jobNum}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">性别:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee_sex}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">文化程度:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee_education}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">取证日期:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.getCertificateTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">身份证号:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.idNumber}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">入职时间:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.entryDate}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">联系电话:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.phone}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">岗位类别:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{dict_post_type}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">岗位名称:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{dict_post_name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">人员状态:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee_status}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title"></span>
                                    <div class="content sxc-flex__item">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="right-box">
                        <img class="employeeHeaderImg" :src="headImageUrl" alt="">
                    </div>
                </div>

                <div class="item sxc-flex ">
                    <span class="title">从业资格证:</span>
                    <div class="content certificateImgList sxc-flex__item">
                        <!--<img v-for="item in CertificateImageUrlList" :src="item.pictureUrl" alt="">-->
                        <!--<vImgUpload :isLook="true" :defaultList="CertificateImageUrlList"></vImgUpload>-->
                        <div class="upload-list" v-for="item in CertificateImageUrlList">
                            <img :src="item.pictureUrl">
                            <div class="upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.pictureUrl)"></Icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item sxc-flex">
                    <span class="title">培训记录:</span>
                    <div class="content sxc-flex__item">
                        <Table
                                width=""
                                border
                                stripe
                                :columns="oTrainRecordColumns"
                                :data="employee.trainRecord"></Table>
                    </div>
                </div>

            </div>
            <div slot="footer">

            </div>
        </Modal>

        <!--<Modal v-model="modalExport" title="导入从业人员">-->
            <!--<div>-->
                <!--<Row v-if="modalExportType == '1'">-->
                    <!--<Col class="text-center" span="12">-->
                        <!--<a :href="exportFileUrl1" class="ivu-btn ivu-btn-primary"><span>下载从业人员模版</span></a>-->
                    <!--</Col>-->
                    <!--<Col class="text-center" span="12">-->
                        <!--<vFileUpload :url="importFileUrl1"  bText="导入从业人员信息"></vFileUpload>-->
                    <!--</Col>-->
                <!--</Row>-->
                <!--<Row v-else>-->
                    <!--<Col class="text-center" span="12">-->
                    <!--<a :href="exportFileUrl2" class="ivu-btn ivu-btn-primary"><span>下载从业人员模版</span></a>-->
                    <!--</Col>-->
                    <!--<Col class="text-center" span="12">-->
                        <!--<vFileUpload :url="importFileUrl2" bText="导入从业人员培训记录信息" ></vFileUpload>-->
                    <!--</Col>-->
                <!--</Row>-->
            <!--</div>-->
            <!--<div slot="footer"></div>-->
        <!--</Modal>-->

        <Modal title="查看图片" v-model="visible">
            <img :src="previewImgSrc" v-if="visible" style="width: 100%">
        </Modal>
    </div>

</template>

<script>
    import Util from '../../../libs/util';
    import MOMENT from 'moment';
    import vFileUpload from '../../upload/fileUpload/fileUpload.vue';
    import echarts from 'echarts';
    export default {
        data() {
            return {
                visible: false,   //
                previewImgSrc: '#',
                modalExport: false,               // 导出窗口
                modalExportType: '1',             // '1': 从业人员信息； '2': 从业人员培训信息
                modalDetail: false,               // 显示/隐藏弹出框
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
                    pageSize: 15,                // 每页记录数
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
                page_size_opts: [15, 30, 50],

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
        components: { vFileUpload },
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
            },
            // 岗位类别
            dict_post_type_List() {
                var typeList = [];
                this.dict_post.forEach(function (val) {
                    if(val.parentId === '0') {
                        typeList.push(val);
                    }
                });
                return typeList;
            },
            dict_post_name_List() {

                var that = this;
                var nameList = [];
                var id = '';
                this.dict_post.forEach(function (val) {
                    if (val.value == that.searchParams.postCategory) {
                        id = val.id;
                    }
                });
                this.dict_post.forEach(function (val) {
                    if(val.parentId == id) {
                        nameList.push(val);
                    }
                });
                return nameList;
            },
            headImageUrl() {
                for (let i = 0; i < this.employee.pictureRelation.length; i++){
                    if (this.employee.pictureRelation[i].pictureType === 'HeadPortrait') {
                        return this.employee.pictureRelation[i].pictureUrl;
                    }
                }
                return 'https://i.loli.net/2017/08/21/599a521472424.jpg';
            },
            CertificateImageUrlList() {
                var list = [];
                for (let i = 0; i < this.employee.pictureRelation.length; i++){
                    if (this.employee.pictureRelation[i].pictureType === 'Certificate') {
                        list.push(this.employee.pictureRelation[i]);
                    }
                }
                return list;
            },
            exportFileUrl() {
                var url = Util.domain + '/xm/sys/employee/downEmployeeExcel?';
                url += 'name=' + this.searchParams.name;
                url += '&sex=' + this.searchParams.sex;
                url += '&postCategory=' + this.searchParams.postCategory;
                url += '&postName=' + this.searchParams.postName;
                url += '&entryBeginDate=' + this.searchParams.entryBeginDate;
                url += '&entryEndDate=' + this.searchParams.entryEndDate;
                url += '&updateBeginDate=' + this.searchParams.updateBeginDate;
                url += '&updateEndDate=' + this.searchParams.updateEndDate;
                url += '&otherPost=' + this.searchParams.otherPost;

                return url;
            },
            exportFileUrl1() {
                return  Util.domain + '/static/download/从业人员导入模板.xlsx';
            },
            exportFileUrl2() {
                return Util.domain + '/static/download/xlsx/培训记录导入模板.xlsx';
            },
            importFileUrl1() {
                return Util.domain + '/xm/sys/employee/uploadEmployeeExcel';
            },
            importFileUrl2() {
                return Util.domain + '/xm/sys/employee/uploadTrainRecordExcel';
            }
        },
        watch: {
            entryDate(val, oldVal) {

                if (val == '' || val[0] == '' || val[0] == null) {
                    this.searchParams.entryBeginDate = '';
                    this.searchParams.entryEndDate = '';
                }
                else {
                    this.searchParams.entryBeginDate = MOMENT(val[0]).format('YYYY-MM-DD');
                    this.searchParams.entryEndDate = MOMENT(val[1]).format('YYYY-MM-DD');
                }
            },
            updateDate(val, oldVal) {
                if (val == '' || val[0] == '' || val[0] == null) {
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
            var that = this;
            // 初始化设置system父窗体滚动条
//            setTimeout(function (){
//                if(that.$store.state.systemScroll) {
//                    that.$store.state.systemScroll.scrollTo(0, 0);
//                    that.$store.state.systemScroll.refresh();
//                }
//            }, 0);
            this.getDictData();
            this.getData();

            this.setEchartPie1();
            this.setEchartPie2();
        },

        methods: {
            // 查看从业资格证弹出框
            handleView(url){
                this.previewImgSrc = url;
                this.visible = true;
            },
            on_page_size_change(pageSize) {
                this.searchParams.pageSize = pageSize;
                this.getData();
            },
            on_change(pageNo) {
                this.searchParams.pageNo = pageNo;
                this.getData();
            },
            getEmployeeInfoByID(id) {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/sys/employee/detail',
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

                if (that.searchParams.postCategory == "") {
                    that.searchParams.postName = "";
                }

                Util.ajax({
                    method: 'post',
                    url: '/xm/sys/employee/list',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {

                    if (response.status == 1) {
                        that.searchParams.count = response.result.count;
                        that.searchParams.pageCount = Math.ceil(response.result.count / response.result.pageSize);
                        that.listData = response.result.list;

//                        setTimeout(function () {
//                            debugger
//                            that.$store.state.systemScroll.refresh();
//                        }, 0);
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

            },

            // 查询按钮
            search() {
                this.getData();
            },

            // 导入
            showModalExport() {
                this.modalExportType = '1';
                this.modalExport = true;
            },
            showModalExportReocrd() {
                this.modalExportType = '2';
                this.modalExport = true;
            },

            // 导出
            exportFile () {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/sys/employee/downEmployeeExcel',
                    headers: {
                        'Content-Type': 'application/octet-stream;charset=utf-8'
                    },
                    responseType: 'arraybuffer',
//                    params: this.searchParams
                    data: JSON.stringify(this.searchParams)
                }).then(function (response) {

                    var blob = new Blob([response], {type: 'application/msexcel'}), fileName = '文件名称'; downFile(blob, fileName);
                    that.liu = response;
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
                            url: '/xm/sys/employee/delete',
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
            },

            //
            setEchartPie1() {

                var myChart = echarts.init(this.$refs.echartPie1);
                var option = {
                    title : {
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            },
            setEchartPie2() {

                var myChart = echarts.init(this.$refs.echartPie2);
                var option = {
                    title : {
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {

                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            }

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .my-list {
        padding-bottom: 120px;

        .top-panel {
            display: flex;
            width: 1440px;
            height: 200px;

            .top-left-panel {
                flex: 1;

                .search-panel {
                    display: flex;
                    margin-bottom: 5px;
                    height: 150px;
                    border: 1px solid #999;
                    border-radius: 10px;
                    .col {

                        &:first-child {
                            flex: 2;
                        }
                        &:last-child {
                            flex: 1;
                        }

                        .search-btn-panel {

                        }
                    }
                }
                .btn-panel {
                    height: 40px;
                }
            }
            .top-right-panel {
                flex: 1;
                display: flex;

                .echartPie {
                    flex: 1;
                    height: 150px;
                }

                .updateInfo {
                    flex: 1;
                    height: 200px;
                }
            }

        }
        .table-panel {

        }
    }

    .text-center {
        text-align: center;
    }

    .item {
        margin-bottom: 6px;
        .title {
            padding-right: 8px;
            width: 75px;
            height: 24px;
            color: rgb(73, 80, 96);
            font-weight: 700;
            line-height:24px;
            text-align: right;
        }
        .content {
            span {
                color: rgb(73, 80, 96);
                line-height: 24px;
            }
        }
    }

    .employeeInfo-box {
        .left-box {

        }
        .right-box{
            .employeeHeaderImg {
                width: 80px;
                border-radius: 5px;
            }
        }
    }

    .ms-col-btn-panel {
        margin-top: 24px;
        margin-bottom: 24px;
        text-align: left;
    }
    .ms-table-page{
        margin: 18px 0;
        text-align: center;
    }


    .upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .upload-list img{
        width: 100%;
        height: 100%;
    }
    .upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .upload-list:hover .upload-list-cover{
        display: block;
    }
    .upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<style lang="scss" rel="stylesheet/scss">

</style>