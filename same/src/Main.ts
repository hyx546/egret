class Main extends egret.DisplayObjectContainer {
  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
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
    const result = await RES.getResAsync("description_json");
    this.startAnimation(result);
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

  private textfield: egret.TextField;

  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    // const img = RES.getRes("bg9_jpg");
    // const bg9Grid: egret.Bitmap = new egret.Bitmap(img);
    // // 九宫格
    // // bg9Grid.width = 600;
    // // bg9Grid.scale9Grid = new egret.Rectangle(70,70,380,380);

    // // 滤镜
    // const color: number = 0x33ccff; /// 光晕的颜色，十六进制，不包含透明度
    // const alpha: number = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
    // const blurX: number = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
    // const blurY: number = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
    // const strength: number = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
    // const quality: number = egret.BitmapFilterQuality.HIGH; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
    // const inner: boolean = false; /// 指定发光是否为内侧发光，暂未实现
    // const knockout: boolean = false; /// 指定对象是否具有挖空效果，暂未实现
    // const glowFilter: egret.GlowFilter = new egret.GlowFilter(
    //   color,
    //   alpha,
    //   blurX,
    //   blurY,
    //   strength,
    //   quality,
    //   inner,
    //   knockout
    // );

    // bg9Grid.filters = [glowFilter]

    // this.addChild(bg9Grid);
    // 文本超链接
    var label: egret.TextField = new egret.TextField();
    // event: 用于输出相应的文字/识别包含该链接的文字段
    label.textFlow = new egret.HtmlTextParser().parser(
      `<a href="event:https://www.baidu.com/">点我触发事件 </a>`
    );
    label.x = 10;
    label.y = 10;
    label.touchEnabled = true;
    label.addEventListener(
      egret.TextEvent.LINK,
      function (evt: egret.TextEvent) {
        console.log(evt.text);
      },
      this
    );
    this.addChild(label);
  }

  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  private createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }

  /**
   * 描述文件加载成功，开始播放动画
   * Description file loading is successful, start to play the animation
   */
  private startAnimation(result: string[]) {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map((text) => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
      count++;
      if (count >= textflowArr.length) {
        count = 0;
      }
      let textFlow = textflowArr[count];

      // 切换描述内容
      // Switch to described content
      textfield.textFlow = textFlow;
      let tw = egret.Tween.get(textfield);
      tw.to({ alpha: 1 }, 200);
      tw.wait(2000);
      tw.to({ alpha: 0 }, 200);
      tw.call(change, this);
    };

    change();
  }
}