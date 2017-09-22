import ZRender from 'zrender';
import scrollScale from './scrollScale';
import startDrag from './drag';
import drawPathway from './drawPathway';

import departCar from './depart/departCar';
import planData from './depart/planData';

const orgin = [0, 0];
// const orgin = [-900, 1400];


var car = function (zr, data) {
    var shapeList = [];

    if (data.direction == 0) {
        setInterval( function () {
            shapeList.forEach(function (val) {
                zr.remove(val);
            });

            shapeList = departCar(zr, data);

            if (data.type == 0) {
                data.Station_ID = data.Station_ID + 10;
            }
            else if(data.Station_ID == 240 && data.type == 2) {
                data.Station_ID = 10;
                data.type = 1;
            }
            else {

            }

            data.type = (data.type + 1) % 4;

        }, 1000);
    } else {
        setInterval( function () {
            shapeList.forEach(function (val) {
                zr.remove(val);
            });
            shapeList = departCar(zr, data);
            if (data.type == 0) {
                data.Station_ID = data.Station_ID - 10;
            }
            else if(data.Station_ID == 10 && data.type == 2) {
                data.Station_ID = 240;
                data.type = 1;
            }
            else {

            }

            data.type = (data.type + 1) % 4;

        }, 1000);
    }

}


var main = function() {

    var zr = ZRender.init(document.querySelector("#canvas"));

    var canvas = document.querySelector('#canvas');

    scrollScale(canvas, 0.1, 10, 0.3);
    startDrag(canvas,canvas,null);

    drawPathway(zr, orgin);

   // departCar(zr, planData.down[0]);

    var time1 = 0;
    planData.up.forEach(function (val) {
        setTimeout(function () {
            new car(zr, val);
        }, time1)
        time1 += 9000;
    });

    var time2 =0;
    planData.down.forEach(function (val) {
        setTimeout(function () {
            new car(zr, val);
        }, time2)
        time2 += 9000;
    });

    // setInterval( function () {
    //     shapeList.forEach(function (val) {
    //         zr.remove(val);
    //     });
    //
    //     shapeList = departCar(zr, planData.up[0]);
    //
    //     if (planData.up[0].type == 0) {
    //         planData.up[0].Station_ID = planData.up[0].Station_ID + 10;
    //     }
    //     else if(planData.up[0].Station_ID == 240 && planData.up[0].type == 2) {
    //         planData.up[0].Station_ID = 10;
    //         planData.up[0].type = 1;
    //     }
    //     else {
    //
    //     }
    //
    //     planData.up[0].type = (planData.up[0].type + 1) % 4;
    //
    // }, 1000);
    //
    // setInterval( function () {
    //     shapeList.forEach(function (val) {
    //         zr.remove(val);
    //     });
    //     shapeList = departCar(zr, planData.down[0]);
    //     if (planData.down[0].type == 0) {
    //         planData.down[0].Station_ID = planData.down[0].Station_ID - 10;
    //     }
    //     else if(planData.down[0].Station_ID == 10 && planData.down[0].type == 2) {
    //         planData.down[0].Station_ID = 240;
    //         planData.down[0].type = 1;
    //     }
    //     else {
    //
    //     }
    //
    //     planData.down[0].type = (planData.down[0].type + 1) % 4;
    //
    // }, 1000);


}

export default main;