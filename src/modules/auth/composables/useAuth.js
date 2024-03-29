import { computed } from 'vue'
import { useStore } from 'vuex'

const useAuth = () => {
  const store = useStore()

  const createUser = async( user ) => {
    const response = await store.dispatch('auth/createUser', user)
    return response
  }

  const loginUser = async( user ) => {
    const response = await store.dispatch('auth/signInUser', user)
    return response
  }

  const checkAuthStatus = async() => {
    const response = await store.dispatch('auth/checkAuthentication')
    return response
  }

  const logout = () => {
    store.commit('auth/logout')
    store.commit('journal/clearEntries')
  }

  return {
    createUser,
    loginUser,
    checkAuthStatus,
    logout,

    authStatus: computed(() => store.getters['auth/currentState']),
    userName: computed(() => store.getters['auth/userName'])
  }
}

export default useAuth
