import {getInterruptSectionList} from '../data';
import {toSectionNoString, toPointList} from '../../tool';
export default class BreakLine {
    constructor(vueComponent) {

        /**
         *  存放故障中断线路 百度地图对象
         *  PS {
         *        'sectionNo':  'polyline'
         *     }
         * @type {{}}
         */
        this.break_map = { };
        this.vm = vueComponent;
    }

    /**
     * 设置中断线路
     * @param stationAndSectionItem  某个站点和区段信息
     */
    setBreakLine(stationAndSectionItem) {
        if (this.break_map[stationAndSectionItem.sectionNo]) {
            this.show(stationAndSectionItem.sectionNo);
        }
        else {
            getInterruptSectionList(toSectionNoString(stationAndSectionItem.effectStation))
                .then((data) => {
                    this._createBreakLine(data, stationAndSectionItem);
                });
        }
    }

    /**
     * 创建中断线路
     * @param data
     * @private
     */
    _createBreakLine(data, stationAndSectionItem) {
        let that = this;
        let aSectionNo = toSectionNoString(stationAndSectionItem.effectStation).split(',');
        let oData = {},
            pointList = [];
        data.forEach((v) => {
            oData[v.sectionNo] = v.interruptSectionPosition;
        });

        aSectionNo.forEach((v) => {
            pointList = toPointList(oData[v]).concat(pointList);
        });
        let polyline = new BMap.Polyline(pointList, {strokeColor:'#f99191', strokeWeight:8, strokeOpacity:1});

        let lineMenu = new BMap.ContextMenu();

        if (this.vm.Auth.handleAuth('1')) {
            lineMenu.addItem(new BMap.MenuItem('取消该故障区段', function () {
                that.vm.Auth.cancelFault();
            }, {width: 120}));

            lineMenu.addItem(new BMap.MenuItem('故障处置完成', function () {
                that.vm.Auth.finishFault();
            }, {width: 120}));
        }

        lineMenu.addItem(new BMap.MenuItem('显示故障运行交路图', function () {
            that.vm.img = that.vm.stationAndSectionItem.trafficRoadMap + '.png';
            that.vm.breakImgShow = true;
        }, {width: 160}));

        polyline.addContextMenu(lineMenu);

        this.break_map[stationAndSectionItem.sectionNo] = polyline;
        this.vm.map.addOverlay(polyline);
    }

    /**
     * 显示中断线路
     * @param sectionNo
     */
    show(sectionNo) {
        this.break_map[sectionNo].show();
    }
    /**
     * 隐藏中断线路
     * @param sectionNo
     */
    hide(sectionNo) {
        this.break_map[sectionNo].hide();
    }
}