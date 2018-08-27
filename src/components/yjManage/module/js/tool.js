/**
 * 数据转化工具
 */

/**
 * 地图坐标转化为对象
 * PS： [118.09701, 24.462188] => { lng:118.09701, lat:24.462188 }
 *      "[{lng:118.09701, lat:24.462188}]" => [{lng:118.09701, lat:24.462188}]
 * @param o [Array, String]
 * @return Object
 */
export const pointToObject = (o) => {
    if (typeof o === 'string') {
        return eval(o);
    }
    return {lng: o[0], lat: o[1]};
};

/**
 * 转化为百度地图的Point对象的列表
 * PS
 * 需要引入百度地图js
 * @param array [Array, String]
 */
export const toPointList = (array) => {
    if (typeof array === 'string') {
        array =  pointToObject(array);
    }
    return array.map((v) => {
        return new BMap.Point(v.lng, v.lat);
    });
};

/**
 * 把站点转化为中断信息的区段编号。
 * PS: 1,2,3,4 => 1-2,2-3,3-4
 * @param stations
 */
export const toSectionNoString = (stations) => {
    let array = stations.split(',');
    let str = '';
    array = array.map((v) => {
        return parseInt(v);
    });
    array = array.sort(function(a,b) { return a-b; });

    array.forEach((v, idx, obj) => {
        if (idx !== obj.length - 1) {
            str += `${v}-${obj[idx + 1]},`;
        }
    });
    if (str.length > 0) {
        str = str.substr(0, str.length - 1);
    }
    return str;
};

/**
 * 把站点转化为公交接驳的的区段编号。
 * PS: 1,2,3,4 => 1-2,2-1,2-3,3-2,3-4,4-3
 * @param stations {String}  站点， ps: 1,2,3,4
 * @param direction {String} 方向： up: 上行; domn: 下行;
 */
export const toBusSectionNoString = (stations, direction) => {
    let array = stations.split(',');
    let str = '';
    array = array.map((v) => {
        return parseInt(v);
    });
    array = array.sort(function(a,b) { return a-b; });
    array.forEach((v, idx, obj) => {
        if (idx !== obj.length - 1) {
            if (direction === 'up') {
                str += `${v}-${obj[idx + 1]},`;
            }
            else if (direction === 'down') {
                str += `${obj[idx + 1]}-${v},`;
            }
            else {
                str += `${v}-${obj[idx + 1]},`;
                str += `${obj[idx + 1]}-${v},`;
            }
        }
    });
    if (str.length > 0) {
        str = str.substr(0, str.length - 1);
    }
    return str;
};

/**
 * 判断是否是优先接驳站点
 * @param stationId
 * @param stationIds
 * @param direction
 * @return {Boolean}
 */
export const isPriorityStation = (stationId, stationIds, effectStationIds , direction) => {
    if (stationIds.indexOf(stationId) === -1) return false;
    let effectStationIds_array = effectStationIds.split(',');
    effectStationIds_array = effectStationIds_array.map((v) => {
        return parseInt(v);
    });
    effectStationIds_array = effectStationIds_array.sort(function(a,b) { return a-b; });

    if (direction === '0') {
        return !(stationId === (effectStationIds_array[effectStationIds_array.length -1] + ''));
    }
    else {
        return !(stationId === (effectStationIds_array[0] + ''));
    }
};