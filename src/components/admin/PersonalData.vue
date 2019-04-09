<template>
  <div class="personal-data">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="E-mail:"
        label-for="input-1"
        description="Nunca iremos compartilhar seu e-mail."
      >
        <b-form-input
          id="input-1"
          v-model="user.dados.email"
          type="email"
          required
          readonly
          placeholder="Digite e-mail"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input id="input-2" v-model="user.dados.nome" required placeholder="Digite nome"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Matricula:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="user.dados.matricula"
          required
          placeholder="Digite matrícula"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="CPF:" label-for="input-4">
        <b-form-input id="input-4" v-model="user.dados.cpf" required placeholder="Digite CPF"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="RG:" label-for="input-5">
        <b-form-input id="input-5" v-model="user.dados.rg" required placeholder="Digite RG"/>
      </b-form-group>

      <!--<b-form-group id="input-group-6" label="Camiseta:" label-for="input-6">
        <b-form-select id="input-6" v-model="user.dados.camiseta" :options="optionsShirt"/>
      </b-form-group>-->

      <b-form-group
        id="input-group-6"
        label="Pago:"
        label-for="input-6"
      >{{user.dados.status_pago ? 'Sim' : 'Não'}}</b-form-group>

      <b-button block variant="warning">
        <v-icon name="edit" class="mr-1"/>EDITAR
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PersonalData",
  data() {
    return {
      optionsShirt: [
        { value: null, text: "Selecione um tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" }
      ]
    };
  },
  computed: { ...mapState(["user"]) }
};
</script>
