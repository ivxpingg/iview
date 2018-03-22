import lineData from '../baseData';
import ZCircle from 'zrender/lib/graphic/shape/Circle';
import ZText from 'zrender/lib/graphic/Text';
import ZImage from 'zrender/lib/graphic/Image';
import trainConfig from '../trainConfig';
/**
 *
 * @param p
 * @returns {ZCircle}
 */
var zr_circle = function (p) {

    return new ZCircle({
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
        draggable: false
    });
}

var zr_text = function (p, txt, color) {

    return new ZText({
        position: p,
        style: {
            //text: txt,
            text: '',
            fontStyle: 'Microsoft YaHei',
            fontSize: '10px',

            // textBackgroundColor: 'rgba(0, 153, 51, 0.6)',
            // textBorderColor: 'rgba(0, 153, 51, 1)',
            // textBorderWidth: 1,
            // textBorderRadius: 10,
            // textPadding: [3, 6],
            // textRect: {
            //     x: 10,
            //     y: 10,
            //     width: 70,
            //     textHeight: 30
            // },
            textFill: color,
            fontWeight: 'bold',
            textAlign: 'left'
        },
        draggable: false
    });
}

var zr_image = function (p, img_url, shadowColor) {
    return new ZImage({
        position: p,
        style: {
            x: 0,
            y: 0,
            image: img_url,
            width: trainConfig.CAR_WIDTH,
            height: trainConfig.CAR_HEIGHT,
            shadowColor: shadowColor,
            shadowBlur: 80
        },
        draggable: false
    });
}

/**
 * 判断列车是否到达
 * @param arriveFlag
 * @returns {boolean} 到达：true;
 */
var b_train_arrive = function (arriveFlag) {
    return arriveFlag == '1' ? true : false;
}

/**
 * 上行车创建
 * @param obj
 * @returns {object}
 */
var create_up_train = function (obj, up_line, zr) {
   var section_point_start = [0, 0], section_point_end = [0, 0],
       text_point_start = [0, 0], text_point_end = [0, 0],
       image_point_start = [0, 0], image_point_end = [0, 0],
       run_time = 0;
   var element_circle, element_text, element_image;
    for(var i = 0; i < up_line.length; i++) {
       if (obj.sectionName == up_line[i].section_name) {

           // 判断列车是否是到站
           if (up_line[i].is_station && b_train_arrive(obj.arriveFlag)) {
               section_point_start = section_point_end = [up_line[i+1].section_point.x, up_line[i+1].section_point.y];
               image_point_start = text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y];
               text_point_start = text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

               run_time = 0;
           }
           else {
               section_point_start = [up_line[i].section_point.x, up_line[i].section_point.y];
               section_point_end = [up_line[i+1].section_point.x, up_line[i+1].section_point.y];
               image_point_start = [up_line[i].text_point.x, up_line[i].text_point.y];
               image_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y];
               text_point_start = [up_line[i].text_point.x, up_line[i].text_point.y + trainConfig.CAR_HEIGHT];
               text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

               run_time = up_line[i].run_time;
           }

           // element_circle = zr_circle(section_point_start);
           element_text = zr_text(text_point_start, obj.trainId, trainConfig.UP.TEXT_COLOR );
           element_image = zr_image(image_point_start, trainConfig.UP.IMG_URL, trainConfig.UP.TEXT_COLOR);


           // element_circle.animate('', false).when(run_time, {
           //    position: section_point_end
           // }).start();
           element_text.animate('', false).when(run_time, {
               position: text_point_end
           }).start();
           element_image.animate('', false).when(run_time, {
               position: image_point_end
           }).start();

           // zr.add(element_circle);
           zr.add(element_text);
           zr.add(element_image);
           return {
               // circle: element_circle,
               text: element_text,
               image: element_image
           };
       }
    }
}

/**
 * 下行车创建
 * @param obj
 * @returns {object}
 */
