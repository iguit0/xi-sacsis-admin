<template>
  <div>
    <div v-if="isLoading" class="py-2 mt-2 text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      <h2 class="text-center text-uppercase mt-1">CARREGANDO...</h2>
    </div>

    <div v-else-if="!coursesTurma1 && !coursesTurma2 && !coursesLength">
      <h2>wtf</h2>
    </div>

    <div v-else>
      <PageTitle
        icon="chalkboard-teacher"
        main="Minicursos"
        :sub="`${coursesLength} opções disponíveis`"
      />
      <b-container fluid>
        <b-row>
          <b-col>
            <h2 class="text-center text-uppercase">Opção 1</h2>
            <!-- OPCAO 1 -->
            <b-card
              v-for="(minicurso) in coursesTurma1"
              :key="minicurso.id"
              header-bg-variant="primary"
              header-text-variant="white"
              header-class="text-uppercase h5"
              :header="`${minicurso.titulo}`"
              align="center"
              class="mt-3 mb-3"
              footer-tag="footer"
            >
              <b-card-text v-if="minicurso.ministrante">
                <v-icon name="chalkboard-teacher" class="mr-1"/>
                Ministrante: {{minicurso.ministrante}}
              </b-card-text>
              <b-card-text v-if="minicurso.turma">
                <v-icon name="users" class="mr-1"/>
                Turma: {{minicurso.turma}}
              </b-card-text>
              <b-card-text v-if="minicurso.data_inicio && minicurso.data_fim">
                <v-icon name="clock" class="mr-1"/>
                {{minicurso.data_inicio}} • {{minicurso.data_fim}}
              </b-card-text>
              <b-card-text v-if="minicurso.vagas_disponiveis > 10">
                <v-icon name="chair" class="mr-1"/>
                Vagas restantes: {{minicurso.vagas_disponiveis}}
              </b-card-text>
              <b-card-text v-if="minicurso.vagas_disponiveis <= 10">
                <v-icon name="chair" class="mr-1"/>Vagas restantes:
                <span class="text-danger">{{minicurso.vagas_disponiveis}}</span>
              </b-card-text>
              <div slot="footer" v-if="!payment">
                <span class="text-danger text-uppercase">Pagamento não confirmado</span>
              </div>
              <div slot="footer" v-else-if="payment && minicurso.vagas_disponiveis === 0">
                <span class="text-danger text-uppercase">Vagas esgotadas!</span>
                <b-btn
                  class="float-left"
                  size="sm"
                  variant="danger"
                  v-if="(option2 === minicurso.id)"
                  @click="cancel(option2)"
                >
                  <v-icon name="times"/>
                  <span class="ml-1">Sair</span>
                </b-btn>
              </div>
              <div slot="footer" v-else>
                <b-btn
                  class="float-left"
                  size="sm"
                  variant="danger"
                  v-if="option1 === minicurso.id"
                  @click="cancel(option1)"
                >
                  <v-icon name="times"/>
                  <span class="ml-1">Sair</span>
                </b-btn>
                <b-form-radio
                  class="float-right"
                  v-model="option1"
                  :value="minicurso.id"
                  name="option1"
                  @change="option1 = minicurso.id"
                >{{option1 === minicurso.id ? 'Selecionado' : 'Selecionar'}}</b-form-radio>
              </div>
            </b-card>
          </b-col>
          <b-col>
            <h2 class="text-center text-uppercase">Opção 2</h2>
            <!-- OPÇÃO 2 -->
            <b-card
              v-for="(minicurso) in coursesTurma2"
              :key="minicurso.id"
              header-bg-variant="primary"
              header-text-variant="white"
              header-class="text-uppercase h5"
              :header="`${minicurso.titulo}`"
              align="center"
              class="mt-3 mb-3"
              footer-tag="footer"
            >
              <b-card-text v-if="minicurso.ministrante">
                <v-icon name="chalkboard-teacher" class="mr-1"/>
                Ministrante: {{minicurso.ministrante}}
              </b-card-text>
              <b-card-text v-if="minicurso.turma">
                <v-icon name="users" class="mr-1"/>
                Turma: {{minicurso.turma}}
              </b-card-text>
              <b-card-text v-if="minicurso.data_inicio && minicurso.data_fim">
                <v-icon name="clock" class="mr-1"/>
                {{minicurso.data_inicio}} • {{minicurso.data_fim}}
              </b-card-text>
              <b-card-text v-if="minicurso.vagas_disponiveis > 10">
                <v-icon name="chair" class="mr-1"/>
                Vagas restantes: {{minicurso.vagas_disponiveis}}
              </b-card-text>
              <b-card-text v-if="minicurso.vagas_disponiveis <= 10">
                <v-icon name="chair" class="mr-1"/>Vagas restantes:
                <span class="text-danger">{{minicurso.vagas_disponiveis}}</span>
              </b-card-text>
              <div slot="footer" v-if="!payment">
                <span class="text-danger text-uppercase">Pagamento não confirmado</span>
              </div>
              <div slot="footer" v-else-if="payment && minicurso.vagas_disponiveis === 0">
                <b-btn
                  class="float-left"
                  size="sm"
                  variant="danger"
                  v-if="(option2 === minicurso.id)"
                  @click="cancel(option2)"
                >
                  <v-icon name="times"/>
                  <span class="ml-1">Sair</span>
                </b-btn>
                <span class="text-danger text-uppercase">Vagas esgotadas!</span>
              </div>
              <div slot="footer" v-else>
                <b-btn
                  class="float-left"
                  size="sm"
                  variant="danger"
                  v-if="(option2 === minicurso.id)"
                  @click="cancel(option2)"
                >
                  <v-icon name="times"/>
                  <span class="ml-1">Sair</span>
                </b-btn>
                <b-form-radio
                  class="float-right"
                  v-model="option2"
                  name="option-2"
                  :value="minicurso.id"
                  @change="option2 = minicurso.id"
                >{{option2 === minicurso.id ? 'Selecionado' : 'Selecionar'}}</b-form-radio>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-btn
          @click="confirm"
          :disabled="!option1 && !option2"
          variant="success"
          block
          size="lg"
          v-if="payment"
        >
          <v-icon name="save" scale="1.5" class="mr-2"/>
          <span class="text-uppercase">salvar</span>
        </b-btn>
        <div v-else>
          <h2 class="mt-2 text-center text-uppercase">Seu pagamento ainda não foi confirmado!</h2>
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
      option1: null,
      option2: null,
      coursesLength: 0,
      coursesTurma1: [],
      coursesTurma2: [],
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
      const parsedOption1 = parseInt(this.option1);
      const parsedOption2 = parseInt(this.option2);
      // não deixar cadastrar dois minicursos com o mesmo id da programação
      if (this.option1 === this.option2) {
        if (this.option1 !== -1 && this.option2 !== -1)
          return showError("Não é possível cadastrar em minicursos iguais");
      }
      const data = {
        option1: parsedOption1,
        option2: parsedOption2
      };
      api.post("/schedule/course", data).then(res => {
        if (res.status === 200 || res.status === 201) {
          showSuccess(res.data.option1);
          showSuccess(res.data.option2);
          this.getCourses();
        } else {
          showError(res.data.message);
          this.getCourses();
        }
      });
    },
    cancel(option) {
      // parametro: id do minicurso selecionado

      this.$swal({
        position: "center",
        title: "Minicurso",
        text: "Deseja sair do minicurso?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, sair!",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          // invalida a opcao que tiver com a opcao selecionada
          if (this.option1 === option) {
            this.option1 = -1;
          } else if (this.option2 === option) {
            this.option2 = -1;
          }

          const data = {
            option1: this.option1,
            option2: this.option2
          };
          api.post("/schedule/course", data).then(res => {
            if (res.status === 200 || res.status === 201) {
              this.getCourses(); // atualiza cards de minicursos p/ pegar vagas atualizadas
            } else {
              showError(res.data.message);
              this.getCourses();
            }
          });
          this.$swal({
            position: "center",
            type: "success",
            title: "Minicurso",
            text: "Você saiu!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    getCourses() {
      this.isLoading = true;
      api.get("/schedule/course").then(res => {
        if (res.status === 200 || res.status === 201) {
          // se tiver inscrito em algum, popula os selects
          if (res.data.option1 || res.data.option2) {
            this.option1 = res.data.option1;
            this.option2 = res.data.option2;
          }
          this.coursesLength = res.data.minicursos.length;
          this.coursesTurma1 = res.data.minicursos.filter(
            elem => elem.turma === "1"
          );
          this.coursesTurma2 = res.data.minicursos.filter(
            elem => elem.turma === "2"
          );
        } else {
          showError(res.data.message);
          this.getCourses();
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

