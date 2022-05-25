<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing selected.</h1>
  </div>
  <FabButton />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    FabButton: defineAsyncComponent(() => import('../components/FabButton'))
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>