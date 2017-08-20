import axios from 'axios';
// import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

// const ajaxUrl = env === 'development' ?
//     'http://127.0.0.1:8888' :
//     env === 'production' ?
//     'https://www.url.com' :
//     'https://debug.url.com';


// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
            store.commit(logout);
            router.replace({
              path: 'login',
              query: { redirect: router.currentRoute.fullPath }
            })
      }
    }
    return Promise.reject(error.response.data);
  });

util.ajax = axios.create({
    baseURL: 'http://localhost:8090',//ajaxUrl,
    timeout: 30000
});



export default util;
