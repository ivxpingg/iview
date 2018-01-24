<template>
    <div class="platforms-container">
        <div class="title-img"></div>
        <div ref="panel" class="subSystem-panel">
            <ul ref="subBox" class="subSystem-ul">

                <li name="运行监视"><span class="subSystem subSystem2" @click="goto(systemList['2'])" ></span></li>
                <li name="综合分析"><span class="subSystem subSystem3" @click="goto(systemList['3'])" ></span></li>
                <li name="舆情分析"><span class="subSystem subSystem4" @click="goto(systemList['4'])" ></span></li>
                <li name="应急管理"><span class="subSystem subSystem5" @click="goto(systemList['5'])" ></span></li>
                <li name="运营考评"><span class="subSystem subSystem1" @click="goto(systemList['1'])" ></span></li>

                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem11" ></span></li>

                <li name="交通衔接"><span class="subSystem subSystem7" @click="goto(systemList['7'])" ></span></li>
                <li name="综合展示"><span class="subSystem subSystem8" @click="goto(systemList['8'])" ></span></li>
                <li name="用户权限"><span class="subSystem subSystem9" @click="goto(systemList['9'])" ></span></li>
                <li name="从业人员"><span class="subSystem subSystem6" @click="goto(systemList['6'])" ></span></li>

            </ul>
        </div>

        <i class="arrow arrow-left ivu-icon ivu-icon-ios-arrow-left" @click="upSystem"></i>
        <i class="arrow arrow-right ivu-icon ivu-icon-ios-arrow-right" @click="nextSystem"></i>

        <div class="btn-switcher" @click="logout">切换用户</div>
        <vFooter class="footer"></vFooter>
    </div>

</template>

