
var m1 = null;



$(document).ready(function(){

    window.onmessage = function (ev) {
        var pda = ev.data;
        // if(!!pda.type) {
        //     return;
        // }

        switch(pda.type) {
            case 'video':
                addVideo(pad.param)
        }
        console.log(ev.data);
    }

    // window.parent.postMessage('son','*');

    // setTimeout( function(){
    //     m1 = new OcxManager('mcuocx');
    //     m1.InitMcuOcx();
    //     // mystart();
    // }, 200 );
});


// window.onunload = function() {
//     if(m1 != null) {
//         m1.UnInitMcuOcx();
//         return true;
//     }
// }

function OcxEventCB(lEvent, lWndIndex, lReserve1, lReserve2) {
    debugger
    if (1 == lEvent)
    {
        //alert(lWndIndex + " isselected");
       var windowIndex = lWndIndex;
    }
}

function errorMessage(content) {
    alert(content);
}


function mystart() {
    var domainid = "3a3f776df5144bdfa0f8fa58b5ba5d77@kedacom";
    var puid = "096ec6b7892d4c15a4e8c473406cd67d@kedacom";
    var chan = "0";
    var src = "0";
    var manu = "kedacom";  //kedacom

    m1.startRealPlay(domainid,puid,chan,src,manu,0,0);
}

function addVideo(param) {
    m1.startRealPlay(param.domainid,param.puid,param.chan,param.src, param.manu,0, param.windowIndex);
}

function zoom() {
    m1.zoom();
}