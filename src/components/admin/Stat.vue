<template>
  <div class="stat">
    <div class="stat-icon">
      <v-icon :name="icon" scale="4" :color="style"/>
    </div>
    <div class="stat-info">
      <span class="stat-title text-uppercase">{{title}}</span>
      <span class="stat-value">{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stat",
  props: ["title", "value", "icon", "color"],
  computed: {
    style() {
      return this.color || "#000";
    }
  }
};
</script>

<style>
.stat {
  flex: 1;
  display: flex;
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  display: flex;
  align-items: center;
}

.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-tile {
  font-size: 1.2rem;
}

.stat-value {
  font-size: 3rem;
}
</style>
