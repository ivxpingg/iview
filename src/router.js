const routers = [{
    path: '/',
    alias: '/login',
    meta: {
        title: '登陆'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
    }, {
        path: '/home',
        meta: {
            title: '主页',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
    component: (resolve) => require(['./views/home/home.vue'], resolve)
    }, {
        path: '/system',
        meta: {
            title: '系统页',
            requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/system/system.vue'], resolve),
        children: [
            {
                path: 'canvas',
                component: (resolve) => require(['./components/canvas/canvas.vue'], resolve)
            },{
                path: 'employee/add',
                component: (resolve) => require(['./components/employee/add/add.vue'], resolve)
            },]

    },{
        path: '/canvas',
        meta: {
            title: '轨道运行',
            requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./components/canvas/canvas.vue'], resolve)
}];
export default routers;
