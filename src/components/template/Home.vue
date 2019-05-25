<template>
  <div class="home">
    <div v-if="isLoading" class="py-2 mt-2 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <h2 class="text-center text-uppercase mt-1">CARREGANDO...</h2>
    </div>
    <div v-else>
      <PageTitle icon="home" main="Dashboard" :sub="username"/>
      <div class="stats" v-if="isAdmin">
        <Stat
          v-if="participants"
          title="Participantes"
          :value="participants"
          icon="users"
          color="#d54d50"
        />
        <Stat
          v-if="courses"
          title="Minicursos"
          :value="courses"
          icon="chalkboard-teacher"
          color="#FF8C00"
        />
        <Stat
          v-if="lectures"
          title="Palestras"
          :value="lectures"
          icon="microphone"
          color="#49a7c1"
        />
        <Stat
          v-if="lectures"
          title="Pagamentos"
          :value="lectures"
          icon="money-bill-alt"
          color="#3CB371"
        />
      </div>
      <div v-else-if="!isAdmin && !isPaid">
        <h2 class="text-center text-uppercase mt-1 mb-3">Parabéns, {{name}}!</h2>
        <p
          class="lead text-center"
        >Seu cadastro em nosso site foi efetuado com sucesso! Agora, para finalizarmos sua inscrição, basta efetuar o pagamento.</p>
        <p class="lead text-center">
          Contamos com
          <strong class="text-info">três opções:</strong>
          pagamento à vista
          <strong class="text-success">(em dinheiro)</strong>, pagamento via cartão
          <strong class="text-warning">(crédito ou débito)</strong> e por
          <strong class="text-primary">boleto bancário.</strong>
        </p>
        <p class="lead text-center">
          Caso a opção escolhida seja
          <strong class="text-success">em dinheiro</strong>, basta procurar nosso estande, localizado no Hall do PVA, de segunda a sexta-feira, durante o período da tarde e noite.
        </p>
        <p class="lead text-center">
          Caso deseje pagar via cartão ou boleto, você mesmo pode acessar o evento no site da Ingresso Live,
          <a
            href="https://www.ingressolive.com/xi-sacsis"
            target="_blank"
            rel="noopener"
          >clicando aqui!</a> e realizar a transação por lá, sem a necessidade de comparecer à faculdade para tal.
        </p>

        <h3 class="text-center">
          Assim que o pagamento for aprovado pela financeira, sua inscrição já é
          <strong>automaticamente confirmada.</strong>
        </h3>

        <p
          class="h4 mt-3 text-muted float-right"
        >A equipe da XI SACSIS agradece e aguarda-o ansiosa em nosso evento!</p>
      </div>
      <div v-else-if="!isAdmin && isPaid">
        <h2 class="text-center text-uppercase mt-1">Você pagou!!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import Stat from "@/components/admin/Stat";
import api from "@/services/api";

export default {
  name: "Home",
  data() {
    return {
      isAdmin: this.$store.getters.permissionLevel,
      participants: 0,
      courses: 0,
      lectures: 0,
      payments: 0,
      isLoading: false
    };
  },
  components: { PageTitle, Stat },
  computed: {
    username() {
      return this.$store.getters.getUsername
        ? `Bem-vindo(a), ${this.$store.getters.getUsername}`
        : "Bem-vindo(a)!";
    },
    name() {
      return this.$store.getters.getUsername;
    },
    isPaid() {
      return this.$store.getters.getStatusPayment;
    }
  },
  methods: {
    getEventData() {
      this.isLoading = true;
      // dados usuarios
      api.get("/admin/user").then(res => {
        if (res.status === 200) {
          this.participants = res.data.usuarios.length;
        }
      });

      // dados minicursos
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos.length;
        }
      });

      // dados palestras
      api.get("/admin/lecture?loadtitle=0").then(res => {
        if (res.status === 200) {
          this.lectures = res.data.palestras.length;
        }
      });

      // dados pagamentos
      api.get("/admin/payment?report=0&csvformat=0").then(res => {
        if (res.status === 200) {
          this.payments = res.data.pagamentos.length;
        }
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  },
  mounted() {
    if (this.isAdmin) {
      this.getEventData();
    }
  }
};
</script>

<style scoped>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>