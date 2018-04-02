import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import './style/app.css';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);



// 路由配置
const RouterConfig = {
    //mode: 'history',
    base: '/',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {

    // next();return ;
    if (to.path === '/' || !to.meta.requireAuth) {
        Util.title(to.meta.title);
        next();
        return;
    }

    if (window.location.href.indexOf('/videoMonitor') > 0) {
        var t = window.location.href.split('?t=')[1];
        if (t) {

            Util.cookie.set('xmgd', t.split('--')[0] , new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
            Util.cookie.set('xmgdname', decodeURIComponent( t.split('--')[1]), new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
            Util.cookie.set('xmgduserid', t.split('--')[2], new Date(new Date().getTime() + 7 * 24 * 60 * 1000));
            Util.cookie.set('logintime', MOMENT().format('YYYY-MM-DD hh:mm:ss') , new Date(new Date().getTime() + 7 * 24 * 60 * 1000))
            that.$store.commit('setToken', t.split('--')[2]);
            that.$store.commit('setName', decodeURIComponent(t.split('--')[1]));

            next();
            return;
        }
    }

    if (store.state.token == null) {
        store.commit('setToken', Util.cookie.get('xmgd'));
        // store.state.token = Util.cookie.get('xmgd');
    }
    if(Util.cookie.get('xmgd') == null) {
        store.state.token = null;
    }

    if (to.meta.requireAuth) {

        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            iView.LoadingBar.start();
            Util.title(to.meta.title);
            next();
        }
        else {
            Util.title(to.meta.title);
            next({
                path: '/',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    } else {
        Util.title(to.meta.title);
        next({
            path: '/',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
    }


});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {
        token: null,
        name: '',
        systemScroll: null
    },
    getters: {

    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setName(state, name) {
            state.name = name;
        },
        setSystemScroll(state, oIScroll) {
            state.systemScroll = oIScroll;
        }

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted() {

    },
    methods: { }
});
