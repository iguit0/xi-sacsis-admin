<template>
  <div class="course-admin">
    <b-form v-if="courses && courses.length">
      <input id="course-id" type="hidden" v-model="course.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Título:" label-for="course-title">
            <b-form-input
              id="course-title"
              type="text"
              v-model="course.titulo"
              required
              placeholder="Título"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="2">
          <b-form-group label="Descrição:" label-for="course-description">
            <b-form-textarea
              id="course-description"
              type="text"
              v-model="course.conteudo"
              rows="3"
              no-resize
              placeholder="Descrição"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="2">
          <b-form-group label="Ministrante:" label-for="course-ministrante">
            <b-input
              id="course-ministrante"
              type="text"
              v-model="course.ministrante"
              placeholder="Ministrante"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn
            variant="primary"
            :disabled="incomplete"
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

    <h2 class="text-center text-uppercase" v-else>Nenhum minicurso cadastrado!</h2>

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      show-empty
      empty-text="Não há nenhum minicurso cadastrado"
      :items="courses"
      :fields="fields"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} minicursos encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum minicurso encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectCourse(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectCourse(data.item, 'remove')" class="mr-2">
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
import moment from "moment";

export default {
  name: "CoursesAdmin",
  data() {
    return {
      incomplete: true,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      course: {},
      courses: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "titulo", label: "Título", sortable: true },
        { key: "conteudo", label: "Descrição" },
        { key: "ministrante", label: "Ministrante" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedCourse = JSON.parse(JSON.stringify(this.course));
      const data = {
        id: parsedCourse.id,
        titulo: parsedCourse.titulo,
        conteudo: parsedCourse.conteudo
      };
      axios
        .put(`${baseApiUrl}/admin/course`, data, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          if (res.status === 200) {
            let successMsg = res.data.message;
            showSuccess(successMsg);
            this.reset();
          } else {
            let errorMsg = res.data.message;
            showError(errorMsg);
            this.reset();
          }
        });
    },
    remove() {
      const id = this.course.id;
      api.delete(`/admin/course/${id}`).then(response => {
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
    reset() {
      this.mode = "save";
      this.course = {};
      this.incomplete = true;
    },
    loadCourses() {
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos;
          this.totalRows = res.data.minicursos.length;
        }
      });
    },
    selectCourse(course, mode = "save") {
      this.mode = mode;
      this.course = { ...course };
      this.incomplete = false;
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value))
          .locale("pt-br")
          .format("lll");
      }
    }
  },
  mounted() {
    //this.loadCourses();
  }
};
</script>