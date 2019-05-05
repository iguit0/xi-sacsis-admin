<template>
  <div class="event-schedule">
    <b-form>
      <b-row>
        <b-col md="3">
          <b-form-group label="Título:" description="Exemplo: Campeonato de CSGO">
            <b-input type="text" placeholder="Título"/>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Descrição" label-for="event-description">
            <b-form-textarea
              id="speaker-description"
              type="text"
              rows="3"
              no-resize
              placeholder="Descrição"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235">
            <b-input type="text" placeholder="Local"/>
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
          <b-btn
            variant="primary"
            :disabled="incomplete"
            v-if="mode === 'save'"
            @click="save"
          >Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

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
      mode: 'save'
    };
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