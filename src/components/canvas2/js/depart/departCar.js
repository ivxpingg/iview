import lineData from '../lineData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZRect from 'zrender/lib/graphic/shape/Rect';

var zr;
var shapeList = [];


var upCar = function (car) {
    var p = [0, 0];
    var tp = [0, 0];

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 3
        },
        style: {
            fill: 'green',
            lineWidth: 0,
            // fill: '#CC3333',
            // lineWidth: 0,
            // // stroke: '#CC3333',
            // shadowBlur: 10,
            // shadowColor: '#CC3333'
        }
    });

    var rect = new ZRect({
        shape: {
            r: 6,
            x: tp[0],
            y: tp[1],
            width: 50,
            height: 14
        },
        style: {
            lineWidth: 1,
            stroke: 'rgba(0, 153, 51, 1)',
            fill: 'rgba(0, 153, 51, 0.4)'
        }
    });

    var text = new ZText({
        style: {
            text: car.train_service_number,
            x: tp[0] + 8,
            y: tp[1] + 1,
            textFont: '12px Arial',
            // opacity: 0.4,
            textWidth: 50,
            textFill: '#333',
            fontWeight: 'bold',
            textAlign: 'left'
        }
    });


   for( var i = 0; i < lineData.stationList.length; i++ ) {
       var val = lineData.stationList[i];
       if (car.Station_ID == val.station_ID) {
           if (car.type == 0 && val.onTheWay) {
               p = [val.sPoint.x, val.sPoint.y];
               tp = [val.sServerPoint.x, val.sServerPoint.y];
               break;
           }
           else if (car.type == 1 && val.isStation) {
               p = [val.sPoint.x, val.sPoint.y];
               tp = [val.sServerPoint.x, val.sServerPoint.y];
               circle.animate('style', true).when(300, {
                   fill: 'rgba(0, 153, 51, 0)'
               }).start();

               break;
           }
           else if (car.type == 2 && val.isStation) {
               p = [val.sPoint.x, val.sPoint.y];
               tp = [val.sServerPoint.x, val.sServerPoint.y];
               break;
           }
           else if (car.type == 3 && val.isStation) {
               p = [val.sPoint.x, val.sPoint.y];
               tp = [val.sServerPoint.x, val.sServerPoint.y];
               circle.animate('style', true).when(300, {
                   fill: 'rgba(0, 153, 51, 0)'
               }).start();
               break;
           }
       }
   }

   rect.position = tp;
   text.position = tp;
   circle.position = p;
    shapeList.push(circle);
    shapeList.push(rect);
    shapeList.push(text);
    zr.add(circle);
    zr.add(rect);
    zr.add(text);
};

var downCar = function (car) {

    var p = [0, 0];
    var tp = [0, 0];

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 3
        },
        style: {
            fill: 'rgba(0, 153, 51, 1)',
            lineWidth: 0,
            // fill: '#CC3333',
            // lineWidth: 0,
            // // stroke: '#CC3333',
            // shadowBlur: 3,
            // shadowColor: '#CC3333'
        }
    });
    var rect = new ZRect({
        shape: {
            r: 6,
            x: tp[0],
            y: tp[1],
            width: 50,
            height: 14
        },
        style: {
            lineWidth: 1,
            stroke: 'rgba(0, 153, 51, 1)',
            fill: 'rgba(0, 153, 51, 0.4)'
        }
    });

    var text = new ZText({
        style: {
            text: car.train_service_number,
            x: tp[0] + 8,
            y: tp[1] + 1,
            textFont: '12px Arial',
            // opacity: 0.4,
            textWidth: 50,
            textFill: '#333',
            fontWeight: 'bold',
            textAlign: 'left'
        }
    });
    for( var i = 0; i < lineData.stationList.length; i++ ) {
        var val = lineData.stationList[i];

        if (car.Station_ID == (val.station_ID + 10)) {
            if (car.type == 0 && val.onTheWay) {
                p = [val.xPoint.x, val.xPoint.y];
                tp = [val.xServerPoint.x, val.xServerPoint.y];
                break;
            }
        }

        if (car.Station_ID == val.station_ID) {

            if (car.type == 1 && val.isStation) {
                p = [val.xPoint.x, val.xPoint.y];
                tp = [val.xServerPoint.x, val.xServerPoint.y];
                circle.animate('style', true).when(300, {
                    fill: 'rgba(0, 153, 51, 0)'
                }).start();
                break;
            }
            else if (car.type == 2 && val.isStation) {
                p = [val.xPoint.x, val.xPoint.y];
                tp = [val.xServerPoint.x, val.xServerPoint.y];
                break;
            }
            else if (car.type == 3 && val.isStation) {
                p = [val.xPoint.x, val.xPoint.y];
                tp = [val.xServerPoint.x, val.xServerPoint.y];
                circle.animate('style', true).when(300, {
                    fill: 'rgba(0, 153, 51, 0)'
                }).start();
                break;
            }
        }
    }
    rect.position = tp;
    text.position = tp;
    circle.position = p;
    shapeList.push(circle);
    shapeList.push(rect);
    shapeList.push(text);
    zr.add(circle);
    zr.add(rect);
    zr.add(text);
}

var car = function (z, car) {
    shapeList = [];

    zr = z;

    if (car.direction == 0) {
        upCar(car);
    }
    else if(car.direction == 1) {
        downCar(car);
    }
    return shapeList;
}

export default car;