<template>
  <div>
    <PageTitle
      icon="chalkboard-teacher"
      main="Minicursos"
      :sub="`${courses.length} opções disponíveis`"
      :rightInfo="`A e B`"
    />
    <div v-if="isLoading" class="py-2 mt-2 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <h2 class="text-center text-uppercase mt-1">CARREGANDO...</h2>
    </div>
    <div v-else>
      <b-container v-if="payment" fluid>
        <b-row>
          <b-col>
            <h2 class="text-center text-uppercase">Opção 1</h2>
            <b-card
              v-for="(minicurso) in courses"
              :key="minicurso.id"
              header-bg-variant="primary"
              header-text-variant="white"
              :header="`${minicurso.titulo}`"
              align="center"
              class="mt-3 mb-3"
              footer-tag="footer"
            >
              <b-card-text>{{ minicurso.descricao }}</b-card-text>
              <b-card-text>
                <v-icon name="chalkboard-teacher" class="mr-1"/>
                Ministrante: {{minicurso.ministrante}}
              </b-card-text>
              <b-card-text>
                <v-icon name="users" class="mr-1"/>
                Turma: {{minicurso.turma}}
              </b-card-text>
              <b-card-text>
                <v-icon name="chair" class="mr-1"/>
                Vagas restantes: {{minicurso.vagas_disponiveis}}
              </b-card-text>
              <div slot="footer">
                <b-form-radio
                  class="float-right"
                  v-model="option1"
                  name="option1"
                  :value="minicurso.id"
                >{{option1 ? 'Selecionado' : 'Selecionar'}}</b-form-radio>
              </div>
            </b-card>
          </b-col>
          <b-col>
            <h2 class="text-center text-uppercase">Opção 2</h2>
            <b-card
              v-for="(minicurso) in courses"
              :key="minicurso.id"
              header-bg-variant="primary"
              header-text-variant="white"
              :header="`${minicurso.titulo}`"
              align="center"
              class="mt-3 mb-3"
              footer-tag="footer"
            >
              <b-card-text>{{minicurso.descricao}}</b-card-text>
              <b-card-text>
                <v-icon name="chalkboard-teacher" class="mr-1"/>
                Ministrante: {{minicurso.ministrante}}
              </b-card-text>
              <b-card-text>
                <v-icon name="users" class="mr-1"/>
                Turma: {{minicurso.turma}}
              </b-card-text>
              <b-card-text>
                <v-icon name="chair" class="mr-1"/>
                Vagas restantes: {{minicurso.vagas_disponiveis}}
              </b-card-text>
              <div slot="footer">
                <b-form-radio
                  class="float-right"
                  v-model="option2"
                  name="option-2"
                  :value="minicurso.id"
                >Selecionar</b-form-radio>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <div v-else>
        <h2 class="mt-2 text-center text-uppercase">Seu pagamento ainda não foi verificado!</h2>
      </div>
    </div>
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
      option1: null,
      option2: null,
      courses: [],
      isLoading: false
    };
  },
  computed: {
    payment() {
      return this.$store.getters.getStatusPayment;
    },
    selectedCourses() {}
  },
  methods: {
    getCourses() {
      this.isLoading = true;
      api.get("/schedule/course").then(res => {
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

