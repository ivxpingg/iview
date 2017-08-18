module.exports = {
    "get": [
        {
            "oUrl": '/api/questionnaire/getQuestionnaireList',
            "des": ""
        }, {
            "oUrl": "/api/test",
            "des": "",
            "data": [{id: 1000, name: "天南"}, {id: 1001, name: "地北"} ],
            "param": {}
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
