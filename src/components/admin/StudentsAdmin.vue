<template>
  <div class="student-admin">
    <b-form v-if="students && students.length">
      <input id="student-id" type="hidden" v-model="student.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Nome:" label-for="student-name">
            <b-form-input
              id="student-name"
              type="text"
              v-model="student.nome"
              required
              placeholder="Nome"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2">
          <b-form-group label="Matrícula:" label-for="student-matricula">
            <input
              id="student-matricula"
              v-mask="'#####'"
              v-model="student.matricula"
              name="matricula"
              :readonly="mode === 'remove'"
              placeholder="Matrícula"
              class="form-control"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group label="CPF:" label-for="student-cpf">
            <input
              id="student-cpf"
              v-model="student.cpf"
              placeholder="CPF"
              :readonly="mode === 'remove'"
              class="form-control"
              v-mask="'###########'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group label="RG:" label-for="student-rg">
            <input
              id="student-rg"
              v-model="student.rg"
              placeholder="RG"
              :readonly="mode === 'remove'"
              v-mask="'###############'"
              class="form-control"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="2" v-if="mode === 'save'">
          <b-form-group label="Camiseta:" label-for="student-shirt">
            <b-form-select id="student-shirt" v-model="student.camiseta" :options="optionsShirt"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group
            label="Nível de Permissão:"
            label-for="user-permission"
            v-if="mode === 'save'"
          >
            <b-form-radio-group
              id="user-permission"
              v-model="student.admin"
              :options="optionsPermission"
              class="mt-3"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Gênero:" label-for="user-gender" v-if="mode === 'save'">
            <b-form-radio-group
              id="user-gender"
              v-model="student.sexo"
              :options="optionsGender"
              class="mt-3"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn
            :disabled="incomplete"
            variant="primary"
            v-if="mode === 'save'"
            @click="save"
          >Salvar</b-btn>
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

    <h2 class="text-center text-uppercase" v-if="empty">Nenhum estudante cadastrado!</h2>

    <div class="text-center" v-if="isLoading">
      <b-spinner variant="dark"></b-spinner>
      <h4 class="mt-2 text-center text-uppercase">CARREGANDO...</h4>
    </div>

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      show-empty
      empty-text="Não há nenhum participante cadastrado"
      :fields="fields"
      :items="items"
      :keyword="keyword"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>
            {{ totalRows
            ? totalRows + " participantes encontrados"
            : "Nenhum participante encontrado" }}
          </strong>
        </h6>
        <b-input-group>
          <b-form-input v-model="keyword" placeholder="Pesquisar" type="text"/>
          <b-input-group-append>
            <b-btn
              :disabled="!keyword"
              @click="keyword = ''"
              size="mb-3"
              variant="outline-secondary"
            >
              <v-icon name="times"/>
            </b-btn>
          </b-input-group-append>
        </b-input-group>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectStudent(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectStudent(data.item, 'remove')" class="mr-2">
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
import { baseApiUrl, showError, showSuccess } from "@/global";
import api from "@/services/api";
import axios from "axios";

export default {
  name: "StudentsAdmin",
  data() {
    return {
      keyword: "",
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      incomplete: true,
      optionsPermission: [
        { text: "Administrador", value: "true" },
        { text: "Participante", value: "false" }
      ],
      optionsShirt: [
        { value: null, text: "Selecione um tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" }
      ],
      optionsGender: [
        { value: "Masculino", text: "Masculino" },
        { value: "Feminino", text: "Feminino" }
      ],
      student: {
        camiseta: null
      },
      isLoading: false,
      empty: false,
      students: [],
      fields: [
        { key: "matricula", label: "Matrícula", sortable: true },
        { key: "nome", label: "Nome Completo", sortable: true },
        {
          key: "status_pago",
          label: "Pago",
          sortable: true,
          formatter: value => (value ? "Pago" : "Não")
        },
        { key: "email", label: "E-mail", sortable: true },
        { key: "camiseta", label: "Camiseta" },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "rg", label: "RG", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  computed: {
    items() {
      return this.keyword
        ? this.students.filter(
            item =>
              item.matricula.includes(this.keyword) ||
              item.cpf.includes(this.keyword) ||
              item.rg.includes(this.keyword) ||
              item.nome.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.email.toLowerCase().includes(this.keyword.toLowerCase())
          )
        : this.students;
    }
  },
  methods: {
    save() {
      let parsedStudent = JSON.parse(JSON.stringify(this.student));
      const data = {
        id: parsedStudent.id,
        nome: parsedStudent.nome,
        matricula: parsedStudent.matricula,
        cpf: parsedStudent.cpf,
        rg: parsedStudent.rg,
        camiseta: parsedStudent.camiseta,
        sexo: parsedStudent.sexo,
        admin: JSON.parse(parsedStudent.admin)
      };
      axios
        .put(`${baseApiUrl}/admin/user`, data, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(response => {
          if (response.status === 200) {
            let successMsg = response.data.message;
            showSuccess(successMsg);
            this.reset();
          } else {
            let errorMsg = response.data.message;
            showError(errorMsg);
            this.reset();
          }
        });
    },
    remove() {
      const id = this.student.id;
      api.delete(`/admin/user/${id}`).then(response => {
        if (response.status === 201) {
          showSuccess("Participante removido com sucesso!");
          this.reset();
        } else {
          showError(response.data.message);
          this.reset();
        }
      });
    },
    reset() {
      this.mode = "save";
      this.student = { camiseta: null };
      this.incomplete = true;
      this.loadStudents();
    },
    loadStudents() {
      this.isLoading = true;
      api.get("/admin/user").then(res => {
        if (res.status === 200) {
          this.students = res.data.usuarios;
          this.totalRows = res.data.usuarios.length;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.empty = true;
          showError(res.data.message);
        }
      });
    },
    selectStudent(student, mode = "save") {
      this.mode = mode;
      this.student = { ...student };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadStudents();
  }
};
</script>
