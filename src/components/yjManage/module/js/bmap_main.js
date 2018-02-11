import bdata from './bdData';

var vm = null; //vue对象
var map = null;

/**
 *  百度地图元素 存放可选择的故障站点和故障区段
 * @type {{Object}}
 * { line1: obj, line2: obj ...}
 */
var map_dom_malfunction_list = {};

/**
 * 存放每个故障站点和区段对应的公交接驳线路、接驳地点和地铁故障涉及的范围路段
 * @type {{Object}}
 * { line1: { ... }, line2: { ... }, ... }
 */
var map_dom_line_list = {};

// 当前显示的故障站点和区段对应的公交接驳线路、接驳地点和地铁故障涉及的范围路段的 key
var currentShowLineKey = '';

var mouserOverKey = '';

/**
 * 初始化地图
 */
var initMap = function (domId, timer) {
    map = new BMap.Map(domId, {enableMapClick:false, minZoom:12,maxZoom:17});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    clearInterval(timer);
    init();
}

/**
 * 初始化地图后主入口
 */
var init = function () {
    //renderMainLine();

    setLineEvent();

    // setLine();
}

/**
 * 设置每个故障站点和区段对应的公交接驳线路、接驳地点和地铁故障涉及的范围路段
 * @param key {String}   Ps:  line1
 */
var setLine = function (key) {

    if (key == currentShowLineKey) { return; }

    if (currentShowLineKey != '') {
        map_dom_line_list[currentShowLineKey].forEach(function (val) {
            val.hide();
        });
    }

    currentShowLineKey = key;

    vm.busInfo = [];
    bdata.mapPoint[key].depart.forEach(function (val) {
        vm.busInfo.push(bdata.busInfo[val]);
    });

    if (map_dom_line_list[key]) {

        map_dom_line_list[key].forEach(function (val) {
            val.show();
        });

        return;
    }

    var pointList = [];

    var pointList1 = [];

    var pointList2 = [];
    bdata.mapPoint[key].center.forEach(function (val) {
        pointList.push(new BMap.Point(val.lng, val.lat));
        if (bdata.mapPoint[key].up.length == 0) {
            pointList1.push(new BMap.Point(val.lng, val.lat + 0.0015));
            pointList2.push(new BMap.Point(val.lng, val.lat - 0.0015))
        }
    });


    bdata.mapPoint[key].up.forEach(function (val) {
        pointList1.push(new BMap.Point(val.lng, val.lat));
    });

    bdata.mapPoint[key].down.forEach(function (val) {
        pointList2.push(new BMap.Point(val.lng, val.lat))
    });



    var polyline0 = new BMap.Polyline(pointList, {strokeColor:"#808283", strokeWeight:4, strokeOpacity:1});
    var polyline1 = new BMap.Polyline(pointList1, {strokeColor:"#2c9dd3", strokeWeight:4, strokeOpacity:0.8});
    var polyline2 = new BMap.Polyline(pointList2, {strokeColor:"#11a361", strokeWeight:4, strokeOpacity:0.8});

    polyline0.mId = key;
    polyline1.mId = key;
    polyline2.mId = key;

    polyline0.addEventListener('mouseover', function (e) { mouserOverKey = this.mId; });
    polyline1.addEventListener('mouseover', function (e) { mouserOverKey = this.mId; console.dir(this.getPath()); console.dir(JSON.stringify(this.getPath()));});
    polyline2.addEventListener('mouseover', function (e) { mouserOverKey = this.mId;  console.dir(this.getPath()); console.dir(JSON.stringify(this.getPath()));});

    map.addOverlay(polyline0);   //增加折线
    map.addOverlay(polyline1);   //增加折线
    map.addOverlay(polyline2);

    // 编辑
    polyline1.enableEditing();
    polyline2.enableEditing();

    //创建右键菜单
    var lineMenu=new BMap.ContextMenu();
    lineMenu.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
        vm.busInfo = [];
        show_map_dom_malfunction();
        hide_map_dom_line();
        setLine(mouserOverKey);
    }, {width: 120}));

    polyline0.addContextMenu(lineMenu);
    polyline1.addContextMenu(lineMenu);
    polyline2.addContextMenu(lineMenu);


    map_dom_line_list[key] = [polyline0, polyline1, polyline2];

}

/**
 * 地铁1号线
 */
