module.exports = {
    "get": [
        {
            "oUrl": "/mytest/test",
            "des": "",
            "data": [{id: 1000, name: "天南"}, {id: 1001, name: "地北"} ],
            "param": {}
        },{
            "oUrl": "/mytest/login",
            "data": { status:1, errCode: 'E001', errMsg: '', result: { token: '1001001'} }
        },{
            "oUrl": "/mytest/getsystem",
            "data": {list: [{name: '系统一'}, {name: '系统二'}]}
        }


    ],
    "post": [
        {
            "oUrl": '/api/questionnaire/getQuestionnaireList',
            "des": '获取列表, 可带查询参数',
            "param": { "name":'', "pageNo": 0, "pageSize": ''}
        }
    ]
};
