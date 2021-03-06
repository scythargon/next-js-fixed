"use strict";exports.__esModule=true;exports.default=void 0;var _path=require("path");var _querystring=require("querystring");var _constants=require("next-server/constants");var _utils=require("next-server/dist/lib/router/utils");const nextServerlessLoader=function(){const{distDir,absolutePagePath,page,canonicalBase,assetPrefix,ampBindInitData,absoluteAppPath,absoluteDocumentPath,absoluteErrorPath,generateEtags,dynamicBuildId}=typeof this.query==='string'?(0,_querystring.parse)(this.query.substr(1)):this.query;const buildManifest=(0,_path.join)(distDir,_constants.BUILD_MANIFEST).replace(/\\/g,'/');const reactLoadableManifest=(0,_path.join)(distDir,_constants.REACT_LOADABLE_MANIFEST).replace(/\\/g,'/');return`
    import {parse} from 'url'
    import {renderToHTML} from 'next-server/dist/server/render';
    import {sendHTML} from 'next-server/dist/server/send-html';
    ${(0,_utils.isDynamicRoute)(page)?`import {getRouteMatcher, getRouteRegex} from 'next-server/dist/lib/router/utils';`:''}
    import buildManifest from '${buildManifest}';
    import reactLoadableManifest from '${reactLoadableManifest}';
    import Document from '${absoluteDocumentPath}';
    import Error from '${absoluteErrorPath}';
    import App from '${absoluteAppPath}';
    import * as ComponentInfo from '${absolutePagePath}';
    const Component = ComponentInfo.default
    export default Component
    export const config = ComponentInfo['confi' + 'g'] || {}
    export const _app = App
    export async function renderReqToHTML(req, res, fromExport) {
      const options = {
        App,
        Document,
        buildManifest,
        reactLoadableManifest,
        canonicalBase: "${canonicalBase}",
        buildId: "__NEXT_REPLACE__BUILD_ID__",
        dynamicBuildId: ${dynamicBuildId===true||dynamicBuildId==='true'},
        assetPrefix: "${assetPrefix}",
        ampBindInitData: ${ampBindInitData===true||ampBindInitData==='true'}
      }
      const parsedUrl = parse(req.url, true)
      const renderOpts = Object.assign(
        {
          Component,
          pageConfig: config,
          dataOnly: req.headers && (req.headers.accept || '').indexOf('application/amp.bind+json') !== -1,
          nextExport: fromExport
        },
        options,
      )
      try {
        ${page==='/_error'?`res.statusCode = 404`:''}
        ${(0,_utils.isDynamicRoute)(page)?`const params = getRouteMatcher(getRouteRegex("${page}"))(parsedUrl.pathname) || {};`:`const params = {};`}
        const result = await renderToHTML(req, res, "${page}", Object.assign({}, parsedUrl.query, params), renderOpts)

        if (fromExport) return { html: result, renderOpts }
        return result
      } catch (err) {
        if (err.code === 'ENOENT') {
          res.statusCode = 404
          const result = await renderToHTML(req, res, "/_error", parsedUrl.query, Object.assign({}, options, {
            Component: Error
          }))
          return result
        } else {
          console.error(err)
          res.statusCode = 500
          const result = await renderToHTML(req, res, "/_error", parsedUrl.query, Object.assign({}, options, {
            Component: Error,
            err
          }))
          return result
        }
      }
    }
    export async function render (req, res) {
      try {
        const html = await renderReqToHTML(req, res)
        sendHTML(req, res, html, {generateEtags: ${generateEtags}})
      } catch(err) {
        console.error(err)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    }
  `;};var _default=nextServerlessLoader;exports.default=_default;