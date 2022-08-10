import axios from 'axios'
import createVuexStore from '../../../mock-data/mock-store.js'


describe('Vuex: tests on auth-module', () => {
  test('init state', () => {
    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null
    })

    const { status, user, idToken, refreshToken } = store.state.auth
    expect(status).toBe('authenticating')
    expect(user).toBe(null)
    expect(idToken).toBe(null)
    expect(refreshToken).toBe(null)
  })

  // Mutations
  test('Mutation: loginUser', () => {

    const store = createVuexStore({
      status: 'authenticating',
      user: null,
      idToken: null,
      refreshToken: null
    })

    const payload = {
      user: { name: 'Cristian', email: 'cristian@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123'
    }

    store.commit('auth/loginUser', payload)

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('authenticated')
    expect(user).toEqual( { name: 'Cristian', email: 'cristian@test.com' } )
    expect(idToken).toBe( 'ABC-123' )
    expect(refreshToken).toBe( 'XYZ-123' )

  })

  test('Mutation: logout', () => {

    localStorage.setItem('idToken', 'ABC-123')
    localStorage.setItem('refreshToken', 'XYZ-123')

    const store = createVuexStore({
      status: 'authenticated',
      user: { name: 'Cristian', email: 'cristian@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123'
    })

    store.commit('auth/logout')

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('not-authenticated')
    expect(user).toBeFalsy()
    expect(idToken).toBeFalsy()
    expect(refreshToken).toBeFalsy()
    expect(localStorage.getItem('idToken')).toBeFalsy()
    expect(localStorage.getItem('refreshToken')).toBeFalsy()

  })

  // Getters
  test('Getter: username currentState', () => {

    const store = createVuexStore({
      status: 'authenticated',
      user: { name: 'Cristian', email: 'cristian@test.com' },
      idToken: 'ABC-123',
      refreshToken: 'XYZ-123'
    })

    expect( store.getters['auth/currentState'] ).toBe('authenticated')
    expect( store.getters['auth/userName'] ).toBe('Cristian')
  })

  // Actions
  test('Actions: createUser - Existing user', async() => {
    const store = createVuexStore({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null
    })

    const newUser = { name: 'Cristian', email: 'patito@test.com', password: '123123' }

    const response = await store.dispatch('auth/createUser', newUser)

    expect( response ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

    const { status, user, idToken, refreshToken } = store.state.auth

    expect(status).toBe('not-authenticated')
    expect(user).toBeFalsy()
    expect(idToken).toBeFalsy()
    expect(refreshToken).toBeFalsy()

  })

  test('Actions: createUser signInUser - Save a new user', async() => {
    const store = createVuexStore({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null
    })

    const newUser = { name: 'PatoT', email: 'patotest@test.com', password: '123123' }

    // SignIn
    await store.dispatch('auth/signInUser', newUser)
    const { idToken } = store.state.auth

    // Delete user
    const deleteResponse = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_GOOGLE_API_KEY}`, {
      idToken
    })

    console.log(deleteResponse);

    // Create User
    const response = await store.dispatch('auth/createUser', newUser)

    console.log(response);
    expect( response ).toEqual({ ok: true })

    const { status, user, idToken:token, refreshToken } = store.state.auth

    expect(status).toBe('authenticated')
    expect(user).toMatchObject( { name: 'PatoT', email: 'patotest@test.com' } )
    expect( typeof idToken).toBe( 'string' )
    expect( typeof refreshToken).toBe( 'string' )
  })
})
