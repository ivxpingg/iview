const routers = [{
    path: '/',
    meta: {
        title: '登陆'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
},
{
    path: '/home',
    meta: {
        title: '主页'
    },
    component: (resolve) => require(['./views/home/home.vue'], resolve)
}];
export default routers;
