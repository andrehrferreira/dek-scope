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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pluginsPath) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt("return", new Promise(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                                var pluginsPathResolve;
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                _context3.prev = 0;
                                                pluginsPathResolve = _path2.default.join(process.cwd(), pluginsPath);
                                                _context3.next = 4;
                                                return (0, _globby2.default)([pluginsPathResolve + "/build/index.js", pluginsPathResolve + "/*/build/index.js"]).then(function () {
                                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(paths) {
                                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        _context2.next = 2;
                                                                        return paths.forEach(function () {
                                                                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pluginPath) {
                                                                                var pluginRequest;
                                                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                                    while (1) {
                                                                                        switch (_context.prev = _context.next) {
                                                                                            case 0:
                                                                                                if (process.env.DEBUG == 'true') console.log("[ Plugins ] - Load " + pluginPath);

                                                                                                pluginRequest = require(_path2.default.resolve(pluginPath));

                                                                                                if (!(typeof pluginRequest == "function")) {
                                                                                                    _context.next = 7;
                                                                                                    break;
                                                                                                }

                                                                                                _context.next = 5;
                                                                                                return pluginRequest();

                                                                                            case 5:
                                                                                                _context.next = 10;
                                                                                                break;

                                                                                            case 7:
                                                                                                if (!(typeof pluginRequest.default == "function")) {
                                                                                                    _context.next = 10;
                                                                                                    break;
                                                                                                }

                                                                                                _context.next = 10;
                                                                                                return pluginRequest.default();

                                                                                            case 10:
                                                                                            case "end":
                                                                                                return _context.stop();
                                                                                        }
                                                                                    }
                                                                                }, _callee, undefined);
                                                                            }));

                                                                            return function (_x5) {
                                                                                return _ref4.apply(this, arguments);
                                                                            };
                                                                        }());

                                                                    case 2:

                                                                        resolve();

                                                                    case 3:
                                                                    case "end":
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, undefined);
                                                    }));

                                                    return function (_x4) {
                                                        return _ref3.apply(this, arguments);
                                                    };
                                                }());

                                            case 4:
                                                _context3.next = 10;
                                                break;

                                            case 6:
                                                _context3.prev = 6;
                                                _context3.t0 = _context3["catch"](0);

                                                console.log("[ Plugins ] - " + _context3.t0.message);
                                                reject();

                                            case 10:
                                            case "end":
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined, [[0, 6]]);
                            }));

                            return function (_x2, _x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function plugins(_x) {
        return _ref.apply(this, arguments);
    };
}();

//Controllers
var controllers = exports.controllers = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(controllersPath) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        return _context8.abrupt("return", new Promise(function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
                                var controllersPathResolve;
                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                _context7.prev = 0;
                                                controllersPathResolve = _path2.default.join(process.cwd(), controllersPath);
                                                _context7.next = 4;
                                                return (0, _globby2.default)([controllersPathResolve + "/*.js", controllersPathResolve + "/**/*.js"]).then(function () {
                                                    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(paths) {
                                                        return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                            while (1) {
                                                                switch (_context6.prev = _context6.next) {
                                                                    case 0:
                                                                        paths.forEach(function () {
                                                                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(controllerPath) {
                                                                                var controllerRequest;
                                                                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                                                                    while (1) {
                                                                                        switch (_context5.prev = _context5.next) {
                                                                                            case 0:
                                                                                                if (process.env.DEBUG == 'true') console.log("[ Controllers ] - Load " + pluginPath);

                                                                                                controllerRequest = require(_path2.default.resolve(controllerPath));

                                                                                                if (!(typeof controllerRequest == "function")) {
                                                                                                    _context5.next = 7;
                                                                                                    break;
                                                                                                }

                                                                                                _context5.next = 5;
                                                                                                return controllerRequest();

                                                                                            case 5:
                                                                                                _context5.next = 10;
                                                                                                break;

                                                                                            case 7:
                                                                                                if (!(typeof controllerRequest.default == "function")) {
                                                                                                    _context5.next = 10;
                                                                                                    break;
                                                                                                }

                                                                                                _context5.next = 10;
                                                                                                return controllerRequest.default();

                                                                                            case 10:
                                                                                            case "end":
                                                                                                return _context5.stop();
                                                                                        }
                                                                                    }
                                                                                }, _callee5, undefined);
                                                                            }));

                                                                            return function (_x10) {
                                                                                return _ref8.apply(this, arguments);
                                                                            };
                                                                        }());

                                                                        resolve();

                                                                    case 2:
                                                                    case "end":
                                                                        return _context6.stop();
                                                                }
                                                            }
                                                        }, _callee6, undefined);
                                                    }));

                                                    return function (_x9) {
                                                        return _ref7.apply(this, arguments);
                                                    };
                                                }());

                                            case 4:
                                                _context7.next = 10;
                                                break;

                                            case 6:
                                                _context7.prev = 6;
                                                _context7.t0 = _context7["catch"](0);

                                                console.log("[ Controllers ] - " + _context7.t0.message);
                                                reject();

                                            case 10:
                                            case "end":
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, undefined, [[0, 6]]);
                            }));

                            return function (_x7, _x8) {
                                return _ref6.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined);
    }));

    return function controllers(_x6) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=index.js.map