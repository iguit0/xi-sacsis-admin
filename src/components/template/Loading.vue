<template>
  <div class="loading">
    <h4 class="mt-2 text-center text-uppercase">CARREGANDO...</h4>
    <b-spinner type="grow" variant="dark"></b-spinner>
  </div>
</template>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
