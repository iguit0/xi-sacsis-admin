<template>
  <div class="course-schedule">
    <b-form>
      <input id="course-id" type="hidden" v-model="course.id">
      <b-row>
        <b-col md="4">
          {{courses}}
          <b-form-group label="Selecionar minicurso:">
            <v-select
              label="nome"
              id="user"
              v-model="user"
              :options="users"
              placeholder="Selecione uma opção"
            ></v-select>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local" description="Exemplo: PVA 235">
            <b-input type="number" placeholder="Local" v-model="course.local"/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group
            label="Data Início"
            label-for="course-start"
            description="Selecione a data e depois horário"
          >
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
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Data Fim" label-for="course-end">
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
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import api from "@/services/api";
import { showError, showSuccess } from "@/global";

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
      courses: [],
      course: {}
    };
  },
  methods: {
    loadCourses() {
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
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