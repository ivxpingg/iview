/**
 * Created by sgj on 2018-2-24.
 */

import DB_data from './databaseData';
import Util from '../../../../libs/util';

var vm = null; //vue对象
var map = null;

// 存放故障站点和故障区段覆盖物对象
var map_dom_malfunction_overlay_list = {};

// 存放当前选择的故障站点或故障区段的信息
var selected_malfunction_info = {
    // id: '1',     // 镇海路站
    // name: '镇海路站',
    // type: '0',
    // point: [{"lng":118.088848,"lat":24.456642}],
    // breakStationIds: [1,2],
    // contactDepart: ['0']
};

// 存放百度地图覆盖物， 中断元素、公交线路
var map_dom_malfunction_break = {};

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

var init = function () {
    // editLine();

    setMalfunction();
}


/***************************故障站点和区段************************************
 * 设置故障站点和区段
 */
var setMalfunction = function () {


   var malfunctionList = DB_data.malfunction;

   var id,                    // 故障站点或者区段唯一标识
       name,                  // 故障站点或者区段名称
       info,
       point= [],             // 故障站点或者区段坐标
       breakStationIds = [],  // 故障站点或者区段对应的中断站点ID
       pointList = [],        // 存放 故障站点或者区段 转化为百度Point对象坐标

       mapOverlay = null;    // 存放百度地图覆盖物 故障站点或故障区段

    malfunctionList.forEach(function(val){
       id = val.id;
       name = val.name;
       info = val;
       point = val.point;
       breakStationIds = val.breakStationIds;
       pointList = [];  // 线路坐标
       mapOverlay = null;

       if (point.length == 0) {
           return;
       }

       // 故障是站点
       if (val.type == "0") {
           mapOverlay = new BMap.Circle(new BMap.Point(point[0].lng, point[0].lat),10,
               {strokeColor:"#808283", fillColor: "#808283", strokeWeight: 15, fillOpacity: 0, strokeOpacity:0.4});   //创建圆
       }
       else {  // 故障是区段
           point.forEach(function (pVal) {
               pointList.push(new BMap.Point(pVal.lng, pVal.lat))
           });
           mapOverlay = new BMap.Polyline(pointList, {strokeColor:"#808283", strokeWeight:10, strokeOpacity:0.4});   //创建折线

       }

        mapOverlay.mId = id;
        mapOverlay.mInfo = info;
        mapOverlay.mName = name;
        mapOverlay.mBreakStationIds = breakStationIds;
        mapOverlay.addEventListener('mouseover', function (e) {
           // selected_malfunction_info = this.mInfo;
            this.setStrokeOpacity(0.8);
        });
        mapOverlay.addEventListener('mouseout', function (e) {
            this.setStrokeOpacity(0.4);
        });

        //创建右键菜单
        var lineMenu=new BMap.ContextMenu();
        lineMenu.addItem(new BMap.MenuItem('设置<'+name+'>为故障区段', function (point, client, target) {
            selected_malfunction_info = target.mInfo;
            setMalfunctionLine(selected_malfunction_info);
        }, {width: 250}));

        mapOverlay.addContextMenu(lineMenu);

        map.addOverlay(mapOverlay);
        map_dom_malfunction_overlay_list[id] = mapOverlay;

   });
}


/**
 * 显示百度地图故障站点和故障区段覆盖物对象
 */
var map_dom_malfunction_overlay_show = function () {
    for(var key in map_dom_malfunction_overlay_list) {
        map_dom_malfunction_overlay_list[key].show();
    }
}

/***************************故障站点和区段************************************
 * 隐藏百度地图故障站点和故障区段覆盖物对象
 */
var map_dom_malfunction_overlay_hide = function () {
    for(var key in map_dom_malfunction_overlay_list) {
        map_dom_malfunction_overlay_list[key].hide();
    }
}

/**
 * 设置故障站点或故障区段之后, 入口
 * @param selected_malfunction_info 选择的对应故障站点或者故障区段信息
 */
var setMalfunctionLine = function (p_selected_malfunction_info) {
    map_dom_malfunction_overlay_hide();

    showDepartInfo(p_selected_malfunction_info.contactDepart);
    breakLine(p_selected_malfunction_info);
    setBusLine(p_selected_malfunction_info);
    busStationFlag(p_selected_malfunction_info);
    setBusStation(p_selected_malfunction_info);
}


