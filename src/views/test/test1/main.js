import ZRender from 'zrender';

import zPolygon from 'zrender/lib/graphic/shape/Polygon';

var main = function (t) {
    var zr = ZRender.init(document.querySelector("#canvas"));

    debugger
    // console.dir(zr.matrix.create());

    var position = [100, 200];

    var p_front = new zPolygon({
        shape: {
            points: [[0, 0], [100, 0], [100, 100], [0, 100]]
        },
        position: [100, 200],
        origin: [0,300],
        draggable: true,
        transform: ZRender.create(),
        style: {
            // stroke: '#996745',
            fill: '#456214',
            lineWidth: 0,
            opacity: 0.4
        }
    });

    var p_back = new zPolygon({
        shape: {
            points: [[0, 0], [100, 0], [100, 100], [0, 100]]
        },
        position: [130, 170],
        origin: [0,300],
        draggable: true,
        // transform: ZRender.matrix.create([1,0.000000,0.624869,1,0,0]),
        style: {
            // stroke: '#996745',
            fill: '#456214',
            lineWidht: 0,
            opacity: 0.4
        }
    });

    p_front.animate('shape', false).when(300, {
        points: [[0, -100], [100, -100], [100, 100], [0, 100]]
    }).done(function () {

    }).start();

    p_back.animate('shape', false).when(300, {
        points: [[0, -100], [100, -100], [100, 100], [0, 100]]
    }).done(function () {

    }).start();

    zr.add(p_back);
    zr.add(p_front);

}


export default main;
