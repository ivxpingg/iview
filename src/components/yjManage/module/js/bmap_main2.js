/**
 * Created by sgj on 2018-2-24.
 */
import bdata from './bdData';
import Util from '../../../../libs/util';

var vm = null; //vue对象
var map = null;


/**
 * 初始化地图
 */
var initMap = function (domId, timer) {
    map = new BMap.Map(domId, {enableMapClick:false, minZoom:12,maxZoom:17});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    clearInterval(timer);
    //init();
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

    // map_dom_malfunction_list = {};
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
            catch(e) {}
        }, 50);
    }
}

export default main;