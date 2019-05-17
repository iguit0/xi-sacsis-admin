<template>
  <div class="ticket-admin">
    <b-form>
      <input id="course-id" type="hidden" v-model="ticket.id">
      <b-row>
        <b-col md="4">
          <b-form-group
            label="Responsável:"
            label-for="ticket-admin"
            description="Quem criou o lote"
          >
            <b-input type="text" v-model="ticket.admin_nome" placeholder="Responsável" readonly/>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Valor do Lote:" label-for="ticket-value">
            <b-input type="number" v-model="ticket.valor" placeholder="Valor do Lote"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn
            :disabled="!ticket.valor"
            variant="primary"
            v-if="mode === 'save'"
            @click="save"
          >Salvar</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <h2 class="text-center text-uppercase" v-if="!tickets">Nenhum lote cadastrado!</h2>
    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      show-empty
      empty-text="Não há nenhum lote cadastrado"
      :items="tickets"
      :fields="fields"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} lotes encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum lote encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectTicket(data.item)" class="mr-2">
          <v-icon name="edit"/>
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
import moment from "moment";

export default {
  name: "TicketAdmin",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "admin_nome", label: "Responsável", sortable: true },
        {
          key: "data_criacao",
          label: "Criado em",
          formatter: value =>
            moment(String(value))
              .locale("pt-br")
              .format("lll")
        },
        {
          key: "data_modificacao",
          label: "Modificado em",
          formatter: value =>
            moment(String(value))
              .locale("pt-br")
              .format("lll")
        },
        { key: "actions", label: "Ações" }
      ],
      ticket: {},
      tickets: []
    };
  },
  methods: {
    save() {
      let parsedTicket = JSON.parse(JSON.stringify(this.ticket));
      const method = parsedTicket.id ? "put" : "post";
      const data = {
        id: parsedTicket.id,
        valor: parsedTicket.valor
      };
      api[method]("/admin/payment/lot", data).then(response => {
        if (response.status === 200 || response.status === 201) {
          let successMsg = response.data.message;
          showSuccess(successMsg);
          this.reset();
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.reset();
        }
      });
    },
    loadTickets() {
      api.get("/admin/payment/lot?loadvalue=0").then(res => {
        if (res.status === 200) {
          this.tickets = res.data.lotes;
          this.totalRows = res.data.lotes.length;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    reset() {
      this.mode = "save";
      this.ticket = {};
      this.loadTickets();
    },
    selectTicket(ticket, mode = "save") {
      this.mode = mode;
      this.ticket = { ...ticket };
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value))
          .locale("pt-br")
          .format("lll");
      }
    }
  },
  mounted() {
    this.loadTickets();
  }
};
</script>
