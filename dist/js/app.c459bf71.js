(function(e){function t(t){for(var a,r,i=t[0],u=t[1],c=t[2],l=0,d=[];l<i.length;l++)r=i[l],o[r]&&d.push(o[r][0]),o[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);f&&f(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,r=1;r<n.length;r++){var i=n[r];0!==o[i]&&(a=!1)}a&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},r={app:0},o={app:0},s=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-3e619d5c":"cdba5a70","chunk-50f3f492":"483762ba","chunk-54b58955":"66db5cd6","chunk-55d58294":"34172833","chunk-5718e7dc":"fa8813d4","chunk-6108deba":"62e5499b","chunk-7b6bffdf":"d6fa96fe","chunk-d575fa34":"860702d4"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-3e619d5c":1,"chunk-50f3f492":1,"chunk-54b58955":1,"chunk-55d58294":1,"chunk-5718e7dc":1,"chunk-6108deba":1,"chunk-7b6bffdf":1,"chunk-d575fa34":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-3e619d5c":"fe29ed6e","chunk-50f3f492":"6a245863","chunk-54b58955":"fe29ed6e","chunk-55d58294":"fe29ed6e","chunk-5718e7dc":"1e9be0aa","chunk-6108deba":"fe29ed6e","chunk-7b6bffdf":"b30045fb","chunk-d575fa34":"d1551abc"}[e]+".css",o=u.p+a,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],l=c.getAttribute("data-href");if(l===a||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete r[e],f.parentNode.removeChild(f),n(s)},f.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(f)}).then(function(){r[e]=0}));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise(function(t,n){a=o[e]=[t,n]});t.push(a[2]=s);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e),c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");s.type=a,s.request=r,n[1](s)}o[e]=void 0}};var d=setTimeout(function(){c({type:"timeout",target:l})},12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var f=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},2919:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"f",function(){return o}),n.d(t,"b",function(){return s}),n.d(t,"d",function(){return i}),n.d(t,"c",function(){return u}),n.d(t,"e",function(){return c});var a=n("2b0e"),r="https://api.sacsis.tech/api",o="__sacsis_user";function s(e){e&&e.response&&e.response.data?a["default"].toasted.global.defaultError({msg:e.response.data}):"string"===typeof e?a["default"].toasted.global.defaultError({msg:e}):a["default"].toasted.global.defaultError()}function i(e){e&&e.response&&e.response.data?a["default"].toasted.global.defaultSuccess({msg:e.response.data}):"string"===typeof e?a["default"].toasted.global.defaultSuccess({msg:e}):a["default"].toasted.global.defaultSuccess()}function u(e){e&&e.response&&e.response.data?a["default"].toasted.global.defaultInformation({msg:e.response.data}):"string"===typeof e?a["default"].toasted.global.defaultInformation({msg:e}):a["default"].toasted.global.defaultInformation()}function c(e){e&&e.response&&e.response.data?a["default"].toasted.global.defaultWelcome({msg:e.response.data}):"string"===typeof e?a["default"].toasted.global.defaultWelcome({msg:e}):a["default"].toasted.global.defaultWelcome()}},"2dd6":function(e,t,n){"use strict";var a=n("f95f"),r=n.n(a);r.a},"3cef":function(e,t,n){"use strict";var a=n("a4cc"),r=n.n(a);r.a},"4b57":function(e,t,n){"use strict";var a=n("dbde"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"hide-menu":!e.isMenuVisible||!e.user},attrs:{id:"app"}},[n("Header",{attrs:{title:"XI SACSIS",hideToggle:!e.user,hideUserDropdown:!e.user}}),e.user?n("Menu"):e._e(),e.isValidating?n("Loading"):n("Content"),n("Footer")],1)},o=[],s=(n("96cf"),n("3b8d")),i=n("2919"),u=n("2f62"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("aside",{directives:[{name:"show",rawName:"v-show",value:e.isMenuVisible,expression:"isMenuVisible"}],staticClass:"menu"},[n("div",{staticClass:"menu-filter"},[n("v-icon",{staticClass:"mr-2",attrs:{name:"search",color:"#AAA"}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.treeFilter,expression:"treeFilter"}],staticClass:"search-input-menu",attrs:{type:"text",placeholder:"Digite para filtrar..."},domProps:{value:e.treeFilter},on:{input:function(t){t.target.composing||(e.treeFilter=t.target.value)}}})],1),e.user&&e.user.admin?n("Tree",{ref:"tree",attrs:{data:e.treeAdminData,options:e.treeOptions,filter:e.treeFilter},on:{"node:selected":e.onNodeSelected},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node;return n("span",{staticClass:"tree-text"},[a.data.icon?[n("v-icon",{attrs:{name:a.data.icon,color:a.data.color}}),e._v("\n        "+e._s(a.text)+"\n      ")]:[e._v(e._s(a.text))]],2)}}])}):e.user&&!e.user.admin?n("Tree",{ref:"tree",attrs:{data:e.treeParticipantData,options:e.treeOptions,filter:e.treeFilter},on:{"node:selected":e.onNodeSelected},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.node;return n("span",{staticClass:"tree-text"},[a.data.icon?[n("v-icon",{attrs:{name:a.data.icon,color:a.data.color}}),e._v("\n        "+e._s(a.text)+"\n      ")]:[e._v(e._s(a.text))]],2)}}])}):e._e()],1)},l=[],d=(n("7f7f"),n("25ea")),f={name:"Menu",components:{Tree:d["a"]},computed:Object(u["b"])(["isMenuVisible","user"]),data:function(){return{treeFilter:"",treeAdminData:this.getAdminMenu(),treeParticipantData:this.getParticipantMenu(),treeOptions:{propertynames:{text:"name"},filter:{emptyText:"Opção não encontrada!"}}}},methods:{getParticipantMenu:function(){return Promise.resolve([{text:"Início",data:{icon:"home",name:"home"}},{text:"Minha Conta",data:{icon:"user-circle",name:"AccountPages"}},{text:"Programação",data:{icon:"calendar-alt",name:"ScheduleView"}},{text:"Sair",data:{icon:"sign-out-alt"}}])},getAdminMenu:function(){return Promise.resolve([{text:"Início",data:{icon:"home",name:"home"}},{text:"Minha Conta",data:{icon:"user-circle",name:"AccountPages"}},{text:"Gerenciar",data:{icon:"tools"},children:[{text:"Administração",data:{icon:"cogs",name:"adminPages"}},{text:"Programação",data:{icon:"calendar-check",name:"SchedulePages"}},{text:"Relatórios",data:{icon:"scroll",name:"ReportsPage"}}]},{text:"Ver Programação",data:{icon:"calendar-alt",name:"ScheduleView"}},{text:"Sair",data:{icon:"sign-out-alt"}}])},logout:function(){var e=this;this.$swal({position:"center",title:"Já vai?",text:"Você realmente deseja sair?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Sim, sair!",cancelButtonText:"Cancelar"}).then(function(t){t.value&&(localStorage.removeItem(i["f"]),e.$store.commit("setUser",null),e.$router.push({name:"auth"}),e.$swal({position:"center",type:"success",title:"Até logo :)",text:"Você saiu!",showConfirmButton:!1,timer:1500}))})},onNodeSelected:function(e){"xs"!==this.$mq&&"sm"!==this.$mq||this.$store.commit("toggleMenu",!1),"Sair"===e.text?(this.logout(),e.unselect()):this.$router.push({name:e.data.name})}}},m=f,p=(n("4b57"),n("2877")),h=Object(p["a"])(m,c,l,!1,null,null,null),g=h.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("v-icon",{staticStyle:{color:"#373b44"},attrs:{name:"code"}}),n("span",[e._v("com")]),n("v-icon",{staticStyle:{color:"red"},attrs:{name:"heart"}}),n("span",[e._v("por")]),n("a",{attrs:{href:"https://github.com/iguit0",target:"_blank",rel:"noopener"}},[e._v("@iguit0")]),n("span",[e._v("&")]),n("a",{attrs:{href:"https://github.com/LuisMSoares",target:"_blank",rel:"noopener"}},[e._v("@LuisMSoares")])],1)},b=[],k={name:"Footer"},_=k,w=(n("9a36"),Object(p["a"])(_,v,b,!1,null,"0b365aa5",null)),x=w.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"header"},[e.hideToggle?e._e():n("a",{staticClass:"toggle",on:{click:e.toggleMenu}},[n("v-icon",{attrs:{scale:"1.5",name:e.icon}})],1),n("h1",{staticClass:"title my-1"},[e._v(e._s(e.title))]),e.hideUserDropdown?e._e():n("UserDropdown")],1)},y=[],C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-dropdown"},[n("div",{staticClass:"user-button"},[n("span",{staticClass:"d-none d-sm-block"},[e._v(e._s(e.user.dados.nome))]),n("div",{staticClass:"user-dropdown-img"},[n("avatar",{attrs:{fullname:e.user.dados.nome,size:37}})],1),n("v-icon",{attrs:{name:"angle-down"}})],1),n("div",{staticClass:"user-dropdown-content"},[n("router-link",{attrs:{to:"/minha-conta"}},[n("v-icon",{staticClass:"mr-1",attrs:{name:"user-circle"}}),e._v("Minha conta\n    ")],1),e.user.admin?n("router-link",{attrs:{to:"/admin"}},[n("v-icon",{staticClass:"mr-1",attrs:{name:"cogs"}}),e._v("Administração\n    ")],1):e._e(),n("a",{attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.logout(t)}}},[n("v-icon",{staticClass:"mr-1",attrs:{name:"sign-out-alt"}}),e._v("Sair\n    ")],1)],1)])},O=[],A=n("cebc"),M=n("d82d"),j={name:"UserDropdown",components:{Avatar:M["a"]},computed:Object(A["a"])({},Object(u["b"])(["user"])),methods:{logout:function(){var e=this;this.$swal({position:"center",title:"Já vai?",text:"Você realmente deseja sair?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Sim, sair!",cancelButtonText:"Cancelar"}).then(function(t){t.value&&(localStorage.removeItem(i["f"]),e.$store.commit("setUser",null),e.$router.push({name:"auth"}),e.$swal({position:"center",type:"success",title:"Até logo :)",text:"Você saiu!",showConfirmButton:!1,timer:1500}))})}}},P=j,$=(n("3cef"),Object(p["a"])(P,C,O,!1,null,"853c472a",null)),V=$.exports,T={name:"Header",components:{UserDropdown:V},props:{title:String,hideToggle:Boolean,hideUserDropdown:Boolean},computed:{icon:function(){return this.$store.state.isMenuVisible?"angle-right":"bars"}},methods:{toggleMenu:function(){this.$store.commit("toggleMenu")}}},E=T,B=(n("81a3"),Object(p["a"])(E,S,y,!1,null,"08319438",null)),D=B.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("router-view")],1)},I=[],q={name:"Content"},U=q,N=(n("9ebe"),Object(p["a"])(U,L,I,!1,null,"a6558170",null)),F=N.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loading"},[n("h4",{staticClass:"mt-2 text-center text-uppercase"},[e._v("CARREGANDO...")]),n("b-spinner",{attrs:{type:"grow",variant:"dark"}})],1)},J=[],H=(n("2dd6"),{}),W=Object(p["a"])(H,R,J,!1,null,null,null),z=W.exports,G=n("bc3a"),K=n.n(G),X={name:"App",components:{Menu:g,Footer:x,Header:D,Content:F,Loading:z},computed:Object(u["b"])(["isMenuVisible","user"]),data:function(){return{isValidating:!0}},methods:{validateToken:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,n,a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.isValidating=!0,t=localStorage.getItem(i["f"]),n=JSON.parse(t),n){e.next=6;break}return this.isValidating=!1,e.abrupt("return",this.$router.push({name:"auth"}));case 6:return a=K.a.create({baseURL:i["a"],headers:{Authorization:"Bearer ".concat(n.jwt_token)},validateStatus:function(e){return e<1e3}}),e.next=9,a.put("/login",n);case 9:r=e.sent,200===r.status?this.$store.commit("setUser",n):(localStorage.removeItem(i["f"]),sessionStorage.getItem("vuex")?(sessionStorage.removeItem("vuex"),document.location.reload(!0)):(Object(i["b"])("Sessão expirada!"),this.$router.push({name:"auth"}))),this.isValidating=!1;case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},created:function(){this.validateToken()}},Q=X,Y=(n("034f"),Object(p["a"])(Q,r,o,!1,null,null,null)),Z=Y.exports,ee=n("c0d6"),te=n("8c4f");a["default"].use(te["a"]);var ne=[{path:"/",name:"home",component:function(){return n.e("chunk-d575fa34").then(n.bind(null,"b9fd"))},meta:{requiresLogin:!0}},{path:"/admin",name:"adminPages",component:function(){return n.e("chunk-55d58294").then(n.bind(null,"8e8a"))},meta:{requiresLogin:!0,requiresAdmin:!0}},{path:"/admin-programacao",name:"SchedulePages",component:function(){return n.e("chunk-3e619d5c").then(n.bind(null,"0812"))},meta:{requiresLogin:!0,requiresAdmin:!0}},{path:"/programacao",name:"ScheduleView",component:function(){return n.e("chunk-7b6bffdf").then(n.bind(null,"5ca4"))},meta:{requiresLogin:!0}},{path:"/relatorios",name:"ReportsPage",component:function(){return n.e("chunk-6108deba").then(n.bind(null,"f28c1"))},meta:{requiresLogin:!0,requiresAdmin:!0}},{path:"/minha-conta",name:"AccountPages",component:function(){return n.e("chunk-54b58955").then(n.bind(null,"6e3b"))},meta:{requiresLogin:!0}},{path:"/entrar",name:"auth",component:function(){return n.e("chunk-5718e7dc").then(n.bind(null,"b343"))}},{path:"*",name:"NotFound",component:function(){return n.e("chunk-50f3f492").then(n.bind(null,"ed37"))}}],ae=new te["a"]({mode:"history",routes:ne});ae.beforeEach(function(e,t,n){var a=JSON.parse(localStorage.getItem(i["f"]));e.matched.some(function(e){return e.meta.requiresLogin})?a&&a.jwt_token?n():n({path:"/entrar"}):n(),e.matched.some(function(e){return e.meta.requiresAdmin})?a&&a.jwt_token&&a.admin?n():n({path:"/entrar"}):n()});var re=ae,oe=n("0284"),se=n.n(oe),ie=(n("ab8b"),n("177c"),n("9f7b")),ue=n.n(ie);a["default"].use(ue.a);n("d06d");var ce=n("0874");a["default"].component("v-icon",ce["a"]);var le=n("a65d"),de=n.n(le);a["default"].use(de.a,{iconPack:"fontawesome",duration:3e3}),a["default"].toasted.register("defaultSuccess",function(e){return e.msg?e.msg:"Operação concluída com sucesso!"},{type:"success",icon:"check"}),a["default"].toasted.register("defaultError",function(e){return e.msg?e.msg:"Ops... Aconteceu um erro!"},{type:"error",position:"bottom-right",icon:"times"}),a["default"].toasted.register("defaultWelcome",function(e){return e.msg?e.msg:"Bem vindo(a)!"},{icon:"smile"}),a["default"].toasted.register("defaultInformation",function(e){return e.msg?e.msg:"Ops... Aconteceu um erro!"},{type:"info",icon:"info-circle"});var fe=n("3a60"),me=n.n(fe);a["default"].use(me.a);var pe=n("2ee4"),he=n.n(pe);n("da93");a["default"].use(he.a);var ge=n("660e");a["default"].use(ge["a"],{breakpoints:{xs:576,sm:768,md:960,lg:1140,xl:1/0}});var ve=n("619c");a["default"].use(ve["a"]);var be=n("4a7a"),ke=n.n(be);a["default"].component("v-select",ke.a);var _e=n("af88");a["default"].use(_e["a"]);var we=n("716b"),xe=n.n(we);a["default"].use(xe.a,{precision:2}),a["default"].use(se.a,{id:"UA-140729382-2",router:re,checkDuplicatedScript:!0}),a["default"].config.productionTip=!1,new a["default"]({store:ee["a"],router:re,render:function(e){return e(Z)}}).$mount("#app")},"64a9":function(e,t,n){},"81a3":function(e,t,n){"use strict";var a=n("a11a"),r=n.n(a);r.a},"94a8":function(e,t,n){},"9a36":function(e,t,n){"use strict";var a=n("94a8"),r=n.n(a);r.a},"9ebe":function(e,t,n){"use strict";var a=n("a902"),r=n.n(a);r.a},a11a:function(e,t,n){},a4cc:function(e,t,n){},a902:function(e,t,n){},c0d6:function(e,t,n){"use strict";var a=n("2b0e"),r=n("2f62"),o=n("0e44");a["default"].use(r["a"]),t["a"]=new r["a"].Store({plugins:[Object(o["a"])({storage:window.sessionStorage})],state:{isMenuVisible:!1,user:null},mutations:{toggleMenu:function(e,t){e.user?e.isMenuVisible=void 0===t?!e.isMenuVisible:t:e.isMenuVisible=!1},setUser:function(e,t){e.user=t,e.isMenuVisible=!!t}},getters:{permissionLevel:function(e){return e.user.admin?1:0},getStatusPayment:function(e){return!!e.user.dados.status_pago},getUserData:function(e){return e.user.dados},getUsername:function(e){return e.user.dados.nome},getToken:function(e){return e.user.jwt_token?e.user.jwt_token:null}}})},dbde:function(e,t,n){},f95f:function(e,t,n){}});
//# sourceMappingURL=app.c459bf71.js.map