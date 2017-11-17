module.exports = {
    "get": [
        {
            "oUrl": "/mytest/test",
            "des": "",
            "data": [{id: 1000, name: "天南"}, {id: 1001, name: "地北"} ],
            "param": {}
        },{
            "oUrl": "/mytest/metrosupervision/api/login",
            "data": { status:1, errCode: 'E001', errMsg: '', result: { token: '1001001'} }
        },{
            "oUrl": "/wx",
            "data": {list: [{name: '系统一'}, {name: '系统二'}]}
        }


    ],
    "post": [
        {
            "oUrl": "/mytest/metrosupervision/api/login",
            "data": { status:1, errCode: 'E001', errMsg: '', result: { token: '1001001'} }
        },
        {
            "oUrl": "/mytest/wx",
            "data": { status:1, errCode: 'E001', errMsg: '', result: { token: '1001001'} }
        }
    ]
};
