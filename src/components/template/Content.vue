<template>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Content"
};
</script>

<style scoped>
.content {
  grid-area: content;
  background-color: whitesmoke;
  padding: 20px;
}
</style>
