"use strict";exports.__esModule=true;exports.default=nextPageConfig;exports.dropBundleIdentifier=exports.inlineGipIdentifier=void 0;const configKeys=new Set(['amp','experimentalPrerender']);const inlineGipIdentifier='__NEXT_GIP_INLINE__';exports.inlineGipIdentifier=inlineGipIdentifier;const dropBundleIdentifier='__NEXT_DROP_CLIENT_FILE__';// replace progam path with just a variable with the drop identifier
exports.dropBundleIdentifier=dropBundleIdentifier;function replaceBundle(path,t){path.parentPath.replaceWith(t.program([t.variableDeclaration('const',[t.variableDeclarator(t.identifier('config'),t.assignmentExpression('=',t.identifier(dropBundleIdentifier),t.stringLiteral(`${dropBundleIdentifier} ${Date.now()}`)))])],[]));}function nextPageConfig({types:t}){return{visitor:{Program:{enter(path,state){path.traverse({ExportNamedDeclaration(path,state){if(state.bundleDropped||!path.node.declaration||!path.node.declaration.declarations)return;const{declarations}=path.node.declaration;const config={};for(const declaration of declarations){if(declaration.id.name!=='config')continue;for(const prop of declaration.init.properties){const{name}=prop.key;if(configKeys.has(name)){// @ts-ignore
config[name]=prop.value.value;}}}if(config.amp===true){replaceBundle(path,t);state.bundleDropped=true;return;}if(config.experimentalPrerender===true||config.experimentalPrerender==='inline'){state.setupInlining=true;}}},state);}},// handles Page.getInitialProps = () => {}
AssignmentExpression(path,state){if(!state.setupInlining)return;const{property}=path.node.left||{};const{name}=property;if(name!=='getInitialProps')return;// replace the getInitialProps function with an identifier for replacing
path.node.right=t.functionExpression(null,[],t.blockStatement([t.returnStatement(t.stringLiteral(inlineGipIdentifier))]));},// handles class { static async getInitialProps() {} }
FunctionDeclaration(path,state){if(!state.setupInlining)return;if((path.node.id&&path.node.id.name)!=='getInitialProps')return;path.node.body=t.blockStatement([t.returnStatement(t.stringLiteral(inlineGipIdentifier))]);}}};}