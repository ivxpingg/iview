
var m1 = null;
var windowIndex = 0;



$(document).ready(function(){

    window.onmessage = function (ev) {
        var pda = ev.data;

        switch(pda.type) {
            case 'video':
               addVideo(pda.video.puid);
               break;
            case 'videoZoom':
                zoom();
                break;
            case 'videoStop':
                windowIndex = pda.video.windowIndex;
                stopRealPlay();
                break;
            default: break;
        }
    }

    // window.parent.postMessage('son','*');

    setTimeout( function(){
        m1 = new OcxManager('mcuocx');
        m1.InitMcuOcx();
    }, 200 );
});

window.onunload = function () {
    m1.UnInitMcuOcx();
    return true;
}

// window.onunload = function() {
//     if(m1 != null) {
//         m1.UnInitMcuOcx();
//         return true;
//     }
// }

function OcxEventCB(lEvent, lWndIndex, lReserve1, lReserve2) {

    if (1 == lEvent)
    {
        // alert(lWndIndex + " isselected");
       // var windowIndex = lWndIndex;
       //  var info = {
       //      type: 'windowIndex',
       //      windowIndex: lWndIndex
       //  }
       //  window.parent.postMessage(info,'*');

        windowIndex = lWndIndex;
    }
}

function errorMessage(content) {
    alert(content);
}


function mystart() {
    var domainid = "3a3f776df5144bdfa0f8fa58b5ba5d77";
    var puid = "096ec6b7892d4c15a4e8c473406cd67d@kedacom";
    var chan = "0";
    var src = "0";
    var manu = "kedacom";  //kedacom

    m1.startRealPlay(domainid,puid,chan,src,manu,0,0);
}

/**
 *
 * @param domainid   平台的域编号
 * @param puid       设备编号
 * @param manu       厂家
 * @param windowIndex
 */
function addVideo(puid) {
    var domainid = '91ae9b77c5a74d5db067a473d323807b';  //平台的域编号
    var chan = 0;   // 通道号
    var src = 0;    // 视频源号
    var hign = 0;   // 0(清晰) / 1(流畅)
    var manu = 'kedacom';

    var value =  m1.startRealPlay(domainid, puid, chan, src,  manu, hign, windowIndex);
    messageParent(value);
    windowIndex = (windowIndex + 1) % 4;

}

function messageParent(value) {
   // alert(value);
}

function zoom() {
    m1.zoom();
}

function stopRealPlay() {
    m1.stopRealPlay(windowIndex);
}