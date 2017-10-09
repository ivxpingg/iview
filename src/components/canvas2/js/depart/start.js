import departCarMove from './departCarMove';
import data from './data';
import Util from '../../../../libs/util';
import baseData from '../lineData';

var zr; // zrender 对象
/**
 * 存放动车实时位置信息。以动车车次号为键
 * @type {{}}
 */
var trainDataList = {};
var oldTrainDataList = {};
var trainCanvasList = {};
var lineData = baseData.stationList;

var sTime = '2017-09-27 14:50:00';

/**
 * 获取数据
 * @param delay： 延迟时间（ms）
 */

var setAnimation = function (oVal, nVal) {
    var start = 0,
        end = 0;
    if (oVal.type == nVal.type && oVal.Station_ID == nVal.Station_ID ) return;

    if(nVal.type == 0) {
        if (nVal.direction == 1) { // 下行
            var extra1 = false;
            for (var i = lineData.length - 1; i >= 0; i--) {
                if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                    extra1 = true;
                }

                if (extra1 && lineData[i].onTheWay) {
                    trainCanvasList[nVal.train_service_number].train.position = [lineData[i].xPoint.x, lineData[i].xPoint.y];
                    trainCanvasList[nVal.train_service_number].rect.position = [lineData[i].xServerPoint.x, lineData[i].xServerPoint.y];
                    trainCanvasList[nVal.train_service_number].text.position = [lineData[i].xServerPoint.x, lineData[i].xServerPoint.y];
                    break;
                }
            }
        }
        else {
            var extra2 = false;
            for (var i = 0; i < lineData.length; i++) {
                if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                    extra2 = true;
                }

                if (extra2 && lineData[i].onTheWay) {
                    trainCanvasList[nVal.train_service_number].train.position = [lineData[i].sPoint.x, lineData[i].sPoint.y];
                    trainCanvasList[nVal.train_service_number].rect.position = [lineData[i].sServerPoint.x, lineData[i].sServerPoint.y];
                    trainCanvasList[nVal.train_service_number].text.position = [lineData[i].sServerPoint.x, lineData[i].sServerPoint.y];
                    break;
                }
            }
        }
    }
    else if (nVal.type == 1) { // 进站
        if (nVal.direction == 1) { // 下行
            for (var i = lineData.length - 1; i >= 0; i--) {
               if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                   end = i;
                   break;
               }
               else if (lineData[i].onTheWay) {
                   start = i;
               }
            }

            trainCanvasList[nVal.train_service_number].train.position = [lineData[start].xPoint.x, lineData[start].xPoint.y];
            trainCanvasList[nVal.train_service_number].rect.position = [lineData[start].xServerPoint.x, lineData[start].xServerPoint.y];
            trainCanvasList[nVal.train_service_number].text.position = [lineData[start].xServerPoint.x, lineData[start].xServerPoint.y];
            for (start; start > end; start--) {
                trainCanvasList[nVal.train_service_number].train.animate('',false).when(2000, {
                    position: [lineData[start - 1].xPoint.x, lineData[start - 1].xPoint.y]
                }).start();
                trainCanvasList[nVal.train_service_number].rect.animate('',false).when(2000, {
                    position: [lineData[start - 1].xServerPoint.x, lineData[start - 1].xServerPoint.y]
                }).start();
                trainCanvasList[nVal.train_service_number].text.animate('',false).when(2000, {
                    position: [lineData[start - 1].xServerPoint.x, lineData[start - 1].xServerPoint.y]
                }).start();
            }

        } else {
           for (var i = 0; i < lineData.length; i++) {
               if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                   end = i;
                   break;
               }
               else if (lineData[i].onTheWay) {
                   start = i;
               }
           }

            trainCanvasList[nVal.train_service_number].train.position = [lineData[start].sPoint.x, lineData[start].sPoint.y];
            trainCanvasList[nVal.train_service_number].rect.position = [lineData[start].sServerPoint.x, lineData[start].sServerPoint.y];
            trainCanvasList[nVal.train_service_number].text.position = [lineData[start].sServerPoint.x, lineData[start].sServerPoint.y];
            for (start; start < end; start++) {
                trainCanvasList[nVal.train_service_number].train.animate('',false).when(2000, {
                    position: [lineData[start + 1].sPoint.x, lineData[start + 1].sPoint.y]
                }).start();
                trainCanvasList[nVal.train_service_number].rect.animate('',false).when(2000, {
                    position: [lineData[start + 1].sServerPoint.x, lineData[start + 1].sServerPoint.y]
                }).start();
                trainCanvasList[nVal.train_service_number].text.animate('',false).when(2000, {
                    position: [lineData[start + 1].sServerPoint.x, lineData[start + 1].sServerPoint.y]
                }).start();
            }
        }
    }
    else if(nVal.type == 2) {
        if (nVal.direction == 1) { // 下行
            for (var i = lineData.length - 1; i >= 0; i--) {
                if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                    trainCanvasList[nVal.train_service_number].train.position = [lineData[i].xPoint.x, lineData[i].xPoint.y];
                    trainCanvasList[nVal.train_service_number].rect.position = [lineData[i].xServerPoint.x, lineData[i].xServerPoint.y];
                    trainCanvasList[nVal.train_service_number].text.position = [lineData[i].xServerPoint.x, lineData[i].xServerPoint.y];
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < lineData.length; i++) {
                if (lineData[i].station_ID == nVal.Station_ID && lineData[i].isStation) {
                    trainCanvasList[nVal.train_service_number].train.position = [lineData[i].sPoint.x, lineData[i].sPoint.y];
                    trainCanvasList[nVal.train_service_number].rect.position = [lineData[i].sServerPoint.x, lineData[i].sServerPoint.y];
                    trainCanvasList[nVal.train_service_number].text.position = [lineData[i].sServerPoint.x, lineData[i].sServerPoint.y];
                    break;
                }
            }
        }
    }
    else if(nVal.type == 3) {
        if (nVal.direction == 1) { // 下行

        }
        else { // 上行

        }
    }
}



