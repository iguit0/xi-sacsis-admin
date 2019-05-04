<template>
  <div class="payment-admin">
    <b-form>
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
                <div class="selected d-center">{{option.valor}}</div>
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
          <b-btn variant="danger" v-if="mode === 'remove'">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <h2 class="text-center text-uppercase">Nenhum pagamento registrado!</h2>

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
          <strong>{{totalRows}} pagementos encontrados</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum pagamento registrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectCourse(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn size="sm" variant="danger" @click="selectCourse(data.item, 'remove')" class="mr-2">
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
      payments: [],
      users: [],
      tickets: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedTicket = JSON.parse(JSON.stringify(this.ticket));
      let parsedUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        user_id: parsedTicket.id,
        lote_id: parsedUser.id
      };
      api.post("/admin/payment", data).then(res => {
        if (res.status === 200) {
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    loadUsers() {
      api.get("/admin/user?onlyadm=0&loadname=1").then(res => {
        if (res.status === 200) {
          this.users = res.data;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    loadPayments() {
      api.get("/admin/payment").then(res => {
        if (res.status === 200) {
          this.payments = res.data;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    loadTickets() {
      api.get("/admin/payment/lot?loadvalue=0").then(res => {
        if (res.status === 200) {
          this.tickets = res.data.lotes;
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
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
      this.mode = mode;
      this.payment = { ...payment };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadUsers();
    this.loadTickets();
    //this.loadPayments();
  }
};
</script>
