"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //Global scope driver

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scope = {};

Scope.get = function (name) {
    try {
        if (this.hasOwnProperty(name)) return this[name];else throw name + " does not exist in scope";
    } catch (e) {
        console.log(e.message);
        return false;
    }
};

Scope.set = function (name, value) {
    try {
        if (this.hasOwnProperty(name)) console.log(name + " was replaced by the value " + value);
    } catch (e) {}

    if (name !== "get" && name !== "set" && name !== "use") this[name] = value;else console.log("Do not use the names \"get\", \"set\" or \"use\"");
};

Scope.use = function (obj) {
    var _this = this;

    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object") {
        Object.keys(obj).forEach(function (key) {
            _this[key] = obj[key];
        });
    }
};

var $ = exports.$ = Scope;
exports.default = Scope;
//# sourceMappingURL=index.js.map