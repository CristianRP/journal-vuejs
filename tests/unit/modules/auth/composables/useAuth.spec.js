import useAuth from '@/modules/auth/composables/useAuth';

const mockStore = {
  dispatch: jest.fn(),
  // Commit
  commit: jest.fn(),
  // Getters
  getters: {
    'auth/currentState': 'authenticated',
    'auth/userName': 'Cristian'
  }
}

jest.mock('vuex', () => ({
  useStore: () => mockStore
}))

describe('Tests on useAuth', () => {

  beforeEach(() => jest.clearAllMocks())

  test('success createUser', async() => {

    const { createUser } = useAuth()

    const newUser = { name: 'Cristian', email: 'cristian@email.com' }
    mockStore.dispatch.mockReturnValue({ ok: true })

    const response = await createUser( newUser )

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', { name: 'Cristian', email: 'cristian@email.com' })

    expect(response).toEqual({ ok: true })
  })

  test('failed createUser - user already exists', async() => {

    const { createUser } = useAuth()

    const newUser = { name: 'Cristian', email: 'cristian@email.com' }
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

    const response = await createUser( newUser )

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', { name: 'Cristian', email: 'cristian@email.com' })

    expect( response ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
  })

  test('success login', async() => {

    const { loginUser } = useAuth()

    const loginForm = { name: 'Cristian', email: 'cristian@email.com' }
    mockStore.dispatch.mockReturnValue({ ok: true })

    const response = await loginUser( loginForm )

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', { name: 'Cristian', email: 'cristian@email.com' })

    expect( response ).toEqual({ ok: true })
  })

  test('checksStatus', async() => {

    const { checkAuthStatus } = useAuth()

    mockStore.dispatch.mockReturnValue({ ok: true })

    const response = await checkAuthStatus()

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication')

    expect( response ).toEqual({ ok: true })
  })


  test('logout', () => {

    const { logout } = useAuth()

    logout()

    expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')
    expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')
  })

  test('authState, userName', () => {

    const { authStatus, userName } = useAuth()

    expect(authStatus.value).toBe('authenticated')
    expect(userName.value).toBe('Cristian')
  });

})