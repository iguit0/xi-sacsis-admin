<template>
  <div class="payment-admin">
    <b-form>
      <b-row>
        <b-col>
          <b-form-group label="Selecione participante">teste</b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <h2 class="text-center text-uppercase">Nenhum pagamento cadastrado!</h2>
  </div>
</template>

<script>
import { showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "PaymentAdmin",
  data() {
    return {
      payment: {},
      payments: [],
      user: {},
      users: [],
      tickets: []
    };
  },
  methods: {
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
          console.log(res.data);
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
    selectFromParentComponent1() {
      this.user.id = this.users[0].id;
      this.user.nome = this.users[0].nome;
      this.user.matricula = this.users[0].matricula;
    },
    reset() {
      this.mode = "save";
      this.ticket = {};
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
    //this.loadPayments();
  }
};
</script>
