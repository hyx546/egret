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
        _this.count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(Circle.Event_Click, _this.onClickCircle, _this);
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
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
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
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
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
     * ??????????????????
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.initCicle();
        var img = RES.getRes("bg_jpg");
    };
    /**
     * ?????????
     * @param name
     * @returns
     */
    Main.prototype.initCicle = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xdb7093); //??????????????????????????????????????????????????????
        bg.graphics.drawRect(0, 0, stageW, stageH);
        bg.graphics.endFill();
        this.addChild(bg);
        this.banner();
        this.playContent();
        // ?????????
        this.timer = new egret.Timer(1000, 30);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
    };
    /**
     * ????????????
     */
    Main.prototype.onClickCircle = function (e) {
        if (this.count === 0) {
            this.color = e.data;
            this.textCount.text = "\u5206\u6570\uFF1A" + ++this.count;
            this.targetCircle();
            this.timer.start();
        }
        else if (this.color === e.data) {
            this.textCount.text = "\u5206\u6570\uFF1A" + ++this.count;
        }
    };
    /**
     * ???????????????
     */
    Main.prototype.onTimer = function (e) {
        this.textTimer.text =
            "?????????:" + (this.timer.repeatCount - this.timer.currentCount);
    };
    /**
     * ?????????????????????
     * @param e
     */
    Main.prototype.onTimerComplete = function (e) {
        this.textDes.text = "???????????????????????????????????????";
        this.removeEventListener(Circle.Event_Click, this.onClickCircle, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer = null;
    };
    /**
     * banner
     */
    Main.prototype.banner = function () {
        var spr = new egret.Sprite();
        // this.addChild(spr);
        // ?????????
        var score = new egret.Sprite();
        score.graphics.beginFill(0xfff0f5);
        score.graphics.drawRect(0, 0, this.stage.stageWidth / 2, 150);
        this.textCount = new egret.TextField();
        this.textCount.textColor = 0x87cefa;
        this.textCount.text = "?????????0";
        this.textCount.textAlign = egret.HorizontalAlign.CENTER;
        this.textCount.width = this.stage.stageWidth / 2;
        this.textCount.y = 70;
        score.addChild(this.textCount);
        spr.addChild(score);
        // ?????????
        var time = new egret.Sprite();
        time.x = this.stage.stageWidth / 2;
        time.graphics.beginFill(0xfff0f5);
        time.graphics.drawRect(0, 0, this.stage.stageWidth / 2, 150);
        this.textTimer = new egret.TextField();
        this.textTimer.textColor = 0x87cefa;
        this.textTimer.text = "?????????:30";
        this.textTimer.textAlign = egret.HorizontalAlign.CENTER;
        this.textTimer.width = this.stage.stageWidth / 2;
        this.textTimer.y = 70;
        time.addChild(this.textTimer);
        spr.addChild(time);
        this.addChild(spr);
    };
    /**
     * ????????????
     */
    Main.prototype.playContent = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var radius = 100;
        for (var i = 0; i < Math.floor((stageH / radius / 2 / 3) * 2); i++) {
            for (var j = 0; j < Math.floor(stageW / radius / 2); j++) {
                var tempx = radius * 2 + 20 + radius * 2 * j;
                var tempy = radius * 2 + 200 + radius * 2 * i;
                var circle = new Circle(tempx, tempy, radius);
                this.addChild(circle);
            }
        }
    };
    /**
     * ????????????
     */
    Main.prototype.targetCircle = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(this.color);
        shape.graphics.drawCircle(0, 0, 25);
        shape.graphics.endFill();
        shape.y = 75;
        shape.x = this.stage.width / 2 - 20;
        this.addChild(shape);
    };
    /**
     * ??????
     */
    Main.prototype.toast = function () {
        var toastSpr = new egret.Sprite();
        var rec = new egret.Shape();
        rec.graphics.beginFill(0xffffe0);
        rec.graphics.drawRoundRect(this.stage.width, this.stage.height, 300, 300, 30);
        rec.graphics.lineStyle(10, 0x1e90ff);
        toastSpr.addChild(rec);
        this.addChildAt(toastSpr, 10000);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
