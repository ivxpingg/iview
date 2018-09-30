/*
* 设置公交接驳地图
 */
import {getBusPosition, getSupportBusList} from '../data';
import Util from '../../../../../../libs/util';
import {toPointList} from '../../tool';
import MOMENT from 'moment';

export default class busSupport {
    constructor(vm, faultRecordId) {
        this.busSupport_map = [];  // 存放百度地图 对象
        this.busSupport_text_map = [];   // 存放百度地图 对象 目的地名称
        this.vm = vm;
        this.faultRecordId = faultRecordId;     // 当前故障记录的id
        // this.supportBusList = supportBusList;  // 公交站牌位置信息
    }

    setBusSupport() {
        // let busPosition = [
        //     {
        //         busPositionId: '42',
        //         faultRecordId: '00001',
        //         lat: '24.568909',
        //         lon: '118.048717',
        //         plateNumber: '闽D05069D'
        //     },
        //     {
        //         busPositionId: '43',
        //         faultRecordId: '00002',
        //         lat: '24.593225',
        //         lon: '118.109945',
        //         plateNumber: '闽DZ0250'
        //     }
        // ];
        //
        // getSupportBusList(this.faultRecordId)
        //     .then((supportBustList) => {
        //         this._createBusSupport(busPosition, supportBustList);
        //     });

        getBusPosition(this.faultRecordId).then((busPosition) => {

            if (busPosition && busPosition.length > 0) {
                getSupportBusList(this.faultRecordId)
                    .then((supportBustList) => {

                        if (supportBustList && supportBustList.length > 0) {
                            this.vm.$refs.busInfo.supportBusList = supportBustList;
                            this._createBusSupport(busPosition, supportBustList);
                        }

                    });
            }


        });


    }
    _createBusSupport(datas, supportBusList) {
        this.clear();

        let myIcon,
            myOffset,
            marker,
            plateNumber,
            busPosition = '',
            direction = '',
            insTime = '',
            stationName = '',
            stopName= '',
            stopPosition = '';
        datas.forEach(val => {

            stopPosition = '';
            for(let i = 0; i < supportBusList.length; i++) {
                if (val.plateNumber === supportBusList[i].plateNumber) {
                    plateNumber = val.plateNumber;
                    insTime =  supportBusList[i].insTime;
                    busPosition = `[{lng:${val.lon},lat:${val.lat}}]`;
                    stopPosition = supportBusList[i].stopPosition || '';
                    direction = supportBusList[i].direction;
                    stopName = supportBusList[i].stopName;
                    stationName = supportBusList[i].stationName;


                    break;
                }
            }

            if (stopPosition !== '') {

                let opts = {
                    position : toPointList(busPosition)[0],    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size( -30, -30)    //设置文本偏移量
                };
                let label = new BMap.Label(plateNumber, opts);  // 创建文本标注对象
                label.setStyle({
                    paddingBottom: '3px',
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    borderWidth: 0,
                    backgroundColor: '#ed3f14',
                    color : '#fff',
                    fontSize : '12px',
                    height : '20px',
                    lineHeight : '',
                    fontFamily: '微软雅黑'
                });

                let opts_text = {
                    position : toPointList(busPosition)[0],    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size( -30, -51)    //设置文本偏移量
                };
                let label_text = new BMap.Label(`${stationName}-${direction === '0' ? '下行':'上行'}-${stopName}`, opts_text);  // 创建文本标注对象
                label_text.setStyle({
                    paddingBottom: '3px',
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    borderWidth: 0,
                    backgroundColor: '#ed3f14',
                    color : '#fff',
                    fontSize : '12px',
                    height : '20px',
                    lineHeight : '',
                    fontFamily: '微软雅黑'
                });

                this.vm.map.addOverlay(label_text);   //增加折线
                this.busSupport_text_map.push(label_text);


                myIcon = new BMap.Icon(Util.staticImgUrl + '/static/img/bus.png', new BMap.Size(40, 28));
                myIcon.setImageSize(new BMap.Size(40, 28));
                myOffset = new BMap.Size(0, 0);
                marker = new BMap.Marker(toPointList(busPosition)[0], {icon: myIcon, offset: myOffset});  // 创建标注


                // if (MOMENT().diff(MOMENT(insTime), 'minutes') <= 10) {
                //     let color = direction === '0' ? '#11a361' : '#2c9dd3';
                //     let polyline = new BMap.Polyline([
                //         toPointList(busPosition)[0],
                //         toPointList(stopPosition)[0]
                //     ], {strokeColor: color, strokeWeight: 2, strokeOpacity: 0.8});   //创建折线
                //
                //     this.vm.map.addOverlay(polyline);   //增加折线
                //     this.busSupport_map.push(polyline);
                // }



                this.vm.map.addOverlay(label);
                this.vm.map.addOverlay(marker);


                this.busSupport_map.push(label);
                this.busSupport_map.push(marker);
            }
        });

        this.show_hide();

    }

    clear() {
        this.busSupport_map.forEach((v) => {
            this.vm.map.removeOverlay(v);
        });

        this.busSupport_text_map.forEach((v) => {
            this.vm.map.removeOverlay(v);
        });

        this.busSupport_map = [];
        this.busSupport_text_map = [];
    }

    show_text() {
        this.busSupport_text_map.forEach((v) => {
            v.show();
        });
    }

    show_hide() {
        this.busSupport_text_map.forEach((v) => {
            v.hide();
        });
    }

}