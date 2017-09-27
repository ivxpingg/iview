import ZRender from 'zrender';
import scrollScale from './scrollScale';
import startDrag from './drag';
import drawPathway from './drawPathway';
import Util from '../../../libs/util';
import departCar from './depart/departCar';


var main = function() {
    var shapeList = [];
    var sTime = '2017-09-27 14:50:00';

    var zr = ZRender.init(document.querySelector("#canvas"));

    var canvas = document.querySelector('#canvas');

    scrollScale(canvas, 0.1, 10, 0.3);
    startDrag(canvas,canvas,null);

    drawPathway(zr);



    //
    // var car0 = {
    //     Section_Name: "杏锦路站",
    //     Station_ID : "240",
    //     destination_id: "10",
    //     direction: "0",
    //     id : 27,
    //     time : 1506494470000,
    //     train_cnt: "10",
    //     train_service_number:"00101",
    //     train_unit_number:"0",
    //     type: "0"
    // };
    // var car2 = {
    //     Section_Name: "杏锦路站",
    //     Station_ID : "240",
    //     destination_id: "10",
    //     direction: "0",
    //     id : 27,
    //     time : 1506494470000,
    //     train_cnt: "10",
    //     train_service_number:"00101",
    //     train_unit_number:"0",
    //     type: "2"
    // };
    //
    // for (var i = 10; i < 250; ) {
    //
    //     car0.Station_ID = i;
    //     car2.Station_ID = i;
    //
    //     car0.train_service_number = i;
    //     car2.train_service_number = i;
    //
    //     departCar(zr, car0);
    //     departCar(zr, car2);
    //     i = i + 10;
    // }
    //
    // return;


    var forCar = function (list) {
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
            console.dir(data.result);
            forCar(data.result);
        }).catch(function (err) {

        });
    } ,3000);

}

export default main;