var renderMainLine = function () {
    var pointList = [];
    bdata.pointList.forEach(function (val) {
        pointList.push(new BMap.Point(val.lng, val.lat));
    });

    var polyline = new BMap.Polyline(pointList, {strokeColor:"#5a8dca", strokeWeight:6, strokeOpacity:1});   //创建折线
    map.addOverlay(polyline);   //增加折线
}

/**
 * 设置故障站点/区间 鼠标经过和点击事件
 * 点击后隐藏其他故障线路，显示该故障线路
 */
var setLineEvent = function () {
    var mapPoint = bdata.mapPoint;

    for(var key in mapPoint) {
        var pList = [];
        var malfunction = mapPoint[key].malfunction;

        malfunction.forEach(function (val) {
            pList.push(new BMap.Point(val.lng, val.lat));
        });

        if (pList.length > 1) {
            var polyline = new BMap.Polyline(pList, {strokeColor:"#808283", strokeWeight:10, strokeOpacity:0.4});   //创建折线
            map.addOverlay(polyline);

            polyline.mId = key;

            polyline.addEventListener('mouseover', function (e) {
                mouserOverKey = this.mId;
                this.setStrokeOpacity(0.8);
            });

            polyline.addEventListener('mouseout', function (e) {
                this.setStrokeOpacity(0.4);
            });

            //创建右键菜单
            var lineMenu=new BMap.ContextMenu();
            lineMenu.addItem(new BMap.MenuItem('设置为故障区段', function (e) {
                if (currentShowLineKey != '') {
                    map_dom_line_list[currentShowLineKey].forEach(function (val) {
                        val.hide();
                        currentShowLineKey = '';
                    });
                }
                hide_map_dom_malfunction();
                setLine(mouserOverKey);
            }, {width: 120}));

            polyline.addContextMenu(lineMenu);

            map_dom_malfunction_list[key] = polyline;
        }
    }

    setStationEvent();
}

var setStationEvent = function () {
    var mapPoint = bdata.mapPoint;
    for(var key in mapPoint) {
        var point = null;
        var malfunction = mapPoint[key].malfunction;

        if (malfunction.length == 1) {
            point = new BMap.Point(malfunction[0].lng, malfunction[0].lat);

            var circle = new BMap.Circle(point, 10, {strokeColor:"#808283", fillColor: "#808283", strokeWeight: 15, fillOpacity: 0, strokeOpacity:0.4});   //创建折线

            circle.mId = key;

            map.addOverlay(circle);

            circle.addEventListener('mouseover', function (e) {
                mouserOverKey = this.mId;
                this.setStrokeOpacity(0.8);
            });

            circle.addEventListener('mouseout', function (e) {
                this.setStrokeOpacity(0.4);
            });

            circle.addEventListener('click', function (e) {
                //setLine(this.mId);
            });

            //创建右键菜单
            var lineMenu=new BMap.ContextMenu();
            lineMenu.addItem(new BMap.MenuItem('设置为故障区段', function (e) {
                if (currentShowLineKey != '') {
                    map_dom_line_list[currentShowLineKey].forEach(function (val) {
                        val.hide();
                        currentShowLineKey = '';
                    });
                }

                hide_map_dom_malfunction();
                setLine(mouserOverKey);
            }, {width: 120}));

            circle.addContextMenu(lineMenu);

            map_dom_malfunction_list[key] = circle;
        }
    }
}

var hide_map_dom_malfunction = function () {

    for(var key in map_dom_malfunction_list) {
        map_dom_malfunction_list[key].hide();
    }
}

var show_map_dom_malfunction = function () {

    for(var key in map_dom_malfunction_list) {
        map_dom_malfunction_list[key].show();
    }
}

var hide_map_dom_line = function () {

    for(var key in map_dom_line_list) {
        map_dom_line_list[key].forEach(function (val) {
            val.hide();
        })
    }
}

/**
 * 入口
 * @param vm vue对象
 * @param domId  百度地图元素的ID
 * @param callback
 */
var main = function(v, domId, callback) {
    vm = v;
    var timer = null;

    map_dom_malfunction_list = {};
    map_dom_line_list = {};

    currentShowLineKey = '';

    // 防止百度js未加载完
    try {
        initMap(domId);
    }
    catch(e) {
        timer = setInterval(function () {
            try {
                initMap(domId, timer);
            }
            catch(e) {}
        }, 50);
    }
}

export default main;