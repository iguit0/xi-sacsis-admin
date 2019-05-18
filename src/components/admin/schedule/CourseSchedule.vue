<template>
  <div class="course-schedule">
    <b-form v-if="courses && courses.length">
      <b-row>
        <b-col md="4">
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
            <the-mask
              label="Date"
              id="course-start"
              mask="##/##/#### ##:##"
              placeholder="Data Início"
              v-model="course.data_inicio"
              class="form-control"
              :readonly="mode === 'remove'"
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Data Fim:" label-for="course-end">
            <the-mask
              label="Date"
              id="course-end"
              mask="##/##/#### ##:##"
              placeholder="Data Fim"
              v-model="course.data_fim"
              class="form-control"
              :readonly="mode === 'remove'"
              required
              :masked="false"
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
          <b-btn
            variant="primary"
            :disabled="incomplete"
            v-if="mode === 'save'"
            @click="save"
          >Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
      </b-row>
    </b-form>
    <h2 v-if="empty" class="text-center text-uppercase">Não há minicursos cadastrados</h2>

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
          <strong>{{totalRows}} minicurso encontradas</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum minicursos encontrado</strong>
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
import moment from "moment";

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
                break;
              case 1:
                return (value = "Terça-Feira");
                break;
              case 2:
                return (value = "Quarta-Feira");
                break;
              case 3:
                return (value = "Quinta-Feira");
                break;
              case 4:
                return (value = "Sexta-Feira");
                break;
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
    save() {
      let parsedCourse = JSON.parse(JSON.stringify(this.course));
      let parsedSelected = JSON.parse(JSON.stringify(this.selected));
      const method = parsedSelected.id ? "put" : "post";
      const data = {
        course_id: parsedSelected.id,
        local: parsedCourse.local,
        data_inicio: parsedCourse.data_inicio,
        data_fim: parsedCourse.data_fim,
        vagas: parsedCourse.vagas,
        turma: parsedCourse.turma
      };
      api[method]("/admin/schedule?formtype=course", data).then(res => {
        if (res.status === 200) {
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
        if (res.status === 200) {
          showSuccess(res.data.message);
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
          showError(res.data.message);
        }
      });
    },
    selectCourse(course, mode = "save") {
      this.mode = mode;
      this.selected = {
        titulo: course.titulo,
        ministrante: course.ministrante
      };
      course.data_inicio =
        moment(String(course.data_inicio))
          .locale("pt-br")
          .format("L") +
        moment(String(course.data_inicio))
          .locale("pt-br")
          .format("LT");
      course.data_fim =
        moment(String(course.data_fim))
          .locale("pt-br")
          .format("L") +
        moment(String(course.data_fim))
          .locale("pt-br")
          .format("LT");
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