(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb942b02"],{"48da":function(t,e,a){},"496f":function(t,e,a){},7424:function(t,e,a){"use strict";var s=a("bc3a"),n=a.n(s),r=a("c0d6"),i=a("2919"),o=n.a.create({baseURL:i["a"],validateStatus:function(t){return t<1e3}});o.interceptors.request.use(function(t){try{var e=r["a"].getters.getToken;e?t.headers.Authorization="Bearer ".concat(e):delete t.headers.Authorization}catch(a){return t}return t}),e["a"]=o},"94a4":function(t,e,a){"use strict";var s=a("48da"),n=a.n(s);n.a},a405:function(t,e,a){"use strict";var s=a("aada"),n=a.n(s);n.a},a6d0:function(t,e,a){"use strict";var s=a("496f"),n=a.n(s);n.a},aada:function(t,e,a){},b9fd:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[t.isLoading?a("div",{staticClass:"py-2 mt-2 text-center"},[a("b-spinner",{staticStyle:{width:"3rem",height:"3rem"},attrs:{label:"Large Spinner"}}),a("h2",{staticClass:"text-center text-uppercase mt-1"},[t._v("CARREGANDO...")])],1):a("div",[a("PageTitle",{attrs:{icon:"home",main:"Dashboard",sub:t.username}}),t.isAdmin?a("div",{staticClass:"stats"},[t.participants?a("Stat",{attrs:{title:"Participantes",value:t.participants,icon:"users",color:"#d54d50"}}):t._e(),t.courses?a("Stat",{attrs:{title:"Minicursos",value:t.courses,icon:"chalkboard-teacher",color:"#FF8C00"}}):t._e(),t.lectures?a("Stat",{attrs:{title:"Palestras",value:t.lectures,icon:"microphone",color:"#49a7c1"}}):t._e(),t.payments?a("Stat",{attrs:{title:"Pagamentos",value:t.payments,icon:"money-bill-alt",color:"#3CB371"}}):t._e()],1):t.isAdmin||t.isPaid?!t.isAdmin&&t.isPaid?a("div",[t._m(5),t._m(6),a("p",{staticClass:"h2 text-center text-uppercase mt-3"},[t._v("\n        Fique ligado, as inscrições do minicurso vão começar em breve!\n        "),a("v-icon",{attrs:{name:"smile-wink",scale:"2",color:"blue"}})],1),t._m(7)]):t._e():a("div",[a("h2",{staticClass:"text-center text-uppercase mt-1 mb-3"},[t._v("Parabéns, "+t._s(t.name)+"!")]),a("p",{staticClass:"lead text-center"},[t._v("Seu cadastro em nosso site foi efetuado com sucesso! Agora, para finalizarmos sua inscrição, basta efetuar o pagamento.")]),t._m(0),t._m(1),t._m(2),t._m(3),t._m(4)])],1)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"lead text-center"},[t._v("\n        Contamos com\n        "),a("strong",{staticClass:"text-info"},[t._v("três opções:")]),t._v("\n        pagamento à vista\n        "),a("strong",{staticClass:"text-success"},[t._v("(em dinheiro)")]),t._v(", pagamento via cartão\n        "),a("strong",{staticClass:"text-warning"},[t._v("(crédito ou débito)")]),t._v(" e por\n        "),a("strong",{staticClass:"text-primary"},[t._v("boleto bancário.")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"lead text-center"},[t._v("\n        Caso a opção escolhida seja\n        "),a("strong",{staticClass:"text-success"},[t._v("em dinheiro")]),t._v(", basta procurar nosso estande, localizado no Hall do PVA, de segunda a sexta-feira, durante o período da tarde e noite.\n      ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"lead text-center"},[t._v("\n        Caso deseje pagar via cartão ou boleto, você mesmo pode acessar o evento no site da Ingresso Live,\n        "),a("a",{attrs:{href:"https://www.ingressolive.com/xi-sacsis",target:"_blank",rel:"noopener"}},[t._v("clicando aqui!")]),t._v(" e realizar a transação por lá, sem a necessidade de comparecer à faculdade para tal.\n      ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h3",{staticClass:"text-center"},[t._v("\n        Assim que o pagamento for aprovado pela financeira, sua inscrição já é\n        "),a("strong",[t._v("automaticamente confirmada.")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"h4 mt-3 text-muted float-right"},[t._v("\n        A equipe da\n        "),a("strong",[t._v("XI SACSIS")]),t._v(" agradece e aguarda-o ansiosa em nosso evento!\n      ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"text-center text-uppercase mt-1"},[t._v("\n        a espera\n        "),a("strong",{staticClass:"text-success"},[t._v("acabou")]),t._v("!\n      ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"h2 text-center text-uppercase mt-3"},[t._v("\n        Liberamos a\n        "),a("strong",{staticClass:"text-primary"},[t._v("programação")]),t._v(".\n      ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"h4 mt-3 text-muted float-right"},[t._v("\n        A equipe da\n        "),a("strong",[t._v("XI SACSIS")]),t._v(" agradece e aguarda-o ansiosa em nosso evento!\n      ")])}],r=a("c97e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stat"},[a("div",{staticClass:"stat-icon"},[a("v-icon",{attrs:{name:t.icon,scale:"4",color:t.style}})],1),a("div",{staticClass:"stat-info"},[a("span",{staticClass:"stat-title text-uppercase"},[t._v(t._s(t.title))]),a("span",{staticClass:"stat-value"},[t._v(t._s(t.value))])])])},o=[],c={name:"Stat",props:["title","value","icon","color"],computed:{style:function(){return this.color||"#000"}}},l=c,u=(a("a6d0"),a("2877")),m=Object(u["a"])(l,i,o,!1,null,null,null),d=m.exports,v=a("7424"),p={name:"Home",data:function(){return{isAdmin:this.$store.getters.permissionLevel,participants:0,courses:0,lectures:0,payments:0,isLoading:!1}},components:{PageTitle:r["a"],Stat:d},computed:{username:function(){return this.$store.getters.getUsername?"Bem-vindo(a), ".concat(this.$store.getters.getUsername):"Bem-vindo(a)!"},name:function(){return this.$store.getters.getUsername},isPaid:function(){return this.$store.getters.getStatusPayment}},methods:{getEventData:function(){var t=this;this.isLoading=!0,v["a"].get("/admin/user").then(function(e){200===e.status&&(t.participants=e.data.usuarios.length)}),v["a"].get("/admin/course").then(function(e){200===e.status&&(t.courses=e.data.minicursos.length)}),v["a"].get("/admin/lecture?loadtitle=0").then(function(e){200===e.status&&(t.lectures=e.data.palestras.length)}),v["a"].get("/admin/payment?report=0&csvformat=0").then(function(e){200===e.status&&(t.payments=e.data.pagamentos.length)}),setTimeout(function(){t.isLoading=!1},1e3)}},mounted:function(){this.isAdmin&&this.getEventData()}},_=p,f=(a("94a4"),Object(u["a"])(_,s,n,!1,null,"71a13d99",null));e["default"]=f.exports},c97e:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-title"},[a("h1",[t.icon?a("v-icon",{attrs:{name:t.icon,scale:"2.5"}}):t._e(),t._v("\n    "+t._s(t.main)+"\n  ")],1),a("h2",[t._v(t._s(t.sub))]),a("hr")])},n=[],r={name:"PageTitle",props:["icon","main","sub"]},i=r,o=(a("a405"),a("2877")),c=Object(o["a"])(i,s,n,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-bb942b02.a81b4504.js.map