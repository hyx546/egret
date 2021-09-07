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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () { };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync('description_json')];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig('resource/default.res.json', 'resource/')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup('preload', 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
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
        /**
         * 文本超链接
         */
        // var label: egret.TextField = new egret.TextField();
        // // event: 用于输出相应的文字/识别包含该链接的文字段
        // label.textFlow = new egret.HtmlTextParser().parser(`<a href="event:https://www.baidu.com/">点我触发事件 </a>`);
        // label.x = 10;
        // label.y = 10;
        // label.touchEnabled = true;
        // label.addEventListener(
        //   egret.TextEvent.LINK,
        //   function (evt: egret.TextEvent) {
        //     console.log(evt.text);
        //   },
        //   this
        // );
        // this.addChild(label);
        /**
         * 可输入文本
         */
        // const userLabel: egret.TextField = new egret.TextField();
        // userLabel.text = '用户名：';
        // userLabel.x = 10;
        // userLabel.y = 10;
        // this.addChild(userLabel);
        // const userInput: egret.TextField = new egret.TextField();
        // // 可输入文本
        // userInput.type = egret.TextFieldType.INPUT;
        // // 星号屏蔽输入内容
        // userInput.displayAsPassword = true;
        // userInput.text = '';
        // userInput.x = 10;
        // userInput.y = 40;
        // userInput.width = 140;
        // userInput.bold = true;
        // userInput.background = true;
        // userInput.backgroundColor = 0x666666;
        // this.addChild(userInput);
        /**
         * BitmapText
         */
        // const bitmapText = new egret.BitmapText();
        // bitmapText.font = RES.getRes('font_fnt');
        // this.addChild(bitmapText);
        // bitmapText.text = '1235632';
        /**
         * 动画
         */
        // 逐帧动画
        // var data = RES.getRes('skip_json');
        // var tex = RES.getRes('skip_png');
        // var mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
        // var mc: egret.MovieClip = new egret.MovieClip(mcf.generateMovieClipData('skip'));
        // this.addChild(mc);
        // mc.play();
        // // 从第三帧播放
        // // mc.gotoAndPlay(3);
        // mc.addEventListener(
        //   egret.Event.COMPLETE,
        //   (e: egret.Event) => {
        //     console.log(e.type); //1次
        //   },
        //   this
        // );
        // 缓动动画
        // const shp: egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0x00ff00);
        // shp.graphics.drawRect(0, 0, 100, 100);
        // shp.graphics.endFill();
        // shp.x = 50;
        // this.addChild(shp);
        // egret.Tween.get(shp, { onChange: this.changeCb })
        //   .to({ x: 100 }, 1000)
        //   .call((e) => console.log('complete'));
        /**
         * websocket
         */
        this.socket = new egret.WebSocket();
        this.socket.connect('echo.websocket.org', 8080);
        this.socket.addEventListener(egret.Event.CONNECT, function (e) {
            console.log('------aa');
            _this.socket.writeUTF('这是即将发送的数据，为UTF-8编码');
            _this.socket.flush();
        }, this);
    };
    Main.prototype.complete = function () {
        var msg = this.socket.readUTF();
        console.log('------', msg);
    };
    Main.prototype.changeCb = function (e) {
        console.log('----e', e.target);
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ alpha: 1 }, 200);
            tw.wait(2000);
            tw.to({ alpha: 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
