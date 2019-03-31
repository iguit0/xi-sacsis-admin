<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="XI SACSIS" :hideToggle="!user" :hideUserDropdown="!user"/>
    <Menu v-if="user"/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Menu from "@/components/template/Menu";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Content from "@/components/template/Content";
import Loading from "@/components/template/Loading";

export default {
  name: "App",
  components: { Menu, Footer, Header, Content, Loading },
  computed: mapState(["isMenuVisible", "user"])
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
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "header header" "menu content" "menu footer";
}

#app.hide-menu {
  grid-template-areas: "header header" "content content" "footer footer";
}
</style>
