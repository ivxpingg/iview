/**
 * 绘制1号线线路底图
 */

import lineData from './lineData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZLine from 'zrender/lib/graphic/shape/Line';
// import ZRect from 'zrender/lib/graphic/shape/Rect';

var vm;

// 绘制站点名称
var drawStationName = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        if (val.isStation) {
            var tPoint_x  = val.tPoint.x;
            var tPoint_y  = val.tPoint.y;
            var de = val.rotate * Math.PI / 180;

            var text = new ZText({
                style: {
                    text: val.station_Name,
                    x: tPoint_x,
                    y: tPoint_y,
                    textFont: '14px Arial',
                    // opacity: 0.4,
                    textFill: '#ed7924',
                    fontWeight: 'bold',
                    // textHeight: 300,
                    // textWidth: 12,
                    textAlign: 'left',
                    // textVerticalAlign: 'middle'
                },

                // rotation: de,
                // origin: [tPoint_x,tPoint_y]
            });
            text.on('click', function (e) {

                var canvas_offsetX = e.offsetX * vm.scale,
                    canvas_offsetY = e.offsetY * vm.scale,
                    canvas_offsetLeft = document.querySelector("#canvas").offsetLeft,
                    canvas_offsetTop = document.querySelector("#canvas").offsetTop;


                vm.stationName = val.station_Name;
                vm.stationPopupShow([canvas_offsetX + canvas_offsetLeft, canvas_offsetY + canvas_offsetTop]);
            });


            zr.add(text);
        }
    });
};

// 站点连线
var drawLine = function (zr) {
    lineData.stationList.forEach(function (val, index, attr) {
        if(val.isStation || val.isCorner) {
            var zPoint_x  = val.zPoint.x;
            var zPoint_y  = val.zPoint.y;
            var x1, y1;
            if (index > 0) {

                for (var i = index - 1; i >= 0; i--) {
                    if (attr[i].isStation || attr[i].isCorner) {
                        x1 = attr[i].zPoint.x;
                        y1 = attr[i].zPoint.y;
                        break;
                    }
                }

                zr.add(new ZLine({
                    shape: {
                        x1: x1, //attr[index - 1].zPoint.x,
                        y1: y1, // attr[index - 1].zPoint.y,
                        x2: zPoint_x,
                        y2: zPoint_y
                    },
                    style: {
                        stroke: '#ed7924',
                        lineWidth: 6,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));
            }
        }

    });
};

// 绘制站点
var drawStation = function (zr) {
    lineData.stationList.forEach(function (val, index, attr) {

        if (val.isStation) {
            var zPoint_x = val.zPoint.x;
            var zPoint_y = val.zPoint.y;

            var r =  val.station_ID == 10 || val.station_ID == 240 ? 8 : 5;

            zr.add(new ZCircle({
                position: [zPoint_x, zPoint_y],
                shape: {
                    cx: 0,
                    cy: 0,
                    r: r
                },
                style: {
                    fill: '#FFF',
                    lineWidth: 2,
                    stroke: '#ed7924'
                }
            }))
        }
    });

}

// 绘制上行线
var drawUpline = function (zr) {
    lineData.stationList.forEach(function (val, index, attr) {
        if(val.isStation || val.isCorner) {
            var Point_x  = val.sPoint.x;
            var Point_y  = val.sPoint.y;
            var x1, y1;

            if (index > 0) {

                for (var i = index - 1; i >= 0; i--) {
                    if (attr[i].isStation || attr[i].isCorner) {
                        x1 = attr[i].sPoint.x;
                        y1 = attr[i].sPoint.y;
                        break;
                    }
                }

                zr.add(new ZLine({
                    shape: {
                        x1: x1,
                        y1: y1,
                        x2: Point_x,
                        y2: Point_y
                    },
                    style: {
                        stroke: '#ed7924',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));
            }
        }

    });
};
// 绘制下行线
var drawDownline = function (zr) {
    lineData.stationList.forEach(function (val, index, attr) {
        if(val.isStation || val.isCorner) {
            var Point_x  = val.xPoint.x;
            var Point_y  = val.xPoint.y;
            var x1, y1;
            if (index > 0) {

                for (var i = index - 1; i >= 0; i--) {
                    if (attr[i].isStation || attr[i].isCorner) {
                        x1 = attr[i].xPoint.x;
                        y1 = attr[i].xPoint.y;
                        break;
                    }
                }

                zr.add(new ZLine({
                    shape: {
                        x1: x1,
                        y1: y1,
                        x2: Point_x,
                        y2: Point_y
                    },
                    style: {
                        stroke: '#ed7924',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));
            }
        }

    });
};


var onTheWay = function (zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {

        if (val.onTheWay) {
            zr.add(new ZCircle({
                position: [val.sPoint.x, val.sPoint.y],
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 3
                },
                style: {
                    fill: 'green',
                    lineWidth: 0,
                    // stroke: '#ed7924'
                }
            }));

            zr.add(new ZCircle({
                position: [val.xPoint.x, val.xPoint.y],
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 3
                },
                style: {
                    fill: 'green',
                    lineWidth: 0,
                    // stroke: '#ed7924'
                }
            }));
        }

    });
}

var drawPathWay = function (zr, v) {
    vm = v;
    drawStationName(zr);
    drawLine(zr);
    drawUpline(zr);
    drawDownline(zr);
    drawStation(zr);

    // onTheWay(zr);


}

export default drawPathWay;