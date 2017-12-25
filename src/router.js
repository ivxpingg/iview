const routers = [{
    path: '/',
    alias: '/login',
    meta: {
        title: '厦门轨道行业监管系统'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
    }, {
        path: '/platform',
       // name: '/platform',
        meta: {
            title: '厦门轨道行业监管系统',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/platform/platform.vue'], resolve)
    }, {
        path: '/system/:funcId',
        meta: {
            title: '厦门轨道行业监管系统',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/system/system.vue'], resolve),
        children: [
            {
                path: 'canvas',
                name: 'canvas',
                meta: {
                    title: '系统页',
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/canvas2/canvas.vue'], resolve)
            },{
                path: 'subwayLines',
                name: 'subwayLines',
                meta: {
                    title: '系统页',
                    requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/subwayLines/subwayLines.vue'], resolve)
            },{
                path: 'employeeAdd',
                name: 'employeeAdd',
                meta: {
                    title: '添加从业人员',
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/employee/add/add.vue'], resolve)
            },{
                path: 'employeeEdit/:employeeId',
                name: 'employeeEdit',
                meta: {
                    title: '添加从业人员',
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/employee/add/add.vue'], resolve)
            },{
                path: 'employeeList',
                name: 'employeeList',
                meta: {
                    title: '从业人员管理',
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/employee/list/list.vue'], resolve)
            }]

    },{
    path: '/canvasPosition',
    meta: {
        title: '底图数据瞄点',
        requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: (resolve) => require(['./components/canvasPosition/canvas.vue'], resolve)
},{
    path: '/subwayLines',
    meta: {
        title: '轨道运行图',
        requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: (resolve) => require(['./components/subwayLines/subwayLines.vue'], resolve)
}];
export default routers;
