<template>
    <div class="rankPanel-container">
        <div class="station station1">
            <div class="station-name"><span class="station-name-inner">镇海路</span></div>
            <div class="in-box" :class="[inClsName]">
                <span>1520</span>
            </div>
            <div class="out-box" :class="[outClsName]">
                <span>1248</span>
            </div>
        </div>
        <div class="station station2">
            <div class="station-name"><span class="station-name-inner">集美软件园</span></div>
            <div class="in-box" :class="[inClsName]">
                <span>1520</span>
            </div>
            <div class="out-box" :class="[outClsName]">
                <span>1248</span>
            </div>
        </div>
        <div class="station station3">
            <div class="station-name"><span class="station-name-inner">集美学村</span></div>
            <div class="in-box" :class="[inClsName]">
                <span>1520</span>
            </div>
            <div class="out-box" :class="[outClsName]">
                <span>1248</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                maxNum: 20000,
                inClsName: 'bar-5',
                outClsName: 'bar-5',
            }
        },
        mounted() {
            this.setClass();
        },
        methods: {
            setClass() {
                var v = 66;
                if (v > 95) { this.inClsName = 'bar-100'; }
                else if (v > 90) { this.inClsName = 'bar-95'; }
                else if (v > 85) { this.inClsName = 'bar-90'; }
                else if (v > 80) { this.inClsName = 'bar-85'; }
                else if (v > 75) { this.inClsName = 'bar-80'; }
                else if (v > 70) { this.inClsName = 'bar-75'; }
                else if (v > 65) { this.inClsName = 'bar-70'; }
                else if (v > 60) { this.inClsName = 'bar-65'; }
                else if (v > 55) { this.inClsName = 'bar-60'; }
                else if (v > 50) { this.inClsName = 'bar-55'; }
                else if (v > 45) { this.inClsName = 'bar-50'; }
                else if (v > 40) { this.inClsName = 'bar-45'; }
                else if (v > 35) { this.inClsName = 'bar-40'; }
                else if (v > 30) { this.inClsName = 'bar-35'; }
                else if (v > 25) { this.inClsName = 'bar-30'; }
                else if (v > 20) { this.inClsName = 'bar-25'; }
                else if (v > 15) { this.inClsName = 'bar-20'; }
                else if (v > 10) { this.inClsName = 'bar-15'; }
                else if (v > 5) { this.inClsName = 'bar-10'; }
                else if (v > 0) { this.inClsName = 'bar-5'; }
                else { this.inClsName = 'bar-0'; }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss"  scoped>
    .rankPanel-container {
        width: 389px;
        height: 467px;
        background: url("./images/rank-panel.png");
        user-select: none;
        .station {
            position: absolute;
            left: 0;
            width: 100%;
            height: 120px;
            color: #FFFFFF;
            overflow: hidden;
            &.station1 {
                top: 40px;
            }
            &.station2 {
                top: 182px;
            }
            &.station3 {
                top: 324px;
            }

            .station-name {
                position: absolute;
                top: 0px;
                left: 88px;
                display: table;
                width: 20px;
                height: 100px;
                font-size: 16px;
                line-height: 18px;

                .station-name-inner {
                    display: table-cell;
                    vertical-align:middle;
                    text-align:center;
                }
            }
        }

        .in-box, .out-box {
            position: absolute;
            top: -15px;
            left: 110px;
            width: 160px;
            height: 160px;
            text-align: center;
            font-size: 20px;
            background: url('./images/circle-gray.png') no-repeat center;


            & > span {
                line-height: 160px;
            }
        }
        .in-box {
            &:after {
                position: absolute;
                top: 0;
                left:0;
                display: block;
                content: " ";
                width: 160px;
                height: 160px;
            }

            &.bar-5:after { background: url('./images/c_orange/5.png') no-repeat center; }
            &.bar-10:after { background: url('./images/c_orange/10.png') no-repeat center; }
            &.bar-15:after { background: url('./images/c_orange/15.png') no-repeat center; }
            &.bar-20:after { background: url('./images/c_orange/20.png') no-repeat center; }
            &.bar-25:after { background: url('./images/c_orange/25.png') no-repeat center; }
            &.bar-30:after { background: url('./images/c_orange/30.png') no-repeat center; }
            &.bar-35:after { background: url('./images/c_orange/35.png') no-repeat center; }
            &.bar-40:after { background: url('./images/c_orange/40.png') no-repeat center; }
            &.bar-45:after { background: url('./images/c_orange/45.png') no-repeat center; }
            &.bar-50:after { background: url('./images/c_orange/50.png') no-repeat center; }
            &.bar-55:after { background: url('./images/c_orange/55.png') no-repeat center; }
            &.bar-60:after { background: url('./images/c_orange/60.png') no-repeat center; }
            &.bar-65:after { background: url('./images/c_orange/65.png') no-repeat center; }
            &.bar-70:after { background: url('./images/c_orange/70.png') no-repeat center; }
            &.bar-75:after { background: url('./images/c_orange/75.png') no-repeat center; }
            &.bar-80:after { background: url('./images/c_orange/80.png') no-repeat center; }
            &.bar-85:after { background: url('./images/c_orange/85.png') no-repeat center; }
            &.bar-90:after { background: url('./images/c_orange/90.png') no-repeat center; }
            &.bar-95:after { background: url('./images/c_orange/95.png') no-repeat center; }
            &.bar-100:after { background: url('./images/c_orange/100.png') no-repeat center; }

        }
        .out-box {
            left: 224px;
            &:after {
                position: absolute;
                top: 0;
                left:0;
                display: block;
                content: " ";
                width: 160px;
                height: 160px;
            }

            &.bar-5:after { background: url('./images/c_blue/5.png') no-repeat center; }
            &.bar-10:after { background: url('./images/c_blue/10.png') no-repeat center; }
            &.bar-15:after { background: url('./images/c_blue/15.png') no-repeat center; }
            &.bar-20:after { background: url('./images/c_blue/20.png') no-repeat center; }
            &.bar-25:after { background: url('./images/c_blue/25.png') no-repeat center; }
            &.bar-30:after { background: url('./images/c_blue/30.png') no-repeat center; }
            &.bar-35:after { background: url('./images/c_blue/35.png') no-repeat center; }
            &.bar-40:after { background: url('./images/c_blue/40.png') no-repeat center; }
            &.bar-45:after { background: url('./images/c_blue/45.png') no-repeat center; }
            &.bar-50:after { background: url('./images/c_blue/50.png') no-repeat center; }
            &.bar-55:after { background: url('./images/c_blue/55.png') no-repeat center; }
            &.bar-60:after { background: url('./images/c_blue/60.png') no-repeat center; }
            &.bar-65:after { background: url('./images/c_blue/65.png') no-repeat center; }
            &.bar-70:after { background: url('./images/c_blue/70.png') no-repeat center; }
            &.bar-75:after { background: url('./images/c_blue/75.png') no-repeat center; }
            &.bar-80:after { background: url('./images/c_blue/80.png') no-repeat center; }
            &.bar-85:after { background: url('./images/c_blue/85.png') no-repeat center; }
            &.bar-90:after { background: url('./images/c_blue/90.png') no-repeat center; }
            &.bar-95:after { background: url('./images/c_blue/95.png') no-repeat center; }
            &.bar-100:after { background: url('./images/c_blue/100.png') no-repeat center; }
        }
    }
</style>