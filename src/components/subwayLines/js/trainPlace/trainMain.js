import Util from '../../../../libs/util';
import train from './trainCreateZR';
import MOMENT from 'moment';


/**
 * 列车实时位置入口
 */

var vm, zr, train_zr;
var sTime = '2018-2-22 08:40:00';

/**
 * 存放当前canvas上实时列车元素对象
 * @type object
 * {
 *     '00101': {             // 以车次号作为键值， 存放一个列车展示需要的zr对象，具体存放的对象内容参考。
 *        'text': zr对象,
 *        'circle': zr对象,
 *        ...
 *     }
 * }
 */
var o_zr_list = {};

// 存放从后台获取的最新列车位置信息。
var train_list = {};

/**
 * 移除不存在的列车位置
 */
var train_remove_nonexits = function(new_train_list) {
    var list = Object.keys(o_zr_list);

    var exit = false;
    list.forEach(function (val) {
        exit = false;

        for(var i = 0; i < new_train_list.length; i++) {
            if (new_train_list[i].trainId == val) {
                exit = true;
                break;
            }
        }

        if(!exit) {
            var zr_element_list = o_zr_list[val] || [];
            zr_element_list.forEach(function (key) {
                zr.remove(o_zr_list[val][key]);
            });

            delete o_zr_list[val];
        }
    });

}

/**
 * 更新已存在的位置信息, 增加新增的列车位置
 */
var train_update_exist = function (new_train_list) {
    var list = Object.keys(o_zr_list);

    var train_list2 = {};

    new_train_list.forEach(function(val) {

        train_list2[val.trainId] = val;

        if (list.indexOf(val.trainId) >= 0) {
            // 更新位置信息 code

            train_update(val, train_list[val.trainId], o_zr_list[val.trainId]);
        }
        else {
            train_add(val);
        }
    });

    train_list = train_list2;
}

/**
 * 增加心新增的列车位置
 * @param oData
 * {
        trainId: '00101',
        stationId: '04',
        sectionName: 'G010402',
        stationIdInUpSide: '03',
        stationIdInDownSide: '04',
        type: '1',
        arriveFlag: '0'
    }
 */
var train_add = function (o_data) {
    var o_zr_element = train_zr.createTrain(o_data);
    o_zr_list[o_data.trainId] = o_zr_element;
}

var train_update = function(o_data, old_o_data, o_zr_element_list) {
    train_zr.updatePosition(o_data, old_o_data, o_zr_element_list);
}

/**
 * 刷新列车位置
 * 1、去除没有最新位置的列车
 * 2、增加新增列车的位置
 * 3、更新已有列车位置信息
  */
var refresh_train_position = function (new_train_list) {
    train_remove_nonexits(new_train_list);
    train_update_exist(new_train_list);
}

// 获取列车最新位置信息
var getData = function () {

    // var data = [
    //     {
    //         trainUnitNumber: '00101',   // 列车车体号
    //         trainId: '00101',
    //         stationId: '04',            // 站点编号
    //         sectionName: 'G010402',     // 区段名称
    //         stationIdInUpSide: '03',    // 下行站点编号
    //         stationIdInDownSide: '04',  // 上行站点编号
    //         direction: '0',            // 方向： '0': 上行； '1': 下行
    //         type: '1',                 // '1': 计划车; '0': 非计划车
    //         arriveFlag: '0'            // 是否到站， '0'：未到站; '1': 到站
    //     },
    //     {
    //         trainUnitNumber: '00201',   // 列车车体号
    //         trainId: '00201',
    //         stationId: '04',            // 站点编号
    //         sectionName: 'G012203',     // 区段名称
    //         stationIdInUpSide: '03',    // 下行站点编号
    //         stationIdInDownSide: '04',  // 上行站点编号
    //         direction: '1',            // 方向： '0': 上行； '1': 下行
    //         type: '1',                 // '1': 计划车; '0': 非计划车
    //         arriveFlag: '0'            // 是否到站， '0'：未到站; '1': 到站
    //     }
    // ];

    // train_list = data;

    // refresh_train_position();
    //
    // setTimeout(function () {
    //     getData();
    // }, 5000);


    var d = MOMENT(sTime).add(30, 'seconds');

    sTime = d.format('YYYY-MM-DD hh:mm:ss');

    Util.ajax({
        method: "get",
        url: '/xm/run/getTrainPosition',
        params: {
            time: ''//sTime
        }
    }).then(function (response) {

        if (response.status == 1) {
            console.dir(response.result);

            // 把小区段名转化为大区段名
            response.result.forEach(function(val, idx) {
                if (val.sectionName.indexOf('-') > 0) {
                    val.sectionName = val.sectionName.split('-')[0];
                }
            });

            refresh_train_position(response.result);
        }
        else {
            console.dir(response.errMsg);
        }

        vm.timeOut = setTimeout(function () {
            getData();
        }, 10000);
    }).catch(function (err) {
        console.dir(err);

        vm.timeOut = setTimeout(function () {
            getData();
        }, 10000);
    });
}


/**
 *
 * @param v
 * @param z
 */
export default function (v, z) {
    vm = v;
    zr = z;

    o_zr_list = {};
    train_list = {};
    train_zr = new train(v, z, {});

    getData();
}
