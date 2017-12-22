/**
 * Created by sgj on 2017-12-13.
 */
/**
 * 用于设置列车在区段运行的位置等信息，包含 列车位置、文本位置、运行时间、是否是拐角、是否是站点位置。
 */
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZImage from 'zrender/lib/graphic/Image';
import trainConfig from '../../subwayLines/js/trainConfig';
import car_up_url from '../images/car-up-small.png';
import car_down_url from '../images/car-down-small.png';

var vm,
    zr;

/**
 *
 * @param data
 * {
            section_name: 'G010804',
            station_Id: '08',
            section_Id: '04',
            section_point: {
                x: 1200.5,
                y: 1376.5
            },
            text_point: {
                x: 1206,
                y: 1399
            },
            is_station: true,
            is_corner: false,
            run_time: 3000,
        }
 */
var upCar = function(data) {
    var shapeList = [];
    var p = [data.section_point.x, data.section_point.y];   // 动车的位置
    // var tp = [data.text_point.x, data.text_point.y];  // 动车服务号位置
    var p_car, p_text;
    p_car = [data.text_point.x, data.text_point.y];  // 动车服务号位置
    p_text = [data.text_point.x, data.text_point.y + trainConfig.CAR_HEIGHT];


    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 3
        },
        style: {
            fill: '#aaa',
            lineWidth: 0
        },
        // draggable: true
    });

    var zImage = new ZImage({
        position: p_car,
        style: {
            image: trainConfig.UP.IMG_URL,
            width: trainConfig.CAR_WIDTH,
            height: trainConfig.CAR_HEIGHT
        }
    });

    var text = new ZText({
        position: p_text,
        style: {
            text: data.section_name,
            textFont: '12px Arial',

            textPadding: [3, 0],

            textFill: trainConfig.UP.TEXT_COLOR,
            fontWeight: 'bold',
            textAlign: 'left'
        }
    });


    shapeList.push(circle);
    shapeList.push(zImage);
    shapeList.push(text);
    zr.add(circle);
    zr.add(text);
    zr.add(zImage);

    return shapeList;
}

var downCar = function(data) {
    var shapeList = [];
    var p = [data.section_point.x, data.section_point.y];   // 动车的位置

    var p_car, p_text;
    p_car = [data.text_point.x , data.text_point.y];  // 动车服务号位置
    p_text = [data.text_point.x , data.text_point.y + trainConfig.CAR_HEIGHT];

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 3
        },
        style: {
            fill: '#aaa',
            lineWidth: 0
        },
        // draggable: true
    });

    var zImage = new ZImage({
        position: p_car,
        style: {
            image: trainConfig.DOWN.IMG_URL,
            width: trainConfig.CAR_WIDTH,
            height: trainConfig.CAR_HEIGHT,
        }
    });


    var text = new ZText({
        position: p_text,
        style: {
            text: data.section_name,
            textFont: '12px Arial',

            textPadding: [3, 0],

            textFill: trainConfig.DOWN.TEXT_COLOR,
            fontWeight: 'bold',
            textAlign: 'left'
        }
    });

    shapeList.push(circle);
    shapeList.push(zImage);
    shapeList.push(text);
    zr.add(circle);
    zr.add(text);
    zr.add(zImage);

    return shapeList;
}


/**
 *
 * @param v  vue 对象
 * @param z zrender对象
 * @list Array
 * @type Int 0: 上行方向, 1: 下行方向
 */
export default function (v, z, list, type) {
    vm = v;
    zr = z;
    if (type == 0) {
        var d;
        for (var i = 0; i < list.length; i++) {
            d = list[i];
            d.station_Id = !!d.station_Id ? d.station_Id :  d.section_name.slice(d.section_name.length - 4, d.section_name.length - 2);
            d.section_Id = !!d.section_Id ? d.section_Id :  d.section_name.slice(d.section_name.length - 2);
            if ( !d.section_point ) {
                d.section_point = {
                    x: 1000,
                    y: 1000
                }
            }
            if ( !d.text_point ) {
                d.text_point = {
                    x: 1000,
                    y: 1000
                }
            }
            d.is_station = !!d.is_station ? d.is_station : false;
            d.is_corner = !!d.is_corner ? d.is_corner : false;
            d.run_time = d.run_time == undefined ? 1000 : d.run_time;

            vm.allUpCanvasDom = vm.allUpCanvasDom.concat(upCar(list[i]));
        }

    }
    else if(type == 1) {
        var dd;
        for (var i = 0; i < list.length; i++) {
            dd = list[i];
            dd.station_Id = !!dd.station_Id ? dd.station_Id :  dd.section_name.slice(dd.section_name.length - 4, dd.section_name.length - 2);
            dd.section_Id = !!dd.section_Id ? dd.section_Id :  dd.section_name.slice(dd.section_name.length - 2);
            if ( !dd.section_point ) {
                dd.section_point = {
                    x: 800,
                    y: 800
                }
            }
            if ( !dd.text_point ) {
                dd.text_point = {
                    x: 800,
                    y: 800
                }
            }
            dd.is_station = !!dd.is_station ? dd.is_station : false;
            dd.is_corner = !!dd.is_corner ? dd.is_corner : false;
            dd.run_time = dd.run_time == undefined ? 1000 : dd.run_time;

            vm.allDownCanvasDom = vm.allDownCanvasDom.concat(downCar(list[i]));
        }
    }
}
