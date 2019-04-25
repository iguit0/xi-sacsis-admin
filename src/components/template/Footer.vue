<template>
  <footer class="footer">
    <v-icon name="code" style="color: #373b44;"/>
    <span>com</span>
    <v-icon name="heart" style="color: red;"/>
    <span>por</span>
    <a href="https://github.com/iguit0" target="_blank" rel="noopener">@iguit0</a>
    <span>&</span>
    <a href="https://github.com/LuisMSoares" target="_blank" rel="noopener">@LuisMSoares</a>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  grid-area: footer;
  background: linear-gradient(
    to right,
    #1e469a,
    #49a7c1
  ); /* Chrome 10-25, Safari 5.1-6 */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}

.footer span {
  margin-right: 5px;
  margin-left: 5px;
  font-weight: 100;
  color: whitesmoke;
}

.footer a {
  text-decoration: none;
  color: #373b44;
  font-weight: bold;
}
</style>
