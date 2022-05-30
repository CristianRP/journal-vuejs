<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing selected.</h1>
  </div>
  <FabButton @on:click="createNewEntry" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    FabButton: defineAsyncComponent(() => import('../components/FabButton'))
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: 'entry', params: { id: 'new' } })
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>