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
    // breakImg: ['1']           // 中断对应的故障运行交路图 (图片编号)
};

// 存放百度地图覆盖物， 中断元素、公交线路
var map_dom_malfunction_break = {};

/**
 * 初始化地图
 */
var initMap = function (domId, timer) {
    map = new BMap.Map(domId, {enableMapClick:false, minZoom:12,maxZoom:18});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    clearInterval(timer);
    init();
}

var init = function () {

    // editLine();
    setMapStyle();

    setStationName();

    setTimeout(function() {
        setMalfunction();
    }, 1000);
    // setMalfunction();

}

// 百度地图个性化设置
var setMapStyle = function () {
    var styleJson = [
        // {
        //     "featureType": "road",
        //     "elementType": "all",
        //     "stylers": {
        //         "visibility": "off"
        //     }
        // },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        },
        {
            "featureType": "subway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        },
        {
            "featureType": "subway",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }
    ];
    map.setMapStyle({
        styleJson: styleJson
    });
}

// 设置地铁站点名称
var setStationName = function () {

    var stations = DB_data.stationsPoint;
    for(var key in stations) {
        var optsUp = {
            position : new BMap.Point(stations[key][0], stations[key][1]),    // 指定文本标注所在的地理位置
            offset   : new BMap.Size( 0, -6)    //设置文本偏移量
        }
        var labelUp = new BMap.Label(key, optsUp);  // 创建文本标注对象
        labelUp.setStyle({
            paddingBottom: '3px',
            paddingLeft: '3px',
            paddingRight: '3px',
            borderWidth: 0,
            backgroundColor: 'transparent',
            color : "#666",
            fontSize : "12px",
            height : "20px",
            lineHeight : "",
            fontFamily:"微软雅黑",
            fontWeight: 700,
            textShadow: "1px 1px 1px #FFF"
        });
        map.addOverlay(labelUp);
    }

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
               pointList.push(new BMap.Point(pVal.lng, pVal.lat));
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

    showDepartInfo(p_selected_malfunction_info.breakStationIds);

    if (map_dom_malfunction_break[p_selected_malfunction_info.id]) {
        showBreakLine();
    }
    else {
        setEchart(p_selected_malfunction_info);
        breakLine(p_selected_malfunction_info);
        setBusLine(p_selected_malfunction_info);
        setBusStation(p_selected_malfunction_info);
        malfunctionPoint(p_selected_malfunction_info);

    }
}


/**********************公交部门信息*************************
 * 显示中断线路对应负责的公交部门信息
 * @param contactDepart
 */
var showDepartInfo = function (breakStationIds) {

    for (var o in DB_data.departInfo) {

        for (var i = 0; i < breakStationIds.length; i++) {
            if (DB_data.departInfo[o].stationIds.indexOf(''+breakStationIds[i]+'') >=0 ) {
                vm.busInfo.push(DB_data.departInfo[o]);
                break;
            }
        }

    }
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

    var polyline = new BMap.Polyline(map_pointList, {strokeColor:"#f99191", strokeWeight:8, strokeOpacity:1});

    var lineMenu = new BMap.ContextMenu();
    lineMenu.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
        hideDepartInfo();
        hideBreakLine();
        breakImgHide();
        map_dom_malfunction_overlay_show();

    }, {width: 120}));

    lineMenu.addItem(new BMap.MenuItem('显示故障运行交路图', function (e) {
        breakImgShow();
    }, {width: 160}));

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

// 故障具体位置设置
var malfunctionPoint = function (p_selected_malfunction_info) {
    var point = p_selected_malfunction_info.malfunctionPoint[0];
    var myIcon = new BMap.Icon(Util.staticImgUrl + "/static/img/malfunction2.png", new BMap.Size(16,16));
    var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat),{icon:myIcon});  // 创建标注
    map.addOverlay(marker);
    map_dom_malfunction_break[p_selected_malfunction_info.id].push(marker);
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
            map_pointList_up.reverse();

            // var sy = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW,{
            //     scale: 0.5,//图标缩放大小
            //     strokeColor:'#fff',//设置矢量图标的线填充颜色
            //     strokeWeight: '2',//设置线宽
            // });
            // var icons = new BMap.IconSequence(sy, '5', '20');

            var polyline_up = new BMap.Polyline(map_pointList_up, {
                //icons:[icons],
                strokeColor:"#11a361", strokeWeight:6, strokeOpacity:0.8});
            map.addOverlay(polyline_up);   //增加折线
            var lineMenu_up = new BMap.ContextMenu();
            lineMenu_up.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
                hideDepartInfo();
                hideBreakLine();
                breakImgHide();
                map_dom_malfunction_overlay_show();

            }, {width: 120}));
            lineMenu_up.addItem(new BMap.MenuItem('显示故障运行交路图', function (e) {
                breakImgShow();
            }, {width: 160}));

            polyline_up.addContextMenu(lineMenu_up);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_up);


            key_down = array[idx - 1] + '-' + array[idx] + '-down';
            // pointList_down = DB_data.busRoute[key_down].concat(pointList_down);
            pointList_down = DB_data.busRoute[key_down]
            pointList_down.forEach(function (val) {
                map_pointList_down.push(new BMap.Point(val.lng, val.lat));
            });

            // var sy2 = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW,{
            //     scale: 0.5,//图标缩放大小
            //     strokeColor:'#fff',//设置矢量图标的线填充颜色
            //     strokeWeight: '2',//设置线宽
            // });
            // var icons2 = new BMap.IconSequence(sy2, '5', '20');

            var polyline_down = new BMap.Polyline(map_pointList_down, {
                // icons:[icons2],
                strokeColor:"#2c9dd3", strokeWeight:6, strokeOpacity:0.8});
            map.addOverlay(polyline_down);   //增加折线
            var lineMenu_down = new BMap.ContextMenu();
            lineMenu_down.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
                hideDepartInfo();
                hideBreakLine();
                breakImgHide();
                map_dom_malfunction_overlay_show();

            }, {width: 120}));

            lineMenu_down.addItem(new BMap.MenuItem('显示故障运行交路图', function (e) {
                breakImgShow();
            }, {width: 160}));

            polyline_down.addContextMenu(lineMenu_down);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_down);
        }
    });


}


