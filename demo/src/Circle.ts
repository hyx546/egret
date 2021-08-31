class Circle extends egret.Sprite {
  private shape: egret.Shape;
  private shapeX: number;
  private shapeY: number;
  private shapeR: number;
  private color: number;
  public static Event_Click: string = "event_click";
  private colorList: number[] = [
    13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553,
    10079232, 16737894, 16776960, 3381708, 13395456, 10066329, 13421619,
    16750899, 16777164, 39219, 39372, 13421772, 16737894, 16737792, 16777062,
    39270, 13395507, 16764057, 13395456, 13369446, 39321, 16763955,
  ];
  constructor(x: any, y: any, r: any) {
    super();
    this.init(x, y, r);
  }
  private init(x: number, y: number, r: number) {
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
  }

  /**
   * 生成随机颜色
   */
  private randomColor(): number {
    return this.colorList[Math.round(Math.random() * this.colorList.length)];
  }

  /**
   * 绘制画圆的矢量类
   */
  private paintCircle(r: number): egret.Shape {
    const shape = new egret.Shape();
    shape.graphics.beginFill(this.color);
    shape.graphics.drawCircle(0, 0, r);
    shape.graphics.endFill(); //设定矢量圆的位置为父类中心点
    // 为了使得移动坐标是以圆心为起点的
    shape.x = -r;
    shape.y = -r;
    return shape;
  }

  private onTouch(e) {
    const parent = this.parent;
    // 通知当前显示对象的父类
    parent.dispatchEventWith(Circle.Event_Click, false, this.color);
    // 防止移除时被点击（防止多次点击）
    this.touchEnabled = false;
    const tween: egret.Tween = egret.Tween.get(this);
    // 移除显示对象与显示对象的监听
    tween.to({ alpha: 0.1 }, 500, egret.Ease.sineOut).call(() => {
      this.visible = false;
      parent.removeChild(this);
      this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }, this);

    // 基于初始化坐标创建新的4个Circle类
    const circleList: Circle[] = [];
    const tweenList: egret.Tween[] = [];
    const radius: number = this.shapeR / 2;
    let index = 0;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const tempx = this.shapeX - this.shapeR + radius * 2 * j;
        const tempy = this.shapeY - this.shapeR + radius * 2 * i;
        circleList[index] = new Circle(tempx, tempy, radius);
        circleList[index].alpha = 0.1;
        circleList[index].scaleX = 0.8;
        circleList[index].scaleY = 0.8;
        parent.addChild(circleList[index]);
        tweenList[index] = egret.Tween.get(circleList[index]);
        tweenList[index].to(
          {
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
          },
          1000,
          egret.Ease.sineIn
        );
      }
      index++;
    }
  }
}
