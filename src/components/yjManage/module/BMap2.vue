<template>
    <div class="bmap-container">
        <div class="bmap" id="bmap">

        </div>

        <div class="bus-info-panel" v-show="busInfo.length > 0">
            <div class="title">承运公交公司信息</div>
            <div v-for="item in busInfo" class="info-box">
                <div class="item">{{item.department}}</div>
                <div class="item">值班电话<span>{{item.tel}}</span></div>
                <div class="item">负责人<span>{{item.name1}}</span> <span>{{item.phone1}}</span></div>
                <div class="item">联系人<span>{{item.name2}}</span> <span>{{item.phone2}}</span></div>

            </div>
        </div>
    </div>
</template>
<script>
    import bmap_main from './js/bmap_main2';
    export default {
        data() {
            return {
                busInfo: []
            }
        },
        mounted() {
            var that = this;
            bmap_main(that, 'bmap');
        },
        methods:{}
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .bmap-container {
        width: 100%;
        height: 100%;

        .bmap {
            width: 100%;
            height: 100%;
        }

        .bus-info-panel {
            position: absolute;
            top: 30px;
            right: 20px;
            background: #63b1e3;
            overflow: hidden;
            border-radius: 10px;
            .title {
                height: 36px;
                color: #FFFFFF;
                font-size: 16px;
                line-height: 36px;
                text-align: center;
            }

            .info-box{
                margin: 0 6px 3px;
                width: 240px;
                color: #3e3a39;
                font-size: 14px;
                background: #FFF;
                overflow: hidden;

                &:first-child {
                    border-radius: 10px 10px 0 0;
                }
                &:last-child {
                    border-radius: 0 0 10px 10px;
                    margin-bottom: 6px;
                }
                .item {
                    padding-left: 11px;
                    height: 29px;
                    text-align: left;
                    line-height: 29px;
                    border-bottom: 1px solid #eaeef2;
                    &:first-child{
                        font-size: 16px;
                        line-height: 35px;
                    }

                    > span {
                        padding-left: 16px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .bmap-container {

        // 去掉百度地图Logo
        .anchorBL {
            display: none;
        }
    }
</style>