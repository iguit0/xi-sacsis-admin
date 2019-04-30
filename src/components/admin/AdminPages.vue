<template>
  <div>
    <div class="admin-pages">
      <PageTitle icon="cogs" main="Administração" sub="Gerenciamento do Sistema"/>
      <div class="admin-pages-tabs">
        <b-card no-body>
          <b-tabs card pills active-nav-item-class="font-weight-bold text-uppercase">
            <b-tab title="Participantes">
              <StudentsAdmin/>
            </b-tab>
            <b-tab title="Minicursos">
              <CoursesAdmin/>
            </b-tab>
            <b-tab title="Palestras">
              <PresentationAdmin/>
            </b-tab>
            <b-tab title="Lotes">
              <TicketAdmin/>
            </b-tab>
            <b-tab title="Pagamentos">
              <PaymentAdmin/>
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
import PresentationAdmin from "./PresentationAdmin";
import PaymentAdmin from "./PaymentAdmin";
import TicketAdmin from "./TicketAdmin";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
    StudentsAdmin,
    CoursesAdmin,
    PresentationAdmin,
    PaymentAdmin,
    TicketAdmin
  }
};
</script>
