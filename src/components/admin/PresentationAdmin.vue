<template>
  <div class="presentation-admin">
    <b-form v-if="presentations && presentations.length">
      <input id="presentation-id" type="hidden" v-model="presentation.id">
      <b-row>
        <b-col md="3" sm="6">
          <b-form-group label="Título:" label-for="presentation-title">
            <b-form-input
              id="presentation-title"
              type="text"
              v-model="presentation.titulo"
              required
              placeholder="Título"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="2">
          <b-form-group label="Descrição:" label-for="presentation-description">
            <b-form-textarea
              id="presentation-description"
              type="text"
              v-model="presentation.conteudo"
              rows="3"
              no-resize
              placeholder="Descrição"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="2">
          <b-form-group label="Palestrante:" label-for="presentation-speaker">
            <b-input
              id="presentation-speaker"
              type="text"
              v-model="presentation.ministrante"
              placeholder="Palestrante"
              readonly
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
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <h2 class="text-center text-uppercase" v-else>Nenhuma palestra cadastrada!</h2>
    <!-- TABELA -->
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      :items="presentations"
      empty-text="Não há nenhuma palestra cadastrada"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} palestrantes encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum palestrante encontrado</strong>
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
import { showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "PresentationAdmin",
  data() {
    return {
      incomplete: true,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      presentation: {},
      presentations: [],
      fields: [
        { key: "titulo", label: "Título", sortable: true },
        { key: "conteudo", label: "Descrição" },
        { key: "ministrante", label: "Palestrante" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedPresentation = JSON.parse(JSON.stringify(this.presentation));
      const data = {
        id: parsedPresentation.id,
        titulo: parsedPresentation.titulo,
        conteudo: parsedPresentation.conteudo
      };
      api.put("/admin/lecture", data).then(res => {
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
      const id = this.presentation.id;
      api.delete(`/admin/lecture/${id}`).then(res => {
        if (res.status === 201) {
          showSuccess('Palestra removida com sucesso!');
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    loadPresentations() {
      api.get("/admin/lecture?loadtitle=0").then(res => {
        this.presentations = res.data.palestras;
        this.totalRows = res.data.palestras.length;
      });
    },
    selectSpeaker(presentation, mode = "save") {
      this.mode = mode;
      this.presentation = { ...presentation };
      this.incomplete = false;
    },
    reset() {
      this.mode = "save";
      this.presentation = {};
      this.incomplete = true;
      this.loadPresentations();
    }
  },
  mounted() {
    this.loadPresentations();
  }
};
</script>

