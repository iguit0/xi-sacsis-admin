<template>
  <b-container>
    <b-row>
      <b-col>
        <form-wizard
          @on-complete="save"
          @on-error="handleErrorMessage"
          error-color="#a94442"
          shape="square"
          color="#49a7c1"
          subtitle="Preencha seus dados corretamente e participe da XI SACSIS"
          stepSize="lg"
          finishButtonText="ENVIAR"
          nextButtonText="PRÓXIMO"
          backButtonText="VOLTAR"
        >
          <!-- sobrescrita do título -->
          <h2 slot="title" class="text-uppercase">{{title}}</h2>
          <!-- ./sobrescrita do título -->
          <tab-content title="Sobre você" icon="fa fa-user" :before-change="checkForm1">
            <!-- personal content -->
            <b-form>
              <b-form-group id="input-group-1" label="Nome Completo:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  v-model="teacher.nome"
                  placeholder="Conte-nos o seu nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  placeholder="Fale um pouco sobre você..."
                  required
                  v-model="teacher.resumo"
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                />
              </b-form-group>
              <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  v-model="teacher.email"
                  placeholder="Insira seu endereço de email."
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="Telefone:" label-for="input-3">
                <input
                  v-model="teacher.telefone"
                  placeholder="Insira seu numero de telefone."
                  class="form-control"
                  required
                  type="text"
                  v-mask="'(##) ###-###-###'"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2" description="Apenas números">
                <input
                  v-model="teacher.rg"
                  placeholder="RG"
                  class="form-control"
                  required
                  type="text"
                  v-mask="'####################'"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                <input
                  v-model="teacher.cpf"
                  placeholder="CPF"
                  class="form-control"
                  required
                  type="text"
                  v-mask="'###.###.###-##'"
                />
              </b-form-group>

              <b-form-group label="Imagem de avatar:">
                <my-upload class="customUpload" field="img"
                      @crop-success="cropSuccess"
                      v-model="show"
                  :params="params"
                  :headers="headers"
                  :width="300"
                  :height="300"
                  langType="pt-br"
                  noSquare="true"
                  img-format="png"></my-upload>
                <b-img
                  center
                  :src="teacher.avatar"
                  v-show="teacher.avatar"
                  rounded="circle"
                  :style="[teacher.avatar ? {'margin-bottom':'20px'} : {}]"/>
                <b-button
                  block
                  variant="outline-primary"
                  @click="toggleShow">Selecionar imagem de avatar
                </b-button>
              </b-form-group>
              <b-form-group id="input-group-4" label="Facebook:" label-for="input-4">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-facebook" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input
                    id="input-4"
                    placeholder="Link do seu perfil (Opcional)"
                    v-model="teacher.facebook"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-5" label="Instagram:" label-for="input-5">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-instagram" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input 
                    id="input-5"
                    placeholder="Link do seu perfil (Opcional)"
                    v-model="teacher.instagram"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-6" label="Twitter:" label-for="input-6">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-twitter" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input
                    id="input-6"
                    placeholder="Link do seu perfil (Opcional)"
                    v-model="teacher.twitter"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-7" label="Site:" label-for="input-7">
                <b-input-group prepend="www." class="mt-3">
                  <b-input
                    id="input-7"
                    placeholder="seusite.com.br (Opcional)"
                    v-model="teacher.site"
                  />
                </b-input-group>
              </b-form-group>
            </b-form>
            <!-- ./personal content -->
          </tab-content>
          <tab-content title="Sobre a Minicurso" icon="fa fa-chalkboard-teacher" :before-change="checkForm2">
            <!-- course details -->
            <b-form>
              <b-form-group id="input-group-9" label="Título:" label-for="input-9">
                <b-input
                  v-model="teacher.titulo"
                  placeholder="Título do minicurso"
                  id="input-9"
                  required
                />
              </b-form-group>
              <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
                <b-form-textarea
                  id="input-10"
                  placeholder="O minicurso irá abordar..."
                  no-resize
                  required
                  v-model="teacher.conteudo"
                  no-auto-shrink
                  rows="9"
                />
              </b-form-group>
            </b-form>
            <!-- ./teacher details -->
          </tab-content>
          <tab-content title="Confirmar Dados" icon="fas fa-clipboard-check">
            <!-- confirmacao -->
            <b-form>
              <b-form-group>
                <b-img center :src="teacher.avatar" v-show="teacher.avatar" rounded="circle"/>
              </b-form-group>
              <b-form-group id="input-group-1" label="Nome Completo:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  readonly
                  v-model="teacher.nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  readonly
                  v-model="teacher.resumo"
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                />
              </b-form-group>
              <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  readonly
                  v-model="teacher.email"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="Telefone:" label-for="input-3">
                <input
                  v-model="teacher.telefone"
                  class="form-control"
                  readonly
                  v-mask="'(##) ###-###-###'"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2" description="Apenas números">
                <b-input
                  v-model="teacher.rg"
                  readonly
                  v-mask="'####################'"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                <input
                  v-model="teacher.cpf"
                  class="form-control"
                  readonly
                  v-mask="'###.###.###-##'"
                />
              </b-form-group>
            </b-form>
            <b-form-group id="input-group-9" label="Título:" label-for="input-9">
              <b-input
                v-model="teacher.titulo"
                id="input-9"
                readonly
              />
            </b-form-group>
            <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
              <b-form-textarea
                id="input-10"
                v-model="teacher.conteudo"
                readonly
                no-resize
                no-auto-shrink
                rows="9"
              />
            </b-form-group>
            <!-- ./confirmacao -->
          </tab-content>
        </form-wizard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global"; //showSuccess
