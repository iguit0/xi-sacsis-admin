(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72409e02"],{6296:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"guests-pages"},[a("PageTitle",{attrs:{icon:"person-booth",main:"Ministrantes",sub:"Gerar links de cadastro, etc"}}),a("b-form",[a("b-row",[a("b-col",{attrs:{md:"4"}},[a("b-form-group",{attrs:{label:"Expiração:","label-for":"link-time"}},[a("b-form-select",{attrs:{required:"",id:"link-time",options:e.expirationTime},model:{value:e.selectedTime,callback:function(t){e.selectedTime=t},expression:"selectedTime"}})],1)],1),a("b-col",{attrs:{md:"4"}},[a("b-form-group",{attrs:{label:"Atividade:","label-for":"link-type"}},[a("b-form-select",{attrs:{options:e.types,required:"",id:"link-type"},model:{value:e.selectedType,callback:function(t){e.selectedType=t},expression:"selectedType"}})],1)],1),a("b-col",{attrs:{md:"4"}},[a("b-form-group",{attrs:{label:"Link:","label-for":"link-btn"}},[a("b-btn",{attrs:{disabled:!e.selectedTime||!e.selectedType,id:"link-btn",variant:"primary"},on:{click:e.generate}},[a("v-icon",{staticClass:"mr-1",attrs:{name:"link"}}),e._v("Gerar\n            ")],1)],1)],1)],1),a("b-row",[a("b-col",{attrs:{md:"10"}},[e.selectedTime?a("h2",{staticClass:"text-center"},[e._v("O convidado tem "+e._s(e.selectedTime)+" dia(s) para preencher o formulário")]):e._e(),a("b-input-group",{staticClass:"mt-3"},[a("b-input",{attrs:{type:"text",disabled:!e.copyData,placeholder:"Gere um link válido"},model:{value:e.copyData,callback:function(t){e.copyData=t},expression:"copyData"}}),a("b-input-group-append",[a("b-btn",{directives:[{name:"clipboard",rawName:"v-clipboard",value:e.copyData,expression:"copyData"}]},[a("v-icon",{attrs:{name:"copy",scale:"1.2"}})],1)],1)],1)],1)],1)],1)],1)])},n=[],i=a("c97e"),c=a("7424"),l=a("2919"),r={name:"GuestsPages",components:{PageTitle:i["a"]},data:function(){return{selectedType:null,selectedTime:null,copyData:null,expirationTime:[{value:null,text:"Selecione uma opção"},{value:"1",text:"1 dia"},{value:"2",text:"2 dias"},{value:"3",text:"3 dias"},{value:"4",text:"4 dias"},{value:"5",text:"5 dias"},{value:"6",text:"6 dias"},{value:"7",text:"7 dias"}],types:[{value:null,text:"Selecione uma opção"},{value:"course",text:"Minicurso"},{value:"lecture",text:"Palestra"}]}},methods:{generate:function(){var e=this;c["a"].get("/speaker?type=".concat(this.selectedType,"&expiration=").concat(this.selectedTime)).then(function(t){if(201===t.status){var a=t.data.token,s=window.location.hostname;"course"===e.selectedType?e.copyData="".concat(s,"/cadastro-minicurso/").concat(a):"lecture"===e.selectedType&&(e.copyData="".concat(s,"/cadastro-palestra/").concat(a)),Object(l["d"])(t.data.message),e.reset()}else Object(l["b"])(t.data.message),e.reset()})},reset:function(){this.selectedType=null,this.selectedTime=null}}},o=r,u=a("2877"),d=Object(u["a"])(o,s,n,!1,null,null,null);t["default"]=d.exports},7424:function(e,t,a){"use strict";var s=a("bc3a"),n=a.n(s),i=a("c0d6"),c=n.a.create({baseURL:"https://sacsis-api.herokuapp.com/api",validateStatus:function(e){return e<1e3}});c.interceptors.request.use(function(e){try{var t=i["a"].getters.getToken;t?e.headers.Authorization="Bearer ".concat(t):delete e.headers.Authorization}catch(a){return e}return e}),t["a"]=c},a405:function(e,t,a){"use strict";var s=a("aada"),n=a.n(s);n.a},aada:function(e,t,a){},c97e:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-title"},[a("h1",[e.icon?a("v-icon",{attrs:{name:e.icon,scale:"2.5"}}):e._e(),e._v("\n    "+e._s(e.main)+"\n  ")],1),a("h2",[e._v(e._s(e.sub))]),a("hr")])},n=[],i={name:"PageTitle",props:["icon","main","sub"]},c=i,l=(a("a405"),a("2877")),r=Object(l["a"])(c,s,n,!1,null,null,null);t["a"]=r.exports}}]);
//# sourceMappingURL=chunk-72409e02.32d60d09.js.map