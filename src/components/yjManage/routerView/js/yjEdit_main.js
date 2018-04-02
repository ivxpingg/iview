/**
 * Created by sgj on 2018-3-19.
 */

import DB_data from '../../module/js/databaseData';
import Util from '../../../../libs/util';


var vm = null; //vue对象
var map = null;

var timer = null;

/**
 * 初始化地图
 */
var initMap = function (domId, timer) {
    map = new BMap.Map(domId, {enableMapClick:false, minZoom:12,maxZoom:18});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    init();
}

var init = function () {

    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    debugger
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: true, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });
    debugger
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
}

var overlays = [];
var overlaycomplete = function(e){

    overlays.push(e.overlay);
};

/**
 * 入口
 * @param vm vue对象
 * @param domId  百度地图元素的ID
 * @param callback
 */
var main = function(v, domId, callback) {
    vm = v;

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