/**
 * 鼠标缩放设置
 */


/**
 *
 * @param target  缩放目标
 * @param proportion 缩放的比例
 * @param maxProportion 最大比例
 * @param minProportion 最小比例
 * */
var scrollScale = function(vm, target, proportion, maxProportion, minProportion) {
    proportion = proportion || 0.1;
    maxProportion = maxProportion || 1;
    minProportion = minProportion || 0.3;

    target.addEventListener("mousewheel", function(e) {
        vm.popupShow = false;
        var offsetX = e.offsetX;
        var offsetY = e.offsetY;

        var top = this.style.top == '' ? 0 : parseFloat(this.style.top);
        var left = this.style.left == '' ? 0 : parseFloat(this.style.left);

        var w = offsetX * proportion;
        var h = offsetY * proportion;

        var num = this.style.transform == "" ? 1 : parseFloat(this.style.transform.split('(')[1].split(')')[0]);

        // 向上滑 为正数
        if( e.wheelDelta > 0 && num < maxProportion ) {
            vm.scale = num + proportion;

            this.style.transform = 'scale('+ (num + proportion) +')';
            this.style.left = (left - w) + 'px';
            this.style.top = (top - h) + 'px';
        };

        // 向下滑 为负数
        if( e.wheelDelta < 0 && num > minProportion) {
            vm.scale = num - proportion;

            this.style.transform = 'scale('+ (num - proportion) +')';
            this.style.left = (left + w) + 'px';
            this.style.top = (top + h) + 'px';
        }

    }, true);
}

module.exports = scrollScale;