<template>
  <div class="lecture-schedule">
    <b-form>
      <input id="lecture-id" type="hidden" v-model="lecture.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Local:" label-for="lecture-location">
            <b-form-input
              id="lecture-location"
              type="text"
              required
              placeholder="Local"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="6">
          <b-form-group label="Data Início" label-for="lecture-start" class="mw-50">
            <date-pick
              id="lecture-start"
              :inputAttributes="{readonly: true}"
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
        <b-col md="3" sm="6" class="mx-0">
          <b-form-group label="Data Fim" label-for="lecture-end">
            <date-pick
              id="lecture-end"
              :inputAttributes="{readonly: true}"
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
import { baseApiUrl, showError, showSuccess } from "@/global";
import api from "@/services/api";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "LectureSchedule",
  components: { DatePick },
  data() {
    return {
      weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Do"],
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
      incomplete: true,
      mode: "save",
      lecture: {},
      lectures: []
    };
  },
  methods: {
    loadLectures() {
      api.get("/admin/payment").then(res => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    reset() {
      this.mode = "save";
      this.lecture = {};
      this.incomplete = true;
      //this.loadPayments();
    },
    selectLecture(lecture, mode = "save") {
      this.mode = mode;
      this.lecture = { ...lecture };
      this.incomplete = false;
    }
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