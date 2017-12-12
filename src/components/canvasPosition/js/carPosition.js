/**
 * 用于设置列车在区段运行的位置等信息，包含 列车位置、文本位置、运行时间、是否是拐角、是否是站点位置。
 */
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZRect from 'zrender/lib/graphic/shape/Rect';

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
    var tp = [data.text_point.x, data.text_point.y];  // 动车服务号位置

    var circle = new ZCircle({
        position: p,
        shape: {
            cx: 0,
            cy: 0,
            r: 3
        },
        style: {
            fill: 'green',
            lineWidth: 0
        },
        draggable: true
    });

    circle.on('mouseup', function (e) {

        if (vm.switchLine == '0') {
            vm.upSection.section_point.x = this.position[0];
            vm.upSection.section_point.y = this.position[1];
        }
        else {
            vm.downSection.section_point.x = this.position[0];
            vm.downSection.section_point.y = this.position[1];
        }
    });

    var rect = new ZRect({
        position: tp,
        shape: {
            r: 6,
            width: 50,
            height: 14
        },
        style: {
            lineWidth: 1,
            stroke: 'rgba(0, 153, 51, 1)',
            fill: 'rgba(0, 153, 51, 0.4)'
        },
        draggable: true
    });

    var text = new ZText({
        position: tp,
        style: {
            text: data.section_name,
            textFont: '12px Arial',

            textBackgroundColor: 'rgba(0, 153, 51, 0.6)',
            textBorderColor: 'rgba(0, 153, 51, 1)',
            textBorderWidth: 1,
            textBorderRadius: 10,
            textPadding: [3, 6],
            // opacity: 0.4,
            textRect: {
                x: 10,
                y: 10,
                width: 70,
                textHeight: 30
            },
            // textWidth: 50,
            // textHeight: 20,
            textFill: '#333',
            fontWeight: 'bold',
            textAlign: 'left'
        },
        draggable: true
    });

    text.on('mouseup', function (e) {
        if (vm.switchLine == '0') {
            vm.upSection.text_point.x = this.position[0];
            vm.upSection.text_point.y = this.position[1];
        }
        else {
            vm.downSection.text_point.x = this.position[0];
            vm.downSection.text_point.y = this.position[1];
        }
    });


    // rect.position = tp;
    // text.position = tp;
    // circle.position = p;
    shapeList.push(circle);
    // shapeList.push(rect);
    shapeList.push(text);
    zr.add(circle);
    // zr.add(rect);
    zr.add(text);

    return shapeList;
}

/**
 *
 * @param v  vue 对象
 * @param z zrender对象
 */
export default function (v, z, d) {
    vm = v;
    zr = z;

    return upCar(d);
}