var create_down_train = function (obj, down_line, zr) {
    var section_point_start = [0, 0], section_point_end = [0, 0],
        text_point_start = [0, 0], text_point_end = [0, 0],
        image_point_start = [0, 0], image_point_end = [0, 0],
        run_time = 0;
    var element_circle, element_text, element_image;
    for(var i = 0; i < down_line.length; i++) {
        if (obj.sectionName == down_line[i].section_name) {

            // 判断列车是否是到站
            if (down_line[i].is_station && b_train_arrive(obj.arriveFlag)) {
                section_point_start = section_point_end = [down_line[i+1].section_point.x, down_line[i+1].section_point.y];
                image_point_start = text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y];
                text_point_start = text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                run_time = 0;
            }
            else {
                section_point_start = [down_line[i].section_point.x, down_line[i].section_point.y];
                section_point_end = [down_line[i+1].section_point.x, down_line[i+1].section_point.y];
                image_point_start = [down_line[i].text_point.x, down_line[i].text_point.y];
                image_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y];
                text_point_start = [down_line[i].text_point.x, down_line[i].text_point.y + trainConfig.CAR_HEIGHT];
                text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                run_time = down_line[i].run_time;
            }

            // element_circle = zr_circle(section_point_start);
            element_text = zr_text(text_point_start, obj.trainId, trainConfig.DOWN.TEXT_COLOR);
            element_image = zr_image(image_point_start, trainConfig.DOWN.IMG_URL, trainConfig.DOWN.TEXT_COLOR);

            // element_circle.animate('', false).when(run_time, {
            //     position: section_point_end
            // }).start();
            element_text.animate('', false).when(run_time, {
                position: text_point_end
            }).start();
            element_image.animate('', false).when(run_time, {
                position: image_point_end
            }).start();

            // zr.add(element_circle);
            zr.add(element_text);
            zr.add(element_image);
            return {
                // circle: element_circle,
                text: element_text,
                image: element_image
            };
        }
    }
}

/**
 * 更新上行车车辆位置。
 * @param obj
 * @param zrObj
 * @param zr
 */
var update_up_position_train = function (obj, old_obj, zrObj, up_line, zr) {
    var section_point_start = [0, 0], section_point_end = [0, 0],
        text_point_start = [0, 0], text_point_end = [0, 0],
        image_point_start = [0, 0], image_point_end = [0, 0],
        run_time = 0;


    if (obj.sectionName == old_obj.sectionName) {
        // 区段没改变
        if (b_train_arrive(old_obj.arriveFlag) && b_train_arrive(obj.arriveFlag)) {
            // 没改变
        }
        else if (!b_train_arrive(old_obj.arriveFlag) && !b_train_arrive(obj.arriveFlag)) {
            // 没改变
        }

        else if (b_train_arrive(obj.arriveFlag)) {
            // 到站
            // 要设置到站动画

            zrObj.image.animate('style', false).when(500, {
                width: trainConfig.CAR_WIDTH * 1.5,
                height: trainConfig.CAR_HEIGHT * 1.5,
                x: -(trainConfig.CAR_WIDTH * 1.5) / 4,
                y: -(trainConfig.CAR_HEIGHT * 1.5) / 4
            }).when(1000, {
                width: trainConfig.CAR_WIDTH,
                height: trainConfig.CAR_HEIGHT,
                x: 0,
                y: 0
            }).when(1500, {
                width: trainConfig.CAR_WIDTH * 1.5,
                height: trainConfig.CAR_HEIGHT * 1.5,
                x: -(trainConfig.CAR_WIDTH * 1.5) / 4,
                y: -(trainConfig.CAR_HEIGHT * 1.5) / 4
            }).when(2000, {
                width: trainConfig.CAR_WIDTH,
                height: trainConfig.CAR_HEIGHT,
                x: 0,
                y: 0
            }).start();
            // zrObj.text.animate('style', false).when(200, {
            //     fontSize: '15px'
            // }).when(400, {
            //     fontSize: '10px'
            // }).when(600, {
            //     fontSize: '15px'
            // }).when(800, {
            //     fontSize: '10px'
            // }).start();
        }
    }
    else {
        // 区段改变
        for (var i = 0; i < up_line.length; i++) {
             if (up_line[i].section_name == obj.sectionName) {
                 if (up_line[i].is_station && b_train_arrive(obj.arriveFlag)) {
                     section_point_start = section_point_end = [up_line[i+1].section_point.x, up_line[i+1].section_point.y];
                     image_point_start = text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y];
                     text_point_start = text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                     run_time = 0;
                 }
                 else {
                     section_point_start = [up_line[i].section_point.x, up_line[i].section_point.y];
                     section_point_end = [up_line[i+1].section_point.x, up_line[i+1].section_point.y];
                     image_point_start = [up_line[i].text_point.x, up_line[i].text_point.y];
                     image_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y];
                     text_point_start = [up_line[i].text_point.x, up_line[i].text_point.y + trainConfig.CAR_HEIGHT];
                     text_point_end = [up_line[i+1].text_point.x, up_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                     run_time = up_line[i].run_time;
                 }
                 break;
             }
        }

        zrObj.image.position = image_point_start;
        zrObj.text.position = text_point_start;
        zrObj.image.dirty();
        zrObj.text.dirty();

        zrObj.text.animate('', false).when(run_time, {
            position: text_point_end
        }).start();
        zrObj.image.animate('', false).when(run_time, {
            position: image_point_end
        }).start();
    }

    return zrObj;
}

