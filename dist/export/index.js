"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _del = _interopRequireDefault(require("del"));

var _recursiveCopy = _interopRequireDefault(require("recursive-copy"));

var _mkdirpThen = _interopRequireDefault(require("mkdirp-then"));

var _path = require("path");

var _fs = require("fs");

var _nextConfig = _interopRequireDefault(require("next-server/next-config"));

var _constants = require("next-server/constants");

var _render = require("next-server/dist/server/render");

var _asset = require("next-server/asset");

var envConfig = _interopRequireWildcard(require("next-server/config"));

var _glob = _interopRequireDefault(require("glob"));

var _util = require("util");

var glob = (0, _util.promisify)(_glob.default);

function normalizePageName(page) {
  if (page === 'index') {
    return '';
  }

  return page.replace(/(^|\/)index$/, '');
}

function _default(_x, _x2, _x3) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(dir, options, configuration) {
    var log, nextConfig, distDir, buildId, foundPages, pages, defaultPathMap, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, page, outDir, renderOpts, serverRuntimeConfig, publicRuntimeConfig, exportPathMap, exportPaths, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, path, _exportPathMap$path, _page, _exportPathMap$path$q, query, req, res, htmlFilename, baseDir, htmlFilepath, html;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            log = function _ref3(message) {
              if (options.silent) return;
              console.log(message);
            };

            dir = (0, _path.resolve)(dir);
            nextConfig = configuration || (0, _nextConfig.default)(_constants.PHASE_EXPORT, dir);
            distDir = (0, _path.join)(dir, nextConfig.distDir);
            log("> using build directory: ".concat(distDir));

            if ((0, _fs.existsSync)(distDir)) {
              _context2.next = 7;
              break;
            }

            throw new Error("Build directory ".concat(distDir, " does not exist. Make sure you run \"next build\" before running \"next start\" or \"next export\"."));

          case 7:
            buildId = (0, _fs.readFileSync)((0, _path.join)(distDir, _constants.BUILD_ID_FILE), 'utf8');
            _context2.next = 10;
            return glob('**/*.js', {
              cwd: (0, _path.join)(distDir, 'server', 'pages')
            });

          case 10:
            foundPages = _context2.sent;
            pages = foundPages.map(function (page) {
              return '/' + normalizePageName(page.replace(/\.js$/, ''));
            });
            defaultPathMap = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 16;
            _iterator = (0, _getIterator2.default)(pages);

          case 18:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 29;
              break;
            }

            page = _step.value;

            if (!(page === '/_document' || page === '/_app')) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("continue", 26);

          case 22:
            if (!(page === '/_error')) {
              _context2.next = 25;
              break;
            }

            defaultPathMap['/404.html'] = {
              page: page
            };
            return _context2.abrupt("continue", 26);

          case 25:
            defaultPathMap[page] = {
              page: page
            };

          case 26:
            _iteratorNormalCompletion = true;
            _context2.next = 18;
            break;

          case 29:
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 35:
            _context2.prev = 35;
            _context2.prev = 36;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 38:
            _context2.prev = 38;

            if (!_didIteratorError) {
              _context2.next = 41;
              break;
            }

            throw _iteratorError;

          case 41:
            return _context2.finish(38);

          case 42:
            return _context2.finish(35);

          case 43:
            // Initialize the output directory
            outDir = options.outdir;
            _context2.next = 46;
            return (0, _del.default)((0, _path.join)(outDir, '*'));

          case 46:
            _context2.next = 48;
            return (0, _mkdirpThen.default)((0, _path.join)(outDir, '_next'));

          case 48:
            if (!(0, _fs.existsSync)((0, _path.join)(dir, 'static'))) {
              _context2.next = 52;
              break;
            }

            log('  copying "static" directory');
            _context2.next = 52;
            return (0, _recursiveCopy.default)((0, _path.join)(dir, 'static'), (0, _path.join)(outDir, 'static'), {
              expand: true
            });

          case 52:
            if (!(0, _fs.existsSync)((0, _path.join)(distDir, _constants.CLIENT_STATIC_FILES_PATH))) {
              _context2.next = 56;
              break;
            }

            log('  copying "static build" directory');
            _context2.next = 56;
            return (0, _recursiveCopy.default)((0, _path.join)(distDir, _constants.CLIENT_STATIC_FILES_PATH), (0, _path.join)(outDir, '_next', _constants.CLIENT_STATIC_FILES_PATH));

          case 56:
            // Get the exportPathMap from the config file
            if (typeof nextConfig.exportPathMap !== 'function') {
              console.log("> No \"exportPathMap\" found in \"".concat(_constants.CONFIG_FILE, "\". Generating map from \"./pages\""));

              nextConfig.exportPathMap =
              /*#__PURE__*/
              function () {
                var _ref2 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(defaultMap) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", defaultMap);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }();
            } // Start the rendering process


            renderOpts = {
              dir: dir,
              buildId: buildId,
              nextExport: true,
              assetPrefix: nextConfig.assetPrefix.replace(/\/$/, ''),
              distDir: distDir,
              dev: false,
              staticMarkup: false,
              hotReloader: null
            };
            serverRuntimeConfig = nextConfig.serverRuntimeConfig, publicRuntimeConfig = nextConfig.publicRuntimeConfig;

            if (publicRuntimeConfig) {
              renderOpts.runtimeConfig = publicRuntimeConfig;
            }

            envConfig.setConfig({
              serverRuntimeConfig: serverRuntimeConfig,
              publicRuntimeConfig: publicRuntimeConfig
            }); // set the assetPrefix to use for 'next/asset'

            (0, _asset.setAssetPrefix)(renderOpts.assetPrefix); // We need this for server rendering the Link component.

            global.__NEXT_DATA__ = {
              nextExport: true
            };
            _context2.next = 65;
            return nextConfig.exportPathMap(defaultPathMap, {
              dev: false,
              dir: dir,
              outDir: outDir,
              distDir: distDir,
              buildId: buildId
            });

          case 65:
            exportPathMap = _context2.sent;
            exportPaths = (0, _keys.default)(exportPathMap);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 70;
            _iterator2 = (0, _getIterator2.default)(exportPaths);

          case 72:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 93;
              break;
            }

            path = _step2.value;
            log("> exporting path: ".concat(path));

            if (path.startsWith('/')) {
              _context2.next = 77;
              break;
            }

            throw new Error("path \"".concat(path, "\" doesn't start with a backslash"));

          case 77:
            _exportPathMap$path = exportPathMap[path], _page = _exportPathMap$path.page, _exportPathMap$path$q = _exportPathMap$path.query, query = _exportPathMap$path$q === void 0 ? {} : _exportPathMap$path$q;
            req = {
              url: path
            };
            res = {};
            htmlFilename = "".concat(path).concat(_path.sep, "index.html");

            if ((0, _path.extname)(path) !== '') {
              // If the path has an extension, use that as the filename instead
              htmlFilename = path;
            } else if (path === '/') {
              // If the path is the root, just use index.html
              htmlFilename = 'index.html';
            }

            baseDir = (0, _path.join)(outDir, (0, _path.dirname)(htmlFilename));
            htmlFilepath = (0, _path.join)(outDir, htmlFilename);
            _context2.next = 86;
            return (0, _mkdirpThen.default)(baseDir);

          case 86:
            _context2.next = 88;
            return (0, _render.renderToHTML)(req, res, _page, query, renderOpts);

          case 88:
            html = _context2.sent;
            (0, _fs.writeFileSync)(htmlFilepath, html, 'utf8');

          case 90:
            _iteratorNormalCompletion2 = true;
            _context2.next = 72;
            break;

          case 93:
            _context2.next = 99;
            break;

          case 95:
            _context2.prev = 95;
            _context2.t1 = _context2["catch"](70);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t1;

          case 99:
            _context2.prev = 99;
            _context2.prev = 100;

            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }

          case 102:
            _context2.prev = 102;

            if (!_didIteratorError2) {
              _context2.next = 105;
              break;
            }

            throw _iteratorError2;

          case 105:
            return _context2.finish(102);

          case 106:
            return _context2.finish(99);

          case 107:
            // Add an empty line to the console for the better readability.
            log('');

          case 108:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[16, 31, 35, 43], [36,, 38, 42], [70, 95, 99, 107], [100,, 102, 106]]);
  }));
  return _ref.apply(this, arguments);
}