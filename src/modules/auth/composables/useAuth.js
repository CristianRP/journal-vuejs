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

  return {
    createUser,
    loginUser
  }
}

export default useAuth
