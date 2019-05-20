<template>
  <div class="lecture-schedule">
    <b-form v-if="lectures && lectures.length">
      <input id="lecture-id" type="hidden" v-model="lecture.id">
      <b-row>
        <b-col md="5">
          <b-form-group
            label="Selecione a palestra:"
            description="Padrão: (Nome do minicurso) • (Palestrante)"
            label-for="lecture"
          >
            <v-select
              id="lecture"
              :disabled="mode === 'remove'"
              label="titulo"
              v-model="selected"
              :options="lectureSelect"
              placeholder="Selecione uma opção"
            >
              <!-- dropdown pra selecionar -->
              <template slot="option" slot-scope="option">{{option.titulo}} • {{option.ministrante}}</template>
              <!-- ./dropdown pra selecionar -->
              <!-- método ja selecionado -->
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">{{option.titulo}} • {{option.ministrante}}</div>
              </template>
              <!-- ./metodo ja selecionado -->
              <!-- sem opcoes -->
              <slot name="no-options">Não encontramos nenhuma palestra.</slot>
              <!-- ./sem opcoes -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" label-for="lecture-location" description="Exemplo: PVA 235">
            <b-form-input
              id="lecture-location"
              type="text"
              v-model="lecture.local"
              placeholder="Local"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group
            label="Data Início"
            label-for="lecture-start"
            description="Digite data e depois horário"
          >
            <the-mask
              label="Date"
              id="lecture-start"
              mask="##/##/#### ##:##"
              placeholder="Data Início"
              :readonly="mode === 'remove'"
              v-model="lecture.data_inicio"
              class="form-control"
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group label="Data Fim" label-for="lecture-end">
            <the-mask
              label="Date"
              id="lecture-end"
              mask="##/##/#### ##:##"
              placeholder="Data Fim"
              v-model="lecture.data_fim"
              class="form-control"
              :readonly="mode === 'remove'"
              required
              :masked="false"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'" @click="checkForm">Salvar</b-btn>
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

    <h2 class="text-center text-uppercase" v-else>Não há nenhuma palestra cadastrada</h2>

    <!-- TABELA -->
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      :items="lectures"
      empty-text="Não há nenhuma palestra cadastrada"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} palestras encontradas</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhuma palestra encontrada</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectLecture(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectLecture(data.item, 'remove')" class="mr-2">
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
  name: "LectureSchedule",
  data() {
    return {
      lectureSelect: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      lecture: {},
      selected: null,
      lectures: [],
      fields: [
        { key: "titulo", label: "Título", sortable: true },
        {
          key: "dia",
          label: "Dia",
          formatter: value => {
            switch (value) {
              case 0:
                return (value = "Segunda-Feira");
              case 1:
                return (value = "Terça-Feira");
              case 2:
                return (value = "Quarta-Feira");
              case 3:
                return (value = "Quinta-Feira");
              case 4:
                return (value = "Sexta-Feira");
              case 5:
                return (value = "Sábado");
              case 6:
                return (value = "Domingo");
            }
          }
        },
        { key: "local", label: "Local" },
        { key: "ministrante", label: "Palestrante", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    formatDateTime(value) {
      return (
        value.substring(0, 2) +
        "/" +
        value.substring(2, 4) +
        "/" +
        value.substring(4, 8) +
        " " +
        value.substring(8, 10) +
        ":" +
        value.substring(10, 12)
      );
    },
    checkForm(e) {
      this.errors = [];

      if (!this.selected) {
        let msg = "Selecione uma palestra";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.lecture.data_inicio) {
        let msg = "Selecione uma data de ínicio";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.lecture.data_fim) {
        let msg = "Selecione uma data fim";
        this.errors.push(msg);
        showError(msg);
      } else if (!this.lecture.local) {
        let msg = "Informe um local";
        this.errors.push(msg);
        showError(msg);
      }

      if (!this.errors.length) {
        return this.save();
      }

      e.preventDefault();
    },
    save() {
      let parsedLecture = JSON.parse(JSON.stringify(this.lecture));
      let parsedSelected = JSON.parse(JSON.stringify(this.selected));
      const method = parsedLecture.id ? "put" : "post";
      if (method === "post") {
        parsedLecture.data_inicio = this.formatDateTime(
          parsedLecture.data_inicio
        );
        parsedLecture.data_fim = this.formatDateTime(parsedLecture.data_fim);
        parsedLecture.lecture_id = parsedSelected.id;
      }
      if (parsedLecture.data_inicio.length === 12)
        parsedLecture.data_inicio = this.formatDateTime(parsedLecture.data_inicio);
      if (parsedLecture.data_fim.length === 12)
        parsedLecture.data_fim = this.formatDateTime(parsedLecture.data_fim);
      const data = {
        lecture_id: parsedLecture.lecture_id,
        id: parsedLecture.id,
        dia: parsedLecture.dia,
        local: parsedLecture.local,
        data_inicio: parsedLecture.data_inicio,
        data_fim: parsedLecture.data_fim
      };
      api[method]("/admin/schedule?formtype=lecture", data).then(res => {
        if (res.status === 200 || res.status === 201) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    remove() {
      const id = this.lecture.id;
      api.delete(`/admin/schedule/${id}`).then(res => {
        if (res.status === 200) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    loadSelect() {
      api.get("/admin/lecture?loadtitle=1").then(res => {
        if (res.status === 200) {
          this.lectureSelect = res.data.values;
        }
      });
    },
    loadLectures() {
      api.get("/admin/schedule").then(res => {
        if (res.status === 200) {
          this.lectures = res.data.lecture;
          this.totalRows = res.data.lecture.length;
        } else {
          showError(res.data.message);
        }
      });
    },
    selectLecture(lecture, mode = "save") {
      this.mode = mode;
      this.selected = {
        id: lecture.id,
        titulo: lecture.titulo,
        ministrante: lecture.ministrante
      };
      this.lecture = { ...lecture };
    },
    reset() {
      this.mode = "save";
      this.lecture = {};
      this.selected = null;
      this.loadLectures();
      this.loadSelect();
    }
  },
  mounted() {
    this.loadLectures();
    this.loadSelect();
  }
};
</script>