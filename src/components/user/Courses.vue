<template>
  <div>
    <PageTitle icon="chalkboard-teacher" main="Minicursos" sub="Inscrição em minicursos"/>
    <div class="text-center" v-if="isLoading">
      <b-spinner variant="dark"></b-spinner>
      <h4 class="mt-2 text-center text-uppercase">CARREGANDO...</h4>
    </div>
    <b-container v-else fluid>
      <b-row>
        <b-col>
          <h2 class="text-center text-uppercase">Opção 1</h2>
          <div v-for="(minicurso) in courses" :key="minicurso.id">
            {{minicurso.descricao}}
            {{minicurso.titulo}}
          </div>
        </b-col>
        <b-col>
          <h2 class="text-center text-uppercase">Opção 2</h2>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import api from "@/services/api";

export default {
  name: "CoursesList",
  components: { PageTitle },
  data() {
    return {
      courses: [],
      isLoading: false
    };
  },
  methods: {
    getCourses() {
      this.isLoading = true;
      api.get("/schedule/course").then(res => {
        //console.log(res.data);
        if (res.status === 200) {
          this.courses = res.data.minicursos;
        }
      });
      this.isLoading = false;
    }
  },
  mounted() {
    this.getCourses();
  }
};
</script>

