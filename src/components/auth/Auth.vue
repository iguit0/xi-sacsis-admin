<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!-- img logo evento -->
      <b-img :src="require('@/assets/img/logo.png')" class="mb-3"/>
      <hr>
      <div class="auth-title" v-if="!recoverPass">{{ showSignup ? 'CADASTRO' : 'LOGIN' }}</div>
      <div class="auth-title" v-else>ESQUECI MINHA SENHA</div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="font"/>
          </span>
        </div>
        <b-input
          v-model="user.name"
          type="text"
          placeholder="Nome"
          class="form-control"
          required
          name="name"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="envelope"/>
          </span>
        </div>
        <b-input
          v-model="user.email"
          name="email"
          type="text"
          placeholder="E-mail"
          class="form-control"
          required
        />
      </div>

      <div class="input-group mb-3" v-if="!showPass && !recoverPass">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="key"/>
          </span>
        </div>
        <b-input
          v-model="user.password"
          name="password"
          type="password"
          placeholder="Senha"
          class="form-control"
          required
        />
        <div class="input-group-append">
          <span class="input-group-text" @click="showPassword">
            <v-icon name="eye-slash"/>
          </span>
        </div>
      </div>
      <div class="input-group mb-3" v-else-if="showPass && !recoverPass">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="key"/>
          </span>
        </div>
        <b-input
          v-model="user.password"
          name="password"
          type="text"
          placeholder="Senha"
          class="form-control"
          required
        />
        <div class="input-group-append">
          <span class="input-group-text" @click="showPassword">
            <v-icon name="eye"/>
          </span>
        </div>
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="key"/>
          </span>
        </div>
        <b-input
          v-if="showSignup"
          v-model="user.confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
          class="form-control"
          required
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <v-icon name="check-circle"/>
          </span>
        </div>
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="id-card"/>
          </span>
        </div>
        <b-input
          v-model="user.matricula"
          name="matricula"
          type="number"
          placeholder="Matrícula"
          class="form-control"
          required
        />
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="id-card-alt"/>
          </span>
        </div>
        <the-mask
          v-model="user.cpf"
          placeholder="CPF"
          class="form-control"
          required
          :mask="['###.###.###-##']"
        />
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="id-card-alt"/>
          </span>
        </div>
        <the-mask
          v-model="user.rg"
          placeholder="RG"
          class="form-control"
          required
          :mask="['##.###.###']"
        />
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="tshirt"/>
          </span>
        </div>
        <b-form-select
          class="form-contrl"
          v-model="user.shirtSize"
          :options="optionsShirt"
          required
        />
      </div>

      <!--<b-btn variant="warning" block v-if="showSignup" @click="signup">
        <v-icon name="user-plus" class="mr-1"/>Registrar
      </b-btn>-->
      <VueLoadingButton
        aria-label="Entrar no sistema"
        class="btn btn-warning btn-block"
        :styled="isStyled"
        @click.native="signup"
        :loading="isLoading"
        v-if="showSignup"
      >
        <v-icon name="user-plus" class="mr-1"/>Registrar
      </VueLoadingButton>
      <VueLoadingButton
        aria-label="Entrar no sistema"
        class="btn btn-success btn-block"
        :styled="isStyled"
        @click.native="signin"
        :loading="isLoading"
        v-else-if="!showSignup && !recoverPass"
      >
        <v-icon name="sign-in-alt" class="mr-1"/>Entrar
      </VueLoadingButton>
      <!--<b-btn block v-else-if="!showSignup && !recoverPass" @click="signin" variant="success">
        <v-icon name="sign-in-alt" class="mr-1"/>Entrar
      </b-btn>-->
      <b-btn v-if="recoverPass" block @click="resetPass" variant="primary">
        <v-icon name="unlock-alt" class="mr-1"/>Recuperar
      </b-btn>
      <a href @click.prevent="toggleSignup" class="mt-3">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
      <a href @click.prevent="toggleRecover" class="mt-2">
        <span>Esqueci minha senha!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
import VueLoadingButton from "vue-loading-button";

export default {
  name: "Auth",
  components: { VueLoadingButton },
  data: function() {
    return {
      isStyled: false,
      isLoading: false,
      showPass: false,
      showSignup: false,
      recoverPass: false,
      user: {
        shirtSize: null
      },
      optionsShirt: [
        { value: null, text: "Selecione um tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" },
        { value: "XL", text: "XL" }
      ]
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      let parsedUser = JSON.parse(JSON.stringify(this.user));
      if (!this.user.email && !this.user.password) {
        alert("E-mail inválido!");
      } else {
        axios
          .post(`${baseApiUrl}/login`, {
            login: parsedUser.email,
            senha: parsedUser.password
          })
          .then(res => {
            this.$store.commit("setUser", res.data);
            this.isLoading = false;
            localStorage.setItem(userKey, JSON.stringify(res.data));
            this.$router.push({ path: "/" });
          })
          .catch(showError);
      }
    },
    signup() {
      this.isLoading = true;
      let newUser = JSON.parse(JSON.stringify(this.user));
      axios
        .post(`${baseApiUrl}/user`, {
          nome: newUser.name,
          email: newUser.email,
          matricula: newUser.matricula,
          cpf: newUser.cpf,
          rg: newUser.rg,
          senha: newUser.password,
          camiseta: newUser.shirtSize
        })
        .then(() => {
          this.isLoading = false;
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    resetPass() {
      let newUser = JSON.parse(JSON.stringify(this.user));
      axios
        .post(`${baseApiUrl}/reset_password`, {
          login: newUser.email
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
    toggleSignup() {
      if (!this.recoverPass) {
        this.showSignup = !this.showSignup;
      } else if (!this.showSignup && this.recoverPass) {
        this.recoverPass = !this.recoverPass;
        this.showSignup = !this.showSignup;
      }
    },
    toggleRecover() {
      if (this.showSignup) {
        this.showSignup = !this.showSignup;
        this.recoverPass = !this.recoverPass;
      } else {
        this.recoverPass = !this.recoverPass;
      }
    },
    showPassword() {
      this.showPass = !this.showPass;
    }
  }
};
</script>

<style scoped>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  /*background-color: #fff;
  width: 600px;
  height: 650px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);*/
  height: 850px;
  padding: 35px;
  width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

/*.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;

  .auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}*/

.auth-modal hr {
  border: none;
  height: 20px;
  width: 70%;
  height: 50px;
  margin-top: 0;
  border-bottom: 1px solid #1f1209;
  box-shadow: 0 20px 20px -20px #333;
  margin: -50px auto 10px;
}

.helper-recover {
  font-size: 15px;
  color: black;
  padding-top: 5px;
}
</style>
