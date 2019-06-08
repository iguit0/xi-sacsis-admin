<template>
  <div>
    <div v-if="isLoading" class="py-2 mt-2 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <h2 class="text-center text-uppercase mt-1">CARREGANDO...</h2>
    </div>
    <div class="personal-data" v-else>
      <PageTitle icon="user-circle" main="Minha conta" sub="Gerencie suas informações"/>
      <b-form>
        <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="editedUser.nome"
            :readonly="!ienable"
            placeholder="Digite nome"
          />
        </b-form-group>

        <b-form-group id="input-group-3" label="Matrícula:" label-for="input-3">
          <input
            id="input-3"
            v-mask="'#####'"
            v-model="editedUser.matricula"
            name="matricula"
            placeholder="Matrícula"
            class="form-control"
            :readonly="!ienable"
          />
        </b-form-group>

        <b-form-group id="input-group-4" label="CPF:" label-for="input-4">
          <input
            id="input-4"
            v-model="editedUser.cpf"
            placeholder="CPF"
            class="form-control"
            v-mask="'###.###.###-##'"
            :readonly="!ienable"
          />
        </b-form-group>

        <b-form-group id="input-group-5" label="RG:" label-for="input-5">
          <input
            id="input-5"
            v-model="editedUser.rg"
            :readonly="!ienable"
            class="form-control"
            v-mask="'###############'"
          />
        </b-form-group>

        <b-form-group id="input-group-33" label="Gênero:" label-for="input-33">{{editedUser.sexo}}</b-form-group>

        <b-form-group
          id="input-group-1"
          label="E-mail:"
          label-for="input-1"
          description="Nunca iremos compartilhar seu e-mail com ninguém!"
        >
          <b-form-input
            id="input-1"
            v-model="editedUser.email"
            type="email"
            readonly
            placeholder="Digite e-mail"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Camiseta:"
          label-for="input-6"
          description="Escolheu tamanho errado? Entre em contato com a organização do evento!"
        >
          <b-form-select
            id="input-6"
            v-model="editedUser.camiseta"
            :options="optionsShirt"
            disabled
          />
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Pago:"
          label-for="input-7"
          description="Assim que seu pagamento ser confirmado pela organização, você poderá se inscrever nos minicursos"
        >
          <b-form-checkbox
            disabled
            id="input-7"
            v-model="editedUser.status_pago"
            switch
          >{{ editedUser.status_pago ? 'Sim' : 'Não'}}</b-form-checkbox>
        </b-form-group>

        <VueLoadingButton
          v-if="bedit"
          aria-label="Editar Dados de Usuário"
          class="btn btn-warning btn-block"
          :styled="isStyled"
          @click.native="editUser"
          :loading="isLoading"
        >
          <v-icon name="edit" scale="1.5" class="mr-1"/>Editar
        </VueLoadingButton>

        <VueLoadingButton
          v-if="bsave"
          aria-label="Salvar Dados de Usuário"
          class="btn btn-success btn-block"
          :styled="isStyled"
          @click.native="saveUser"
          :loading="isLoading"
        >
          <v-icon name="save" scale="1.5" class="mr-1"/>Salvar
        </VueLoadingButton>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/services/api";
import VueLoadingButton from "vue-loading-button";
import { showError, showSuccess, userKey } from "@/global";
import PageTitle from "@/components/template/PageTitle";

export default {
  name: "PersonalData",
  components: { VueLoadingButton, PageTitle },
  data() {
    return {
      bedit: true,
      bsave: false,
      ienable: false,
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
      this.changeState();
    },
    saveUser() {
      this.changeState();
      this.isLoading = true;
      //let parsedUser = JSON.parse(JSON.stringify(this.editedUser));
      const data = {
        nome: this.editedUser.nome,
        matricula: this.editedUser.matricula,
        cpf: this.editedUser.cpf,
        rg: this.editedUser.rg
      };
      api.put("/user", data).then(res => {
        if (res.status === 200 || res.status === 201) {
          showSuccess(res.data.message);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$store.commit("setUser", res.data);
        } else {
          showError(res.data.message);
        }
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    changeState() {
      this.bsave = !this.bsave;
      this.bedit = !this.bedit;
      this.ienable = !this.ienable;
    }
  },
  mounted() {
    this.isLoading = true;
    this.editedUser = JSON.parse(JSON.stringify(this.user.dados));
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
};
</script>
