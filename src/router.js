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
    },
    {
        path: '/daily',
        name: 'daily',
        meta: {
            title: '厦门轨道行业运营生产日报上传',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/subSystem/dailyUpload/daily.vue'], resolve)
    },
    {
        path: '/test1',
        name: 'test1',
        meta: {
            title: '测试iframe 跨域交互',
            requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: (resolve) => require(['./views/test/test1.vue'], resolve)
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
        path: '/employee',
        name: 'employee',
        meta: {
            title: '厦门市轨道交通从业人员管理子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/employee/employee.vue'], resolve),
        children: [
            {
                path: 'employeeList',
                name: 'employeeList',
                meta: {
                    title: '从业人员信息',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/employee/routerView/employeeList.vue'], resolve)
            },
            {
                path: 'employeeAdd',
                name: 'employeeAdd',
                meta: {
                    title: '添加从业人员',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/employee/routerView/employeeAdd.vue'], resolve)
            },
            {
                path: 'employeeeEdit',
                name: 'employeeEdit',
                meta: {
                    title: '修改从业人员信息',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/employee/routerView/employeeEdit.vue'], resolve)
            }]
    },
    {
        path: '/comAnalysis',
        name: 'comAnalysis',
        meta: {
            title: '厦门市轨道交通综合分析子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/comAnalysis/comAnalysis.vue'], resolve),
        children: [
            {
                path: 'trainAnalysis',
                name: 'trainAnalysis',
                meta: {
                    title: '厦门市轨道交通综合分析子系统',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/comAnalysis/routerView/trainAnalysis.vue'], resolve)
            },
            {
                path: 'passengerAnalysis',
                name: 'passengerAnalysis',
                meta: {
                    title: '厦门市轨道交通综合分析子系统',
                    requireAuth: true
                },
                component: (resolve) => require(['./components/comAnalysis/routerView/passengerAnalysis.vue'], resolve)
            }
        ]
    },
    {
        path: '/comShow',
        name: 'comShow',
        meta: {
            title: '厦门市轨道交通综合展示子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/comShow/comShow.vue'], resolve),
        children: []
    },
    {
        path: '/trafficConn',
        name: 'trafficConn',
        meta: {
            title: '厦门市轨道交通出行衔接子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/trafficConn/trafficConn.vue'], resolve),
        children: []
    },
    {
        path: '/yqManage',
        name: 'yqManage',
        meta: {
            title: '厦门市轨道交通舆情分析子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/yqManage/yqManage.vue'], resolve),
        children: [{
            path: 'yq',
            name: 'yq',
            meta: {
                title: '厦门市轨道交通舆情分析子系统',
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: (resolve) => require(['./components/yqManage/routerView/yq.vue'], resolve)
        }]
    },
    {
        path: '/yjManage',
        name: 'yjManage',
        meta: {
            title: '厦门市轨道交通舆情分析子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/yjManage/yjManage.vue'], resolve),
        children: [{
            path: 'yj',
            name: 'yj',
            meta: {
                title: '厦门市轨道交通舆情分析子系统',
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: (resolve) => require(['./components/yjManage/routerView/yj.vue'], resolve)
        }]
    },
    {
        path: '/yjManage2',
        name: 'yjManage2',
        meta: {
            title: '厦门市轨道交通舆情分析子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/yjManage/yjManage.vue'], resolve),
        children: [{
            path: 'yj2',
            name: 'yj2',
            meta: {
                title: '厦门市轨道交通舆情分析子系统',
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: (resolve) => require(['./components/yjManage/routerView/yj2.vue'], resolve)
        }]
    },
    {
        path: '/userAuth',
        name: 'userAuth',
        meta: {
            title: '厦门市轨道交通用户权限管理子系统',
            requireAuth: true
        },
        component: (resolve) => require(['./views/subSystem/userManage/userManage.vue'], resolve)
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
                path: 'employeeEdit/:employeeId',
                name: '',
                meta: {
                    title: '添加从业人员',
                    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
                },
                component: (resolve) => require(['./components/employee/add/add.vue'], resolve)
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
