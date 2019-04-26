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
          data: { icon: "home", name: "home", color: "#FA8072" }
        },
        {
          text: "Minha Conta",
          data: { icon: "user-circle", name: "AccountPages", color: "#F7DC6F" }
        },
        {
          text: "Minicursos",
          data: {
            icon: "chalkboard-teacher",
            color: "#FF8C00"
          }
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
          text: "Administração",
          data: { icon: "cogs" },
          children: [
            {
              text: "Participantes",
              data: {
                icon: "users",
                color: "#d54d50",
                name: "adminPages",
                value: 0
              }
            },
            {
              text: "Ministrantes",
              data: {
                icon: "chalkboard-teacher",
                color: "#FF8C00",
                name: "adminPages"
              }
            },
            {
              text: "Palestrantes",
              data: {
                icon: "microphone",
                color: "#3CB371",
                name: "adminPages"
              }
            },
            {
              text: "Programação",
              data: {
                icon: "calendar-alt",
                color: "#FBD786",
                name: "adminPages"
              }
            },
            {
              text: "Lotes",
              data: {
                icon: "cash-register",
                color: "#C6FFDD",
                name: "adminPages"
              }
            },
            {
              text: "Pagamentos",
              data: {
                icon: "comment-dollar",
                color: "#2980B9",
                name: "adminPages",
                value: 5
              }
            }
          ]
        }
      ]);
    },
    onNodeSelected(node) {
      this.$router.push({ name: node.data.name });
      if (this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
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

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
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