/**********************公交部门信息*************************
 * 显示中断线路对应负责的公交部门信息
 * @param contactDepart
 */
var showDepartInfo = function (contactDepart) {
    contactDepart.forEach(function (val) {
        vm.busInfo.push(DB_data.departInfo[val]);
    });
}
/*
 * 隐藏中断线路对应负责的公交部门信息
 */
var hideDepartInfo = function () {
    vm.busInfo = [];
}




/******************************************中断线路**************************************
 * 中断线路
 * @param p_selected_malfunction_info
 */
var breakLine = function (p_selected_malfunction_info) {

    if (map_dom_malfunction_break[p_selected_malfunction_info.id]) {
        showBreakLine();
        return;
    }

    var key,
        pointList = [],
        map_pointList = [];

    p_selected_malfunction_info.breakStationIds.forEach(function (val, idx, array) {
        if(idx != 0) {
            key = array[idx - 1] + '-' + array[idx];
            pointList = DB_data.breakSection[key].concat(pointList);
        }
    });

    pointList.forEach(function (val) {
        map_pointList.push(new BMap.Point(val.lng, val.lat));
    });

    var polyline = new BMap.Polyline(map_pointList, {strokeColor:"#808283", strokeWeight:4, strokeOpacity:1});

    var lineMenu = new BMap.ContextMenu();
    lineMenu.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
        hideDepartInfo();
        hideBreakLine();
        map_dom_malfunction_overlay_show();

    }, {width: 120}));

    polyline.addContextMenu(lineMenu);

    map.addOverlay(polyline);

    map_dom_malfunction_break[p_selected_malfunction_info.id] = [];
    map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline);
}
// 显示中断线路
var showBreakLine = function() {
    map_dom_malfunction_break[selected_malfunction_info.id].forEach(function (val) {
        val.show();
    });
}

/****************************************中断线路**************************************
 * 隐藏中断线路
 */
var hideBreakLine = function() {
    map_dom_malfunction_break[selected_malfunction_info.id].forEach(function (val) {
        val.hide();
    });
}

/**
 * 设置公交起点和终点标注 图片
 * @param p_selected_malfunction_info
 */
var busStationFlag = function (p_selected_malfunction_info) {

    var firstKey = p_selected_malfunction_info.breakStationIds[0] + '';
    var lastKey = p_selected_malfunction_info.breakStationIds[p_selected_malfunction_info.breakStationIds.length - 1] + '';
    var startPoint = DB_data.stationsPoint[DB_data.stationName[firstKey]];
    var lastPoint = DB_data.stationsPoint[DB_data.stationName[lastKey]];

    var myIconFirst = new BMap.Icon(Util.staticImgUrl + "/static/img/station-start.png", new BMap.Size(20,20));
    var markerFirst = new BMap.Marker(new BMap.Point(startPoint[0], startPoint[1]),{icon:myIconFirst});  // 创建标注

    var myIconLast = new BMap.Icon(Util.staticImgUrl + "/static/img/station-start.png", new BMap.Size(20,20));
    var markerLast = new BMap.Marker(new BMap.Point(lastPoint[0], lastPoint[1]),{icon:myIconLast});  // 创建标注

    map.addOverlay(markerFirst);
    map.addOverlay(markerLast);

    map_dom_malfunction_break[p_selected_malfunction_info.id].push(markerFirst);
    map_dom_malfunction_break[p_selected_malfunction_info.id].push(markerLast);
}

/***************************************公交接驳线路************************************
 * 设置公交接驳线路
 */
