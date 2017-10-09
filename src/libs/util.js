import axios from 'axios';
import env from '../config/env';
import VueRouter from 'vue-router';
import utils from './utils';

let util = {

};
util.title = function(title) {
    title = title ? title + '' : '轨道监管系统';
    window.document.title = title;
};

// http://192.168.1.35:8080
const ajaxUrl = env === 'production' ?
    'http://cs.doudou360.com:8088/metrosupervision/xm' :
    env === 'development' ?
    'http://localhost:8880/mytest' :
    'http://localhost:8880/xm'

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

function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}

var Ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    transformRequest: [function transformRequest(data, headers) {
        /* 把类似content-type这种改成Content-Type */
        let keys = Object.keys(headers);
        let normalizedName = 'Content-Type';
        keys.forEach(name => {
            if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                headers[normalizedName] = headers[name];
                delete headers[name];
            }
        });
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        /* 这里是重点，其他的其实可以照着axios的源码抄 */
        /* 这里就是用来解决POST提交json数据的时候是直接把整个json放在request payload中提交过去的情况
         * 这里简单处理下，把 {name: 'admin', pwd: 123}这种转换成name=admin&pwd=123就可以通过
         * x-www-form-urlencoded这种方式提交
         * */
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            let keys2 = Object.keys(data);
            /* 这里就是把json变成url形式，并进行encode */
            return encodeURI(keys2.map(name => `${name}=${data[name]}`).join('&'));
        }
        return data;
    }]
});

// Ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//ajax请求前拦截器
Ajax.interceptors.request.use(function (config) {
    config.headers.common['Authorization'] = Cookie.get('xmgd');
    // config.url = config.url + ';JSESSIONID=' + Cookie.get('xmgd');
    return config;
}, function (error) {
    return Promise.reject(error);
});
//ajax响应后拦截器
Ajax.interceptors.response.use(function (response) {
    if(response.data.errCode === "A0002") {
        let router = new VueRouter();
       // router.push('/');
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


util.domain = ajaxUrl;
util.ajax = Ajax;
util.cookie = Cookie;

export default util;