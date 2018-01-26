<template>
    <div> 测试iframe 跨域交互 </div>
</template>
<script>
    export default{
        data() {
            return {
                num: 0
            }
        },
        mounted() {
            var that = this;
            var w = window;
            window.parent.postMessage('son','*');
            setInterval(function () {
                that.num += 1;
                var t = 'son' + that.num;
                w.parent.postMessage(t,'*');
            }, 3000);

            window.onmessage = function (ev) {
                debugger
                console.log(ev.data);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>