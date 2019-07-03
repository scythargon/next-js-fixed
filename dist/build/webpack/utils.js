"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPages = getPages;
exports.getPagePaths = getPagePaths;
exports.createEntry = createEntry;
exports.getPageEntries = getPageEntries;

var _set = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/set"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _promisify = _interopRequireDefault(require("../../lib/promisify"));

var _glob = _interopRequireDefault(require("glob"));

var _constants = require("next-server/constants");

var _require = require("next-server/dist/server/require");

var glob = (0, _promisify.default)(_glob.default);

function getPages(_x, _x2) {
  return _getPages.apply(this, arguments);
}

function _getPages() {
  _getPages = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(dir, _ref) {
    var pages, nextPagesDir, dev, buildId, isServer, pageExtensions, pageFiles;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pages = _ref.pages, nextPagesDir = _ref.nextPagesDir, dev = _ref.dev, buildId = _ref.buildId, isServer = _ref.isServer, pageExtensions = _ref.pageExtensions;
            _context.next = 3;
            return getPagePaths(dir, {
              pages: pages,
              dev: dev,
              isServer: isServer,
              pageExtensions: pageExtensions
            });

          case 3:
            pageFiles = _context.sent;
            return _context.abrupt("return", getPageEntries(pageFiles, {
              nextPagesDir: nextPagesDir,
              buildId: buildId,
              isServer: isServer,
              pageExtensions: pageExtensions
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPages.apply(this, arguments);
}

function getPagePaths(_x3, _x4) {
  return _getPagePaths.apply(this, arguments);
} // Convert page path into single entry


function _getPagePaths() {
  _getPagePaths = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(dir, _ref2) {
    var pages, dev, isServer, pageExtensions, defaultPages, resolvedFiles;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pages = _ref2.pages, dev = _ref2.dev, isServer = _ref2.isServer, pageExtensions = _ref2.pageExtensions;

            if (!(dev || pages)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 4;
            return glob(isServer ? "pages/+(_document|_app|_error).+(".concat(pageExtensions, ")") : "pages/+(_app|_error).+(".concat(pageExtensions, ")"), {
              cwd: dir
            });

          case 4:
            defaultPages = _context3.sent;
            _context3.next = 7;
            return _promise.default.all((pages || []).map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(file) {
                var normalizedPagePath, paths;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        normalizedPagePath = (0, _require.normalizePagePath)(file);
                        _context2.next = 3;
                        return glob("pages/{".concat(normalizedPagePath, "/index,").concat(normalizedPagePath, "}.+(").concat(pageExtensions, ")"), {
                          cwd: dir
                        });

                      case 3:
                        paths = _context2.sent;

                        if (!(paths.length === 0)) {
                          _context2.next = 6;
                          break;
                        }

                        return _context2.abrupt("return", null);

                      case 6:
                        return _context2.abrupt("return", paths[0]);

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 7:
            resolvedFiles = _context3.sent;
            return _context3.abrupt("return", (0, _toConsumableArray2.default)(new _set.default([].concat((0, _toConsumableArray2.default)(defaultPages), (0, _toConsumableArray2.default)(resolvedFiles.filter(function (f) {
              return f !== null;
            }))))));

          case 9:
            return _context3.abrupt("return", glob(isServer ? "pages/**/*.+(".concat(pageExtensions, ")") : "pages/**/!(_document)*.+(".concat(pageExtensions, ")"), {
              cwd: dir
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getPagePaths.apply(this, arguments);
}

function createEntry(filePath) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$buildId = _ref3.buildId,
      buildId = _ref3$buildId === void 0 ? '' : _ref3$buildId,
      name = _ref3.name,
      pageExtensions = _ref3.pageExtensions;

  var parsedPath = _path.default.parse(filePath);

  var entryName = name || filePath; // This makes sure we compile `pages/blog/index.js` to `pages/blog.js`.
  // Excludes `pages/index.js` from this rule since we do want `/` to route to `pages/index.js`

  if (parsedPath.dir !== 'pages' && parsedPath.name === 'index') {
    entryName = "".concat(parsedPath.dir, ".js");
  } // Makes sure supported extensions are stripped off. The outputted file should always be `.js`


  if (pageExtensions) {
    entryName = entryName.replace(new RegExp("\\.+(".concat(pageExtensions, ")$")), '.js');
  }

  return {
    name: _path.default.join(_constants.CLIENT_STATIC_FILES_PATH, buildId, entryName),
    files: [parsedPath.root ? filePath : "./".concat(filePath)] // The entry always has to be an array.

  };
} // Convert page paths into entries


function getPageEntries(pagePaths) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      nextPagesDir = _ref4.nextPagesDir,
      buildId = _ref4.buildId,
      _ref4$isServer = _ref4.isServer,
      isServer = _ref4$isServer === void 0 ? false : _ref4$isServer,
      pageExtensions = _ref4.pageExtensions;

  var entries = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator2.default)(pagePaths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var filePath = _step.value;
      var entry = createEntry(filePath, {
        pageExtensions: pageExtensions,
        buildId: buildId
      });
      entries[entry.name] = entry.files;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var appPagePath = _path.default.join(nextPagesDir, '_app.js');

  var appPageEntry = createEntry(appPagePath, {
    buildId: buildId,
    name: 'pages/_app.js'
  }); // default app.js

  if (!entries[appPageEntry.name]) {
    entries[appPageEntry.name] = appPageEntry.files;
  }

  var errorPagePath = _path.default.join(nextPagesDir, '_error.js');

  var errorPageEntry = createEntry(errorPagePath, {
    buildId: buildId,
    name: 'pages/_error.js'
  }); // default error.js

  if (!entries[errorPageEntry.name]) {
    entries[errorPageEntry.name] = errorPageEntry.files;
  }

  if (isServer) {
    var documentPagePath = _path.default.join(nextPagesDir, '_document.js');

    var documentPageEntry = createEntry(documentPagePath, {
      buildId: buildId,
      name: 'pages/_document.js'
    }); // default _document.js

    if (!entries[documentPageEntry.name]) {
      entries[documentPageEntry.name] = documentPageEntry.files;
    }
  }

  return entries;
}