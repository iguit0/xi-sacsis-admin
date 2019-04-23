<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!-- img logo evento -->
      <b-img :src="require('@/assets/img/logo.png')" class="mb-3"/>
      <hr>
      <div class="auth-title" v-if="!recoverPass">{{ showSignup ? 'CADASTRO' : 'LOGIN' }}</div>
      <div class="auth-title" v-else>ESQUECI MINHA SENHA</div>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="font"/>
        </b-input-group-text>
        <b-input
          v-model="user.name"
          type="text"
          placeholder="Nome"
          class="form-control"
          required
          name="name"
        />
      </b-input-group>

      <b-input-group class="mb-3">
        <b-input-group-text slot="prepend">
          <v-icon name="envelope"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-model="user.email"
          name="email"
          type="email"
          placeholder="E-mail"
          class="form-control"
          required
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="!showPass && !recoverPass">
        <b-input-group-text slot="prepend">
          <v-icon name="key"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-model="user.password"
          name="password"
          type="password"
          placeholder="Senha"
          class="form-control"
          required
        />
        <b-input-group-text slot="append" @click="showPassword">
          <v-icon name="eye-slash"/>
        </b-input-group-text>
      </b-input-group>

      <b-input-group class="mb-3" v-else-if="showPass && !recoverPass">
        <b-input-group-text slot="prepend">
          <v-icon name="key"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-model="user.password"
          name="password"
          type="text"
          placeholder="Senha"
          class="form-control"
          required
        />
        <b-input-group-text slot="append" @click="showPassword">
          <v-icon name="eye"/>
        </b-input-group-text>
      </b-input-group>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="key"/>
        </b-input-group-text>
        <b-input
          v-if="showSignup"
          v-model="user.confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
          class="form-control"
          required
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="id-card"/>
        </b-input-group-text>
        <the-mask
          :mask="['####']"
          v-model="user.matricula"
          name="matricula"
          placeholder="Matrícula"
          class="form-control"
          required
        />
      </b-input-group>

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

      <b-input-group class="mb-3" v-if="showSignup" v-b-tooltip.hover title="Apenas os números">
        <b-input-group-text slot="prepend">
          <v-icon name="id-card-alt"/>
        </b-input-group-text>
        <the-mask
          v-model="user.rg"
          placeholder="RG"
          class="form-control"
          required
          :mask="['##.###.###']"
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="tshirt"/>
        </b-input-group-text>
        <b-form-select
          class="form-contrl"
          v-model="user.shirtSize"
          :options="optionsShirt"
          required
        />
      </b-input-group>

      <!--<b-btn variant="warning" block v-if="showSignup" @click="signup">
        <v-icon name="user-plus" class="mr-1"/>Registrar
      </b-btn>-->
      <VueLoadingButton
        aria-label="Registrar no Sistema"
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
        @click.native="checkForm"
        :loading="isLoading"
        v-else-if="!showSignup && !recoverPass"
      >
        <v-icon name="sign-in-alt" class="mr-1"/>Entrar
      </VueLoadingButton>
      <!--<b-btn block v-else-if="!showSignup && !recoverPass" @click="signin" variant="success">
        <v-icon name="sign-in-alt" class="mr-1"/>Entrar
      </b-btn>-->
      <VueLoadingButton
        aria-label="Recuperar Senha"
        class="btn btn-primary btn-block"
        :styled="isStyled"
        @click.native="resetPass"
        :loading="isLoading"
        v-if="recoverPass"
      >
        <v-icon name="unlock-alt" class="mr-1"/>Recuperar
      </VueLoadingButton>
      <!--<b-btn v-if="recoverPass" block @click="resetPass" variant="primary">
        <v-icon name="unlock-alt" class="mr-1"/>Recuperar
      </b-btn>-->
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
import { showError, showSuccess, userKey } from "@/global";
import api from "@/services/api";
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
    /*
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },*/
    checkForm(e) {
      this.errors = [];
      this.isLoading = true;

      if (!this.user.email) {
        let msg = "E-mail é obrigatório";
        this.errors.push(msg);
        showError(msg);
        this.isLoading = false;
      } /*else if (!this.validEmail(this.user.email)) {
        let msg = "Utilize um e-mail válido";
        this.errors.push(msg);
        showError(msg);
        this.isLoading = false;
      } */ else if (
        !this.user.password
      ) {
        let msg = "Senha é obrigatório";
        this.errors.push(msg);
        showError(msg);
        this.isLoading = false;
      } else if (!this.user.email && !this.user.password) {
        let msg = "E-mail e Senha são obrigatórios";
        this.errors.push(msg);
        showError(msg);
        this.isLoading = false;
      }

      if (!this.errors.length) {
        this.isLoading = false;
        return this.signin();
      }

      e.preventDefault();
    },
    signin() {
      this.isLoading = true;
      let parsedUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        login: parsedUser.email,
        senha: parsedUser.password
      };
      api.post("/login", data).then(response => {
        if (response.status === 200) {
          localStorage.setItem(userKey, JSON.stringify(response.data));
          this.$store.commit("setUser", response.data);
          this.isLoading = false;
          this.$router.push({ path: "/" });
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.isLoading = false;
        }
      });
    },
    signup() {
      this.isLoading = true;
      let newUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        nome: newUser.name,
        email: newUser.email,
        matricula: newUser.matricula,
        cpf: newUser.cpf,
        rg: newUser.rg,
        senha: newUser.password,
        camiseta: newUser.shirtSize
      };
      api.post("/user", data).then(response => {
        if (response.status === 201) {
          this.isLoading = false;
          let successMsg = response.data.message;
          showSuccess(successMsg);
          this.user = {};
          this.showSignup = false;
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.isLoading = false;
        }
      });
    },
    resetPass() {
      this.isLoading = true;
      let forgotUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        login: forgotUser.email
      };
      api.post("/reset_password", data).then(response => {
        if (response.status === 200) {
          let successMsg = response.data.message;
          showSuccess(successMsg);
          this.isLoading = false;
          this.user = {};
          this.showSignup = false;
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.isLoading = false;
        }
      });
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
