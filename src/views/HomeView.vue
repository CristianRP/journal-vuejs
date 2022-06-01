<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <button class="btn btn-success" @click="goToDaybook">Daybook</button>
  <button class="btn btn-primary">Hola</button>
  <button class="btn btn-secondary">Hola</button>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
   }
}
</script>
