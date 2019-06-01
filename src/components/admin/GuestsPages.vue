<template>
  <div>
    <div class="guests-pages">
      <PageTitle icon="person-booth" main="Ministrantes" sub="Gerar links de cadastro, etc"/>
      <b-form>
        <b-row>
          <b-col md="4">
            <b-form-group label="Expiração:" label-for="link-time">
              <b-form-select
                required
                v-model="selectedTime"
                id="link-time"
                :options="expirationTime"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Atividade:" label-for="link-type">
              <b-form-select v-model="selectedType" :options="types" required id="link-type"/>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Link:" label-for="link-btn">
              <b-btn
                @click="generate"
                :disabled="!selectedTime || !selectedType"
                id="link-btn"
                variant="primary"
              >
                <v-icon class="mr-1" name="link"/>Gerar
              </b-btn>

            <!-- Botão de abertura do modal de testes -->
              <b-btn
                @click="openModal"
                id="link-btn"
                variant="danger"
              >
                <v-icon class="mr-1" name="link"/>Abrir Modal de Teste
              </b-btn>
            
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="10">
            <h2
              class="text-center"
              v-if="selectedTime"
            >O convidado tem {{selectedTime}} dia(s) para preencher o formulário</h2>
            <b-input-group class="mt-3">
              <b-input
                type="text"
                v-model="copyData"
                :disabled="!copyData"
                placeholder="Gere um link válido"
              />
              <b-input-group-append>
                <b-btn v-clipboard="copyData">
                  <v-icon name="copy" scale="1.2"/>
                </b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import InfoModal from "@/components/template/InfoModal";
import api from "@/services/api";
import { showError, showSuccess } from "@/global";

export default {
  name: "GuestsPages",
  components: { PageTitle },
  data() {
    return {
      selectedType: null,
      selectedTime: null,
      copyData: "",
      expirationTime: [
        { value: null, text: "Selecione uma opção" },
        { value: "1", text: "1 dia" },
        { value: "2", text: "2 dias" },
        { value: "3", text: "3 dias" },
        { value: "4", text: "4 dias" },
        { value: "5", text: "5 dias" },
        { value: "6", text: "6 dias" },
        { value: "7", text: "7 dias" }
      ],
      types: [
        { value: null, text: "Selecione uma opção" },
        { value: "course", text: "Minicurso" },
        { value: "lecture", text: "Palestra" }
      ]
    };
  },
  methods: {

    openModal() {
      this.$modal.show(InfoModal, {
        schedule: {
          user: {
            avatar: null,
            name: "Joaozinho pereira da silva pinto sousa",
            info: "aaaaaaaaaaaaaa",
            instagram: "https://www.instagram.com/",
            facebook: "https://www.facebook.com/",
            twitter: "https://twitter.com/",
            website: "https://www.google.com/"
          },
          title: "alguma coisa",
          text: "alguma coisa"
        }
      }, {
        draggable: false,
        width: 850,
        height: 510
      })
    },
    
    generate() {
      api
        .get(
          `/speaker?type=${this.selectedType}&expiration=${this.selectedTime}`
        )
        .then(res => {
          if (res.status === 201) {
            let generatedToken = res.data.token;
            let url = window.location.hostname;
            if (this.selectedType === "course") {
              this.copyData = `${url}/cadastro-minicurso?token=${generatedToken}`;
            } else if (this.selectedType === "lecture") {
              this.copyData = `${url}/cadastro-palestra?token=${generatedToken}`;
            }
            showSuccess(res.data.message);
            this.reset();
          } else {
            showError(res.data.message);
            this.reset();
          }
        });
    },
    reset() {
      this.selectedType = null;
      this.selectedTime = null;
    }
  }
};
</script>