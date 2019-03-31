<template>
  <div class="home">
    <PageTitle icon="home" main="Dashboard" :sub="username"/>
    <sequential-entrance fromBottom>
      <div class="stats">
        <Stat title="Participantes" :value="participants" icon="users" color="#d54d50"/>
        <Stat title="Palestrantes" :value="10" icon="microphone" color="#3CB371"/>
        <Stat title="Minicursos" :value="courses" icon="chalkboard-teacher" color="#FF8C00"/>
        <Stat title="Trabalhos Submetidos" :value="10" icon="file-upload" color="#9370DB"/>
      </div>
    </sequential-entrance>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import Stat from "@/components/home/Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data() {
    return {
      participants: 0,
      courses: 0
    };
  },
  computed: {
    username() {
      return this.$store.getters.getUsername
        ? `Bem-vindo(a), ${this.$store.getters.getUsername}`
        : "Bem-vindo(a)!";
    }
  },
  methods: {
    async getStats() {
      await axios
        .get(`${baseApiUrl}/admin/user`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.participants = res.data.usuarios.length;
        });

      await axios
        .get(`${baseApiUrl}/admin/course`, {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => {
          this.courses = res.data.minicursos.length;
        });
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
