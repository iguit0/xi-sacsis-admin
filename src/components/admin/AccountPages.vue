<template>
  <div>
    <div class="admin-pages">
      <PageTitle icon="user-circle" main="Minha conta" sub="Gerencie suas informações"/>
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card pills>
            <b-tab title="Minicursos">
              <h1 class="text-center">Minicursos</h1>
            </b-tab>
            <b-tab title="Dados pessoais">
              <PersonalData/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import PersonalData from "@/components/admin/PersonalData";

export default {
  name: "AccountPages",
  components: { PageTitle, PersonalData }
};
</script>

