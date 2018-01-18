<template>
    <div class="employee-container">
        <vHeader class="v-header"></vHeader>
        <div ref="routerViewBox" class="router-view">
            <router-view></router-view>
        </div>
        <vFooter class="footer"></vFooter>
    </div>
</template>

<script>
    import vHeader from '../../../components/employee/header/header.vue';
    import vFooter from '../../../components/layout/footer/footer.vue';
    export default {
        data() {
            return {}
        },
        components: {vHeader, vFooter},
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var that = this;
                that.initStyle();
                window.onresize = function() {
                    that.initStyle();
                }
            },
            initStyle() {
                if (!!this.$refs.routerViewBox) {
                    this.$refs.routerViewBox.style.minHeight = (this.$el.clientHeight - 87 - 30)+ 'px';
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .employee-container {
        position: relative;
        min-height: 100%;
        padding-top: 87px;
        padding-bottom: 30px;
        .v-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }

        .router-view {
            position: relative;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            padding-left: 14px;
            padding-right: 14px;
            padding-top: 12px;
            background-color: #ecebeb;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }
    }
</style>