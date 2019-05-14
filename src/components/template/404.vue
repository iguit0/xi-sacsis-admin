<template>
  <div class="notfound-page">
    <div class="error">
      <h1>404</h1>
      <p>Esta página não existe ou você não tem autorização</p>
      <b-btn @click="$router.go(-1)" size="lg" variant="primary" block>
        <v-icon scale="1.5" name="home" class="mr-1"/>Voltar a página inicial
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
.notfound-page {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 70%;
  overflow: hidden;
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  text-align: center;
  padding: 16px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}

h1 {
  margin: -10px 0 -30px;
  font-size: calc(17vw + 40px);
  opacity: 0.8;
  letter-spacing: -17px;
}

p {
  opacity: 0.8;
  font-size: 20px;
  margin: 8px 0 38px 0;
  font-weight: bold;
}
</style>
