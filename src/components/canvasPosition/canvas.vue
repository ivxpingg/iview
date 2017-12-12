<template>
    <div ref="canvasBox" class="canvasBox" :class="fullScreen ? 'fullScreenBox': ''">
        <div id="canvas" style="border: 0 solid #000; width: 3000px; height: 1500px;"></div>
        <i class="ivu-icon icon-fullScreen"
           :class="fullScreen ? 'ivu-icon-android-contract' : 'ivu-icon-android-expand'"
           :title="fullScreen ? '退出全屏' : '全屏'"
           @click="switchFullScreen"></i>

        <div class="position-box">
            <div>x: {{x}}</div>
            <div>y: {{y}}</div>
        </div>



        <div class="run-data-box">
            <Form :model="upSection" label-position="left" :label-width="100">

                <FormItem label="线路切换:">
                    <Select v-model="switchLine" placeholder="区段名称">
                        <Option value="0">上行线</Option>
                        <Option value="1">下行线</Option>
                    </Select>
                </FormItem>

                <template v-if="switchLine == '0'">
                    <FormItem label="区段名字:">
                        <Select v-model="upSectionIdx" placeholder="区段名称">
                            <Option v-for="(val, idx) in upData" :value="idx">{{val.section_name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="站点编号:">
                        <Input v-model="upSection.station_Id"></Input>
                    </FormItem>
                    <FormItem label="站点名称:">
                        <Input v-model="upStation_name"></Input>
                    </FormItem>
                    <FormItem label="区段编号">
                        <Input v-model="upSection.section_Id"></Input>
                    </FormItem>
                    <FormItem label="线路X坐标：">
                        <Input v-model="upSection.section_point.x"></Input>
                    </FormItem>
                    <FormItem label="线路Y坐标：">
                        <Input v-model="upSection.section_point.y"></Input>
                    </FormItem>
                    <FormItem label="文本X坐标：">
                        <Input v-model="upSection.text_point.x"></Input>
                    </FormItem>
                    <FormItem label="文本Y坐标：">
                        <Input v-model="upSection.text_point.y"></Input>
                    </FormItem>
                    <FormItem label="是否是站点：">
                        <i-switch v-model="upSection.is_station" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="是否是拐角处：">
                        <i-switch v-model="upSection.is_corner" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="运行时间(毫秒):">
                        <Input v-model="upSection.run_time"></Input>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="success" @click="btnSave" long>保存</Button>
                    </FormItem>
                </template>
                <template v-else>
                    <FormItem label="区段名字:">
                        <Select v-model="downSectionIdx" placeholder="区段名称">
                            <Option v-for="(val, idx) in downData" :value="idx">{{val.section_name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="站点编号:">
                        <Input v-model="downSection.station_Id"></Input>
                    </FormItem>
                    <FormItem label="站点名称:">
                        <Input v-model="downStation_name"></Input>
                    </FormItem>
                    <FormItem label="区段编号">
                        <Input v-model="downSection.section_Id"></Input>
                    </FormItem>
                    <FormItem label="线路X坐标：">
                        <Input v-model="downSection.section_point.x"></Input>
                    </FormItem>
                    <FormItem label="线路Y坐标：">
                        <Input v-model="downSection.section_point.y"></Input>
                    </FormItem>
                    <FormItem label="文本X坐标：">
                        <Input v-model="downSection.text_point.x"></Input>
                    </FormItem>
                    <FormItem label="文本Y坐标：">
                        <Input v-model="downSection.text_point.y"></Input>
                    </FormItem>
                    <FormItem label="是否是站点：">
                        <i-switch v-model="downSection.is_station" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="是否是拐角处：">
                        <i-switch v-model="downSection.is_corner" size="large">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="运行时间(毫秒):">
                        <Input v-model="downSection.run_time"></Input>
                    </FormItem>
                    <FormItem label="操作">
                        <Button type="success" @click="btnSave" long>保存</Button>
                    </FormItem>
                </template>
            </Form>
        </div>

    </div>
</template>

<script>
    import data from './js/baseData';
    import metro_main from './js/main';
    import carPosition from './js/carPosition';

    export default {
        data() {
            return {
                zr: null,
                fullScreen: false,
                scale: 1,    // canvas 被缩放的比例 默认1
                parentDom: null,
                x: 0,
                y: 0,

                switchLine: '0',  // 切换上行线和下行线
                upData: [],       // 上行线数据
                downData: [],     // 下行线数据

                shapeList: [],    // zreder对象数组

                upSectionIdx: -1,   // 选择区段名称的索引值
                downSectionIdx: -1,   // 选择区段名称的索引值
                upStation_name: '',  // 区段对应的站点名称
                downStation_name: '',
                upSection: {       // 临时存放当前选的区段具体信息
                    section_name: '',
                    station_Id: '',
                    section_Id: '',
                    section_point: {
                        x: 0,
                        y: 0
                    },
                    text_point: {
                        x: 0,
                        y: 0
                    },
                    is_station: true,
                    is_corner: false,
                    run_time: 0
                },
                downSection: {
                    section_name: '',
                    station_Id: '',
                    section_Id: '',
                    section_point: {
                        x: 0,
                        y: 0
                    },
                    text_point: {
                        x: 0,
                        y: 0
                    },
                    is_station: true,
                    is_corner: false,
                    run_time: 0
                }
            };
        },
        mounted () {
            var that = this;
            this.browserFullInit();
            metro_main(that);

            this.upData = data.up_line;
            this.downData = data.down_line;
            this.upSectionIdx = 0;
            this.downSectionIdx = 0;
            
            document.querySelector('#canvas').onmouseup = function (e) {
                that.x = e.offsetX;
                that.y = e.offsetY;
            }

        },
        watch: {
            upSection: {
                handler: function (val, oldVal) {
                    this.upStation_name = !!data.station_info[this.upSection.station_Id] ? data.station_info[this.upSection.station_Id].name : '';
                },
                deep: true
            },
            downSection: {
                handler: function (val, oldVal) {
                    this.downStation_name = !!data.station_info[this.downSection.station_Id] ? data.station_info[this.downSection.station_Id].name : '';
                },
                deep: true
            },
            upSectionIdx: function (val, oldVal) {
                this.upSection.section_name = this.upData[val].section_name;
                this.upSection.station_Id = this.upData[val].section_name.slice(this.upData[val].section_name.length - 4,this.upData[val].section_name.length - 2);//this.upData[val].station_Id || '';
                this.upSection.section_Id = this.upData[val].section_name.slice(this.upData[val].section_name.length - 2);//this.upData[val].section_Id || '';
                this.upSection.section_point.x = this.upData[val].section_point ? parseFloat(this.upData[val].section_point.x) :400;
                this.upSection.section_point.y = this.upData[val].section_point ? parseFloat(this.upData[val].section_point.y) : 400;
                this.upSection.text_point.x = this.upData[val].text_point ? parseFloat(this.upData[val].text_point.x) : 400;
                this.upSection.text_point.y = this.upData[val].text_point ? parseFloat(this.upData[val].text_point.y) : 400;
                this.upSection.is_station = this.upData[val].is_station || false;
                this.upSection.is_corner = this.upData[val].is_corner || false;
                this.upSection.run_time = parseFloat(this.upData[val].run_time || 3000);

                this.upStation_name = this.upSection.station_Id == '' ? '' : data.station_info[this.upSection.station_Id].name;

                this.trainPosition();
            },
            downSectionIdx: function (val, oldVal) {

                this.downSection.section_name = this.downData[val].section_name;
                this.downSection.station_Id = this.downData[val].section_name.slice(this.downData[val].section_name.length - 4,this.downData[val].section_name.length - 2);;
                this.downSection.section_Id = this.downData[val].section_name.slice(this.downData[val].section_name.length - 2);
                this.downSection.section_point.x = this.downData[val].section_point ? parseFloat(this.downData[val].section_point.x) : 400;
                this.downSection.section_point.y = this.downData[val].section_point ? parseFloat(this.downData[val].section_point.y) : 400;
                this.downSection.text_point.x = this.downData[val].text_point ? parseFloat(this.downData[val].text_point.x) : 400;
                this.downSection.text_point.y = this.downData[val].text_point ? parseFloat(this.downData[val].text_point.y) : 400;
                this.downSection.is_station = this.downData[val].is_station || false;
                this.downSection.is_corner = this.downData[val].is_corner || false;
                this.downSection.run_time = parseFloat(this.downData[val].run_time || 3000);

                this.downStation_name = this.downSection.station_Id == '' ? '' : data.station_info[this.downSection.station_Id].name;

                this.trainPosition();
            },
            switchLine: function (val, oldVal) {

                this.trainPosition();
            }
        },
        methods: {
            /**
             * 浏览器全屏设置
             */
            browserFullInit() {
                document.addEventListener("fullscreenchange", function () {

                    fullscreenState.innerHTML = (document.fullscreen) ? "" : "not ";
                }, false);

                document.addEventListener("mozfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.mozFullScreen) ? "" : "not ";
                }, false);



                document.addEventListener("webkitfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.webkitIsFullScreen) ? "" : "not ";
                }, false);

                document.addEventListener("msfullscreenchange", function () {

                    fullscreenState.innerHTML = (document.msFullscreenElement) ? "" : "not ";
                }, false);
            },
            switchFullScreen () {
                this.fullScreen = !this.fullScreen;
                if (this.fullScreen) {
                    document.body.appendChild(this.$el);

                    var docElm = document.documentElement;
                    //W3C
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    }
                    //FireFox
                    else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    }
                    //Chrome等
                    else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    }
                    //IE11
                    else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                } else {
                    this.parentDom.appendChild(this.$el);
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    }
                    else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                    else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }

                // this.$store.commit('setCancelScroll', this.fullScreen);
            },

            trainPosition() {
                var that = this;
                this.clearZr();

                if (this.switchLine == '0') {
                    this.shapeList = carPosition(that,that.zr, that.upSection);
                }
                else {
                    this.shapeList = carPosition(that,that.zr, that.downSection);
                }
            },
            clearZr() {
                for(var i = 0; i < this.shapeList.length; i++) {
                    this.zr.remove(this.shapeList[i]);
                }
            },

            btnSave() {
                if (this.switchLine == '0') {
                    this.upData[this.upSectionIdx].section_name = this.upSection.section_name;
                    this.upData[this.upSectionIdx].station_Id = this.upSection.station_Id;
                    this.upData[this.upSectionIdx].section_Id = this.upSection.section_Id;
                    this.upData[this.upSectionIdx].section_point = {};
                    this.upData[this.upSectionIdx].section_point.x = parseFloat(this.upSection.section_point.x);
                    this.upData[this.upSectionIdx].section_point.y = parseFloat(this.upSection.section_point.y);
                    this.upData[this.upSectionIdx].text_point = {};
                    this.upData[this.upSectionIdx].text_point.x = parseFloat(this.upSection.text_point.x);
                    this.upData[this.upSectionIdx].text_point.y = parseFloat(this.upSection.text_point.y);
                    this.upData[this.upSectionIdx].is_station = this.upSection.is_station;
                    this.upData[this.upSectionIdx].is_corner = this.upSection.is_corner;
                    this.upData[this.upSectionIdx].run_time = parseFloat(this.upSection.run_time);

                    console.log(JSON.stringify(this.upData));
                }
                else {
                    this.downData[this.downSectionIdx].section_name = this.downSection.section_name;
                    this.downData[this.downSectionIdx].station_Id = this.downSection.station_Id;
                    this.downData[this.downSectionIdx].section_Id = this.downSection.section_Id;
                    this.downData[this.downSectionIdx].section_point = {};
                    this.downData[this.downSectionIdx].section_point.x = parseFloat(this.downSection.section_point.x);
                    this.downData[this.downSectionIdx].section_point.y = parseFloat(this.downSection.section_point.y);
                    this.downData[this.downSectionIdx].text_point = {};
                    this.downData[this.downSectionIdx].text_point.x = parseFloat(this.downSection.text_point.x);
                    this.downData[this.downSectionIdx].text_point.y = parseFloat(this.downSection.text_point.y);
                    this.downData[this.downSectionIdx].is_station = this.downSection.is_station;
                    this.downData[this.downSectionIdx].is_corner = this.downSection.is_corner;
                    this.downData[this.downSectionIdx].run_time = parseFloat(this.downSection.run_time);

                    console.log(JSON.stringify(this.downData));
                }

                this.trainPosition();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss"  scoped>
    * { margin: 0; padding: 0;}

    html, body {
        width: 100%;
        height: 100%;
    }
    .canvasBox {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #4d4d4c;

        .d-popup {
            position: absolute;
            display: none;
            top: 0;
            left: 0;
            border: 1px solid #5b6270;
            padding: 10px;
            background-color: #FFF;

            &.popupShow {
                display: block;
            }
        }

        .icon-fullScreen {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            padding: 8px 12px;
            background-color: rgba(0,0,0,.6);
            color: #FFF;
            border-radius: 4px;
            &:hover {
                background-color: rgba(0,0,0,.7);
            }
        }
    }

    .fullScreenBox {
        position: fixed;
        z-index: 10000;
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('./images/xm_map_bg.jpg');
        background-repeat: no-repeat;
        /*background-position: -900px -1400px;*/
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        transform:scale(1);
        transform-origin: 0 0;
    }

    .position-box {
        position: fixed;
        top: 0;
        left: 48%;
        padding: 20px;
        font-size: 20px;
        background: green;
        color: #FFF;
        overflow: hidden;
    }

    .run-data-box {
        position: fixed;
        padding: 15px;
        top: 0;
        left: 0;
        height: 100%;
        width: 300px;
        background: cornflowerblue;
        color: #FFF;
        font-size: 16px;
    }
</style>