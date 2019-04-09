<template>
  <div>
    <div class="admin-pages">
      <PageTitle icon="cogs" main="Administração" sub="Gerenciamento do Sistema"/>
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card pills>
            <b-tab title="Participantes">
              <StudentsAdmin/>
            </b-tab>
            <b-tab title="Minicursos">
              <CoursesAdmin/>
            </b-tab>
            <b-tab title="Palestras">
              <h1 class="text-center">Palestras</h1>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import StudentsAdmin from "./StudentsAdmin";
import CoursesAdmin from "./CoursesAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, StudentsAdmin, CoursesAdmin }
};
</script>

<style></style>
