<template>
  <div class="admin-pages">
    <PageTitle icon="cogs" main="Administração" sub="Gerenciamento do Sistema"/>
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card pills>
          <b-tab title="Participantes">
            <CategoriesAdmin/>
          </b-tab>
          <b-tab title="Palestrantes">
            <EstablishmentsAdmin/>
          </b-tab>
          <b-tab title="Minicursos">
            <h1 class="text-center">Eventos</h1>
          </b-tab>
          <b-tab title="Usuários">
            <CategoriesAdmin/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/template/PageTitle";
import UserAdmin from "./UserAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import EstablishmentsAdmin from "./EstablishmentsAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, UserAdmin, CategoriesAdmin, EstablishmentsAdmin }
};
</script>

<style></style>
