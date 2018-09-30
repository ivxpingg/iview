<template>
    <div class="busInfo-container">
        <div class="title">接驳公交信息</div>
        <div class="search">
            <Input v-model="searchValue" placeholder="输入公交车牌检索"
                   @on-focus="onfocus_search" @on-blur="onblur_search">
                <!--<Button slot="append" icon="ios-search"></Button>-->
            </Input>
        </div>
        <div class="search-bus-panel" v-show="searchBox">
            <div v-for="(item, idx) in busList" :key="`${item.busCompanyId}-${item.plateNumber}`" @click="onClick_bus($event,item)">
                <span>{{item.plateNumber}}</span>
                <span>({{item.companyName}})</span>
            </div>
        </div>
        <div class="bus-conn" v-show="!searchBox">
            <div class="item" v-for="item in supportBusList"
                 :key="item.supportBusId">
                <span :style="{ color: item.direction === '0' ? '#11a361' : '#2c9dd3'}">{{item.plateNumber}}</span>
                <span :style="{ color: item.direction === '0' ? '#11a361' : '#2c9dd3'}">({{item.stationName}}-{{item.direction === '0' ? '上行' : '下行'}}-{{item.stopName}})</span>
                <div class="icon" @click="onClick_del(item)">
                    <Icon type="ios-trash"></Icon>
                </div>
            </div>

        </div>
        <slot></slot>
        <Modal v-model="modal_selectStation"
               title="选择目的地"
               :width="330"
               transfer>
            <Form inline
                  ref="form"
                  :model="busInfo"
                  :rules="rules"
                  :label-width="120">
                <FormItem :label="`${busInfo.plateNumber} 开往:`" prop="busStopPositionId">
                    <Select v-model="busInfo.busStopPositionId" style="width: 180px">
                        <Option v-for="item in busStopPositionList"
                                :key="item.busStopPositionId"
                                :value="item.busStopPositionId"
                                :label="`${item.stationName}-${item.direction === '0' ? '上行' : '下行'}-${item.name}`"></Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary"
                        size="large"
                        @click="save_bus_destination">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Util from '../../../../libs/util';
    export default {
        name: 'busInfo',
        props: {
            busStopPositionList: {
                type: Array,
                default() {
                    return [];
                    // busStopPositionId: "18"
                    // direction: "0"
                    // name: "2号口"
                    // stationId: "18"
                    // stopPosition: "[{lng:118.065861,lat:24.598596}]"
                }
            },
            faultRecordId: {
                type: String,
                default: ''
            }
        },
        watch: {
            faultRecordId: {
                immediate: true,
                handler(val) {
                    this.busInfo.faultRecordId = val;
                    if (val !== '') {
                        this.getSupportBusList();
                    }
                }
            }
        },
        computed: {
            // 过滤掉已经设置的公交车牌和模糊查询
            busList() {
                return this.busInfoList.filter((val) => {
                    for (let i = 0; i < this.supportBusList.length; i++) {
                        if (this.supportBusList[i].plateNumber === val.plateNumber) {
                            return false;
                        }
                    }
                    return val.plateNumber.indexOf(this.searchValue) > -1;
                });
            }
        },
        data() {
            return {
                searchValue: '',
                busInfoList: [],

                supportBusList: [],

                // 搜索框
                searchBox: false,

                // 位置
                modal_selectStation: false,
                busInfo: {
                    busCompanyId: '',
                    plateNumber: '',
                    busStopPositionId: '',
                    faultRecordId: ''
                },
                rules: {
                    busStopPositionId: [{ required: true, message: '目的地不能为空！', trigger: 'blur' }]
                }

            };
        },
        mounted() {
            this.getBusInfoList();
        },
        methods: {
            getBusInfoList() {
                var that = this;
                Util.ajax({
                    method: 'get',
                    url: '/xm/emerg/busSupport/busInfoList',
                }).then(function (response) {
                    that.busInfoList = response.result || [];
                });
            },
            // 接驳公交列表
            getSupportBusList() {
                var that = this;
                if (that.faultRecordId !== '') {
                    Util.ajax({
                        method: 'get',
                        url: '/xm/emerg/busSupport/supportBusList',
                        params: {
                            faultRecordId: that.faultRecordId
                        }
                    }).then(function (response) {
                        that.supportBusList = response.result || [];
                    });
                }
            },
            onfocus_search() {
                this.searchBox = true;
            },
            onblur_search() {
                setTimeout(() => {
                    this.searchBox = false;
                }, 200);
            },
            onClick_bus(e, item) {
                this.busInfo.busCompanyId = item.busCompanyId;
                this.busInfo.plateNumber = item.plateNumber;
                this.modal_selectStation = true;
            },
            save_bus_destination() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        Util.ajax({
                            method: 'post',
                            url: '/xm/emerg/busSupport/saveSupportBus',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            data: JSON.stringify(this.busInfo)
                        }).then(res => {
                            if(res.status === 1) {
                                this.modal_selectStation = false;
                                this.getSupportBusList();
                                this.$parent.busSupport.setBusSupport();
                            }
                        });
                    }
                    else {
                        return false;
                    }
                });
            },
            // 删除已设置的公交车目的地
            onClick_del(item) {
                this.$Modal.confirm({
                    title: '移除',
                    content: `确定要移除<${item.plateNumber}>？`,
                    onOk: () => {
                        Util.ajax({
                            method: 'get',
                            url: '/xm/emerg/busSupport/deleteSupportBus',
                            params: {
                                supportBusId: item.supportBusId
                            }
                        }).then(res => {
                            if(res.status === 1) {
                                this.$Message.success({
                                    content: '删除成功！'
                                });
                                this.getSupportBusList();
                                this.$parent.busSupport.setBusSupport();
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .busInfo-container {
        position: relative;
        .title {
            /*position: absolute;*/
            /*top: 10px;*/
            /*left: 0;*/
            line-height: 40px;
            width: 100%;
            font-size: 16px;
            font-weight: 700;
            /*line-height: 20px;*/
            text-align: center;
            z-index: 10;
        }

        .search {

        }

        .search-bus-panel {
            padding-top: 10px;
            height: 300px;
            overflow-y: auto;
            background-color: #FFF;
            > div {
                line-height: normal;
                padding: 7px 16px;
                clear: both;
                color: #495060;
                font-size: 13px!important;
                white-space: nowrap;
                list-style: none;
                cursor: pointer;
                transition: background .2s ease-in-out;

                &:hover {
                    background: #f3f3f3;
                }
            }
        }

        .bus-conn {
            padding-top: 10px;
            height: 300px;
            overflow-y: auto;
            background-color: #FFF;
            .item {
                position: relative;
                line-height: normal;
                padding: 7px 16px;
                clear: both;
                color: #495060;
                font-size: 13px!important;
                white-space: nowrap;
                list-style: none;
                cursor: pointer;
                transition: background .2s ease-in-out;

                &:nth-child(2n) {
                    background: #f3f3f3;
                }

                .icon {
                    position: absolute;
                    top: 3px;
                    right: 10px;
                    font-size: 16px;
                    cursor: pointer;

                    &:hover {
                        color: #5cadff;
                    }
                }
            }
        }
    }


</style>