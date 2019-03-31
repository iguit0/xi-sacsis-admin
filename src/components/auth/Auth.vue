<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!-- img logo evento -->
      <h1>XI SACSIS</h1>
      <hr>
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>
      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="font"/>
          </span>
        </div>
        <input v-model="user.name" type="text" placeholder="Nome" class="form-control">
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

      <div class="input-group mb-3" v-if="!showPass">
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
      <div class="input-group mb-3" v-else>
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
            <v-icon name="id-card-alt"/>
          </span>
        </div>
        <b-input
          v-model="user.cpf"
          name="cpf"
          type="number"
          placeholder="CPF"
          class="form-control"
          required
        />
      </div>

      <div class="input-group mb-3" v-if="showSignup">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <v-icon name="id-card"/>
          </span>
        </div>
        <b-input
          v-model="user.rg"
          name="rg"
          type="text"
          placeholder="RG"
          class="form-control"
          required
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

      <b-btn variant="warning" block v-if="showSignup" @click="signup">
        <v-icon name="user-plus" class="mr-1"/>Registrar
      </b-btn>
      <b-btn block v-else @click="signin" variant="success">
        <v-icon name="sign-in-alt" class="mr-1"/>Entrar
      </b-btn>

      <a href @click.prevent="showSignup = !showSignup" class="mt-3">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showPass: false,
      showSignup: false,
      user: {
        shirtSize: null
      },
      optionsShirt: [
        { value: null, text: "Selecione um tamanho" },
        { value: "P", text: "P" },
        { value: "M", text: "M" },
        { value: "G", text: "G" },
        { value: "GG", text: "GG" }
      ]
    };
  },
  methods: {
    signin() {
      let parsedobj = JSON.parse(JSON.stringify(this.user));
      axios
        .post(`${baseApiUrl}/login`, {
          login: parsedobj.email,
          senha: parsedobj.password
        })
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/user`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
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
  background-color: #fff;
  width: 600px;
  height: 650px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

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

hr {
  border: none;
  height: 20px;
  width: 70%;
  height: 50px;
  margin-top: 0;
  border-bottom: 1px solid #1f1209;
  box-shadow: 0 20px 20px -20px #333;
  margin: -50px auto 10px;
}
</style>
