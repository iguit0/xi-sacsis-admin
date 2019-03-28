<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id">
      <b-row>
        <b-col md="6" sm="6">
          <b-form-group label="Nome:" label-for="category-name">
            <b-form-input
              id="category-name"
              type="text"
              v-model="category.name"
              required
              placeholder="Digite nome da categoria"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="6">
          <b-form-group label="URL:" label-for="category-slug">
            <b-form-input
              id="category-slug"
              type="text"
              v-model="category.slug"
              required
              placeholder="Digite a URL da categoria"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="6" v-show="mode === 'save'">
          <b-form-group label="Ícone:" label-for="category-icon">
            <b-form-input
              v-b-tooltip.hover
              title="Padrão Font Awesome"
              id="category-icon"
              v-show="mode === 'save'"
              type="text"
              v-model="category.icon"
              required
              placeholder="Digite ícone da categoria"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- TABELA -->
    <b-table
      :current-page="currentPage"
      :per-page="perPage"
      striped
      bordered
      caption-top
      :items="categories"
      :fields="fields"
    >
      <template slot="table-caption">
        <h6 align="right">
          <strong>{{totalRows}} categorias encontradas</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn variant="warning" @click="selectCategory(data.item)" class="mr-2">
          <v-icon name="edit"/>
        </b-btn>
        <b-btn variant="danger" @click="selectCategory(data.item, 'remove')" class="mr-2">
          <v-icon name="trash-alt"/>
        </b-btn>
      </template>
    </b-table>
    <!-- ./TABELA -->
    <b-row>
      <b-col xs="12" class="text-center">
        <b-pagination
          align="center"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="text-center"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "CategoriesAdmin",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "slug", label: "URL" },
        { key: "icon", label: "Ícone" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    // Remover categorias nao funciona (problema API)
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    loadCategories() {
      axios.get(`${baseApiUrl}/categories`).then(res => {
        this.categories = res.data;
        this.totalRows = res.data.length;
      });
    },
    selectCategory(category, mode = "save") {
      this.mode = mode;
      this.category = { ...category };
    }
  },
  mounted() {
    this.loadCategories();
  }
};
</script>
