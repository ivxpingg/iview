import axios from 'axios';
import env from '../config/env';
import VueRouter from 'vue-router';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

// http://192.168.1.35:8080
const ajaxUrl = env === 'production' ?
    'http://localhost:8880' :
    env === 'development' ?
    'http://localhost:8880' :
    'http://localhost:8880'

var Cookie = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if(cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    /**
     * 设置cookie
     * @param name
     * @param value
     * @param expires
     * @param path
     * @param domain
     * @param secure
     */
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString();
        }
        if (path) {
            cookieText += '; path=' + path;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure=' + secure;
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure);
    }
}

var Ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

//ajax请求前拦截器
Ajax.interceptors.request.use(function (config) {
    config.headers.common['Authorization'] = Cookie.get('xmgd');
    return config;
}, function (error) {
    return Promise.reject(error);
});
//ajax响应后拦截器
Ajax.interceptors.response.use(function (response) {
    if(response.data.errCode === "A0002") {
        let router = new VueRouter();
        router.push('/');
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

util.domain = ajaxUrl;
util.ajax = Ajax;
util.cookie = Cookie;

export default util;