<template>
  <section id="cd-timeline" class="cd-container">
    <div class="cd-timeline-block" v-for="(item) in day" :key="item.id">
      <div
        class="cd-timeline-img cd-picture"
        :style="{
          'background-image': `url(${item.avatar ? item.avatar : 'https://cdn3.iconfinder.com/data/icons/stars-5/512/gold_star-512.png'})`,
          'background-color': 'rgb(255, 235, 179)'
        }"
      >
        <!--<b-img v-if="item.avatar" :src="item.avatar" :alt="item.ministrante" rounded="circle"/>-->
        <!--<b-img src="https://cdn3.iconfinder.com/data/icons/stars-5/512/gold_star-512.png" rounded="circle" v-else/>-->
      </div>
      <!-- minicurso -->
      <div class="cd-timeline-content" v-if="item.minicurso">
        <h2>{{item.minicurso}}</h2>
        <p>
          <v-icon name="chalkboard-teacher" class="mr-1"/>
          {{item.ministrante}}
        </p>
        <p>
          <v-icon name="map-marker-alt" class="mr-1"/>
          {{item.local}}
        </p>
        <p>
          <v-icon name="id-badge" class="mr-1"/>
          Turma: {{item.turma}}
        </p>
        <p>
          <v-icon name="chair" class="mr-1"/>
          {{item.vagas}} vagas restantes
        </p>
        <b-btn class="infoBtn" block variant="outline-primary" size="sm" @click="openModal(item.id)">
          <!-- Botão de mais informações -->
          <v-icon name="info-circle" class="mr-1"/>Mais informações
        </b-btn>
        <span class="cd-date">
          <v-icon name="clock" class="mr-1"/>
          {{item.data_inicio}}・{{item.data_fim}}
        </span>
      </div>
      <!-- palestra -->
      <div class="cd-timeline-content" v-if="item.palestra">
        <h2>{{item.palestra}}</h2>
        <p>
          <v-icon name="microphone" class="mr-1"/>
          {{item.ministrante}}
        </p>
        <p>
          <v-icon name="map-marker-alt" class="mr-1"/>
          {{item.local}}
        </p>
        <b-btn class="infoBtn" block variant="outline-primary" size="sm" @click="openModal(item.id)">
          <!-- Botão de mais informações -->
          <v-icon name="info-circle" class="mr-1"/>Mais informações
        </b-btn>
        <span class="cd-date">
          <v-icon name="clock" class="mr-1"/>
          {{item.data_inicio}}・{{item.data_fim}}
        </span>
      </div>
      <!-- outros eventos -->
      <div class="cd-timeline-content" v-if="item.titulo">
        <h2>{{item.titulo}}</h2>
        <p>{{item.descricao}}</p>
        <p>
          <v-icon name="map-marker-alt" class="mr-1"/>
          {{item.local}}
        </p>
        <!--<b-btn class="infoBtn" block variant="outline-primary" size="sm" @click="openModal(item.id)">
          <v-icon name="info-circle" class="mr-1"/>Mais informações
        </b-btn>-->
        <span class="cd-date">
          <v-icon name="clock" class="mr-1"/>
          {{item.data_inicio}}・{{item.data_fim}}
        </span>
      </div>
    </div>
  </section>
  <!-- cd-timeline -->
</template>

<script>
import InfoModal from "@/components/template/InfoModal";
import api from "@/services/api";

export default {
  props: ["day"],
  name: "Timeline",
  methods: {
    openModal(id) {
      api.get("/schedule/info/" + id).then(res => {
        if (res.status === 200) {
          //console.log(res.data);
          this.$modal.show(
            InfoModal,
            {
              schedule: res.data
            },
            {
              draggable: false,
              width: 850,
              height: 510
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
}

h1,
h2 {
  font-family: "Rubik", sans-serif;
  font-weight: bold;
}

/* -------------------------------- 

Modules - reusable parts of our design

-------------------------------- */
.cd-container {
  /* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
}

.cd-container::after {
  /* clearfix */
  content: "";
  display: table;
  clear: both;
}

/* -------------------------------- 

xnugget info 

-------------------------------- */
.cd-nugget-info {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  left: 0;
}

.cd-nugget-info a {
  position: relative;
  font-size: 14px;
  color: #718ca1;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

.no-touch .cd-nugget-info a:hover {
  opacity: 0.8;
}

.cd-nugget-info span {
  vertical-align: middle;
  display: inline-block;
}

.cd-nugget-info .cd-nugget-info-arrow {
  fill: #718ca1;
}

/* -------------------------------- 

xcarbonads 

-------------------------------- */
#carbonads-container {
  position: fixed;
  right: 40px;
  top: 40px;
  background-size: 40px 40px;
  width: 180px;
  display: none;
  z-index: 1;
}

#carbonads-container .close-carbon-adv {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 100%;
  background: rgba(26, 34, 40, 0.8);
  text-indent: 100%;
  overflow: hidden;
  width: 32px;
  height: 32px;
  border-radius: 3px 0 0 3px;
}

#carbonads-container .close-carbon-adv:hover {
  background: #1a2228;
}

#carbonads-container .close-carbon-adv::after,
#carbonads-container .close-carbon-adv::before {
  content: "";
  background-color: #fff;
  height: 2px;
  width: 14px;
  position: absolute;
  top: 14px;
  left: 9px;
}

#carbonads-container .close-carbon-adv::after {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#carbonads-container .close-carbon-adv::before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#carbonads-container .carbonad {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 100%;
  height: auto;
  padding: 14px;
  text-align: center;
  border-radius: 0 3px 3px 3px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

#carbonads-container .carbonad .carbonad-image img {
  margin: 0 0 10px 10px;
}

#carbonads-container .carbonad .carbonad-text,
#carbonads-container .carbonad .carbonad-tag {
  font-family: "Rubik", Arial, sans-serif;
}

#carbonads-container .carbonad .carbonad-text {
  display: block;
  width: 100%;
  padding: 0;
}

#carbonads-container .carbonad .carbonad-text a {
  color: #c23941;
  font-size: 13px;
  font-weight: bold;
}

