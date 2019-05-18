<template>
  <div>
    <PageTitle icon="scroll" main="Relatórios" sub="Visualizar planilhas, etc"/>
    <b-container fluid>
      <b-row>
        <!-- Programação -->
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">DADOS DE PROGRAMAÇÃO</h2>
          <b-btn
            size="lg"
            :disabled="isLoading"
            variant="primary"
            block
            @click="downloadSchedule('csv')"
          >
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">DADOS DE PROGRAMAÇÃO</h2>
          <b-btn size="lg" variant="warning" block @click="downloadSchedule('xls')">
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
          <b-btn size="lg" variant="primary" block @click="downloadPayments('csv')">
            <v-icon scale="2" name="file-csv"/>
            <span class="ml-2 title text-uppercase">Baixar .CSV</span>
          </b-btn>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase title mb-3">PAGAMENTOS</h2>
          <b-btn size="lg" variant="warning" block @click="downloadPayments('xls')">
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
import api from "@/services/api";
import { showSuccess, showError, baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "ReportsPage",
  components: { PageTitle },
  data() {
    return {
      isLoading: false,
      filetype: 0
    };
  },
  methods: {
    downloadSchedule(type) {
      let filename = "xisacsis_dados_programacao";
      if (type === "csv") {
        this.filetype = 1;
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
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: "arraybuffer"
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
      let filename = "xisacsis_dados_programacao";
      if (type === "csv") {
        this.filetype = 1;
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
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`,
              responseType: "arraybuffer"
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
    }
  }
};
</script>
