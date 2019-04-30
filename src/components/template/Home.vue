<template>
  <div class="home">
    <PageTitle icon="home" main="Dashboard" :sub="username"/>
    <div class="stats">
      <Stat title="Participantes" :value="participants" icon="users" color="#d54d50"/>
      <Stat title="Minicursos" :value="22" icon="chalkboard-teacher" color="#FF8C00"/>
      <Stat title="Palestras" :value="22" icon="microphone" color="#3CB371"/>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import Stat from "@/components/admin/Stat";
import api from "@/services/api";
import { showError } from "@/global";

export default {
  name: "Home",
  data() {
    return {
      participants: 0,
      courses: 0,
      lectures: 0
    };
  },
  components: { PageTitle, Stat },
  computed: {
    username() {
      return this.$store.getters.getUsername
        ? `Bem-vindo(a), ${this.$store.getters.getUsername}`
        : "Bem-vindo(a)!";
    },
    getStats() {
      return this.$store.getters.getParticipants;
    }
  },
  methods: {
    getEventData() {
      api.get("/admin/user").then(res => {
        if (res.status === 200) {
          this.$store.commit("setParticipants", res.data.usuarios.length);
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
        }
      });
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
