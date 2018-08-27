
let setMap = (domId) => {
    let map = new BMap.Map(domId, {enableMapClick:false, minZoom:12,maxZoom:18});    // 创建Map实例,关闭底图可点功能
    map.centerAndZoom(new BMap.Point(118.117348,24.552869), 13);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    setMapStyle(map);
    return map;
};
/**
 * 设置百度地图样式
 * @param Map
 */
let setMapStyle = (Map) => {
    var styleJson = [
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: {
                visibility: 'off'
            }
        },
        {
            featureType: 'subway',
            elementType: 'labels',
            stylers: {
                visibility: 'on'
            }
        },
        {
            featureType: 'subway',
            elementType: 'labels.icon',
            stylers: {
                visibility: 'on'
            }
        }
    ];
    Map.setMapStyle({
        styleJson: styleJson
    });
};

let mapLoadedCompleted = () => {
    return new Promise(resolve => {
        if (typeof BMap !== 'undefined') { resolve(1); }
        else {
            let timer = setInterval(function () {
                if (typeof BMap !== 'undefined') {
                    clearInterval(timer);
                    resolve(1);
                }
            }, 50);
        }
    });
}

/**
 * 初始化百度地图，返回百度地图对象
 * @param domId [String] 百度地图元素的ID
 * @return Object  map
 */
let initMap = (domId) => {
    return mapLoadedCompleted().then(function () {
        return setMap(domId);
    });
};

export default initMap;