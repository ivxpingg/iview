/**
 * Created by sgj on 2018-2-24.
 */
import bdata from './bdData';
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
            selected_malfunction_info = this.mInfo;
            this.setStrokeOpacity(0.8);
        });
        mapOverlay.addEventListener('mouseout', function (e) {
            this.setStrokeOpacity(0.4);
        });

        //创建右键菜单
        var lineMenu=new BMap.ContextMenu();
        lineMenu.addItem(new BMap.MenuItem('设置<'+name+'>为故障区段', function (e) {
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
}

/**
 * 取消设置对应的故障站点或故障区段
 */
var cancelMalfunctionLine = function () {
    hideDepartInfo();
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
        if(idx != 0) {
            key_up = array[idx - 1] + '-' + array[idx] + '-up';
            pointList_up = DB_data.busRoute[key_up].concat(pointList_up);

            key_down = array[idx - 1] + '-' + array[idx] + '-down';
            pointList_down = DB_data.busRoute[key_down].concat(pointList_down);
        }
    });
    pointList_up.forEach(function (val) {
        map_pointList_up.push(new BMap.Point(val.lng, val.lat));
    });
    pointList_down.forEach(function (val) {
        map_pointList_down.push(new BMap.Point(val.lng, val.lat));
    });

    var polyline_up = new BMap.Polyline(map_pointList_up, {strokeColor:"#11a361", strokeWeight:4, strokeOpacity:0.8});
    var polyline_down = new BMap.Polyline(map_pointList_down, {strokeColor:"#2c9dd3", strokeWeight:4, strokeOpacity:0.8});

    map.addOverlay(polyline_up);   //增加折线
    map.addOverlay(polyline_down);   //增加折线

    var lineMenu_up = new BMap.ContextMenu();
    lineMenu_up.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
        hideDepartInfo();
        hideBreakLine();
        map_dom_malfunction_overlay_show();

    }, {width: 120}));

    var lineMenu_down = new BMap.ContextMenu();
    lineMenu_down.addItem(new BMap.MenuItem('取消该故障区段', function (e) {
        hideDepartInfo();
        hideBreakLine();
        map_dom_malfunction_overlay_show();

    }, {width: 120}));

    polyline_up.addContextMenu(lineMenu_up);
    polyline_down.addContextMenu(lineMenu_down);

    map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_up);
    map_dom_malfunction_break[p_selected_malfunction_info.id].push(polyline_down);

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