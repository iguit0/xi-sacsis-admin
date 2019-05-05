<template>
  <div class="lecture-schedule">
    <b-form>
      <input id="lecture-id" type="hidden" v-model="lecture.id">
      <b-row>
        <b-col md="5">
          <b-form-group
            label="Selecione a palestra:"
            description="Padrão: (Nome do minicurso) • (Ministrante)"
            label-for="lecture"
          >
            <v-select
              id="lecture"
              label="titulo"
              v-model="selected"
              :options="lectures"
              placeholder="Selecione uma opção"
            >
              <!-- dropdown pra selecionar -->
              <template slot="option" slot-scope="option">{{option.titulo}} • {{option.ministrante}}</template>
              <!-- ./dropdown pra selecionar -->
              <!-- método ja selecionado -->
              <template slot="selected-option" slot-scope="option">
                <div class="selected d-center">{{option.titulo}} • {{option.ministrante}}</div>
              </template>
              <!-- ./metodo ja selecionado -->
              <!-- sem opcoes -->
              <slot name="no-options">Não encontramos nenhuma palestra.</slot>
              <!-- ./sem opcoes -->
            </v-select>
          </b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-group label="Local:" label-for="lecture-location" description="Exemplo: PVA 235">
            <b-form-input
              id="lecture-location"
              type="text"
              v-model="lecture.local"
              placeholder="Local"
              :readonly="mode === 'remove'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group
            label="Data Início"
            label-for="lecture-start"
            description="Selecione a data e depois horário"
          >
            <date-pick
              id="lecture-start"
              v-model="lecture.data_inicio"
              :inputAttributes="{readonly: true}"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
            />
          </b-form-group>
        </b-col>
        <b-col md="2" sm="6">
          <b-form-group label="Data Fim" label-for="lecture-end">
            <date-pick
              id="lecture-end"
              v-model="lecture.data_fim"
              :inputAttributes="{readonly: true}"
              prevMonthCaption="Mês Anterior"
              nextMonthCaption="Próximo Mês"
              setTimeCaption="Horário:"
              :weekdays="weekDays"
              :months="months"
              :pickTime="true"
              :format="'DD-MM-YYYY HH:mm'"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6" class="mb-3">
          <b-btn
            variant="primary"
            :disabled="incomplete"
            v-if="mode === 'save'"
            @click="save"
          >Salvar</b-btn>
          <b-btn variant="danger" v-if="mode === 'remove'">Excluir</b-btn>
          <b-btn class="ml-2" @click="reset">Cancelar</b-btn>
        </b-col>
        <b-col xs="6">
          <b-form-group label-cols-sm="10" label="Exibir por página" label-align="right">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <h2
      class="text-center text-uppercase"
      v-if="!lectures && !lectures.length"
    >Nenhuma palestra cadastrada!</h2>

    <!-- TABELA -->
    <b-table
      striped
      bordered
      caption-top
      show-empty
      :fields="fields"
      :items="lectures"
      empty-text="Não há nenhuma palestra cadastrada"
    >
      <template slot="table-caption" v-if="totalRows">
        <h6 align="right">
          <strong>{{totalRows}} palestra encontradas</strong>
        </h6>
      </template>
      <template slot="table-caption" v-else>
        <h6 align="right">
          <strong>Nenhum palestras encontrado</strong>
        </h6>
      </template>
      <template slot="actions" slot-scope="data">
        <b-btn size="sm" variant="warning" @click="selectLecture(data.item)" class="mr-2">
          <v-icon name="edit"/>
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
import { showError, showSuccess } from "@/global";
import api from "@/services/api";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";

export default {
  name: "LectureSchedule",
  components: { DatePick },
  data() {
    return {
      weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Do"],
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 0,
      incomplete: true,
      mode: "save",
      lecture: {},
      selected: null,
      lectures: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "titulo", label: "Título", sortable: true },
        { key: "conteudo", label: "Descrição" },
        { key: "ministrante", label: "Palestrante", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    save() {
      let parsedLecture = JSON.parse(JSON.stringify(this.lecture));
      let parsedSelected = JSON.parse(JSON.stringify(this.selected));
      const data = {
        lecture_id: parsedSelected.id,
        local: parsedLecture.local,
        data_inicio: parsedLecture.data_inicio,
        data_fim: parsedLecture.data_fim
      };
      api.post("/admin/schedule?formtype=lecture", data).then(res => {
        if (res.status === 200) {
          let successMsg = res.data.message;
          showSuccess(successMsg);
          this.reset();
        } else {
          let errorMsg = res.data.message;
          showError(errorMsg);
          this.reset();
        }
      });
    },
    loadLectures() {
      api.get("/admin/lecture?loadtitle=0").then(res => {
        if (res.status === 200) {
          this.lectures = res.data.palestras;
          this.totalRows = res.data.palestras.length;
        }
      });
    },
    reset() {
      this.mode = "save";
      this.lecture = {};
      this.selected = null;
      this.incomplete = true;
      this.loadLectures();
    },
    selectLecture(lecture, mode = "save") {
      this.mode = mode;
      this.lecture = { ...lecture };
      this.incomplete = false;
    }
  },
  mounted() {
    this.loadLectures();
  }
};
</script>

<style>
.vdpArrowPrev:after {
  border-right-color: #333;
}

.vdpArrowNext:after {
  border-left-color: #333;
}

.vdpCell.selectable:hover .vdpCellContent,
.vdpCell.selected .vdpCellContent {
  background: #333;
}

.vdpCell.today {
  color: #333;
}

.vdpTimeUnit > input:hover,
.vdpTimeUnit > input:focus {
  border-bottom-color: #333;
}

.vdpComponent.vdpWithInput > input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.vdpComponent.vdpWithInput > input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>