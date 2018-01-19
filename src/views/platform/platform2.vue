<template>
    <div class="platforms-container">
        <div class="title-img"></div>
        <div ref="panel" class="subSystem-panel">
            <ul ref="subBox" class="subSystem-ul">
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem1" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem2" to="d" ></router-link></li>
                <li><router-link class="subSystem subSystem3" to="d" ></router-link></li>

                <!--<li v-for="(item, idx) in mList">-->
                    <!--<router-link class="subSystem" :style="{margin: 0, backgroundImage: 'url(/static/img/'+(idx+1)+'.jpg)'}" :to="item.appFunction.url" >{{item.appFunction.funcName}}</router-link>-->
                <!--</li>-->

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
            }
        },
        components: {vFooter},
        mounted() {

            this.getData();


        },
        methods: {
            getData () {
                var that = this;
                Util.ajax.get('/xm/sys/auth/menuList')
                    .then(function (response) {
                        that.mList = response.result || null;
                        setTimeout(function () {
                            that.threeD();
                        }, 0)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            threeD() {

                var figure = this.$refs.subBox,
                    // nav = root.querySelector('nav'),
                    images = figure.children,
                    n = images.length,
                    gap = 20, //root.dataset.gap || 0,
                    // bfc = 'bfc' in root.dataset,
                    theta = 2 * Math.PI / n,
                    currImage = -1;

                this.setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));

            },
            setupCarousel(n, s) {
                this.figure = this.$refs.subBox;
                    // nav = root.querySelector('nav'),
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

                for (i = 1; i < n; i++) {
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
                this.currImage -= 1;
                this.refreshCarousel();
            },
            nextSystem() {
                this.currImage += 1;
                this.refreshCarousel();
            },



            selectSubSystem(url) {
                this.$router.push(url);
            },
            logout () {
                const that = this;
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
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .platforms-container {
        position: relative;
         height: 100%;
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
            left: 50%;
            margin-left: -720px;
            width: 1440px;
            perspective: 500px;
            -webkit-perspective-origin-y: top;
            text-align: center;
            overflow: hidden;


            .subSystem-ul {
                position: relative;
                margin: 0px auto;
                box-sizing: border-box;
                width: 284px;
                transform-style: preserve-3d;
                transition: transform 0.5s;

                > li {
                    position: relative;
                    width: 100%;
                    transition: top 0.3s;

                     &:not(:first-of-type) {
                          position: absolute;
                          left: 0;
                          top: 0;
                      }

                    .subSystem {
                        display: inline-block;
                        margin: 0;
                        width: 100%;
                        height: 429px;
                        line-height: 350px;
                        font-size: 20px;

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