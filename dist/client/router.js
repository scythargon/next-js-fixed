"use strict";var _interopRequireDefault=require("@babel/runtime-corejs2/helpers/interopRequireDefault");exports.__esModule=true;exports.useRouter=useRouter;exports.useRequest=useRequest;exports.makePublicRouterInstance=makePublicRouterInstance;exports.createRouter=exports.withRouter=exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));var _defineProperty=_interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));var _react=_interopRequireDefault(require("react"));var _router2=_interopRequireDefault(require("next-server/dist/lib/router/router"));exports.Router=_router2.default;var _routerContext=require("next-server/dist/lib/router-context");var _requestContext=require("next-server/dist/lib/request-context");var _withRouter=_interopRequireDefault(require("./with-router"));exports.withRouter=_withRouter.default;/* global window */const singletonRouter={router:null,// holds the actual router instance
readyCallbacks:[],ready(cb){if(this.router)return cb();if(typeof window!=='undefined'){this.readyCallbacks.push(cb);}}};// Create public properties and methods of the router in the singletonRouter
const urlPropertyFields=['pathname','route','query','asPath'];const propertyFields=['components'];const routerEvents=['routeChangeStart','beforeHistoryChange','routeChangeComplete','routeChangeError','hashChangeStart','hashChangeComplete'];const coreMethodFields=['push','replace','reload','back','prefetch','beforePopState'];// Events is a static property on the router, the router doesn't have to be initialized to use it
(0,_defineProperty.default)(singletonRouter,'events',{get(){return _router2.default.events;}});propertyFields.concat(urlPropertyFields).forEach(field=>{// Here we need to use Object.defineProperty because, we need to return
// the property assigned to the actual router
// The value might get changed as we change routes and this is the
// proper way to access it
(0,_defineProperty.default)(singletonRouter,field,{get(){const router=getRouter();return router[field];}});});coreMethodFields.forEach(field=>{// We don't really know the types here, so we add them later instead
;singletonRouter[field]=function(){const router=getRouter();return router[field](...arguments);};});routerEvents.forEach(event=>{singletonRouter.ready(()=>{_router2.default.events.on(event,function(){const eventField="on"+event.charAt(0).toUpperCase()+event.substring(1);const _singletonRouter=singletonRouter;if(_singletonRouter[eventField]){try{_singletonRouter[eventField](...arguments);}catch(err){// tslint:disable-next-line:no-console
console.error("Error when running the Router event: "+eventField);// tslint:disable-next-line:no-console
console.error(err.message+"\n"+err.stack);}}});});});function getRouter(){if(!singletonRouter.router){const message='No router instance found.\n'+'You should only use "next/router" inside the client side of your app.\n';throw new Error(message);}return singletonRouter.router;}// Export the singletonRouter and this is the public API.
var _default=singletonRouter;// Reexport the withRoute HOC
exports.default=_default;function useRouter(){return _react.default.useContext(_routerContext.RouterContext);}function useRequest(){return _react.default.useContext(_requestContext.RequestContext);}// INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.
const createRouter=function createRouter(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}singletonRouter.router=new _router2.default(...args);singletonRouter.readyCallbacks.forEach(cb=>cb());singletonRouter.readyCallbacks=[];return singletonRouter.router;};// This function is used to create the `withRouter` router instance
exports.createRouter=createRouter;function makePublicRouterInstance(router){const _router=router;const instance={};for(const property of urlPropertyFields){if(typeof _router[property]==='object'){instance[property]=(0,_extends2.default)({},_router[property]);// makes sure query is not stateful
continue;}instance[property]=_router[property];}// Events is a static property on the router, the router doesn't have to be initialized to use it
instance.events=_router2.default.events;propertyFields.forEach(field=>{// Here we need to use Object.defineProperty because, we need to return
// the property assigned to the actual router
// The value might get changed as we change routes and this is the
// proper way to access it
(0,_defineProperty.default)(instance,field,{get(){return _router[field];}});});coreMethodFields.forEach(field=>{instance[field]=function(){return _router[field](...arguments);};});return instance;}