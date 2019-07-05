<template>

    <div class="my-list">
        <div class="top-panel">
            <div class="top-left-panel">
                <div class="search-panel">
                    <div class="col">
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="name"  label="模糊条件:">
                                <Input v-model="searchParams.name" placeholder="请输入姓名或工号" style="width: 140px"></Input>
                            </FormItem>
                            <FormItem prop="postCategory" label="人员状态:">
                                <Select v-model="searchParams.status" transfer placeholder="请选择"  style="width: 140px">
                                    <Option :value="''" :label="'全选'"></Option>
                                    <Option v-for="item in dict_status" :value="item.value">{{item.label}}</Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="postCategory" label="岗位类别:">
                                <Select v-model="searchParams.postCategory" transfer placeholder="请选择岗位"  style="width: 140px">
                                    <Option :value="''" :label="'全选'"></Option>
                                    <Option v-for="(item, index) in dict_post_type_List" :value="item.value">{{item.label}}</Option>
                                </Select>
                            </FormItem>

                            <FormItem prop="postName" label="岗位名称:">
                                <Select ref="select_post_name_List" v-if="searchParams.postCategory != 'other'" v-model="searchParams.postName" transfer placeholder="请选择岗位名称" style="width: 140px">
                                    <Option :value="''">全选</Option>
                                    <Option v-for="item in dict_post_name_List" :value="item.value" :key="item.value">{{item.label}}</Option>
                                </Select>
                                <Input class="ms-input" v-else v-model="searchParams.otherPost" placeholder="请输入岗位名称" style="width: 140px"></Input>
                            </FormItem>
                        </Form>
                        <Form :model="searchParams" inline :label-width="75">
                            <FormItem prop="getCertificateTime" label="取证日期:">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="取证日期" v-model="getCertificateTime" style="width: 140px"></DatePicker>
                            </FormItem>
                            <FormItem  label="证有效期:" prop="certificateUseDate">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="证有效期" v-model="certificateUseDate" style="width: 140px"></DatePicker>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="col">
                        <Form inline :label-width="75">
                            <FormItem prop="updateDate"  label="更新日期:">
                                <DatePicker type="daterange" format="MM-dd" :editable="false" placeholder="更新日期" v-model="updateDate" style="width: 140px"></DatePicker>
                            </FormItem>
                        </Form>
                        <div class="search-btn-panel">
                            <Button class="mybtn" type="success" @click="search('')">查询</Button>
                            <a :href="exportFileUrl" class="ivu-btn ivu-btn-success mybtn"><span>导出</span></a>
                            <!--<Button class="mybtn" type="success">导出</Button>-->
                        </div>
                    </div>
                </div>
                <div class="btn-panel">

                    <!--<router-link class="ivu-btn ivu-btn-primary ivu-btn-circle" to="employeeAdd">新增从业人员信息</router-link>-->
                    <Button type="primary" shape="circle" @click="onEmployeeAdd" style="width: 150px;">新增从业人员信息</Button>
                    <Button type="primary" shape="circle" @click="modal_import = true" style="width: 60px;">导入</Button>

                    <div class="v-file-up-load item-text">总在职人员数: <span class="text">{{searchParams.totalOnJobNum}}</span> </div>
                    <div class="v-file-up-load item-text">当前查询结果人员数: <span class="text-green">{{searchParams.queryOnJobNum}}</span></div>
                    <!--<vFileUpload class="v-file-up-load" :url="importFileUrl1"  bText="导入从业人员报备表"></vFileUpload>-->
                    <!--<vFileUpload class="v-file-up-load" :url="importFileUrl2"  bText="导入从业人员异动报备表"></vFileUpload>-->
                </div>
            </div>

            <div class="top-right-panel">
                <div ref="echartPie1" class="echartPie"></div>
                <div ref="echartPie2" class="echartPie"></div>
                <div class="updateInfo">
                    <div class="pan" @click="onInsertOrModCount('insert')">
                        <div class="title">新增</div>
                        <div class="value">{{insertNum}}</div>
                        <div class="unit">条</div>
                    </div>
                    <div class="pan" @click="onInsertOrModCount('mod')">
                        <div class="title">修改</div>
                        <div class="value">{{modNum}}</div>
                        <div class="unit">条</div>
                    </div>
                </div>
            </div>
            <div class="top-center-panel"></div>
        </div>
        <div class="table-panel"></div>

        <Row>
            <Col span="24">
                <Table  class="myTableIview" border :columns="columns" stripe :data="listData" :height="533"></Table>
                <div class="ms-table-page">
                    <Page
                        :total="page_count"
                        :current="page_current"
                        :page-size="searchParams.pageSize"
                        :page-size-opts="page_size_opts"
                        placement="top"
                        size="small"
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
                                    <span class="title">从业资格证名称:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee_certificateName}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">发证单位:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee_issuingUnit}}</span>
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
                                    <span class="title">离职时间:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.leaveJobDate}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sxc-flex">
                            <div class="sxc-flex__item">
                                <div class="item sxc-flex">
                                    <span class="title">离职原因:</span>
                                    <div class="content sxc-flex__item">
                                        <span>{{employee.leaveJobReason}}</span>
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
                                class="myTableIview"
                                width="570"
                                height="200"
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


        <Modal title="查看图片" v-model="visible">
            <img :src="previewImgSrc" v-if="visible" style="width: 100%">
        </Modal>

        <Modal title="添加从业人员"
               class-name="modal-employee-edit"
               v-model="visibleAdd"
               :transfer="false"
               width="900">
            <vEmployeeAdd :v-if="visibleAdd" status="add" @hideModalAdd="hideModalAdd"></vEmployeeAdd>
            <div slot="footer"></div>
        </Modal>

        <Modal title="修改从业人员"
               class-name="modal-employee-edit"
               v-model="visibleEdit"
               :transfer="false"
               width="900">
            <vEmployeeEdit :v-if="visibleEdit" status="edit" :employeeId="editEmployeeId" @hideModalEdit="hideModalEdit"></vEmployeeEdit>
            <div slot="footer"></div>
        </Modal>

        <Modal title="导入"
               footer-hide
               v-model="modal_import">
            <vModalImport @modal-callack="getData"></vModalImport>
        </Modal>
    </div>

