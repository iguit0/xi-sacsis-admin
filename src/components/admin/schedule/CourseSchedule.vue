<template>
  <div class="course-schedule">
    <b-form>
      <input id="course-id" type="hidden" v-model="course.id">
      <b-row>
        <b-col md="5">
          <b-form-group
            label="Selecionar minicurso:"
            label-for="course"
            description="Padrão: (Nome Minicurso) • (Ministrante)"
          >
            <v-select
              id="course"
              label="titulo"
              :disabled="mode === 'remove'"
              v-model="selected"
              :options="coursesSelect"
              placeholder="Selecione uma opção"
            >
              <!-- dropdown pra selecionar -->
              <template slot="option" slot-scope="option">{{option.titulo}} • {{option.ministrante}}</template>
              <!-- ./dropdown pra selecionar -->
              <!-- método ja selecionado -->
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">{{option.titulo}} • {{option.ministrante}}</div>
              </template>
              <!-- ./metodo ja selecionado -->
              <!-- sem opcoes -->
              <slot name="no-options">Não encontramos nenhum minicurso.</slot>
              <!-- ./sem opcoes -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group
            label="Data Início:"
            label-for="course-start"
            description="Exemplo: 07/06/2019 14:00"
          >
            <input
              label="Date"
              id="course-start"
              v-mask="'##/##/#### ##:##'"
              placeholder="Data Início"
              v-model="course.data_inicio"
              class="form-control"
              :readonly="mode === 'remove'"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Data Fim:" label-for="course-end">
            <input
              label="Date"
              id="course-end"
              v-mask="'##/##/#### ##:##'"
              placeholder="Data Fim"
              v-model="course.data_fim"
              class="form-control"
              :readonly="mode === 'remove'"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235" label-for="course-location">
            <b-input
              type="text"
              :readonly="mode === 'remove'"
              v-model="course.local"
              id="course-location"
              placeholder="Local"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-group label="Turma:" label-for="course-turma">
            <b-input
              type="number"
              :readonly="mode === 'remove'"
              id="course-turma"
              v-model="course.turma"
              placeholder="Turma"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Vagas:" label-for="course-vacancies">
            <b-input
              :readonly="mode === 'remove'"
              type="number"
              v-model="course.vagas"
              id="course-vacancies"
              placeholder="Vagas"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'" @click="checkForm">Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
      </b-row>
    </b-form>
    <!--<h2 v-if="empty" class="text-center text-uppercase">Não há minicursos cadastrados</h2>-->

    <div class="text-center" v-if="isLoading">
      <b-spinner variant="dark"></b-spinner>
      <h4 class="mt-2 text-center text-uppercase">CARREGANDO...</h4>
    </div>

    <!-- TABELA -->
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      :items="courses"
      empty-text="Não há nenhum minicurso cadastrado"
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
import api from "@/services/api";
import { showError, showSuccess } from "@/global";

export default {
  name: "CourseSchedule",
  data() {
    return {
      coursesSelect: [],
      incomplete: true,
      isLoading: false,
      empty: false,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      selected: null,
      fields: [
        { key: "titulo", label: "Título", sortable: true },
        {
          key: "dia",
          label: "Dia",
          formatter: value => {
            switch (value) {
              case 0:
                return (value = "Segunda-Feira");
              case 1:
                return (value = "Terça-Feira");
              case 2:
                return (value = "Quarta-Feira");
              case 3:
                return (value = "Quinta-Feira");
              case 4:
                return (value = "Sexta-Feira");
              case 5:
                return (value = "Sábado");
              case 6:
                return (value = "Domingo");
            }
          }
        },
        { key: "local", label: "Local", sortable: true },
        { key: "turma", label: "Turma" },
        { key: "vagas", label: "Vagas", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      mode: "save",
      courses: [],
      course: {}
    };
  },
  methods: {
    checkForm(e) {
      this.errors = [];

      if (!this.selected) {
        let msg = "Selecione um minicurso";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.course.data_inicio) {
        let msg = "Selecione uma data de ínicio";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.course.data_fim) {
        let msg = "Selecione uma data fim";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.course.turma) {
        let msg = "Cadastre uma turma";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.course.local) {
        let msg = "Informe um local";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.course.vagas) {
        let msg = "Cadastre um número de vagas";
        this.errors.push(msg);
        showError(msg);
      }

      if (!this.errors.length) {
        return this.save();
      }

      e.preventDefault();
    },
    formatDateTime(value) {
      return (
        value.substring(0, 2) +
        "/" +
        value.substring(2, 4) +
        "/" +
        value.substring(4, 8) +
        " " +
        value.substring(8, 10) +
        ":" +
        value.substring(10, 12)
      );
    },
    save() {
      let parsedCourse = JSON.parse(JSON.stringify(this.course));
      let parsedSelected = JSON.parse(JSON.stringify(this.selected));
      const method = parsedCourse.id ? "put" : "post";
      if (method === "post") {
        parsedCourse.data_inicio = this.formatDateTime(
          parsedCourse.data_inicio
        );
        parsedCourse.data_fim = this.formatDateTime(parsedCourse.data_fim);
        parsedCourse.course_id = parsedSelected.id;
      }
      if (parsedCourse.data_inicio.length === 12)
        parsedCourse.data_inicio = this.formatDateTime(
          parsedCourse.data_inicio
        );
      if (parsedCourse.data_fim.length === 12)
        parsedCourse.data_fim = this.formatDateTime(parsedCourse.data_fim);
      const data = {
        course_id: parsedCourse.course_id,
        id: parsedCourse.id,
        dia: parsedCourse.dia,
        local: parsedCourse.local,
        data_inicio: parsedCourse.data_inicio,
        data_fim: parsedCourse.data_fim,
        vagas: parsedCourse.vagas,
        turma: parsedCourse.turma
      };
      api[method]("/admin/schedule?formtype=course", data).then(res => {
        if (res.status === 200 || res.status === 201) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    remove() {
      const id = this.course.id;
      api.delete(`/admin/schedule/${id}`).then(res => {
        if (res.status === 201) {
          showSuccess("Minicurso removido da programação!");
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    loadSelect() {
      api.get("/admin/course?loadtitle=1").then(res => {
        if (res.status === 200) {
          this.coursesSelect = res.data.values;
        }
      });
    },
    loadCourses() {
      this.isLoading = true;
      api.get("/admin/schedule").then(res => {
        if (res.status === 200) {
          this.courses = res.data.course;
          this.totalRows = res.data.course.length;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.empty = true;
        }
      });
    },
    selectCourse(course, mode = "save") {
      this.mode = mode;
      this.selected = {
        id: course.id,
        titulo: course.titulo,
        ministrante: course.ministrante
      };
      this.course = { ...course };
      this.incomplete = false;
    },
    reset() {
      this.mode = "save";
      this.course = {};
      this.selected = null;
      this.incomplete = true;
      this.loadCourses();
      this.loadSelect();
    }
  },
  mounted() {
    this.loadSelect();
    this.loadCourses();
  }
};
</script>