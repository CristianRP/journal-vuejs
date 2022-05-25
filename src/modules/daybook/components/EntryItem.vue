<template>
  <div class="entry-container mb-3 pointer p-2">
    <!-- Title -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">25</span>
      <span class="mx-1 fs-5">May</span>
      <span class="mx-2 fw-light">2022, Wed</span>
    </div>

    <div class="entry-description">
      Officia aliquip officia quis irure veniam ad ex Lorem. Officia consequat ea eu consequat et sint dolor eiusmod eu id anim culpa deserunt in. Magna culpa nisi minim aute ut eiusmod duis non exercitation ullamco magna non. Ea nulla deserunt ut dolor nisi minim ex ullamco pariatur elit. Eu ipsum exercitation laboris ullamco ut ad sit ex ea non pariatur.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description {
    font-size: 12px;
  }
}
</style>