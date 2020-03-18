"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = exports.routes = exports.controllers = exports.plugins = exports["default"] = exports.$ = void 0;

var _path = _interopRequireDefault(require("path"));

var _globby = _interopRequireDefault(require("globby"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Scope = {
  debug: false
};

Scope.get = function (name) {
  try {
    if (this.hasOwnProperty(name)) return this[name];else throw "".concat(name, " does not exist in scope");
  } catch (e) {
    if (this.debug) console.log(e.message);
    return false;
  }
};

Scope.set = function (name, value) {
  var restrictedNames = ["get", "set", "use", "wait", "map", "plugins", "controllers", "routes"];

  if (restrictedNames.indexOf(name) === -1 && !restrictedNames.hasOwnProperty(name)) {
    try {
      if (this.hasOwnProperty(name)) if (this.debug) console.log("'".concat(name, "' was replaced by the value '").concat(value, "'"));
    } catch (e) {
      if (this.debug) console.log(e.message);
    }

    this[name] = value;
    exports[name] = value;
    return true;
  } else {
    if (this.debug) console.log("Do not use the names: ".concat(restrictedNames.join(", ")));
    return false;
  }
};

Scope.use = function (obj) {
  if (_typeof(obj) == "object") {
    var status = true;
    var keys = Object.keys(obj);

    for (var key in keys) {
      if (!this.set([keys[key]].toString(), obj[keys[key]])) status = false;
    }

    return status;
  } else {
    return false;
  }
};

Scope.wait = function (obj, timeout) {
  var _this = this;

  var waitTime = timeout || 3000;
  var pInterval = null,
      pWaitTimeout = null;
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                pWaitTimeout = setTimeout(function () {
                  if (pInterval) clearInterval(pInterval);

                  if (_typeof(obj) == "object") {
                    var unloadDependencies = obj.filter(function (key) {
                      return !_this.hasOwnProperty(key);
                    });
                    reject("The wait timeout was reached without loading the dependencies: ".concat(unloadDependencies.join(", ")));
                  } else if (typeof obj == "string") {
                    reject("The wait timeout was reached without loading the dependencies: ".concat(obj));
                  }
                }, waitTime);

                if (_typeof(obj) == "object") {
                  pInterval = setInterval(function () {
                    if (obj.every(function (key) {
                      return _this.hasOwnProperty(key);
                    })) {
                      if (pInterval) clearInterval(pInterval);
                      if (pWaitTimeout) clearTimeout(pWaitTimeout);
                      resolve();
                    }
                  }, 100);
                } else if (typeof obj == "string") {
                  pInterval = setInterval(function () {
                    if (_this.hasOwnProperty(obj)) {
                      if (pInterval) clearInterval(pInterval);
                      if (pWaitTimeout) clearTimeout(pWaitTimeout);
                      resolve();
                    }
                  }, 100);
                } else {
                  reject("Dependencies must be 'object' or 'string'.");
                }
              } catch (e) {
                reject(e);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var $ = Scope;
exports.$ = $;
var _default = Scope; //Plugins

exports["default"] = _default;

var plugins = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pluginsPath) {
    var pluginsPathResolve;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            pluginsPathResolve = _path["default"].join(process.cwd(), pluginsPath);
            _context4.next = 4;
            return (0, _globby["default"])(["".concat(pluginsPathResolve, "/index.js"), "".concat(pluginsPathResolve, "/build/index.js"), "".concat(pluginsPathResolve, "/*/build/index.js")]).then( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(paths) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return paths.forEach( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pluginPath) {
                            var pluginRequest;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    if (process.env.DEBUG == "true") console.log("[ Plugins ] - Load ".concat(pluginPath));
                                    pluginRequest = require(_path["default"].resolve(pluginPath));

                                    if (!(typeof pluginRequest == "function")) {
                                      _context2.next = 7;
                                      break;
                                    }

                                    _context2.next = 5;
                                    return pluginRequest();

                                  case 5:
                                    _context2.next = 10;
                                    break;

                                  case 7:
                                    if (!(typeof pluginRequest["default"] == "function")) {
                                      _context2.next = 10;
                                      break;
                                    }

                                    _context2.next = 10;
                                    return pluginRequest["default"]();

                                  case 10:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x5) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 4:
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log("[ Plugins ] - ".concat(_context4.t0.message));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function plugins(_x3) {
    return _ref2.apply(this, arguments);
  };
}(); //Controllers


exports.plugins = plugins;

var controllers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(controllersPath) {
    var controllersPathResolve;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            controllersPathResolve = _path["default"].join(process.cwd(), controllersPath);
            _context7.next = 4;
            return (0, _globby["default"])(["".concat(controllersPathResolve, "/*.js"), "".concat(controllersPathResolve, "/**/*.js")]).then( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(paths) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        paths.forEach( /*#__PURE__*/function () {
                          var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(controllerPath) {
                            var controllerRequest;
                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    if (process.env.DEBUG == "true") console.log("[ Controllers ] - Load ".concat(controllerPath));
                                    controllerRequest = require(_path["default"].resolve(controllerPath));

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
                                    if (!(typeof controllerRequest["default"] == "function")) {
                                      _context5.next = 10;
                                      break;
                                    }

                                    _context5.next = 10;
                                    return controllerRequest["default"]();

                                  case 10:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5);
                          }));

                          return function (_x8) {
                            return _ref7.apply(this, arguments);
                          };
                        }());

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x7) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 4:
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            console.log("[ Controllers ] - ".concat(_context7.t0.message));

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 6]]);
  }));

  return function controllers(_x6) {
    return _ref5.apply(this, arguments);
  };
}(); //Routes


exports.controllers = controllers;

var routes = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(routesPath) {
    var routesPathResolve, router;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            routesPathResolve = _path["default"].join(process.cwd(), routesPath);
            router = _express["default"].Router();
            _context8.next = 4;
            return (0, _globby["default"])(["".concat(routesPathResolve, "/*.js"), "".concat(routesPathResolve, "/**/*.js")]).then(function (paths) {
              paths.forEach(function (routePath) {
                var routeRequest = require(_path["default"].resolve(routePath));

                if (typeof routeRequest == "function") routeRequest(router);else if (typeof routeRequest["default"] == "function") routeRequest["default"](router);
              });
              return true;
            });

          case 4:
            return _context8.abrupt("return", router);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function routes(_x9) {
    return _ref8.apply(this, arguments);
  };
}(); //Maps


exports.routes = routes;

var map = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(mapPath) {
    var mapPathResolve;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            mapPathResolve = _path["default"].join(process.cwd(), mapPath);
            _context9.next = 3;
            return (0, _globby["default"])(["".concat(mapPathResolve, "/*.js"), "".concat(mapPathResolve, "/**/*.js")]).then(function (paths) {
              paths.forEach(function (filePath) {
                var fileRequire = require(_path["default"].resolve(filePath));

                if (typeof fileRequire == "function") fileRequire();else if (typeof fileRequire["default"] == "function") fileRequire["default"]();
              });
              return true;
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function map(_x10) {
    return _ref9.apply(this, arguments);
  };
}();

exports.map = map;
//# sourceMappingURL=index.js.map