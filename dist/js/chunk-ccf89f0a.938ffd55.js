(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccf89f0a"],{e6ea:function(e,t,r){"use strict";var a=r("f017"),o=r.n(a);o.a},e963:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-container",[r("b-row",[r("b-col",[r("form-wizard",{attrs:{"error-color":"#a94442",shape:"square",color:"#49a7c1",subtitle:"Preencha seus dados corretamente e participe da XI SACSIS",stepSize:"lg",finishButtonText:"ENVIAR",nextButtonText:"PRÓXIMO",backButtonText:"VOLTAR"},on:{"on-complete":e.save,"on-error":e.handleErrorMessage}},[r("h2",{staticClass:"text-uppercase",attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),r("tab-content",{attrs:{title:"Sobre você",icon:"fa fa-user","before-change":e.checkForm1}},[r("b-form",[r("b-form-group",{attrs:{id:"input-group-1",label:"Nome Completo:","label-for":"input-1"}},[r("b-form-input",{attrs:{id:"input-1",type:"email",required:"",placeholder:"Conte-nos o seu nome"},model:{value:e.teacher.nome,callback:function(t){e.$set(e.teacher,"nome",t)},expression:"teacher.nome"}})],1),r("b-form-group",{attrs:{id:"input-group-2",label:"Resumo:","label-for":"input-2"}},[r("b-form-textarea",{attrs:{id:"input-2",placeholder:"Fale um pouco sobre você...",required:"","no-resize":"","no-auto-shrink":"",rows:"3","max-rows":"6"},model:{value:e.teacher.resumo,callback:function(t){e.$set(e.teacher,"resumo",t)},expression:"teacher.resumo"}})],1),r("b-form-group",{attrs:{id:"input-group-1",label:"Email:","label-for":"input-1"}},[r("b-form-input",{attrs:{id:"input-1",type:"email",required:"",placeholder:"Insira seu endereço de email."},model:{value:e.teacher.email,callback:function(t){e.$set(e.teacher,"email",t)},expression:"teacher.email"}})],1),r("b-form-group",{attrs:{id:"input-group-3",label:"Telefone:","label-for":"input-3"}},[r("the-mask",{staticClass:"form-control",attrs:{placeholder:"Insira seu numero de telefone.",required:"",mask:["(##) ####-####","(##) #####-####"]},model:{value:e.teacher.telefone,callback:function(t){e.$set(e.teacher,"telefone",t)},expression:"teacher.telefone"}})],1),r("b-form-group",{attrs:{id:"input-group-2",label:"RG:","label-for":"input-2",description:"Apenas números"}},[r("the-mask",{staticClass:"form-control",attrs:{placeholder:"RG",required:"",mask:["####################"]},model:{value:e.teacher.rg,callback:function(t){e.$set(e.teacher,"rg",t)},expression:"teacher.rg"}})],1),r("b-form-group",{attrs:{id:"input-group-3",label:"CPF:","label-for":"input-3"}},[r("the-mask",{staticClass:"form-control",attrs:{placeholder:"CPF",required:"",mask:["###.###.###-##"]},model:{value:e.teacher.cpf,callback:function(t){e.$set(e.teacher,"cpf",t)},expression:"teacher.cpf"}})],1),r("b-form-group",{attrs:{label:"Imagem de avatar:"}},[r("my-upload",{attrs:{field:"img",params:e.params,headers:e.headers,width:300,height:300,langType:"pt-br","img-format":"png"},on:{"crop-success":e.cropSuccess},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}}),r("b-img",{directives:[{name:"show",rawName:"v-show",value:e.teacher.avatar,expression:"teacher.avatar"}],style:[e.teacher.avatar?{"margin-bottom":"20px"}:{}],attrs:{center:"",src:e.teacher.avatar,rounded:"circle"}}),r("b-button",{attrs:{block:"",variant:"outline-primary"},on:{click:e.toggleShow}},[e._v("Selecionar imagem de avatar\n              ")])],1),r("b-form-group",{attrs:{id:"input-group-4",label:"Facebook:","label-for":"input-4"}},[r("b-input-group",[r("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[r("i",{staticClass:"fab fa-facebook",staticStyle:{"font-size":"1rem"}})]),r("b-input",{attrs:{id:"input-4",placeholder:"Link do seu perfil (Opcional)"},model:{value:e.teacher.facebook,callback:function(t){e.$set(e.teacher,"facebook",t)},expression:"teacher.facebook"}})],1)],1),r("b-form-group",{attrs:{id:"input-group-5",label:"Instagram:","label-for":"input-5"}},[r("b-input-group",[r("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[r("i",{staticClass:"fab fa-instagram",staticStyle:{"font-size":"1rem"}})]),r("b-input",{attrs:{id:"input-5",placeholder:"Link do seu perfil (Opcional)"},model:{value:e.teacher.instagram,callback:function(t){e.$set(e.teacher,"instagram",t)},expression:"teacher.instagram"}})],1)],1),r("b-form-group",{attrs:{id:"input-group-6",label:"Twitter:","label-for":"input-6"}},[r("b-input-group",[r("b-input-group-text",{attrs:{slot:"prepend"},slot:"prepend"},[r("i",{staticClass:"fab fa-twitter",staticStyle:{"font-size":"1rem"}})]),r("b-input",{attrs:{id:"input-6",placeholder:"Link do seu perfil (Opcional)"},model:{value:e.teacher.twitter,callback:function(t){e.$set(e.teacher,"twitter",t)},expression:"teacher.twitter"}})],1)],1),r("b-form-group",{attrs:{id:"input-group-7",label:"Site:","label-for":"input-7"}},[r("b-input-group",{staticClass:"mt-3",attrs:{prepend:"www."}},[r("b-input",{attrs:{id:"input-7",placeholder:"seusite.com.br (Opcional)"},model:{value:e.teacher.site,callback:function(t){e.$set(e.teacher,"site",t)},expression:"teacher.site"}})],1)],1)],1)],1),r("tab-content",{attrs:{title:"Sobre a Minicurso",icon:"fa fa-chalkboard-teacher","before-change":e.checkForm2}},[r("b-form",[r("b-form-group",{attrs:{id:"input-group-9",label:"Título:","label-for":"input-9"}},[r("b-input",{attrs:{placeholder:"Título do minicurso",id:"input-9",required:""},model:{value:e.teacher.titulo,callback:function(t){e.$set(e.teacher,"titulo",t)},expression:"teacher.titulo"}})],1),r("b-form-group",{attrs:{id:"input-group-10",label:"Conteúdo:","label-for":"input-10"}},[r("b-form-textarea",{attrs:{id:"input-10",placeholder:"O minicurso irá abordar...","no-resize":"",required:"","no-auto-shrink":"",rows:"9"},model:{value:e.teacher.conteudo,callback:function(t){e.$set(e.teacher,"conteudo",t)},expression:"teacher.conteudo"}})],1)],1)],1),r("tab-content",{attrs:{title:"Confirmar Dados",icon:"fas fa-clipboard-check"}},[r("b-form",[r("b-form-group",[r("b-img",{directives:[{name:"show",rawName:"v-show",value:e.teacher.avatar,expression:"teacher.avatar"}],attrs:{center:"",src:e.teacher.avatar,rounded:"circle"}})],1),r("b-form-group",{attrs:{id:"input-group-1",label:"Nome Completo:","label-for":"input-1"}},[r("b-form-input",{attrs:{id:"input-1",type:"email",readonly:""},model:{value:e.teacher.nome,callback:function(t){e.$set(e.teacher,"nome",t)},expression:"teacher.nome"}})],1),r("b-form-group",{attrs:{id:"input-group-2",label:"Resumo:","label-for":"input-2"}},[r("b-form-textarea",{attrs:{id:"input-2",readonly:"","no-resize":"","no-auto-shrink":"",rows:"3","max-rows":"6"},model:{value:e.teacher.resumo,callback:function(t){e.$set(e.teacher,"resumo",t)},expression:"teacher.resumo"}})],1),r("b-form-group",{attrs:{id:"input-group-1",label:"Email:","label-for":"input-1"}},[r("b-form-input",{attrs:{id:"input-1",type:"email",readonly:""},model:{value:e.teacher.email,callback:function(t){e.$set(e.teacher,"email",t)},expression:"teacher.email"}})],1),r("b-form-group",{attrs:{id:"input-group-3",label:"Telefone:","label-for":"input-3"}},[r("the-mask",{staticClass:"form-control",attrs:{readonly:"",mask:["(##) ####-####","(##) #####-####"]},model:{value:e.teacher.telefone,callback:function(t){e.$set(e.teacher,"telefone",t)},expression:"teacher.telefone"}})],1),r("b-form-group",{attrs:{id:"input-group-2",label:"RG:","label-for":"input-2",description:"Apenas números"}},[r("b-input",{attrs:{readonly:"",mask:["####################"]},model:{value:e.teacher.rg,callback:function(t){e.$set(e.teacher,"rg",t)},expression:"teacher.rg"}})],1),r("b-form-group",{attrs:{id:"input-group-3",label:"CPF:","label-for":"input-3"}},[r("the-mask",{staticClass:"form-control",attrs:{readonly:"",mask:["###.###.###-##"]},model:{value:e.teacher.cpf,callback:function(t){e.$set(e.teacher,"cpf",t)},expression:"teacher.cpf"}})],1)],1),r("b-form-group",{attrs:{id:"input-group-9",label:"Título:","label-for":"input-9"}},[r("b-input",{attrs:{id:"input-9",readonly:""},model:{value:e.teacher.titulo,callback:function(t){e.$set(e.teacher,"titulo",t)},expression:"teacher.titulo"}})],1),r("b-form-group",{attrs:{id:"input-group-10",label:"Conteúdo:","label-for":"input-10"}},[r("b-form-textarea",{attrs:{id:"input-10",readonly:"","no-resize":"","no-auto-shrink":"",rows:"9"},model:{value:e.teacher.conteudo,callback:function(t){e.$set(e.teacher,"conteudo",t)},expression:"teacher.conteudo"}})],1)],1)],1)],1)],1)],1)},o=[],i=(r("4917"),r("bc3a")),s=r.n(i),n=r("2919"),c=r("0b4d"),l={name:"FormTeacherSignup",data:function(){return{errors:null,teacher:{facebook:"",instagram:"",twitter:""},show:!1,params:{token:"123456798",name:"avatar"},headers:{smail:"*_~"}}},components:{"my-upload":c["a"]},computed:{title:function(){return this.teacher.nome?"OLÁ ".concat(this.teacher.nome):"OLÁ MINISTRANTE"}},methods:{toggleShow:function(){this.show=!this.show},cropSuccess:function(e){this.teacher.avatar=e},save:function(){var e=this,t={type_form:"course",nome:this.teacher.nome,resumo:this.teacher.resumo,rg:this.teacher.rg,cpf:this.teacher.cpf,facebook:this.facebookRegex(this.teacher.facebook),twitter:this.twitterRegex(this.teacher.twitter),instagram:this.instagramRegex(this.teacher.instagram),site:this.teacher.site,email:this.teacher.email,telefone:this.teacher.telefone,titulo:this.teacher.titulo,conteudo:this.teacher.conteudo,avatar:this.teacher.avatar},r=s.a.create({baseURL:n["a"],validateStatus:function(e){return e<1e3}});r.post("".concat(n["a"],"/speaker/?token=").concat(this.$route.query.token),t).then(function(t){201===t.status?e.confirmModal("success",t.data.message):e.confirmModal("error",t.data.message)})},checkForm1:function(){var e=this;return this.errors=[],new Promise(function(t,r){if(e.teacher.nome)if(e.teacher.resumo)if(e.teacher.email)if(e.teacher.telefone)if(e.teacher.rg)if(e.teacher.cpf){if(!e.teacher.avatar){var a="Foto é obrigatório";e.errors.push(a),Object(n["b"])(a)}}else{var o="CPF é obrigatório";e.errors.push(o),Object(n["b"])(o)}else{var i="RG é obrigatório";e.errors.push(i),Object(n["b"])(i)}else{var s="Telefone é obrigatório";e.errors.push(s),Object(n["b"])(s)}else{var c="E-mail é obrigatório";e.errors.push(c),Object(n["b"])(c)}else{var l="Resumo é obrigatório";e.errors.push(l),Object(n["b"])(l)}else{var u="Nome é obrigatório";e.errors.push(u),Object(n["b"])(u)}e.errors.length?r("Preencha os campos obrigatórios!"):t(!0)})},checkForm2:function(){var e=this;return this.errors=[],new Promise(function(t,r){if(e.teacher.titulo){if(!e.teacher.conteudo){var a="Conteúdo do minicurso é obrigatório";e.errors.push(a),Object(n["b"])(a)}}else{var o="Título do minicurso é obrigatório";e.errors.push(o),Object(n["b"])(o)}e.errors.length?r("Preencha os campos obrigatórios!"):t(!0)})},confirmModal:function(e,t){this.$swal({position:"center",title:t,type:e,showCancelButton:!1,showConfirmButton:!1})},handleErrorMessage:function(e){this.errors=e},facebookRegex:function(e){if(!e)return null;var t=/(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w.-]*)?/,r=e.match(t);return 2===r.length?r[1]:[0]},twitterRegex:function(e){if(!e)return null;var t=/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_.-]+)/,r=e.match(t);return 2===r.length?r[1]:[0]},instagramRegex:function(e){if(!e)return null;var t=/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([a-zA-Z0-9_.-]+)/,r=e.match(t);return 2===r.length?r[1]:[0]}}},u=l,p=(r("e6ea"),r("2877")),h=Object(p["a"])(u,a,o,!1,null,"90d734b0",null);t["default"]=h.exports},f017:function(e,t,r){}}]);
//# sourceMappingURL=chunk-ccf89f0a.938ffd55.js.map