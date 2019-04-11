<template>
  <div class="home">
    <PageTitle icon="home" main="Dashboard" :sub="username"/>
    <sequential-entrance fromBottom>
      <div class="stats">
        <Stat title="Participantes" :value="participants" icon="users" color="#d54d50"/>
        <Stat title="Minicursos" :value="22" icon="chalkboard-teacher" color="#FF8C00"/>
        <Stat title="Palestras" :value="22" icon="microphone" color="#3CB371"/>
      </div>
    </sequential-entrance>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import Stat from "@/components/home/Stat";
import axios from "axios";
import { showError, baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  computed: {
    username() {
      return this.$store.getters.getUsername
        ? `Bem-vindo(a), ${this.$store.getters.getUsername}`
        : "Bem-vindo(a)!";
    },
    participants() {
      return this.$store.getters.getParticipants;
    },
    courses() {
      return this.$store.getters.getCourses;
    }
  },
  methods: {
    getStats() {
      axios
        .get(`${baseApiUrl}/admin/user`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          console.log(res);
          this.$store.commit("setParticipants", res.data.usuarios.length);
        })
        .catch(showError);

      /*await axios
        .get(`${baseApiUrl}/admin/course`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.$store.commit("setCourses", res.data.minicursos.length);
        });*/
    }
  },
  mounted() {
    this.getStats();
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
