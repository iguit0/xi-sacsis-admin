(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5718e7dc"],{"018c":function(n,e,t){n.exports=t.p+"img/guia-camisetas.c13140ce.jpeg"},"03c8":function(n,e,t){"use strict";var s=t("5bf8"),r=t.n(s);r.a},"0a4b":function(n,e,t){"use strict";(function(n){var t={name:"VueLoadingButton",props:{loading:{type:Boolean,required:!1,default:!1},styled:{type:Boolean,required:!1,default:!0}}};function s(n,e,t,s,r,a,i,o,l,d){"function"===typeof i&&(l=o,o=i,i=!1);var u,A="function"===typeof t?t.options:t;if(n&&n.render&&(A.render=n.render,A.staticRenderFns=n.staticRenderFns,A._compiled=!0,r&&(A.functional=!0)),s&&(A._scopeId=s),a?(u=function(n){n=n||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,n||"undefined"===typeof __VUE_SSR_CONTEXT__||(n=__VUE_SSR_CONTEXT__),e&&e.call(this,l(n)),n&&n._registeredComponents&&n._registeredComponents.add(a)},A._ssrRegister=u):e&&(u=i?function(){e.call(this,d(this.$root.$options.shadowRoot))}:function(n){e.call(this,o(n))}),u)if(A.functional){var c=A.render;A.render=function(n,e){return u.call(e),c(n,e)}}else{var p=A.beforeCreate;A.beforeCreate=p?[].concat(p,u):[u]}return t}var r="undefined"!==typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function a(n){return function(n,e){return l(n,e)}}var i=document.head||document.getElementsByTagName("head")[0],o={};function l(n,e){var t=r?e.media||"default":n,s=o[t]||(o[t]={ids:new Set,styles:[]});if(!s.ids.has(n)){s.ids.add(n);var a=e.source;if(e.map&&(a+="\n/*# sourceURL="+e.map.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e.map))))+" */"),s.element||(s.element=document.createElement("style"),s.element.type="text/css",e.media&&s.element.setAttribute("media",e.media),i.appendChild(s.element)),"styleSheet"in s.element)s.styles.push(a),s.element.styleSheet.cssText=s.styles.filter(Boolean).join("\n");else{var l=s.ids.size-1,d=document.createTextNode(a),u=s.element.childNodes;u[l]&&s.element.removeChild(u[l]),u.length?s.element.insertBefore(d,u[l]):s.element.appendChild(d)}}}var d=t;t.__file="C:\\Users\\shwilliam\\GitHub\\vue-loading-button\\src\\vue-loading-button.vue";var u=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("button",{class:{"vue-loading-button":!0,"default-styles":n.styled,loading:n.loading},attrs:{disabled:n.loading,type:"button"}},[n._t("default",[n._v("Submit")]),n._v(" "),n._m(0)],2)},A=[function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("span",{staticClass:"spinner"},[t("span"),n._v(" "),t("span"),n._v(" "),t("span"),n._v(" "),t("span")])}];u._withStripped=!0;var c=function(n){n&&n("data-v-1d441d3c_0",{source:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* reset */\nbutton[data-v-1d441d3c] {\r\n  font-family: inherit;\r\n  font-size: 100%;\r\n  font-size: 1.4rem;\r\n  line-height: 1.15;\r\n  margin: 0;\r\n  overflow: visible;\r\n  text-transform: none;\r\n  -webkit-appearance: button;\n}\nbutton[data-v-1d441d3c]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\n}\nbutton[data-v-1d441d3c]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\n}\r\n\r\n/* loading styles */\nbutton[data-v-1d441d3c] {\r\n  position: relative;\r\n  -webkit-transition: all 0.2s;\r\n  transition: all 0.2s;\r\n  transition-timing-function: ease-in;\n}\n.spinner[data-v-1d441d3c] {\r\n  line-height: 1.15;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: auto;\r\n  right: 1.7rem;\r\n  margin: -0.5em;\r\n  opacity: 0;\r\n  transition-property: padding, opacity;\r\n  transition-duration: 0.2s, 0.2s;\r\n  transition-timing-function: ease-in, ease;\r\n  transition-delay: 0s, 0.2s;\n}\n.spinner span[data-v-1d441d3c] {\r\n  box-sizing: border-box;\r\n  display: inline-block;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0.15rem;\r\n  width: 1rem;\r\n  height: 1rem;\r\n  opacity: 1;\r\n  border: 3.4px solid #888;\r\n  border-radius: 50%;\r\n  animation: spinner-data-v-1d441d3c 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n  border-color: #888 transparent transparent transparent;\n}\n.spinner span[data-v-1d441d3c]:nth-child(1) {\r\n  animation-delay: 0.45s;\n}\n.spinner span[data-v-1d441d3c]:nth-child(2) {\r\n  animation-delay: 0.3s;\n}\n.spinner span[data-v-1d441d3c]:nth-child(3) {\r\n  animation-delay: 0.15s;\n}\n.loading[data-v-1d441d3c] {\r\n  padding-right: 3rem !important;\n}\n.loading .spinner[data-v-1d441d3c] {\r\n  opacity: 1;\n}\n.loading .spinner span[data-v-1d441d3c] {\r\n  opacity: 1;\n}\nbutton[data-v-1d441d3c]:not(:disabled) {\r\n  transition-delay: 0.2s;\n}\nbutton:not(:disabled) .spinner span[data-v-1d441d3c] {\r\n  box-shadow: 0 0 0 0.2rem #888 inset;\r\n  border: 7.4px solid transparent;\r\n  -webkit-transition: all 0.4s;\r\n  transition: all 0.4s;\n}\nbutton:not(:disabled) .spinner span[data-v-1d441d3c]:nth-child(1) {\r\n  transform: rotate(0deg) !important;\n}\nbutton:not(:disabled) .spinner span[data-v-1d441d3c]:nth-child(2) {\r\n  transform: rotate(90deg) !important;\n}\nbutton:not(:disabled) .spinner span[data-v-1d441d3c]:nth-child(3) {\r\n  transform: rotate(180deg) !important;\n}\nbutton:not(:disabled) .spinner span[data-v-1d441d3c]:nth-child(4) {\r\n  transform: rotate(270deg) !important;\n}\n@keyframes spinner-data-v-1d441d3c {\n0% {\r\n    transform: rotate(0deg);\n}\n100% {\r\n    transform: rotate(360deg);\n}\n}\r\n\r\n/* default styles */\n.default-styles[data-v-1d441d3c] {\r\n  color: white;\r\n  background-color: blue;\r\n  border: solid 1px transparent;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  padding: 8px 16.5px 8px 16px;\r\n  line-height: 1.9rem;\n}\n.default-styles[data-v-1d441d3c]:disabled {\r\n  pointer-events: stroke;\r\n  cursor: not-allowed;\n}\n.default-styles[data-v-1d441d3c]:focus {\r\n  outline: none;\r\n  box-shadow: 0 0 0 3px lightblue, 0 0 0 1.5px lightblue;\n}\n.default-styles .spinner span[data-v-1d441d3c] {\r\n  top: 0rem;\r\n  width: 1.2rem;\r\n  height: 1.2rem;\r\n  border: 3.4px solid #fff;\r\n  border-color: #fff transparent transparent transparent;\n}\n.default-styles:not(:disabled) .spinner span[data-v-1d441d3c] {\r\n  border: 8.4px solid transparent;\r\n  box-shadow: 0 0 0 0.1rem #fff inset;\n}\r\n",map:{version:3,sources:["C:\\Users\\shwilliam\\GitHub\\vue-loading-button/C:\\Users\\shwilliam\\GitHub\\vue-loading-button\\src\\vue-loading-button.vue"],names:[],mappings:";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAuCA,UAAA;AACA;EACA,oBAAA;EACA,eAAA;EACA,iBAAA;EACA,iBAAA;EACA,SAAA;EACA,iBAAA;EACA,oBAAA;EACA,0BAAA;AACA;AACA;EACA,kBAAA;EACA,UAAA;AACA;AACA;EACA,8BAAA;AACA;;AAEA,mBAAA;AACA;EACA,kBAAA;EACA,4BAAA;EACA,oBAAA;EACA,mCAAA;AACA;AACA;EACA,iBAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,aAAA;EACA,cAAA;EACA,UAAA;EACA,qCAAA;EACA,+BAAA;EACA,yCAAA;EACA,0BAAA;AACA;AACA;EACA,sBAAA;EACA,qBAAA;EACA,kBAAA;EACA,QAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,wBAAA;EACA,kBAAA;EACA,6EAAA;EACA,sDAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,qBAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,8BAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,sBAAA;AACA;AACA;EACA,mCAAA;EACA,+BAAA;EACA,4BAAA;EACA,oBAAA;AACA;AACA;EACA,kCAAA;AACA;AACA;EACA,mCAAA;AACA;AACA;EACA,oCAAA;AACA;AACA;EACA,oCAAA;AACA;AACA;AACA;IACA,uBAAA;AACA;AACA;IACA,yBAAA;AACA;AACA;;AAEA,mBAAA;AACA;EACA,YAAA;EACA,sBAAA;EACA,6BAAA;EACA,kBAAA;EACA,eAAA;EACA,4BAAA;EACA,mBAAA;AACA;AACA;EACA,sBAAA;EACA,mBAAA;AACA;AACA;EACA,aAAA;EACA,sDAAA;AACA;AACA;EACA,SAAA;EACA,aAAA;EACA,cAAA;EACA,wBAAA;EACA,sDAAA;AACA;AACA;EACA,+BAAA;EACA,mCAAA;AACA",file:"vue-loading-button.vue",sourcesContent:['<template>\r\n  <button\r\n    :class="{\r\n      \'vue-loading-button\': true,\r\n      \'default-styles\': styled,\r\n      \'loading\': loading,\r\n    }"\r\n    :disabled="loading"\r\n    type="button"\r\n  >\r\n    <slot>Submit</slot>\r\n    <span class="spinner">\r\n      <span></span>\r\n      <span></span>\r\n      <span></span>\r\n      <span></span>\r\n    </span>\r\n  </button>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: "VueLoadingButton",\r\n  props: {\r\n    loading: {\r\n      type: Boolean,\r\n      required: false,\r\n      default: false\r\n    },\r\n    styled: {\r\n      type: Boolean,\r\n      required: false,\r\n      default: true\r\n    }\r\n  }\r\n};\r\n<\/script>\r\n\r\n<style scoped>\r\n/* reset */\r\nbutton {\r\n  font-family: inherit;\r\n  font-size: 100%;\r\n  font-size: 1.4rem;\r\n  line-height: 1.15;\r\n  margin: 0;\r\n  overflow: visible;\r\n  text-transform: none;\r\n  -webkit-appearance: button;\r\n}\r\nbutton::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\nbutton:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/* loading styles */\r\nbutton {\r\n  position: relative;\r\n  -webkit-transition: all 0.2s;\r\n  transition: all 0.2s;\r\n  transition-timing-function: ease-in;\r\n}\r\n.spinner {\r\n  line-height: 1.15;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: auto;\r\n  right: 1.7rem;\r\n  margin: -0.5em;\r\n  opacity: 0;\r\n  transition-property: padding, opacity;\r\n  transition-duration: 0.2s, 0.2s;\r\n  transition-timing-function: ease-in, ease;\r\n  transition-delay: 0s, 0.2s;\r\n}\r\n.spinner span {\r\n  box-sizing: border-box;\r\n  display: inline-block;\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0.15rem;\r\n  width: 1rem;\r\n  height: 1rem;\r\n  opacity: 1;\r\n  border: 3.4px solid #888;\r\n  border-radius: 50%;\r\n  animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n  border-color: #888 transparent transparent transparent;\r\n}\r\n.spinner span:nth-child(1) {\r\n  animation-delay: 0.45s;\r\n}\r\n.spinner span:nth-child(2) {\r\n  animation-delay: 0.3s;\r\n}\r\n.spinner span:nth-child(3) {\r\n  animation-delay: 0.15s;\r\n}\r\n.loading {\r\n  padding-right: 3rem !important;\r\n}\r\n.loading .spinner {\r\n  opacity: 1;\r\n}\r\n.loading .spinner span {\r\n  opacity: 1;\r\n}\r\nbutton:not(:disabled) {\r\n  transition-delay: 0.2s;\r\n}\r\nbutton:not(:disabled) .spinner span {\r\n  box-shadow: 0 0 0 0.2rem #888 inset;\r\n  border: 7.4px solid transparent;\r\n  -webkit-transition: all 0.4s;\r\n  transition: all 0.4s;\r\n}\r\nbutton:not(:disabled) .spinner span:nth-child(1) {\r\n  transform: rotate(0deg) !important;\r\n}\r\nbutton:not(:disabled) .spinner span:nth-child(2) {\r\n  transform: rotate(90deg) !important;\r\n}\r\nbutton:not(:disabled) .spinner span:nth-child(3) {\r\n  transform: rotate(180deg) !important;\r\n}\r\nbutton:not(:disabled) .spinner span:nth-child(4) {\r\n  transform: rotate(270deg) !important;\r\n}\r\n@keyframes spinner {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n/* default styles */\r\n.default-styles {\r\n  color: white;\r\n  background-color: blue;\r\n  border: solid 1px transparent;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  padding: 8px 16.5px 8px 16px;\r\n  line-height: 1.9rem;\r\n}\r\n.default-styles:disabled {\r\n  pointer-events: stroke;\r\n  cursor: not-allowed;\r\n}\r\n.default-styles:focus {\r\n  outline: none;\r\n  box-shadow: 0 0 0 3px lightblue, 0 0 0 1.5px lightblue;\r\n}\r\n.default-styles .spinner span {\r\n  top: 0rem;\r\n  width: 1.2rem;\r\n  height: 1.2rem;\r\n  border: 3.4px solid #fff;\r\n  border-color: #fff transparent transparent transparent;\r\n}\r\n.default-styles:not(:disabled) .spinner span {\r\n  border: 8.4px solid transparent;\r\n  box-shadow: 0 0 0 0.1rem #fff inset;\r\n}\r\n</style>\r\n']},media:void 0})},p="data-v-1d441d3c",h=void 0,m=!1,g=s({render:u,staticRenderFns:A},c,d,p,m,h,a,void 0);function b(n){b.installed||(b.installed=!0,n.component("VueLoadingButton",g))}var f={install:b},v=null;"undefined"!==typeof window?v=window.Vue:"undefined"!==typeof n&&(v=n.Vue),v&&v.use(f),e["a"]=g}).call(this,t("c8ba"))},"4ffd":function(n,e,t){n.exports=t.p+"img/logo.8ec3f294.png"},"5bf8":function(n,e,t){},7424:function(n,e,t){"use strict";var s=t("bc3a"),r=t.n(s),a=t("c0d6"),i=t("2919"),o=r.a.create({baseURL:i["a"],validateStatus:function(n){return n<1e3}});o.interceptors.request.use(function(n){try{var e=a["a"].getters.getToken;e?n.headers.Authorization="Bearer ".concat(e):delete n.headers.Authorization}catch(t){return n}return n}),e["a"]=o},b343:function(n,e,t){"use strict";t.r(e);var s=function(){var n=this,e=n.$createElement,s=n._self._c||e;return s("div",{staticClass:"auth-content"},[s("div",{staticClass:"auth-modal"},[s("b-img",{staticClass:"mb-3 d-none d-md-block d-lg-block d-xl-block",attrs:{src:t("4ffd")}}),s("b-img",{staticClass:"mb-3 d-sm-block d-xs-block d-md-none d-lg-none d-xl-none",attrs:{src:t("4ffd"),width:"250px",height:"100px"}}),s("hr"),n.recoverPass||n.changePass?n.recoverPass?s("div",{staticClass:"auth-title"},[n._v("ESQUECI MINHA SENHA")]):n.changePass?s("div",{staticClass:"auth-title"},[n._v("INSIRA SUA NOVA SENHA")]):n._e():s("div",{staticClass:"auth-title"},[n._v(n._s(n.showSignup?"CADASTRO":"LOGIN"))]),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"font"}})],1),s("b-input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Nome e sobrenome",required:"",name:"name"},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.name,callback:function(e){n.$set(n.user,"name",e)},expression:"user.name"}})],1):n._e(),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"venus-mars"}})],1),s("b-form-select",{attrs:{required:"",options:n.optionsGender},model:{value:n.user.sexo,callback:function(e){n.$set(n.user,"sexo",e)},expression:"user.sexo"}})],1):n._e(),n.recoverPass||n.changePass?n._e():s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"envelope"}})],1),n.changePass?n._e():s("b-input",{staticClass:"form-control",attrs:{name:"email",type:"email",placeholder:"E-mail",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.email,callback:function(e){n.$set(n.user,"email",e)},expression:"user.email"}})],1),n.recoverPass?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"envelope"}})],1),s("b-input",{staticClass:"form-control",attrs:{name:"email",type:"email",placeholder:"E-mail",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.resetPass(e):null}},model:{value:n.user.email,callback:function(e){n.$set(n.user,"email",e)},expression:"user.email"}})],1):n._e(),n.showPass||n.recoverPass?n.showPass&&!n.recoverPass?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"key"}})],1),s("b-input",{staticClass:"form-control",attrs:{name:"password",type:"text",placeholder:"Senha",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.password,callback:function(e){n.$set(n.user,"password",e)},expression:"user.password"}}),s("b-input-group-text",{attrs:{slot:"append"},on:{click:n.showPassword},slot:"append"},[s("v-icon",{attrs:{name:"eye"}})],1)],1):n.changePass?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"key"}})],1),s("b-input",{staticClass:"form-control",attrs:{name:"password",type:"text",placeholder:"Senha",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.password,callback:function(e){n.$set(n.user,"password",e)},expression:"user.password"}}),s("b-input-group-text",{attrs:{slot:"append"},on:{click:n.showPassword},slot:"append"},[s("v-icon",{attrs:{name:"eye"}})],1)],1):n._e():s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"key"}})],1),s("b-input",{staticClass:"form-control",attrs:{name:"password",type:"password",placeholder:"Senha",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.password,callback:function(e){n.$set(n.user,"password",e)},expression:"user.password"}}),s("b-input-group-text",{attrs:{slot:"append"},on:{click:n.showPassword},slot:"append"},[s("v-icon",{attrs:{name:"eye-slash"}})],1)],1),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"key"}})],1),n.showSignup?s("b-input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Confirme a Senha",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.confirmPassword,callback:function(e){n.$set(n.user,"confirmPassword",e)},expression:"user.confirmPassword"}}):n._e()],1):n._e(),n.changePass?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"key"}})],1),n.changePass?s("b-input",{staticClass:"form-control",attrs:{type:"password",placeholder:"Confirme a Senha",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.confirmPassword,callback:function(e){n.$set(n.user,"confirmPassword",e)},expression:"user.confirmPassword"}}):n._e()],1):n._e(),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"id-card"}})],1),s("the-mask",{staticClass:"form-control",attrs:{mask:["#####"],name:"matricula",placeholder:"Matrícula",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.matricula,callback:function(e){n.$set(n.user,"matricula",e)},expression:"user.matricula"}})],1):n._e(),n.showSignup?s("div",{staticClass:"input-group mb-3"},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text"},[s("v-icon",{attrs:{name:"id-card-alt"}})],1)]),s("the-mask",{staticClass:"form-control",attrs:{placeholder:"CPF",required:"",mask:["###.###.###-##"]},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.cpf,callback:function(e){n.$set(n.user,"cpf",e)},expression:"user.cpf"}})],1):n._e(),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"id-card-alt"}})],1),s("b-input",{attrs:{placeholder:"RG",required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.rg,callback:function(e){n.$set(n.user,"rg",e)},expression:"user.rg"}})],1):n._e(),n.showSignup?s("b-input-group",{staticClass:"mb-3"},[s("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[s("v-icon",{attrs:{name:"tshirt"}})],1),s("b-form-select",{staticClass:"form-control",attrs:{options:n.optionsShirt,required:""},on:{keyup:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.checkForm(e):null}},model:{value:n.user.shirtSize,callback:function(e){n.$set(n.user,"shirtSize",e)},expression:"user.shirtSize"}}),s("b-input-group-append",[s("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-1",modifiers:{"modal-1":!0}}],attrs:{variant:"info"}},[s("v-icon",{attrs:{name:"info-circle"}})],1)],1)],1):n._e(),n.showSignup?s("VueLoadingButton",{staticClass:"btn btn-warning btn-block",attrs:{"aria-label":"Registrar no Sistema",styled:n.isStyled,loading:n.isLoading},nativeOn:{click:function(e){return n.checkForm(e)}}},[s("v-icon",{staticClass:"mr-1",attrs:{name:"user-plus",scale:"1.5"}}),n._v("Registrar\n    ")],1):n.showSignup||n.recoverPass||n.changePass?n.changePass?s("VueLoadingButton",{staticClass:"btn btn-success btn-block",attrs:{"aria-label":"Salvar nova senha",styled:n.isStyled,loading:n.isLoading},nativeOn:{click:function(e){return n.checkForm(e)}}},[s("v-icon",{staticClass:"mr-1",attrs:{name:"sign-in-alt",scale:"1.5"}}),n._v("Salvar nova senha\n    ")],1):n._e():s("VueLoadingButton",{staticClass:"btn btn-success btn-block",attrs:{"aria-label":"Entrar no sistema",styled:n.isStyled,loading:n.isLoading},nativeOn:{click:function(e){return n.checkForm(e)}}},[s("v-icon",{staticClass:"mr-1",attrs:{name:"sign-in-alt",scale:"1.5"}}),n._v("Entrar\n    ")],1),n.recoverPass?s("VueLoadingButton",{staticClass:"btn btn-primary btn-block",attrs:{"aria-label":"Recuperar Senha",styled:n.isStyled,loading:n.isLoading},nativeOn:{click:function(e){return n.checkForm(e)}}},[s("v-icon",{staticClass:"mr-1",attrs:{name:"unlock-alt",scale:"1.5"}}),n._v("Recuperar\n    ")],1):n._e(),s("a",{staticClass:"mt-3",attrs:{href:""},on:{click:function(e){return e.preventDefault(),n.toggleSignup(e)}}},[n.showSignup?s("span",[n._v("Já tem cadastro? Acesse o Login!")]):n.showSignup||n.changePass?n._e():s("span",[n._v("Não tem cadastro? Registre-se aqui!")])]),s("a",{staticClass:"mt-2",attrs:{href:""},on:{click:function(e){return e.preventDefault(),n.toggleRecover(e)}}},[n.recoverPass||n.changePass?n.changePass?n._e():s("span",[n._v("Lembrou a senha? Entre aqui!")]):s("span",[n._v("Esqueci minha senha!")])]),s("b-modal",{attrs:{id:"modal-1",title:"Guia Camisetas","ok-only":"",centered:""}},[s("b-img",{attrs:{src:t("018c")}})],1)],1)])},r=[],a=(t("7f7f"),t("2919")),i=t("7424"),o=t("bc3a"),l=t.n(o),d=t("0a4b"),u={name:"Auth",components:{VueLoadingButton:d["a"]},data:function(){return{isStyled:!1,isLoading:!1,showPass:!1,showSignup:!1,recoverPass:!1,changePass:!1,loginData:null,user:{sexo:null,shirtSize:null},optionsShirt:[{value:null,text:"Tamanho"},{value:"P",text:"P"},{value:"M",text:"M"},{value:"G",text:"G"},{value:"GG",text:"GG"}],optionsGender:[{value:null,text:"Gênero"},{value:0,text:"Masculino"},{value:1,text:"Feminino"}]}},methods:{validEmail:function(n){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(n)},checkForm:function(n){if(this.errors=[],this.isLoading=!0,this.changePass)if(this.user.password)if(this.user.confirmPassword){if(this.user.password!=this.user.confirmPassword){var e="Senha e Confirmar senha não são iguais";this.errors.push(e),Object(a["b"])(e),this.isLoading=!1}}else{var t="Confirme sua senha";this.errors.push(t),Object(a["b"])(t),this.isLoading=!1}else{var s="Senha é obrigatório";this.errors.push(s),Object(a["b"])(s),this.isLoading=!1}else if(this.recoverPass){if(!this.user.email){var r="E-mail é obrigatório";this.errors.push(r),Object(a["b"])(r),this.isLoading=!1}}else if(this.showSignup){if(this.showSignup)if(this.user.name)if(this.user.email)if(this.user.password)if(this.user.email||this.user.password)if(this.user.password!=this.user.confirmPassword){var i="Senha e Confirmar Senha não são iguais";this.errors.push(i),Object(a["b"])(i),this.isLoading=!1}else if(this.user.confirmPassword)if(this.user.matricula)if(this.user.cpf)if(this.user.rg){if(null===this.user.shirtSize){var o="Escolha um tamanho de camiseta";this.errors.push(o),Object(a["b"])(o),this.isLoading=!1}else if(null===this.user.sexo){var l="Escolha um gênero";this.errors.push(l),Object(a["b"])(l),this.isLoading=!1}}else{var d="RG é obrigatório";this.errors.push(d),Object(a["b"])(d),this.isLoading=!1}else{var u="CPF é obrigatório";this.errors.push(u),Object(a["b"])(u),this.isLoading=!1}else{var A="Matrícula é obrigatório";this.errors.push(A),Object(a["b"])(A),this.isLoading=!1}else{var c="Confirme sua senha";this.errors.push(c),Object(a["b"])(c),this.isLoading=!1}else{var p="E-mail e Senha são obrigatórios";this.errors.push(p),Object(a["b"])(p),this.isLoading=!1}else{var h="Senha é obrigatório";this.errors.push(h),Object(a["b"])(h),this.isLoading=!1}else{var m="E-mail é obrigatório";this.errors.push(m),Object(a["b"])(m),this.isLoading=!1}else{var g="Nome completo é obrigatório";this.errors.push(g),Object(a["b"])(g),this.isLoading=!1}}else if(this.user.email)if(this.validEmail(this.user.email))if(this.user.password){if(!this.user.email&&!this.user.password){var b="E-mail e Senha são obrigatórios";this.errors.push(b),Object(a["b"])(b),this.isLoading=!1}}else{var f="Senha é obrigatório";this.errors.push(f),Object(a["b"])(f),this.isLoading=!1}else{var v="Utilize um e-mail válido";this.errors.push(v),Object(a["b"])(v),this.isLoading=!1}else{var C="E-mail é obrigatório";this.errors.push(C),Object(a["b"])(C),this.isLoading=!1}return!this.errors.length&&this.changePass?(this.isLoading=!1,this.newPass()):!this.errors.length&&this.recoverPass?(this.isLoading=!1,this.resetPass()):this.errors.length||this.showSignup?!this.errors.length&&this.showSignup?(this.isLoading=!1,this.signup()):void n.preventDefault():(this.isLoading=!1,this.signin())},signin:function(){var n=this;this.isLoading=!0;var e=JSON.parse(JSON.stringify(this.user)),t={login:e.email,senha:e.password};i["a"].post("/login",t).then(function(e){if(200===e.status)if(e.data.rsenha)n.loginData=e.data,n.isLoading=!1,n.user.password="",n.user.confirmPassword="",n.toggleChangePassword();else{localStorage.setItem(a["f"],JSON.stringify(e.data)),n.$store.commit("setUser",e.data),n.isLoading=!1,n.$router.push({path:"/"});var t="Bem Vindo (a), "+n.$store.getters.getUsername;Object(a["e"])(t)}else{var s=e.data.message;Object(a["b"])(s),n.isLoading=!1}})},signup:function(){var n=this;this.isLoading=!0;var e=JSON.parse(JSON.stringify(this.user)),t={nome:e.name,email:e.email,matricula:e.matricula,cpf:e.cpf,rg:e.rg,senha:e.password,sexo:e.sexo,camiseta:e.shirtSize};l.a.post("".concat(a["a"],"/user"),t).then(function(e){201===e.status?(n.isLoading=!1,Object(a["d"])(e.data.message),n.user={},n.showSignup=!1):(Object(a["b"])(e.data.message),n.isLoading=!1)})},resetPass:function(){var n=this;if(this.isLoading=!0,!this.user.email){var e="E-mail é obrigatório";return this.errors.push(e),Object(a["b"])(e),void(this.isLoading=!1)}var t=JSON.parse(JSON.stringify(this.user)),s={login:t.email};i["a"].post("/reset_password",s).then(function(e){if(200===e.status){var t=e.data.message;Object(a["d"])(t),Object(a["c"])("Senha enviada ao e-mail!"),n.isLoading=!1,n.user={},n.recoverPass=!1}else{var s=e.data.message;Object(a["b"])(s),n.isLoading=!1}})},newPass:function(){var n=this;this.isLoading=!0;var e=JSON.parse(JSON.stringify(this.user)),t={senha:e.password},s=l.a.create({baseURL:a["a"],headers:{Authorization:"Bearer ".concat(this.loginData.jwt_token)},validateStatus:function(n){return n<1e3}});s.put("/reset_password",t).then(function(e){if(201===e.status){localStorage.setItem(a["f"],JSON.stringify(n.loginData)),n.$store.commit("setUser",n.loginData),n.isLoading=!1,n.$router.push({path:"/"});var t="Bem Vindo (a), "+n.$store.getters.getUsername;Object(a["e"])(t)}else{var s=e.data.message;Object(a["b"])(s),n.isLoading=!1}})},toggleSignup:function(){this.recoverPass?!this.showSignup&&this.recoverPass&&(this.recoverPass=!this.recoverPass,this.showSignup=!this.showSignup):this.showSignup=!this.showSignup},toggleRecover:function(){this.showSignup?(this.showSignup=!this.showSignup,this.recoverPass=!this.recoverPass):this.recoverPass=!this.recoverPass},toggleChangePassword:function(){this.showSignup?(this.showSignup=!this.showSignup,this.changePass=!this.changePass):this.changePass=!this.changePass},showPassword:function(){this.showPass=!this.showPass}}},A=u,c=(t("03c8"),t("2877")),p=Object(c["a"])(A,s,r,!1,null,"22e6130f",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-5718e7dc.fa8813d4.js.map