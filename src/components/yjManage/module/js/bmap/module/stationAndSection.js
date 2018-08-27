import {toPointList} from '../../tool';

export default class stationAndSection {
    constructor(vm, list) {
        this.stationAndSection_map = [];   // 存放百度地图 站点和区段 对象
        this.vm = vm;
        this.list = list;
    }
    // 创建站点和区间
    setStationAndSection() {
        let that = this;
        this.list.forEach((val) => {
            let mapOverlay;
            if(val.type === '0') {
                mapOverlay = new BMap.Circle(
                    toPointList(val.position)[0],
                    10,
                    {strokeColor:'#808283', fillColor: '#808283', strokeWeight: 15, fillOpacity: 0, strokeOpacity:0.4});   //创建圆
            }
            else{
                mapOverlay = new BMap.Polyline(
                    toPointList(val.position),
                    {strokeColor:'#808283', strokeWeight:10, strokeOpacity:0.4});   //创建折线
            }

            mapOverlay.itemInfo = val;
            mapOverlay.addEventListener('mouseover', function () {
                this.setStrokeOpacity(0.8);
            });
            mapOverlay.addEventListener('mouseout', function () {
                this.setStrokeOpacity(0.4);
            });

            //创建右键菜单
            if (this.vm.Auth.handleAuth('0')) {
                let lineMenu = new BMap.ContextMenu();
                lineMenu.addItem(
                    new BMap.MenuItem(
                        `设置 《${val.name}》 为故障区段`,
                        function (point, client, target) {
                            that.vm.Auth.setFault(point, client, target);
                        },
                        {width: 250}));

                mapOverlay.addContextMenu(lineMenu);
            }

            this.stationAndSection_map.push(mapOverlay);
            this.vm.map.addOverlay(mapOverlay);
        });
    }
    // 显示站点和区间
    show() {
        this.stationAndSection_map.forEach((v) => {
            v.show();
        });
    }
    // 隐藏站点和区间
    hide() {
        this.stationAndSection_map.forEach((v) => {
            v.hide();
        });
    }
}
