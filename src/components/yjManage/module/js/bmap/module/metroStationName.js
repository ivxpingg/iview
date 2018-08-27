/**
 *  在百度地图上设置地铁站点名称
 **/

import {pointToObject} from '../../tool';

const metroStationName = (map, list) => {
    list.forEach(function (val) {
        if (val.type === '0') {
            let optsUp = {
                position : new BMap.Point(pointToObject(val.position)[0].lng, pointToObject(val.position)[0].lat),    // 指定文本标注所在的地理位置
                offset   : new BMap.Size( 0, -6)    //设置文本偏移量
            };

            let labelUp = new BMap.Label(val.name, optsUp);  // 创建文本标注对象
            labelUp.setStyle({
                paddingBottom: '3px',
                paddingLeft: '3px',
                paddingRight: '3px',
                borderWidth: 0,
                backgroundColor: 'transparent',
                color : "#666",
                fontSize : "12px",
                height : "20px",
                lineHeight : "",
                fontFamily:"微软雅黑",
                fontWeight: 700,
                textShadow: "1px 0 0 rgba(255,255,255, 1), -1px 0 0 rgba(255,255,255, 1),0 1px 0 rgba(255,255,255, 1), 0 -1px 0 rgba(255,255,255, 1)"
            });
            map.addOverlay(labelUp);
        }
    });
};

export default metroStationName;