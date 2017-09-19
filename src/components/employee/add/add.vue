<template>
    <div class="">
        <Form :model="employee" :rules="ruleInline"　:label-width="120">
            <FormItem prop="deptName" label="部门">
                <Input v-model="employee.deptName" placeholder="请输入部门"></Input>
            </FormItem>
            <FormItem prop="employeeNo"  label="员工号">
                <Input v-model="employee.employeeNo" placeholder="请输入员工号"></Input>
            </FormItem>
            <FormItem prop="name"  label="姓名">
                <Input v-model="employee.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem prop="sex"  label="性别">
                <Select v-model="employee.sex" placeholder="请选择">
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem prop="IDNumber"  label="身份证号">
                <Input v-model="employee.IDNumber" placeholder="请输入身份证"></Input>
            </FormItem>
            <FormItem prop="telephone"  label="联系方式">
                <Input v-model="employee.telephone" placeholder="请输入手机(固话)"></Input>
            </FormItem>
            <FormItem prop="nation"  label="民族">
                <Input v-model="employee.nation" placeholder="请输入名族"></Input>
            </FormItem>
            <FormItem prop="lastSchool"  label="毕业学校">
                <Input v-model="employee.lastSchool" placeholder="请输入毕业学校"></Input>
            </FormItem>
            <FormItem prop="lastSubject"  label="专业">
                <Input v-model="employee.lastSubject" placeholder="请输入部门"></Input>
            </FormItem>
            <FormItem label="入职时间">
                <FormItem prop="entryTime">
                    <DatePicker type="date" placeholder="选择日期" v-model="employee.entryTime"></DatePicker>
                </FormItem>
            </FormItem>
            <FormItem prop="lastSubject"  label="从业资格证照片">
                <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
                    <!--<Button type="ghost" icon="ios-cloud-upload-outline">上传业资格证照片</Button>-->
                <!--</Upload>-->
                <!--<Input v-model="employee.lastSubject" placeholder="请输入从业资格证照片"></Input>-->
                <vImgUpload :list="list"></vImgUpload>
            </FormItem>
            <FormItem prop="wordPhoto"  label="工作照片">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传工作照片</Button>
                </Upload>
                <!--<Input v-model="employee.wordPhoto" placeholder="请输入工作照片"></Input>-->
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import vImgUpload from '../../upload/imgUpload/imgUpload.vue';
    export default {
        data() {
            return {
                list: [],
                employee: {
                    deptName: '',
                    employeeNo: '',
                    name: '',
                    sex: '',
                    IDNumber: '',
                    telephone: '',
                    nation: '',
                    lastSchool: '',
                    lastSubject: '',
                    entryTime: '',
                    qualificationPic: '',
                    wordPhoto: ''
                },
                ruleInline: {
                    deptName: [
                        { required: false, message: '' }
                    ],
                    telephone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        { type: 'string', message: '请输入正确的联系方式', trigger: 'blur'}
                    ]
                }
            }
        },
        components: {vImgUpload}
    }
</script>
<style lang="scss" type="stylesheet/scss" scoped>

</style>