<template>
  <template v-if="entry">
      <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>

        <input
          type="file"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
          @change="onSelectedImage">

        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="btn btn-danger mx-2">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Upload Photo
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr>
    <!-- Need to add a template to wrap both root -->
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="What happened today?" v-model="entry.text"></textarea>

      <FabButton
        icon="fa-save"
        @on:click="saveEntry" />

      <img
        v-if="entry.picture && !localImage"
        :src="entry.picture"
        alt="entry-picture"
        class="img-thumbnail">

      <img
        v-if="localImage"
        :src="localImage"
        alt="entry-picture"
        class="img-thumbnail">
    </div>
  </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
  name: 'EntryView',
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    }
  },
  components: {
    FabButton: defineAsyncComponent(() => import('../components/FabButton'))
  },
  created() {
    this.loadEntry()
  },
  mounted() {
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
      const { day } = getDayMonthYear( this.entry.date )
      return day
    },
    month() {
      const { month } = getDayMonthYear( this.entry.date )
      return month
    },
    yearDay() {
      const { yearDay } = getDayMonthYear( this.entry.date )
      return yearDay
    }
  },
  methods: {
    loadEntry() {
      let entry;
      if ( this.id === 'new' ) {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id)
        if ( !entry ) return this.$router.push({ name: 'no-entry' })
      }

      this.entry = entry
    },

    async saveEntry() {

      Swal.fire({
        title: 'Please wait',
        allowOutsideClick: false
      })
      Swal.showLoading()

      const picture = await uploadImage( this.file )

      this.entry.picture = picture

      if (this.entry.id) {
        await this.updateEntry(this.entry)
      } else {
        const id = await this.createEntry(this.entry)

        this.$router.push({ name: 'entry', params: { id } })
      }

      this.file = null
      this.localImage = null
      Swal.fire('Saved', 'Entry saved properly', 'success')
    },

    async onDeleteEntry() {

      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will erase the entry permanently',
        showDenyButton: true,
        confirmButtonText: 'Yes, delete',
        denyButtonText: 'Cancel'
      })

      if (isConfirmed) {
        Swal.fire({
          title: 'Please wait',
          allowOutsideClick: false
        })
        Swal.showLoading()

        await this.deleteEntry( this.entry.id )

        this.$router.push({ name: 'no-entry' })

        Swal.fire('Deleted', '', 'success')
      }
    },

    onSelectedImage( event ) {
      const file = event.target.files[0]

      if ( !file ) {
        this.localImage = null
        this.file = null
        return
      }

      this.file = file

      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL( file )
    },

    onSelectImage() {
      this.$refs.imageSelector.click()
    },

    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry'])
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    id() {
      this.loadEntry()
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
