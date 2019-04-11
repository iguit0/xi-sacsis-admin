<template>
  <div class="course-admin">
    <b-form>
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
        <b-col md="3" sm="2">
          <b-form-group label="Descrição:" label-for="course-description">
            <b-form-textarea
              id="course-description"
              type="text"
              v-model="course.descricao"
              required
              rows="3"
              no-resize
              placeholder="Descrição"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2" v-show="mode === 'save'">
          <b-form-group label="Início:" label-for="course-start">
            <date-pick
              id="course-start"
              v-model="course.data_inicio"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
              :readonly="mode === 'remove'"
            />
            <!--<b-form-input
              id="course-start"
              type="text"
              v-model="course.data_inicio"
              required
              placeholder="Data Início"
              :readonly="mode === 'remove'"
            />-->
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2" v-show="mode === 'save'">
          <b-form-group label="Fim:" label-for="course-end">
            <date-pick
              id="course-end"
              v-model="course.data_fim"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
              :readonly="mode === 'remove'"
            />
            <!--<b-form-input
              id="course-end"
              type="datetime"
              v-model="course.data_fim"
              required
              placeholder="Data Fim"
              :readonly="mode === 'remove'"
            />-->
          </b-form-group>
        </b-col>
        <b-col md="2" sm="2" v-show="mode === 'save'">
          <b-form-group label="Vagas:" label-for="course-attendance">
            <b-form-input
              type="number"
              id="course-attendance"
              v-model="course.vagas"
              required
              placeholder="Vagas"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
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
        <b-btn variant="warning" @click="selectCourse(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn variant="danger" @click="selectCourse(data.item, 'remove')" class="mr-2">
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
import moment from "moment";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "CoursesAdmin",
  components: { DatePick },
  data() {
    return {
      weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
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
        { key: "descricao", label: "Descrição" },
        {
          key: "data_inicio",
          label: "Inicio",
          formatter: value =>
            moment(String(value))
              .locale("pt-br")
              .format("lll")
        },
        {
          key: "data_fim",
          label: "Fim",
          formatter: value =>
            moment(String(value))
              .locale("pt-br")
              .format("lll")
        },
        { key: "vagas", label: "Vagas" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedCourse = JSON.parse(JSON.stringify(this.course));
      const method = this.course.id ? "put" : "post";
      const id = this.course.id ? `/${this.course.id}` : "";
      axios[method](`${baseApiUrl}/admin/course/${id}`, {
        titulo: parsedCourse.titulo,
        descricao: parsedCourse.descricao,
        vagas: parsedCourse.vagas,
        ministrante_id: parsedCourse.ministrante_id,
        data_inicio: parsedCourse.data_inicio,
        data_fim: parsedCourse.data_fim
      })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.course.id;
      axios
        .delete(`${baseApiUrl}/admin/course/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.student = {};
      this.loadCourses();
    },
    loadCourses() {
      axios
        .get(`${baseApiUrl}/admin/course`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.courses = res.data.minicursos;
          this.totalRows = res.data.minicursos.length;
        });
    },
    selectCourse(course, mode = "save") {
      this.mode = mode;
      this.course = { ...course };
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

<style>
.vdpArrowPrev:after {
  border-right-color: #333;
}

.vdpArrowNext:after {
  border-left-color: #333;
}

.vdpCell.selectable:hover .vdpCellContent,
.vdpCell.selected .vdpCellContent {
  background: #333;
}

.vdpCell.today {
  color: #333;
}

.vdpTimeUnit > input:hover,
.vdpTimeUnit > input:focus {
  border-bottom-color: #333;
}

.vdpComponent.vdpWithInput > input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.vdpComponent.vdpWithInput > input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
