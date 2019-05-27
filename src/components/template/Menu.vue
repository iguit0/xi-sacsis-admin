<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <v-icon name="search" color="#AAA" class="mr-2"/>
      <input
        type="text"
        class="search-input-menu"
        placeholder="Digite para filtrar..."
        v-model="treeFilter"
      >
    </div>
    <!-- Menu Admin -->
    <Tree
      v-if="user && user.admin"
      :data="treeAdminData"
      :options="treeOptions"
      :filter="treeFilter"
      @node:selected="onNodeSelected"
      ref="tree"
    >
      <span class="tree-text" slot-scope="{ node }">
        <template v-if="!node.data.icon">{{ node.text }}</template>

        <template v-else>
          <v-icon :name="node.data.icon" :color="node.data.color"/>
          {{ node.text }}
        </template>
      </span>
    </Tree>
    <!-- ./Menu Admin -->
    <!-- Menu Participante -->
    <Tree
      v-else-if="user && !user.admin"
      :data="treeParticipantData"
      :options="treeOptions"
      :filter="treeFilter"
      @node:selected="onNodeSelected"
      ref="tree"
    >
      <span class="tree-text" slot-scope="{ node }">
        <template v-if="!node.data.icon">{{ node.text }}</template>

        <template v-else>
          <v-icon :name="node.data.icon" :color="node.data.color"/>
          {{ node.text }}
        </template>
      </span>
    </Tree>
    <!-- ./Menu Participante -->
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
import { userKey } from "@/global";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      treeFilter: "",
      treeAdminData: this.getAdminMenu(),
      treeParticipantData: this.getParticipantMenu(),
      treeOptions: {
        propertynames: { text: "name" },
        filter: {
          emptyText: "Opção não encontrada!"
        }
      }
    };
  },
  methods: {
    getParticipantMenu() {
      return Promise.resolve([
        {
          text: "Início",
          data: { icon: "home", name: "home" }
        },
        {
          text: "Minha Conta",
          data: { icon: "user-circle", name: "AccountPages" }
        },
        /*{
          text: "Minicursos",
          data: {
            icon: "chalkboard-teacher",
            name: "CoursesList"
          }
        },*/
        {
          text: "Programação",
          data: { icon: "calendar-alt", name: "ScheduleView" }
        },
        {
          text: "Sair",
          data: { icon: "sign-out-alt" }
        }
      ]);
    },
    getAdminMenu() {
      return Promise.resolve([
        {
          text: "Início",
          data: { icon: "home", name: "home" }
        },
        {
          text: "Minha Conta",
          data: { icon: "user-circle", name: "AccountPages" }
        },
        {
          text: "Gerenciar",
          data: { icon: "tools" },
          children: [
            {
              text: "Administração",
              data: { icon: "cogs", name: "adminPages" }
            },
            {
              text: "Programação",
              data: { icon: "calendar-check", name: "SchedulePages" }
            },
            {
              text: "Ministrantes",
              data: { icon: "person-booth", name: "GuestsPages" }
            },
            {
              text: "Relatórios",
              data: { icon: "scroll", name: "ReportsPage" }
            }
          ]
        },
        /*
        {
          text: "Minicursos",
          data: {
            icon: "chalkboard-teacher",
            name: "CoursesList"
          }
        },*/
        {
          text: "Ver Programação",
          data: { icon: "calendar-alt", name: "ScheduleView" }
        },
        {
          text: "Sair",
          data: { icon: "sign-out-alt" }
        }
      ]);
    },
    logout() {
      this.$swal({
        position: "center",
        title: "Já vai?",
        text: "Você realmente deseja sair?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, sair!",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem(userKey);
          this.$store.commit("setUser", null);
          this.$router.push({ name: "auth" });
          this.$swal({
            position: "center",
            type: "success",
            title: "Até logo :)",
            text: "Você saiu!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    },
    onNodeSelected(node) {
      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
      if (node.text === "Sair") {
        this.logout();
        node.unselect();
      } else {
        this.$router.push({ name: node.data.name });
      }
    }
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu a,
.menu a:hover {
  color: whitesmoke;
  text-decoration: none;
}

.tree-node.selected > .tree-content {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-node:not(.selected) > .tree-content:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tree-arrow.has-child {
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.menu input {
  color: #ccc;
  font-size: 1.1rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-filter-empty {
  color: #ccc;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}
</style>