var setBusLine = function (p_selected_malfunction_info) {
    var key_up,
        pointList_up = [],
        map_pointList_up = [],
        key_down,
        pointList_down = [],
        map_pointList_down = [];

    p_selected_malfunction_info.breakStationIds.forEach(function (val, idx, array) {
        map_pointList_up = [];
        map_pointList_down = [];

        if(idx != 0) {
            key_up = array[idx - 1] + '-' + array[idx] + '-up';
            // pointList_up = DB_data.busRoute[key_up].concat(pointList_up);
            pointList_up = DB_data.busRoute[key_up];

            pointList_up.forEach(function (val) {
                map_pointList_up.push(new BMap.Point(val.lng, val.lat));
            });
            var polyline_up = new BMap.Polyline(map_pointList_up, {strokeColor:"#11a361", strokeWeight:4, strokeOpacity:0.8});
            map.addOverlay(polyline_up);   //增加折线
            var lineMenu_up = new BMap.ContextMenu();
            lineMenu_up.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
                hideDepartInfo();
                hideBreakLine();
                map_dom_malfunction_overlay_show();

            }, {width: 120}));
            polyline_up.addContextMenu(lineMenu_up);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_up);







            key_down = array[idx - 1] + '-' + array[idx] + '-down';
            // pointList_down = DB_data.busRoute[key_down].concat(pointList_down);
            pointList_down = DB_data.busRoute[key_down]
            pointList_down.forEach(function (val) {
                map_pointList_down.push(new BMap.Point(val.lng, val.lat));
            });
            var polyline_down = new BMap.Polyline(map_pointList_down, {strokeColor:"#2c9dd3", strokeWeight:4, strokeOpacity:0.8});
            map.addOverlay(polyline_down);   //增加折线
            var lineMenu_down = new BMap.ContextMenu();
            lineMenu_down.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
                hideDepartInfo();
                hideBreakLine();
                map_dom_malfunction_overlay_show();

            }, {width: 120}));
            polyline_down.addContextMenu(lineMenu_down);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_down);
        }
    });


    // pointList_up.forEach(function (val) {
    //     map_pointList_up.push(new BMap.Point(val.lng, val.lat));
    // });
    // var polyline_up = new BMap.Polyline(map_pointList_up, {strokeColor:"#11a361", strokeWeight:4, strokeOpacity:0.8});
    // map.addOverlay(polyline_up);   //增加折线
    // var lineMenu_up = new BMap.ContextMenu();
    // lineMenu_up.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
    //     hideDepartInfo();
    //     hideBreakLine();
    //     map_dom_malfunction_overlay_show();
    //
    // }, {width: 120}));
    // polyline_up.addContextMenu(lineMenu_up);
    // map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_up);
    //
    //
    // pointList_down.forEach(function (val) {
    //     map_pointList_down.push(new BMap.Point(val.lng, val.lat));
    // });
    // var polyline_down = new BMap.Polyline(map_pointList_down, {strokeColor:"#2c9dd3", strokeWeight:4, strokeOpacity:0.8});
    // map.addOverlay(polyline_down);   //增加折线
    // var lineMenu_down = new BMap.ContextMenu();
    // lineMenu_down.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
    //     hideDepartInfo();
    //     hideBreakLine();
    //     map_dom_malfunction_overlay_show();
    //
    // }, {width: 120}));
    // polyline_down.addContextMenu(lineMenu_down);
    // map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_down);

}


/**
 * 设置公交站牌
 */
