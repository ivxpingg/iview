var request = require('request');
var rou = require('./rou');
var express = require('express');
var router = express.Router();

const DOMAIN = 'http://192.168.1.35:8080';

var rpGet = function (url, req, res) {
    var options = {
        url: url,
        method: "GET",
        qs: req.query,
        json: true
    };
    new Promise(function(resolve, reject) {
        request(options, function (error, response, body) {
            resolve(body);
        });
    }).then(function (value) {
        res.json(value);
    });
}

var rpPost = function (url, req, res) {
    var options = {
        url: url,
        method: "POST",
        json: true,
        qs: req.query,
        body: req.body,
        //form:　req.body
    };
    new Promise(function(resolve, reject) {
        request(options, function (error, response, body) {
            if(error) { reject(error); }
            resolve(body);
        });
    }).then(function (value) {
        res.json(value);
    }).catch(function (error) {
        console.error(error);
    });
}

rou.get.forEach(function (val, index) {
    if (val.oUrl.indexOf('mytest') > 0) {
        router.get(val.oUrl, function (req, res) {
            res.json(val.data);
        });
    }
    else {
        router.get(val.oUrl, function (req, res) {
            var url = DOMAIN + val.oUrl;
            rpGet(url,req, res);
        });
    }
});

rou.post.forEach(function (val, index) {
    if (val.oUrl.indexOf('mytest') > 0) {

        router.post(val.oUrl, function (req, res) {

            console.log("form");
            console.dir(req.form);
            console.log("body");
            console.dir(req.body);
            console.log("query");
            console.dir(req.query);

            var url = DOMAIN + '/metrosupervision/api/login';
            rpPost(url,req, res);
           // res.json(val.data);
        });
    }
    else {
        router.post(val.oUrl, function (req, res) {
            //console.dir(req);
            var url = DOMAIN + val.oUrl;
            rpGet(url,req, res);
        });
    }
});

module.exports = router;
