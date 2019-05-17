<template>
  <div class="payment-admin">
    <b-form>
      <input id="payment-id" type="hidden" v-model="payment.id">
      <b-row>
        <b-col md="4">
          <b-form-group
            label="Selecione participante:"
            description="Padrão: (Nome do aluno) • (Matrícula)"
            label-for="user"
          >
            <v-select
              label="nome"
              id="user"
              v-model="user"
              :options="users"
              placeholder="Selecione uma opção"
            >
              <!-- dropdown pra selecionar -->
              <template slot="option" slot-scope="option">{{option.nome}} • {{option.matricula}}</template>
              <!-- ./dropdown pra selecionar -->
              <!-- método ja selecionado -->
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">{{option.nome}} • {{option.matricula}}</div>
              </template>
              <!-- ./metodo ja selecionado -->
              <!-- sem opcoes -->
              <slot name="no-options">Não encontramos nenhum participante.</slot>
              <!-- ./sem opcoes -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group
            label="Selecione um lote:"
            description="Padrão: (Valor) • (Responsável)"
            label-for="ticket"
          >
            <v-select
              id="ticket"
              label="valor"
              v-model="ticket"
              :options="tickets"
              placeholder="Selecione uma opção"
            >
              <!-- dropdown pra selecionar -->
              <template slot="option" slot-scope="option">{{option.valor}} • {{option.admin_nome}}</template>
              <!-- ./dropdown pra selecionar -->
              <!-- método ja selecionado -->
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">{{option.valor}} • {{option.admin_nome}}</div>
              </template>
              <!-- ./metodo ja selecionado -->
              <!-- sem opcoes -->
              <slot name="no-options">Não encontramos nenhum participante.</slot>
              <!-- ./sem opcoes -->
            </v-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn
            variant="primary"
            :disabled="!user && !ticket"
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
    <h2
      class="text-center text-uppercase"
      v-if="!tickets && !tickets.length"
    >Nenhum pagamento registrado!</h2>

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      show-empty
      empty-text="Não há nenhum pagamento registrado"
      :items="payments"
      :fields="fields"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} pagamentos encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum pagamento registrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectPayment(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn
          size="sm"
          variant="primary"
          @click="paymentInfo(data.item, $event.target)"
          class="mr-2"
        >
          <v-icon name="info-circle"/>
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
      :id="paymentModal.id"
      :title="paymentModal.title"
      ok-only
      @hide="resetPaymentModal"
    >
      <ul>
        <li class="py-1">
          Nome:
          <span class="font-weight-bold">{{paymentContent.user_nome}}</span>
        </li>
        <li>
          Autorizado por:
          <span class="font-weight-bold">{{paymentContent.admin_nome}}</span>
        </li>
        <li>
          Lote Número:
          <span class="font-weight-bold">{{paymentContent.lote_id}}</span>
        </li>
        <li>
          Lote Valor:
          <span class="font-weight-bold">{{paymentContent.valor}}</span>
        </li>
        <li>
          Data Pagamento:
          <span
            class="font-weight-bold"
          >{{paymentContent.data_pagamento | formatDate}}</span>
        </li>
        <li>
          Data Modificação:
          <span
            class="font-weight-bold"
          >{{paymentContent.data_modificacao | formatDate}}</span>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import { showError, showSuccess } from "@/global";
import api from "@/services/api";
import moment from "moment";

export default {
  name: "PaymentAdmin",
  data() {
    return {
      incomplete: true,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      user: null,
      ticket: null,
      payment: {},
      paymentContent: {},
      paymentModal: {
        id: "payment-modal",
        title: "",
        content: ""
      },
      payments: [],
      users: [],
      tickets: [],
      fields: [
        { key: "user_nome", label: "Participante", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        {
          key: "data_pagamento",
          label: "Pago em",
          formatter: value =>
            moment(String(value))
              .locale("pt-br")
              .format("lll")
        },
        { key: "actions", label: "Ações" }
      ]
    };
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
  methods: {
    paymentInfo(item, button) {
      this.paymentModal.title = "Detalhes de pagamento";
      this.paymentModal.content = JSON.stringify(item, null, 2);
      this.paymentContent = JSON.parse(JSON.stringify(item));
      this.$root.$emit("bv::show::modal", this.paymentModal.id, button);
    },
    resetPaymentModal() {
      this.paymentModal.title = "";
      this.paymentContent = "";
      this.paymentModal.content = "";
    },
    save() {
      let parsedTicket = JSON.parse(JSON.stringify(this.ticket));
      let parsedUser = JSON.parse(JSON.stringify(this.user));
      const method = parsedTicket.id ? "put" : "post";
      const data = {
        user_id: parsedUser.id,
        lote_id: parsedTicket.id
      };
      api[method]("/admin/payment", data).then(res => {
        if (res.status === 201) {
          showSuccess(res.data.message);
          this.reset();
        } else {
          showError(res.data.message);
          this.reset();
        }
      });
    },
    loadUsers() {
      api.get("/admin/user?onlyadm=0&loadname=1").then(res => {
        if (res.status === 200) {
          this.users = res.data;
        } else {
          showError(res.data.message);
        }
      });
    },
    loadPayments() {
      api.get("/admin/payment").then(res => {
        if (res.status === 200) {
          this.payments = res.data.pagamentos;
          this.totalRows = res.data.pagamentos.length;
        } else {
          showError(res.data.message);
        }
      });
    },
    loadTickets() {
      api.get("/admin/payment/lot?loadvalue=0").then(res => {
        if (res.status === 200) {
          this.tickets = res.data.lotes;
        } else {
          showError(res.data.message);
        }
      });
    },
    reset() {
      this.mode = "save";
      this.user = null;
      this.ticket = null;
      this.incomplete = true;
      this.loadPayments();
    },
    selectPayment(payment, mode = "save") {
      this.user = {
        id: payment.user_id,
        nome: payment.user_nome
      };
      this.ticket = {
        id: payment.lote_id,
        valor: payment.valor,
        admin_nome: payment.admin_nome
      };
      this.mode = mode;
      this.payment = { ...payment };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadUsers();
    this.loadTickets();
    this.loadPayments();
  }
};
</script>
