<template>
    <div class="platforms">
        <vHeader></vHeader>
        <div ref="panel" class="subSystem-panel">
            <ul ref="subBox" class="subSystem-ul">
                <li v-for="(item, idx) in mList">
                    <router-link class="subSystem" :style="{margin: 0, backgroundImage: 'url(/static/img/'+(idx+1)+'.jpg)'}" :to="item.appFunction.url" >{{item.appFunction.funcName}}</router-link>
                </li>
                <li v-for="(item, idx) in mList">
                    <router-link class="subSystem" :style="{margin: 0, backgroundImage: 'url(/static/img/'+(idx+1)+'.jpg)'}" :to="item.appFunction.url" >{{item.appFunction.funcName}}</router-link>
                </li>
                <li v-for="(item, idx) in mList">
                    <router-link class="subSystem" :style="{margin: 0, backgroundImage: 'url(/static/img/'+(idx+1)+'.jpg)'}" :to="item.appFunction.url" >{{item.appFunction.funcName}}</router-link>
                </li>

            </ul>
        </div>
    </div>

</template>

<script>
    import Util from '../../libs/util';
    import vHeader from '../../components/layout/header/header.vue';
    export default {
        data() {
            return {
                domain: Util.domain,
                mList: [],
                timer: 100,
                direction: 'left',
                rad: 0.005
            }
        },
        components: {vHeader},
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
                    currImage = 0;

                this.setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
            },
            setupCarousel(n, s) {
                var figure = this.$refs.subBox,
                    // nav = root.querySelector('nav'),
                    images = figure.children,
                    n = images.length,
                    gap = 35,
                    theta = 2 * Math.PI / n,
                    currImage = 0;

                var apothem = s / (2 * Math.tan(Math.PI / n));

                this.$refs.subBox.style.transformOrigin = '50% 50% ' + -apothem + 'px';

                for (var i = 0; i < n; i++) {
                    this.$refs.subBox.children[i].style.padding = gap + 'px';
                }for (i = 1; i < n; i++) {
                    this.$refs.subBox.children[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
                    this.$refs.subBox.children[i].style.transform = 'rotateY(' + i * theta + 'rad)';
                }

                figure.style.transform = 'rotateY(' + currImage * -theta + 'rad)';

                var that = this;

                setInterval(function(){
                     var value = parseFloat(figure.style.transform.split('(')[1].split('rad')[0]);

                     if (that.direction == 'left') {
                         value += that.rad;
                     }
                     else {
                         value -= that.rad;
                     }

                    figure.style.transform = 'rotateY(' + value + 'rad)';

                }, that.timer);


                this.$refs.panel.onmouseover = function (e) {
                   // var target = this;

                    var clientWidth = this.clientWidth;
                    var subBoxWidth = that.$refs.subBox.clientWidth;
                    var paddingLeft = (clientWidth / 2) - (subBoxWidth / 2);



                    var offsetX = e.offsetX;


                    if (offsetX > (clientWidth / 2)) {
                        that.direction = 'right';
                    }
                    else {
                        that.direction = 'left';
                    }

                    if (offsetX > paddingLeft && offsetX < (paddingLeft + subBoxWidth)) {
                        that.rad = 0;
                    }
                    else {
                        that.rad = 0;
                    }

                   // console.dir(figure.style.transform);
                }

                this.$refs.panel.onmouseout = function (e) {
                    that.rad = 0;
                }
                this.$refs.panel.onmouseleave = function (e) {
                    that.rad = 0.005;
                }

            },

            selectSubSystem(url) {
                this.$router.push(url);
            }
        }

    }
</script>

<style lang="scss" type="stylesheet/scss" scoped>
    .platforms {
         height: 100%;
        .subSystem-panel {
            width: 1440px;
            margin: 200px auto;
            perspective: 500px;
            text-align: center;
            overflow: hidden;


            .subSystem-ul {
                margin: 0px auto;
                box-sizing: border-box;
                width: 40%;
                transform-style: preserve-3d;
                /*transition: transform 0.5s;*/

                > li {
                     width: 100%;

                     &:not(:first-of-type) {
                          position: absolute;
                          left: 0;
                          top: 0;
                      }

                    .subSystem {
                        display: inline-block;
                        margin: 0;
                        width: 100%;
                        height: 350px;
                        line-height: 350px;
                        font-size: 20px;

                        background-size: 100%;
                        background-repeat: no-repeat;

                        background-color: rgba(145,147,364,0.5);
                    }
                }
            }

        }
    }
</style>