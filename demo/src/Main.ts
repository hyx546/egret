class Main extends egret.DisplayObjectContainer {
  private count: number = 0;
  private textCount: egret.TextField;
  private textTimer: egret.TextField;
  private textDes: egret.TextField;
  private timer: egret.Timer;
  private color: number;
  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(Circle.Event_Click, this.onClickCircle, this);
  }

  private onAddToStage(event: egret.Event) {
    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin

      context.onUpdate = () => {};
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    };

    this.runGame().catch((e) => {
      console.log(e);
    });
  }

  private async runGame() {
    await this.loadResource();
    this.createGameScene();
    await platform.login();
    const userInfo = await platform.getUserInfo();
    console.log(userInfo);
  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig("resource/default.res.json", "resource/");
      await RES.loadGroup("preload", 0, loadingView);
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    this.initCicle();
  }

  /**
   * 初始化
   * @param name
   * @returns
   */
  private initCicle() {
    const stageW: number = this.stage.stageWidth;
    const stageH: number = this.stage.stageHeight;
    const bg = new egret.Shape();
    bg.graphics.beginFill(0xDB7093); //绘制背景，设定背景大小为应用窗口大小
    bg.graphics.drawRect(0, 0, stageW, stageH);
    bg.graphics.endFill();
    this.addChild(bg);
    this.banner();
    this.playContent();
    this.toast()
    // // 描述
    // this.textDes = new egret.TextField();
    // this.textDes.text = "点击第一个颜色开始";
    // this.textDes.y = (2 / 3) * stageH + 200;
    // this.textCount.textAlign =
    //   this.textTimer.textAlign =
    //   this.textDes.textAlign =
    //     egret.HorizontalAlign.CENTER;
    // this.textCount.width = this.textTimer.width = this.textDes.width = stageW;
    // this.textCount.textColor =
    //   this.textTimer.textColor =
    //   this.textDes.textColor =
    //     0x000000;

    // this.addChild(this.textCount);
    // this.addChild(this.textTimer);
    // this.addChild(this.textDes);
    // 计时器
    this.timer = new egret.Timer(1000, 30);
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    this.timer.addEventListener(
      egret.TimerEvent.TIMER_COMPLETE,
      this.onTimerComplete,
      this
    );
  }
  /**
   * 点击得分
   */
  private onClickCircle(e) {
    if (this.count === 0) {
      this.color = e.data;
      this.textCount.text = `分数：${++this.count}`;
      this.targetCircle();
      this.timer.start();
    } else if (this.color === e.data) {
      this.textCount.text = `分数：${++this.count}`;
    }
  }

  /**
   * 计时器回调
   */
  private onTimer(e) {
    this.textTimer.text =
      "倒计时:" + (this.timer.repeatCount - this.timer.currentCount);
  }

  /**
   * 计时器完成回调
   * @param e
   */
  private onTimerComplete(e) {
    this.textDes.text = "这不是极限，刷新再来一次！";
    // this.createGameScene();
    this.removeEventListener(Circle.Event_Click, this.onClickCircle, this);
  }

  /**
   * banner
   */
  private banner() {
    const spr: egret.Sprite = new egret.Sprite();
    // this.addChild(spr);
    // 分数版
    const score = new egret.Sprite();
    score.graphics.beginFill(0xFFF0F5);
    score.graphics.drawRect(0, 0, this.stage.stageWidth / 2, 150);
    this.textCount = new egret.TextField();
    this.textCount.textColor = 0x87CEFA;
    this.textCount.text = "分数：0";
    this.textCount.textAlign = egret.HorizontalAlign.CENTER;
    this.textCount.width = this.stage.stageWidth / 2;
    this.textCount.y = 70;
    score.addChild(this.textCount);
    spr.addChild(score);
    // 倒计时
    const time = new egret.Sprite();
    time.x = this.stage.stageWidth / 2;
    time.graphics.beginFill(0xFFF0F5);
    time.graphics.drawRect(0, 0, this.stage.stageWidth / 2, 150);
    this.textTimer = new egret.TextField();
    this.textTimer.textColor = 0x87CEFA;
    this.textTimer.text = "倒计时:30";
    this.textTimer.textAlign = egret.HorizontalAlign.CENTER;
    this.textTimer.width = this.stage.stageWidth / 2;
    this.textTimer.y = 70;
    time.addChild(this.textTimer);
    spr.addChild(time);
    this.addChild(spr);
  }

  /**
   * 初始化圆
   */
  private playContent() {
    const stageW: number = this.stage.stageWidth;
    const stageH: number = this.stage.stageHeight;
    const radius: number = 100;
    for (
      let i: number = 0;
      i < Math.floor((stageH / radius / 2 / 3) * 2);
      i++
    ) {
      for (let j: number = 0; j < Math.floor(stageW / radius / 2); j++) {
        const tempx: number = radius * 2 + 20 + radius * 2 * j;
        const tempy: number = radius * 2 + 200 + radius * 2 * i;
        const circle: Circle = new Circle(tempx, tempy, radius);
        this.addChild(circle);
      }
    }
  }
  /** 
   * 得分颜色
   */
  private targetCircle(){
    const shape = new egret.Shape();
    shape.graphics.beginFill(this.color);
    shape.graphics.drawCircle(0, 0, 25);
    shape.graphics.endFill();
    shape.y = 75;
    shape.x = this.stage.width/2;
    this.addChild(shape);
  }

  /** 
   * 弹框
   */
  private toast(){
    const toastSpr = new egret.Sprite();
    const rec = new egret.Shape();
    rec.graphics.beginFill(0xFFFFE0);
    rec.graphics.drawRoundRect(this.stage.width,this.stage.height,300,300,30);
    rec.graphics.lineStyle(10, 0x1E90FF);
    toastSpr.addChild(rec)
    this.addChildAt(toastSpr,10000)
  }
}
