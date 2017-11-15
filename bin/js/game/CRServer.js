var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CServer = /** @class */ (function (_super) {
    __extends(CServer, _super);
    function CServer() {
        var _this = _super.call(this) || this;
        _this._over = false;
        return _this;
    }
    CServer.prototype.sendData = function (name, data, cb) {
        if (cb === void 0) { cb = null; }
        if (!this._over) {
            _super.prototype.sendData.call(this, name, data, cb);
        }
    };
    return CServer;
}(Server));
//# sourceMappingURL=CRServer.js.map