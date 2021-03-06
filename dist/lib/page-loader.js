"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _EventEmitter = _interopRequireDefault(require("next-server/dist/lib/EventEmitter"));

/* global window, document */
var webpackModule = module;

var PageLoader =
/*#__PURE__*/
function () {
  function PageLoader(_ref) {
    var buildId = _ref.buildId,
        assetPrefix = _ref.assetPrefix;
    (0, _classCallCheck2.default)(this, PageLoader);
    this.buildId = buildId;
    this.assetPrefix = assetPrefix;
    this.pageCache = {};
    this.pageLoadedHandlers = {};
    this.pageRegisterEvents = new _EventEmitter.default();
    this.loadingRoutes = {};
  }

  (0, _createClass2.default)(PageLoader, [{
    key: "normalizeRoute",
    value: function normalizeRoute(route) {
      if (route[0] !== '/') {
        throw new Error("Route name should start with a \"/\", got \"".concat(route, "\""));
      }

      route = route.replace(/\/index$/, '/');
      if (route === '/') return route;
      return route.replace(/\/$/, '');
    }
  }, {
    key: "loadPage",
    value: function loadPage(route) {
      var _this = this;

      route = this.normalizeRoute(route);
      return new _promise.default(function (resolve, reject) {
        var fire = function fire(_ref2) {
          var error = _ref2.error,
              page = _ref2.page;

          _this.pageRegisterEvents.off(route, fire);

          delete _this.loadingRoutes[route];

          if (error) {
            reject(error);
          } else {
            resolve(page);
          }
        }; // If there's a cached version of the page, let's use it.


        var cachedPage = _this.pageCache[route];

        if (cachedPage) {
          var error = cachedPage.error,
              page = cachedPage.page;
          error ? reject(error) : resolve(page);
          return;
        } // Register a listener to get the page


        _this.pageRegisterEvents.on(route, fire); // If the page is loading via SSR, we need to wait for it
        // rather downloading it again.


        if (document.getElementById("__NEXT_PAGE__".concat(route))) {
          return;
        } // Load the script if not asked to load yet.


        if (!_this.loadingRoutes[route]) {
          _this.loadScript(route);

          _this.loadingRoutes[route] = true;
        }
      });
    }
  }, {
    key: "loadScript",
    value: function loadScript(route) {
      var _this2 = this;

      route = this.normalizeRoute(route);
      var scriptRoute = route === '/' ? '/index.js' : "".concat(route, ".js");
      var script = document.createElement('script');
      var url = "".concat(this.assetPrefix, "/_next/static/").concat(encodeURIComponent(this.buildId), "/pages").concat(scriptRoute);
      script.src = url;

      script.onerror = function () {
        var error = new Error("Error when loading route: ".concat(route));
        error.code = 'PAGE_LOAD_ERROR';

        _this2.pageRegisterEvents.emit(route, {
          error: error
        });
      };

      document.body.appendChild(script);
    } // This method if called by the route code.

  }, {
    key: "registerPage",
    value: function registerPage(route, regFn) {
      var _this3 = this;

      var register = function register() {
        try {
          var _regFn = regFn(),
              error = _regFn.error,
              page = _regFn.page;

          _this3.pageCache[route] = {
            error: error,
            page: page
          };

          _this3.pageRegisterEvents.emit(route, {
            error: error,
            page: page
          });
        } catch (error) {
          _this3.pageCache[route] = {
            error: error
          };

          _this3.pageRegisterEvents.emit(route, {
            error: error
          });
        }
      }; // Wait for webpack to become idle if it's not.
      // More info: https://github.com/zeit/next.js/pull/1511


      if (webpackModule && webpackModule.hot && webpackModule.hot.status() !== 'idle') {
        console.log("Waiting for webpack to become \"idle\" to initialize the page: \"".concat(route, "\""));

        var check = function check(status) {
          if (status === 'idle') {
            webpackModule.hot.removeStatusHandler(check);
            register();
          }
        };

        webpackModule.hot.status(check);
      } else {
        register();
      }
    }
  }, {
    key: "clearCache",
    value: function clearCache(route) {
      route = this.normalizeRoute(route);
      delete this.pageCache[route];
      delete this.loadingRoutes[route];
      var script = document.getElementById("__NEXT_PAGE__".concat(route));

      if (script) {
        script.parentNode.removeChild(script);
      }
    }
  }]);
  return PageLoader;
}();

exports.default = PageLoader;