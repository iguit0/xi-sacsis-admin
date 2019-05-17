<template>
  <div class="schedule-page">
    <PageTitle icon="calendar-alt" main="Ver Programação" sub="Visualizar todos os eventos"/>
    <ViewSchedule :schedule="schedule"/>
  </div>
</template>

<script>
import { showError } from "@/global";
import api from "@/services/api";
import PageTitle from "@/components/template/PageTitle";
import ViewSchedule from "@/components/user/ViewSchedule";

export default {
  name: "ScheduleView",
  components: { PageTitle, ViewSchedule },
  data() {
    return {
      schedule: []
    };
  },
  methods: {
    getSchedule() {
      api.get("/schedule").then(res => {
        if (res.status === 200) {
          this.schedule = res.data;
        } else {
          showError(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.getSchedule();
  }
};
</script>

<style scoped>
.timeline {
  padding: 5px 45px;
}
.timeline ul {
  position: relative;
}
.timeline ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.timeline li {
  position: relative;
  margin: 60px 35px;
  width: 100%;
  list-style: none;
  line-height: 25px;
}
.timeline li > span {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  left: -25px;
  height: 110%;
  border: 2px solid #fff;
  border-radius: none;
}
.timeline li > span::before,
.timeline li > span::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border: 3px solid #fff;
  border-radius: 50%;
  left: -7px;
  background: #4e9bfa;
}
.timeline li > span::before {
  top: -15px;
}
.timeline li > span::after {
  top: 100%;
}
.timeline li div:nth-child(2) {
  font-size: 1.2em;
}
.timeline li div:nth-child(3),
.timeline li div:nth-child(4) {
  font-size: 1em;
  font-style: italic;
  color: #bfbfbf;
}
.timeline li .year span {
  position: absolute;
  font-size: 1em;
  left: -85px;
  width: 40px;
  text-align: right;
}
.timeline li .year span:first-child {
  top: -20px;
}
.timeline li .year span:last-child {
  top: 100%;
}
</style>