// 处理数据
var handleData = function (list) {
    var trainDataList2 = {},
        oldTrainDataList2 = {};

    list.forEach(function (val) {
        if (!trainDataList[val.train_service_number]) {
            trainDataList2[val.train_service_number] = val;
            trainCanvasList[val.train_service_number] = departCarMove(zr, val);
        } else {
            setAnimation(trainDataList[val.train_service_number], val);
            oldTrainDataList2[val.train_service_number] = trainDataList[val.train_service_number];
            trainDataList2[val.train_service_number] = val;
        }
    });

    // 移除不存在的动车
    for(o in trainDataList) {
        if (!trainDataList2[o]) {
            zr.remove(trainCanvasList[o].train);
            zr.remove(trainCanvasList[o].rect);
            zr.remove(trainCanvasList[o].text);
            delete trainCanvasList[o];
        }
    }
    trainDataList = trainDataList2;
    oldTrainDataList = oldTrainDataList2;
};


// 本地模拟获取数据
var testGetData = function (idx) {
    return data[idx];
};

var getData = function (delay) {
    var d = new Date(sTime);

    d = new Date(d.getTime() + 10000);

    var Y = d.getFullYear();
    var M = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    var D =  d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

    var h = d.getHours() < 9 ? '0' + d.getHours()  : d.getHours();
    var m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    sTime = Y + '-' + M + '-' + D + ' '
        + h + ':' + m + ':' + s;

    setTimeout(function () {
        Util.ajax.get('/run/getTrainPosition', {
            params: {
                time: sTime
            }
        }).then(function (data) {
            handleData(data.result);
            getData(1000);
        }).catch(function (err) {

        });
    }, delay);
};

var start = function (z, v) {
    zr = z;

    getData(0);



    // var sTime = '2017-09-27 14:50:00';
    //
    // Util.ajax.get('/run/getTrainPosition', {
    //     params: {
    //         time: sTime
    //     }
    // }).then(function (data) {
    //
    //     handleData(data.result);
    //
    // }).catch(function (err) {
    //
    // });
    // setInterval(function () {
    //     var d = new Date(sTime);
    //
    //     d = new Date(d.getTime() + 20000);
    //
    //     var Y = d.getFullYear();
    //     var M = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    //     var D =  d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    //
    //     var h = d.getHours() < 9 ? '0' + d.getHours()  : d.getHours();
    //     var m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    //     var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    //
    //     sTime = Y + '-' + M + '-' + D + ' '
    //         + h + ':' + m + ':' + s;
    //
    //     Util.ajax.get('/run/getTrainPosition', {
    //         params: {
    //             time: sTime
    //         }
    //     }).then(function (data) {
    //         // console.log(JSON.stringify(data.result));
    //
    //         handleData(data.result);
    //     }).catch(function (err) {
    //
    //     });
    // } , 1000);

};

export default start;