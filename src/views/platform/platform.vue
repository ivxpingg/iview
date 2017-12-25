<template>
    <div class="platforms">
        <vHeader></vHeader>
        <div class="subSystem-panel">
            <router-link v-for="item in mList" class="subSystem" :to="item.appFunction.url">{{item.appFunction.funcName}}</router-link>
        </div>
    </div>

</template>

<script>
    import Util from '../../libs/util';
    import vHeader from '../../components/layout/header/header.vue';
    export default {
        data() {
            return {
                mList: []
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
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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

            text-align: center;

            .subSystem {
                display: inline-block;
                margin: 10px;
                width: 250px;
                height: 200px;
                line-height: 200px;
                font-size: 20px;

                border: 1px solid #333;
            }

        }
    }
</style>