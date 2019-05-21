<template>
  <div class="page-title">
    <h1>
      <v-icon v-if="icon" :name="icon" scale="2.5"/>
      {{main}}
    </h1>
    <h2
      v-if="firstOption && secondOption"
      class="float-right"
    >Você selecionou {{firstOption}} e {{secondOption}}</h2>
    <h2>{{sub}}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub", "firstOption", "secondOption"]
};
</script>

<style>
.page-title h1 {
  margin: 0px;
}

.page-title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>