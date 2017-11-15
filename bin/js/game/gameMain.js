var gameMain = /** @class */ (function () {
    function gameMain() {
        this._startx = 90;
        this._starty = 80;
        this._players = new Array();
        server.on("user.JoinRep", this, this.handleJoinRep);
        server.on("game.GameMessageNtf", this, this.handleGameMessageNtf);
        server.on("game.QuitGameRep", this, this.handleQuitGameRep);
        server.on("game.SetSession", this, this.handleSetSession);
        server.on("game.MapNtf", this, this.handleMapNtf);
        server.on("game.OperateNtf", this, this.handleOperateNtf);
        server.on("game.GameEndNtf", this, this.handleGameEndNtf);
    }
    gameMain.prototype.handleGameEndNtf = function (msg) {
        console.log("游戏结束！");
    };
    gameMain.prototype.destroyBlock = function (blocks, index) {
        if (blocks && blocks[index]) {
            blocks[index].removeSelf();
            blocks[index].destroy();
            blocks[index] = undefined;
            this._map[index] = 3;
        }
    };
    gameMain.prototype.handleOperateNtf = function (msg) {
        if (msg) {
            if (msg.result == 2) {
                for (var i = 0; i < msg.opt.length; i = i + 3) {
                    var uid = msg.opt[i];
                    var index = msg.opt[i + 1];
                    var bomb = new Laya.Sprite();
                    bomb.loadImage("comp/bomb.png");
                    this._bg.addChild(bomb);
                    var pos = this.calc_pos_xy(index, this._width, this._height - 10);
                    bomb.pos(pos[0], pos[1] - 10);
                    this._bg.setChildIndex(this._bg.getChildAt(this._bg.numChildren - 1), this._bg.numChildren - 2);
                    if (uid == this._uid) {
                        this._self._blocks[index] = bomb;
                    }
                    else {
                        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                            var p = _a[_i];
                            if (p._uid == uid) {
                                p._blocks[index] = bomb;
                                break;
                            }
                        }
                    }
                }
            }
            else if (msg.result == 3) {
                var index = msg.opt[0];
                if (msg.uid == this._uid) {
                    this.destroyBlock(this._self._blocks, index);
                    for (var i = 1; i < msg.opt.length; ++i) {
                        this.destroyBlock(this._self._blocks, msg.opt[i]);
                    }
                    if (msg.score && msg.score > 0) {
                        this._bg.m_score1.text = msg.score.toString();
                    }
                }
                else {
                    for (var _b = 0, _c = this._players; _b < _c.length; _b++) {
                        var p = _c[_b];
                        if (p._uid == msg.uid) {
                            this.destroyBlock(p._blocks, index);
                            for (var i = 1; i < msg.opt.length; ++i) {
                                this.destroyBlock(p._blocks, msg.opt[i]);
                            }
                            if (msg.score && msg.score > 0) {
                                this._bg.m_score2.text = msg.score.toString();
                            }
                        }
                    }
                }
            }
        }
    };
    gameMain.prototype.calc_pos_xy = function (i, width, height, basex, basey) {
        var x = i % 15;
        var y = Math.floor(i / 15);
        basex = basex ? basex : this._startx;
        basey = basey ? basey : this._starty;
        width = width ? width : this._width;
        height = height ? height : this._height;
        return [basex + x * width, basey + y * height];
    };
    gameMain.prototype.createOtherPlayer = function (uid, index) {
        var other = new player();
        other._uid = uid;
        other.loadImage("comp/front.png");
        this._bg.addChild(other);
        var pos = this.calc_pos_xy(index, this._width, this._height - 20);
        other.pos(pos[0], pos[1]);
        this._players.push(other);
    };
    gameMain.prototype.calc_pos_index = function (x, y) {
        var yy = Math.floor((y - this._starty) / (this._height - 10)) * 15;
        var xx = (x - this._startx) / this._width;
        var ii = Math.floor(Math.floor(yy) + xx);
        return ii;
    };
    gameMain.prototype.send_pos = function (pos_index) {
        if (server) {
            pos_index = pos_index ? pos_index : this.calc_pos_index(this._self.x, this._self.y + 20);
            server.sendData("game.SelfMessageNtf", { session: this._session, pos: pos_index });
        }
    };
    gameMain.prototype.can_move = function (posx, posy, opt) {
        var index = this.calc_pos_index(posx, posy);
        if (this._map[index] && this._map[index] == Define.EMPTYPLACE) {
            return true;
        }
        return false;
    };
    gameMain.prototype.moveDown = function () {
        if (this.can_move(this._self.x, this._self.y + 20 + this._height - 10, Define.DOWN)) {
            this._self.y += this._height - 10;
            this.send_pos();
        }
    };
    gameMain.prototype.moveUp = function () {
        if (this.can_move(this._self.x, this._self.y + 20 - this._height + 10, Define.UP)) {
            this._self.y -= this._height - 10;
            this.send_pos();
        }
    };
    gameMain.prototype.moveLeft = function () {
        if (this.can_move(this._self.x - this._width, this._self.y + 20, Define.LEFT)) {
            this._self.x -= this._width;
            this.send_pos();
        }
    };
    gameMain.prototype.moveRight = function () {
        if (this.can_move(this._self.x + this._width, this._self.y + 20, Define.RIGHT)) {
            this._self.x += this._width;
            this.send_pos();
        }
    };
    gameMain.prototype.handleMove = function (opt) {
        switch (opt) {
            case Define.DOWN:
                this.moveDown();
                break;
            case Define.UP:
                this.moveUp();
                break;
            case Define.LEFT:
                this.moveLeft();
                break;
            case Define.RIGHT:
                this.moveRight();
                break;
            default:
                break;
        }
    };
    gameMain.prototype.handleBomb = function () {
        var index = this.calc_pos_index(this._self.x, this._self.y + 20);
        server.sendData("game.OperateReq", { session: this._session, optn: 2, opt: [this._uid, index + 1, 1] });
    };
    gameMain.prototype.initButton = function () {
        var _this = this;
        var bg = this._bg;
        bg.m_down.on(Laya.Event.CLICK, this, this.handleMove, [Define.DOWN]);
        bg.m_up.on(Laya.Event.CLICK, this, this.handleMove, [Define.UP]);
        bg.m_left.on(Laya.Event.CLICK, this, this.handleMove, [Define.LEFT]);
        bg.m_right.on(Laya.Event.CLICK, this, this.handleMove, [Define.RIGHT]);
        bg.bt_bomb.on(Laya.Event.CLICK, this, this.handleBomb);
        bg.m_down.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_down.alpha = 1; });
        bg.m_up.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_up.alpha = 1; });
        bg.m_left.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_left.alpha = 1; });
        bg.m_right.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.m_right.alpha = 1; });
        bg.bt_bomb.on(Laya.Event.MOUSE_DOWN, this, function () { _this._bg.bt_bomb.alpha = 1; });
        bg.m_down.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_down.alpha = 0.5; });
        bg.m_up.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_up.alpha = 0.5; });
        bg.m_left.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_left.alpha = 0.5; });
        bg.m_right.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.m_right.alpha = 0.5; });
        bg.bt_bomb.on(Laya.Event.MOUSE_UP, this, function () { _this._bg.bt_bomb.alpha = 0.5; });
    };
    gameMain.prototype.handleMapNtf = function (msg) {
        this._map = msg.wall;
        this._bg = new gameBg();
        this._self = new player();
        this._bg.bt_close.on(Laya.Event.CLICK, this, this.closeBack);
        Laya.stage.addChild(this._bg);
        this.initButton();
        var bg = this._bg;
        for (var i = 0; i < msg.wall.length; ++i) {
            var type = msg.wall[i];
            var x = i % 15;
            var y = Math.floor(i / 15);
            if (type == Define.STRICK) {
                var sp = new Laya.Sprite();
                sp.loadImage("comp/strick.png");
                bg.addChild(sp);
                var height = sp.height - 10;
                var width = sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
                this._self._blocks[i] = sp;
            }
            else if (type == Define.STONE) {
                var sp = new Laya.Sprite();
                sp.loadImage("comp/stone.png");
                bg.addChild(sp);
                var height = sp.height - 10;
                var width = sp.width;
                this._height = sp.height;
                this._width = sp.width;
                sp.pos(this._startx + x * width, this._starty + y * height);
            }
        }
        for (var _i = 0, _a = ["up", "down", "left", "right", "bomb"]; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var node = bg.getChildByName(name_1);
            if (node) {
                bg.setChildIndex(node, bg.numChildren - 1);
            }
        }
        for (var i = 0; i < msg.pos.length; i = i + 2) {
            var uid = msg.pos[i];
            var index = msg.pos[i + 1];
            if (uid == this._uid) {
                var self_1 = this._self;
                self_1.loadImage("comp/front.png");
                bg.addChild(self_1);
                var pos = this.calc_pos_xy(index, this._width, this._height - 20);
                self_1.pos(pos[0], pos[1]);
            }
            else {
                this.createOtherPlayer(uid, index);
            }
        }
    };
    gameMain.prototype.rand = function (low, up) {
        return Math.floor(Math.random() * (up - low + 1) + low);
    };
    gameMain.prototype.handleSetSession = function (msg) {
        if (msg && msg.session) {
            this._session = Number(msg.session);
        }
        else {
            console.log("Not have session");
        }
    };
    gameMain.prototype.handleGameMessageNtf = function (msg) {
        for (var i = 0; i < msg.pmsg.length; i = i + 2) {
            var uid = msg.pmsg[i];
            var index = msg.pmsg[i + 1];
            for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
                var p = _a[_i];
                if (p._uid == uid) {
                    var pos = this.calc_pos_xy(index, this._width, this._height - 20);
                    p.pos(pos[0], pos[1]);
                }
            }
        }
    };
    gameMain.prototype.handleQuitGameRep = function (msg) {
    };
    gameMain.prototype.closeBack = function () {
        server.sendData("game.QuitGameReq", { session: this._session, uid: this._uid });
        server.logout();
        server = undefined;
        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
            var p = _a[_i];
            p.removeSelf();
            p.destroy();
        }
        this._self.removeSelf();
        this._self.destroy();
        Laya.stage.addChild(new loginView());
    };
    gameMain.prototype.handleJoinRep = function (msg) {
        if (msg.result != 0) {
            Laya.stage.addChild(new promptView("加入游戏失败：" + msg.result));
        }
    };
    gameMain.prototype.mainProcess = function (uid) {
        this._uid = uid;
        server.sendData("user.JoinReq", { uid: this._uid, roomid: 1000 });
    };
    return gameMain;
}());
//# sourceMappingURL=gameMain.js.map