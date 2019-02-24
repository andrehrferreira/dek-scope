"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.controllers = exports.plugins = exports.$ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //Global scope driver

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _globby = require("globby");

var _globby2 = _interopRequireDefault(_globby);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

    if (name !== "get" && name !== "set" && name !== "use") {
        this[name] = value;
        exports[name] = value;
    } else {
        console.log("Do not use the names \"get\", \"set\" or \"use\"");
    }
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

//Plugins

var plugins = exports.plugins = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pluginsPath) {
        var pluginsPathResolve;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        pluginsPathResolve = _path2.default.join(process.cwd(), pluginsPath);
                        _context2.next = 3;
                        return (0, _globby2.default)([pluginsPathResolve + "/build/index.js", pluginsPathResolve + "/*/build/index.js"]).then(function (paths) {
                            paths.forEach(function () {
                                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pluginPath) {
                                    var pluginRequest;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    pluginRequest = require(_path2.default.resolve(pluginPath));

                                                    if (!(typeof pluginRequest == "function")) {
                                                        _context.next = 6;
                                                        break;
                                                    }

                                                    _context.next = 4;
                                                    return pluginRequest();

                                                case 4:
                                                    _context.next = 9;
                                                    break;

                                                case 6:
                                                    if (!(typeof pluginRequest.default == "function")) {
                                                        _context.next = 9;
                                                        break;
                                                    }

                                                    _context.next = 9;
                                                    return pluginRequest.default();

                                                case 9:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x2) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        });

                    case 3:
                        return _context2.abrupt("return", _context2.sent);

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function plugins(_x) {
        return _ref.apply(this, arguments);
    };
}();

//Controllers
var controllers = exports.controllers = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(controllersPath) {
        var controllersPathResolve;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        controllersPathResolve = _path2.default.join(process.cwd(), controllersPath);
                        _context4.next = 3;
                        return (0, _globby2.default)([controllersPathResolve + "/*.js", controllersPathResolve + "/**/*.js"]).then(function (paths) {
                            paths.forEach(function () {
                                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(controllerPath) {
                                    var controllerRequest;
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    controllerRequest = require(_path2.default.resolve(controllerPath));

                                                    if (!(typeof controllerRequest == "function")) {
                                                        _context3.next = 6;
                                                        break;
                                                    }

                                                    _context3.next = 4;
                                                    return controllerRequest();

                                                case 4:
                                                    _context3.next = 9;
                                                    break;

                                                case 6:
                                                    if (!(typeof controllerRequest.default == "function")) {
                                                        _context3.next = 9;
                                                        break;
                                                    }

                                                    _context3.next = 9;
                                                    return controllerRequest.default();

                                                case 9:
                                                case "end":
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, undefined);
                                }));

                                return function (_x4) {
                                    return _ref4.apply(this, arguments);
                                };
                            }());

                            return true;
                        });

                    case 3:
                        return _context4.abrupt("return", _context4.sent);

                    case 4:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function controllers(_x3) {
        return _ref3.apply(this, arguments);
    };
}();
//# sourceMappingURL=index.js.map