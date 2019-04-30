<template>
  <div class="payment-admin">
    <b-form>
      <b-row>
        <b-col>teste</b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError, showSuccess } from "@/global";
import api from "@/services/api";

export default {
  name: "PaymentAdmin",
  data() {
    return {
      payment: {},
      payments: []
    };
  },
  methods: {
    loadPayments() {
      api.get("/admin/payment").then(res => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });

      api.get("/admin/schedule").then(res => {
        console.log(res);
      });
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
    this.loadPayments();
  }
};
</script>
