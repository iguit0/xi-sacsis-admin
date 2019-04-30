<template>
  <div>
    <div class="schedule-pages">
      <PageTitle
        icon="calendar-alt"
        main="Programação do Evento"
        sub="Gerenciamento de Programação"
      />
      <div class="schedule-pages-tabs">
        <b-card no-body>
          <b-tabs card pills active-nav-item-class="font-weight-bold text-uppercase">
            <b-tab title="Minicurso">
              <h1 align="center">Teste</h1>
            </b-tab>
            <b-tab title="Palestra">
              <LectureSchedule/>
            </b-tab>
            <b-tab title="Outros eventos">
              <h1 align="center">Teste</h1>
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

export default {
  name: "SchedulePages",
  components: { PageTitle, LectureSchedule }
};
</script>