.no-touch #carbonads-container .carbonad .carbonad-text a:hover {
  text-decoration: underline;
}

#carbonads-container .carbonad .carbonad-tag {
  margin-top: 5px;
  color: #3a393f;
}

#carbonads-container .carbonad .carbonad-tag a {
  color: #3a393f;
}

#carbonads-container .carbonad .carbonad-tag a:hover {
  color: #c23941;
}

@media only screen and (min-width: 1170px) {
  #carbonads-container {
    display: block;
  }
}

#cd-timeline {
  position: relative;
  padding: 2em 0;
  margin-top: 2em;
  margin-bottom: 2em;
}

#cd-timeline::before {
  /* this is the vertical line */
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 4px;
  background: #d7e4ed;
}

@media only screen and (min-width: 1170px) {
  #cd-timeline {
    margin-top: 3em;
    margin-bottom: 3em;
  }

  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}

.cd-timeline-block {
  position: relative;
  margin: 2em 0;
}

.cd-timeline-block:after {
  content: "";
  display: table;
  clear: both;
}

.cd-timeline-block:first-child {
  margin-top: 0;
}

.cd-timeline-block:last-child {
  margin-bottom: 0;
}

@media only screen and (min-width: 1170px) {
  .cd-timeline-block {
    margin: 4em 0;
  }

  .cd-timeline-block:first-child {
    margin-top: 0;
  }

  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }
}

.cd-timeline-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08),
    0 3px 0 4px rgba(0, 0, 0, 0.05);
}

.cd-timeline-img img {
  /*position: relative;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -12px;
  display: block;*/
  width: 64px;
  height: 64px;
}
/*
.cd-timeline-img.cd-picture {
  background: #75ce66;
}*/

.cd-timeline-img.cd-movie {
  background: #c03b44;
}

.cd-timeline-img.cd-location {
  background: #f0ca45;
}

@media only screen and (min-width: 1170px) {
  .cd-timeline-img {
    width: 60px;
    height: 60px;
    background-size: 60px 60px;
    left: 50%;
    margin-left: -30px;
    /* Force Hardware Acceleration in WebKit */
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
  }

  .cssanimations .cd-timeline-img.is-hidden {
    visibility: hidden;
  }

  .cssanimations .cd-timeline-img.bounce-in {
    visibility: visible;
    -webkit-animation: cd-bounce-1 0.6s;
    -moz-animation: cd-bounce-1 0.6s;
    animation: cd-bounce-1 0.6s;
  }
}

@-webkit-keyframes cd-bounce-1 {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
  }
}

@-moz-keyframes cd-bounce-1 {
  0% {
    opacity: 0;
    -moz-transform: scale(0.5);
  }

  60% {
    opacity: 1;
    -moz-transform: scale(1.2);
  }

  100% {
    -moz-transform: scale(1);
  }
}

@keyframes cd-bounce-1 {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -ms-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform: scale(0.5);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}

.cd-timeline-content {
  position: relative;
  margin-left: 60px;
  background: white;
  border-radius: 0.25em;
  padding: 1em;
  box-shadow: 0 3px 0 #d7e4ed;
}

.cd-timeline-content:after {
  content: "";
  display: table;
  clear: both;
}

.cd-timeline-content h2 {
  color: #303e49;
}

.cd-timeline-content p,
.cd-timeline-content .cd-read-more,
.cd-timeline-content .cd-date {
  font-size: 13px;
  font-size: 0.8125rem;
}

.cd-timeline-content .cd-read-more,
.cd-timeline-content .cd-date {
  display: inline-block;
}

.cd-timeline-content p {
  margin: 1em 0;
  line-height: 1.6;
}

.cd-timeline-content .cd-read-more {
  float: right;
  padding: 0.8em 1em;
  background: #acb7c0;
  color: white;
  border-radius: 0.25em;
}

.no-touch .cd-timeline-content .cd-read-more:hover {
  background-color: #bac4cb;
}

.cd-timeline-content .cd-date {
  float: left;
  padding: 0.8em 0;
  opacity: 0.7;
}

.cd-timeline-content::before {
  content: "";
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid white;
}

@media only screen and (min-width: 768px) {
  .cd-timeline-content h2 {
    font-size: 20px;
    font-size: 1.25rem;
  }

  .cd-timeline-content p {
    font-size: 16px;
    font-size: 1rem;
  }

  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    font-size: 14px;
    font-size: 0.875rem;
  }
}

@media only screen and (min-width: 1170px) {
  .cd-timeline-content {
    margin-left: 0;
    padding: 1.6em;
    width: 45%;
  }

  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: white;
  }

  .cd-timeline-content .cd-read-more {
    float: left;
  }

  .cd-timeline-content .cd-date {
    position: absolute;
    width: 100%;
    left: 122%;
    top: 6px;
    font-size: 16px;
    font-size: 1rem;
  }

  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }

  .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    top: 24px;
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color: white;
  }

  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
    float: right;
  }

  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
    right: 122%;
    text-align: right;
  }

  .cssanimations .cd-timeline-content.is-hidden {
    visibility: hidden;
  }
}
@media only screen and (max-width: 768px) {
  .infoBtn {
    display: none;
  }
}
</style>