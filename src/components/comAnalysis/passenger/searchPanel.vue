<template>
    <div class="searchPanel-container">
        <Form class="form" inline  :label-width="90">
            <FormItem label="统计维度:":label-width="75">
                <Select v-model="myDim" @on-change="onSelectDimChange">
                    <Option value="day">日</Option>
                    <Option value="week">周</Option>
                    <Option value="month">月</Option>
                    <Option value="year">年</Option>
                </Select>
            </FormItem>
            <FormItem label="查询时间段:"  :label-width="95" style="margin-right: 3px;">
                <DatePicker v-if="dim=='day'" type="date" :format="day.format" v-model="day.startTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeStart"  placeholder="开始时间" style="width: 110px"></DatePicker>
                <DatePicker v-else-if="dim=='week'" type="date" :format="week.format" v-model="week.startTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeStart"  placeholder="开始时间" style="width: 110px"></DatePicker>
                <DatePicker v-else-if="dim=='month'" type="month" :format="month.format" v-model="month.startTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeStart"  placeholder="开始时间" style="width: 100px"></DatePicker>
                <DatePicker v-else-if="dim=='year'" type="year" :format="year.format" v-model="year.startTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeStart"  placeholder="开始时间" style="width: 110px"></DatePicker>
            </FormItem>
            <FormItem label="-" :label-width="12">
                <DatePicker v-if="dim=='day'" type="date" :format="day.format" v-model="day.endTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeEnd"  placeholder="结束时间" style="width: 110px"></DatePicker>
                <DatePicker v-else-if="dim=='week'" type="date" :format="week.format" v-model="week.endTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeEnd"  placeholder="结束时间" style="width: 110px"></DatePicker>
                <DatePicker v-else-if="dim=='month'" type="month" :format="month.format" v-model="month.endTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeEnd"  placeholder="结束时间" style="width: 110px"></DatePicker>
                <DatePicker v-else-if="dim=='year'" type="year" :format="year.format" v-model="year.endTime" :editable="false" :clearable="false" @on-change="onDatePickerChangeEnd"  placeholder="结束时间" style="width: 110px"></DatePicker>
            </FormItem>
            <FormItem label="有效时段:" :label-width="80">
                <Select v-model="myTimeFrame" @on-change="onSelectTimeFrameChange">
                    <Option value="allDay">全日</Option>
                    <Option value="earlyPeak">早高峰</Option>
                    <Option value="latePeak">晚高峰</Option>
                </Select>
            </FormItem>

            <FormItem :label-width="10">
                <Button type="success" @click="onSearch">查询</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import MOMENT from 'moment';
    export default {
        data() {
            return {
                myTimeFrame: 'allDay',
                myDim: 'day',
                day: {
                    format: 'yyyy-MM-dd',
                    startTime: '',
                    endTime: ''
                },
                week: {
                    format: 'yyyy-MM-dd',
                    startTime: new Date(),
                    endTime: new Date()
                },
                month: {
                    format: 'yyyy-MM',
                    startTime: new Date(),
                    endTime: new Date()
                },
                year: {
                    format: 'yyyy',
                    startTime: new Date(),
                    endTime: new Date()
                }
            }
        },
        props: {
            dates: {
                type: Array,
                default() {
                    return [MOMENT().subtract(9, 'days').format('YYYY-MM-DD'), MOMENT().format('YYYY-MM-DD')];
                }
            },
            dim: {
                type: String,
                default() {
                    return 'day';
                }
            },
            timeFrame: {
                type: String,
                default() {
                    return 'allDay';
                }
            }
        },
        created() {
            this.myDim = this.dim;
            this.myTimeFrame = this.timeFrame;
            switch (this.dim) {
                case 'day':
                    this.day.startTime = MOMENT(this.dates[0])._d;
                    this.day.endTime =  MOMENT(this.dates[1])._d;
                    break;
                case 'week':
                    this.week.startTime = MOMENT(this.dates[0])._d;
                    this.week.endTime =  MOMENT(this.dates[1])._d;
                    break;
                case 'month':
                    this.month.startTime = MOMENT(this.dates[0])._d;
                    this.month.endTime =  MOMENT(this.dates[1])._d;
                    break;
                case 'year':
                    this.year.startTime = MOMENT(this.dates[0])._d;
                    this.year.endTime =  MOMENT(this.dates[1])._d;
                    break;
            }
        },
        watch: {
            myDim(val, oldVal) {
                var reDate = [];
                switch(val) {
                    case 'day':
                        this.day.startTime = MOMENT().subtract(9, 'days')._d;
                        this.day.endTime =  MOMENT()._d;

                        reDate = [MOMENT(this.day.startTime).format('YYYY-MM-DD'), MOMENT(this.day.endTime).format('YYYY-MM-DD')];
                        break;
                    case 'week':
                        this.week.startTime = MOMENT().startOf('isoWeek').subtract(4, 'weeks')._d;
                        this.week.endTime =  MOMENT().startOf('isoWeek').add(6, 'days')._d;
                        reDate = [MOMENT(this.week.startTime).format('YYYY-MM-DD'), MOMENT(this.week.endTime).format('YYYY-MM-DD')];
                        break;
                    case 'month':
                        this.month.startTime = MOMENT().subtract(5, 'month')._d;
                        this.month.endTime =  MOMENT()._d;
                        reDate = [MOMENT(this.month.startTime).format('YYYY-MM'), MOMENT(this.month.endTime).format('YYYY-MM')];
                        break;
                    case 'year':
                        this.year.startTime = MOMENT('2017')._d;
                        this.year.endTime =  MOMENT()._d;
                        reDate = [MOMENT(this.year.startTime).format('YYYY'), MOMENT(this.year.endTime).format('YYYY')];
                        break;
                }

                 this.$emit('changeDate' , reDate);
            }
        },
        methods: {
            onSelectTimeFrameChange() {
                this.$emit('changeTimeFrame' , this.myTimeFrame);
            },
            onSelectDimChange() {
                this.$emit('changeDim' , this.myDim);
            },
            onDatePickerChangeStart(date) {
                var reDate = [];

                switch (this.dim) {
                    case 'day':
                        reDate = [date, MOMENT(this.day.endTime).format('YYYY-MM-DD')];
                        break;
                    case 'week':
                        this.week.startTime = MOMENT(date).startOf('isoWeek')._d;
                        reDate = [MOMENT(date).startOf('isoWeek').format('YYYY-MM-DD'), MOMENT(this.week.endTime).format('YYYY-MM-DD')];
                        break;
                    case 'month':
                        reDate = [date, MOMENT(this.month.endTime).format('YYYY-MM')];
                        break;
                    case 'year':
                        reDate = [date, MOMENT(this.year.endTime).format('YYYY')];
                        break;
                }
                this.$emit('changeDate' , reDate);
            },
            onDatePickerChangeEnd(date) {
                var reDate = [];
                switch (this.dim) {
                    case 'day':
                        reDate = [MOMENT(this.day.startTime).format('YYYY-MM-DD'), date];
                        break;
                    case 'week':
                        this.week.endTime = MOMENT(date).startOf('isoWeek').add(6, 'days')._d;
                        reDate = [MOMENT(this.week.startTime).format('YYYY-MM-DD'),MOMENT(date).startOf('isoWeek').add(6, 'days').format('YYYY-MM-DD')];
                        break;
                    case 'month':
                        reDate = [MOMENT(this.month.startTime).format('YYYY-MM'), date];
                        break;
                    case 'year':
                        reDate = [MOMENT(this.year.startTime).format('YYYY'), date];
                        break;
                }
                this.$emit('changeDate' , reDate);
            },

            onSearch() {
//                var reDate = [];
//
//                switch (this.dim) {
//                    case 'day':
//                        reDate = [MOMENT(this.day.startTime).format('YYYY-MM-DD'), MOMENT(this.day.endTime).format('YYYY-MM-DD')];
//                        break;
//                    case 'week':
//                        reDate = [MOMENT(this.week.startTime).format('YYYY-MM-DD'), MOMENT(this.week.endTime).format('YYYY-MM-DD')];
//                        break;
//                    case 'month':
//                        reDate = [MOMENT(this.month.startTime).format('YYYY-MM'), MOMENT(this.month.endTime).format('YYYY-MM')];
//                        break;
//                    case 'year':
//                        reDate = [MOMENT(this.year.startTime).format('YYYY'), MOMENT(this.year.endTime).format('YYYY')];
//                        break;
//                }
//                this.$emit('changeDate' , this.myDim, this.myTimeFrame);
                this.$emit('search');
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .searchPanel-container {
        padding-top: 10px;
        height: 54px;
        .form {
            margin-top: 3px;
        }
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