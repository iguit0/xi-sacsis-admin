<template>
  <div class="home">
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
      <Stat v-if="lectures" title="Palestras" :value="lectures" icon="microphone" color="#3CB371"/>
    </div>
    <div v-else>
      <h2>Escopo participante</h2>
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
      isAdmin: this.$store.getters.permissionLevel,
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
    }
  },
  methods: {
    getEventData() {
      this.isLoading = true;
      // dados usuarios
      api.get("/admin/user").then(res => {
        if (res.status === 200) {
          this.participants = res.data.usuarios.length;
        } else {
          showError(res.data.message);
        }
      });

      // dados minicursos
      api.get("/admin/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos.length;
        } else {
          showError(res.data.message);
        }
      });

      // dados palestras
      api.get("/admin/lecture?loadtitle=0").then(res => {
        if (res.status === 200) {
          this.lectures = res.data.palestras.length;
        } else {
          showError(res.data.message);
        }
      });
      this.isLoading = false;
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
