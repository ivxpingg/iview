import ZRender from 'zrender';
import scrollScale from './scrollScale';
import startDrag from './drag';
import baseLinesMap from './baseLinesMap';

export default function (v) {
    var zr = ZRender.init(document.querySelector("#canvas"));

    v.zr = zr;

    var canvas = document.querySelector('#canvas');

    scrollScale(v, canvas, 0.1, 2, 0.3);
    // startDrag(v, canvas,canvas,null);

    baseLinesMap(v, zr);
}