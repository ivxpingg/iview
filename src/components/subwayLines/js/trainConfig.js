/**
 * 运行图参数配置
 */
import car_up_url from '../../canvasPosition/images/car-up-small.png';
import car_down_url from '../../canvasPosition/images/car-down-small.png';

export default {
    CAR_WIDTH: 25,                      // 运行图动车图片宽度
    CAR_HEIGHT: 25,                     // 运行图动车图片高度
    UP: {
        IMG_URL: car_up_url,            // 上行运行图动车图片路径
        TEXT_COLOR: '#2b9292'           // 上行运行图动车文本颜色
    },
    DOWN: {
        IMG_URL: car_down_url,          // 下行运行图动车图片路径
        TEXT_COLOR: '#ce6d2b'           // 下行运行图动车文本颜色
    }
}