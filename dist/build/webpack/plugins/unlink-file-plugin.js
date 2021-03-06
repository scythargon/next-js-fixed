"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _path = require("path");

var _promisify = _interopRequireDefault(require("../../../lib/promisify"));

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("next-server/constants");

var unlink = (0, _promisify.default)(_fs.default.unlink); // Makes sure removed pages are removed from `.next` in development

var UnlinkFilePlugin =
/*#__PURE__*/
function () {
  function UnlinkFilePlugin() {
    (0, _classCallCheck2.default)(this, UnlinkFilePlugin);
    (0, _defineProperty2.default)(this, "prevAssets", void 0);
    this.prevAssets = {};
  }

  (0, _createClass2.default)(UnlinkFilePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.afterEmit.tapAsync('NextJsUnlinkRemovedPages', function (compilation, callback) {
        var removed = (0, _keys.default)(_this.prevAssets).filter(function (a) {
          return _constants.IS_BUNDLED_PAGE_REGEX.test(a) && !compilation.assets[a];
        });
        _this.prevAssets = compilation.assets;

        _promise.default.all(removed.map(
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(f) {
            var path;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    path = (0, _path.join)(compiler.outputPath, f);
                    _context.prev = 1;
                    _context.next = 4;
                    return unlink(path);

                  case 4:
                    _context.next = 11;
                    break;

                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](1);

                    if (!(_context.t0.code === 'ENOENT')) {
                      _context.next = 10;
                      break;
                    }

                    return _context.abrupt("return");

                  case 10:
                    throw _context.t0;

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1, 6]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }())).then(function () {
          return callback();
        }, callback);
      });
    }
  }]);
  return UnlinkFilePlugin;
}();

exports.default = UnlinkFilePlugin;