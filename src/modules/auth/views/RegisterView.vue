<template>
  <span class="login100-form-title p-b-41"> Registro </span>
  <form class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit">
    <div class="wrap-input100 validate-input" data-validate="Enter name">
      <input class="input100" v-model="userForm.name" type="text" placeholder="Name" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input class="input100" v-model="userForm.email" type="text" placeholder="Email" required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="userForm.password"
        class="input100"
        type="password"
        placeholder="Contraseña"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Login</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }"
        >¿Already have an account?</router-link
      >
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'

export default {
  setup() {

    const { createUser } = useAuth()

    const userForm = ref({
      name: '',
      email: '',
      password: ''
    })

    return {
      userForm,

      onSubmit: async() => {
        createUser( userForm.value )
      }
    }
  }
}
</script>

<style>
</style>