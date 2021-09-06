class Main extends egret.DisplayObjectContainer {
  private msgText: egret.TextField;
  private msgPushText: egret.TextField;
  private socket: egret.WebSocket;
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
    const result = await RES.getResAsync('description_json');
    this.startAnimation(result);
    await platform.login();
    const userInfo = await platform.getUserInfo();
    console.log(userInfo);
  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig('resource/default.res.json', 'resource/');
      await RES.loadGroup('preload', 0, loadingView);
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
    this.drawScene();
    this.init();
  }
  /**
   * 绘制聊天窗口画面
   */
  private drawScene() {
    // 背景图
    const bg = new egret.Bitmap();
    bg.texture = RES.getRes('bg_png');
    bg.width = 600;
    bg.height = 800;
    this.addChild(bg);
    // 绘制文本框
    this.msgText = new egret.TextField();
    this.msgText.width = 500;
    this.msgText.height = 520;
    this.msgText.x = 50;
    this.msgText.y = 60;
    this.msgText.background = true;
    this.msgText.backgroundColor = 0xffffff;
    this.msgText.textColor = 0;
    this.msgText.size = 12;
    this.addChild(this.msgText);
    // 消息输入文本框
    this.msgPushText = new egret.TextField();
    this.msgPushText.width = 380;
    this.msgPushText.height = 70;
    this.msgPushText.x = 50;
    this.msgPushText.y = 625;
    this.msgPushText.background = true;
    this.msgPushText.backgroundColor = 0xffffff;
    this.msgPushText.textColor = 0;
    this.msgPushText.type = egret.TextFieldType.INPUT;
    this.addChild(this.msgPushText);
    // 消息发送按钮
    const pushMsgBtn = new egret.Sprite();
    pushMsgBtn.x = 460;
    pushMsgBtn.y = 625;
    this.addChild(pushMsgBtn);
    pushMsgBtn.touchEnabled = true;
    pushMsgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPushMsg, this);
    // 消息发送按UI
    const btnbg: egret.Bitmap = new egret.Bitmap();
    btnbg.width = 100;
    btnbg.height = 70;
    btnbg.texture = RES.getRes('btn_png');
    pushMsgBtn.addChild(btnbg);
  }
  private init() {
    this.socket = new egret.WebSocket();
    this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
    this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
    this.socket.connect('10.12.169.226', 8080);
  }

  // 连接成功回调
  private onSocketOpen(evt: egret.Event) {
    this.msgText.text = `\n The connection is successful`;
  }

  // 接收消息回调
  private onReceiveMessage(evt: egret.Event) {
    const msg = this.socket.readUTF();
    this.msgText.text += `\n Server:${msg}`;
  }

  // 发送信息函数
  private onPushMsg(evt: egret.TouchEvent) {
    console.log('---click');
    this.socket.writeUTF(this.msgPushText.text);
    this.socket.flush();
    this.msgPushText.text = '';
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
