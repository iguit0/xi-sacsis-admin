<template>
  <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      treeData: null,
      treeOptions: {
        propertynames: { text: "name" }
      }
    };
  },
  methods: {
    getTreeData() {
      return axios.get(`${baseApiUrl}/categories/tree`).then(res => res.data);
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
</style>
