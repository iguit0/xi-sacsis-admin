<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id">
      <b-row>
        <b-col md="4" sm="6">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.nome"
              required
              :readonly="mode === 'remove'"
              placeholder="Digite nome do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Digite e-mail do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="12">
          <b-form-group label="Matrícula:" label-for="user-matricula">
            <b-form-input
              id="user-matricula"
              type="text"
              v-model="user.matricula"
              required
              :readonly="mode === 'remove'"
              placeholder="Matrícula"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Nível de Permissão:" label-for="user-permission">
            <b-form-radio-group
              id="user-permission"
              v-model="user.permission"
              :options="options"
              class="mt-3"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-show="mode === 'save'">
        <b-col md="4" sm="12">
          <b-form-group label="Senha:" label-for="user-password" v-if="showPass">
            <b-input-group class="mt-3">
              <b-input-group-text slot="append" @click="showPassword">
                <v-icon name="eye-slash"/>
              </b-input-group-text>
              <b-form-input
                id="user-password"
                type="password"
                v-model="user.password"
                required
                placeholder="Senha"
              />
            </b-input-group>
          </b-form-group>
          <b-form-group label="Senha:" label-for="user-password" v-else>
            <b-input-group class="mt-3">
              <b-input-group-text slot="append" @click="showPassword">
                <v-icon name="eye"/>
              </b-input-group-text>
              <b-form-input
                id="user-password"
                type="text"
                v-model="user.password"
                required
                placeholder="Senha"
              />
            </b-input-group>
          </b-form-group>
          <!--<b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Senha"
            />
          </b-form-group>-->
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Confirmar senha:" label-for="user-confirm-password">
            <b-input-group class="mt-3">
              <b-input-group-text slot="append">
                <!-- Matched color password: #32CD32 -->
                <v-icon name="check-circle"/>
              </b-input-group-text>
              <b-form-input
                id="user-confirm-password"
                type="password"
                v-model="user.confirmPassword"
                required
                placeholder="Confirmar senha"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      :items="users"
      :fields="fields"
    >
      <template slot="table-caption">
        <h6 align="right">
          <strong>{{totalRows}} usuários encontrados</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn variant="warning" @click="selectUser(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn variant="danger" @click="selectUser(data.item, 'remove')" class="mr-2">
          <v-icon name="trash-alt"/>
        </b-btn>
      </template>
    </b-table>
    <!-- ./TABELA -->
    <b-row>
      <b-col xs="12" class="text-center">
        <b-pagination
          align="center"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="text-center"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UsersAdmin",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      user: {},
      users: [],
      showPass: false,
      options: [
        { text: "Administrador", value: "admin" },
        { text: "Participante", value: "student" }
      ],
      fields: [
        { key: "matricula", label: "Matrícula", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "cpf", label: "CPF" },
        { key: "rg", label: "RG" },
        {
          key: "admin",
          label: "Admin",
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ],
      mode: "save"
    };
  },
  methods: {
    loadUsers() {
      axios
        .get(`${baseApiUrl}/admin/user?onlyadm=true`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.users = res.data.usuarios;
          this.totalRows = res.data.usuarios.length;
        })
        .catch(showError);
    },
    save() {
      this.$toasted.global.defaultSuccess();
      this.$toasted.global.defaultError();
      this.reset();
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    selectUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
    showPassword() {
      this.showPass = !this.showPass;
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

