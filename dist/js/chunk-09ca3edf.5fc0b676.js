(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09ca3edf"],{"3f6f":function(t,e,a){},"496f":function(t,e,a){},7090:function(t,e,a){"use strict";var s=a("3f6f"),n=a.n(s);n.a},7424:function(t,e,a){"use strict";var s=a("bc3a"),n=a.n(s),i=a("c0d6"),c=a("2919"),r=n.a.create({baseURL:c["a"],validateStatus:function(t){return t<1e3}});r.interceptors.request.use(function(t){try{var e=i["a"].getters.getToken;e?t.headers.Authorization="Bearer ".concat(e):delete t.headers.Authorization}catch(a){return t}return t}),e["a"]=r},a405:function(t,e,a){"use strict";var s=a("aada"),n=a.n(s);n.a},a6d0:function(t,e,a){"use strict";var s=a("496f"),n=a.n(s);n.a},aada:function(t,e,a){},b9fd:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[t.isLoading?a("div",{staticClass:"py-2 mt-2 text-center"},[a("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{label:"Large Spinner"}}),a("h2",{staticClass:"text-center text-uppercase mt-1"},[t._v("CARREGANDO...")])],1):a("div",[a("PageTitle",{attrs:{icon:"home",main:"Dashboard",sub:t.username}}),t.isAdmin?a("div",{staticClass:"stats"},[t.participants?a("Stat",{attrs:{title:"Participantes",value:t.participants,icon:"users",color:"#d54d50"}}):t._e(),t.courses?a("Stat",{attrs:{title:"Minicursos",value:t.courses,icon:"chalkboard-teacher",color:"#FF8C00"}}):t._e(),t.lectures?a("Stat",{attrs:{title:"Palestras",value:t.lectures,icon:"microphone",color:"#3CB371"}}):t._e()],1):a("div",[a("h2",{staticClass:"text-center text-uppercase mt-1"},[t._v("MAIS INFORMAÇÕES EM BREVE...")])])],1)])},n=[],i=a("c97e"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stat"},[a("div",{staticClass:"stat-icon"},[a("v-icon",{attrs:{name:t.icon,scale:"4",color:t.style}})],1),a("div",{staticClass:"stat-info"},[a("span",{staticClass:"stat-title"},[t._v(t._s(t.title))]),a("span",{staticClass:"stat-value"},[t._v(t._s(t.value))])])])},r=[],o={name:"Stat",props:["title","value","icon","color"],computed:{style:function(){return this.color||"#000"}}},u=o,l=(a("a6d0"),a("2877")),d=Object(l["a"])(u,c,r,!1,null,null,null),p=d.exports,m=a("7424"),h=a("2919"),v={name:"Home",data:function(){return{isAdmin:this.$store.getters.permissionLevel,participants:0,courses:0,lectures:0,isLoading:!1}},components:{PageTitle:i["a"],Stat:p},computed:{username:function(){return this.$store.getters.getUsername?"Bem-vindo(a), ".concat(this.$store.getters.getUsername):"Bem-vindo(a)!"}},methods:{getEventData:function(){var t=this;this.isLoading=!0,m["a"].get("/admin/user").then(function(e){200===e.status?t.participants=e.data.usuarios.length:Object(h["b"])(e.data.message)}),m["a"].get("/admin/course").then(function(e){200===e.status?t.courses=e.data.minicursos.length:Object(h["b"])(e.data.message)}),m["a"].get("/admin/lecture?loadtitle=0").then(function(e){200===e.status?t.lectures=e.data.palestras.length:Object(h["b"])(e.data.message)}),setTimeout(function(){t.isLoading=!1},1e3)}},mounted:function(){this.isAdmin&&this.getEventData()}},f=v,g=(a("7090"),Object(l["a"])(f,s,n,!1,null,"e9a0984a",null));e["default"]=g.exports},c97e:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-title"},[a("h1",[t.icon?a("v-icon",{attrs:{name:t.icon,scale:"2.5"}}):t._e(),t._v("\n    "+t._s(t.main)+"\n  ")],1),t.firstOption&&t.secondOption?a("h2",{staticClass:"float-right"},[t._v("Você selecionou "+t._s(t.firstOption)+" e "+t._s(t.secondOption))]):t._e(),a("h2",[t._v(t._s(t.sub))]),a("hr")])},n=[],i={name:"PageTitle",props:["icon","main","sub","firstOption","secondOption"]},c=i,r=(a("a405"),a("2877")),o=Object(r["a"])(c,s,n,!1,null,null,null);e["a"]=o.exports}}]);
//# sourceMappingURL=chunk-09ca3edf.5fc0b676.js.map