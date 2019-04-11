<template>
  <div class="presentation-admin">
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      empty-text="Não há nenhuma palestra cadastrada"
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "PresentationAdmin",
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "ministrante_id", label: "Ministrante" },
        { key: "actions", label: "Ações" }
      ]
    };
  }
};
</script>

