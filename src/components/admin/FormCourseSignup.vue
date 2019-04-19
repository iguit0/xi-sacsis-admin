<template>
  <b-container>
    <b-row>
      <b-col>
        <form-wizard
          error-color="#a94442"
          title="OLÁ PALESTRANTE"
          subtitle="Preencha seus dados corretamente e participe da XI SACSIS"
          stepSize="lg"
          finishButtonText="ENVIAR"
          nextButtonText="PRÓXIMO"
          backButtonText="VOLTAR"
        >
          <tab-content title="Sobre você" icon="fa fa-user">
            <!-- personal content -->
            <b-form>
              <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  placeholder="Conte-nos o seu nome"
                />
              </b-form-group>
              <b-form-group id="input-group-2" label="Resumo:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  placeholder="Fale um pouco sobre você..."
                  no-resize
                  no-auto-shrink
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group id="input-group-2" label="RG:" label-for="input-2">
                <the-mask
                  v-model="speaker.rg"
                  placeholder="RG"
                  class="form-control"
                  required
                  :mask="['##.###.###']"
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
              <b-form-group id="input-group-4" label="Facebook:" label-for="input-4">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-facebook" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input id="input-4" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-5" label="Instagram:" label-for="input-5">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-instagram" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input id="input-5" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-6" label="Twitter:" label-for="input-6">
                <b-input-group>
                  <b-input-group-text slot="prepend">
                    <i class="fab fa-twitter" style="font-size: 1rem;"/>
                  </b-input-group-text>
                  <b-input id="input-6" placeholder="@usuario"/>
                </b-input-group>
              </b-form-group>
              <b-form-group id="input-group-7" label="Site:" label-for="input-7">
                <b-input id="input-7" placeholder="www.seusite.com.br"/>
              </b-form-group>
              <b-form-group id="input-group-8" label="Foto:" label-for="input-8">
                <b-form-file
                  id="input-8"
                  v-model="speaker.avatar"
                  browse-text="Escolher"
                  placeholder="Escolha um arquivo..."
                  drop-placeholder="Solte o arquivo aqui..."
                ></b-form-file>
              </b-form-group>
            </b-form>
            <!-- ./personal content -->
          </tab-content>
          <tab-content title="Sobre a palestra" icon="fa fa-microphone">
            <!-- speaker details -->
            <b-form>
              <b-form-group id="input-group-9" label="Título:" label-for="input-9">
                <b-input placeholder="Machine Learning no século XXI" id="input-9"/>
              </b-form-group>
              <b-form-group id="input-group-10" label="Conteúdo:" label-for="input-10">
                <b-form-textarea
                  id="input-10"
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
          <tab-content
            title="Confirmar Dados"
            icon="fas fa-clipboard-check"
          >Confirmação dos dados aqui...</tab-content>
        </form-wizard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "FormSpeakerSignup",
  data() {
    return {
      course: {
        description: ""
      }
    };
  }
};
</script>
