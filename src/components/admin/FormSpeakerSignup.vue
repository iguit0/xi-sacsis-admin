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
          <tab-content title="Sobre você" icon="fa fa-user" :before-change="checkForm">
            <!-- personal content -->
            <b-form>
              <b-form-group id="input-group-1" label="Nome Completo:" label-for="input-1">
                <b-form-input
                  v-model="speaker.nome"
                  id="input-1"
                  type="text"
                  required
                  placeholder="Conte-nos o seu nome"
                />
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Resumo:"
                label-for="input-2"
                description="Fale um pouco sobre você, onde trabalha(ou), etc..."
              >
                <b-form-textarea
                  v-model="speaker.resumo"
                  required
                  id="input-2"
                  placeholder="Resumo"
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="E-mail:" description="Não mandaremos spam :)">
                <b-form-input
                  v-model="speaker.email"
                  id="input-1"
                  type="email"
                  required
                  placeholder="E-mail"
                />
              </b-form-group>
              <b-form-group label="Telefone:">
                <the-mask
                  v-model="speaker.telefone"
                  placeholder="Telefone"
                  class="form-control"
                  required
                  :mask="['(##) ####-####', '(##) #####-####']"
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
              <b-form-group id="input-group-2" label="RG:" label-for="input-2">
                <b-input v-model="speaker.rg" type="number" placeholder="RG" required/>
              </b-form-group>
              <b-form-group id="input-group-8" label="Foto:" label-for="input-8">
                <b-form-file
                  id="input-8"
                  v-model="speaker.avatar"
                  browse-text="Escolher"
                  placeholder="Escolha um arquivo..."
                  drop-placeholder="Solte o arquivo aqui..."
                  description="Formatos aceitos: .jpg, .jpeg e .png"
                ></b-form-file>
              </b-form-group>
              <b-form-group id="input-group-4" label="Facebook:" label-for="input-4">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-facebook" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input v-model="speaker.facebook" id="input-4" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-5" label="Instagram:" label-for="input-5">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-instagram" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input id="input-5" v-model="speaker.instagram" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-6" label="Twitter:" label-for="input-6">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-twitter" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input id="input-6" v-model="speaker.twitter" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-7" label="Site:" label-for="input-7">
                <b-input-group prepend="www." class="mt-3">
                  <b-input id="input-7" placeholder="seusite.com.br" v-model="speaker.site"/>
                </b-input-group>
              </b-form-group>
            </b-form>
            <!-- ./personal content -->
          </tab-content>
          <tab-content title="Sobre a palestra" icon="fa fa-microphone">
            <!-- speaker details -->
            <b-form>
              <b-form-group id="input-group-9" label="Título:" label-for="input-9">
                <b-input
                  v-model="speaker.titulo"
                  placeholder="Machine Learning no século XXI"
                  id="input-9"
                />
              </b-form-group>
              <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
                <b-form-textarea
                  id="input-10"
                  v-model="speaker.conteudo"
                  placeholder="A palestra irá abordar..."
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
            <!-- ./speaker details -->
          </tab-content>
          <tab-content title="Confirmar Dados" icon="fas fa-clipboard-check">
            <!-- confirmacao -->
            <b-form>
              <b-form-group id="input-group-1" label="Nome Completo:" label-for="input-1">
                <b-form-input
                  v-model="speaker.nome"
                  id="input-1"
                  readonly
                  type="email"
                  placeholder="Conte-nos o seu nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2">
                <b-form-textarea
                  v-model="speaker.resumo"
                  readonly
                  id="input-2"
                  placeholder="Fale um pouco sobre você..."
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Telefone:">
                <b-input type="tel" placeholder="Telefone" readonly v-model="speaker.telefone"/>
              </b-form-group>
              <b-form-group id="input-group-3" label="CPF:" label-for="input-3">
                <the-mask
                  v-model="speaker.cpf"
                  placeholder="CPF"
                  class="form-control"
                  readonly
                  :mask="['###.###.###-##']"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2">
                <b-input v-model="speaker.rg" readonly type="number" placeholder="RG"/>
              </b-form-group>
            </b-form>
            <!-- ./personal content -->
            <b-form>
              <b-form-group id="input-group-9" label="Título:" label-for="input-9">
                <b-input
                  v-model="speaker.titulo"
                  placeholder="Machine Learning no século XXI"
                  id="input-9"
                  readonly
                />
              </b-form-group>
              <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
                <b-form-textarea
                  id="input-10"
                  v-model="speaker.conteudo"
                  readonly
                  placeholder="A palestra irá abordar..."
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
            <!-- ./confirmacao -->
          </tab-content>
          <div class="loader" v-if="loadingWizard"></div>
          <div v-if="errorMsg">
            <span class="error">{{errorMsg}}</span>
          </div>
        </form-wizard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, showSuccess } from "@/global";

export default {
  props: ["token"],
  name: "FormSpeakerSignup",
  data() {
    return {
      loadingWizard: false,
      errorMsg: null,
      speaker: {
        name: "",
        description: ""
      }
    };
  },
  computed: {
    title() {
      return this.speaker.nome ? `OLÁ ${this.speaker.nome}` : "OLÁ PALESTRANTE";
    }
  },
  methods: {
    save() {
      let parsedSpeaker = JSON.parse(JSON.stringify(this.speaker));
      const data = {
        type_form: "lecture",
        nome: parsedSpeaker.nome,
        resumo: parsedSpeaker,
        rg: parsedSpeaker.rg,
        cpf: parsedSpeaker.cpf,
        avatar: parsedSpeaker.avatar,
        facebook: parsedSpeaker.facebook,
        twitter: parsedSpeaker.twitter,
        instagram: parsedSpeaker.instagram,
        site: parsedSpeaker.site,
        email: parsedSpeaker.email,
        telefone: parsedSpeaker.telefone,
        titulo: parsedSpeaker.titulo,
        conteudo: parsedSpeaker.conteudo
      };
      axios
        .post(`${baseApiUrl}/speaker/?token=${this.token}`, data)
        .then(res => {
          if (response.status === 200) {
            showSuccess(res.data.message);
          } else {
            showError(res.data.message);
          }
        });
    },
    checkForm() {
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
        } else if (!this.speaker.rg) {
          let msg = "RG é obrigatório";
          this.errors.push(msg);
          showError(msg);
        } else if (!this.speaker.cpf) {
          let msg = "CPF é obrigatório";
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
        } else if (!this.speaker.titulo) {
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
    handleErrorMessage(errorMsg) {
      this.errorMsg = errorMsg;
    }
  },
  mounted() {
    console.log(this.token);
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