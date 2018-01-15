<template>
    <div class="searchPanel-container">
        <Form inline :label-width="90">
            <FormItem label="查询时间段:">
                <DatePicker type="daterange" :format="format" :value="dates" @on-change="onDatePickerChange"  placeholder="选择日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="统计维度:">
                <Select :value="dim" @on-change="onSelectDimChange">
                    <Option value="day">日</Option>
                    <Option value="week">周</Option>
                    <Option value="month">月</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="success">查询</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                format: 'yyyy-MM'
            }
        },
        props: {
            dates: {
                type: Array,
                default() {
                    return [];
                }
            },
            dim: {
                type: String,
                default() {
                    return 'day';
                }
            }
        },
        methods: {
            onSelectDimChange(value) {
                switch (value) {
                    case 'day': this.format = 'yyyy-MM-dd'; break;
                    case 'week':
                    case 'month': this.format = 'yyyy-MM'; break;
                }
            },
            onDatePickerChange(date) {
                this.$emit('changeDate' , date)
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .searchPanel-container {
        height: 44px;
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .searchPanel-container {
        .ivu-form-item {
            margin-bottom: 0;
        }

        .ivu-form .ivu-form-item-label {
            font-size: 14px;
        }
    }

</style>