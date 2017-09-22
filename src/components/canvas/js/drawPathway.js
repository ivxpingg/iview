/**
 * 绘制1号线线路底图
 */

import lineData from './lineData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZLine from 'zrender/lib/graphic/shape/Line';
import ZRect from 'zrender/lib/graphic/shape/Rect';
var _c_orgin;


/**
 * 绘制站点
 * @param zr
 */
var drawStation = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var zPoint_x  = val.zPoint.x + _c_orgin[0];
        var zPoint_y  = val.zPoint.y + _c_orgin[1];

        zr.add(new ZCircle({
            position: [zPoint_x, zPoint_y],
            shape: {
                cx: 0,
                cy: 0,
                r: 4
            },
            style: {
                fill: '#fff',
                lineWidth: 2,
                stroke: '#222'
            }
        }))
    });
};

/**
 * 绘制线路
 * @param zr
 */
var drawLine = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var zPoint_x  = val.zPoint.x + _c_orgin[0];
        var zPoint_y  = val.zPoint.y + _c_orgin[1];

        // 站点连线
        if( num > 0 ) {
            zr.add(new ZLine({
                shape: {
                    x1: attr[num - 1].zPoint.x + _c_orgin[0],
                    y1: attr[num - 1].zPoint.y + _c_orgin[1],
                    x2: zPoint_x,
                    y2: zPoint_y
                },
                style: {
                    stroke: 'green',
                    lineWidth: 2,
                    lineCap: 'round',
                    lineJoin: 'round'
                }
            }));
        }

    });
};

/**
 * 绘制上行线
 * @param zr
 */
var drawUpLine = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var sPoint_x  = val.sPoint.x + _c_orgin[0];
        var sPoint_y  = val.sPoint.y + _c_orgin[1];

        if(val.station_ID === 130 && val.jump) {}
        else {
            // 站点连线
            if( num > 0 ) {
                zr.add(new ZLine({
                    shape: {
                        x1: attr[num - 1].sPoint.x + _c_orgin[0],
                        y1: attr[num - 1].sPoint.y + _c_orgin[1],
                        x2: sPoint_x,
                        y2: sPoint_y
                    },
                    style: {
                        stroke: '#0066CC',
                        lineWidth: 2,
                        lineCap: 'round',
                        lineJoin: 'round'
                    }
                }));
            }
        }
    });
};

/**
 * 绘制下行线路
 * @param zr
 */
var drawDownLine = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var xPoint_x  = val.xPoint.x + _c_orgin[0];
        var xPoint_y  = val.xPoint.y + _c_orgin[1];
        if(val.station_ID === 130 && val.jump) {}
        else {
            // 站点连线
            if (num > 0) {
                zr.add(new ZLine({
                    shape: {
                        x1: attr[num - 1].xPoint.x + _c_orgin[0],
                        y1: attr[num - 1].xPoint.y + _c_orgin[1],
                        x2: xPoint_x,
                        y2: xPoint_y
                    },
                    style: {
                        stroke: '#0066CC',
                        lineWidth: 2,
                        lineCap: 'round',
                        lineJoin: 'round'
                    }
                }));
            }
        }

    });
};

/**
 * 绘制站点名称
 * @param zr
 */
var drawStationName = function(zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var tPoint_x  = val.tPoint.x + _c_orgin[0];
        var tPoint_y  = val.tPoint.y + _c_orgin[1] - 7;
        // 站点名称
        if(val.station_ID === 130 && val.jump) {}
        else {
            zr.add(new ZText({
                style: {
                    text: val.station_Name,
                    x: tPoint_x,
                    y: tPoint_y,
                    textFont: '14px Arial',
                    // opacity: 0.4,
                    textFill: '#CC6633',
                    fontWeight: 'bold',
                    textAlign: 'center',

                }
            }));
        }
    });
};

/**
 * 绘制上行和下行车站
 */

var drawStation = function (zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var zPoint_x  = val.zPoint.x + _c_orgin[0];
        var zPoint_y  = val.zPoint.y + _c_orgin[1];

        if(val.station_ID === 130 && val.jump) {}
        else {
            // 上行
            zr.add(new ZRect({
                shape: {
                    r: 1,
                    x: zPoint_x - 25,
                    y: zPoint_y - 2 + 25,
                    width: 50,
                    height: 4
                },
                style: {
                    lineWidth: 0,
                    fill: '#009933'
                }
            }));

            zr.add(new ZRect({
                shape: {
                    r: 1,
                    x: zPoint_x - 25,
                    y: zPoint_y - 6 + 16,
                    width: 50,
                    height: 12
                },
                style: {
                    lineWidth: 0,
                    fill: '#0066CC'
                }
            }));

            // 下行
            zr.add(new ZRect({
                shape: {
                    r: 1,
                    x: zPoint_x - 25,
                    y: zPoint_y - 2 - 25,
                    width: 50,
                    height: 4
                },
                style: {
                    lineWidth: 0,
                    fill: '#009933'
                }
            }));

            zr.add(new ZRect({
                shape: {
                    r: 1,
                    x: zPoint_x - 25,
                    y: zPoint_y - 6 - 16,
                    width: 50,
                    height: 12
                },
                style: {
                    lineWidth: 0,
                    fill: '#0066CC'
                }
            }));
        }

    });
};

/**
 * 绘制列车上行线
 */
var drawSLine = function (zr) {
    lineData.stationList.forEach(function ( val, num, attr ) {
        var sPoint_x  = val.sPoint.x + _c_orgin[0];
        var sPoint_y  = val.sPoint.y + _c_orgin[1];

        // 站点连线
        if( num > 0 ) {
            zr.add(new ZLine({
                shape: {
                    x1: attr[num - 1].sPoint.x + _c_orgin[0],
                    y1: attr[num - 1].sPoint.y + _c_orgin[1],
                    x2: sPoint_x,
                    y2: sPoint_y
                },
                style: {
                    stroke: '#999',
                    lineWidth: 1,
                    lineCap: 'round',
                    lineJoin: 'round'
                }
            }));
        }

    });
};



/**
 *
 * @param zr {module:zrender/ZRender} zr
 * @param orgin 画布计算的原点偏移量
 */

var drawPathWay = function (zr, orgin) {

    _c_orgin = orgin || [0, 0];

    drawStationName(zr);

    // drawLine(zr);

    drawStation(zr);

    drawUpLine(zr);
    drawDownLine(zr);

    drawStation(zr);

}

export default drawPathWay;