/**
 * 更新下行车车辆位置。
 * @param obj
 * @param zrObj
 * @param zr
 */
var update_down_position_train = function (obj, old_obj, zrObj, down_line, zr) {
    var section_point_start = [0, 0], section_point_end = [0, 0],
        text_point_start = [0, 0], text_point_end = [0, 0],
        image_point_start = [0, 0], image_point_end = [0, 0],
        run_time = 0;

    if (obj.sectionName == old_obj.sectionName) {
        // 区段没改变
        if (b_train_arrive(old_obj.arriveFlag) && b_train_arrive(obj.arriveFlag)) {
            // 没改变
            //return zrObj;
        }
        else if (!b_train_arrive(old_obj.arriveFlag) && !b_train_arrive(obj.arriveFlag)) {
            // 没改变
            //return zrObj;
        }

        else if (b_train_arrive(obj.arriveFlag)) {
            // 到站
            // 要设置到站动画

            zrObj.image.animate('style', false).when(500, {
                width: trainConfig.CAR_WIDTH * 1.5,
                height: trainConfig.CAR_HEIGHT * 1.5,
                x: -(trainConfig.CAR_WIDTH * 1.5) / 4,
                y: -(trainConfig.CAR_HEIGHT * 1.5) / 4
            }).when(1000, {
                width: trainConfig.CAR_WIDTH,
                height: trainConfig.CAR_HEIGHT,
                x: 0,
                y: 0
            }).when(1500, {
                width: trainConfig.CAR_WIDTH * 1.5,
                height: trainConfig.CAR_HEIGHT * 1.5,
                x: -(trainConfig.CAR_WIDTH * 1.5) / 4,
                y: -(trainConfig.CAR_HEIGHT * 1.5) / 4
            }).when(2000, {
                width: trainConfig.CAR_WIDTH,
                height: trainConfig.CAR_HEIGHT,
                x: 0,
                y: 0
            }).start();
        }
    }
    else {
        // 区段改变
        for (var i = 0; i < down_line.length; i++) {
            if (down_line[i].section_name == obj.sectionName) {
                if (down_line[i].is_station && b_train_arrive(obj.arriveFlag)) {
                    section_point_start = section_point_end = [down_line[i+1].section_point.x, down_line[i+1].section_point.y];
                    image_point_start = text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y];
                    text_point_start = text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                    run_time = 0;
                }
                else {
                    section_point_start = [down_line[i].section_point.x, down_line[i].section_point.y];
                    section_point_end = [down_line[i+1].section_point.x, down_line[i+1].section_point.y];
                    image_point_start = [down_line[i].text_point.x, down_line[i].text_point.y];
                    image_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y];
                    text_point_start = [down_line[i].text_point.x, down_line[i].text_point.y + trainConfig.CAR_HEIGHT];
                    text_point_end = [down_line[i+1].text_point.x, down_line[i+1].text_point.y + trainConfig.CAR_HEIGHT];

                    run_time = down_line[i].run_time;
                }
                break;
            }
        }

        zrObj.image.position = image_point_start;
        zrObj.text.position = text_point_start;
        zrObj.image.dirty();
        zrObj.text.dirty();

        zrObj.text.animate('', false).when(run_time, {
            position: text_point_end
        }).start();
        zrObj.image.animate('', false).when(run_time, {
            position: image_point_end
        }).start();
    }

    return zrObj;

}


var train_zr = function (v, z, option){

   this.vm = v;
   this.zr = z;
   this.up_line = lineData.up_line;
   this.down_line = lineData.down_line;
   this.opt = option || {};
};

/**
 *
 * @param obj {Object} -
 * return {object}
 */
train_zr.prototype.createTrain = function (obj) {

   var o_zr_element = {};
   // 判断列车方向
   if (obj.direction == '0') {
       o_zr_element = create_up_train(obj, this.up_line, this.zr);
   }
   else if(obj.direction == '1') {
       o_zr_element = create_down_train(obj, this.down_line, this.zr);
   }
   else {}

   return o_zr_element;

}

train_zr.prototype.updatePosition = function (obj, old_obj, zrObj) {
    if (obj.direction == '0') {
       return update_up_position_train(obj, old_obj, zrObj, this.up_line, this.zr);
    }
    else {
        return update_down_position_train(obj, old_obj, zrObj, this.down_line, this.zr);
    }

}

export default train_zr;