<template>
  <div class="ticket-admin">
    <b-form v-if="tickets && ticket.length">
      <b-row>teste</b-row>
    </b-form>
    <h2 class="text-center text-uppercase" v-else>Nenhum lote cadastrado!</h2>
  </div>
</template>

<script>
import { baseApiUrl, showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "TicketAdmin",
  data() {
    return {
      ticket: {},
      tickets: []
    };
  },
  methods: {
    loadTickets() {
      api.get("/admin/payment/lot").then(res => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
    },
    reset() {
      this.mode = "save";
      this.ticket = {};
      this.incomplete = true;
      this.loadTickets();
    },
    selectTicket(ticket, mode = "save") {
      this.mode = mode;
      this.ticket = { ...ticket };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadTickets();
  }
};
</script>
