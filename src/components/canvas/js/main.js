var ZRender = require('zrender');
var scrollScale = require('./scrollScale');
var startDrag = require('./drag');

var main = function() {

    var zr = ZRender.init(document.querySelector("#canvas"));

    var canvas = document.querySelector('#canvas');

    scrollScale(canvas, 0.1, 1, 0.3);
    startDrag(canvas,canvas,null);
}

module.exports = main;