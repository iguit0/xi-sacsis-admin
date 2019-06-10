<template>
  <div class="grid-container" v-if="schedule.tipo == 'minicurso' || schedule.tipo == 'palestra'">
    <div class="user-content">
      <div class="avatar">
        <b-img center :src="schedule.avatar" width="180px" rounded="circle"/>
      </div>
      <div class="user_name">
        {{schedule.ministrante}}
      </div>
      <div class="user_info">
        {{schedule.resumo}}
      </div>
      <div class="social">
        <a class="b-social" v-if="schedule.instagram"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.instagram"
        >
          <v-icon scale="2" name="brands/instagram"/>
        </a>
        <a class="b-social" v-if="schedule.facebook"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.facebook"
        >
          <v-icon scale="2" name="brands/facebook-square"/>
        </a>
        <a class="b-social" v-if="schedule.twitter"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.twitter"
        >
          <v-icon scale="2" name="brands/twitter-square"/>
        </a>
        <a class="b-social" v-if="schedule.website"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.site"
        >
          <v-icon scale="2" name="globe"/>
        </a>
      </div>
    </div>
    <div class="content">
      <h2 slot="title" class="text-center text-uppercase">
        {{schedule.titulo}}
      </h2>
      {{schedule.conteudo}}
    </div>
  </div>

  <div v-else-if="schedule.tipo == 'outros'">
    <div class="outros">
      <h2 slot="title" class="text-center text-uppercase">
        {{schedule.titulo}}
      </h2>
      {{schedule.descricao}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  props: ["schedule"]
}
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "user-content content";
  }

  .user-content {
    grid-area: user-content;
    display: grid;
    width: 270px;
    grid-template-rows: 200px 50px 220px 40px;
    background: linear-gradient(to right, #1e469a, #49a7c1);
    grid-template-areas: "avatar" "user_name" "user_info" "social";
    color: white;
  }

  .avatar {
    grid-area: avatar;
    margin-top: 15px;
  }

  .user_name {
    line-height: 90%;
    margin: 5px 5px 0px 5px;
    font-size: 22px;
    text-align: center;
  }

  .user_info {
    grid-area: user_info;
    padding: 0px 5px 0px 5px;
    line-height: 150%;
    text-align: center;
    word-wrap: break-word;
    overflow-y: auto;
  }

  .social { 
    grid-area: social;
    margin: 5px 5px 0px 5px;  
  }

  .content { 
    grid-area: content;
    width: 570px;
    height: 500px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 120%;
    text-align: justify;
    word-wrap: break-word;
    white-space: pre-line;
    overflow-y: auto;
  }

  .b-social {
    margin: 5px 5px 0px 5px;
    color: white;
  }

  .outros {
    width: 850;
    height: 500px;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 120%;
    text-align: justify;
    word-wrap: break-word;
    white-space: pre-line;
    overflow-y: auto;
  }
</style>
