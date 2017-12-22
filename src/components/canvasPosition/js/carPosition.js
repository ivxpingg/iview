/**
 * 用于设置列车在区段运行的位置等信息，包含 列车位置、文本位置、运行时间、是否是拐角、是否是站点位置。
 */
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZImage from 'zrender/lib/graphic/Image';

import trainConfig from '../../subwayLines/js/trainConfig';

var vm,
    zr;

var CAR_WIDTH = trainConfig.CAR_WIDTH,
    CAR_HEIGHT = trainConfig.CAR_HEIGHT,
    car_up_url = trainConfig.UP.IMG_URL,
    car_down_url = trainConfig.DOWN.IMG_URL,
    car_text_color = '';


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

    var p_car, p_text;
    if (vm.switchLine == '0') {
        p_car = [data.text_point.x, data.text_point.y];  // 动车服务号位置
        p_text = [data.text_point.x, data.text_point.y + CAR_HEIGHT];
    }
    else {
        p_car = [data.text_point.x, data.text_point.y];  // 动车服务号位置
        p_text = [data.text_point.x, data.text_point.y + CAR_HEIGHT];
    }

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
        draggable: true,
        zlevel: 1
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


    var text = new ZText({
        position: p_text,
        style: {
            text: '00601',//data.section_name,
            textFont: '10px Arial',

            // textBackgroundColor: 'rgba(0, 153, 51, 0.6)',
            // textBorderColor: 'rgba(0, 153, 51, 1)',
            // textBorderWidth: 1,
            // textBorderRadius: 10,
            textPadding: [3, 0],
            // opacity: 0.4,
            // textRect: {
            //     x: 10,
            //     y: 10,
            //     width: 70,
            //     textHeight: 30
            // },
            // textWidth: 50,
            // textHeight: 20,
            textFill: car_text_color,
            fontWeight: 'bold',
            textAlign: 'left'  //vm.switchLine == '0' ? 'left' : 'right'
        },
        draggable: true,
        zlevel: 1
    });

    text.on('mousemove', function (e) {

    });



    var zImage = new ZImage({
        position: p_car,
        style: {
            x: 0,
            y: 0,
            image: car_down_url,
            width: CAR_WIDTH,
            height: CAR_HEIGHT
        },
        draggable: true,
        zlevel: 1
    });

    zImage.on('mousemove', function (e) {

        if (vm.switchLine == '0') {
            vm.upSection.text_point.x = this.position[0];
            vm.upSection.text_point.y = this.position[1];
        }
        else {
            vm.downSection.text_point.x = this.position[0];
            vm.downSection.text_point.y = this.position[1];
        }

        var txtPosition = [0, 0];
        txtPosition = [this.position[0], this.position[1] + CAR_HEIGHT];
        text.position = txtPosition;

         text.dirty();
    });



    shapeList.push(circle);
    shapeList.push(text);
    shapeList.push(zImage);

    zr.add(circle);
    zr.add(text);

    zr.add(zImage);

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
    car_text_color = vm.switchLine == '0' ? trainConfig.UP.TEXT_COLOR: trainConfig.DOWN.TEXT_COLOR;
    return upCar(d);
}
