"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _path = _interopRequireDefault(require("path"));

var _constants = require("next-server/constants");

// This plugin creates a build-manifest.json for all assets that are being output
// It has a mapping of "entry" filename to real filename. Because the real filename can be hashed in production
var BuildManifestPlugin =
/*#__PURE__*/
function () {
  function BuildManifestPlugin() {
    (0, _classCallCheck2.default)(this, BuildManifestPlugin);
  }

  (0, _createClass2.default)(BuildManifestPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.emit.tapPromise('NextJsBuildManifest',
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(compilation, callback) {
          var chunks, assetMap, mainJsChunk, mainJsFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, entrypoint, result, pagePath, filesForEntry, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, chunk, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, file, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2, _ret;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  chunks = compilation.chunks;
                  assetMap = {};
                  mainJsChunk = chunks.find(function (c) {
                    return c.name === _constants.CLIENT_STATIC_FILES_RUNTIME_MAIN;
                  });
                  mainJsFiles = mainJsChunk && mainJsChunk.files.length > 0 ? mainJsChunk.files.filter(function (file) {
                    return /\.js$/.test(file);
                  }) : []; // compilation.entrypoints is a Map object, so iterating over it 0 is the key and 1 is the value

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 7;
                  _iterator = (0, _getIterator2.default)(compilation.entrypoints.entries());

                case 9:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 79;
                    break;
                  }

                  _step$value = (0, _slicedToArray2.default)(_step.value, 2), entrypoint = _step$value[1];
                  result = _constants.ROUTE_NAME_REGEX.exec(entrypoint.name);

                  if (result) {
                    _context.next = 14;
                    break;
                  }

                  return _context.abrupt("continue", 76);

                case 14:
                  pagePath = result[1];

                  if (pagePath) {
                    _context.next = 17;
                    break;
                  }

                  return _context.abrupt("continue", 76);

                case 17:
                  filesForEntry = [];
                  _iteratorNormalCompletion3 = true;
                  _didIteratorError3 = false;
                  _iteratorError3 = undefined;
                  _context.prev = 21;
                  _iterator3 = (0, _getIterator2.default)(entrypoint.chunks);

                case 23:
                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                    _context.next = 61;
                    break;
                  }

                  chunk = _step3.value;

                  if (!(!chunk.name || !chunk.files)) {
                    _context.next = 27;
                    break;
                  }

                  return _context.abrupt("continue", 58);

                case 27:
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context.prev = 30;
                  _iterator4 = (0, _getIterator2.default)(chunk.files);

                case 32:
                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    _context.next = 44;
                    break;
                  }

                  file = _step4.value;

                  if (!(/\.map$/.test(file) || /\.hot-update\.js$/.test(file))) {
                    _context.next = 36;
                    break;
                  }

                  return _context.abrupt("continue", 41);

                case 36:
                  if (!(!/\.js$/.test(file) && !/\.css$/.test(file))) {
                    _context.next = 38;
                    break;
                  }

                  return _context.abrupt("continue", 41);

                case 38:
                  if (!_constants.IS_BUNDLED_PAGE_REGEX.exec(file)) {
                    _context.next = 40;
                    break;
                  }

                  return _context.abrupt("continue", 41);

                case 40:
                  filesForEntry.push(file.replace(/\\/g, '/'));

                case 41:
                  _iteratorNormalCompletion4 = true;
                  _context.next = 32;
                  break;

                case 44:
                  _context.next = 50;
                  break;

                case 46:
                  _context.prev = 46;
                  _context.t0 = _context["catch"](30);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context.t0;

                case 50:
                  _context.prev = 50;
                  _context.prev = 51;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 53:
                  _context.prev = 53;

                  if (!_didIteratorError4) {
                    _context.next = 56;
                    break;
                  }

                  throw _iteratorError4;

                case 56:
                  return _context.finish(53);

                case 57:
                  return _context.finish(50);

                case 58:
                  _iteratorNormalCompletion3 = true;
                  _context.next = 23;
                  break;

                case 61:
                  _context.next = 67;
                  break;

                case 63:
                  _context.prev = 63;
                  _context.t1 = _context["catch"](21);
                  _didIteratorError3 = true;
                  _iteratorError3 = _context.t1;

                case 67:
                  _context.prev = 67;
                  _context.prev = 68;

                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }

                case 70:
                  _context.prev = 70;

                  if (!_didIteratorError3) {
                    _context.next = 73;
                    break;
                  }

                  throw _iteratorError3;

                case 73:
                  return _context.finish(70);

                case 74:
                  return _context.finish(67);

                case 75:
                  assetMap[pagePath.replace(/\\/g, '/')] = [].concat(filesForEntry, (0, _toConsumableArray2.default)(mainJsFiles));

                case 76:
                  _iteratorNormalCompletion = true;
                  _context.next = 9;
                  break;

                case 79:
                  _context.next = 85;
                  break;

                case 81:
                  _context.prev = 81;
                  _context.t2 = _context["catch"](7);
                  _didIteratorError = true;
                  _iteratorError = _context.t2;

                case 85:
                  _context.prev = 85;
                  _context.prev = 86;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 88:
                  _context.prev = 88;

                  if (!_didIteratorError) {
                    _context.next = 91;
                    break;
                  }

                  throw _iteratorError;

                case 91:
                  return _context.finish(88);

                case 92:
                  return _context.finish(85);

                case 93:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context.prev = 96;

                  _loop = function _loop() {
                    var _step2$value = (0, _slicedToArray2.default)(_step2.value, 2),
                        entrypoint = _step2$value[1];

                    var manifestFile = _path.default.join('server', entrypoint.name.replace(/\.js$/, '-assets.json'));

                    var result = _constants.ROUTE_NAME_REGEX.exec(entrypoint.name);

                    if (!result) {
                      return "continue";
                    }

                    var pagePath = result[1];

                    if (!pagePath) {
                      return "continue";
                    }

                    var assets = (0, _toConsumableArray2.default)(new _set.default([].concat((0, _toConsumableArray2.default)(assetMap['/_app'] || []), (0, _toConsumableArray2.default)(assetMap['/_error'] || []), (0, _toConsumableArray2.default)(assetMap[pagePath.replace(/\\/g, '/')] || []))));
                    var json = (0, _stringify.default)({
                      assets: assets
                    });
                    compilation.assets[manifestFile] = {
                      source: function source() {
                        return json;
                      },
                      size: function size() {
                        return json.length;
                      }
                    };
                  };

                  _iterator2 = (0, _getIterator2.default)(compilation.entrypoints.entries());

                case 99:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context.next = 106;
                    break;
                  }

                  _ret = _loop();

                  if (!(_ret === "continue")) {
                    _context.next = 103;
                    break;
                  }

                  return _context.abrupt("continue", 103);

                case 103:
                  _iteratorNormalCompletion2 = true;
                  _context.next = 99;
                  break;

                case 106:
                  _context.next = 112;
                  break;

                case 108:
                  _context.prev = 108;
                  _context.t3 = _context["catch"](96);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context.t3;

                case 112:
                  _context.prev = 112;
                  _context.prev = 113;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 115:
                  _context.prev = 115;

                  if (!_didIteratorError2) {
                    _context.next = 118;
                    break;
                  }

                  throw _iteratorError2;

                case 118:
                  return _context.finish(115);

                case 119:
                  return _context.finish(112);

                case 120:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[7, 81, 85, 93], [21, 63, 67, 75], [30, 46, 50, 58], [51,, 53, 57], [68,, 70, 74], [86,, 88, 92], [96, 108, 112, 120], [113,, 115, 119]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return BuildManifestPlugin;
}();

exports.default = BuildManifestPlugin;