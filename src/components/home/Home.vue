<template>
  <div class="home">
    <PageTitle icon="home" main="Dashboard" :sub="username"/>
    <sequential-entrance fromBottom>
      <div class="stats">
        <Stat title="Participantes" :value="3" icon="users" color="#d54d50"/>
        <Stat title="Palestrantes" :value="5" icon="microphone" color="#3CB371"/>
        <Stat title="Minicursos" :value="3" icon="chalkboard-teacher" color="#FF8C00"/>
        <Stat title="Trabalhos Submetidos" :value="3" icon="file-upload" color="#9370DB"/>
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
      categories: 0
    };
  },
  computed: {
    username() {
      return this.$store.getters.username
        ? `Bem-vindo(a), ${this.$store.getters.username}`
        : "Bem-vindo(a)!";
    }
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/categories`).then(res => {
        this.categories = res.data.length;
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
