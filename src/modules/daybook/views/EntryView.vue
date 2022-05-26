<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ month }}</span>
      <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Delete
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Upload Photo
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="What happened today?" v-model="entry.text"></textarea>

    <FabButton icon="fa-save"/>

    <img
      src="https://elsolnewsmedia.com/wp-content/uploads/2020/10/1601498876_582320_1601498920_noticia_normal.jpg"
      alt="entry-picture"
      class="img-thumbnail">
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex'

export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      entry: null
    }
  },
  components: {
    FabButton: defineAsyncComponent(() => import('../components/FabButton'))
  },
  created() {
    console.log(this.id);
    this.loadEntry()
  },
  mounted() {
    console.log(this.id);
    // this.loadEntry()
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    shortText() {
      return ( this.entry.text.length > 130 )
        ? `${this.entry.text.substring(0, 130)}...`
        : this.entry.text
    },
    day() {
      const date = new Date( this.entry.date )
      return date.getDate()
    },
    month() {
      const date = new Date( this.entry.date )
      return months[ date.getMonth() ]
    },
    yearDay() {
      const date = new Date( this.entry.date )
      return `${ date.getFullYear() }, ${ days[ date.getDay() ] }`
    }
  },
  methods: {
    loadEntry() {
      const entry = this.getEntryById(this.id)
      if ( !entry ) this.$router.push({ name: 'no-entry' })

      this.entry = entry
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    id(newValue, _oldValue) {
      this.loadEntry(newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
