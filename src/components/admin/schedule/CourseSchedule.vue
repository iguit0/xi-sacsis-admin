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
            <v-select :options="courses" placeholder="Selecione uma opção">
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
            description="Selecione a data e depois horário"
          >
            <date-pick
              id="course-start"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Data Fim:" label-for="course-end">
            <date-pick
              id="course-end"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235" label-for="course-location">
            <b-input type="text" id="course-location" placeholder="Local"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2">
          <b-form-group label="Turma:" label-for="course-turma">
            <b-input type="number" id="course-turma" placeholder="Turma"/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Vagas:" label-for="course-vacancies">
            <b-input type="number" id="course-vacancies" placeholder="Vagas"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'">Salvar</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
      </b-row>
    </b-form>
    <h2 class="text-center text-uppercase">Não há minicursos cadastrados</h2>

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
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import api from "@/services/api";
import { showError } from "@/global";

export default {
  name: "CourseSchedule",
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
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      mode: "save",
      courses: [],
      course: null
    };
  },
  methods: {
    loadCourses() {
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos;
        }
      });
    },
    reset() {
      this.mode = "save";
      this.loadCourses();
    }
  },
  mounted() {
    this.loadCourses();
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