import ZRender from 'zrender';
import scrollScale from './scrollScale';
import startDrag from './drag';
import drawPathway from './drawPathway';
import Util from '../../../libs/util';
import departCar from './depart/departCar';

import trainStart from './depart/start';


var main = function(v) {
    var shapeList = [];

    var carList = {};

    var sTime = '2017-09-27 14:50:00';

    var zr = ZRender.init(document.querySelector("#canvas"));

    var canvas = document.querySelector('#canvas');

    scrollScale(v, canvas, 0.1, 10, 0.3);
    startDrag(v, canvas,canvas,null);

    drawPathway(zr, v);

    trainStart(zr, v);
    return;

    var forCar = function (list) {
        shapeList.forEach(function (val) {
            // debugger
            zr.remove(val);
        });
        list.forEach(function (val, index, attr) {
            shapeList.push(departCar(zr, val));
        });
    }

    var forCarMove = function (list) {
        var newCarList = [];

        list.forEach(function (val) {
           if (!carList[val.Station_ID]) {
               carList[val.Station_ID] = val;
           }
        });

        shapeList.forEach(function (val) {
            zr.remove(val);
        });
        list.forEach(function (val, index, attr) {
            shapeList.push(departCar(zr, val));
        });
    }


    Util.ajax.get('/run/getTrainPosition', {
        params: {
            time: sTime
        }
    }).then(function (data) {

       forCar(data.result);

    }).catch(function (err) {

    });

    setInterval(function () {
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

        Util.ajax.get('/run/getTrainPosition', {
            params: {
                time: sTime
            }
        }).then(function (data) {
            console.log(JSON.stringify(data.result));
            forCar(data.result);
        }).catch(function (err) {

        });
    } , 3000);

}

export default main;