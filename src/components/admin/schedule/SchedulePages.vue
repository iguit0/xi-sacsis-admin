<template>
  <div>
    <div class="schedule-pages">
      <PageTitle icon="calendar-alt" main="Programação" sub="Gerenciamento dos eventos"/>
      <div class="schedule-pages-tabs">
        <b-card no-body>
          <b-tabs card pills active-nav-item-class="font-weight-bold text-uppercase">
            <b-tab title="Minicurso">
              <CourseSchedule/>
            </b-tab>
            <b-tab title="Palestra">
              <LectureSchedule/>
            </b-tab>
            <b-tab title="Outros eventos">
              <EventSchedule/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import LectureSchedule from "@/components/admin/schedule/LectureSchedule";
import CourseSchedule from "@/components/admin/schedule/CourseSchedule";
import EventSchedule from "@/components/admin/schedule/EventSchedule";

export default {
  name: "SchedulePages",
  components: { PageTitle, LectureSchedule, CourseSchedule, EventSchedule }
};
</script>
