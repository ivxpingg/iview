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
    next();return ;
    if (to.path === '/' || !to.meta.requireAuth) {
        Util.title(to.meta.title);
        next();
        return;
    }

    if (store.state.token == null) {
        store.commit('setToken', Util.cookie.get('xmgd'));
        // store.state.token = Util.cookie.get('xmgd');
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
        name: ''
    },
    getters: {

    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setName(state, name) {
            state.name = name;
        }

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
