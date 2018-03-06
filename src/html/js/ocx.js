
var OcxManager = function(elID) {

    this.objMcuOcx = document.getElementById(elID);

    this.mcuip = "172.29.1.34";
    this.mcuUesr = "admin@kedacom";
    this.mcuPwd = "admin888888";
    this.playId = 65535;
    this.windowId = 0;
    this.playArr = [];      //播放信息列表

    //this.Manu = "kedacom";  // 厂家
    //this.High = 0;          //0（清晰）/1（流畅）
    //this.recpos = 1;        //1（平台录像）/2（前端录像），实时浏览时忽略

    this.windowIndex = 0;
    this.g_bInitMcuOcx = 0;    // 判断是否初始化过没有

    return this;
}

// SDK初始化，返回值0-成功 其它值-失败
OcxManager.prototype.InitMcuOcx = function () {
    if(this.g_bInitMcuOcx == 0)  //&& g_bInitMcuOcx == 0   看是初始化一次还是每次使用都初始化  TODO
    {
        this.g_bInitMcuOcx = 1;
        this.objMcuOcx.Init();
    }
}

//释放
OcxManager.prototype.UnInitMcuOcx = function () {
    // var objMcuOcx = document.getElementById(this.elementID);
    if (this.g_bInitMcuOcx == 1)  // && g_bInitMcuOcx == 1   看是初始化一次还是每次使用都初始化  TODO
    {
        //objMcuOcx.StopRealPlay(playId, windowId); // 多窗口就多关闭几次
        for (var i = 0; i < this.playArr.length; i++) {
            var _playId = this.playArr[i].playId;
            var _winId = this.playArr[i].windowId;
            this.objMcuOcx.StopRealPlay(_playId, _winId);
        }
        this.objMcuOcx.LogOut();
        this.objMcuOcx.UnInit();
    }
}

// 获取用户登录信息
OcxManager.prototype.getLoginInfo = function () {
    var loginInfo =
        "<TLoginInfo>" +
        "<strUser>" + this.mcuUesr + "</strUser>" +
        "<strPWD>" + this.mcuPwd + "</strPWD>" +
        "<strIP>" + this.mcuip + "</strIP>" +
        "</TLoginInfo>";
    return loginInfo;
}

// 设备通道信息
OcxManager.prototype.getChaninfo = function (domainid, puid,chan,src) {
    var chanInfo =
        "<TDEVCHN>" +
        "<strDomainID>" + domainid + "</strDomainID>" +
        "<strDeviceID>" + puid + "</strDeviceID>" +
        "<strChn>" + chan + "</strChn>" +
        "<strSrc>" + src + "</strSrc>" +
        "</TDEVCHN>";
    return chanInfo;
}


/**
 *
 * @param Manu      制造厂商
 * @param High      0（清晰）/1（流畅）
 * @param recpos    1（平台录像）/2（前端录像），实时浏览时忽略
 * @returns {string}
 */
OcxManager.prototype.getStreamInfo = function (Manu, High, recpos) {
    var streamInfo =
        "<TStream_Param>" +
        "<strServerIp>" + "" + "</strServerIp>" +
        "<strServerPort>" + "" + "</strServerPort>" +
        "<strManu>" + Manu + "</strManu>" +
        "<strHighDefinition>" + High + "</strHighDefinition>" +
        "<strRecPlace>" + recpos + "</strRecPlace>" +
        "</TStream_Param>";
    return streamInfo;
}

//PTZ控制命令,
//给摄像机发送PTZ命令，ptz value  更加详尽的ptz参数信息请参考章节PTZ控制
OcxManager.prototype.getPTZInfo = function (PtzCmd, PtzRange, Level, HoldTime) {
    var ptzinfo =
        "<TPtzCmd>" +
        "<strPtzCmd>" + PtzCmd + "</strPtzCmd>" +
        "<strPtzRange>" + PtzRange + "</strPtzRange>" +
        "<strLevel>" + Level + "</strLevel>" +
        "<strHoldTime" + HoldTime + "</strHoldTime>" +
        "</TPtzCmd>";
    return ptzinfo;
}


/**
 *
 * @param domainid  平台的域编号
 * @param puid      设备编号，（这里要注意设备编号后面要增加“@域名”）
 * @param chan      通道号
 * @param src       视频源号
 * @param manu      制造厂商
 * @param high      0（清晰）/1（流畅）
 * @param windowIndex  设置画面索引 0-15
 */
OcxManager.prototype.startRealPlay = function (domainid, puid, chan, src, manu, high, windowIndex) {
    if(this.domainid == "" || puid == "")
    {
        return;
    }

    var loginInfo = this.getLoginInfo();
    var chanInfo = this.getChaninfo(domainid, puid,chan,src);
    var streamInfo = this.getStreamInfo(manu, high, 1);

    //实现功能  ：设置画面数据
    // 参数说明  ：现支持1,4,9,16
    this.objMcuOcx.SetWndStyle(4);

    //实现功能  ：切换码流传输方式
    //参数说明  ： streamPattern -0：TCP 1:UDP
    this.objMcuOcx.SetStreamPattern(1); //0 is tcp;  1 is udp

    for (var i = 0; i < this.playArr.length; i++) {
        var playId = this.playArr[i].playId;
        var windowId = this.playArr[i].windowId;
        if (windowId == windowIndex) {
            this.objMcuOcx.StopRealPlay(playId, windowId);
        }
    }

    //实现功能：开启实时浏览
    //参数说明：pLoginInfoXML-登陆信息，TLoginInfo的XML形式 pDevChnXML-设备通道信息，TDEVCHN的XML形式 pStreamParamXML-画图相关参数，TStream_Param的XML形式lWndIndex-窗体索引(0~15)
    //返回值说明：返回值-1-失败 其它值-成功且为playid 错误码请调用GetLastErrCode查看
    var vPlayid = this.objMcuOcx.StartRealPlay(loginInfo, chanInfo, streamInfo, windowIndex);

    if(vPlayid == -1)
    {
        var nErrorCode = this.objMcuOcx.GetLastErrCode();
        if(nErrorCode == 40001)  //设备只有4K分辨率的情况就认为浏览失败
        {
            alert("浏览失败(" + manu + ") 原因：不支持浏览仅有4k分辨率的设备！");
        }
        else
        {
            alert("浏览失败(" + manu + ") 结果：" + this.playId + "\r\n错误码：" + nErrorCode);
        }
        return 'error';
    }
    else
    {
        //playId = vPlayid;
        // windowId = windowIndex;
        var nRet = this.objMcuOcx.SetWndSoundEnable(windowIndex, 1);

        //添加到播放列表
        var play = { playId: vPlayid, windowId: windowIndex };
        this.playArr.push(play);
        //console.log("播放成功");

        return 'success';
    }
}

//停止
OcxManager.prototype.stopRealPlay = function (windowId) {
    for (var i = 0; i < this.playArr.length;i++)
    {
        if (this.playArr[i].windowId == windowId)
        {
            this.playId = this.playArr[i].playId;
        }
    }
    if (this.playId != 65535) {
        this.objMcuOcx.StopRealPlay(playId, windowId);
        this.playId = 65535;
    }
    else {
        // alert(windowId);
    }
}

// 全屏
OcxManager.prototype.zoom = function(){
    this.objMcuOcx.PleaseZoom();
}

// lEnable--是否开启声音    0-关闭声音   1-开启声音
// 实现功能  ：控制播放窗口的声音开关
OcxManager.prototype.voice = function(){
    if(this.playId != 65535){
        this.objMcuOcx.SetWndSoundEnable(0, 1);
    }
}
