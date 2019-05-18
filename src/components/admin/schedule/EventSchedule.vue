<template>
  <div class="event-schedule">
    <b-form>
      <b-row>
        <b-col md="3">
          <b-form-group label="Título:" description="Exemplo: Campeonato de CSGO">
            <b-input
              type="text"
              :readonly="mode === 'remove'"
              placeholder="Título"
              v-model="event.titulo"
            />
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group label="Descrição" label-for="event-description">
            <b-form-textarea
              v-model="event.descricao"
              id="event-description"
              type="text"
              rows="3"
              :readonly="mode === 'remove'"
              no-resize
              placeholder="Descrição"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" description="Exemplo: PVA 235">
            <b-input
              type="text"
              :readonly="mode === 'remove'"
              v-model="event.local"
              placeholder="Local"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group
            label="Data Início:"
            label-for="event-start"
            description="Digite a data e depois horário"
          >
            <the-mask
              label="Date"
              id="event-start"
              mask="##/##/#### ##:##"
              placeholder="Data Início"
              :readonly="mode === 'remove'"
              v-model="event.data_inicio"
              class="form-control"
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Data Fim:" label-for="event-end">
            <the-mask
              label="Date"
              id="event-end"
              mask="##/##/#### ##:##"
              placeholder="Data Fim"
              :readonly="mode === 'remove'"
              v-model="event.data_fim"
              class="form-control"
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
      </b-row>
    </b-form>

    <!-- TABELA -->
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      :items="events"
      empty-text="Não há nenhum evento cadastrado"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} evento encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum evento encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectEvent(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectEvent(data.item, 'remove')" class="mr-2">
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
  name: "EventSchedule",
  data() {
    return {
      mode: "save",
      event: {},
      events: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      fields: [
        { key: "titulo", label: "Título", sortable: true },
        { key: "dia", label: "Dia" },
        { key: "descricao", label: "Descrição" },
        { key: "local", label: "Local" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedEvent = JSON.parse(JSON.stringify(this.event));
      const method = parsedEvent.id ? "put" : "post";
      const data = {
        id: parsedEvent.id,
        local: parsedEvent.local,
        data_inicio: parsedEvent.data_inicio,
        data_fim: parsedEvent.data_fim,
        titulo: parsedEvent.titulo,
        descricao: parsedEvent.descricao
      };
      api[method]("/admin/schedule?formtype=other", data).then(res => {
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
      this.loadEvents();
    },
    loadEvents() {
      api
        .get(
          "/admin/schedule?report=0&csvformat=0&filename=export_schedule_data"
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.other);
            this.events = res.data.other;
            this.totalRows = res.data.other.length;
          } else {
            showError(res.data.message);
          }
        });
    },
    selectEvent(event, mode = "save") {
      this.mode = mode;
      event.data_inicio =
        moment(String(event.data_inicio))
          .locale("pt-br")
          .format("L") +
        moment(String(event.data_inicio))
          .locale("pt-br")
          .format("LT");
      event.data_fim =
        moment(String(event.data_fim))
          .locale("pt-br")
          .format("L") +
        moment(String(event.data_fim))
          .locale("pt-br")
          .format("LT");
      this.event = { ...event };
    }
  },
  mounted() {
    this.loadEvents();
  }
};
</script>