var map_dom_bus_line = [];
var setBusStation = function (p_selected_malfunction_info) {

    p_selected_malfunction_info.breakStationIds.forEach(function (val, idx, array) {

        var busStationUp = DB_data.busStationInfo[val].busStationUp,
            busStationDown = DB_data.busStationInfo[val].busStationDown,
            upName = DB_data.busStationInfo[val].upName,
            downName = DB_data.busStationInfo[val].downName;

        // 上行
        if (busStationUp.length > 0) {
            var optsUp = {
                position : new BMap.Point(busStationUp[0].lng, busStationUp[0].lat),    // 指定文本标注所在的地理位置
                offset   : new BMap.Size( 5, -45)    //设置文本偏移量
            }
            var labelUp = new BMap.Label(upName, optsUp);  // 创建文本标注对象
            labelUp.setStyle({
                paddingBottom: '3px',
                borderColor: "#11a361",
                color : "#11a361",
                fontSize : "12px",
                height : "20px",
                lineHeight : "",
                fontFamily:"微软雅黑"
            });
            map.addOverlay(labelUp);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(labelUp);

            var myIcon = new BMap.Icon(Util.staticImgUrl + "/static/img/icon2.png", new BMap.Size(19,26));
            var myOffset = new BMap.Size(0, -13);
            var markerUp = new BMap.Marker(new BMap.Point(busStationUp[0].lng, busStationUp[0].lat),{icon:myIcon, offset: myOffset});  // 创建标注
            markerUp.mInfo = p_selected_malfunction_info;
            markerUp.mStationId = val;
            markerUp.addEventListener('mouseover', function (e) {
                setStationList(this.mStationId, 'up');
                setTwinkle();
            });

            markerUp.addEventListener('mouseout', function (e) {
                stopTwinkle();
            });

            map.addOverlay(markerUp);              // 将标注添加到地图中
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(markerUp);

        }

        // 下行
        if (busStationDown.length > 0) {
            var optsDown = {
                position : new BMap.Point(busStationDown[0].lng, busStationDown[0].lat),    // 指定文本标注所在的地理位置
                offset   : new BMap.Size(-downName.length*12, -45)    //设置文本偏移量
            }
            var labelDown = new BMap.Label(downName, optsDown);  // 创建文本标注对象
            labelDown.setStyle({
                paddingBottom: '3px',
                borderColor: "#2c9dd3",
                color : "#2c9dd3",
                fontSize : "12px",
                height : "20px",
                lineHeight : "20px",
                fontFamily:"微软雅黑"
            });
            map.addOverlay(labelDown);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(labelDown);

            var myIcon = new BMap.Icon(Util.staticImgUrl + "/static/img/icon1.png", new BMap.Size(19,26));
            var myOffset = new BMap.Size(-5, -13);
            var markerDown = new BMap.Marker(new BMap.Point(busStationDown[0].lng, busStationDown[0].lat),{icon:myIcon, offset: myOffset});  // 创建标注
            markerDown.mInfo = p_selected_malfunction_info;
            markerDown.mStationId = val;
            markerDown.addEventListener('mouseover', function (e) {
                setStationList(this.mStationId, 'down');
                setTwinkle();
            });
            markerDown.addEventListener('mouseout', function (e) {
                stopTwinkle();
            });

            map.addOverlay(markerDown);              // 将标注添加到地图中
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(markerDown);

        }

    });
}

/**
 * 设置站牌对应要闪烁的公交线路
 * @param stationId  站点Id
 * @param direction 方向； up: 上行； down: 下行
 */
