<template>
  <div class="grid-container">
    <div class="user-content">
      <div class="avatar">
        <b-img center src="https://sacsis-api.herokuapp.com/speaker/images/1" width="220px" rounded="circle"/>
      </div>
      <div class="user_name">
        {{schedule.user.name}}
      </div>
      <div class="user_info">
        {{schedule.user.info}}
      </div>
      <div class="social">
        <a class="b-social" v-if="schedule.user.instagram"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.user.instagram"
        >
          <v-icon scale="2" name="brands/instagram"/>
        </a>
        <a class="b-social" v-if="schedule.user.facebook"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.user.facebook"
        >
          <v-icon scale="2" name="brands/facebook-square"/>
        </a>
        <a class="b-social" v-if="schedule.user.twitter"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.user.twitter"
        >
          <v-icon scale="2" name="brands/twitter-square"/>
        </a>
        <a class="b-social" v-if="schedule.user.website"
          target="_blank" rel="noopener noreferrer"
          :href="schedule.user.website"
        >
          <v-icon scale="2" name="globe"/>
        </a>
      </div>
    </div>
    <div class="content">
      <h2 slot="title" class="text-center text-uppercase">
        {{schedule.title}}
      </h2>
      {{schedule.text}}
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
    grid-template-rows: 225px 50px 185px 40px;
    background: linear-gradient(to right, #1e469a, #49a7c1);
    grid-template-areas: "avatar" "user_name" "user_info" "social";
    color: white;
  }

  .avatar {
    grid-area: avatar;
    margin-top: 5px;
  }

  .user_name {
    line-height: 90%;
    margin: 5px 5px 0px 5px;
    font-size: 22px;
  }

  .user_info {
    grid-area: user_info;
    margin: 0px 5px 0px 5px;
    max-width: 220px;
    line-height: 90%;
    text-align: justify;
    word-wrap: break-word;
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
    overflow-y: auto;
  }

  .b-social {
    margin: 5px 5px 0px 5px;
    color: white;
  } 
</style>