</template>

<script>
    import Util from '../../../libs/util';
    import MOMENT from 'moment';
    import vFileUpload from '../../upload/fileUpload/fileUpload.vue';
    import echarts from 'echarts';
    import vEmployeeAdd from '../add/add.vue';
    import vEmployeeEdit from '../add/add.vue';
    import vModalImport from './modalImport';
    export default {
        data() {
            return {
                visible: false,   //
                visibleAdd: false,
                visibleEdit: false,

                editEmployeeId: '',              // 编辑从业人员编号

                insertNum: 0,               // 新增统计
                modNum: 0,                  // 更新统计
                postCategoryList: [],         // 根据岗位的图表统计数据
                issuingUnitList: [],  // 根据发证单位的图表统计数据

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
                    certificateUseDate: '',      // 证有效期
                    certificateName: '',         // 从业资格证名称
                    issuingUnit: '',             // 发证单位
                    idNumber: '',
                    entryDate: '',
                    phone: '',
                    postCategory: '',
                    postName: '',
                    otherPost: '',
                    status: '',
                    trainRecord: [],
                    pictureRelation: [],
                    leaveJobDate: '',              // 离职时间
                    leaveJobReason: ''             // 离职原因
                },
                // 培训记录表格配置信息
                oTrainRecordColumns: [
                    { title: '时间', align: 'center', key: 'trainDate', width: 180},
                    { title: '学时', align: 'center', key: 'period' },
                    { title: '培训内容', align: 'center', key: 'trainContent' },
                    { title: '成绩', align: 'center', key: 'achievement', width: 80 }],
                searchParams: {
                    queryOnJobNum: 0,
                    totalOnJobNum: 0,
                    pageNo: 1,                   // 当前页数
                    pageSize: 10,                // 每页记录数
                    count: 0,                    // 总数据量
                    pageCount: 0,                // 总页数
                    name: '',                      // 姓名
                    sex: '',                       // 性别
                    postCategory: '',              // 岗位类别
                    postName: '',                  // 岗位名称
                    getCertificateBeginTime: '',        // 取证日期,开始时间
                    getCertificateEndTime: '',          // 取证日期,结束时间
                    certificateUseBeginDate: '',        // 证有效期，开始时间
                    certificateUseEndDate: '',          // 证有效期，结束时间
//                    entryBeginDate: '',            // 入职开始时间
//                    entryEndDate: '',              // 入职结束时间
                    insertBeginDate: '',             //新增开始时间
                    insertEndDate: '',               //新增结束时间
                    updateBeginDate: '',           // 更新开始时间
                    updateEndDate: '',             // 更新结束时间
                    otherPost: '',                 // 其他岗位
                    status: ''                     // 人员状态
                },
                searchParams2: {
                    updateBeginDate: '',           // 更新开始时间
                    updateEndDate: '',             // 更新结束时间
                    insertBeginDate: '',           //新增开始时间
                    insertEndDate: ''              //新增结束时间
                },
                searchParams3: {
                    insertBeginDate: '',           //新增开始时间
                    insertEndDate: '',             //新增结束时间
                    pageNo: 1,                     // 当前页数
                    pageSize: 10                   // 每页记录数
                },
                searchParams4: {
                    updateBeginDate: '',           // 更新开始时间
                    updateEndDate: '',             // 更新结束时间
                    pageNo: 1,                     // 当前页数
                    pageSize: 10,                  // 每页记录数
                    count: 0                      // 总数据量
                },
                searchParams5: {
                    issuingUnit: '',
                    pageNo: 1,                     // 当前页数
                    pageSize: 10,                  // 每页记录数
                    count: 0                      // 总数据量
                },
                searchParams6: {
                    postCategory: '',
                    pageNo: 1,                     // 当前页数
                    pageSize: 10,                  // 每页记录数
                    count: 0                      // 总数据量
                },

                searchparamsIndex: '',  // '' || '3' || '4' || '5' || '6'

                entryDate: '',
                updateDate: '',
                getCertificateTime: '',            // 时间控件 取证日期
                certificateUseDate: '',            // 时间控件 证有效期

                // 数据字典
                dict_post: [],
                dict_education: [],
                dict_sex: [],
                dict_status: [],
                dict_certificateName: [],  //从业资格证名称字典
                dict_issuingUnit: [],      //发证单位字典

                // 分页控件
                page_size_opts: [10, 25, 50],

                // 表格
                listData: [],                       // 表格数据，接收ajax返回的数据
                columns: [
                    { title: '序号', type: 'index', width: 80, align: 'center' },
                    { title: '姓名', key: 'name', align: 'center'},
                    { title: '人员状态', key: 'status', align: 'center' },
//                    { title: '工号', key: 'jobNum' },
//                    { title: '性别', key: 'sex' },
                    { title: '岗位类别', key: 'postCategory', sortable: true, align: 'center' },
                    { title: '岗位名称', key: 'postName', sortable: true, align: 'center' },
                    { title: '从业资格证名称', key: 'shortCertificateName', align: 'center' },
                    { title: '发证单位', key: 'shortIssuingUnit', align: 'center' },
                    { title: '取证日期', key: 'getCertificateTime', sortable: true, align: 'center' },
                    { title: '从业资格证有效期', key: 'certificateUseDate', sortable: true, align: 'center' },
                    { title: '更新日期', key: 'modTime', sortable: true, align: 'center' },
//                    { title: '联系电话', key: 'phone' },
                    { title: '操作', align: 'center', key: 'action', width: 180, render: (h, params) => {
                        var that = this;
                        return h('div', [
                            h('Button', {
                                style: {
                                    color: '#008dcf'
                                },
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
                                style: {
                                    color: '#1bae68'
                                },
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click() {
//                                        that.$router.push({
//                                            name: 'employeeEdit',  // 路由名称
//                                            params: {
//                                                funcId: that.$route.params.funcId,
//                                                employeeId: params.row.employeeId
//                                            }
//                                        });
                                        that.editEmployeeId = params.row.employeeId;
                                        that.visibleEdit = true;
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                style: {
                                    color: '#ea5514'
                                },
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
                },

                modal_import: false
            }
        },
        components: { vFileUpload, vEmployeeAdd, vEmployeeEdit, vModalImport },
        computed: {
            // 分页
            page_count() {
                return this['searchParams' + this.searchparamsIndex].count;
            },
            page_current() {
                return this['searchParams' + this.searchparamsIndex].pageNo;
            },

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

            employee_certificateName() {

                for (let i = 0; i < this.dict_certificateName.length; i++) {
                    if (this.dict_certificateName[i].value == this.employee.certificateName) {
                        return this.dict_certificateName[i].label;
                    }
                }
                return '';
            },
            employee_issuingUnit() {
                for (let i = 0; i < this.dict_issuingUnit.length; i++) {
                    if (this.dict_issuingUnit[i].value == this.employee.issuingUnit) {
                        return this.dict_issuingUnit[i].label;
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

                if(this.$refs.select_post_name_List) {
                    this.$refs.select_post_name_List.$forceUpdate();
                }

                var nameList = [];
                var id = '';
                this.dict_post.forEach(function (val) {
                    if (val.value == that.searchParams.postCategory) {
                        id = val.id;
                    }
                });

                if(id == ''){
                    this.dict_post.forEach(function (val) {
                         nameList.push(val);
                    });
                }
                else {
                    this.dict_post.forEach(function (val) {
                        if(val.parentId == id) {
                            nameList.push(val);
                        }
                    });
                }

                return nameList;
            },
            headImageUrl() {
                for (let i = 0; i < this.employee.pictureRelation.length; i++){
                    if (this.employee.pictureRelation[i].pictureType === 'HeadPortrait') {
                        return Util.domain + this.employee.pictureRelation[i].pictureUrl;
                    }
                }
                return Util.staticImgUrl + '/static/img/default-head.jpg';
            },
            CertificateImageUrlList() {
                var list = [];
                for (let i = 0; i < this.employee.pictureRelation.length; i++){
                    if (this.employee.pictureRelation[i].pictureType === 'Certificate') {
                        this.employee.pictureRelation[i].pictureUrl = Util.domain + this.employee.pictureRelation[i].pictureUrl;
                        list.push(this.employee.pictureRelation[i]);
                    }
                }
                return list;
            },
            exportFileUrl() {
                var url = Util.domain + '/xm/sys/employee/downEmployeeExcel?';
                url += 'name=' + this.searchParams.name;
                url += '&status=' + this.searchParams.status;
                url += '&postCategory=' + this.searchParams.postCategory;
                url += '&postName=' + this.searchParams.postName;
//                url += '&entryBeginDate=' + this.searchParams.entryBeginDate;
//                url += '&entryEndDate=' + this.searchParams.entryEndDate;
                url += '&updateBeginDate=' + this.searchParams.updateBeginDate;
                url += '&updateEndDate=' + this.searchParams.updateEndDate;
                url += '&getCertificateBeginTime=' + this.searchParams.getCertificateBeginTime;
                url += '&getCertificateEndTime=' + this.searchParams.getCertificateEndTime;
                url += '&certificateUseBeginDate=' + this.searchParams.certificateUseBeginDate;
                url += '&certificateUseEndDate=' + this.searchParams.certificateUseEndDate;
                url += '&otherPost=' + this.searchParams.otherPost;

                return url;
            },
            exportFileUrl1() {
                return  Util.domain + '/static/download/xlsx/从业人员导入模板.xlsx';
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
                    this.searchParams.updateBeginDate = MOMENT(val[0]).format('YYYY-MM-DD');
                    this.searchParams.updateEndDate = MOMENT(val[1]).format('YYYY-MM-DD');
                }
            },
            getCertificateTime(val, oldVal) {
                if (val == '' || val[0] == '' || val[0] == null) {
                    this.searchParams.getCertificateBeginTime = '';
                    this.searchParams.getCertificateEndTime = '';
                }
                else {
                    this.searchParams.getCertificateBeginTime = MOMENT(val[0]).format('YYYY-MM-DD');
                    this.searchParams.getCertificateEndTime = MOMENT(val[1]).format('YYYY-MM-DD');
                }
            },
            certificateUseDate(val, oldVal){
                if (val == '' || val[0] == '' || val[0] == null) {
                    this.searchParams.certificateUseBeginDate = '';
                    this.searchParams.certificateUseEndDate = '';
                }
                else {
                    this.searchParams.certificateUseBeginDate = MOMENT(val[0]).format('YYYY-MM-DD');
                    this.searchParams.certificateUseEndDate = MOMENT(val[1]).format('YYYY-MM-DD');
                }
            }
        },
        mounted() {
            this.init();

            this.getDataForNumber();

            this.getDictData();
            this.getData();

            this.getDataForEcharts();
        },

        methods: {
            init() {
                var week,
                    startTime,
                    endTime,
                    m;
                m = MOMENT();
                week = m.day();
                switch (week) {
                    case 1:
                        endTime = m.format('YYYY-MM-DD');
                        startTime = m.subtract(3, 'days').format('YYYY-MM-DD');
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        endTime = m.format('YYYY-MM-DD');
                        startTime = m.subtract(1, 'days').format('YYYY-MM-DD');
                        break;
                    case 7:
                        endTime = m.format('YYYY-MM-DD');
                        startTime = m.subtract(2, 'days').format('YYYY-MM-DD');
                        break;
                    default: break;
                }
                this.searchParams2.updateBeginDate = startTime;
                this.searchParams2.updateEndDate = endTime;
                this.searchParams4.updateBeginDate = startTime;
                this.searchParams4.updateEndDate = endTime;


                this.searchParams2.insertBeginDate = startTime;
                this.searchParams2.insertEndDate = endTime;
                this.searchParams3.insertBeginDate = startTime;
                this.searchParams3.insertEndDate = endTime;


            },
            // 查看从业资格证弹出框
            handleView(url){
                this.previewImgSrc = url;
                this.visible = true;
            },
            on_page_size_change(pageSize) {
                this['searchParams' + this.searchparamsIndex].pageSize = pageSize;
                this.getData(this.searchparamsIndex);
            },
            on_change(pageNo) {
                // this.searchParams.pageNo = pageNo;
                this['searchParams' + this.searchparamsIndex].pageNo = pageNo;
                this.getData(this.searchparamsIndex);
            },
            getEmployeeInfoByID(id) {
                var that = this;
                that.$Spin.show();
                Util.ajax({
                    method: 'get',
                    url: '/xm/sys/employee/detail',
                    params: {
                        employeeId: id
                    }
                }).then(function (response) {
                    that.$Spin.hide();
                    if (response.status == 1) {

                        that.employee.name = response.result.name || '';
                        that.employee.jobNum = response.result.jobNum || '';
                        that.employee.sex = response.result.sex || '';
                        that.employee.education = response.result.education || '';
                        that.employee.getCertificateTime = response.result.getCertificateTime || '';
                        that.employee.certificateUseDate = response.result.certificateUseDate || '';
                        that.employee.certificateName = response.result.certificateName || '';
                        that.employee.issuingUnit = response.result.issuingUnit || '';
                        that.employee.idNumber = response.result.idNumber || '';
                        that.employee.entryDate = response.result.entryDate || '';
                        that.employee.phone = response.result.phone || '';
                        that.employee.postCategory = response.result.postCategory || '';
                        that.employee.postName = response.result.postName || '';
                        that.employee.otherPost = response.result.otherPost || '';
                        that.employee.status = response.result.status || '';
                        that.employee.trainRecord = response.result.trainRecord || [];
                        that.employee.pictureRelation = response.result.pictureList || [];
                        that.employee.leaveJobDate = response.result.leaveJobDate || '';
                        that.employee.leaveJobReason = response.result.leaveJobReason || '';

                        that.getCertificateTime = response.result.getCertificateTime;
//                        that.entryDate = response.result.entryDate;

                        that.modalDetail = true;

                    } else {

                    }

                }).catch(function (err) {
                    that.$Spin.hide();
                    console.dir(err);
                })
            },

            // 获取新增或修改的前一天数据统计
            getDataForNumber() {
                var that = this;
                Util.ajax({
                    method: 'post',
                    url: '/xm/sys/employee/getInsertModCount',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(this.searchParams2)
                }).then(function (response) {

                    if (response.status == 1) {
                        that.insertNum = response.result.insertNum;
                        that.modNum = response.result.modNum;

                    }
                    else {
                        console.log(response.errMsg);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            // 获取图标统计的数据
            getDataForEcharts() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/sys/employee/getEmployeeCount'
                }).then(function (response) {

                    if (response.status == 1) {
                        that.issuingUnitList = response.result.issuingUnitList;
                        that.postCategoryList = response.result.postCategoryList;
                        that.setEchartPie1();
                        that.setEchartPie2();
                    }
                    else {
                        console.log(response.errMsg);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },

            // 表格
            getData(type) {
                var that = this;

                if (that.searchParams.postCategory == "") {
                    //that.searchParams.postName = "";
                    that.searchParams.otherPost = "";
                }


                if(type !== undefined) {
                    that.searchparamsIndex = type;
                }

                var params = type == undefined ? this.searchParams : this['searchParams' + type];

                that.$Spin.show();
                Util.ajax({
                    method: 'post',
                    url: '/xm/sys/employee/list',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify(params)
                }).then(function (response) {
                    that.$Spin.hide();
                    if (response.status == 1) {
                        that['searchParams' + that.searchparamsIndex].count = response.result.page.count;
                        //that.searchParams.count = response.result.page.count;
                        // that.searchParams.pageCount = Math.ceil(response.result.page.count / response.result.page.pageSize);
                        that.listData = response.result.page.list;

                        that.searchParams.queryOnJobNum = response.result.queryOnJobNum;
                        that.searchParams.totalOnJobNum = response.result.totalOnJobNum;
                    }
                    else {
                        console.log(response.errMsg);
                    }
                }).catch(function (err) {
                    that.$Spin.hide();
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

            // 查询按钮
            search(type) {
                this.searchParams.pageNo = 1;
                this.getData(type);
            },

            // 新增或修改统计数据点击事件
            onInsertOrModCount(type) {
                if (type == 'insert') {
                    this.searchParams.pageNo = 1;
                    this.searchParams3.pageNo = this.searchParams.pageNo;
                    this.searchParams3.pageSize = this.searchParams.pageSize;
                    this.getData('3');
                }
                else {
                    this.searchParams.pageNo = 1;
                    this.searchParams4.pageNo = this.searchParams.pageNo;
                    this.searchParams4.pageSize = this.searchParams.pageSize;
                    this.getData('4');
                }

            },

            // 添加和编辑从业人员弹出框设置
            hideModalAdd() {
                this.visibleAdd = false;
                this.getData();
            },
            hideModalEdit() {
                this.visibleEdit = false;
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
                                that.getData();
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

            // 添加从业人员事件
            onEmployeeAdd(){
                this.visibleAdd = true;
            },

            //
            setEchartPie1() {
                var that = this;
                var myChart = echarts.init(this.$refs.echartPie1);
                var option = {
                    color: ['#88c897', '#8e81bc','#65aadd','#f3994f', '#ef857d'],
                    backgroundColor: '#f3f4f5',
                    title : {
                    },
                    grid: {
                        top: '0%',
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                    },
                    series : [
                        {
                            name: '岗位类别',
                            type: 'pie',
                            radius : '70%',
                            center: ['50%', '50%'],
                            data: that.postCategoryList,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 5,
                                    length2: 5,
                                    smooth: true
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);

                myChart.on('click', function (params) {
                    that.searchParams.pageNo = 1;
                    that.searchParams6.pageNo = that.searchParams.pageNo;
                    that.searchParams6.pageSize = that.searchParams.pageSize;
                    that.searchParams6.postCategory =  params.data.type;
                    that.getData('6');
                });
            },
            setEchartPie2() {
                var that = this;
                var myChart = echarts.init(this.$refs.echartPie2);
                var option = {
                    color: ['#88c897', '#8e81bc','#65aadd','#f3994f', '#ef857d'],
                    backgroundColor: '#f3f4f5',
                    title : {
                    },
                    grid: {
                        top: '0%',
                        left: '0%',
                        right: '0%',
                        containLabel: true
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {

                    },
                    series : [
                        {
                            name: '发证单位',
                            type: 'pie',
                            radius : '70%',
                            center: ['50%', '50%'],
                            data: that.issuingUnitList,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 5,
                                    length2: 5,
                                    smooth: true
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);
                myChart.on('click', function (params) {
                    that.searchParams.pageNo = 1;
                    that.searchParams5.pageNo = that.searchParams.pageNo;
                    that.searchParams5.pageSize = that.searchParams.pageSize;
                    that.searchParams5.issuingUnit =  params.data.type;
                    that.getData('5');
                });
            }

        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .my-list {
        .top-panel {
            display: flex;
            box-sizing: border-box;
            margin-bottom: 14px;
            .top-left-panel {
                width: 671px;
                height: 162px;

                .search-panel {
                    display: flex;
                    padding-top: 3px;
                    width: 100%;
                    height: 126px;
                    background-color: #FFF;
                    border: 2px solid #b0cbe6;
                    border-radius: 10px;
                    .col {

                        &:first-child {
                            flex: 2;
                        }
                        &:last-child {
                            flex: 1;
                        }

                        .search-btn-panel {
                            padding-top: 10px;

                            .mybtn {
                                width: 82px;
                                height: 56px;
                                font-size: 16px;
                                line-height: 42px;

                                &:first-child {
                                    margin-left: 14px;
                                    margin-right: 30px;
                                }
                            }
                        }
                    }
                }
                .btn-panel {
                    padding-top: 10px;
                    height: 40px;

                    .v-file-up-load {
                        margin-right: 45px;
                        display: inline-block;

                        &.item-text {
                            font-size: 14px;

                            .text {
                                color: #e06c75;
                                font-weight: 700;
                            }

                            .text-green {
                                color: #19be6b;
                                font-weight: 700;
                            }
                        }
                    }
                    .ivu-btn {
                        margin-right: 25px;
                        padding: 0 15px;
                        width: 187px;
                        height: 26px;
                        line-height: 24px;
                        &:last-child {
                            float: right;
                            margin-right: 0;
                        }
                    }
                }
            }
            .top-center-panel {
                flex: 1;
            }
            .top-right-panel {
                /*flex: 1;*/
                width: 716px;
                display: flex;
                margin-left: 15px;
                .echartPie {
                    margin-right: 12px;
                    width: 271px;
                    height: 162px;
                    border: 2px solid #e7e7e7;
                }

                .updateInfo {
                    //margin-left: 12px;
                    width: 150px;
                    height: 162px;

                    .pan {
                        position: relative;
                        width: 150px;
                        height: 81px;
                        color: #FFF;
                        border-radius: 10px;
                        cursor: pointer;

                        &:first-child {
                            background-color: #f2ab6e;
                            border: 1px solid #f3be90;

                            .value {
                                color: #f2ab6e;
                            }
                        }
                        &:last-child {
                            background-color: #86b7e1;
                            border: 1px solid #a6c6e6;
                            .value {
                                color: #86b7e1;
                            }
                        }

                        .title {
                            position: absolute;
                            top: 19px;
                            left: 17px;
                            width: 16px;
                            font-size: 16px;
                            text-align: center;
                            line-height: 21px;
                        }
                        .value {
                            position: absolute;
                            top: 7px;
                            left: 53px;
                            width: 64px;
                            height: 64px;
                            font-size: 40px;
                            line-height: 64px;
                            font-weight: 700;
                            text-align: center;
                            background-color: #FFF;
                            border-radius: 50%;
                        }
                        .unit {
                            position: absolute;
                            top: 52px;
                            left: 121px;
                            width: 16px;
                            height: 14px;
                            text-align: left;
                            font-size: 14px;
                            line-height: 14px;
                        }
                    }
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
            width: 100px;
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
    .search-panel {
        .ivu-form-item {
            margin-bottom: 6px;
        }
        .ivu-form-inline .ivu-form-item {
            margin-right: 0;
        }
    }


    .modal-employee-edit {
        .ivu-modal-body {
            max-height: 600px;
            overflow-y: auto;
        }
    }
</style>