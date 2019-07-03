"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactLoadablePlugin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var _constants = require("next-server/constants");

/**
COPYRIGHT (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWAR
*/
// Implementation of this PR: https://github.com/jamiebuilds/react-loadable/pull/132
// Modified to strip out unneeded results for Next's specific use case
var ReactLoadablePlugin =
/*#__PURE__*/
function () {
  function ReactLoadablePlugin() {
    (0, _classCallCheck2.default)(this, ReactLoadablePlugin);
  }

  (0, _createClass2.default)(ReactLoadablePlugin, [{
    key: "apply",
    value: function apply(compiler) {
      compiler.hooks.emit.tapPromise('ReactLoadableManifest',
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(compilation) {
          var context, manifest, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, file, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, module, id, name, publicPath, currentModule, json, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, entrypoint, manifestFile;

          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  context = compiler.options.context;
                  manifest = {};
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 5;
                  _iterator = (0, _getIterator2.default)(compilation.chunks);

                case 7:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 57;
                    break;
                  }

                  chunk = _step.value;
                  _iteratorNormalCompletion3 = true;
                  _didIteratorError3 = false;
                  _iteratorError3 = undefined;
                  _context.prev = 12;
                  _iterator3 = (0, _getIterator2.default)(chunk.files);

                case 14:
                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                    _context.next = 40;
                    break;
                  }

                  file = _step3.value;

                  if (!(!file.match(/\.js$/) || !file.match(/^static\/chunks\//))) {
                    _context.next = 18;
                    break;
                  }

                  return _context.abrupt("continue", 37);

                case 18:
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context.prev = 21;

                  for (_iterator4 = (0, _getIterator2.default)(chunk.modulesIterable); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    module = _step4.value;
                    id = module.id;
                    name = typeof module.libIdent === 'function' ? module.libIdent({
                      context: context
                    }) : null;
                    publicPath = _url.default.resolve(compilation.outputOptions.publicPath || '', file);
                    currentModule = module;

                    if (module.constructor.name === 'ConcatenatedModule') {
                      currentModule = module.rootModule;
                    }

                    if (!manifest[currentModule.rawRequest]) {
                      manifest[currentModule.rawRequest] = [];
                    }

                    manifest[currentModule.rawRequest].push({
                      id: id,
                      name: name,
                      file: file,
                      publicPath: publicPath
                    });
                  }

                  _context.next = 29;
                  break;

                case 25:
                  _context.prev = 25;
                  _context.t0 = _context["catch"](21);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context.t0;

                case 29:
                  _context.prev = 29;
                  _context.prev = 30;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 32:
                  _context.prev = 32;

                  if (!_didIteratorError4) {
                    _context.next = 35;
                    break;
                  }

                  throw _iteratorError4;

                case 35:
                  return _context.finish(32);

                case 36:
                  return _context.finish(29);

                case 37:
                  _iteratorNormalCompletion3 = true;
                  _context.next = 14;
                  break;

                case 40:
                  _context.next = 46;
                  break;

                case 42:
                  _context.prev = 42;
                  _context.t1 = _context["catch"](12);
                  _didIteratorError3 = true;
                  _iteratorError3 = _context.t1;

                case 46:
                  _context.prev = 46;
                  _context.prev = 47;

                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }

                case 49:
                  _context.prev = 49;

                  if (!_didIteratorError3) {
                    _context.next = 52;
                    break;
                  }

                  throw _iteratorError3;

                case 52:
                  return _context.finish(49);

                case 53:
                  return _context.finish(46);

                case 54:
                  _iteratorNormalCompletion = true;
                  _context.next = 7;
                  break;

                case 57:
                  _context.next = 63;
                  break;

                case 59:
                  _context.prev = 59;
                  _context.t2 = _context["catch"](5);
                  _didIteratorError = true;
                  _iteratorError = _context.t2;

                case 63:
                  _context.prev = 63;
                  _context.prev = 64;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 66:
                  _context.prev = 66;

                  if (!_didIteratorError) {
                    _context.next = 69;
                    break;
                  }

                  throw _iteratorError;

                case 69:
                  return _context.finish(66);

                case 70:
                  return _context.finish(63);

                case 71:
                  json = (0, _stringify.default)(manifest);
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context.prev = 75;
                  _iterator2 = (0, _getIterator2.default)(compilation.entrypoints.entries());

                case 77:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context.next = 86;
                    break;
                  }

                  _step2$value = (0, _slicedToArray2.default)(_step2.value, 2), entrypoint = _step2$value[1];

                  if (_constants.IS_BUNDLED_PAGE_REGEX.exec(entrypoint.name)) {
                    _context.next = 81;
                    break;
                  }

                  return _context.abrupt("continue", 83);

                case 81:
                  manifestFile = _path.default.join('server', entrypoint.name.replace(/\.js$/, '-loadable.json'));
                  compilation.assets[manifestFile] = {
                    source: function source() {
                      return json;
                    },
                    size: function size() {
                      return json.length;
                    }
                  };

                case 83:
                  _iteratorNormalCompletion2 = true;
                  _context.next = 77;
                  break;

                case 86:
                  _context.next = 92;
                  break;

                case 88:
                  _context.prev = 88;
                  _context.t3 = _context["catch"](75);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context.t3;

                case 92:
                  _context.prev = 92;
                  _context.prev = 93;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 95:
                  _context.prev = 95;

                  if (!_didIteratorError2) {
                    _context.next = 98;
                    break;
                  }

                  throw _iteratorError2;

                case 98:
                  return _context.finish(95);

                case 99:
                  return _context.finish(92);

                case 100:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[5, 59, 63, 71], [12, 42, 46, 54], [21, 25, 29, 37], [30,, 32, 36], [47,, 49, 53], [64,, 66, 70], [75, 88, 92, 100], [93,, 95, 99]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return ReactLoadablePlugin;
}();

exports.ReactLoadablePlugin = ReactLoadablePlugin;