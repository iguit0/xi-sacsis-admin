<template>
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="Dia 1" active>
        <section class="timeline">
          <ul>
            <li v-for="(info, index) in schedule" :key="index">
              <span></span>
              <div>{{ info.school }}</div>
              <div>{{ info.address }}</div>
              <div>{{ info.course }}</div>
              <div class="year">
                <span>{{ info.yearEnd }}</span>
                <span>{{ info.yearStart }}</span>
              </div>
            </li>
          </ul>
        </section>
      </b-tab>
      <b-tab title="Dia 2">
        <b-card-text>Tab Contents 2</b-card-text>
      </b-tab>
      <b-tab title="Dia 3">
        <b-card-text>Tab Contents 3</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  props: ["schedule"],
  name: "ViewSchedule"
};
</script>
