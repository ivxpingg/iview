/*
* 绘制1号线线路地图底图
 */
import lineData from './baseData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZLine from 'zrender/lib/graphic/shape/Line';
import ZBezierCurve from 'zrender/lib/graphic/shape/BezierCurve';

var vm, zr;

var baseLine = lineData.baseLine;   // 线路

var drawLines = function () {



    baseLine.forEach(function (val, idx, attr) {
        if ( idx > 0 ) {

            if (!!val.is_bezierCurve) {
                zr.add(new ZBezierCurve({
                    shape: {
                        x1: attr[idx - 1].line_point.x1, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y1, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x1,
                        y2: val.line_point.y1,
                        cpx1: val.bezierCurve_cp_point.x1,
                        cpy1: val.bezierCurve_cp_point.y1,
                    },
                    style: {
                        stroke: 'green',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));

                zr.add(new ZBezierCurve({
                    shape: {
                        x1: attr[idx - 1].line_point.x2, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y2, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x2,
                        y2: val.line_point.y2,
                        cpx1: val.bezierCurve_cp_point.x2,
                        cpy1: val.bezierCurve_cp_point.y2,
                    },
                    style: {
                        stroke: 'green',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));

                zr.add(new ZBezierCurve({
                    shape: {
                        x1: attr[idx - 1].line_point.x3, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y3, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x3,
                        y2: val.line_point.y3,
                        cpx1: val.bezierCurve_cp_point.x3,
                        cpy1: val.bezierCurve_cp_point.y3,
                    },
                    style: {
                        stroke: 'green',
                        lineWidth: 6,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));


                zr.add(new ZBezierCurve({
                    shape: {
                        x1: attr[idx - 1].line_point.x3, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y3, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x3,
                        y2: val.line_point.y3,
                        cpx1: val.bezierCurve_cp_point.x3,
                        cpy1: val.bezierCurve_cp_point.y3,
                    },
                    style: {
                        stroke: 'yellow',
                        lineWidth: 3,
                        lineCap: 'round',
                        lineDash: [5, 10],
                        // lineJoin: 'round'
                    }
                }));
            }
            else {

                zr.add(new ZLine({
                    shape: {
                        x1: attr[idx - 1].line_point.x1, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y1, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x1,
                        y2: val.line_point.y1
                    },
                    style: {
                        stroke: '#e37528',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));

                zr.add(new ZLine({
                    shape: {
                        x1: attr[idx - 1].line_point.x2, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y2, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x2,
                        y2: val.line_point.y2
                    },
                    style: {
                        stroke: '#e37528',
                        lineWidth: 2,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));

                zr.add(new ZLine({
                    shape: {
                        x1: attr[idx - 1].line_point.x3, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y3, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x3,
                        y2: val.line_point.y3
                    },
                    style: {
                        stroke: '#e37528',
                        lineWidth: 6,
                        lineCap: 'round',
                        // lineJoin: 'round'
                    }
                }));

                zr.add(new ZLine({
                    shape: {
                        x1: attr[idx - 1].line_point.x3, //attr[index - 1].zPoint.x,
                        y1: attr[idx - 1].line_point.y3, // attr[index - 1].zPoint.y,
                        x2: val.line_point.x3,
                        y2: val.line_point.y3
                    },
                    style: {
                        stroke: '#FFF',
                        lineWidth: 3,
                        lineCap: 'round',
                        lineDash: [5, 10],
                        // lineJoin: 'round'
                    },
                    zlevel: 2
                }));
            }


        }

        // if (val.is_station) {
        //
        //     var text = new ZText({
        //         style: {
        //             text: val.station_Name,
        //             x: val.text_point.x,
        //             y: val.text_point.y,
        //             textFont: '14px Arial',
        //             textFill: '#ed7924',
        //             fontWeight: 'bold',
        //             textAlign: 'left',
        //         }
        //     });
        //
        //     zr.add(text);
        // }

    });
}

var drawStation = function () {
    baseLine.forEach(function (val, idx, attr) {
        if (val.is_station) {
            var r =  val.station_Name == '镇海路' || val.station_Name == '岩内站' ? 8 : 5;

            zr.add(new ZCircle({
                position: [val.line_point.x3, val.line_point.y3],
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
            }));
        }
    })
}

/**
 *
 * @param v vue 对象
 * @param z zrender 对象
 */
export default function (v, z) {
    vm = v;
    zr = z;

    drawLines();
    // drawStation();
}