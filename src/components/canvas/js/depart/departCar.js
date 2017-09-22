import lineData from '../lineData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZRect from 'zrender/lib/graphic/shape/Rect';
import ZImage from 'zrender/lib/graphic/Image';
import ZText from 'zrender/lib/graphic/Text';

var shapeList = [];
// const runTime = [2, 2, 2, 2, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 2, 1.5, 3.5, 3, 1.5, 1.2, 1.5, 1.5, 1.5, 2, 1.5, 2, 1];

var upCar = function(zr, car) {
    var p = [0, 0];

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 8
        },
        style: {
            fill: '#CC3333',
            lineWidth: 0,
            // stroke: '#CC3333',
            shadowBlur: 10,
            shadowColor: '#CC3333'
        }
    });

    var rect = new ZRect({
        shape: {
            r: 1,
            x: p[0] - 25,
            y: p[1] - 6 + 16,
            width: 50,
            height: 12
        },
        style: {
            lineWidth: 0,
            fill: '#CC9900'
        }
    });
    rect.hide();

    // lineData.stationList.forEach(function (val, index, attr) {
    for(var index = 0; index < lineData.stationList.length; index++ ) {
        var val = lineData.stationList[index];
        var attr = lineData.stationList;

        if (car.Station_ID == 130 && car.type == 0) {
            if (!val.jump) continue;
        }

        if (val.station_ID == car.Station_ID) {
            if (car.type == 1 || car.type == 2 || car.type == 3) {
                p = [val.sPoint.x, val.sPoint.y];

                if (car.type == 2) {
                    rect.position = [val.zPoint.x, val.zPoint.y];
                    rect.show();
                }

                if (car.type == 1 || car.type == 3) {
                    circle.animate('style', true).when(300, {
                        fill: '#339933',
                        shadowColor: '#339933'
                    }).done(function () {
                    }).start('linear', false);
                }

            } else {
                p = [(val.sPoint.x + attr[index + 1].sPoint.x) / 2, val.sPoint.y];
            }
            break;
        }
    };

    circle.position = p;

    circle.on('mouseover', function () {
        circle.hide();
    });
    circle.on('mouseout', function () {
        circle.show();
    });

    shapeList.push(circle);
    shapeList.push(rect);
    zr.add(circle);
    zr.add(rect);
}

var downCar = function(zr, car) {
    var p = [0, 0];

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 8
        },
        style: {
            fill: '#CC3333',
            lineWidth: 0,
            // stroke: '#CC3333',
            shadowBlur: 10,
            shadowColor: '#CC3333'
        }
    });

    var rect = new ZRect({
        shape: {
            r: 1,
            x: p[0] - 25,
            y: p[1] - 6 - 16,
            width: 50,
            height: 12
        },
        style: {
            lineWidth: 0,
            fill: '#CC9900'
        }
    });
    rect.hide();

    // lineData.stationList.forEach(function (val, index, attr) {
    for(var index = 0; index < lineData.stationList.length; index++ ) {
        var val = lineData.stationList[index];
        var attr = lineData.stationList;

        // if (car.Station_ID == 130 && car.type == 0) {
        //     if (!val.jump) continue;
        // }

        if (val.station_ID == car.Station_ID) {
            if (car.type == 1 || car.type == 2 || car.type == 3) {
                p = [val.xPoint.x, val.xPoint.y];

                if (car.type == 2) {
                    rect.position = [val.zPoint.x, val.zPoint.y];
                    rect.show();
                }

                if (car.type == 1 || car.type == 3) {
                    circle.animate('style', true).when(300, {
                        fill: '#339933',
                        shadowColor: '#339933'
                    }).done(function () {
                    }).start('linear', false);
                }

            } else {

                p = [(val.xPoint.x + attr[index - 1].xPoint.x) / 2, val.xPoint.y];
            }
            break;
        }
    };

    circle.position = p;

    circle.on('mouseover', function () {
        circle.hide();
    });
    circle.on('mouseout', function () {
        circle.show();
    });
    shapeList.push(circle);
    shapeList.push(rect);
    zr.add(circle);
    zr.add(rect);
}



var clearCar = function(zr) {

};

var car = function (zr, car) {
    shapeList = [];
    if (car.direction == 0) {
        upCar(zr,car);
    }
    else if(car.direction == 1) {
        downCar(zr,car);
    }
    // console.dir(shapeList);
    return shapeList;
};

export default car;