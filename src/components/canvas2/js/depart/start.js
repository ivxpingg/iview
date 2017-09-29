import departCarMove from './departCarMove';
import data from './data';
import lineData from '../lineData';

var zr; // zrender 对象
/**
 * 存放动车实时位置信息。以动车车次号为键
 * @type {{}}
 */
var trainDataList = {};
var trainCanvasList = {};

var setAnimation = function (oVal, nVal) {
    if (oVal.type == nVal.type && oVal.Station_ID == nVal.Station_ID ) return;

    if (nVal.type == 1) { // 进站
        if (nVal.direction == 1) { // 下行

        } else {

        }
    }
}

// 处理数据
var handleData = function (list) {
    list.forEach(function (val) {
        if (!trainDataList[val.train_service_number]) {
            trainDataList[val.train_service_number] = val;
            trainCanvasList[val.train_service_number] = departCarMove(val);
        } else {
            setAnimation(trainDataList[val.train_service_number], val);
            trainDataList[val.train_service_number] = val;
        }
    })
};


// 本地模拟获取数据
var testGetData = function (idx) {
    return data[idx];
};


var start = function (z) {
    var zr = z;
    var idx = 0;

    handleData(testGetData(idx));

    setInterval(function() {
        handleData(testGetData(++idx));
    }, 3000)
};

export default start;