var setStationList = function (stationId ,direction) {

    var pointListUp = [],
        pointListDown = [],
        idx,
        maxIdx,
        key,
        map_pointList_up = [],
        map_pointList_down = [];
    var breakStationIds = selected_malfunction_info.breakStationIds;

    idx = breakStationIds.indexOf(stationId);
    maxIdx = idx;

    var polylineUp;
    var polylineDown;

    if (direction == 'up') {

        for(var i = idx; i < breakStationIds.length; i++) {
            maxIdx = i;
            map_pointList_up = [];
            if (i != idx) {
                key = breakStationIds[i - 1] + '-' + breakStationIds[i] + '-up';
                pointListUp = DB_data.busRoute[key];//.concat(pointListUp );
            }

            pointListUp.forEach(function (val) {
                map_pointList_up.push(new BMap.Point(val.lng, val.lat));
            });

            if (pointListUp.length > 0) {
                polylineUp = new BMap.Polyline(map_pointList_up, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
                map.addOverlay(polylineUp);   //增加折线

                map_dom_bus_line.push(polylineUp);
            }
        }
        for(maxIdx; maxIdx >idx ; maxIdx--) {
            map_pointList_down = [];

            if (maxIdx != 0) {
                key = breakStationIds[maxIdx - 1] + '-' + breakStationIds[maxIdx] + '-down';

                pointListDown = DB_data.busRoute[key];
            }

            pointListDown.forEach(function (val) {
                map_pointList_down.push(new BMap.Point(val.lng, val.lat));
            });
            if (pointListDown.length > 0) {
                polylineDown = new BMap.Polyline(map_pointList_down, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
                map.addOverlay(polylineDown);   //增加折线
                map_dom_bus_line.push(polylineDown);
            }
        }
    }

    if (direction == 'down') {
        for(var i = 1; i <= idx; i++) {
            map_pointList_up = [];

            key = breakStationIds[i - 1] + '-' + breakStationIds[i] + '-up';
            pointListUp = DB_data.busRoute[key];

            pointListUp.forEach(function (val) {
                map_pointList_up.push(new BMap.Point(val.lng, val.lat));
            });

            if (pointListUp.length > 0) {
                polylineUp = new BMap.Polyline(map_pointList_up, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
                map.addOverlay(polylineUp);   //增加折线

                map_dom_bus_line.push(polylineUp);
            }
        }

        for(var i = idx; i > 0; i--) {
            map_pointList_down = [];

            if (i != 0) {
                key = breakStationIds[i - 1] + '-' + breakStationIds[i] + '-down';

                pointListDown = DB_data.busRoute[key];
            }

            pointListDown.forEach(function (val) {
                map_pointList_down.push(new BMap.Point(val.lng, val.lat));
            });
            if (pointListDown.length > 0) {
                polylineDown = new BMap.Polyline(map_pointList_down, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
                map.addOverlay(polylineDown);   //增加折线
                map_dom_bus_line.push(polylineDown);
            }
        }
    }


    // pointListUp.forEach(function (val) {
    //     map_pointList_up.push(new BMap.Point(val.lng, val.lat));
    // });
    //
    // pointListDown.forEach(function (val) {
    //     map_pointList_down.push(new BMap.Point(val.lng, val.lat));
    // });
    //
    // if (pointListUp.length > 0) {
    //     var polylineUp = new BMap.Polyline(map_pointList_up, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
    //     map.addOverlay(polylineUp);   //增加折线
    //
    //     map_dom_bus_line.push(polylineUp);
    // }
    // if (pointListDown.length > 0) {
    //     var polylineDown = new BMap.Polyline(map_pointList_down, {strokeColor:"#f39950", strokeWeight:8, strokeOpacity:1});
    //     map.addOverlay(polylineDown);   //增加折线
    //     map_dom_bus_line.push(polylineDown);
    // }

}

var interval = null;
var setTwinkle = function () {
    var wight = 4;
    interval = setInterval(function () {
        wight = wight == 4 ? 8 : 4;

        map_dom_bus_line.forEach(function (val) {
            val.setStrokeWeight(wight);
        });
    }, 200);
}
var stopTwinkle = function () {

    map_dom_bus_line.forEach(function (val) {

        map.removeOverlay(val);
    });

    clearInterval(interval);
    map_dom_bus_line = [];
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

    map_dom_malfunction_overlay_list = {};
    map_dom_malfunction_break = {};
    selected_malfunction_info = {};

    // 防止百度js未加载完
    try {
        initMap(domId);
    }
    catch(e) {
        timer = setInterval(function () {
            try {
                initMap(domId, timer);
            }
            catch(e) {
                console.dir(e);
            }
        }, 50);
    }
}

export default main;



// 编辑线路
var editLine = function (p_selected_malfunction_info) {
    var key_up,
        pointList_up = [],
        map_pointList_up = [],
        key_down,
        pointList_down = [],
        map_pointList_down = [];

    var list =  ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];

    list.forEach(function (val, idx, array) {
        if(idx != 0) {
            map_pointList_up = [];
            map_pointList_down= [];

            key_up = array[idx - 1] + '-' + array[idx] + '-up';
            pointList_up = DB_data.busRoute[key_up];

            key_down = array[idx - 1] + '-' + array[idx] + '-down';
            pointList_down = DB_data.busRoute[key_down];


            pointList_up.forEach(function (val) {
                map_pointList_up.push(new BMap.Point(val.lng, val.lat));
            });
            pointList_down.forEach(function (val) {
                map_pointList_down.push(new BMap.Point(val.lng, val.lat));
            });


            var polyline_up = new BMap.Polyline(map_pointList_up, {strokeColor:"#11a361", strokeWeight:4, strokeOpacity:0.8});
            var polyline_down = new BMap.Polyline(map_pointList_down, {strokeColor:"#2c9dd3", strokeWeight:4, strokeOpacity:0.8});

            polyline_up.enableEditing();
            polyline_down.enableEditing();


            var lineMenu_up = new BMap.ContextMenu();
            lineMenu_up.addItem(new BMap.MenuItem(val+ ' up', function (p,c,t) {

                console.dir(t.getPath());

            }, {width: 120}));

            var lineMenu_down = new BMap.ContextMenu();
            lineMenu_down.addItem(new BMap.MenuItem(val+ ' down', function (p,c,t) {
                console.dir(t.getPath());
            }, {width: 120}));
            polyline_up.addContextMenu(lineMenu_up);
            polyline_down.addContextMenu(lineMenu_down);



            map.addOverlay(polyline_up);   //增加折线
            map.addOverlay(polyline_down);   //增加折线
        }
    });






    // polyline_up.enableEditing();
    // polyline_down.enableEditing();


    // map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_up);
    // map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_down);
}