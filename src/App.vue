<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="XI SACSIS" :hideToggle="!user" :hideUserDropdown="!user"/>
    <Menu v-if="user"/>
    <Loading v-if="isValidating"/>
    <Content v-else/>
    <Footer/>
  </div>
</template>

<script>
import { userKey, showError, baseApiUrl } from "@/global";
import { mapState } from "vuex";
import Menu from "@/components/template/Menu";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Content from "@/components/template/Content";
import Loading from "@/components/template/Loading";
import axios from 'axios';

export default {
  name: "App",
  components: { Menu, Footer, Header, Content, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      isValidating: true
    };
  },
  methods: {
    async validateToken() {
      this.isValidating = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);

      if (!userData) {
        this.isValidating = false;
        return this.$router.push({ name: "auth" });
      }

      const api = axios.create({
        baseURL: baseApiUrl,
        headers: {"Authorization" : `Bearer ${userData.jwt_token}`},
        validateStatus: function (status) {
            return status < 1000;
        }
      });

      const res = await api.put("/login", userData)
      if (res.status === 200) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        if (sessionStorage.getItem("vuex") ){
          sessionStorage.removeItem("vuex");
          document.location.reload(true);
        } else {
          showError("Sessão expirada!");
          this.$router.push({ name: "auth" });
        }
      }

      this.isValidating = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style>
* {
  font-family: "Rubik", sans-serif;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 25px;
  grid-template-columns: 260px 1fr;
  grid-template-areas: "header header" "menu content" "menu footer";
}

#app.hide-menu {
  grid-template-areas: "header header" "content content" "footer footer";
}
</style>
