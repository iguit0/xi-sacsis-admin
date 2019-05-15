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
              v-model="speaker.resumo"
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

    <h2 class="text-center text-uppercase" v-else>Nenhum ministrante cadastrado!</h2>

    <!-- TABELA -->
    <b-table
      stacked="md"
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
        <b-btn size="sm" variant="primary" @click="info(data.item, $event.target)" class="mr-2">
          <v-icon name="info-circle"/>
        </b-btn>
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
    <!-- Info modal -->
    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <ul>
        <li class="py-1">
          Nome:
          <span class="font-weight-bold">{{content.nome}}</span>
        </li>
        <li class="py-1">
          Resumo:
          <span class="font-weight-bold">{{content.resumo}}</span>
        </li>
        <li class="py-1">
          RG:
          <span class="font-weight-bold">{{content.rg}}</span>
        </li>
        <li class="py-1">
          CPF:
          <span class="font-weight-bold">{{content.cpf}}</span>
        </li>
        <li class="py-1">
          Facebook:
          <span class="font-weight-bold">{{content.facebook}}</span>
        </li>
        <li>
          Instagram:
          <span class="font-weight-bold">{{content.instagram}}</span>
        </li>
        <li class="py-1">
          E-mail:
          <span class="font-weight-bold">{{content.email}}</span>
        </li>
        <li class="py-1">
          Telefone:
          <span class="font-weight-bold">{{content.telefone}}</span>
        </li>
        <li class="py-1">
          Site:
          <span class="font-weight-bold">{{content.site}}</span>
        </li>
        <li class="py-1">
          Ocupação:
          <span class="font-weight-bold">{{content.ocupacao}}</span>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import { showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "SpeakerAdmin",
  data() {
    return {
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      incomplete: true,
      content: {},
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "ocupacao", label: "Ocupação" },
        { key: "actions", label: "Ações" }
      ],
      speaker: {},
      speakers: []
    };
  },
  methods: {
    info(item, button) {
      this.infoModal.title = `Detalhes de ${item.nome}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.content = JSON.parse(JSON.stringify(item));
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.content = "";
      this.infoModal.content = "";
    },
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
    save() {
      let parsedSpeaker = JSON.parse(JSON.stringify(this.speaker));
      const data = {
        id: parsedSpeaker.id,
        nome: parsedSpeaker.nome,
        rg: parsedSpeaker.rg,
        cpf: parsedSpeaker.cpf,
        facebook: parsedSpeaker.facebook,
        twitter: parsedSpeaker.twitter,
        instagram: parsedSpeaker.instagram,
        email: parsedSpeaker.email,
        telefone: parsedSpeaker.telefone,
        site: parsedSpeaker.site,
        ocupacao: parsedSpeaker.ocupacao
      };
      api.put("/admin/speaker", data).then(res => {
        if (res.status === 200) {
          let successMsg = res.data.message;
          showSuccess(successMsg);
          this.reset();
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
          this.reset();
        }
      });
    },
    remove() {
      const id = this.speaker.id;
      api.delete(`/admin/speaker/${id}`).then(res => {
        if (res.status === 200) {
          let successMsg = res.data.message;
          showSuccess(successMsg);
          this.reset();
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
          this.reset();
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
      this.speaker = { ...speaker };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadSpeakers();
  }
};
</script>