<script>
    import Util from '../../libs/util';
    import VueRouter from 'vue-router';
    import vFooter from '../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {
                domain: Util.domain,
                mList: [],
                timer: 100,
                direction: 'left',
                figure: null,     // 3D元素的对应的元素
                theta: 0,         // 旋转一个子系统需要的角度
                gap: 35,          // 每个子系统元素的padding值
                currImage: 0,     // 当前对应的子系统

                systemList: {
                    '1': {
                        name: '运营考评子系统',
                        url: ''
                    },
                    '2': {
                        name: '运行监视子系统',
                        url: ''
                    },
                    '3': {
                        name: '综合分析子系统',
                        url: ''
                    },
                    '4': {
                        name: '舆情分析子系统',
                        url: ''
                    },
                    '5': {
                        name: '应急管理子系统',
                        url: ''
                    },
                    '6': {
                        name: '从业人员管理子系统',
                        url: ''
                    },
                    '7': {
                        name: '交通衔接子系统',
                        url: ''
                    },
                    '8': {
                        name: '综合展示子系统',
                        url: ''
                    },
                    '9': {
                        name: '用户权限',
                        url: ''
                    }
                }

            }
        },
        components: {vFooter},
        watch: {
            mList(val, oldVal) {
                var that = this;
                val.forEach(function (val) {
                    switch(val.appFunction.funcId) {
                        // 运行监视子系统
                        case "RUN_SUPERVISION_SYSTEM":
                            that.systemList['2'].url = val.appFunction.url;
                            break;
                        // 综合分析子系统
                        case "COM_ANALYSIS_SYSTEM":
                            that.systemList['3'].url = val.appFunction.url;
                            break;
                        // 运营考评子系统
                        case "RUN_EVALUATION_SYSTEM":
                            that.systemList['1'].url = val.appFunction.url;
                            break;
                        // 应急管理子系统
                        case "YJ_MANAGE_SYSTEM":
                            that.systemList['5'].url = val.appFunction.url;
                            break;
                        // 舆情分析子系统
                        case "YQ_ANALYSIS_SYSTEM":
                            that.systemList['4'].url = val.appFunction.url;
                            break;

                        // 综合展示子系统
                        case "ZH_SHOW_SYSTEM":
                            that.systemList['8'].url = val.appFunction.url;
                            break;

                        // 交通衔接子系统
                        case "TRAFFIC_CONN_SYSTEM":
                            that.systemList['7'].url = val.appFunction.url;
                            break;

                        // 用户权限
                        case "SYS_MANAGE":
                            that.systemList['9'].url = val.appFunction.url;
                            break;

                        // 从业人员管理子系统
                        case "XM_METRO_SUPERVISION_EMPLOYEE":
                            that.systemList['6'].url = val.appFunction.url;
                            break;
                    }
                })
            }
        },
        mounted() {
            this.getData();
            this.threeD();
            this.init();
        },
        methods: {
            init(){
                var that = this;
                window.onresize = function () {

                    var images = that.figure.children,
                        n = images.length;

                    var s = parseFloat(getComputedStyle(images[0]).width);
                    that.theta = 2 * Math.PI / n;
                    var apothem = s / (2 * Math.tan(Math.PI / n));

                    that.figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

                    for (var i = 1; i < n; i++) {
                        that.figure.children[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
                        that.figure.children[i].style.transform = 'rotateY(' + i * that.theta + 'rad)';
                    }
                }


                document.onkeyup = function (e) {
                    if (window.event)//如果window.event对象存在，就以此事件对象为准
                        e = window.event;
                    var code = e.charCode || e.keyCode;

                    console.log(code);
                    if (code == 37) {
                        that.upSystem();
                    }
                    if (code == 39) {
                        that.nextSystem();
                    }
                }
            },
            getData () {
                var that = this;
                Util.ajax.get('/xm/sys/auth/menuList')
                    .then(function (response) {
                        that.mList = response.result || null;
                        console.dir(that.mList);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            threeD() {

                var figure = this.$refs.subBox,
                    images = figure.children,
                    n = images.length;

                this.setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));

            },
            setupCarousel(n, s) {
                this.figure = this.$refs.subBox;
                var images = this.figure.children,
                    n = images.length;
                this.theta = 2 * Math.PI / n;

                var apothem = s / (2 * Math.tan(Math.PI / n));

                this.figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

                for (var i = 0; i < n; i++) {
                    this.figure.children[i].style.padding = this.gap + 'px';

                    this.figure.children[i].onmouseover = function () {
                        this.style.top = '-50px';
                    }


                    this.figure.children[i].onmouseleave = function () {
                        this.style.top = '0';
                    }
                }

                for (var i = 1; i < n; i++) {
                    this.figure.children[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
                    this.figure.children[i].style.transform = 'rotateY(' + i * this.theta + 'rad)';
                }

                this.figure.style.transform = 'rotateY(' + this.currImage * -this.theta + 'rad)';

                this.setCarouselEvent();

            },
            setCarouselEvent() {
                /*注册事件*/
                if(document.addEventListener){
                    document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
                }
                //W3C
                 window.onmousewheel = this.scrollFunc;//IE/Opera/Chrome
            },
            scrollFunc(e) {
                var that = this;

                e= e || window.event;
                if(e.wheelDelta){//IE/Opera/Chrome
                    //自定义事件：编写具体的实现逻辑

                    if (e.wheelDelta > 0) {
                        that.upSystem();
                    }
                    else {
                        that.nextSystem();
                    }
                }
                else if(e.detail){//Firefox
                    //自定义事件：编写具体的实现逻辑

                    if (e.detail > 0) {
                        that.upSystem();
                    }
                    else {
                        that.nextSystem();
                    }
                }
            },
            refreshCarousel() {
                this.figure.style.transform = 'rotateY(' + this.currImage * -this.theta + 'rad)';
            },

            upSystem() {
                if (this.currImage <= -4) { return;}
                this.currImage -= 1;
                this.refreshCarousel();
            },
            nextSystem() {
                if (this.currImage >= 4) { return;}
                this.currImage += 1;
                this.refreshCarousel();
            },

            selectSubSystem(url) {
                this.$router.push(url);
            },
            logout () {
                const that = this;

                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要退出当前用户？</p>',
                    onOk: () => {
                        Util.ajax.get('/xm/sys/logout')
                            .then(function (response){
                                var router = new VueRouter();
                                Util.cookie.unset('xmgd');
                                Util.cookie.unset('xmgdname');
                                that.$store.commit('setToken', null);
                                router.push({ path: '/' });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    },
                    onCancel: () => {
                    }
                });


            },

            goto(info) {
                var third = false;  // 是否是第三方地址
                var url = info.url;

                if (url == "") {
                    this.$Message.error('您没有《'+ info.name +'》权限,如有需要,请与管理员联系！');
                    return;
                }

                if (url.indexOf('http://') >= 0) {
                    third = true;
                }
                else {
                    let router = new VueRouter();
                    router.push({path: info.url});
                }

            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .platforms-container {
        position: relative;
        height: 100%;
        height: 100%;
        min-height: 770px;
        background: url('./images/bg.png') no-repeat;
        background-position: center top;
        background-size: 100% auto;

        .title-img {
            position: relative;
            top: 70px;
            margin: 0 auto;
            width: 1027px;
            height: 111px;
            background: url('./images/title.png') no-repeat center;
        }

        .arrow{
            position: absolute;
            top: 400px;
            padding: 15px 0;
            width: 62px;
            height: 62px;
            font-size: 32px;
            text-align: center;
            color: #FFFFFF;
            background-color: rgba(21,37,78,0.2);
            border-radius: 50%;
            z-index: 2;
            cursor: pointer;

            &:hover {
                background-color: rgba(21,37,78,0.5);
            }


            &.arrow-left {
                left: 28px;
            }
            &.arrow-right {
                right: 28px;
            }
        }

        .btn-switcher {
            position: absolute;
            right: 45px;
            bottom: 58px;
            height: 39px;
            padding-left: 49px;
            font-size: 20px;
            color: #FFFFFF;
            background: url('./images/switcher.png') no-repeat left center;
            cursor: pointer;
            z-index: 2;
        }
        .subSystem-panel {
            position: absolute;
            padding-top: 50px;
            top: 250px;
            left: 0;
            margin-left: 0;
            width: 100%;
            perspective: 700px;
            -webkit-perspective-origin-y: top;
            text-align: center;
            overflow: hidden;


            .subSystem-ul {
                position: relative;
                margin: 0px auto;
                box-sizing: border-box;
                width: 20%;
                transform-style: preserve-3d;
                transition: transform 0.5s;

                > li {
                    position: relative;
                    width: 100%;
                    height: 590px;
                    min-height: 429px;
                    transition: top 0.3s;

                     &:not(:first-of-type) {
                          position: absolute;
                          left: 0;
                          top: 0;
                      }

                    .subSystem {
                        position: relative;
                        display: inline-block;
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        background-size: 100%;
                        background-repeat: no-repeat;


                        &.subSystem1 {
                            background-image: url(./images/1.png);
                        }
                        &.subSystem2 {
                            background-image: url(./images/2.png);
                        }
                        &.subSystem3 {
                            background-image: url(./images/3.png);
                        }
                        &.subSystem4 {
                            background-image: url(./images/4.png);
                        }
                        &.subSystem5 {
                            background-image: url(./images/5.png);
                        }
                        &.subSystem6 {
                            background-image: url(./images/6.png);
                        }
                        &.subSystem7 {
                            background-image: url(./images/7.png);
                        }
                        &.subSystem8 {
                            background-image: url(./images/8.png);
                        }
                        &.subSystem9 {
                            background-image: url(./images/9.png);
                        }
                        &.subSystem10 {
                            background-image: url(./images/10.png);
                        }
                        &.subSystem11 {
                            background-image: url(./images/11.png);
                        }


                        /*background-color: rgba(145,147,364,0.5);*/
                    }
                }
            }

        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
        }
    }
</style>