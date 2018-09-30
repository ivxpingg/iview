/**
 *  设置公交接驳线路、公交站牌、承运公司信息
 */

import {toBusSectionNoString, toPointList, isPriorityStation} from '../../tool';
import {getBusSupportLineList, getBusStopPositionList} from '../data';
import Util from '../../../../../../libs/util';

export default class BusInfo {
    constructor(vueComponent) {
        this.busLine_map = { };   // 公交接驳线路
        this.busSign_map = { };   // 公交站牌

        this.vm = vueComponent;
    }
    /**
     * 设置公交信息
     * @param stationAndSectionItem  某个站点和区段信息
     */
    setBusInfo(stationAndSectionItem) {
        this._filterBusCompany(stationAndSectionItem);
        if (this.busLine_map[stationAndSectionItem.sectionNo]) {
            this.showBusLine(stationAndSectionItem.sectionNo);
            this.showBusSign(stationAndSectionItem.sectionNo);
        }
        else {
            getBusSupportLineList(toBusSectionNoString(stationAndSectionItem.effectStation))
                .then((data) => {
                    this._createBusLine(data, stationAndSectionItem);
                });

            getBusStopPositionList(stationAndSectionItem.effectStation)
                .then((data) => {
                    this.vm.busStopPositionList = data;
                    this._createBusSign(data, stationAndSectionItem);
                });
        }
    }


    _createBusLine(data, stationAndSectionItem) {
        let that = this;
        let pointList = [];
        let direction;

        this.busLine_map[stationAndSectionItem.sectionNo] = [];

        data.forEach((v) => {
            pointList = toPointList(v.supportLinePosition);
            direction = parseInt(v.sectionNo.split('-')[0]) < parseInt(v.sectionNo.split('-')[1]) ? 'up':'down';
            let polyline;
            if (direction === 'up') {
                polyline = new BMap.Polyline(pointList, {
                    strokeColor: '#11a361', strokeWeight:6, strokeOpacity:0.8});
            }
            else {
                polyline = new BMap.Polyline(pointList, {
                    strokeColor:'#2c9dd3', strokeWeight:6, strokeOpacity:0.8});
            }

            let lineMenu = new BMap.ContextMenu();
            lineMenu.addItem(new BMap.MenuItem('取消该故障区段', function () {
                that.vm.Auth.cancelFault();
            }, {width: 120}));

            lineMenu.addItem(new BMap.MenuItem('故障处置完成', function () {
                that.vm.Auth.finishFault();
            }, {width: 120}));

            lineMenu.addItem(new BMap.MenuItem('显示故障运行交路图', function () {
                that.vm.img = that.vm.stationAndSectionItem.trafficRoadMap + '.png';
                that.vm.breakImgShow = true;
            }, {width: 160}));

            polyline.addContextMenu(lineMenu);

            this.busLine_map[stationAndSectionItem.sectionNo].push(polyline);
            this.vm.map.addOverlay(polyline);   //增加折线
        });
    }

    _createBusSign(data, stationAndSectionItem) {
        this.busSign_map[stationAndSectionItem.sectionNo] = [];
        data.forEach((v) => {
            let opts,
                label,
                myIcon,
                myOffset,
                marker;
            // 上行
            if (v.direction === '0') {
                opts = {
                    position : toPointList(v.stopPosition)[0],    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size( 5, -45)    //设置文本偏移量
                };
                label = new BMap.Label(v.name, opts);  // 创建文本标注对象
                label.setStyle({
                    paddingBottom: '3px',
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    borderWidth: 0,
                    backgroundColor: '#11a361',
                    color : '#fff',
                    fontSize : '12px',
                    height : '20px',
                    lineHeight : '',
                    fontFamily: '微软雅黑'
                });

                myIcon = new BMap.Icon(Util.staticImgUrl + '/static/img/icon2.png', new BMap.Size(19,26));
                myOffset = new BMap.Size(0, -13);
                marker = new BMap.Marker(toPointList(v.stopPosition)[0], {icon:myIcon, offset: myOffset});  // 创建标注
                if (isPriorityStation(v.stationId, stationAndSectionItem.priorityStation, stationAndSectionItem.effectStation, v.direction)) {
                    label.colss = 1;
                    setInterval(function () {
                        if (label.colss === 1) {
                            label.colss = 2;
                            label.setStyle({
                                backgroundColor: '#4ccf5f'
                            });
                        }
                        else {
                            label.colss = 1;
                            label.setStyle({
                                backgroundColor: '#11a361'
                            });
                        }
                    }, 800);
                }
            }
            else {
                opts = {
                    position : toPointList(v.stopPosition)[0],    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size(-v.name.length * 12, -45)    //设置文本偏移量
                };
                label = new BMap.Label(v.name, opts);  // 创建文本标注对象
                label.setStyle({
                    paddingBottom: '3px',
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    borderWidth: 0,
                    backgroundColor: '#2c9dd3',
                    color : '#fff',
                    fontSize : '12px',
                    height : '20px',
                    lineHeight : '',
                    fontFamily: '微软雅黑'
                });

                myIcon = new BMap.Icon(Util.staticImgUrl + '/static/img/icon1.png', new BMap.Size(19,26));
                myOffset = new BMap.Size(-5, -13);
                marker = new BMap.Marker(toPointList(v.stopPosition)[0], {icon:myIcon, offset: myOffset});  // 创建标注

                if (isPriorityStation(v.stationId, stationAndSectionItem.priorityStation, stationAndSectionItem.effectStation, v.direction)) {
                    label.colss = 1;
                    setInterval(function () {
                        if (label.colss === 1) {
                            label.colss = 2;
                            label.setStyle({
                                backgroundColor: '#63d9f2'
                            });
                        }
                        else {
                            label.colss = 1;
                            label.setStyle({
                                backgroundColor: '#2c9dd3'
                            });
                        }
                    }, 800);
                }
            }

            this.busSign_map[stationAndSectionItem.sectionNo].push(label);
            this.busSign_map[stationAndSectionItem.sectionNo].push(marker);
            this.vm.map.addOverlay(label);
            this.vm.map.addOverlay(marker);

        });
    }

    _filterBusCompany(stationAndSectionItem) {
        let effectStation = stationAndSectionItem.effectStation.split(',');
        this.vm.busCompanys = [];
        this.vm.busCompanyInfo.forEach((v) => {
            let ids = v.responsibleStation.split(',');
            for (let i = 0; i < effectStation.length; i++) {
                if(ids.indexOf(effectStation[i]) > -1) {
                    this.vm.busCompanys.push(v);
                    break;
                }
            }

        });
    }

    /**
     * 显示公交线路
     * @param sectionNo
     */
    showBusLine(sectionNo) {
        this.busLine_map[sectionNo].forEach((v) => {
            v.show();
        });
    }
    /**
     * 隐藏公交线路
     * @param sectionNo
     */
    hideBusLine(sectionNo) {
        this.busLine_map[sectionNo].forEach((v) => {
            v.hide();
        });
    }

    /**
     * 显示公交站牌
     * @param sectionNo
     */
    showBusSign(sectionNo) {
        this.busSign_map[sectionNo].forEach((v) => {
            v.show();
        });
    }
    /**
     * 隐藏公交站牌
     * @param sectionNo
     */
    hideBusSign(sectionNo) {
        this.busSign_map[sectionNo].forEach((v) => {
            v.hide();
        });
    }

    hideBusCompany() {
        this.vm.busCompanys = [];
    }
}