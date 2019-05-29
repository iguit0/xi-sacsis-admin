<template>
  <div class="grid-container">
    <div class="user-content">
      <div class="avatar">
        <b-img center :src="schedule.user.avatar" width="230px"/>
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
      <p>
        {{schedule.text}}
      </p>
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
    grid-template-rows: 230px 225px 45px;
    background: linear-gradient(to right, #1e469a, #49a7c1);
    grid-template-areas: "avatar" "user_info" "social";
    color: white;
  }

  .avatar {
    grid-area: avatar;
  }

  .user_info {
    grid-area: user_info;
    margin: 5px 5px 0px 5px;
    max-width: 220px;
    line-height: 120%;
    text-align: justify;
    word-wrap: break-word;
  }

  .social { 
    grid-area: social;
    margin: 5px;  
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
