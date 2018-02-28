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
    id: '',
    name: '',
    breakStationIds: []
};

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


// 设置故障站点和区段
var setMalfunction = function () {


   var malfunctionList = DB_data.malfunction;

   var id,                    // 故障站点或者区段唯一标识
       name,                  // 故障站点或者区段名称
       point= [],             // 故障站点或者区段坐标
       breakStationIds = [],  // 故障站点或者区段对应的中断站点ID
       pointList = [],        // 存放 故障站点或者区段 转化为百度Point对象坐标

       mapOverlay = null;    // 存放百度地图覆盖物 故障站点或故障区段

    malfunctionList.forEach(function(val){
       id = val.id;
       name = val.name;
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
        mapOverlay.mName = name;
        mapOverlay.mBreakStationIds = breakStationIds;
        mapOverlay.addEventListener('mouseover', function (e) {
            selected_malfunction_info.id = this.mId;
            selected_malfunction_info.name = this.mName;
            selected_malfunction_info.breakStationIds = this.mBreakStationIds;
            this.setStrokeOpacity(0.8);
        });
        mapOverlay.addEventListener('mouseout', function (e) {
            this.setStrokeOpacity(0.4);
        });

        //创建右键菜单
        var lineMenu=new BMap.ContextMenu();
        lineMenu.addItem(new BMap.MenuItem('设置<'+name+'>为故障区段', function (e) {

            breakLine(selected_malfunction_info);
        }, {width: 250}));

        mapOverlay.addContextMenu(lineMenu);

        map.addOverlay(mapOverlay);
        map_dom_malfunction_overlay_list[id] = mapOverlay;

   });
}

// 中断线路
var breakLine = function (selected_malfunction_info) {
    map_dom_malfunction_overlay_hide();

    // selected_malfunction_info.breakStationIds.forEach(function (val) {
    //
    // });

    console.dir(selected_malfunction_info);
}

/**
 * 显示百度地图故障站点和故障区段覆盖物对象
 */
var map_dom_malfunction_overlay_show = function () {
    for(var key in map_dom_malfunction_overlay_list) {
        map_dom_malfunction_overlay_list[key].show();
    }
}

/**
 * 隐藏百度地图故障站点和故障区段覆盖物对象
 */
var map_dom_malfunction_overlay_hide = function () {
    for(var key in map_dom_malfunction_overlay_list) {
        map_dom_malfunction_overlay_list[key].hide();
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

    map_dom_malfunction_overlay_list = {};
    // map_dom_line_list = {};
    //
    // currentShowLineKey = '';

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