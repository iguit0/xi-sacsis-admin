(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0df1d961"],{7424:function(t,e,a){"use strict";var s=a("bc3a"),n=a.n(s),i=a("c0d6"),o=a("2919"),r=n.a.create({baseURL:o["a"],validateStatus:function(t){return t<1e3}});r.interceptors.request.use(function(t){try{var e=i["a"].getters.getToken;e?t.headers.Authorization="Bearer ".concat(e):delete t.headers.Authorization}catch(a){return t}return t}),e["a"]=r},a405:function(t,e,a){"use strict";var s=a("aada"),n=a.n(s);n.a},aada:function(t,e,a){},c97e:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-title"},[a("h1",[t.icon?a("v-icon",{attrs:{name:t.icon,scale:"2.5"}}):t._e(),t._v("\n    "+t._s(t.main)+"\n  ")],1),t.firstOption&&t.secondOption?a("h2",{staticClass:"float-right"},[t._v("Você selecionou "+t._s(t.firstOption)+" e "+t._s(t.secondOption))]):t._e(),a("h2",[t._v(t._s(t.sub))]),a("hr")])},n=[],i={name:"PageTitle",props:["icon","main","sub","firstOption","secondOption"]},o=i,r=(a("a405"),a("2877")),c=Object(r["a"])(o,s,n,!1,null,null,null);e["a"]=c.exports},eec9:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.isLoading?a("div",{staticClass:"py-2 mt-2 text-center"},[a("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{label:"Large Spinner"}}),a("h2",{staticClass:"text-center text-uppercase mt-1"},[t._v("CARREGANDO...")])],1):t._e(),a("div",[a("PageTitle",{attrs:{icon:"chalkboard-teacher",main:"Minicursos",sub:t.courses.length+" opções disponíveis",firstOption:t.option1,secondOption:t.option2}}),a("b-container",{attrs:{fluid:""}},[a("b-row",[a("b-col",[a("h2",{staticClass:"text-center text-uppercase"},[t._v("Opção 1")]),t._l(t.courses,function(e){return a("b-card",{key:e.id,staticClass:"mt-3 mb-3",attrs:{"header-bg-variant":"primary","header-text-variant":"white",header:""+e.titulo,align:"center","footer-tag":"footer"}},[a("b-card-text",[t._v(t._s(e.descricao))]),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"chalkboard-teacher"}}),t._v("\n              Ministrante: "+t._s(e.ministrante)+"\n            ")],1),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"users"}}),t._v("\n              Turma: "+t._s(e.turma)+"\n            ")],1),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"chair"}}),t._v("\n              Vagas restantes: "+t._s(e.vagas_disponiveis)+"\n            ")],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("b-form-radio",{staticClass:"float-right",attrs:{value:e.id,name:"option1"},on:{change:function(a){t.check1=e.id}},model:{value:t.option1,callback:function(e){t.option1=e},expression:"option1"}},[t._v(t._s(t.check1===e.id?"Selecionado":"Selecionar"))])],1)],1)})],2),a("b-col",[a("h2",{staticClass:"text-center text-uppercase"},[t._v("Opção 2")]),t._l(t.courses,function(e){return a("b-card",{key:e.id,staticClass:"mt-3 mb-3",attrs:{"header-bg-variant":"primary","header-text-variant":"white",header:""+e.titulo,align:"center","footer-tag":"footer"}},[a("b-card-text",[t._v(t._s(e.descricao))]),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"chalkboard-teacher"}}),t._v("\n              Ministrante: "+t._s(e.ministrante)+"\n            ")],1),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"users"}}),t._v("\n              Turma: "+t._s(e.turma)+"\n            ")],1),a("b-card-text",[a("v-icon",{staticClass:"mr-1",attrs:{name:"chair"}}),t._v("\n              Vagas restantes: "+t._s(e.vagas_disponiveis)+"\n            ")],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("b-form-radio",{staticClass:"float-right",attrs:{name:"option-2",value:e.id},on:{change:function(a){t.check2=e.id}},model:{value:t.option2,callback:function(e){t.option2=e},expression:"option2"}},[t._v(t._s(t.check2===e.id?"Selecionado":"Selecionar"))])],1)],1)})],2)],1),t.payment?a("b-btn",{attrs:{disabled:!t.option1||!t.option2,variant:"success",block:"",size:"lg"},on:{click:t.confirm}},[a("v-icon",{staticClass:"mr-1",attrs:{name:"save",scale:"1.5"}}),a("span",{staticClass:"text-uppercase"},[t._v("salvar")])],1):a("div",[a("h2",{staticClass:"mt-2 text-center text-uppercase"},[t._v("Seu pagamento ainda não foi verificado!")])])],1)],1)])},n=[],i=a("c97e"),o=a("2919"),r=a("7424"),c={name:"CoursesList",components:{PageTitle:i["a"]},data:function(){return{check1:"",check2:"",option1:"",option2:null,courses:[],isLoading:!1}},computed:{payment:function(){return this.$store.getters.getStatusPayment}},methods:{confirm:function(){var t=this;if(!this.option1||!this.option2)return Object(o["b"])("Selecione duas opções");if(this.option1===this.option2)return Object(o["b"])("Não é possível cadastrar em minicursos iguais");var e={option1:this.option1,option2:this.option2};r["a"].post("/schedule/course",e).then(function(e){200===e.status||201===e.status?(Object(o["d"])(e.data.option1),t.getCourses()):(Object(o["b"])(e.data.message),t.getCourses())})},getCourses:function(){var t=this;this.isLoading=!0,r["a"].get("/schedule/course").then(function(e){200===e.status?t.courses=e.data.minicursos:Object(o["b"])(e.data.message)}),setTimeout(function(){t.isLoading=!1},1e3)}},mounted:function(){this.getCourses()}},u=c,l=a("2877"),d=Object(l["a"])(u,s,n,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-0df1d961.65271db3.js.map