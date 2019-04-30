<template>
  <div class="speaker-admin">
    <b-form v-if="speakers && speakers.length">
      <input id="speaker-id" type="hidden" v-model="speaker.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Nome:" label-for="speaker-name">
            <b-form-input
              id="speaker-name"
              type="text"
              v-model="speaker.nome"
              required
              placeholder="Nome"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="6">
          <b-form-group label="Descrição:" label-for="speaker-description">
            <b-form-textarea
              id="speaker-description"
              type="text"
              v-model="speaker.conteudo"
              rows="3"
              no-resize
              placeholder="Descrição"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="2">
          <b-form-group label="E-mail:" label-for="course-email">
            <b-input
              id="course-email"
              type="text"
              v-model="speaker.email"
              placeholder="E-mail"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <h2 class="text-center text-uppercase" v-else>Nenhum ministrante cadastrado!</h2>

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      show-empty
      empty-text="Não há nenhum ministrante cadastrado"
      :items="speakers"
      :fields="fields"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} ministrantes encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum ministrante encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectSpeaker(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectSpeaker(data.item, 'remove')" class="mr-2">
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
import { baseApiUrl, showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "SpeakerAdmin",
  data() {
    return {
      incomplete: true,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "resumo", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      speaker: {},
      speakers: []
    };
  },
  methods: {
    loadSpeakers() {
      api.get("/admin/speaker").then(res => {
        if (res.status === 200) {
          this.speakers = res.data.ministrantes;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    reset() {
      this.mode = "save";
      this.speaker = {};
      this.incomplete = true;
      this.loadSpeakers();
    },
    selectSpeaker(speaker, mode = "save") {
      this.mode = mode;
      this.ticket = { ...speaker };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadSpeakers();
  }
};
</script>
