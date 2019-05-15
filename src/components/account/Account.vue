<template>
  <div class="personal-data">
    <PageTitle icon="user-circle" main="Minha conta" sub="Gerencie suas informações"/>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="E-mail:"
        label-for="input-1"
        description="Nunca iremos compartilhar seu e-mail"
      >
        <b-form-input
          id="input-1"
          v-model="editedUser.email"
          type="email"
          readonly
          placeholder="Digite e-mail"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input id="input-2" v-model="editedUser.nome" placeholder="Digite nome"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Matricula:" label-for="input-3">
        <b-form-input id="input-3" v-model="editedUser.matricula" placeholder="Digite matrícula"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="CPF:" label-for="input-4">
        <the-mask
          id="input-4"
          v-model="editedUser.cpf"
          placeholder="CPF"
          class="form-control"
          :mask="['###.###.###-##']"
        />
      </b-form-group>

      <b-form-group id="input-group-5" label="RG:" label-for="input-5">
        <b-form-input id="input-5" v-model="editedUser.rg" placeholder="Digite RG"/>
      </b-form-group>

      <b-form-group id="input-group-6" label="Camiseta:" label-for="input-6">
        <b-form-select id="input-6" v-model="editedUser.camiseta" :options="optionsShirt" disabled/>
      </b-form-group>

      <b-form-group
        id="input-group-7"
        label="Pago:"
        label-for="input-7"
        description="O participante só poderá se inscrever nos minicursos oferecidos após o pagamento ter sido realizado."
      >
        <b-form-checkbox
          disabled
          id="input-7"
          v-model="editedUser.status_pago"
          switch
        >{{ editedUser.status_pago ? 'Sim' : 'Não'}}</b-form-checkbox>
      </b-form-group>

      <VueLoadingButton
        aria-label="Editar Dados de Usuário"
        class="btn btn-warning btn-block"
        :styled="isStyled"
        @click.native="editUser"
        :loading="isLoading"
      >
        <v-icon name="edit" scale="1.5" class="mr-1"/>Editar
      </VueLoadingButton>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/services/api";
import VueLoadingButton from "vue-loading-button";
import { showError, showSuccess } from "@/global";
import PageTitle from "@/components/template/PageTitle";

export default {
  name: "PersonalData",
  components: { VueLoadingButton, PageTitle },
  data() {
    return {
      isStyled: false,
      isLoading: false,
      editedUser: {},
      optionsShirt: [
        { value: null, text: "Selecione um tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" }
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    editUser() {
      this.isLoading = true;
      let parsedUser = JSON.parse(JSON.stringify(this.editedUser));
      const data = {
        nome: parsedUser.nome,
        cpf: parsedUser.cpf,
        rg: parsedUser.rg,
        matricula: parsedUser.matricula,
        camiseta: parsedUser.camiseta
      };
      api.put("/user", data).then(response => {
        if (response.status === 200) {
          let successMsg = response.data.message;
          showSuccess(successMsg);
          this.isLoading = false;
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.isLoading = false;
        }
      });
    }
  },
  mounted() {
    this.editedUser = this.user.dados;
  }
};
</script>
