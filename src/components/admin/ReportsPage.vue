<template>
  <div>
    <PageTitle icon="scroll" main="Relatórios" sub="Visualizar planilhas, etc"/>
    <b-container fluid>
      <b-row>
        <!-- Programação -->
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">DADOS DE PROGRAMAÇÃO</h2>
          <b-btn size="lg" disabled variant="primary" block @click="downloadSchedule('csv')">
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">DADOS DE PROGRAMAÇÃO</h2>
          <b-btn disabled size="lg" variant="warning" block @click="downloadSchedule('xls')">
            <v-icon scale="2" name="file-excel"/>
            <span class="ml-2 title text-uppercase">Baixar .XLS</span>
          </b-btn>
        </b-col>
        <div class="w-100 mt-2">
          <hr>
        </div>
        <!-- Pagamentos -->
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">PAGAMENTOS</h2>
          <b-btn
            size="lg"
            :disabled="isLoading"
            variant="primary"
            block
            @click="downloadPayments('csv')"
          >
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">PAGAMENTOS</h2>
          <b-btn
            size="lg"
            :disabled="isLoading"
            variant="warning"
            block
            @click="downloadPayments('xls')"
          >
            <v-icon scale="2" name="file-excel"/>
            <span class="ml-2 title text-uppercase">Baixar .XLS</span>
          </b-btn>
        </b-col>
      </b-row>
      <div class="w-100 mt-2">
        <hr>
      </div>
      <b-row>
        <!-- Minicursos -->
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">minicursos</h2>
          <v-select
            id="course"
            label="titulo"
            class="mb-3"
            v-model="selected"
            :options="coursesSelect"
            placeholder="Selecione um minicurso"
          >
            <!-- dropdown pra selecionar -->
            <template
              slot="option"
              slot-scope="option"
            >{{option.titulo}} • {{option.ministrante}} • Turma {{option.turma}}</template>

            <!-- ./dropdown pra selecionar -->
            <!-- método ja selecionado -->
            <template slot="selected-option" slot-scope="option">
              <div
                class="selected d-center"
              >{{option.titulo}} • {{option.ministrante}} • Turma {{option.turma}}</div>
            </template>
            <!-- ./metodo ja selecionado -->
            <!-- sem opcoes -->
            <slot name="no-options">Não encontramos nenhum minicurso.</slot>
            <!-- ./sem opcoes -->
          </v-select>
          <b-btn size="lg" variant="primary" block @click="downloadCourses('csv')">
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">minicursos</h2>
          <v-select
            id="course"
            label="titulo"
            class="mb-3"
            v-model="selected2"
            :options="coursesSelect"
            placeholder="Selecione um minicurso"
          >
            <!-- dropdown pra selecionar -->
            <template
              slot="option"
              slot-scope="option"
            >{{option.titulo}} • {{option.ministrante}} • Turma {{option.turma}}</template>

            <!-- ./dropdown pra selecionar -->
            <!-- método ja selecionado -->
            <template slot="selected-option" slot-scope="option">
              <div
                class="selected d-center"
              >{{option.titulo}} • {{option.ministrante}} • Turma {{option.turma}}</div>
            </template>
            <!-- ./metodo ja selecionado -->
            <!-- sem opcoes -->
            <slot name="no-options">Não encontramos nenhum minicurso.</slot>
            <!-- ./sem opcoes -->
          </v-select>
          <b-btn size="lg" variant="warning" block @click="downloadCourses('xls')">
            <v-icon scale="2" name="file-excel"/>
            <span class="ml-2 title text-uppercase">Baixar .XLS</span>
          </b-btn>
        </b-col>
      </b-row>
      <div class="w-100 mt-2">
        <hr>
      </div>
      <b-row>
        <!-- Ministrantes -->
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">ministrantes</h2>
          <b-btn size="lg" variant="primary" block @click="downloadSpeakers('csv')">
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">Ministrantes</h2>
          <b-btn size="lg" variant="warning" block @click="downloadSpeakers('xls')">
            <v-icon scale="2" name="file-excel"/>
            <span class="ml-2 title text-uppercase">Baixar .XLS</span>
          </b-btn>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { showSuccess, showError, baseApiUrl } from "@/global";
import axios from "axios";
import api from "@/services/api";

export default {
  name: "ReportsPage",
  components: { PageTitle },
  data() {
    return {
      coursesSelect: [],
      selected: null,
      selected2: null,
      isLoading: false,
      filetype: 0,
      responseType: ""
    };
  },
  methods: {
    downloadSchedule(type) {
      let filename = "xisacsis_dados_programacao";
      if (type === "csv") {
        this.filetype = 1;
        this.responseType = "arraybuffer";
      } else {
        this.filetype = 0;
      }
      this.isLoading = true;
      axios
        .get(
          `${baseApiUrl}/admin/schedule?report=1&csvformat=${
            this.filetype
          }&filename=${filename}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: this.responseType
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.forceFileDownload(res, filename, type);
            showSuccess();
          } else {
            showError();
          }
        });
      this.isLoading = false;
    },
    forceFileDownload(response, filename, extension) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${filename}.${extension}`);
      document.body.appendChild(link);
      link.click();
    },
    downloadPayments(type) {
      let filename = "xisacsis_pagamentos";
      if (type === "csv") {
        this.filetype = 1;
        this.responseType = "arraybuffer";
      } else {
        this.filetype = 0;
      }
      this.isLoading = true;
      axios
        .get(
          `${baseApiUrl}/admin/payment?report=1&csvformat=${
            this.filetype
          }&filename=${filename}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: this.responseType
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.forceFileDownload(res, filename, type);
            showSuccess();
          } else {
            showError();
          }
        });
      this.isLoading = false;
    },
    downloadCourses(type) {
      if (!this.selected) {
        return showError("Escolha um minicurso!");
      }
      let filename = "xisacsis_minicursos";
      if (type === "csv") {
        this.filetype = 1;
        this.responseType = "arraybuffer";
      } else {
        this.filetype = 0;
      }
      axios
        .get(
          `${baseApiUrl}/admin/schedule/${
            this.selected.id
          }?report=1&csvformat=${this.filetype}&filename=${filename}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: this.responseType
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.forceFileDownload(res, filename, type);
            showSuccess();
          } else {
            showError();
          }
        });
    },
    downloadSpeakers(type) {
      let filename = "xisacsis_ministrantes";
      if (type === "csv") {
        this.filetype = 1;
        this.responseType = "arraybuffer";
      } else {
        this.filetype = 0;
      }
      axios
        .get(
          `${baseApiUrl}/admin/speaker?report=1&csvformat=${
            this.filetype
          }&filename=${filename}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: this.responseType
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.forceFileDownload(res, filename, type);
            showSuccess();
          } else {
            showError();
          }
        });
    },
    loadSelect() {
      api.get("/schedule/course").then(res => {
        if (res.status === 200 || res.status === 201) {
          this.coursesSelect = res.data.minicursos;
        }
      });
    }
  },
  mounted() {
    this.loadSelect();
  }
};
</script>