// 故障运行交路图
var breakImgShow = function () {
    vm.img = selected_malfunction_info.breakImg[0] + '.png';
    vm.breakImgShow = true;
}
var breakImgHide = function () {
    vm.breakImgShow = false;
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
                paddingLeft: '3px',
                paddingRight: '3px',
                borderWidth: 0,
                backgroundColor: '#11a361',
                color : "#fff",
                fontSize : "12px",
                height : "20px",
                lineHeight : "",
                fontFamily:"微软雅黑"
            });
            map.addOverlay(labelUp);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(labelUp);

            labelUp.colss = 1;
            if (DB_data.breakImg[p_selected_malfunction_info.breakImg[0]].busStartStaion.indexOf(''+val+'') >= 0 && idx != (array.length - 1)) {
                setInterval(function () {
                    if (labelUp.colss == 1) {
                        labelUp.colss = 2;
                        labelUp.setStyle({
                            backgroundColor: '#4ccf5f'
                        });
                    }
                    else {
                        labelUp.colss = 1;
                        labelUp.setStyle({
                            backgroundColor: '#11a361'
                        });
                    }
                }, 800);
            }

            var myIcon = new BMap.Icon(Util.staticImgUrl + "/static/img/icon2.png", new BMap.Size(19,26));
            var myOffset = new BMap.Size(0, -13);
            var markerUp = new BMap.Marker(new BMap.Point(busStationUp[0].lng, busStationUp[0].lat),{icon:myIcon, offset: myOffset});  // 创建标注

            // markerUp.setAnimation(BMAP_ANIMATION_BOUNCE);

            markerUp.mInfo = p_selected_malfunction_info;
            markerUp.mStationId = val;
            markerUp.addEventListener('mouseover', function (e) {
                //setStationList(this.mStationId, 'up');
               // setTwinkle();
            });

            markerUp.addEventListener('mouseout', function (e) {
               // stopTwinkle();
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
                paddingLeft: '3px',
                paddingRight: '3px',
                borderWidth: 0,
                backgroundColor: '#2c9dd3',
                color : "#FFF",
                fontSize : "12px",
                height : "20px",
                lineHeight : "",
                fontFamily:"微软雅黑"
            });
            map.addOverlay(labelDown);
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(labelDown);

            labelDown.colss = 1;
            if (DB_data.breakImg[p_selected_malfunction_info.breakImg[0]].busStartStaion.indexOf(''+val+'') >= 0 && idx > 0) {
                setInterval(function () {
                    if (labelDown.colss == 1) {
                        labelDown.colss = 2;
                        labelDown.setStyle({
                            backgroundColor: '#63d9f2'
                        });
                    }
                    else {
                        labelDown.colss = 1;
                        labelDown.setStyle({
                            backgroundColor: '#2c9dd3'
                        });
                    }
                }, 800);
            }

            var myIcon = new BMap.Icon(Util.staticImgUrl + "/static/img/icon1.png", new BMap.Size(19,26));
            var myOffset = new BMap.Size(-5, -13);
            var markerDown = new BMap.Marker(new BMap.Point(busStationDown[0].lng, busStationDown[0].lat),{icon:myIcon, offset: myOffset});  // 创建标注

            // markerDown.setAnimation(BMAP_ANIMATION_BOUNCE);

            markerDown.mInfo = p_selected_malfunction_info;
            markerDown.mStationId = val;
            markerDown.addEventListener('mouseover', function (e) {
                // setStationList(this.mStationId, 'down');
                // setTwinkle();
            });
            markerDown.addEventListener('mouseout', function (e) {
                // stopTwinkle();
            });

            map.addOverlay(markerDown);              // 将标注添加到地图中
            map_dom_malfunction_break[p_selected_malfunction_info.id].push(markerDown);

        }

    });
}

var setEchart = function (p_selected_malfunction_info) {
    vm.stationIds = p_selected_malfunction_info.breakStationIds.join(',');
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
