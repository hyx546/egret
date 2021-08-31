var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, r) {
        var _this = _super.call(this) || this;
        _this.colorList = [
            13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553,
            10079232, 16737894, 16776960, 3381708, 13395456, 10066329, 13421619,
            16750899, 16777164, 39219, 39372, 13421772, 16737894, 16737792, 16777062,
            39270, 13395507, 16764057, 13395456, 13369446, 39321, 16763955,
        ];
        _this.init(x, y, r);
        return _this;
    }
    Circle.prototype.init = function (x, y, r) {
        this.color = this.randomColor();
        this.shapeX = x;
        this.shapeY = y;
        this.shapeR = r;
        this.shape = this.paintCircle(r);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(this.shape);
        this.x = x;
        this.y = y;
    };
    /**
     * 生成随机颜色
     */
    Circle.prototype.randomColor = function () {
        return this.colorList[Math.round(Math.random() * this.colorList.length)];
    };
    /**
     * 绘制画圆的矢量类
     */
    Circle.prototype.paintCircle = function (r) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(this.color);
        shape.graphics.drawCircle(0, 0, r);
        shape.graphics.endFill(); //设定矢量圆的位置为父类中心点
        // 为了使得移动坐标是以圆心为起点的
        shape.x = -r;
        shape.y = -r;
        return shape;
    };
    Circle.prototype.onTouch = function (e) {
        var _this = this;
        var parent = this.parent;
        // 通知当前显示对象的父类
        parent.dispatchEventWith(Circle.Event_Click, false, this.color);
        // 防止移除时被点击（防止多次点击）
        this.touchEnabled = false;
        var tween = egret.Tween.get(this);
        // 移除显示对象与显示对象的监听
        tween.to({ alpha: 0.1 }, 500, egret.Ease.sineOut).call(function () {
            _this.visible = false;
            parent.removeChild(_this);
            _this.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
        }, this);
        // 基于初始化坐标创建新的4个Circle类
        var circleList = [];
        var tweenList = [];
        var radius = this.shapeR / 2;
        var index = 0;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                var tempx = this.shapeX - this.shapeR + radius * 2 * j;
                var tempy = this.shapeY - this.shapeR + radius * 2 * i;
                circleList[index] = new Circle(tempx, tempy, radius);
                circleList[index].alpha = 0.1;
                circleList[index].scaleX = 0.8;
                circleList[index].scaleY = 0.8;
                parent.addChild(circleList[index]);
                tweenList[index] = egret.Tween.get(circleList[index]);
                tweenList[index].to({
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                }, 1000, egret.Ease.sineIn);
            }
            index++;
        }
    };
    Circle.Event_Click = "event_click";
    return Circle;
}(egret.Sprite));
__reflect(Circle.prototype, "Circle");
