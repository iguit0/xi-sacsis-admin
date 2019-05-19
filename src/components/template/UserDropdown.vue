<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{user.dados.nome}}</span>
      <div class="user-dropdown-img">
        <avatar :fullname="user.dados.nome" :size="37"></avatar>
      </div>
      <v-icon name="angle-down"/>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/minha-conta">
        <v-icon name="user-circle" class="mr-1"/>Minha conta
      </router-link>
      <router-link to="/admin" v-if="user.admin">
        <v-icon name="cogs" class="mr-1"/>Administração
      </router-link>
      <a href @click.prevent="logout">
        <v-icon name="sign-out-alt" class="mr-1"/>Sair
      </a>
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Avatar from "vue-avatar-component";

export default {
  name: "UserDropdown",
  components: { Avatar },
  computed: { ...mapState(["user"]) },
  methods: {
    logout() {
      this.$swal({
        position: "center",
        title: "Já vai?",
        text: "Você realmente deseja sair?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, sair!",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.$store.commit("setUser", null);
          localStorage.removeItem(userKey);
          this.$router.push({ name: "auth" });
          this.$swal({
            position: "center",
            type: "success",
            title: "Até logo :)",
            text: "Você saiu!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}
</style>
