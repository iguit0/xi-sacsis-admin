<template>
  <b-container>
    <b-row>
      <b-col>
        <form-wizard
          @on-complete="save"
          @on-error="handleErrorMessage"
          error-color="#a94442"
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
                  v-model="speaker.nome"
                  placeholder="Conte-nos o seu nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2" description="Maximo 250 caracteres">
                <b-form-textarea
                  id="input-2"
                  placeholder="Fale um pouco sobre você..."
                  required
                  v-model="speaker.resumo"
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                  :maxlength="250"
                />
              </b-form-group>
              <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  v-model="speaker.email"
                  placeholder="Insira seu endereço de email."
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="Telefone:" label-for="input-3">
                <the-mask
                  v-model="speaker.telefone"
                  placeholder="Insira seu numero de telefone."
                  class="form-control"
                  required
                  :mask="['(##) ####-####','(##) #####-####']"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2" description="Apenas números">
                <the-mask
                  v-model="speaker.rg"
                  placeholder="RG"
                  class="form-control"
                  required
                  :mask="['####################']"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                <the-mask
                  v-model="speaker.cpf"
                  placeholder="CPF"
                  class="form-control"
                  required
                  :mask="['###.###.###-##']"
                />
              </b-form-group>

              <b-form-group label="Imagem de avatar:">
                <my-upload field="img"
                      @crop-success="cropSuccess"
                      v-model="show"
                  :params="params"
                  :headers="headers"
                  :width="300"
                  :height="300"
                  langType="pt-br"
                  img-format="png"></my-upload>
                <b-img
                  center
                  :src="speaker.avatar"
                  v-show="speaker.avatar"
                  rounded="circle"
                  :style="[speaker.avatar ? {'margin-bottom':'20px'} : {}]"/>
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
                    v-model="speaker.facebook"
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
                    v-model="speaker.instagram"
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
                    v-model="speaker.twitter"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-7" label="Site:" label-for="input-7">
                <b-input-group prepend="www." class="mt-3">
                  <b-input
                    id="input-7"
                    placeholder="seusite.com.br (Opcional)"
                    v-model="speaker.site"
                  />
                </b-input-group>
              </b-form-group>
            </b-form>
            <!-- ./personal content -->
          </tab-content>
          <tab-content title="Sobre a palestra" icon="fa fa-microphone" :before-change="checkForm2">
            <!-- speaker details -->
            <b-form>
              <b-form-group id="input-group-9" label="Título:" label-for="input-9">
                <b-input
                  v-model="speaker.titulo"
                  placeholder="Título da palestra"
                  id="input-9"
                  required
                />
              </b-form-group>
              <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
                <b-form-textarea
                  id="input-10"
                  placeholder="A palestra irá abordar..."
                  no-resize
                  required
                  v-model="speaker.conteudo"
                  no-auto-shrink
                  rows="9"
                />
              </b-form-group>
            </b-form>
            <!-- ./speaker details -->
          </tab-content>
          <tab-content title="Confirmar Dados" icon="fas fa-clipboard-check">
            <!-- confirmacao -->
            <b-form>
              <b-form-group>
                <b-img center :src="speaker.avatar" v-show="speaker.avatar" rounded="circle"/>
              </b-form-group>
              <b-form-group id="input-group-1" label="Nome Completo:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  readonly
                  v-model="speaker.nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  readonly
                  v-model="speaker.resumo"
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
                  v-model="speaker.email"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="Telefone:" label-for="input-3">
                <the-mask
                  v-model="speaker.telefone"
                  class="form-control"
                  readonly
                  :mask="['(##) ####-####','(##) #####-####']"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2">
                <b-input
                  v-model="speaker.rg"
                  readonly
                  :mask="['####################']"
                />
              </b-form-group>
              <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                <the-mask
                  v-model="speaker.cpf"
                  class="form-control"
                  readonly
                  :mask="['###.###.###-##']"
                />
              </b-form-group>
            </b-form>
            <b-form-group id="input-group-9" label="Título:" label-for="input-9">
              <b-input
                v-model="speaker.titulo"
                id="input-9"
                readonly
              />
            </b-form-group>
            <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
              <b-form-textarea
                id="input-10"
                v-model="speaker.conteudo"
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
  name: "FormSpeakerSignup",
  data() {
    return {
      errors: null,
      speaker: {
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
      return this.speaker.nome ? `OLÁ ${this.speaker.nome}` : "OLÁ PALESTRANTE";
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(avatar){
      this.speaker.avatar = avatar;
    },
    save() {
      const data = {
        type_form: "lecture",
        nome: this.speaker.nome,
        resumo: this.speaker.resumo,
        rg: this.speaker.rg,
        cpf: this.speaker.cpf,
        facebook: this.facebookRegex(this.speaker.facebook),
        twitter: this.twitterRegex(this.speaker.twitter),
        instagram: this.instagramRegex(this.speaker.instagram),
        site: this.speaker.site,
        email: this.speaker.email,
        telefone: this.speaker.telefone,
        titulo: this.speaker.titulo,
        conteudo: this.speaker.conteudo,
        avatar: this.speaker.avatar
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
        if (!this.speaker.nome) {
          let msg = "Nome é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.resumo) {
          let msg = "Resumo é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.email) {
          let msg = "E-mail é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.telefone) {
          let msg = "Telefone é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.rg) {
          let msg = "RG é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.cpf) {
          let msg = "CPF é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.avatar) {
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
        if (!this.speaker.titulo) {
          let msg = "Título da palestra é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.conteudo) {
          let msg = "Conteúdo da palestra é obrigatório";
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
    handleErrorMessage(errors) {
      this.errors = errors;
    },
    facebookRegex(str) {
      if (!str) return null;
      const regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w.-]*)?/;
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