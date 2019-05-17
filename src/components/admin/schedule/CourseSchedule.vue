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
              v-model="selected"
              :options="courses"
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
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235" label-for="course-location">
            <b-input type="text" v-model="course.local" id="course-location" placeholder="Local"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-group label="Turma:" label-for="course-turma">
            <b-input type="number" id="course-turma" v-model="course.turma" placeholder="Turma"/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Vagas:" label-for="course-vacancies">
            <b-input
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
          <b-btn variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-btn>
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
      incomplete: true,
      isLoading: false,
      empty: false,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      selected: null,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "titulo", label: "Título", sortable: true },
        { key: "conteudo", label: "Descrição" },
        { key: "ministrante", label: "Ministrante" },
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
      const data = {
        course_id: parsedSelected.id,
        local: parsedCourse.local,
        data_inicio: parsedCourse.data_inicio,
        data_fim: parsedCourse.data_fim,
        vagas: parsedCourse.vagas,
        turma: parsedCourse.turma
      };
      api.post("/admin/schedule?formtype=course", data).then(res => {
        if (res.status === 200) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    loadCourses() {
      this.isLoading = true;
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos;
          this.totalRows = res.data.minicursos.length;
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
      this.course = { ...course };
      this.incomplete = false;
    },
    reset() {
      this.mode = "save";
      this.course = {};
      this.selected = null;
      this.incomplete = true;
      this.loadCourses();
    }
  },
  mounted() {
    this.loadCourses();
  }
};
</script>