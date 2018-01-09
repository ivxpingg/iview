const routers = [{
    path: '/',
    alias: '/login',
    meta: {
        title: '厦门轨道行业监管系统'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
    }, {
        path: '/platform',
        name: 'platform',
        meta: {
            title: '厦门轨道行业监管系统',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/platform/platform.vue'], resolve)
    }, {
    path: '/platform2',
    // name: '/platform',
    meta: {
        title: '厦门轨道行业监管系统',
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: (resolve) => require(['./views/platform/platform2.vue'], resolve)
    },
    {
        path: '/monitor',
        name: 'monitor',
        meta: {
            title: '厦门市轨道交通行业运行监视子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/monitor/monitor.vue'], resolve),
        children: [
            {
                path: 'runMonitor',
                name: 'runMonitor',
                meta: {
                    title: '运行监视',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/monitor/routerView/runMonitor.vue'], resolve)
            },
            {
                path: 'flowMonitor',
                name: 'flowMonitor',
                meta: {
                    title: '客流监视',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/monitor/routerView/flowMonitor.vue'], resolve)
            },
            {
                path: 'videoMonitor',
                name: 'videoMonitor',
                meta: {
                    title: '视频监视',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/monitor/routerView/videoMonitor.vue'], resolve)
            }
        ]
    },
    {
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
