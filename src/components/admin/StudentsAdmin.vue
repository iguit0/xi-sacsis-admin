<template>
  <div class="student-admin">
    <b-form>
      <input id="student-id" type="hidden" v-model="student.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Nome Completo:" label-for="student-name">
            <b-form-input
              id="student-name"
              type="text"
              v-model="student.nome"
              required
              placeholder="Nome completo"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="1" sm="2">
          <b-form-group label="Matrícula:" label-for="student-matricula">
            <b-form-input
              id="student-matricula"
              type="text"
              v-model="student.matricula"
              required
              placeholder="Matrícula"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6" v-show="mode === 'save'">
          <b-form-group label="CPF:" label-for="student-cpf">
            <b-form-input
              id="student-cpf"
              v-show="mode === 'save'"
              type="text"
              v-model="student.cpf"
              required
              placeholder="CPF"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6" v-show="mode === 'save'">
          <b-form-group label="RG:" label-for="student-rg">
            <b-form-input
              id="student-rg"
              v-show="mode === 'save'"
              type="text"
              v-model="student.rg"
              required
              placeholder="RG"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2" v-show="mode === 'save'">
          <b-form-group label="Camiseta:" label-for="student-shirt">
            <b-form-select id="student-shirt" v-model="student.camiseta" :options="optionsShirt"/>
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2">
          <b-form-group label="Pago:" label-for="student-paid">
            <b-form-radio-group id="student-paid" v-model="student.status_pago">
              <b-form-radio value="true">Sim</b-form-radio>
              <b-form-radio value="false">Não</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group label="Nível de Permissão:" label-for="user-permission">
            <b-form-radio-group
              id="user-permission"
              v-model="student.admin"
              :options="optionsPermission"
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

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      :items="students"
      :fields="fields"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} participantes encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum participante encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn variant="warning" @click="selectStudent(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn variant="danger" @click="selectStudent(data.item, 'remove')" class="mr-2">
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
  name: "StudentsAdmin",
  data() {
    return {
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
      student: {
        camiseta: null
      },
      students: [],
      fields: [
        { key: "matricula", label: "Matrícula", sortable: true },
        { key: "nome", label: "Nome Completo", sortable: true },
        { key: "email", label: "E-mail" },
        { key: "camiseta", label: "Camiseta" },
        { key: "cpf", label: "CPF" },
        { key: "rg", label: "RG" },
        {
          key: "status_pago",
          label: "Pago",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        {
          key: "admin",
          label: "Admin",
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedStudent = JSON.parse(JSON.stringify(this.student));
      axios
        .put(
          `${baseApiUrl}/admin/user`,
          {
            id: parsedStudent.id,
            nome: parsedStudent.nome,
            email: parsedStudent.email,
            matricula: parsedStudent.matricula,
            cpf: parsedStudent.cpf,
            rg: parsedStudent.rg,
            status_pago: parsedStudent.status_pago,
            admin: parsedStudent.admin,
            camiseta: parsedStudent.camiseta
          },
          {
            headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
          }
        )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.student.id;
      axios
        .delete(`${baseApiUrl}/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.student = { camiseta: null };
      this.incomplete = true;
      this.loadStudents();
    },
    loadStudents() {
      axios
        .get(`${baseApiUrl}/admin/user`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.students = res.data.usuarios;
          this.totalRows = res.data.usuarios.length;
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
