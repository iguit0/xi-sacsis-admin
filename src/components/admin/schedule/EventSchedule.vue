<template>
  <div class="event-schedule">
    <b-form>
      <b-row>
        <b-col md="3">
          <b-form-group label="Título:" description="Exemplo: Campeonato de CSGO">
            <b-input type="text" placeholder="Título" v-model="event.titulo"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Descrição" label-for="event-description">
            <b-form-textarea
              v-model="event.descricao"
              id="event-description"
              type="text"
              rows="3"
              no-resize
              placeholder="Descrição"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235">
            <b-input type="text" v-model="event.local" placeholder="Local"/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group
            label="Data Início:"
            label-for="event-start"
            description="Selecione a data e depois horário"
          >
            <date-pick
              id="event-start"
              v-model="event.data_inicio"
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
          <b-form-group label="Data Fim:" label-for="event-end">
            <date-pick
              id="event-end"
              v-model="event.data_fim"
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
    <b-row>
      <b-col xs="6" class="mb-3">
        <b-btn variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-btn>
        <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import api from "@/services/api";
import { showError, showSuccess } from "@/global";

export default {
  name: "EventSchedule",
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
      mode: "save",
      event: {},
      events: []
    };
  },
  methods: {
    save() {
      let parsedEvent = JSON.parse(JSON.stringify(this.event));
      const data = {
        local: parsedEvent.local,
        data_inicio: parsedEvent.data_inicio,
        data_fim: parsedEvent.data_fim,
        titulo: parsedEvent.titulo,
        descricao: parsedEvent.descricao
      };
      api.post("/admin/schedule?formtype=other", data).then(res => {
        if (res.status === 200) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    reset() {
      this.mode = "save";
      this.event = {};
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