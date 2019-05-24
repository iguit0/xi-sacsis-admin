<template>
  <div>
    <div v-if="isLoading" class="py-2 mt-2 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <h2 class="text-center text-uppercase mt-1">CARREGANDO...</h2>
    </div>

    <div>
      <PageTitle
        icon="chalkboard-teacher"
        main="Minicursos"
        :sub="`${courses.length} opções disponíveis`"
        :firstOption="option1"
        :secondOption="option2"
      />
      <b-container fluid>
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
                  :value="minicurso.id"
                  name="option1"
                  @change="check1 = minicurso.id"
                >{{check1 === minicurso.id ? 'Selecionado' : 'Selecionar'}}</b-form-radio>
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
                  @change="check2 = minicurso.id"
                >{{check2 === minicurso.id ? 'Selecionado' : 'Selecionar'}}</b-form-radio>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-btn
          @click="confirm"
          :disabled="!option1 || !option2"
          variant="success"
          block
          size="lg"
          v-if="payment"
        >
          <v-icon name="save" scale="1.5" class="mr-1"/>
          <span class="text-uppercase">salvar</span>
        </b-btn>
        <div v-else>
          <h2 class="mt-2 text-center text-uppercase">Seu pagamento ainda não foi verificado!</h2>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import { showSuccess, showError } from "@/global";
import api from "@/services/api";

export default {
  name: "CoursesList",
  components: { PageTitle },
  data() {
    return {
      check1: "",
      check2: "",
      option1: "",
      option2: null,
      courses: [],
      isLoading: false
    };
  },
  computed: {
    payment() {
      return this.$store.getters.getStatusPayment;
    }
  },
  methods: {
    confirm() {
      if (!this.option1 || !this.option2) {
        return showError("Selecione duas opções");
      } else if (this.option1 === this.option2) {
        return showError("Não é possível cadastrar em minicursos iguais");
      } else {
        const data = {
          option1: this.option1,
          option2: this.option2
        };
        api.post("/schedule/course", data).then(res => {
          if (res.status === 200 || res.status === 201) {
            showSuccess(res.data.option1);
            this.getCourses();
          } else {
            showError(res.data.message);
            this.getCourses();
          }
        });
      }
    },
    getCourses() {
      this.isLoading = true;
      api.get("/schedule/course").then(res => {
        if (res.status === 200) {
          this.courses = res.data.minicursos;
        } else {
          showError(res.data.message);
        }
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  },
  mounted() {
    this.getCourses();
  }
};
</script>
