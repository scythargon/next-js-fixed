"use strict";exports.__esModule=true;exports.default=void 0;var _loaderUtils=_interopRequireDefault(require("loader-utils"));var _minify=_interopRequireDefault(require("../plugins/terser-webpack-plugin/src/minify"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const nextMiniferLoader=function(source){this.cacheable();const options=_loaderUtils.default.getOptions(this)||{};const{error,code}=(0,_minify.default)({file:'noop',input:source,terserOptions:{...options.terserOptions,sourceMap:false}});if(error){this.callback(new Error(`Error from Terser: ${error.message}`));return;}this.callback(undefined,code);return;};var _default=nextMiniferLoader;exports.default=_default;