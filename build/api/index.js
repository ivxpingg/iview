var request = require('request');
var rou = require('./rou');
var express = require('express');
var router = express.Router();

// const DOMAIN = 'http://10.131.1.222:8080';
const DOMAIN = 'http://localhost:8880';

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
        //body: req.body,
        form:　req.body
    };
    console.log(req.form);
    console.log(req.body);
    console.log(req.body.pageSize);
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
    if (val.oUrl.indexOf('test') > 0) {
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

module.exports = router;
