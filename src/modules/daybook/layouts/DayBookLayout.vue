<template>
  <NavBar />

  <div class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions } from 'vuex'


export default {
  components: {
    NavBar: defineAsyncComponent(() => import('@/modules/daybook/components/NavBar')),
    EntryList: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList'))
  },
  methods: {
    ...mapActions('journal', ['loadEntries'])
  },
  created() {
    this.loadEntries()
  }
}
</script>
