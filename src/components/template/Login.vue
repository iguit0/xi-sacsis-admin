<template>
  <div class="auth-content">
    <div class="auth-modal">
      <b-img
        :src="require('@/assets/img/logo.png')"
        class="mb-3 d-none d-md-block d-lg-block d-xl-block"
      />
      <b-img
        :src="require('@/assets/img/logo.png')"
        width="250px"
        height="100px"
        class="mb-3 d-sm-block d-xs-block d-md-none d-lg-none d-xl-none"
      />
      <hr>
      <div
        class="auth-title"
        v-if="!recoverPass && !changePass"
      >{{ showSignup ? 'CADASTRO' : 'LOGIN' }}</div>
      <div class="auth-title" v-else-if="recoverPass">ESQUECI MINHA SENHA</div>
      <div class="auth-title" v-else-if="changePass">INSIRA SUA NOVA SENHA</div>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="font"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-model="user.name"
          type="text"
          placeholder="Nome e sobrenome"
          class="form-control"
          required
          name="name"
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="venus-mars"/>
        </b-input-group-text>
        <b-form-select required v-model="user.sexo" :options="optionsGender"></b-form-select>
      </b-input-group>

      <b-input-group class="mb-3" v-if="!recoverPass && !changePass">
        <b-input-group-text slot="prepend">
          <v-icon name="envelope"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-if="!changePass"
          v-model="user.email"
          name="email"
          type="email"
          placeholder="E-mail"
          class="form-control"
          required
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="recoverPass">
        <b-input-group-text slot="prepend">
          <v-icon name="envelope"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="resetPass"
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

      <b-input-group class="mb-3" v-else-if="changePass">
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
          v-on:keyup.enter="checkForm"
          v-if="showSignup"
          v-model="user.confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
          class="form-control"
          required
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="changePass">
        <b-input-group-text slot="prepend">
          <v-icon name="key"/>
        </b-input-group-text>
        <b-input
          v-on:keyup.enter="checkForm"
          v-if="changePass"
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
        <input
          v-on:keyup.enter="checkForm"
          v-mask="'#####'"
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
        <input
          v-on:keyup.enter="checkForm"
          v-model="user.cpf"
          placeholder="CPF"
          class="form-control"
          required
          v-mask="'###.###.###-##'"
        />
      </div>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="id-card-alt"/>
        </b-input-group-text>
        <input
          v-on:keyup.enter="checkForm"
          v-model="user.rg"
          placeholder="RG"
          class="form-control"
          required
          v-mask="'###############'"
        />
      </b-input-group>

      <b-input-group class="mb-3" v-if="showSignup">
        <b-input-group-text slot="prepend">
          <v-icon name="tshirt"/>
        </b-input-group-text>
        <b-form-select
          v-on:keyup.enter="checkForm"
          class="form-control"
          v-model="user.shirtSize"
          :options="optionsShirt"
          required
        />
        <b-input-group-append>
          <b-button v-b-modal.modal-1 variant="info">
            <v-icon name="info-circle"/>
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <VueLoadingButton
        aria-label="Registrar no Sistema"
        class="btn btn-warning btn-block"
        :styled="isStyled"
        @click.native="checkForm"
        :loading="isLoading"
        v-if="showSignup"
      >
        <v-icon name="user-plus" scale="1.5" class="mr-1"/>Registrar
      </VueLoadingButton>
      <VueLoadingButton
        aria-label="Entrar no sistema"
        class="btn btn-success btn-block"
        :styled="isStyled"
        @click.native="checkForm"
        :loading="isLoading"
        v-else-if="!showSignup && !recoverPass && !changePass"
      >
        <v-icon name="sign-in-alt" scale="1.5" class="mr-1"/>Entrar
      </VueLoadingButton>
      <VueLoadingButton
        aria-label="Salvar nova senha"
        class="btn btn-success btn-block"
        :styled="isStyled"
        @click.native="checkForm"
        :loading="isLoading"
        v-else-if="changePass"
      >
        <v-icon name="sign-in-alt" scale="1.5" class="mr-1"/>Salvar nova senha
      </VueLoadingButton>
      <VueLoadingButton
        aria-label="Recuperar Senha"
        class="btn btn-primary btn-block"
        :styled="isStyled"
        @click.native="checkForm"
        :loading="isLoading"
        v-if="recoverPass"
      >
        <v-icon name="unlock-alt" scale="1.5" class="mr-1"/>Recuperar
      </VueLoadingButton>

      <a href @click.prevent="toggleSignup" class="mt-3">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else-if="!showSignup && !changePass">Não tem cadastro? Registre-se aqui!</span>
      </a>
      <a href @click.prevent="toggleRecover" class="mt-2">
        <span v-if="!recoverPass && !changePass">Esqueci minha senha!</span>
        <span v-else-if="!changePass">Lembrou a senha? Entre aqui!</span>
      </a>

      <b-modal id="modal-1" title="Guia Camisetas" ok-only centered>
        <b-img :src="require('../../assets/img/guia-camisetas.jpeg')"/>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  showError,
  showSuccess,
  showInfo,
  showWelcome,
  userKey,
  baseApiUrl
} from "@/global";
import api from "@/services/api";
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
      changePass: false,
      loginData: null,
      user: {
        sexo: null,
        shirtSize: null
      },
      optionsShirt: [
        { value: null, text: "Tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" }
      ],
      optionsGender: [
        { value: null, text: "Gênero" },
        { value: 0, text: "Masculino" },
        { value: 1, text: "Feminino" }
      ]
    };
  },
  methods: {
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkForm(e) {
      this.errors = [];
      this.isLoading = true;

      if (this.changePass) {
        if (!this.user.password) {
          let msg = "Senha é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.confirmPassword) {
          let msg = "Confirme sua senha";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (this.user.password != this.user.confirmPassword) {
          let msg = "Senha e Confirmar senha não são iguais";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        }
      } else if (this.recoverPass) {
        if (!this.user.email) {
          let msg = "E-mail é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        }
      } else if (!this.showSignup) {
        if (!this.user.email) {
          let msg = "E-mail é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.validEmail(this.user.email)) {
          let msg = "Utilize um e-mail válido";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.password) {
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
      } else if (this.showSignup) {
        if (!this.user.name) {
          let msg = "Nome completo é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.email) {
          let msg = "E-mail é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.password) {
          let msg = "Senha é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.email && !this.user.password) {
          let msg = "E-mail e Senha são obrigatórios";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (this.user.password != this.user.confirmPassword) {
          let msg = "Senha e Confirmar Senha não são iguais";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.confirmPassword) {
          let msg = "Confirme sua senha";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.matricula) {
          let msg = "Matrícula é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.cpf) {
          let msg = "CPF é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (!this.user.rg) {
          let msg = "RG é obrigatório";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (this.user.shirtSize === null) {
          let msg = "Escolha um tamanho de camiseta";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        } else if (this.user.sexo === null) {
          let msg = "Escolha um gênero";
          this.errors.push(msg);
          showError(msg);
          this.isLoading = false;
        }
      }
      if (!this.errors.length && this.changePass) {
        this.isLoading = false;
        return this.newPass();
      }
      if (!this.errors.length && this.recoverPass) {
        this.isLoading = false;
        return this.resetPass();
      } else if (!this.errors.length && !this.showSignup) {
        this.isLoading = false;
        return this.signin();
      } else if (!this.errors.length && this.showSignup) {
        this.isLoading = false;
        return this.signup();
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
          if (!response.data.rsenha) {
            localStorage.setItem(userKey, JSON.stringify(response.data));
            this.$store.commit("setUser", response.data);
            this.isLoading = false;
            this.$router.push({ path: "/profile" });
            let welcomeMsg =
              `Bem Vindo (a), ` + this.$store.getters.getUsername;
            showWelcome(welcomeMsg);
          } else {
            this.loginData = response.data;
            this.isLoading = false;
            this.user.password = "";
            this.user.confirmPassword = "";
            this.toggleChangePassword();
          }
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
        sexo: newUser.sexo,
        camiseta: newUser.shirtSize
      };
      axios.post(`${baseApiUrl}/user`, data).then(response => {
        if (response.status === 201) {
          this.isLoading = false;
          showSuccess(response.data.message);
          this.user = {};
          this.showSignup = false;
        } else {
          showError(response.data.message);
          this.isLoading = false;
        }
      });
    },
    resetPass() {
      this.isLoading = true;
      if (!this.user.email) {
        let msg = "E-mail é obrigatório";
        this.errors.push(msg);
        showError(msg);
        this.isLoading = false;
        return;
      }
      let forgotUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        login: forgotUser.email
      };
      api.post("/reset_password", data).then(response => {
        if (response.status === 200) {
          let successMsg = response.data.message;
          showSuccess(successMsg);
          showInfo("Senha enviada ao e-mail!");
          this.isLoading = false;
          this.user = {};
          this.recoverPass = false;
        } else {
          let errorMsg = response.data.message;
          showError(errorMsg);
          this.isLoading = false;
        }
      });
    },
    newPass() {
      this.isLoading = true;
      let parsedUser = JSON.parse(JSON.stringify(this.user));
      const data = {
        senha: parsedUser.password
      };

      const apix = axios.create({
        baseURL: baseApiUrl,
        headers: { Authorization: `Bearer ${this.loginData.jwt_token}` },
        validateStatus: function(status) {
          return status < 1000;
        }
      });

      apix.put("/reset_password", data).then(response => {
        if (response.status === 201) {
          localStorage.setItem(userKey, JSON.stringify(this.loginData));
          this.$store.commit("setUser", this.loginData);
          this.isLoading = false;
          this.$router.push({ path: "/" });
          let welcomeMsg = `Bem Vindo (a), ` + this.$store.getters.getUsername;
          showWelcome(welcomeMsg);
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
    toggleChangePassword() {
      if (this.showSignup) {
        this.showSignup = !this.showSignup;
        this.changePass = !this.changePass;
      } else {
        this.changePass = !this.changePass;
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