import myUpload from 'vue-image-crop-upload';

export default {
  name: "FormTeacherSignup",
  data() {
    return {
      errors: null,
      teacher: {
        facebook: "",
        instagram: "",
        twitter: ""
      },

			show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
      },
      
    };
  },
  components: {
    'my-upload': myUpload
  },
  computed: {
    title() {
      return this.teacher.nome ? `OLÁ ${this.teacher.nome}` : "OLÁ MINISTRANTE";
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(avatar){
      this.teacher.avatar = avatar;
    },
    save() {
      const data = {
        type_form: "course",
        nome: this.teacher.nome,
        resumo: this.teacher.resumo,
        rg: this.teacher.rg,
        cpf: this.teacher.cpf,
        facebook: this.facebookRegex(this.teacher.facebook),
        twitter: this.twitterRegex(this.teacher.twitter),
        instagram: this.instagramRegex(this.teacher.instagram),
        site: this.teacher.site,
        email: this.teacher.email,
        telefone: this.teacher.telefone,
        titulo: this.teacher.titulo,
        conteudo: this.teacher.conteudo,
        avatar: this.teacher.avatar
      }

      const api = axios.create({
        baseURL: baseApiUrl,
        validateStatus: function (status) {
            return status < 1000;
        }
      });

      api.post(`${baseApiUrl}/speaker/?token=${this.$route.query.token}`, data).then(res => {
        if (res.status === 201) {
          this.confirmModal("success", res.data.message);
          //showSuccess(res.data.message);
        } else {
          this.confirmModal("error", res.data.message);
          //showError(res.data.message);
        }
      });
    },
    checkForm1() {
      this.errors = [];

      return new Promise((resolve, reject) => {
        if (!this.teacher.nome) {
          let msg = "Nome é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.resumo) {
          let msg = "Resumo é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.email) {
          let msg = "E-mail é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.telefone) {
          let msg = "Telefone é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.rg) {
          let msg = "RG é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.cpf) {
          let msg = "CPF é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.avatar) {
          let msg = "Foto é obrigatório";
          this.errors.push(msg);
          showError(msg);
        }

        if (!this.errors.length) {
          resolve(true);
        } else {
          reject("Preencha os campos obrigatórios!");
        }
      });
    },
    checkForm2() {
      this.errors = [];

      return new Promise((resolve, reject) => {
        if (!this.teacher.titulo) {
          let msg = "Título do minicurso é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.teacher.conteudo) {
          let msg = "Conteúdo do minicurso é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } 

        if (!this.errors.length) {
          resolve(true);
        } else {
          reject("Preencha os campos obrigatórios!");
        }
      });
    },
    confirmModal(type, title) {
      this.$swal({
        position: "center",
        title: title,
        type: type,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    handleErrorMessage(errorMsg) {
      this.errors = errorMsg;
    },
    facebookRegex(str) {
      if (!str) return null;
      const regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]\/)?(?:profile.php\?id=(?=\d.*))?([\w.-]*)?/;
      const res = str.match(regex);
      if (res.length === 2)
        return res[1];
      return [0];
    },
    twitterRegex(str) {
      if (!str) return null;
      const regex = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_.-]+)/;
      const res = str.match(regex);
      if (res.length === 2)
        return res[1];
      return [0];
    },
    instagramRegex(str) {
      if (!str) return null;
      const regex = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([a-zA-Z0-9_.-]+)/;
      const res = str.match(regex);
      if (res.length === 2)
        return res[1];
      return [0];
    }
  }
};
</script>

<style scoped>
span.error {
  color: #e74c3c;
  font-size: 20px;
  display: flex;
  justify-content: center;
}
</style>
<style>
.customUpload .vicp-preview-item-circle {
  margin-top: 50px;
}
.customUpload .vicp-wrap {
  width: 420px;
}
@media only screen and (max-width: 600px) {
  .customUpload .vicp-range {
    display: none;
  }
  .customUpload .vicp-wrap {
    width: 260px;
    height: 260px;
    padding: 10px;
  }
}
</style>