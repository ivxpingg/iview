import bdata from './bdData';

var vm = null; //vue对象
var map = null;

/**
 * 初始化地图
 */
var initMap = function (domId, timer) {
    map = new BMap.Map(domId, {enableMapClick:false});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    clearInterval(timer);

    test2();
}

var test2 = function () {

    var pointList = [];

    bdata.s1.pointList.forEach(function (val) {
        pointList.push(new BMap.Point(val.lng, val.lat));
    });

    var polyline = new BMap.Polyline(pointList, {strokeColor:"red", strokeWeight:15, strokeOpacity:1});   //创建折线

    polyline.addEventListener('click', function () {
         alert(1);
    });
    map.addOverlay(polyline);   //增加折线


}

var test = function () {

    var busline = new BMap.BusLineSearch(map, {
        renderOptions: {},
        onGetBusListComplete: function (rs) {
           //console.dir(rs);
           busline.getBusLine(rs.getBusListItem(0));

        },
        onBusListHtmlSet: function (HTMLElement) {
            console.log(2);
        },
        onGetBusLineComplete: function(rs) {
            console.log(3);
            //console.dir(rs);
           // console.log(JSON.stringify(rs.getPath()));
            //console.log(rs.getPath()[0]);
            // console.dir(rs.getPolyline());
           // console.dir(rs.getBusStation(0));

          // var polyline = new BMap.Polyline(rs.getPath(), {strokeColor:"red", strokeWeight:15, strokeOpacity:1});   //创建折线
          //  map.addOverlay(polyline);   //增加折线
           // setTimeout(function () {
           //     map.addOverlay(polyline);   //增加折线
           // }, 1000)
        }
    });


    busline.getBusList('1号线');

    // var polyline = new BMap.Polyline([
    //     new BMap.Point(118.076438, 24.649608),
    //     new BMap.Point(118.079645, 24.643368),
    //     new BMap.Point(118.079645, 24.643368),
    //     new BMap.Point(118.080291, 24.641919),
    //
    //     new BMap.Point(118.080314, 24.641332),
    //     new BMap.Point(118.080147, 24.640608),
    //     new BMap.Point(118.079823, 24.639698),
    //     new BMap.Point(118.079155, 24.638338),
    //     new BMap.Point(118.0784, 24.637146)
    // ], {strokeColor:"red", strokeWeight:15, strokeOpacity:1});   //创建折线
    // map.addOverlay(polyline);   //增加折线
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